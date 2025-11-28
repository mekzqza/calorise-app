export const errorHandler = (err, req, res, next) => {
  console.error('API error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Unexpected server error',
  });
};
