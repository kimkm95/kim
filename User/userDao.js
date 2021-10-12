// 모든 유저 조회
async function selectUser(connection) {
  const selectUserListQuery = `
                SELECT phoneNumber, nickname 
                FROM userDB;
                `;
  const [userRows] = await connection.query(selectUserListQuery);
  return userRows;
}

// 전화번호로 회원 조회
async function selectUserPhoneNumber(connection, phoneNumber) {
  const selectUserPhoneNumberQuery = `
                SELECT phoneNumber, nickname 
                FROM userDB 
                WHERE phoneNumber = ?;
                `;
  const [phoneNumberRows] = await connection.query(selectUserPhoneNumberQuery, phoneNumber);
  console.log(phoneNumberRows)
  return phoneNumberRows;
}

async function selectUserNickname(connection, nickname){
  const selectNicknameQuery = `
                SELECT userId, nickname, manner
                FROM User
                WHERE nickname = ?;
                `;

  const [nicknameRow] = await connection.query(selectnicknameQuery, nickname);
  return nicknameRow;

}

// userId 회원 조회
async function selectUserId(connection, userId) {
  const selectUserIdQuery = `
                 SELECT id,
                        nickname,
                        manner,
                        address,
                        (SELECT count(question*)
                         FROM evaluateTargetTB
                         JOIN userDB on evaluateTargetDB.evaluateTargetUserId = userDB.id) as '받은 매너평가점수',
                        DATE_FORMAT(createdAt, '%Y.%m.%d'),
                        (select count(*) 
                         from productDB 
                         where productDB.userId = userDB.id) as 'productCount'
--                         (select reviewerComment
--                          from reviewDB
--                          where userDB.id = ? and join userDB on productDB.userId = userDB.id
--                          where reviewDB.userid =in (select max(reviewId)
--                                          from reviewDB
--                                          where productDB.productId = reviewDB.productId)) as 'currentReview'
                 FROM userDB 
                 WHERE id = ?;
                 `;
  const [userRow] = await connection.query(selectUserIdQuery, userId);
  return userRow;
}

async function selectUserProduct(connection, userId) {
  const selectUserProductQuery = `
    SELECT  id as 'productId',
            userId,
            title,
            description,
            price,
            (SELECT category*
             FROM categoryDB
             WHERE category* = true 
             JOIN productDB on categoryDB.productId = productDB.id) as 'category',
            DATE_FORMAT(productDB.createdAt, '%Y.%m.%d'),
--             (select count(*) from likeDB where productDB.id = likeDB.productId and 
--                                            productDB.userId = userDB.id) as 'likeCount',
--             (select reviewerComment
--              from reviewDB
--              where ReviewId in (select max(reviewId) 
--                                 from reviewDB 
--                                 where productDB.id = reviewDB.productId)) as 'currentReview'
    from productDB
    where userId = ?;`;
  const [productRows] = await connection.query(selectUserProductQuery, userId);
  return productRows;
}

// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
  const insertUserInfoQuery = `
        INSERT INTO userDB(phoneNumber, password, nickname)
        VALUES (?, ?, ?);
    `;
  const insertUserInfoRow = await connection.query(
      insertUserInfoQuery,
      insertUserInfoParams
  );

  return insertUserInfoRow;
}

// 패스워드 체크
async function selectUserPassword(connection, selectUserPasswordParams) {
  const selectUserPasswordQuery = `
        SELECT phoneNumber, password, nickname
        FROM userDB 
        WHERE phoneNumber = ? AND password = ?;`;
  const selectUserPasswordRow = await connection.query(
      selectUserPasswordQuery,
      selectUserPasswordParams
  );

  return selectUserPasswordRow;
}

// 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
async function selectUserAccount(connection, phoneNumber) {
  const selectUserAccountQuery = `
        SELECT status, id
        FROM userDB 
        WHERE phoneNumber = ?;`;
  const selectUserAccountRow = await connection.query(
      selectUserAccountQuery,
      phoneNumber
  );
  return selectUserAccountRow[0];
}


async function updateUserStatusInfo(connection, userId, status) {
  const updateUserStatusQuery = `
  UPDATE userDB 
  SET status = ?
  WHERE id = ?;`;
  const updateUserStatusRow = await connection.query(updateUserStatusQuery, [userId, status]);
  return updateUserStatusRow[0];
}


async function updateUserInfo(connection, id, nickname, email, phoneNumber) {
  const updateUserQuery = `
  UPDATE userDB 
  SET nickname = ? AND email = ? AND phoneNumber = ?
  WHERE id = ?;`;
  const updateUserRow = await connection.query(updateUserQuery, [nickname,email, phoneNumber, id]);
  return updateUserRow[0];
}

async function updateUserProfileInfo(connection, id, profileName, profilePath) {
  const updateUserProfileQuery = `
  UPDATE userDB 
  SET profileName = ? AND profilePath = ?
  WHERE id = ?;`;
  const updateUserProfileRow = await connection.query(updateUserProfileQuery, [profileName,profilePath, id]);
  return updateUserProfileRow[0];
}

async function updateUserAddressInfo(connection, id, address) {
  const updateUserAddressQuery = `
  UPDATE userDB 
  SET address = ?
  WHERE id = ?;`;
  const updateUserAddressRow = await connection.query(updateUserAddressQuery, [address, id]);
  return updateUserAddressRow[0];
}


module.exports = {
  selectUser,
  selectUserPhoneNumber,
  selectUserProduct,
  selectUserId,
  insertUserInfo,
  selectUserPassword,
  selectUserAccount,
  updateUserStatusInfo,
  updateUserInfo,
  updateUserProfileInfo,
  updateUserAddressInfo,
  selectUserNickname
};




















