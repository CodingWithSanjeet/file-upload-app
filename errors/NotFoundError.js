const AppError = require("./AppError");

class NotFoundError extends AppError {
  constructor(message = "Not Found") {
    super(message);
    this.name = "NotFoundError";
  }
}

module.exports = NotFoundError;
