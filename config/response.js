const response = ({isSuccess, code, message}, result) => {
   return {
        isSuccess: isSuccess,
        code: code,
        message: message,
        result: result
   }
  };

const response2 = ({isSuccess, code, message, message2}, result) => {
    return {
        isSuccess: isSuccess,
        code: code,
        message: message,
        message: message2,
        result: result
    }
};

const deleteResponse = ({message, message2, message3, message4}) => {
    return {
        message: "계정을 삭제하려는 이유가 궁금해요",
        message: "1. 너무 많이 이용했어요.",
        message: "2. 사고싶은 물품이 없어요.",
        message: "3. 비매너 사용자를 만났어요.",
    }
};

  const errResponse = ({isSuccess, code, message}) => {
    return {
        isSuccess: isSuccess,
        code: code,
        message: message
      }
  };

const errResponse2 = ({isSuccess, code, message}, result)  => {
    return {
        isSuccess: isSuccess,
        code: code,
        message: message,
        result: result
    }
};
  
  module.exports = { response, errResponse, errResponse2, deleteResponse };