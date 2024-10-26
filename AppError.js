class AppError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
  }

  getCode() {
    return 400;
  }
}

module.exports = AppError;
