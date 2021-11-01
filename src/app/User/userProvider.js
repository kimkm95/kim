const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const userDao = require("./userDao");

// Provider: Read 비즈니스 로직 처리


// API NO. 3 닉네임으로 프로필 조회 - 유저 닉네임 값 확인
exports.retrieveUserList = async function (nickname) {
  if (!nickname) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userListResult = await userDao.selectUser(connection);
    connection.release();

    return userListResult;

  } else {
    const connection = await pool.getConnection(async (conn) => conn);
    const userListResult = await userDao.selectUserNickname(connection, nickname);
    connection.release();

    return userListResult;
  }
};

// API NO. 2 유저 본인 프로필 조회 - 유저 인덱스 값 확인
exports.retrieveUser = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userResult = await userDao.selectUserId(connection, userId);

  connection.release();

  return userResult[0];
};

// API NO. 3 닉네임으로 프로필 조회 - 유저 인덱스 값을 이용해 회원 정보 추출 .. status 값을 받아온다.
exports.retrieveUserProfile = async function(userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userProfileResult = await userDao.selectUserId(connection, userId);
  connection.release();

  return userProfileResult
};


// API NO. 1 유저 생성 - 이메일 중복확인
// API No. 10 로그인 + JWT 발급 API
exports.emailCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const emailCheckResult = await userDao.selectUserEmail(connection, email);
  connection.release();
  console.log(emailCheckResult);
  return emailCheckResult;
};

// API NO. 1 유저 생성 - 유저 닉네임 중복확인
exports.nicknameCheck = async function (nickname) {
  const connection = await pool.getConnection(async (conn) => conn);
  const nicknameCheckResult = await userDao.selectUserNickname(connection, nickname);
  connection.release();

  return nicknameCheckResult;
};

// 팔로우 확인
exports.retrieveFollow = async function(userId, targetId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const followResult = await userDao.selectFollow(connection, userId, targetId);
  connection.release();

  return followResult;
};

// 팔로우 조회
exports.retrieveFollowUsers = async function(userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const followResult = await userDao.selectFollowUsers(connection, userId);
    connection.release();

    return followResult;
};


// 내가 팔로우 하고있는 사람들만 조회
exports.retrieveFollowUsersList = async function(userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const followOkResult = await userDao.selectFollowUsersList(connection, userId);
  connection.release();

  return followOkResult;
};




// API No. 10 로그인 + JWT 발급 API - 패스워드 체크
exports.passwordCheck = async function (selectUserPasswordParams) {
  const connection = await pool.getConnection(async (conn) => conn);
  const passwordCheckResult = await userDao.selectUserPassword(
      connection,
      selectUserPasswordParams
  );
  connection.release();
  return passwordCheckResult[0];
};


// API No. 10 로그인 + JWT 발급 API - 계정 상태 확인 id 및 status값 추출
exports.accountCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userAccountResult = await userDao.selectUserAccount(connection, email);
  connection.release();

  return userAccountResult;
};

exports.checkJWT = async function(userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const checkJWTResult = await userDao.selectJWT(connection, userId);
  connection.release();

  return checkJWTResult;
};