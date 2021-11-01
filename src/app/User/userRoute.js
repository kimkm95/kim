module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 유저 생성 (회원가입) API
    app.post('/app/users', user.postUsers);

    //2. 유저 프로필 조회  API
    app.get('/app/users/:userId', jwtMiddleware ,user.getUser);

    // 3. 프로필 수정 API
    app.patch('/app/users/:userId/profile',user.patchUserProfile);
    //
    // 4. 회원 탈퇴 및 상태 변경 API
    app.patch('/app/users/:userId/status',user.patchUserStatus);
    //
    // 5. 프로필 이미지 수정 API
    app.patch('/app/users/:userId/profileImg',user.patchUserImg);
    //
    // 6. 팔로우 등록 API
    app.post('/app/users/:userId/following',user.postFollow);
    //
    // 7. 필로잉 유저 조회 API
    app.get('/app/users/:userId/following',user.getFollow);

    // 8. 필로잉 유저의 게시글 조회 API
    // app.get('/app/users/:userId/following/post',user.getFollowUserPost);

    // 9. 로그인 + JWT 발급 API
    app.post('/app/login', user.login);

    // 10. 자동 로그인
    app.get('/app/auto-login', jwtMiddleware, user.check);
};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API

// // 회원 정보 수정 API (JWT 검증 및 Validation - 메소드 체이닝 방식으로 jwtMiddleware 사용)
// app.patch('/app/users/:userId', jwtMiddleware, user.patchUsers)