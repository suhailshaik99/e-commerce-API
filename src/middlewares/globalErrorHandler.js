export const globalHandler = (err, req, res, next) => {
  // console.log(err.stack);
  err.message = err.message || 'Unknown Error';
  err.statusCode = err.statusCode || 500
  res.status(err.statusCode).json({
    statusCode: err.statusCode,
    message: `Application crashed with error: ${err.message}`
  });
};
