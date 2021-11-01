const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");
var regPhoneNumber = /^\d{3}\d{3,4}\d{4}$/;
var regPassword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,16}/;

// API NO. 1 유저 생성
/*
    API No. 1
    API Name : 회원 가입
    [POST] /app/users
*/exports.postUsers = async function (req, res) {

    /**
     * Body: email, password, nickname, profileImg, birthday
     */
    const {email, password, nickname, profileImg, birthday} = req.body;

    // 빈 값 체크
    if (!email)
        return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));
    if (!password)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));
    if (!nickname)
        return res.send(response(baseResponse.SIGNUP_NICKNAME_EMPTY));
    if (!nickname)
        nickname = '0000-00-00'

    // 회원가입단계에서 이미지를 넘겨주는 것이 아니라 null 값을 대체할 특정 값을 보내준다면 그 값을 이용해서 클라이언트측에서 기본이미지를 돌려줄 수 있도록 요청해보기
    // sql 문에서 테스트한번 진행해보기

    // 길이 체크
    if (email.length > 30)
        return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));
    if (nickname.length > 30)
        return res.send(response(baseResponse.SIGNUP_NICKNAME_LENGTH));

    // 형식 체크 (by 정규표현식)
    if (!regexEmail.test(email))
        return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));
    //
    if(!regPassword.test(password))
        return res.send(errResponse(baseResponse.SIGNIN_PASSWORD_ERROR_TYPE));

    // 기타 등등 - 추가하기

    const signUpResponse = await userService.createUser(email, password, nickname, profileImg, birthday);

    return res.send(signUpResponse);
};



/*
    API No. 2
    API Name : 유저 본인 프로필 조회
    [GET] /app/users/:userId
*/
exports.getUser = async function (req, res) {

    const userId = req.params.userId;
    const nickname = req.query.nickname;
    if (!userId) {
        return res.send(response(baseResponse.TOKEN_VERIFICATION_FAILURE));
    }
    else {
        const token = req.headers['x-access-token'];

        const checkJWT = await userProvider.checkJWT(userId);
        if (checkJWT.length < 1 || token != checkJWT[0].jwt) {
            return res.send(response(baseResponse.USER_ID_NOT_MATCH));
        }
        // jwt 확인 절차
        const selectUserId = await userProvider.retrieveUser(userId);
        // 확인 실패했을 경우
        if(selectUserId.length === 0 ) return errResponse(baseResponse.PROFILE_SELECT_FAIL);
        // 확인 성공했을 경우
        else{
            // 찾을 닉네임을 입력하지 않은 경우 >> userId값으로 본인 조회
            if(!nickname){
                return res.send(response(baseResponse.PROFILE_SELECT_SUCCESS, selectUserId));
            }
            // 찾을 닉네임을 입력한 경우 >> 닉네임 값으로 찾을 userId 추출
            else {
                // 유저 검색 조회
                const userListByNickname = await userProvider.retrieveUserList(nickname);
                if(userListByNickname.length === 0 ) {
                    return res.send(response(baseResponse.USER_USERID_NOT_EXIST));
                }
                else{
                    // 확인 성공했을 경우
                    const nicknameUserId = userListByNickname[0].userId
                    // 유저 상태 체크
                    const userProfileResult = await userProvider.retrieveUserProfile(nicknameUserId);
                    const status = userProfileResult[0].status
                    if (status == 'Y') {
                        const followUserResult = await userProvider.retrieveFollow(userId, nicknameUserId);
                        followingStatus = followUserResult[0].followingStatus
                        console.log(followingStatus)
                        if(followingStatus == 'N') {
                            console.log(22)
                            const followResult = await userProvider.retrieveFollowUsers(nicknameUserId);
                            return res.send(response(baseResponse.USER_FOLLOWING_NOT_SUCCESS, followResult));
                        }
                        else if(followingStatus == 'Y'){
                            console.log(1)
                            return res.send(response(baseResponse.PROFILE_SELECT_SUCCESS, userProfileResult[0]));
                        }
                    } else if (status == 'N') {
                        const userListResult = await userProvider.retrieveUserList();
                        return res.send(response(baseResponse.SIGNIN_INACTIVE_ACCOUNT,userListResult));
                    } else if (status == 'B') {
                        const userListResult = await userProvider.retrieveUserList();
                        return res.send(response(baseResponse.SIGNIN_BANNED_ACCOUNT,userListResult));
                    } else {
                        const userListResult = await userProvider.retrieveUserList();
                        return res.send(response(baseResponse.PROFILE_SELECT_FAIL,userListResult));
                    }
                }

            }

        }

    }
};

