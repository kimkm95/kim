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
const {exitOnError} = require("winston");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createUser = async function (phoneNumber, password, nickname) {
    try {
        // 전화번호 중복 확인
        const phoneNumberRows = await userProvider.phoneNumberCheck(phoneNumber);
        if (phoneNumberRows.length > 0)
            return errResponse(baseResponse.SIGNUP_REDUNDANT_PHONENUMBER);

        // 비밀번호 암호화
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        const insertUserInfoParams = [phoneNumber, hashedPassword, nickname];

        const connection = await pool.getConnection(async (conn) => conn);

        const userIdResult = await userDao.insertUserInfo(connection, insertUserInfoParams);
        console.log(`추가된 회원 : ${userIdResult[0].insertId}`);
        connection.release();
        return response(baseResponse.SUCCESS_MAKING);


    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


// TODO: After 로그인 인증 방법 (JWT)
exports.postSignIn = async function (phoneNumber, userPassword) {
    try {
        // 전화번호 여부 확인
        const phoneNumberRows = await userProvider.phoneNumberCheck(phoneNumber);
        if (phoneNumberRows.length < 1) return errResponse(baseResponse.USER_PHONENUMBER_NOT_EXIST);

        const selectphoneNumber = phoneNumberRows[0].phoneNumber;

        // 비밀번호 확인
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(userPassword)
            .digest("hex");

        const selectUserPasswordParams = [selectphoneNumber, hashedPassword];
        const passwordRows = await userProvider.passwordCheck(selectUserPasswordParams);
        if (passwordRows[0] == null) return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG)
        else {
            if (passwordRows[0].password !== hashedPassword) {
                return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
            }
        }

        // 계정 상태 확인
        const userInfoRows = await userProvider.accountCheck(phoneNumber);

        if (userInfoRows[0].status === "INACTIVE") {
            return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
        } else if (userInfoRows[0].status === "DELETED") {
            return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
        }

        console.log(userInfoRows[0].id) // DB의 userId

        //토큰 생성 Service
        let token = await jwt.sign(
            {
                userId: userInfoRows[0].id,
            }, // 토큰의 내용(payload)
            secret_config.secretjwt, // 비밀키
            {
                expiresIn: "365d",
                subject: "userDB",
            } // 유효 기간 365일
        );

        return response(baseResponse.SUCCESS, {'userId': userInfoRows[0].id, 'jwt': token});

    } catch (err) {
        logger.error(`App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.editUser = async function (id, nickname, email, phoneNumber) {
    try {
        console.log(id)
        const connection = await pool.getConnection(async (conn) => conn);
        const editUserResult = await userDao.updateUserInfo(connection, id, nickname, email, phoneNumber)
        connection.release();

        return response(baseResponse.SUCCESS_EDIT,editUserResult);

    } catch (err) {
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.editUserProfile = async function (id, profileName, profilePath) {
    try {
        console.log(id)
        const connection = await pool.getConnection(async (conn) => conn);
        const editUserProfileResult = await userDao.updateUserProfileInfo(connection, id, profileName, profilePath)
        connection.release();

        return response(baseResponse.SUCCESS_EDIT_PROFILE,editUserProfileResult);

    } catch (err) {
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.editUserAddress = async function (id, address) {
    try {
        console.log(id)
        const connection = await pool.getConnection(async (conn) => conn);
        const editUserAddressResult = await userDao.updateUserAddressInfo(connection, id, address)
        connection.release();

        return response(baseResponse.SUCCESS_EDIT_ADDRESS,editUserAddressResult);

    } catch (err) {
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.editUserStatus = async function (id, status) {
    try {
        console.log(id)
        const connection = await pool.getConnection(async (conn) => conn);
        const editUserStatusResult = await userDao.updateUserStatusInfo(connection, id, status)
        connection.release();

        return response(baseResponse.SUCCESS_EDIT_STATUS,editUserStatusResult);

    } catch (err) {
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

