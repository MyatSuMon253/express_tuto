const AppError = require("./AppError");

const errorHandler = (error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.getCode()).json({ message: error.message });
  }
  return res.status(500).json({ message: "Internal server error" });
};

module.exports = errorHandler;
