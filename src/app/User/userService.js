const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");


// Service: Create, Update, Delete 비즈니스 로직 처리

// API NO. 1 유저 생성
exports.createUser = async function (email, password, nickname, profileImg, birthday) {
    try {
        // 이메일 중복 확인
        const emailRows = await userProvider.emailCheck(email);
        if (emailRows.length > 0)
            return errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL);

        //닉네임 중복검사
        const nicknameRows = await userProvider.nicknameCheck(nickname);
        if(nicknameRows.length > 0){
            return errResponse(baseResponse.SIGNUP_REDUNDANT_NICKNAME);
        }

        // 비밀번호 암호화
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");
        console.log(hashedPassword)

        const insertUserInfoParams = [email, hashedPassword, nickname, profileImg, birthday];

        const connection = await pool.getConnection(async (conn) => conn);

        const userIdResult = await userDao.insertUserInfo(connection, insertUserInfoParams);
        console.log(`추가된 회원 : ${userIdResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


// API No. 10 로그인 + JWT 발급 API
exports.postSignIn = async function (email, password) {
    try {
        // 이메일 여부 확인
        const emailRows = await userProvider.emailCheck(email);
        if (emailRows.length < 1) return errResponse(baseResponse.SIGNIN_EMAIL_WRONG);

        const selectEmail = emailRows[0].email

        // 비밀번호 확인
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        const selectUserPasswordParams = [selectEmail, hashedPassword];
        const passwordRows = await userProvider.passwordCheck(selectUserPasswordParams);

        if (passwordRows[0].password !== hashedPassword) {
            return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
        }

        // 계정 상태 확인
        const userInfoRows = await userProvider.accountCheck(email);

        if (userInfoRows[0].status === 'N') {
            return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
        } else if (userInfoRows[0].status === 'D') {
            return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
        } else if (userInfoRows[0].status === 'B') {
            return errResponse(baseResponse.SIGNIN_BANNED_ACCOUNT);
        }

        //토큰 생성 Service
        let token = await jwt.sign(
            {
                userId: userInfoRows[0].userId,
            }, // 토큰의 내용(payload)
            secret_config.jwtsecret, // 비밀키
            {
                expiresIn: "365d",
                subject: "userTB",
            } // 유효 기간 365일
        );

        return response(baseResponse.SUCCESS, {'userId': userInfoRows[0].userId, 'jwt': token});

    } catch (err) {
        logger.error(`App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};



// exports.editUser = async function (id, nickname) {
//     try {
//         console.log(id)
//         const connection = await pool.getConnection(async (conn) => conn);
//         const editUserResult = await userDao.updateUserInfo(connection, id, nickname)
//         connection.release();
//
//         return response(baseResponse.SUCCESS);
//
//     } catch (err) {
//         logger.error(`App - editUser Service error\n: ${err.message}`);
//         return errResponse(baseResponse.DB_ERROR);
//     }
// }

exports.editProfile = async function(userId, profileImg, nickname, realName, introduction) {
    try {

        const connection = await pool.getConnection(async (conn) => conn);
        const editProfileResult = await userDao.updateProfile(connection, userId, profileImg, nickname, realName, introduction);
        connection.release();

        return response(baseResponse.USER_PROFILE_UPDATE_SUCCESS);
    } catch (err) {
        logger.error(`App - editProfile Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.deleteUser = async function (userId) {
    try {
        // const userStatusRows = await userProvider.retrieveUser(usrId);
        // if(userStatusRows.length === 0)
        //     return errResponse(baseResponse.PROFILE_SELECT_FAIL);

        const connection = await pool.getConnection(async (conn) => conn);
        const deleteUserStatusResult = await userDao.deleteUserStatus(connection, userId);
        connection.release();

        return response(baseResponse.USER_DELETE_SUCCESS, deleteUserStatusResult.info);

    } catch (err) {
        logger.error(`App - deleteUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};



exports.editUserStatus = async function (userId, status, isPublic) {
    try {
        // 기존 값
        const userStatusRows = await userProvider.retrieveUser(userId);
        console.log(userStatusRows)

        const connection = await pool.getConnection(async (conn) => conn);
        // 변경 할 값
        const updateUserStatusResult = await userDao.updateUserStatus(connection, userId, status, isPublic);
        console.log(updateUserStatusResult)
        connection.release();

        if(userStatusRows.status == 'N'){
            if(status == 'Y'){
                return response(baseResponse.USER_COMEBACK_SUCCESS, updateUserStatusResult.info);
            } else {
                return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT_STATUS);
            }
        }
        if(userStatusRows.status == 'B'){
            return errResponse(baseResponse.SIGNIN_BANNED_ACCOUNT);
        }
        if(userStatusRows.status == 'D'){
            return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
        }

        if(userStatusRows.status == 'Y'){
            if(status == 'N'){
                return response(baseResponse.USER_INACTIVE_SUCCESS, updateUserStatusResult.info);
            }else{
                if(userStatusRows.isPublic == 'Y'){
                    if(isPublic = 'N'){
                        return response(baseResponse.ISPUBLIC_STATUS_NO, updateUserStatusResult.info);
                    }
                }if(userStatusRows.isPublic == 'N') {
                    if (isPublic = 'Y') {
                        return response(baseResponse.ISPUBLIC_STATUS_YES, updateUserStatusResult.info);
                    }
                }
            }
        }
        else{
            console.log(1)
            return response(baseResponse.USER_STATUS_UPDATE_SUCCESS);
        }

    } catch (err) {
        logger.error(`App - editUserStatus Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.editUserImg = async function (profileImg, userId) {
    try {
        const userStatusRows = await userProvider.retrieveUser(userId);
        if(userStatusRows.length === 0) return errResponse(baseResponse.USER_USER_NOT_EXIST);

        const connection = await pool.getConnection(async (conn) => conn);
        const editUserNicknameResult = await userDao.updateUserImage(connection, profileImg, userId);
        connection.release();

        return response(baseResponse.USER_IMAGE_UPDATE_SUCCESS, editUserNicknameResult.info);
    } catch (err){
        logger.error(`App - editUserImage Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

// 팔로우 상태 변경
exports.updateFollow = async function(userId, targetId, followingStatus) {
    try {
        const userById = await userProvider.retrieveUser(targetId);
        if (userById.length < 1) {
            return errResponse(baseResponse.SIGNIN_WITHDRAWAL_OR_NONE_ACCOUNT);
        }

        const connection = await pool.getConnection(async (conn) => conn);
        // 팔로잉 할 사람에 대한 followingStatus 값을 Y로 바꿔주는 작업
        const updateFollowResult = await userDao.updateFollow(connection, userId, targetId, followingStatus);

        connection.release();

        if (followingStatus == "N") {
            return response(baseResponse.SUCCESS, "팔로잉 취소");
        } else {
            return response(baseResponse.SUCCESS, "팔로잉 성공");
        }

    } catch (err) {
        logger.error(`App - updateFollow Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 팔로우 생성
exports.followUser = async function(userId, targetId) {
    try {
        const userById = await userProvider.retrieveUser(targetId);
        if (userById.length < 1) {
            return errResponse(baseResponse.SIGNIN_WITHDRAWAL_OR_NONE_ACCOUNT);
        }
        const connection = await pool.getConnection(async (conn) => conn);
        const insertFollowResult = await userDao.insertFollow(connection, userId, targetId);
        connection.release();

        return response(baseResponse.USER_FOLLOWING_SUCCESS);
    } catch (err) {
        logger.error(`App - followUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};