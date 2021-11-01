// API NO. 3 닉네임으로 프로필 조회 - 모든 유저 조회
async function selectUser(connection) {
  const selectUserListQuery = `
                SELECT nickname,userId,status,isPublic,profileImg
                FROM userTB;
                `;
  const [userRows] = await connection.query(selectUserListQuery);
  return userRows;
}

// API NO. 1 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
  const insertUserInfoQuery = `
        INSERT INTO userTB(email, password, nickname, profileImg, birthday)
        VALUES (?, ?, ?, ?, ?);
    `;
  const insertUserInfoRow = await connection.query(
      insertUserInfoQuery,
      insertUserInfoParams
  );

  return insertUserInfoRow;
}

// API NO. 1 유저 생성 - 이메일로 회원 조회
async function selectUserEmail(connection, email) {
  const selectUserEmailQuery = `
                SELECT email, nickname 
                FROM userTB 
                WHERE email = ?;
                `;
  const [emailRows] = await connection.query(selectUserEmailQuery, email);
  console.log(emailRows);
  return emailRows;
}

// API NO. 1 유저 생성 - 닉네임으로 회원 조회
// API NO. 3 닉네임으로 프로필 조회 - 닉네임으로 id 값 추출
async function selectUserNickname(connection, nickname) {
  const selectUserNicknameQuery = `
                SELECT nickname,userId,status,isPublic
                FROM userTB
                WHERE nickname = ?;
                `;
  const [nicknameRows] = await connection.query(selectUserNicknameQuery, nickname);
  return nicknameRows;
}

//  API NO. 2 유저 본인 프로필 조회 - userId 회원 조회
// API NO. 3 닉네임으로 프로필 조회 - userId 회원 조회
async function selectUserId(connection, userId) {
  const selectUserIdQuery = `
    SELECT  userId,
            email,
            nickname,
            realName,
            profileImg,
            birthday,
            status,
--             case
--               when status = 'Y'
--                 then '활성화된 계정'
--               when status = 'B'
--                 then '정지된 계정'
--               when status = 'N'
--                 then '비 활성화된 계정'
--               when status = 'D'
--                 then '삭제된 계정'
--               end as 'status',
            isPublic,
            introduction,
--           # 팔로워 수
            (select count(userId)
             from followerTB
             where isAccepted = 'Y' and followerTB.userId = userTB.userId
             group by userId) as 'followerNumber',
     --        # 팔로잉 수
        (select count(userId)
         from followingTB
         where status = 'Y' and followingTB.userId = userTB.userId
         group by userId) as 'followingNumber',
   --        # 게시글 수
        (select count(userId)
         from articleTB
         where status = 'Y' and articleTB.userId = userTB.userId
         group by userId) as 'articleNumber',
        date_format(createdAt, '%Y년 %c월 %d일 가입') as 'createdAt'
    from userTB
    where userId = ?;
      
                 `;
  const [userRow] = await connection.query(selectUserIdQuery, userId);
  return userRow;
}

async function updateProfile(connection, userId, profileImg, nickname, realName, introduction) {
  const updateProfile = `
                UPDATE userTB
                SET profileImg = '${profileImg}',
                    nickname = '${nickname}',
                    realName = '${realName}',
                    introduction = '${introduction}'
                WHERE userId = ${userId};
                `;
  const updateProfileRow = await connection.query(updateProfile, userId, profileImg, nickname, realName, introduction);

  return updateProfileRow;
};

//유저 삭제
async function deleteUserStatus(connection, userId) {
  const deleteUserStatusQuery = `
  UPDATE userTB 
  SET status = 'N'
  WHERE userId = ?;
  `;
  const updateUserStatusRow = await connection.query(deleteUserStatusQuery, userId);
  return updateUserStatusRow[0];
}

// 유저 상태 변경
async function updateUserStatus(connection, userId, status, isPublic) {
  const updateUserStatusQuery = `
  UPDATE userTB 
  SET status = '${status}',
      isPublic = '${isPublic}'
  WHERE userId = ?;
  `;
  const updateUserStatusRow = await connection.query(updateUserStatusQuery, userId);
  return updateUserStatusRow[0];
}

// 유저 프로필 사진 변경
async function updateUserImage(connection, profileImg, userId) {
  const updateUserImageQuery = `
      UPDATE userTB
      SET profileImg = ?
      WHERE userId = ?;
  `;

  const updateUserImageResult = await connection.query(updateUserImageQuery, [profileImg, userId]);
  return updateUserImageResult[0];
}

