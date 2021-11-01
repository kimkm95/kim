const jwtMiddleware = require("../../../config/jwtMiddleware");
const articleProvider = require("../../app/Article/articleProvider");
const articleService = require("../../app/Article/articleService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse , response2} = require("../../../config/response");
const userProvider = require("../User/userProvider");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");
const {check} = require("../User/userController");
var regPhoneNumber = /^\d{3}\d{3,4}\d{4}$/;
var regPassword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,16}/;


/*
    API No. 1
    API Name : 게시글 조회 (닉네임 이용)
    [GET] /app/articles?nickname =
*/
exports.getArticle = async function(req, res) {
    const userId = req.verifiedToken.userId;
    // 닉네임으로 검색된 상대의 게시글을 조회하는 것
    const nickname = req.query.nickname;
    var selectArticleImgResult = [];
    var result = [];

    if(!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
    if(!nickname) return res.send(errResponse(baseResponse.SIGNUP_NICKNAME_EMPTY));

    // 입력한 닉네임의 유저 인덱스 값을 불러오는 과정
    const userListByNickname = await userProvider.retrieveUserList(nickname);
    const nicknameUserId = userListByNickname[0].userId

    const userProfileResult = await userProvider.retrieveUserProfile(nicknameUserId);
    const nicknameUserStatus = userListByNickname[0].status
    const nicknameUserIsPublic = userProfileResult[0].isPulbic


    // 닉네임 상태값을 받아서 활성화된 계정인지 확인하기
    if(nicknameUserStatus != 'Y') {
        return res.send(errResponse(baseResponse.USER_NOT_ACTIVATED));
    }

    // 닉네임 상대가 비공계 개정인지 확인하기
    if(userProfileResult[0].isPublic == 'N'){
        const followResult = await userProvider.retrieveFollowUsers(nicknameUserId);
        if (followResult[0].followingStatus == 'N')
            return res.send(response(baseResponse.USER_NOT_FOLLOWING_AND_PRIVATEACCOUNT, followResult[0]));
    }


    const checkArticleresult = await articleProvider.checkArticle(nicknameUserId);
    if(checkArticleresult.length === 0) return res.send(errResponse(baseResponse.ARTICLE_NOT_EXIST));
    for (let i = 0; i < checkArticleresult.length; i++){
        selectArticleImgResult[i] = await articleProvider.selectArticleImg(checkArticleresult[i].articleId)
    }
    const selectArticlResult = await articleProvider.selectArticle(nicknameUserId);

    for (let i = 0; i < checkArticleresult.length; i++){
        result[i] = {
            "board": {
                "boardImage": selectArticleImgResult[i],
                "boardContents": selectArticlResult[i]
            }
        }
    }

    // const selectUserHashtagResult = await HashtagProvider.retrievesHashtagList(usrId);
    // const selectArticleCommentResult = await articleProvider.selectArticleComment(userId);

    return res.send(response(baseResponse.ARTICLE_SELECT_SUCCESS, result));
};

/*
    API No. 2
    API Name : 게시글 이미지 조회
    [GET] /app/articles/:articleId/Images
*/
exports.getArticleImg = async function (req, res) {

    const userId = req.verifiedToken.userId;
    const articleId = req.params.articleId;

    if(!articleId) return res.send(errResponse(baseResponse.USER_ARTICLEID_EMPTY));
    if(!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const checkArticle = await articleProvider.checkArticle(userId);
    if(checkArticle.length === 0) return res.send(errResponse(baseResponse.ARTICLE_NOT_EXIST));

    const selectArticleImgResult = await articleProvider.selectArticleImg(articleId);
    if(selectArticleImgResult.length === 0) return res.send(errResponse(baseResponse.BOARD_IMAGE_NOT_EXIST));

    return res.send(response(baseResponse.ARTICLEIMAGE_SELECT_SUCCESS, selectArticleImgResult));
};

/*
    API No. 3
    API Name : 게시글 등록
    [POST] /app/articles
*/
exports.postArticle = async function (req, res){

    /*
    Body : userId, location, description, imgUrl, isManyImg
    */
    const userId = req.verifiedToken.userId;
    const {location, description, isManyImg } = req.body;

    if (!userId) {
        return res.send(response(baseResponse.ARTICLE_USERIDX_EMPTY));
    }  else if (!location) {
        return res.send(response(baseResponse.ARTICLE_TITLE_EMPTY));
    } else if (!description) {
        return res.send(response(baseResponse.ARTICLE_DESCRIPTION_EMPTY));
    }
    if (location.length > 100) {
        return res.send(response(baseResponse.ARTICLE_TITLE_LENGTH));
    } else if (description.length > 200) {
        return res.send(response(baseResponse.ARTICLE_DESCRIPTION_LENGTH));
    }

    // 그림을 하나만 업로드 할 경우
    if (!isManyImg || isManyImg == 'N') {

        const imgUrl = req.body.imgUrl
        if (!imgUrl) return res.send(errResponse(baseResponse.USER_ARTICLEIMG_EMPTY));

        const insertArticleResult = await articleService.insertArticle(userId, location, description, isManyImg);
        const checkArticle = await articleProvider.checkArticle(userId);
        console.log(insertArticleResult)

        //가장 최근에 만든 게시글에 이미지 파일 업로드
        const articleId = checkArticle[checkArticle.length -1].articleId

        const insertArticleImgResult = await articleService.insertImgArticle(articleId, imgUrl);

        console.log(insertArticleImgResult)
        return res.send(response(baseResponse.ARTICLE_INSERT_SUCCESS));
    }
    // 그림을 여러개 업로드 할 경우
    else if (isManyImg == 'Y'){
        const imgUrl = req.body.imgUrl
        console.log(imgUrl.length)
        const insertImgResult = [];

        if (!imgUrl) return res.send(errResponse(baseResponse.USER_ARTICLEIMG_EMPTY));

        const insertArticleResult = await articleService.insertArticle(userId, location, description, isManyImg);
        const checkArticle = await articleProvider.checkArticle(userId);
        const articleId = checkArticle[checkArticle.length -1].articleId

        for(let i = 0; i < imgUrl.length; i++){
            insertImgResult[i] = await articleService.insertImgArticle(articleId, imgUrl[i]);
        }

        return res.send(response(baseResponse.ARTICLE_INSERT_SUCCESS));
    }

}

/*
    API No. 4
    API Name : 게시글 삭제 (게시글 + 연관 된 사진, 하트, 댓글, 대댓글 모두 삭제)
    [PATCH] /app/articles/:articleId/status
*/
exports.patchArticleStatus = async function (req, res) {
    const userId = req.verifiedToken.userId;
    const articleId = req.params.articleId;

    /*
    Body : articleStatus, isSponsor
*/
    const { articleStatus, isSponsor } = req.body;

    if(!articleId) return res.send(errResponse(baseResponse.USER_ARTICLEID_EMPTY));
    if(!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    // 게시글 존재여부 확인
    const userArticleResult = await articleProvider.articleIdCheck(articleId);
    if (userIdResult.length < 1) {
        return res.send(response(baseResponse.ARTICLE_NOT_EXIST));
    }

    if (!articleStatus) {
        const articleStatus = userArticleResult.articleStatus
    }
    if (!isSponsor) {
        const isSponsor = userArticleResult.isSponsor
    }

    if(!(articleStatus && isSponsor)){
        const deleteArticleResult = await articleService.deleteArticle(articleId, userId);
        return res.send(deleteArticleResult);
    }
    else{
        const editArticleStatus = await articleService.editArticleStatus(articleId, articleStatus, isSponsor);
        console.log(editUserStatus)
        return res.send(editUserStatus);
    }


    return res.send(deleteArticleResult);
};

/*
    API No. 5
    API Name : 사진 삭제
    [PATCH] /app/articles/images/:articleImgId
*/
exports.deleteArticleImg = async function (req, res) {
    const usrId = req.verifiedToken.userId;
    const ArticleImgId = req.params.ArticleImgId;

    if(!usrId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
    if(!ArticleImgId) return res.send(errResponse(baseResponse.USER_BOARDIMG_EMPTY));

    const deleteArticleImgResult = await articleService.deleteArticleImage(usrId, ArticleImgId);

    return res.send(deleteArticleImgResult);
};

/*
    API No. 6
    API Name : 게시판 heart 누름 API , likeTB status 'N' 값 전송 시 공감 취소
    [POST] /app/articles/heart
*/
exports.postHeart = async function (req, res) {
    const usrId = req.verifiedToken.userId;
    const {articleId, status} = req.body;

    if(!articleId) return res.send(errResponse(baseResponse.USER_BOARDID_EMPTY));
    if(!usrId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
    if(!status) return res.send(errResponse(baseResponse.BOARD_EMOJI_EMPTY));

    const articleHeartResult = await articleService.editArticleHeart(articleId, usrId, status);

    return res.send(articleHeartResult);
};

/*
    API No. 7
    API Name : 게시글 댓글 등록
    [POST] /app/articles/comments
*/
exports.postArticleComment = async function (req, res) {

    const usrId = req.verifiedToken.userId;
    const articleId = req.params.articleId;
    const content = req.body.content;

    if(!articleId) return res.send(errResponse(baseResponse.USER_BOARDID_EMPTY));

    if(!content) return res.send(errResponse(baseResponse.USER_BOARDID_EMPTY));

    const ArticleCommentResult = await articleProvider.postArticleComment(content);

    return res.send(ArticleCommentResult);
};

/*
    API No. 10
    API Name : 대 댓글 등록 API
    [POST] /app/boards/subComments
*/
exports.postBoardSubComments = async function (req, res) {
    const {articleId, commentId, content } = req.body;
    const usrId = req.verifiedToken.userId;

    if(!articleId) return res.send(errResponse(baseResponse.USER_BOARDID_EMPTY));
    if(!usrId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
    if(!content || content === "") return res.send(errResponse(baseResponse.USER_BOARDCOMMENTCONTENTS_EMPTY));
    if(!commentId) return res.send(errResponse(baseResponse.USER_COMMENTID_EMPTY));

    const postBoardSubCommentResult = await boardService.postBoardSubComment(articleId, usrId, content, commentId);

    return res.send(postBoardSubCommentResult);
};


/*
    API No. 8
    API Name : 게시글 수정 API
    [PATCH] /app/articles/:articleId
*/
// exports.patchArticle = async function(req, res) {
//     // Path Variable : articleId
//     const articleId = req.params.articleId;
//     /*
//         Body : userId, location, description, imgUrl, status, isSponsor
//     */
//     var {location, description, imgUrl, status, isSponsor} = req.body;
//
//     // 존재하는 글인지 확인
//     const checkArticleId = await articleProvider.articleIdCheck(articleId);
//     if (checkArticleId.length < 1) {
//         return res.send(response(baseResponse.ARTICLE_ARTICLEIDX_WRONG));
//     }
//
//     const usrId = req.verifiedToken.userId;
//
//     if (!location) {
//         return res.send(response(baseResponse.MODIFY_ARTICLEIMG_EMPTY));
//     } else if (!description) {
//         description = null
//     } else if (!imgUrl) {
//         return res.send(response(baseResponse.MODIFY_TITLE_EMPTY));
//     } else if (!status) {
//         status = 'Y'
//     } else if (!isSponsor) {
//         status = 'N'
//     }
//
//     if (imgUrl && typeof(imgUrl) == "string") {
//         return res.send(response(baseResponse.ARTICLE_IMG_WRONG));
//     }
//
//     if (location.length > 100) {
//         return res.send(response(baseResponse.ARTICLE_TITLE_LENGTH));
//     } else if (description.length > 200) {
//         return res.send(response(baseResponse.ARTICLE_DESCRIPTION_LENGTH));
//     }
//
//     if (!regexUrl.test(imgUrl)){
//         return res.send(response(baseResponse.LOCALAD_PHONENUMBER_ERROR_TYPE));
//     }
//     if (status == "N") {
//         return res.send(response(baseResponse.LOCALAD_PHONENUMBER_ERROR_TYPE));
//     }
//     if (isSponsor == "Y") {
//         const editArticle = await articleService.editArticle(location, description, imgUrl, status, isSponsor);
//         const result = {
//             "Sponsored"
//             "result" : editArticle
//         }
//         return res.send(result);
//     } else {
//         return res.send(editArticle);
//     }
// };

/*
    API No. 9
    API Name : 글 상태 수정 API
    [PATCH] /app/articles/: articleId/status
*/
// exports.patchArticleStatus = async function(req, res) {
//     // Path Variable : articleId
//     const articleId = req.params.articleId;
//
//     /*
//         Body : status
//     */
//     const { status, isSponsor } = req.body;
//
//     // 게시글에서 유저 아이디값 가져오기
//     const userIdResult = await articleProvider.articleIdCheck(articleId);
//     if (userIdResult.length < 1) {
//         return res.send(response(baseResponse.ARTICLE_ARTICLE_NOT_EXIST));
//     }
//     const userId = userIdResult[0].userId;
//
//     if (!articleId) {
//         return res.send(response(baseResponse.ARTICLE_ARTICLEIDX_EMPTY));
//     }
//
//     const usrId = req.verifiedToken.userId;
//
//     if (!status) {
//         return res.send(response(baseResponse.ARTICLE_STATUS_EMPTY));
//     } else if (status == "Y" || status == "N" || status == "H") {
//         const editStatus = await articleService.editArticleStatus(articleId, status);
//     }
//
//     if (!isSponsor) {
//         return res.send(response(baseResponse.ARTICLE_STATUS_EMPTY));
//     } else if (isSponsor == "Y" || status == "N") {
//         const editIsSponsor = await articleService.editArticleIsSponsor(articleId, isSponsor);
//     }
//
//     const statusResult = {
//         "Status" : editStatus
//         "isSponsor" : editIsSponsor
//     }
//     return res.send(statusResult);
//
// };

/*
    API No. 10
    API Name : 대 댓글 등록 API
    [POST] /app/articles/subComments
*/
exports.postArticleSubComments = async function (req, res) {
    const {articleId, commentId, content } = req.body;
    const usrId = req.verifiedToken.userId;

    if(!articleId) return res.send(errResponse(baseResponse.USER_BOARDID_EMPTY));
    if(!usrId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
    if(!content || content === "") return res.send(errResponse(baseResponse.USER_BOARDCOMMENTCONTENTS_EMPTY));
    if(!commentId) return res.send(errResponse(baseResponse.USER_COMMENTID_EMPTY));

    const postBoardSubCommentResult = await boardService.postBoardSubComment(articleId, usrId, content, commentId);

    return res.send(postBoardSubCommentResult);
};

/*
    API No. 11
    API Name : 댓글에 좋아요 등록 API
    [POST] /app/articles/commentHeart
*/

exports.postCommentHeart = async function (req, res) {
    const usrId = req.verifiedToken.userId;
    const {commentId, status} = req.body;

    if(!commentId || commentId === "") return res.send(errResponse(baseResponse.USER_COMMENTID_EMPTY));
    if(!usrId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
    if(!status || status === "") return res.send(errResponse(baseResponse.COMMENT_EMOJI_EMPTY));

    const CommentHeartResult = await boardService.postCommentHeart(status, commentId, usrId);

    return res.send(CommentHeartResult);
};

// /*
//     API No. 2
//     API Name : 특정 댓글 수정 API
//     [PATCH] /app/comments/:commentId
// */
// exports.patchComment = async function(req, res) {
//     // Path Variable : commentId
//     const commentId = req.params.commentId;
//     const content = req.body.content;
//
//     if (!commentId) {
//         return res.send(response(baseResponse.COMMENT_COMMENTIDX_EMPTY));
//     }
//
//     // 존재하는 comment인지 확인
//     const commentById = await commentProvider.retrieveCommentById(commentId);
//     if (commentById.isSuccess == false) {
//         return res.send(commentById);
//     }
//     const userId = commentById[0].userId;
//     const usrId = req.verifiedToken.userId;
//
//     const editComment = await commentService.editComment(commentId);
//
//     editComment[0].content = content;
//
//     return res.send(editComment);
// };