// * API No. 2
// * API Name : 유저 조회 API (+ 이메일로 검색 조회)
// * [GET] /app/users
// */
// exports.getUsers = async function (req, res) {
//
//     /**
//      * Query String: email
//      */
//     const email = req.query.email;
//
//     if (!email) {
//         // 유저 전체 조회
//         const userListResult = await userProvider.retrieveUserList();
//         return res.send(response(baseResponse.SUCCESS, userListResult));
//     } else {
//         // 유저 검색 조회
//         const userListByEmail = await userProvider.retrieveUserList(email);
//         return res.send(response(baseResponse.SUCCESS, userListByEmail));
//     }
// };

/*
    API No. 3
    API Name : 프로필 편집 API
    [PATCH] /app/users/:userId/profile
*/
exports.patchUserProfile = async function (req, res) {
    const userId = req.params.userId;

    /*
        Body : profileImg, nickname, realName,introduction
    */
    var { profileImg, nickname, realName, introduction } = req.body;

    if (!userId) {
        return res.send(response(baseResponse.USER_USERID_EMPTY));
    }

    const token = req.headers['x-access-token'];
    const checkJWT = await userProvider.checkJWT(userId);
    if (checkJWT.length < 1 || token != checkJWT[0].jwt) {
        return res.send(response(baseResponse.USER_USERID_NOT_EXIST));
    }

    const userProfileRows = await userProvider.retrieveUser(userId);

    if (!profileImg) {
        profileImg = userProfileRows.profileImg
    }
    if (!nickname) {
        nickname = userProfileRows.nickname
        const nicknameRows = await userProvider.nicknameCheck(nickname);
        if (nicknameRows.length > 0) {
            // 자신의 닉네임을 유지 시키고 싶을 때 - 본인 확인 후, 그대로 자신의 기존 닉네임 사용 가능
            if(nicknameRows[0].userId != userId) {
                return errResponse(baseResponse.SIGNUP_REDUNDANT_NICKNAME);
            }
        }
        console.log(nickname)
    }
    if (!realName) {
        realName = userProfileRows.realName
    }
    if (!introduction) {
        introduction = userProfileRows.introduction
    }

    const editProfileResult = await userService.editProfile(userId, profileImg, nickname, realName, introduction);
    return res.send(editProfileResult);
};

/*
    API No. 5
    API Name : 회원 탈퇴 및 상태 변경 API
    [PATCH] /app/users/:userId/status
*/
exports.patchUserStatus = async function (req, res) {

    const userId = req.params.userId;
    const { status, isPublic } = req.body;

    if (!userId) {
        return res.send(response(baseResponse.USER_ID_NOT_MATCH));
    }

    const token = req.headers['x-access-token'];
    const checkJWT = await userProvider.checkJWT(userId);
    if (checkJWT.length < 1 || token != checkJWT[0].jwt) {
        return res.send(response(baseResponse.TOKEN_VERIFICATION_FAILURE));
    }
    const statusRows = await userProvider.retrieveUser(userId);
    console.log(statusRows.status)
    if (statusRows.length < 1) return errResponse(baseResponse.SIGNIN_WITHDRAWAL_OR_NONE_ACCOUNT);

    if (!status){
        const status = statusRows.status
    }
    if (!isPublic){
        const isPublic = statusRows.isPublic
    }

    if(!(status && isPublic)){
        const deleteUserResult = await userService.deleteUser(userId);
        return res.send(deleteUserResult);
    }
    else{
        const editUserStatus = await userService.editUserStatus(userId, status, isPublic);
        console.log(editUserStatus)
        return res.send(editUserStatus);
    }


};

/*
    API No. 6
    API Name : 프로필 이미지 수정 API
    [PATCH] /app/users/:userId/profileImg
*/
exports.patchUserImg = async function (req, res) {

    const userId = req.params.userId;
    const profileImg = req.body.profileImg;

    if (!userId) {
        return res.send(response(baseResponse.USER_USERID_EMPTY));
    }
    if (!profileImg) {
        return res.send(response(baseResponse.PROFILE_PROFILEIMG_EMPTY));
    }

    const token = req.headers['x-access-token'];
    const checkJWT = await userProvider.checkJWT(userId);
    if (checkJWT.length < 1 || token != checkJWT[0].jwt) {
        return res.send(response(baseResponse.USER_USERID_EMPTY));
    }

    const editUserImgResult = await userService.editUserImg(profileImg, userId);
    return res.send(editUserImgResult);
};

