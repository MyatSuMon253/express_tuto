class AppError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
  }

  getCode() {
    return 500;
  }
}

class BadRequest extends AppError {
  constructor(message) {
    super(message);
    this.message = message;
  }

  getCode() {
    return 400;
  }
}

class NotFound extends AppError {
  constructor(message) {
    super(message);
    this.message = message;
  }

  getCode() {
    return 404;
  }
}

module.exports = { AppError, BadRequest, NotFound };
