errorHandler = async (err, req, res, next) => {
    const { statusCode, message, failedApi } = err;
    console.error(err);
  
    if (statusCode) {
      res.status(statusCode).json({ errorMessage: message });
    } else {
      res.status(400).json({ errorMessage: `${failedApi}에 실패했습니다.` });
    }
  };
  
  module.exports = errorHandler;
  
  // module.exports = (error, req, res, defaultMessage) => {
  //   console.error(
  //     `에러로그 ${error.errorCode} ${req.method} ${req.originalUrl} : ${error.message}`
  //   );
  //   console.error(error);
  //   if (!error.errorCode) {
  //     return res.status(500).json({ errorMessage: defaultMessage });
  //   } else {
  //     return res.status(error.errorCode).json({ errorMessage: error.message });
  //   }
  // };