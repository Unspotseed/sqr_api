module.exports = (err, req, res, next) => {
  console.log(err);
  if (err.name === 'ValidationError') {
    err.statusCode = 400;
  } else if (err.name === 'TokenExpiredError') {
    err.statusCode = 401;
  } else if (err.name === 'JsonWebTokenError') {
    err.statusCode = 401;
  }
  res.status(err.statusCode || 500).json({ Message: err.message });
};
