// error handler
function errorHandler(err, req, res, next) {
  const status = err.status || 400;
  const message = err.message;
  res.status(status).json({
    message,
    status
  });
}

module.exports = errorHandler;