// 팔로우 신청
async function selectFollow(connection, userId, targetId) {
  const selectFollowQuery = `
                SELECT userTB.status as 'status', targetId, followingStatus
                FROM followingTB
                       JOIN userTB on userTB.userId = followingTB.targetId
                WHERE followingTB.userId = ${userId} and targetId = ${targetId};
                `;
  const [selectFollowRow] = await connection.query(selectFollowQuery, userId);
  return selectFollowRow;
};

// 팔로잉 설정 변경
async function updateFollow(connection, userId, targetId, followingStatus) {
  const updateFollowQuery = `
                UPDATE followingTB
                SET followingStatus = '${followingStatus}'
                WHERE userId = ${userId} and targetId = ${targetId};
                `;
  const [updateFollowRow] = await connection.query(updateFollowQuery,  userId, targetId, followingStatus);

  return updateFollowRow;
};

// 팔로잉 추가
async function insertFollow(connection, userId, targetId) {
  const insertFollowQuery = `
                INSERT INTO followingTB(userId, targetId) 
                VALUES (${userId}, ${targetId});
                `;
  const insertFollowRow = await connection.query(insertFollowQuery, userId, targetId);

  return insertFollowRow;
};

// 팔로우 조회
async function selectFollowUsers(connection, userId) {
  const selectFollowUsersQuery = `
              SELECT nickname,
                     profileImg,
                     followingStatus,
                     (select count(userId)
                      from followerTB
                      where isAccepted = 'Y' and followerTB.userId = userTB.userId
                      group by userId) as 'followerNumber',
               --        # 팔로잉 수
                  (select count(userId)
                   from followingTB
                   where status = 'Y' and followingTB.userId = userTB.userId
                   group by userId) as 'followingNumber',
             --        # 게시글 수
                  (select count(userId)
                   from articleTB
                   where status = 'Y' and articleTB.userId = userTB.userId
                   group by userId) as 'articleNumber'
              FROM userTB
                     JOIN followingTB on userTB.userId = followingTB.targetId
              where userTB.userId = ?;
                `;
  const [selectFollowUsersRow] = await connection.query(selectFollowUsersQuery, userId);

  return selectFollowUsersRow;
};

// 내가 팔로우 하고있는 사람들의 리스트
async function selectFollowUsersList(connection, userId) {
  const selectFollowUsersListQuery = `
    SELECT targetId
    FROM userTB
           JOIN followingTB on userTB.userId = followingTB.userId and followingTB.followingStatus = 'Y'
    where userTB.userId = ?;
                `;
  const [selectFollowUsersListRow] = await connection.query(selectFollowUsersListQuery, userId);

  return selectFollowUsersListRow;
};





// async function selectFollowUsers(connection, userIdx) {
//   const selectFollowUsersQuery = `
//                 SELECT nickName,
//                     town,
//                     profileImgUrl,
//                     Following.status
//                 FROM Following
//                     join User on User.idx = Following.followUserIdx
//                 WHERE userIdx = ? and Following.status = 'ACTIVE';
//                 `;
//   const [selectFollowUsersRow] = await connection.query(selectFollowUsersQuery, userIdx);
//
//   return selectFollowUsersRow;
// };


// API No. 10 로그인 + JWT 발급 API - 패스워드 체크
async function selectUserPassword(connection, selectUserPasswordParams) {
  const selectUserPasswordQuery = `
        SELECT email, nickname, password
        FROM userTB 
        WHERE email = ? AND password = ?;`;
  const selectUserPasswordRow = await connection.query(
      selectUserPasswordQuery,
      selectUserPasswordParams
  );
  return selectUserPasswordRow;
}





// 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
async function selectUserAccount(connection, email) {
  const selectUserAccountQuery = `
        SELECT status, userId
        FROM userTB 
        WHERE email = ?;`;
  const selectUserAccountRow = await connection.query(
      selectUserAccountQuery,
      email
  );
  return selectUserAccountRow[0];
}

async function updateUserInfo(connection, id, nickname) {
  const updateUserQuery = `
  UPDATE UserInfo 
  SET nickname = ?
  WHERE id = ?;`;
  const updateUserRow = await connection.query(updateUserQuery, [nickname, id]);
  return updateUserRow[0];
}

async function selectJWT(connection, userId) {
  const selectJWTQuery = `
                SELECT jwt, userId
                FROM tokenTB
                WHERE userId = ?;
                `;
  const [selectJWTRow] = await connection.query(selectJWTQuery, userId);

  return selectJWTRow;
};


module.exports = {
  selectUser,
  selectUserEmail,
  selectUserNickname,
  selectUserId,
  insertUserInfo,
  selectUserPassword,
  selectUserAccount,
  updateUserInfo,
  updateProfile,
  updateUserStatus,
  updateUserImage,
  deleteUserStatus,
  selectFollow,
  updateFollow,
  insertFollow,
  selectFollowUsers,
  selectJWT,
  selectFollowUsersList,
};