/*
    API No. 7
    API Name : 팔로우 등록 및 언팔 API
    [POST] /app/users/:userId/following
*/
exports.postFollow = async function(req, res) {
    // Path Variable : userId
    const userId = req.params.userId;

    if (!userId) {
        return res.send(response(baseResponse.USER_USERID_EMPTY));
    }

    /*
        Body : targetId
    */
    const targetId= req.body.targetId;
    const followingStatus = req.body.followingStatus;

    const token = req.headers['x-access-token'];
    const checkJWT = await userProvider.checkJWT(userId);
    if (checkJWT.length < 1 || token != checkJWT[0].jwt) {
        return res.send(response(baseResponse.USER_USERID_EMPTY));
    }

    if (!targetId) {
        return res.send(response(baseResponse.USER_FOLLOWUSER_EMPTY));
    }

    if (!followingStatus) {
        return res.send(response(baseResponse.USER_FOLLOWUSER_EMPTY));
    }

    // 내가 팔로우 한 사람의 계정 상태 값과, 인덱스 값 추출
    const followUserResult = await userProvider.retrieveFollow(userId, targetId);

    // 현재 팔로잉 할 대상의 계정 상태
    const targetUserStatus = followUserResult[0].status
    console.log(targetUserStatus)

    if (targetUserStatus == 'N') {
        return res.send(response(baseResponse.SIGNIN_INACTIVE_ACCOUNT_FOLLOWING_FAIL));
    }

    if (targetUserStatus == 'B') {
        return res.send(response(baseResponse.SIGNIN_BANNED_ACCOUNT_FOLLOWING_FAIL));
    }

    if (targetUserStatus == 'D') {
        return res.send(response(baseResponse.SIGNIN_DELETED_ACCOUNT_FOLLOWING_FAIL));
    }

    // console.log(targetUserStatus)

    // 팔로잉 할 대상의 팔로잉 여부 확인

    // 팔로우 한 사람의 계정이 존재하는 상태
    if (followUserResult.length > 0) {
        // 이미 팔로일한 유저
        if (targetUserStatus == "Y") {
            // 다시 팔로우 팔로잉 상태를 Y 값으로 바꿔주기
            if (followingStatus == "Y") {
                const activateFollow = await userService.updateFollow(userId, targetId, 'Y');
                return res.send(activateFollow);
            }else if(followingStatus == "N") {
                // 팔로우 취소
                const deleteFollow = await userService.updateFollow(userId, targetId, 'N');
                return res.send(deleteFollow);
            }

        }
    } else {
        // 내가 팔로우 하지 않는 계정을 새롭게 팔로우
        // const followUserResult = await userProvider.retrieveFollow(userId, targetId);
        const followResponse = await userService.followUser(userId, targetId);
        return res.send(followResponse);
    }
};

/*
    API No. 8
    API Name : 필로잉 유저 조회 API
    [GET] /app/users/:userId/following
*/

exports.getFollow = async function(req, res) {
    const userId = req.params.userId;
    const targetId = req.query.targetId;

    if (!userId) {
        return res.send(response(baseResponse.USER_USERID_EMPTY));
    }

    if (!targetId) {
        return res.send(response(baseResponse.USER_FOLLOWUSER_EMPTY));
    }

    const token = req.headers['x-access-token'];
    const checkJWT = await userProvider.checkJWT(userId);
    if (checkJWT.length < 1 || token != checkJWT[0].jwt) {
        return res.send(response(baseResponse.USER_USERID_EMPTY));
    }
    // 타겟 아이디 팔로우 여부 확인
    const followUserResult = await userProvider.retrieveFollow(userId, targetId);


    if (followUserResult.length > 0) {
        const targetUserStatus = followUserResult[0].status
        const targetUserFollowingStatus = followUserResult[0].followingStatus
        console.log(targetUserFollowingStatus)

        if (targetUserStatus == 'N') {
            return res.send(response(baseResponse.SIGNIN_INACTIVE_ACCOUNT_FOLLOWING_FAIL));
        }

        if (targetUserStatus == 'B') {
            return res.send(response(baseResponse.SIGNIN_BANNED_ACCOUNT_FOLLOWING_FAIL));
        }

        if (targetUserStatus == 'D') {
            return res.send(response(baseResponse.SIGNIN_DELETED_ACCOUNT_FOLLOWING_FAIL));
        }

        const followingUserResult = await userProvider.retrieveFollowUsersList(userId);
        const followingUserList = [];
        const followingUserIdResult = await userProvider.retrieveUser(targetId);
        if(targetUserFollowingStatus == 'Y'){
            console.log(22)
            return res.send(response(baseResponse.PROFILE_SELECT_SUCCESS, followingUserIdResult));
        }
        if(targetUserFollowingStatus == 'N'){
            for(let i = 0; i < followingUserResult.length; i++){
                let tempId = followingUserResult[i].targetId
                followingUserList[i] = await userProvider.retrieveFollowUsers(tempId);
            }
            return res.send(response(baseResponse.USER_FOLLOWING_NOT_DONE, followingUserList));
        }


    }

    //
    // const followResult = await userProvider.retrieveFollowUsers(userId);
    // const targetFollowingStatus = followResult[0].followingStatus



    //     if (!email) {
//         // 유저 전체 조회
//         const userListResult = await userProvider.retrieveUserList();
//         return res.send(response(baseResponse.SUCCESS, userListResult));
//     } else {
//         // 유저 검색 조회
//         const userListByEmail = await userProvider.retrieveUserList(email);
//         return res.send(response(baseResponse.SUCCESS, userListByEmail));
//     }






    return res.send(response(baseResponse.USER_FOLLOWING_VIEW_SUCCESS, followResult));
};

