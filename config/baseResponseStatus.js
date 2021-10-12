module.exports = {

    // Success
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },
    SUCCESS_MAKING : { "isSuccess": true, "code": 1001, "message":"회원 가입 성공" },
    SUCCESS_FINDING : { "isSuccess": true, "code": 1002, "message":"회원을 찾았습니다." },
    SUCCESS_VIEWING_ALL : { "isSuccess": true, "code": 1003, "message":"전체 회원을 조회하였습니다." },
    SUCCESS_SHOWING_USER_BY_INDEX : { "isSuccess": true, "code": 1004, "message":"회원 인덱스값으로 조회하였습니다." },
    SUCCESS_EDIT : { "isSuccess": true, "code": 1005, "message":"회원 닉네임을 변경하였습니다." },
    SUCCESS_EDIT_ADDRESS : { "isSuccess": true, "code": 1006, "message":"회원 동네를 변경하였습니다." },
    SUCCESS_EDIT_PROFILE : { "isSuccess": true, "code": 1007, "message":"회원 프로필을 변경하였습니다." },
    SUCCESS_EDIT_STATUS : { "isSuccess": true, "code": 1008, "message":"회원 상태를 변경하였습니다." },



    // Common
    TOKEN_EMPTY : { "isSuccess": false, "code": 2000, "message":"JWT 토큰을 입력해주세요." },
    TOKEN_VERIFICATION_FAILURE : { "isSuccess": false, "code": 3000, "message":"JWT 토큰 검증 실패" },
    TOKEN_VERIFICATION_SUCCESS : { "isSuccess": true, "code": 1001, "message":"JWT 토큰 검증 성공" }, // ?

    //Request error
    SIGNUP_PHONENUMBER_EMPTY : { "isSuccess": false, "code": 2001, "message":"전화번호을 입력해주세요" },
    SIGNUP_PHONENUMBER_LENGTH : { "isSuccess": false, "code": 2002, "message":"전화번호은 30자리 미만으로 입력해주세요." },
    SIGNUP_PHONENUMBER_ERROR_TYPE : { "isSuccess": false, "code": 2003, "message":"전화번호을 형식을 정확하게 입력해주세요." },
    SIGNUP_PASSWORD_EMPTY : { "isSuccess": false, "code": 2004, "message": "비밀번호를 입력 해주세요." },
    SIGNUP_PASSWORD_LENGTH : { "isSuccess": false, "code": 2005, "message":"비밀번호는 6~20자리를 입력해주세요." },
    SIGNUP_NICKNAME_EMPTY : { "isSuccess": false, "code": 2006, "message":"닉네임을 입력 해주세요." },
    SIGNUP_NICKNAME_LENGTH : { "isSuccess": false,"code": 2007,"message":"닉네임은 최대 20자리를 입력해주세요." },
    SIGNUP_NICKNAME_ERROR_TYPE : { "isSuccess": false, "code": 2008, "message":"닉네임 형식을 정확하게 입력해주세요." },
    SIGNUP_PASSWORD_ERROR_TYPE : { "isSuccess": false, "code": 2009, "message":"비밀번호  8자 이상이어야 하고, 숫자/소문자/대문자/특수문자를 모두 포함해야 합니다." },
    SIGNUP_TITLE_EMPTY : { "isSuccess": false, "code": 2010, "message":"상품 제목을 입력해주세요" },
    SIGNUP_DESCRIPTION_EMPTY : { "isSuccess": false, "code": 2011, "message":"상품설명을 입력 해주세요." },
    SIGNUP_PRICE_EMPTY : { "isSuccess": false, "code": 2012, "message": "상품가격을 입력 해주세요." },
    SIGNUP_TITLE_LENGTH : { "isSuccess": false,"code": 2013,"message":"제목은 최대 30자리를 입력해주세요." },
    SIGNUP_DESCRIPTION_LENGTH : { "isSuccess": false, "code": 2014, "message":"상품내용은 최대 500자리 미만으로 입력해주세요." },


    SIGNIN_PHONENUMBER_EMPTY : { "isSuccess": false, "code": 2101, "message":"전화번호을 입력해주세요" },
    SIGNIN_PHONENUMBER_LENGTH : { "isSuccess": false, "code": 2102, "message":"전화번호은 30자리 미만으로 입력해주세요." },
    SIGNIN_PHONENUMBER_ERROR_TYPE : { "isSuccess": false, "code": 2103, "message":"전화번호을 형식을 정확하게 입력해주세요." },
    SIGNIN_PASSWORD_EMPTY : { "isSuccess": false, "code": 2104, "message": "비밀번호를 입력 해주세요." },
    SIGNIN_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2105, "message":"이메일 형식을 정확하게 입력해주세요." },
    SIGNIN_PROFILEPATH_ERROR_TYPE : { "isSuccess": false, "code": 2106, "message":"프로필저장 형식을 정확하게 입력해주세요." },



    USER_USERID_EMPTY : { "isSuccess": false, "code": 2201, "message": "userId를 입력해주세요." },
    USER_USERID_NOT_EXIST : { "isSuccess": false, "code": 2202, "message": "해당 회원이 존재하지 않습니다." },
    USER_USERID_OUTOFBOUND : { "isSuccess": false, "code": 2202, "message": "회원인덱스 전체 범위를 벗어났습니다." },
    USER_PHONENUMBER_NOT_EXIST : { "isSuccess": false, "code": 2202, "message": "해당 전화번호가 존재하지 않습니다." },


    USER_UserPhoneNUMBER_EMPTY : { "isSuccess": false, "code": 2301, "message": "전화번호을 입력해주세요." },
    USER_UserPhoneNUMBER_NOT_EXIST : { "isSuccess": false, "code": 2302, "message": "해당 전화번호을 가진 회원이 존재하지 않습니다." },
    USER_ID_NOT_MATCH : { "isSuccess": false, "code": 2303, "message": "유저 아이디 값을 확인해주세요" },
    USER_NICKNAME_EMPTY : { "isSuccess": false, "code": 2304, "message": "변경할 닉네임 값을 입력해주세요" },
    USER_PROFILEPATH_EMPTY : { "isSuccess": false, "code": 2305, "message": "변경할 프로필 사진을 입력해주세요" },
    USER_PROFILENAME_EMPTY : { "isSuccess": false, "code": 2306, "message": "변경할 프로필 제목을 입력해주세요" },
    USER_ADDRESS_EMPTY : { "isSuccess": false, "code": 2307, "message": "변경할 주소를 입력해주세요" },
    USER_STATUS_NOT_MATCH : { "isSuccess": false, "code": 2308, "message": "유저 아이디 값을 확인해주세요" },
    USER_EMAIL_EMPTY : { "isSuccess": false, "code": 2309, "message": "변경할 이메일 값을 입력해주세요" },
    USER_PHONENUMBER_EMPTY : { "isSuccess": false, "code": 2310, "message": "변경할 전화번호 값을 입력해주세요" },
    USER_PRODUCTLIST_EMPTY : { "isSuccess": false, "code": 2311, "message": "현재까지 올리신 상품이 없습니다." },


    USER_STATUS_EMPTY : { "isSuccess": false, "code": 2401, "message": "회원 상태값을 입력해주세요" },

    // Response error
    SIGNUP_REDUNDANT_PHONENUMBER : { "isSuccess": false, "code": 3001, "message":"중복된 전화번호입니다." },
    SIGNUP_REDUNDANT_NICKNAME : { "isSuccess": false, "code": 3002, "message":"중복된 닉네임입니다." },

    SIGNIN_PHONENUMBER_WRONG : { "isSuccess": false, "code": 3101, "message": "아이디가 잘못 되었습니다." },
    SIGNIN_PASSWORD_WRONG : { "isSuccess": false, "code": 3102, "message": "비밀번호가 잘못 되었습니다." },
    SIGNIN_INACTIVE_ACCOUNT : { "isSuccess": false, "code": 3103, "message": "비활성화 된 계정입니다. 고객센터에 문의해주세요." },
    SIGNIN_WITHDRAWAL_ACCOUNT : { "isSuccess": false, "code": 3104, "message": "탈퇴 된 계정입니다. 고객센터에 문의해주세요." },

    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},


}
