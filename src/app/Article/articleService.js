const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const articleProvider = require("./articleProvider");
const articleDao = require("./articleDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// 게시글 업로드
exports.insertArticle = async function (userId, location, description, isManyImg) {
    try {
        const insertArticleParams = [userId, location, description, isManyImg];
        const connection = await pool.getConnection(async (conn) => conn);
        const insertArticleResult = await articleDao.insertArticle(connection, insertArticleParams);
        console.log(`추가된 게시글`)
        connection.release();

        return insertArticleResult;

    } catch (err) {
        logger.error(`App - insertArticle Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 이미지 업로드
exports.insertImgArticle = async function (articleId, imgUrl) {
    try {
        const insertArticleImgParams = [articleId, imgUrl];
        const connection = await pool.getConnection(async (conn) => conn);
        const insertArticleImgResult = await articleDao.insertArticleImg(connection, insertArticleImgParams);
        console.log(`추가된 사진`)
        connection.release();

        return insertArticleImgResult;
    } catch(err) {
        logger.error(`App - insertImgArticle Service Error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 게시글 삭제
exports.deleteArticle = async function (articleId, userId) {
    try {

        // 게시글 존재여부 확인
        const userArticleResult = await articleProvider.articleIdCheck(articleId);
        const articleUserId = userArticleResult.userId

        //게시판을 등록한 유저가 아닐 경우
        if(articleUserId != userId){
            return errResponse(baseResponse.ARTICLE_USER_DIFFERENT);
        }

        const checkArticleImgRows = await articleProvider.selectArticleImg(articleId);
        // const checkBoardCommentRows = await boardProvider.checkBoardComment(boardIdx);

        const connection = await pool.getConnection(async (conn) => conn);
        const deleteArticleResult = await articleDao.deleteArticle(connection, articleId, userId);

        if(checkArticleImgRows.length > 0) {
            const deleteArticleImg = await articleDao.deleteArticleImg(connection, articleId);
        }
        else console.log('board image empty');

        // if(checkBoardCommentRows.length > 0) {
        //     const deleteBoardCommentRows = await boardDao.deleteBoardComments(connection, boardIdx);
        // }
        // else console.log('board comments empty');


        connection.release();

        return response(baseResponse.ARTICLE_DELETE_SUCCESS, deleteArticleResult[0].info);
    } catch (err) {
        logger.error(`App - deleteArticle Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 게시글 수정
exports.editUserStatus = async function (articleId, articleStatus, isSponsor) {
    try {
        // 기존 값
        const articleStatusRows = await articleProvider.articleIdCheck(articleId);

        const connection = await pool.getConnection(async (conn) => conn);
        // 변경 할 값
        const updateArticleStatusResult = await articleDao.updateArticleStatus(connection, articleId, articleStatus, isSponsor);
        connection.release();

        if(articleStatusRows.articleStatus == 'N'){
            if(articleStatus == 'Y'){
                return response(baseResponse.ARTICLE_COMEBACK_SUCCESS, updateArticleStatusResult.info);
            } else if(articleStatus == 'N') {
                return errResponse(baseResponse.SIGNIN_INACTIVE_ARTICLE_STATUS);
            } else if(articleStatus == 'H') {
                return errResponse(baseResponse.SIGNIN_HIDE_ARTICLE_STATUS);
            }
        }
        if(articleStatusRows.articleStatus == 'H'){
            if(articleStatus == 'Y'){
                return response(baseResponse.ARTICLE_COMEBACK_SUCCESS, updateArticleStatusResult.info);
            } else if(articleStatus == 'N') {
                return errResponse(baseResponse.SIGNIN_INACTIVE_ARTICLE_STATUS);
            } else if(articleStatus == 'H') {
                return errResponse(baseResponse.SIGNIN_HIDE_ARTICLE_STATUS);
            }
        }
        if(userStatusRows.status == 'Y'){
            if(articleStatus == 'Y'){
                return response(baseResponse.ARTICLE_COMEBACK_SUCCESS, updateArticleStatusResult.info);
            } else if(articleStatus == 'N') {
                return errResponse(baseResponse.SIGNIN_INACTIVE_ARTICLE_STATUS);
            } else if(articleStatus == 'H') {
                return errResponse(baseResponse.SIGNIN_HIDE_ARTICLE_STATUS);
            }
        }

        if(userStatusRows.articleStatus == 'Y'){
            if(isSponsor == 'N'){
                return response(baseResponse.USER_INACTIVE_SUCCESS, updateArticleStatusResult.info);
            }else{
                if(userStatusRows.isPublic == 'Y'){
                    if(isSponsor = 'N'){
                        return response(baseResponse.ISPUBLIC_STATUS_NO, updateArticleStatusResult.info);
                    }
                }if(userStatusRows.isPublic == 'N') {
                    if (isSponsor = 'Y') {
                        return response(baseResponse.ISPUBLIC_STATUS_YES, updateArticleStatusResult.info);
                    }
                }
            }
        }
        else{
            console.log(1)
            return response(baseResponse.USER_STATUS_UPDATE_SUCCESS);
        }

    } catch (err) {
        logger.error(`App - editArticleStatus Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};
