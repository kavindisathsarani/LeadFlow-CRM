const notFoundHandler = (req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
};

const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
};

module.exports = { notFoundHandler, errorHandler };
