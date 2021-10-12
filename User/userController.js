const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse, errResponse2,deleteResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /app/test
 */
// exports.getTest = async function (req, res) {
//     return res.send(response(baseResponse.SUCCESS))
// }

/**
 * API No. 1
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/users
 */
exports.postUsers = async function (req, res) {

    /**
     * Body: phoneNumber, password, nickname
     */
    const {phoneNumber, password, nickname} = req.body;

    // 빈 값 체크
    if (!phoneNumber)
        return res.send(response(baseResponse.SIGNUP_PHONENUMBER_EMPTY));
    if (!nickname)
        return res.send(response(baseResponse.SIGNUP_NICKNAME_EMPTY));
    if (!password)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));

    // 형식 체크
    if (!/^[0-9]{3}-[0-9]{3,4}-[0-9]{4}/.test(phoneNumber))
        return res.send(response(baseResponse.SIGNUP_PHONENUMBER_ERROR_TYPE));

    if (!/^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/.test(nickname))
        return res.send(response(baseResponse.SIGNUP_NICKNAME_ERROR_TYPE));

    if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password))
        return res.send(response(baseResponse.SIGNUP_PASSWORD_ERROR_TYPE));


    // 길이 체크
    if (nickname.length > 15)
        return res.send(response(baseResponse.SIGNUP_NICKNAME_LENGTH));
    if (phoneNumber.length > 30)
        return res.send(response(baseResponse.SIGNUP_PHONENUMBER_LENGTH));



    // 기타 등등 - 추가하기


    const signUpResponse = await userService.createUser(
        phoneNumber,
        password,
        nickname
    );

    return res.send(signUpResponse);
};

/**
 * API No. 2
 * API Name : 유저 조회 API (+ 전화번호로 검색 조회)
 * [GET] /app/users
 */
exports.getUsersPhoneNumber = async function (req, res) {

    /**
     * Query String: phoneNumber
     */

    const phoneNumber = req.params.phoneNumber;

    if(!phoneNumber) {
        return res.send(errResponse(baseResponse.USER_PHONENUMBER_NOT_EXIST));
    }
    else{
        const userListByPhoneNumber = await userProvider.retrieveUserPhoneList(phoneNumber);
        return res.send(response(baseResponse.SUCCESS_FINDING, userListByPhoneNumber));
    }
};

exports.getUsersNickName = async function (req, res) {
    /**
     * Path variable: nickname
     */
    const nickname = req.params.nickname;
    if (!nickname) {
        return res.send(errResponse(baseResponse.USER_USERID_NOT_EXIST));
    }
    else {
        // 유저 검색 조회
        const userListByNickname = await userProvider.retrieveUserNicknameList(nickname);
        return res.send(response(baseResponse.SUCCESS, userListByNickname));
    }
};

/**
 * API No. 3
 * API Name : 특정 유저 조회 API
 * [GET] /app/users/{userId}
 */
exports.getUserProduct = async function (req, res){

    const userId = req.params.userId;

    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const userProductByUserId = await userProvider.retrieveUserProductList(userId);
    return res.send(response(baseResponse.SUCCESS_SHOWING_USER_BY_INDEX, userProductByUserId));

};

exports.getUserById = async function (req, res){
    /**
     * Path variable: userName
     */
    const userId = req.params.userId;

    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const userByUserId = await userProvider.retrieveUser(userId);
    return res.send(response(baseResponse.SUCCESS_SHOWING_USER_BY_INDEX, userByUserId));
};


// TODO: After 로그인 인증 방법 (JWT)
/**
 * API No. 4
 * API Name : 로그인 API
 * [POST] /app/login
 * body : phoneNumber, password
 */
exports.login = async function (req, res) {

    const {phoneNumber, password} = req.body;

    // TODO: phoneNumber, password 형식적 Validation

    if (!phoneNumber)
        return res.send(response(baseResponse.SIGNUP_PHONENUMBER_EMPTY));
    if(!password)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));

    if (!/^[0-9]{3}-[0-9]{3,4}-[0-9]{4}/.test(phoneNumber))
        return res.send(response(baseResponse.SIGNIN_PHONENUMBER_ERROR_TYPE));

    if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password))
        return res.send(response(baseResponse.SIGNUP_PASSWORD_ERROR_TYPE));
    console.log(password)

    const signInResponse = await userService.postSignIn(phoneNumber, password);
    return res.send(signInResponse);

};


/**
 * API No. 5
 * API Name : 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:userId
 * path variable : userId
 * body : nickname
 */
exports.patchUsers = async function (req, res) {

    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userId

    const userId = req.params.userId;
    const {nickname, email,phoneNumber} = req.body;

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!nickname) return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));
        if (!email) return res.send(errResponse(baseResponse.USER_EMAIL_EMPTY));
        if (!phoneNumber) return res.send(errResponse(baseResponse.USER_PHONENUMBER_EMPTY));

        if (!/^[0-9]{3}-[0-9]{3,4}-[0-9]{4}/.test(phoneNumber))
            return res.send(response(baseResponse.SIGNIN_PHONENUMBER_ERROR_TYPE));

        if (!regexEmail.test(email))
            return res.send(response(baseResponse.SIGNIN_EMAIL_ERROR_TYPE));

        const editUserInfo = await userService.editUser(userId, nickname, email, phoneNumber)
        return res.send(editUserInfo);
    }
};

/**
 * API No. 5
 * API Name : 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:userId
 * path variable : userId
 * body : profileName, profilePath
 */
exports.patchUserProfile = async function (req, res) {

    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userId

    const userId = req.params.userId;
    const {profileName, profilePath} = req.body;

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!profileName) return res.send(errResponse(baseResponse.USER_PROFILENAME_EMPTY));
        if (!profilePath) return res.send(errResponse(baseResponse.USER_PROFILEPATH_EMPTY));

        if (!/(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi.test(profilePath))
            return res.send(response(baseResponse.SIGNIN_PROFILEPATH_ERROR_TYPE));

        const editUserProfileInfo = await userService.editUserProfile(userId, profileName, profilePath)
        return res.send(editUserProfileInfo);
    }
};


/**
 * API No. 5
 * API Name : 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:userId
 * path variable : userId
 * body : address
 */
exports.patchUserAddress = async function (req, res) {

    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userId

    const userId = req.params.userId;
    const address = req.body.address;

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!address) return res.send(errResponse(baseResponse.USER_ADDRESS_EMPTY));

        const editUserAddressInfo = await userService.editUserAddress(userId, address)
        return res.send(editUserAddressInfo);
    }
};


/**
 * API No. 5
 * API Name : 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:userId
 * path variable : userId
 * body : status
 */
exports.patchStatus = async function (req, res) {

    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userId

    const userId = req.params.userId;
    const status = req.body.status;
    const statusArr =["ACTIVE","INACTIVE","DELETED"]

    if(userIdFromJWT != userId)
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    else{
        let flag = 0
        for(let i=0; i < statusArr.length; i++) {
            if(status == statusArr[i])
                flag += 1
        }
        if(flag != 1)
            res.send(errResponse(baseResponse.USER_STATUS_NOT_MATCH))
        else{
            if(req.body.status = "DELETED"){
                const editUserStatusInfo = await userService.editUserStatus(userId, status)
                return res.send(deleteResponse,editUserStatusInfo)

            }
            const editUserStatusInfo = await userService.editUserStatus(userId, status)
            return res.send(editUserStatusInfo);
        }
    }
};


/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
exports.check = async function (req, res) {
    const userIdResult = req.verifiedToken.userId;
    console.log(userIdResult);
    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};




































