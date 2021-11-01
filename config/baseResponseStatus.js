module.exports = {

    // Success
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },
    PROFILE_SELECT_SUCCESS : { "isSuccess": true, "code": 1001, "message":"유저 조회 성공" },
    USER_DELETE_SUCCESS  : { "isSuccess": true, "code": 1002, "message":"유저 삭제 성공" },
    USER_INACTIVE_SUCCESS : { "isSuccess": true, "code": 1003, "message":"계정 비활성화 성공" },
    USER_COMEBACK_SUCCESS  : { "isSuccess": true, "code": 1004, "message":"계정 복귀 성공" },
    USER_IMAGE_UPDATE_SUCCESS : { "isSuccess": true, "code": 1005, "message":"유저 프로필 사진 변경 성공" },
    USER_STATUS_UPDATE_SUCCESS : { "isSuccess": true, "code": 1006, "message":"유저 상태 변경 성공" },
    USER_FOLLOWING_SUCCESS : { "isSuccess": true, "code": 1007, "message":"팔로잉 성공" },
    USER_FOLLOWING_VIEW_SUCCESS : { "isSuccess": true, "code": 1008, "message":"팔로잉 유저 조회 성공" },
    ARTICLE_INSERT_SUCCESS : { "isSuccess": true, "code": 1009, "message":"게시글 등록 성공" },
    ARTICLE_SELECT_SUCCESS : { "isSuccess": true, "code": 1010, "message":"게시글 조회 성공" },
    ARTICLEIMAGE_SELECT_SUCCESS : { "isSuccess": true, "code": 1011, "message":"게시글 이미지 조회 성공" },
    ARTICLEIMG_INSERT_SUCCESS : { "isSuccess": true, "code": 1012, "message":"게시글 이미지 등록 성공" },
    USER_PROFILE_UPDATE_SUCCESS : { "isSuccess": true, "code": 1013, "message":"프로필 업데이트 성공" },
    ARTICLE_DELETE_SUCCESS : { "isSuccess": true, "code": 1014, "message":"게시글 삭제 성공" },
    ARTICLE_COMEBACK_SUCCESS : { "isSuccess": true, "code": 1015, "message":"게시글 복구 성공" },


    // Common
    TOKEN_EMPTY : { "isSuccess": false, "code": 2000, "message":"JWT 토큰을 입력해주세요." },
    TOKEN_VERIFICATION_FAILURE : { "isSuccess": false, "code": 3000, "message":"JWT 토큰 검증 실패" },
    TOKEN_VERIFICATION_SUCCESS : { "isSuccess": true, "code": 1001, "message":"JWT 토큰 검증 성공" }, // ?

    //Request error
    SIGNUP_EMAIL_EMPTY : { "isSuccess": false, "code": 2001, "message":"이메일을 입력해주세요" },
    SIGNUP_EMAIL_LENGTH : { "isSuccess": false, "code": 2002, "message":"이메일은 30자리 미만으로 입력해주세요." },
    SIGNUP_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2003, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNUP_PASSWORD_EMPTY : { "isSuccess": false, "code": 2004, "message": "비밀번호를 입력 해주세요." },
    SIGNUP_PASSWORD_LENGTH : { "isSuccess": false, "code": 2005, "message":"비밀번호는 6~20자리를 입력해주세요." },
    SIGNUP_NICKNAME_EMPTY : { "isSuccess": false, "code": 2006, "message":"닉네임을 입력 해주세요." },
    SIGNUP_NICKNAME_LENGTH : { "isSuccess": false,"code": 2007,"message":"닉네임은 최대 20자리를 입력해주세요." },


    SIGNIN_EMAIL_EMPTY : { "isSuccess": false, "code": 2008, "message":"이메일을 입력해주세요" },
    SIGNIN_EMAIL_LENGTH : { "isSuccess": false, "code": 2009, "message":"이메일은 30자리 미만으로 입력해주세요." },
    SIGNIN_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2010, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNIN_PASSWORD_EMPTY : { "isSuccess": false, "code": 2011, "message": "비밀번호를 입력 해주세요." },

    USER_USERID_EMPTY : { "isSuccess": false, "code": 2012, "message": "userId를 입력해주세요." },
    USER_USERID_NOT_EXIST : { "isSuccess": false, "code": 2013, "message": "해당 회원이 존재하지 않습니다." },

    USER_USEREMAIL_EMPTY : { "isSuccess": false, "code": 2014, "message": "이메일을 입력해주세요." },
    USER_USEREMAIL_NOT_EXIST : { "isSuccess": false, "code": 2015, "message": "해당 이메일을 가진 회원이 존재하지 않습니다." },
    USER_ID_NOT_MATCH : { "isSuccess": false, "code": 2016, "message": "유저 아이디 값을 확인해주세요" },
    USER_NICKNAME_EMPTY : { "isSuccess": false, "code": 2017, "message": "변경할 닉네임 값을 입력해주세요" },

    USER_STATUS_EMPTY : { "isSuccess": false, "code": 2018, "message": "회원 상태값을 입력해주세요" },

    SIGNIN_PASSWORD_ERROR_TYPE : { "isSuccess": false, "code": 2019, "message":"패스워드 형식을 정확하게 입력해주세요." },
    SIGNUP_PASSWORD_ERROR_TYPE : { "isSuccess": false, "code": 2020, "message":"패스워드 형식을 정확하게 입력해주세요." },
    USER_ID_NOT_MATCH : { "isSuccess": false, "code": 2021, "message": "userId를 확인해주세요."},
    PROFILE_REALNAME_EMPTY : { "isSuccess": false, "code": 2022, "message": "이름을 입력해주세요." },
    PROFILE_INTRODUCTION_EMPTY : { "isSuccess": false, "code": 2023, "message": "회원 소개를 입력해주세요." },
    PROFILE_PROFILEIMG_EMPTY : { "isSuccess": false, "code": 2024, "message": "프로필 사진을 입력해주세요." },
    PROFILE_NICKNAME_EMPTY : { "isSuccess": false, "code": 2025, "message": "닉네임을 입력해주세요." },
    PROFILE_REALNAME_EMPTY : { "isSuccess": false, "code": 2026, "message": "이름을 입력해주세요." },
    PROFILE_INTRODUCTION_EMPTY : { "isSuccess": false, "code": 2027, "message": "소개를 입력해주세요." },
    ISPUBLIC_STATUS_NO : { "isSuccess": false, "code": 2028, "message": "비공개 계정으로 전환되었습니다." },
    ISPUBLIC_STATUS_YES : { "isSuccess": false, "code": 2029, "message": "공개 계정으로 전환되었습니다." },
    USER_FOLLOWUSER_EMPTY : { "isSuccess": false, "code": 2030, "message": "팔로우 할 유저 인덱스값을 입력해주세요." },
    USER_ARTICLEID_EMPTY : { "isSuccess": false, "code": 2031, "message": "사진을 조회할 게시글 인덱스값을 입력해주세요." },
    USER_FOLLOWING_ANSWER_EMPTY : { "isSuccess": false, "code": 2032, "message": "팔로잉 여부를 입력해주세요." },

    // Response error
    SIGNUP_REDUNDANT_EMAIL : { "isSuccess": false, "code": 3001, "message":"중복된 이메일입니다." },
    SIGNUP_REDUNDANT_NICKNAME : { "isSuccess": false, "code": 3002, "message":"중복된 닉네임입니다." },

    SIGNIN_EMAIL_WRONG : { "isSuccess": false, "code": 3003, "message": "이메일이 잘못 되었습니다." },
    SIGNIN_PASSWORD_WRONG : { "isSuccess": false, "code": 3004, "message": "비밀번호가 잘못 되었습니다." },
    SIGNIN_INACTIVE_ACCOUNT : { "isSuccess": false, "code": 3005, "message": "비활성화 된 계정입니다. 고객센터에 문의해주세요." },
    SIGNIN_WITHDRAWAL_ACCOUNT : { "isSuccess": false, "code": 3006, "message": "탈퇴 된 계정입니다. 고객센터에 문의해주세요." },
    SIGNIN_BANNED_ACCOUNT : { "isSuccess": false, "code": 3007, "message": "관리자에 의해 정지된 계정입니다. 고객센터에 문의해주세요." },
    PROFILE_SELECT_FAIL : { "isSuccess": false, "code": 3008, "message": "존재하지 않는 아이디 입니다.인증에 실패했습니다." },
    USER_USER_NOT_EXIST : { "isSuccess": false, "code": 3009, "message": "해당 유저는 존재하지 않습니다." },
    SIGNIN_WITHDRAWAL_OR_NONE_ACCOUNT : { "isSuccess": false, "code": 3010, "message": "해당 유저는 탈퇴했거나 존재하지 않습니다." },
    SIGNIN_INACTIVE_ACCOUNT_STATUS : { "isSuccess": false, "code": 3011, "message": "비활성화 된 계정입니다. 활성화를 먼저 진행해 주세요." },
    SIGNIN_INACTIVE_ACCOUNT_FOLLOWING_FAIL : { "isSuccess": false, "code": 3012, "message": "상대방 계정이 비활성화된 상태입니다. 팔로잉 할 수 없습니다." },
    SIGNIN_BANNED_ACCOUNT_FOLLOWING_FAIL : { "isSuccess": false, "code": 3013, "message": "상대방 계정이 관리자에 의해 정지된 상태입니다. 팔로잉 할 수 없습니다." },
    SIGNIN_DELETED_ACCOUNT_FOLLOWING_FAIL : { "isSuccess": false, "code": 3014, "message": "상대방 계정이 삭제된 상태입니다. 팔로잉 할 수 없습니다." },
    FOLLOWING_ALREADY_DONE : { "isSuccess": false, "code": 3015, "message": "이미 팔로잉 된 상태입니다." },
    ARTICLE_NOT_EXIST : { "isSuccess": false, "code": 3016, "message": "해당 게시글은 존재하지 않습니다."},
    USER_NOT_ACTIVATED : { "isSuccess": false, "code": 3017, "message": "해당 유저는 비활성화 되었습니다."},
    USER_NOT_FOLLOWING_AND_PRIVATEACCOUNT : { "isSuccess": false, "code": 3018, "message": "프라이빗 계정입니다. 팔로잉 신청을 해주세요."},
    USER_ARTICLEIMG_EMPTY : { "isSuccess": false, "code": 3019, "message": "이미지 파일을 넣어주세요."},
    ARTICLE_USER_DIFFERENT : { "isSuccess": false, "code": 3020, "message": "게시물을 작성한 유저가 아닙니다. "},
    SIGNIN_INACTIVE_ARTICLE_STATUS : { "isSuccess": false, "code": 3021, "message": "게시물을 삭제하였습니다."},
    SIGNIN_HIDE_ARTICLE_STATUS : { "isSuccess": false, "code": 3021, "message": "게시물을 숨김 처리 하였습니다."},
    ARTICLE_HIDECANCEL_SUCCESS : { "isSuccess": false, "code": 3021, "message": "게시물을 숨김 취소 하였습니다."},
    USER_FOLLOWING_NOT_SUCCESS : { "isSuccess": false, "code": 3022, "message": "조회하신 유저는 팔로잉된 유저가 아닙니다."},
    USER_FOLLOWING_NOT_DONE : { "isSuccess": false, "code": 3023, "message": "조회하신 유저는 팔로잉된 유저가 아닙니다. 귀하의 전체 팔로잉 유저 목록을 조회합니다."},

    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},


}

















