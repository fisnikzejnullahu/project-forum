function notFound(req, res, next) {
  // const error = new Error('Page \\"' + req.originalUrl + '\\" was not found!');
  const error = new Error(`Page \'${req.originalUrl}\' was not found`);
  res.status(404);
  next(error);
}

function errorHandler(error, req, res, next) {
  res.status(res.statusCode || 500);

  res.json({
    success: false,
    message: error.message
  });
}

module.exports = {
  notFound,
  errorHandler
};
