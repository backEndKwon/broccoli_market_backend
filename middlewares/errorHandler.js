module.exports = (error, req, res, defaultMessage) => {
    console.error(
      `에러로그 ${error.errorCode} ${req.method} ${req.originalUrl} : ${error.message}`
    );
    console.error(error);
    if (!error.errorCode) {
      return res.status(500).json({ errorMessage: defaultMessage });
    } else {
      return res.status(error.errorCode).json({ errorMessage: error.message });
    }
  };
  