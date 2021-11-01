module.exports = function (app) {
    const article = require('./articleController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

        // 1. 게시글 조회 (닉네임 이용)
    app.get('/app/articles', jwtMiddleware, article.getArticle);
    //
    // 2. 게시글 이미지 조회
    app.get('/app/articles/:articleId/Images', jwtMiddleware, article.getArticleImg);
    //
    //3. 게시글 등록
    app.post('/app/articles', jwtMiddleware, article.postArticle);
    //
    // 4. 게시글 삭제, 삭제 시 게시글 + 연관 된 사진, 공감, 댓글, 대댓글 모두 삭제
    app.patch('/app/articles/:articleId/status', jwtMiddleware, article.patchArticleStatus);
    //
    // // 5. 사진 삭제
    // app.patch('/app/articles/images/:articleImgId', jwtMiddleware, article.deleteArticleImg);
    //
    // // 6. 게시글 heart 누름 API , likeTB status 'N' 값 전송 시 공감 취소
    // app.post('/app/articles/heart', jwtMiddleware, article.postHeart);
    //
    // // 7. 게시글 댓글 등록
    // app.post('/app/articles/comment', jwtMiddleware, article.postArticleComments);
    //
    // // 8. 게시글 수정
    // app.patch('/app/articles/:articleId', jwtMiddleware, article.patchArticle);
    //
    // // 9. 글 상태 수정
    // app.patch('/app/articles/: articleId/status', jwtMiddleware, article.patchArticleStatus);
    //
    // // 10. 대댓글 등록
    // app.post('/app/boards/subComments', jwtMiddleware, article.postArticleSubComments);
    //
    // // 11. 댓글 heart 누름 API , likeTB status 'N' 값 전송 시 공감 취소
    // app.post('/app/articles/commentHeart', jwtMiddleware, article.postCommentHeart);

    // // 12. 댓글 삭제
    // app.patch('/app/comments/:commentId/status', jwtMiddleware, article.deleteComments);

    // 13. 댓글 조회
    // app.get('/app/articles/comment/:articleId', article.getArticleComments);
}


// 그냥 단순하게 뿌려주는 방법, 조회수 반영, 팔로우에 상관없이, 노드js 이미지 출력 검색