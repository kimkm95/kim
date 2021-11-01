
// 게시글 체크 - userId
async function checkArticle(connection, userId) {
    const checkArticleQuery = `
        SELECT userId, location, description, articleId
        FROM articleTB
        WHERE userId = ?;
    `;

    const checkArticleResult = await connection.query(
        checkArticleQuery,
        userId
    );

    return checkArticleResult[0];
}

// 게시글 체크 - articleId
async function selectArticleByArticleId(connection, articleId) {
    const selectArticleByArticleIdQuery = `
                SELECT articleId, userId, isSponsor, articleStatus
                FROM articleTB
                WHERE articleId = ? and status != 'N';
                `;
    const [articleIdRow] = await connection.query(selectArticleByArticleIdQuery, articleId);

    return articleIdRow;
};

// 선택된 게시글 보여주기
async function selectArticles (connection, nicknameUserId){
var selectArticlesQuery = `                
            SELECT DISTINCT articleTB.articleId,
                  case when articleStatus = 'Y'
                           then '활성화된 게시글'
                       when articleStatus = 'N'
                           then '비 활성화된 게시글'
                       else '숨김 글'
                      end as 'articleStatus',
                  articleTB.userId,
                  location,
                  description,
                  case
                      when timestampdiff(second, articleTB.updatedAt, current_timestamp) < 60
                          then concat(timestampdiff(second, articleTB.updatedAt, current_timestamp), '초 전')
                      when timestampdiff(minute, articleTB.updatedAt, current_timestamp) < 60
                          then concat(timestampdiff(minute, articleTB.updatedAt, current_timestamp), '분 전')
                      when timestampdiff(hour, articleTB.updatedAt, current_timestamp) < 24
                          then concat(timestampdiff(hour, articleTB.updatedAt, current_timestamp), '시간 전')
                      when timestampdiff(day, articleTB.updatedAt, current_timestamp) < 7
                          then concat(timestampdiff(day, articleTB.updatedAt, current_timestamp), '일 전')
                      when timestampdiff(week, articleTB.updatedAt, current_timestamp) = 1
                          then '지난 주'
                      when timestampdiff(week, articleTB.updatedAt, current_timestamp) < 4 and timestampdiff(week, articleTB.updatedAt, current_timestamp) > 1
                          then concat(timestampdiff(week, articleTB.updatedAt, current_timestamp), '주 전')
                      when timestampdiff(month, articleTB.updatedAt, current_timestamp) = 1
                          then '지난 달'
                      when timestampdiff(month, articleTB.updatedAt, current_timestamp) < 12 and timestampdiff(month, articleTB.updatedAt, current_timestamp) > 1
                          then concat(timestampdiff(day, articleTB.updatedAt, current_timestamp), '개월 전')
                      when timestampdiff(year, articleTB.updatedAt, current_timestamp) = 1
                          then '지난 해'
                      else concat(timestampdiff(year, articleTB.updatedAt, current_timestamp), '년 전')
                      end as 'updateAt',
                   isSponsor,
                  commentCount,
                  likeCount,
                  nickname,
                  profileImg,
                  case when isSponsor = 'Y'
                           then 'Sponsored'
                      end as 'isSponsor',
                   case when userTB.isPublic = 'Y'
                       then 'PublicAccount'
                       when userTB.isPublic = 'N'
                           then 'PrivateAccount'
                       end as 'isPublic'
           FROM articleTB
                    left join userTB on userTB.userId = articleTB.userId
                    left join articleImgTB on articleImgTB.articleId = articleTB.articleId
--                                                         left join (select articleId, COUNT(articleId) as liked from likeArticleTB where likeArticleTB.status != 'N' group by likeArticleTB.articleId) l
--                                                                   on l.articleId = articleTB.articleId
--                                                         left join (select articleId, COUNT(articleId) as comments from likeCommentTB where likeCommentTB.status != 'N' group by likeCommentTB.articleId) com
--                                                                   on com.articleId = articleTB.articleId
           WHERE articleTB.articleStatus != 'N' and articleTB.userId = ?;`;

    const [articleResult] = await connection.query(selectArticlesQuery, nicknameUserId);

    return articleResult;
};

// 이미지 조회
async function selectArticleImg(connection, articleId) {
    const selectArticleImgQuery = `
                SELECT imgUrl
                FROM articleImgTB
                JOIN articleTB on articleTB.articleId = articleImgTB.articleId
                WHERE articleImgTB.articleId = ?;
                `;
    const [articleImgRows] = await connection.query(selectArticleImgQuery, articleId);

    return articleImgRows;
};

// 게시글 등록
async function insertArticle(connection, insertArticleParams) {
    const insertArticleQuery = `
            INSERT INTO articleTB(userId, location, description, isManyImg)
            VALUES (?, ?, ?, ?);
      `;

    const insertArticleResult = await connection.query(
        insertArticleQuery,
        insertArticleParams
    );

    return insertArticleResult;
}

// 게시글 이미지 업로드
async function insertArticleImg(connection, insertArticleImgParams) {
    const insertArticleImgQuery = `
                INSERT INTO articleImgTB(articleId, imgUrl)
                VALUES (?, ?);
                `;
    const insertArticleImgResult = await connection.query(insertArticleImgQuery, insertArticleImgParams);

    return insertArticleImgResult;
};

// 게시글 삭제
async function deleteArticle(connection, articleId, userId){
    const deleteArticleQuery = `
        UPDATE articleTB
        SET articleStatus = 'N'
        WHERE articleId = ?
          AND userId = ?;
    `;

    const deleteArticleResult = await connection.query(
        deleteArticleQuery,
        [articleId, userId]
    );

    return deleteArticleResult;
}

// 게시글 이미지 삭제
async function deleteArticleImg(connection, articleId) {
    const deleteArticleImagesQuery = `
        DELETE
        FROM articleImgTB
        WHERE articleId = ?;
    `;

    const deleteArticleImagesResult = await connection.query(
        deleteArticleImagesQuery,
        articleId
    );

    return deleteArticleImagesResult;
}

async function updateArticleStatus(connection, articleId, articleStatus, isSponsor) {
    const updateArticleStatusQuery = `
        UPDATE articleTB
            SET articleStatus = ?,
                isSponsor = ?
            WHERE articleId = ?;
    `;

    const updateArticleStatusResult = await connection.query(
        updateArticleStatusQuery,
        [articleId, articleStatus, isSponsor]
    );

    return updateArticleStatusResult;
}

module.exports = {
    checkArticle,
    selectArticleByArticleId,
    insertArticle,
    insertArticleImg,
    selectArticles,
    selectArticleImg,
    deleteArticle,
    deleteArticleImg,
    updateArticleStatus

};