/*
    API No. 9
    API Name : 필로잉 유저의 게시글 조회 API
    [GET] /app/users/:userId/following/post
*/
exports.getFollowUserPost = async function(req, res) {
    // Path Variable : userId;
    const userId = req.params.userId;

    if (!userId) {
        return res.send(response(baseResponse.USER_USERID_EMPTY));
    }

    const token = req.headers['x-access-token'];
    const checkJWT = await userProvider.checkJWT(userId);
    if (checkJWT.length < 1 || token != checkJWT[0].jwt) {
        return res.send(response(baseResponse.USER_USERID_EMPTY));
    }

    const FollowUsersPostResult = await articleProvider.retrieveFollowUsersPost(userId);

    return res.send(response(baseResponse.SUCCESS, FollowUsersPostResult));
};
//
// /*
//     API No. 10
//     API Name : 로그인 + JWT 발급 API
//     [POST] /app/login
// */
// exports.logins = async function (req, res) {
//     const {email, password} = req.body;
//     console.log(password)
//
//     if (!email)
//         return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));
//     if (!password)
//         return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));
//
//     if (!regexEmail.test(email))
//         return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));
//
//     // if(!regPassword.test(password))
//     //     return res.send(errResponse(baseResponse.SIGNUP_PASSWORD_ERROR_TYPE));
//
//     const signInResponse = await userService.postSignIn(email);
//
//     return res.send(signInResponse);
// };

// TODO: After 로그인 인증 방법 (JWT)
/**
 * API No. 4
 * API Name : 로그인 API
 * [POST] /app/login
 * body : email, passsword
 */
exports.login = async function (req, res) {

    const {email, password} = req.body;

    if (!email)
        return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));
    if (!password)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));

    if (!regexEmail.test(email))
        return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

    if(!regPassword.test(password))
        return res.send(errResponse(baseResponse.SIGNUP_PASSWORD_ERROR_TYPE));

    // TODO: email, password 형식적 Validation

    const signInResponse = await userService.postSignIn(email, password);

    return res.send(signInResponse);
};





// /**
//  * API No. 2
//  * API Name : 유저 조회 API (+ 이메일로 검색 조회)
//  * [GET] /app/users
//  */
// exports.getUsers = async function (req, res) {
//
//     /**
//      * Query String: email
//      */
//     const email = req.query.email;
//
//     if (!email) {
//         // 유저 전체 조회
//         const userListResult = await userProvider.retrieveUserList();
//         return res.send(response(baseResponse.SUCCESS, userListResult));
//     } else {
//         // 유저 검색 조회
//         const userListByEmail = await userProvider.retrieveUserList(email);
//         return res.send(response(baseResponse.SUCCESS, userListByEmail));
//     }
// };

/*
    API No. 7
    API Name : 자동 로그인 API
    [GET] /app/auto-login
*/
exports.check = async function (req, res) {
    // jwt - userId

    const userIdFromJWT = req.verifiedToken.userId;

    const token = req.headers['x-access-token'];
    const checkJWT = await userProvider.checkJWT(userIdFromJWT);

    if (!userIdFromJWT) {
        return res.send(errResponse(baseResponse.SIGNIN_JWT_TOKEN_NOT_EXIST));
    } else if (token == checkJWT[0].jwt) {
        return res.send(response(baseResponse.SUCCESS, {"userId": userIdFromJWT}));
    } else {
        return res.send(response(baseResponse.TOKEN_VERIFICATION_FAILURE));
    }
};


// * API No. 2
// * API Name : 유저 조회 API (+ 이메일로 검색 조회)
// * [GET] /app/users
// */
// exports.getUsers = async function (req, res) {
//
//     /**
//      * Query String: email
//      */
//     const email = req.query.email;
//
//     if (!email) {
//         // 유저 전체 조회
//         const userListResult = await userProvider.retrieveUserList();
//         return res.send(response(baseResponse.SUCCESS, userListResult));
//     } else {
//         // 유저 검색 조회
//         const userListByEmail = await userProvider.retrieveUserList(email);
//         return res.send(response(baseResponse.SUCCESS, userListByEmail));
//     }
// };
