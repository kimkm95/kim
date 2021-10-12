const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const userDao = require("./userDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveUserPhoneList = async function (phoneNumber) {
  if (!phoneNumber) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userListResult = await userDao.selectUser(connection);
    connection.release();

    return userListResult;

  }
    else {
    const connection = await pool.getConnection(async (conn) => conn);
    const userPhoneNumberListResult = await userDao.selectUserPhoneNumber(connection, phoneNumber);
    connection.release();

    return userPhoneNumberListResult;
  }
};

exports.retrieveUserNicknameList = async function (nickname) {
  //if (!nickname) {
  //   const connection = await pool.getConnection(async (conn) => conn);
  //const nicknameListResult = await userDao.selectnickname(connection,nickname);
  // connection.release();

  //  return nicknameListResult[0];

  // } else {
  const connection = await pool.getConnection(async (conn) => conn);
  const userNickNameListResult = await userDao.selectUserNickname(connection, nickname);
  connection.release();

  return userNickNameListResult;
  // }
};

exports.retrieveUser = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userResult = await userDao.selectUserId(connection, userId);

  connection.release();

  return userResult[0];
};

exports.retrieveUserProductList = async function(userId){
  const connection = await pool.getConnection(async (conn) => conn);
  const userProductResult = await userDao.selectUserProduct(connection, userId);

  connection.release();

  return userProductResult;
}



exports.phoneNumberCheck = async function (phoneNumber) {
  const connection = await pool.getConnection(async (conn) => conn);
  const phoneNumberCheckResult = await userDao.selectUserPhoneNumber(connection, phoneNumber);
  connection.release();

  return phoneNumberCheckResult;
};

exports.passwordCheck = async function (selectUserPasswordParams) {
  const connection = await pool.getConnection(async (conn) => conn);
  const passwordCheckResult = await userDao.selectUserPassword(
      connection,
      selectUserPasswordParams
  );
  connection.release();
  return passwordCheckResult[0];
};

exports.accountCheck = async function (phoneNumber) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userAccountResult = await userDao.selectUserAccount(connection, phoneNumber);
  connection.release();

  return userAccountResult;
};

