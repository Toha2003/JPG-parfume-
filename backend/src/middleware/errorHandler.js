// Error handling middleware
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Default error
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Handle specific error types
  if (err.name === "ValidationError") {
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    error: {
      status: statusCode,
      message: message
    }
  });
};

// 404 handler middleware
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      status: 404,
      message: "Endpoint not found"
    }
  });
};

// Request logging middleware
export const requestLogger = (req, res, next) => {
  // console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
};
