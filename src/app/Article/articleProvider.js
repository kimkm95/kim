const {response, errResponse} = require("../../../config/response");
const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const baseResponse = require("../../../config/baseResponseStatus");
const articleDao = require("./articleDao");
const articleService = require("./articleService");


// 게시글 존재 여부 확인 - userId
exports.checkArticle = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const selectArticleResult = await articleDao.checkArticle(connection, userId);
    connection.release();

    return selectArticleResult;
};

// 게시글 존재 여부 확인 - articleId
exports.articleIdCheck = async function(articleId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const articleIdResult = await articleDao.selectArticleByArticleId(connection, articleId);
    connection.release();

    return articleIdResult;
};

// 게시글 조회
exports.selectArticle = async function(nicknameUserId) {
    const connection = await pool.getConnection(async (conn) => conn);

    // 게시글 조회
    const articleResult = await articleDao.selectArticles(connection, nicknameUserId);
    connection.release();

    return articleResult;
}

// 게시글 이미지 결과물 찾기
exports.selectArticleImg = async function(articleId) {
    const connection = await pool.getConnection(async (conn) => conn);

    const selectArticleImgResult = articleDao.selectArticleImg(connection, articleId);
    connection.release();

    return selectArticleImgResult;
};