//
//
//
//
// module.exports = {
//
//     // Success
//     SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },
//
//     // Common
//     TOKEN_EMPTY : { "isSuccess": false, "code": 2000, "message":"JWT 토큰을 입력해주세요." },
//     TOKEN_VERIFICATION_FAILURE : { "isSuccess": false, "code": 3000, "message":"JWT 토큰 검증 실패" },
//     TOKEN_VERIFICATION_SUCCESS : { "isSuccess": true, "code": 1001, "message":"JWT 토큰 검증 성공" }, // ?
//
//     //Request error
//     AUTH_PHONENUMBER_EMPTY : { "isSuccess": false, "code": 2001, "message": "핸드폰 번호를 입력해주세요." },
//     AUTH_PHONENUMBER_LENGTH : { "isSuccess": false, "code": 2002, "message": "핸드폰번호의 길이는 10자 이상입니다." },
//     AUTH_PHONENUMBER_ERROR_TYPE : { "isSuccess": false, "code": 2003, "message": "핸드폰번호는 00000000000으로 입력해주세요." },
//
//     AUTH_EMAIL_EMPTY : { "isSuccess": false, "code": 2004, "message": "이메일을 입력해주세요." },
//     AUTH_EMAIL_LENGTH : { "isSuccess": false, "code": 2005, "message": "이메일은 30자 이내로 입력해주세요." },
//     AUTH_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2006, "message": "이메일의 형식을 확인해주세요." },
//
//     AUTH_ADDRESS_EMPTY : { "isSuccess": false, "code": 2007, "message": "주소를 입력해주세요(동까지만)" },
//     AUTH_ADDRESS_ERROR_TYPE : { "isSuccess": false, "code": 2008, "message": "주소는 동으로 끝내주세요" },
//
//     SIGNUP_NICKNAME_EMPTY : { "isSuccess": false, "code": 2009, "message": "닉네임을 입력해주세요." },
//     SIGNUP_PHONENUMBER_EMPTY : { "isSuccess": false, "code": 2010, "message": "전화번호를 입력해주세요." },
//     SIGNUP_EMAIL_EMPTY : { "isSuccess": false, "code": 2011, "message": "이메일을 입력해주세요." },
//     SIGNUP_TOWN_EMPTY : { "isSuccess": false, "code": 2012, "message": "동네를 입력해주세요." },
//     SIGNUP_COUNTRYIDX_EMPTY : { "isSuccess": false, "code": 2013, "message": "국가를 입력해주세요" },
//
//     SIGNUP_EMAIL_LENGTH : { "isSuccess": false, "code": 2014, "message": "이메일은 30자 이내로 입력해주세요." },
//     SIGNUP_PHONENUMBER_LENGTH : { "isSuccess": false, "code": 2015, "message": "핸드폰번호의 길이는 10자 이상입니다." },
//
//     SIGNUP_PHONENUMBER_ERROR_TYPE : { "isSuccess": false, "code": 2016, "message": "핸드폰번호는 00000000000으로 입력해주세요." },
//     SIGNUP_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2017, "message": "이메일의 형식을 확인해주세요." },
//
//     SIGNIN_PHONENUMBER_EMPTY : { "isSuccess": false, "code": 2018, "message": "전화번호를 입력해주세요." },
//     SIGNIN_PHONENUMBER_LENGTH : { "isSuccess": false, "code": 2019, "message": "핸드폰번호의 길이는 10자 이상입니다." },
//     SIGNIN_PHONENUMBER_ERROR_TYPE : { "isSuccess": false, "code": 2020, "message": "핸드폰번호는 00000000000으로 입력해주세요." },
//
//     SIGNUP_ADDRESS_ERROR_TYPE : { "isSuccess": false, "code": 2021, "message": "주소는 동으로 끝내주세요" },
//
//     AUTH_AUTHNUMBER_EMPTY : { "isSuccess": false, "code": 2022, "message": "인증번호를 입력해주세요." },
//     AUTH_PHONE_AUTHNUMBER_LENGTH : { "isSuccess": false, "code": 2023, "message": "인증번호의 길이는 4입니다." },
//     AUTH_EMAIL_AUTHNUMBER_LENGTH : { "isSuccess": false, "code": 2025, "message": "인증번호의 길이는 6입니다." },
//
//     SIGNIN_JWT_TOKEN_NOT_EXIST : { "isSuccess": false, "code": 2024, "message": "해당 jwt토큰이 존재하지 않습니다." },
//
//     ARTICLE_USERIDX_EMPTY : { "isSuccess": false, "code": 2026, "message": "userIdx를 입력해주세요." },
//     ARTICLE_TITLE_EMPTY : { "isSuccess": false, "code": 2027, "message": "제목을 입력해주세요." },
//     ARTICLE_DESCRIPTION_EMPTY : { "isSuccess": false, "code": 2028, "message": "설명을 입력해주세요" },
//     ARTICLE_CATEGORYIDX_EMPTY : { "isSuccess": false, "code": 2029, "message": "카테고리를 입력해주세요" },
//     ARTICLE_TITLE_LENGTH : { "isSuccess": false, "code": 2030, "message": "제목의 길이는 100자 이내로 입력해주세요." },
//     ARTICLE_DESCRIPTION_LENGTH : { "isSuccess": false, "code": 2031, "message": "설명의 길이는 200자 이내로 해주세요." },
//
//
//     ARTICLE_CATEGORYIDX_WRONG : { "isSuccess": false, "code": 2033, "message": "categoryIdx를 확인해주세요." },
//
//     ARTICLE_ISAD_EMPTY : { "isSuccess": false, "code": 2034, "message": "isAd를 입력해주세요." },
//     ARTICLE_ARTICLEIDX_EMPTY : { "isSuccess": false, "code": 2035, "message": "articleIdx를 입력해주세요." },
//
//     ARTICLE_ISAD_WRONG : { "isSuccess": false, "code": 2036, "message": "userIdx가 있으면 판매글만 조회 가능합니다." },
//
//     COMMENT_ARTICLEIDX_EMPTY : { "isSuccess": false, "code": 2037, "message": "articleIdx를 입력해주세요." },
//     COMMENT_USERIDX_EMPTY : { "isSuccess": false, "code": 2038, "message": "userIdx를 입력해주세요." },
//     COMMENT_CONTENT_EMPTY : { "isSuccess": false, "code": 2039, "message": "댓글을 입력해주세요." },
//     COMMENT_CONTENT_LENGTH : { "isSuccess": false, "code": 2040, "message": "댓글의 길이는 100자 이내로 입력해주세요." },
//
//     COMMENT_STATUS_ERROR_TYPE : { "isSuccess": false, "code": 2041, "message": "status는 DELETED로만 변경가능합니다." },
//     COMMENT_NO_CHANGES : { "isSuccess": false, "code": 2042, "message": "content나 status중 하나는 입력되어야 합니다." },
//     COMMENT_COMMENTIDX_EMPTY : { "isSuccess": false, "code": 2043, "message": "commentIdx를 입력해주세요." },
//
//     LOCALAD_PHONENUMBER_ERROR_TYPE : { "isSuccess": false, "code": 2044, "message": "전화번호는 00000000000으로 입력해주세요." },
//     COMMENT_STATUS_EMPTY : { "isSuccess": false, "code": 2045, "message": "status를 입력해주세요." },
//
//     ARTICLE_ARTICLEIDX_WRONG : { "isSuccess": false, "code": 2046, "message": "articleIdx를 확인해주세요." },
//
//     MODIFY_ARTICLEIMG_EMPTY : { "isSuccess": false, "code": 2047, "message": "articleImgUrl을 입력해주세요." },
//     MODIFY_DESCRIPTION_EMPTY : { "isSuccess": false, "code": 2048, "message": "description을 입력해주세요." },
//     MODIFY_TITLE_EMPTY : { "isSuccess": false, "code": 2049, "message": "title을 입력해주세요" },
//     MODIFY_PRICE_EMPTY : { "isSuccess": false, "code": 2050, "message": "price를 입력해주세요." },
//     MODIFY_CATEGORY_IDX_EMPTY : { "isSuccess": false, "code": 2051, "message": "categoryIdx를 입력해주세요." },
//     MODIFY_SUGGESTPRICE_EMPTY : { "isSuccess": false, "code": 2052, "message": "suggestPrice를 입력해주세요." },
//     MODIFY_NOCHAT_EMPTY : { "isSuccess": false, "code": 2053, "message": "noChat을 입력해주세요." },
//     MODIFY_PHONENUMBER_EMPTY : { "isSuccess": false, "code": 2054, "message": "phoneNumber를 입력해주세요" },
//     MODIFY_ARTICLE_WRONG : { "isSuccess": false, "code": 2055, "message": "phoneNumber와 noChat은 판매글에서 수정 불가합니다." },
//     MODIFY_LOCALAD_WRONG : { "isSuccess": false, "code": 2056, "message": "suggestPrice는 판매글에서 수정 가능합니다." },
//
//     USER_USERIDX_EMPTY : { "isSuccess": false, "code": 2057, "message": "userIdx를 입력해주세요." },
//

