const response = ({isSuccess, code, message}, result) => {
   return {
        isSuccess: isSuccess,
        code: code,
        message: message,
        result: result
   }
  };

const response2 = ({isSuccess, code, message}, result1, result2) => {
    return {
        isSuccess: isSuccess,
        code: code,
        message: message,
        result: result1,
        result: result2
    }
};

  const errResponse = ({isSuccess, code, message}) => {
    return {
        isSuccess: isSuccess,
        code: code,
        message: message
      }
  };
  
  module.exports = { response, errResponse , response2};