//
//     ARTICLE_STATUS_ERROR_TYPE : { "isSuccess": false, "code": 2060, "message": "status는 SALE, SOLD, HIDE 중 하나로 입력해주세요." },
//     ARTICLE_STATUS_EMPTY : { "isSuccess": false, "code": 2061, "message": "status를 입력해주세요." },
//
//     LOCALAD_CANT_CATEGORY_SEARCH : { "isSuccess": false, "code": 2062, "message": "카테고리 필터는 판매 글만 가능합니다." },
//
//     ARTICLE_EDIT_STATUS_WRONG : { "isSuccess": false, "code": 2063, "message": "status는 RESERVED, SALE, SOLD, DELETED, HIDE 중 하나로 입력해주세요" },
//
//     ARTICLE_HIDE_OR_NOT_EMPTY : { "isSuccess": false, "code": 2064, "message": "hideOrNot을 입력해주세요" },
//
//     AUTH_LATITUDE_EMPTY : { "isSuccess": false, "code": 2065, "message": "현재 위도를 입력해주세요." },
//     AUTH_LONGITUDE_EMPTY : { "isSuccess": false, "code": 2066, "message": "현재 경도를 입력해주세요." },
//
//     AUTH_INPUT_WRONG : { "isSuccess": false, "code": 2067, "message": "address와 currentLatitude, currentLongitude는 같이 입력할 수 없습니다." },
//
//     MODIFY_ACCOUNT_WRONG : { "isSuccess": false, "code": 2068, "message": "phoneNumber나 email 둘중 하나는 반드시 입력되어야합니다." },
//     CANT_MODIFY_BOTH : { "isSuccess": false, "code": 2069, "message": "phoneNumber와 email 둘 중 하나만 입력해주세요" },
//
//     SEARCH_SEARCHQUERY_EMPTY : { "isSuccess": false, "code": 2070, "message": "검색어를 입력해주세요" },
//     USER_FOLLOWUSER_EMPTY : { "isSuccess": false, "code": 2071, "message": "followUserIdx를 입력해주세요." },
//
//     CHAT_ARTICLEIDX_EMPTY : { "isSuccess": false, "code": 2072, "message": "articleIdx를 입력해주세요." },
//     CHAT_CHATROOMIDX_EMPTY : { "isSuccess": false, "code": 2073, "message": "chatroomIdx를 입력해주세요." },
//     CHAT_SENDERIDX_EMPTY : { "isSuccess": false, "code": 2074, "message": "senderIdx를 입력해주세요." },
//     CHAT_CONTENT_EMPTY : { "isSuccess": false, "code": 2075, "message": "content를 입력해주세요." },
//
//     ARTICLE_IMG_WRONG : { "isSuccess": false, "code": 2076, "message": "이미지는 배열로 입력해주세요." },
//
//     // Response error
//     ADDRESS_NOT_EXIST : { "isSuccess": false, "code": 3001, "message": "해당 동네는 존재하지 않습니다. 다시 입력해주세요." },
//     COUNTRY_NOT_EXIST : { "isSuccess": false, "code": 3002, "message": "해당 국가는 존재하지 않습니다."},
//
//     SIGNUP_REDUNDANT_PHONENUMBER : { "isSuccess": false, "code": 3003, "message": "이미 가입된 전화번호입니다." },
//     SIGNUP_REDUNDANT_EMAIL : { "isSuccess": false, "code": 3004, "message": "이미 등록된 이메일입니다." },
//
//     SIGNIN_PHONENUMBER_WRONG : { "isSuccess": false, "code": 3005, "message": "전화번호가 잘못되었습니다." },
//     SIGNIN_INACTIVE_ACCOUNT : { "isSuccess": false, "code": 3006, "message": "비활성화 된 계정입니다. 고객센터에 문의해주세요." },
//     SIGNIN_WITHDRAWAL_ACCOUNT : { "isSuccess": false, "code": 3007, "message": "탈퇴 된 계정입니다. 고객센터에 문의해주세요." },
//
//     SIGNUP_ADDRESS_WRONG : { "isSuccess": false, "code": 3008, "message": "정확한 주소를 입력해주세요" },
//     SIGNUP_REDUNDANT_NICKNAME : { "isSuccess": false, "code": 3009, "message": "중복된 닉네임입니다." },
//
//     AUTH_AUTHNUMBER_NOT_EXIST : { "isSuccess": false, "code": 3010, "message": "인증번호를 받지 못했습니다." },
//     AUTH_AUTHNUMBER_INCORRECT : { "isSuccess": false, "code": 3011, "message": "인증번호가 틀렸습니다." },
//
//     ARTICLE_ARTICLE_NOT_EXIST : { "isSuccess": false, "code": 3012, "message": "해당 글이 존재하지 않습니다." },
//     ARTICLE_ARTICLE_CANNOT_SEE : { "isSuccess": false, "code": 3013, "message": "해당 글은 볼 수 없습니다." },
//
//     COMMENT_ARTICLE_IS_AD_ERROR : { "isSuccess": false, "code": 3014, "message": "댓글은 판매글에는 달 수 없습니다." },
//     COMMENT_PARENT_COMMENT_NOT_EXIST : { "isSuccess": false, "code": 3015, "message": "대댓글을 달 댓글이 존재하지 않습니다." },
//     COMMENT_ARTICLE_NOT_IS_AD : { "isSuccess": false, "code": 3016, "message": "댓글은 판매글에서는 볼 수 없습니다." },
//
//     COMMENT_NOT_EXIST : { "isSuccess": false, "code": 3017, "message": "해당 댓글이 존재하지 않습니다." },
//
//     USER_USER_NOT_EXIST : { "isSuccess": false, "code": 3018, "message": "해당 유저는 존재하지 않습니다." },
//
//     AUTH_TOWN_FAIL : { "isSuccess": false, "code": 3019, "message": "동네 인증에 실패했습니다." },
//
//     ALREADY_LOGIN : { "isSuccess": false, "code": 3020, "message": "이미 로그인된 유저입니다." },
//     NOT_LOGIN : { "isSuccess": false, "code": 3021, "message": "로그인되지 않았습니다." },
//
//     //Connection, Transaction 등의 서버 오류
//     DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
//     SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},
//
//
//
// }
