import { ValidationError } from "express-validator";
import { CustomError } from "./customError";

export class DatabaseConnectionError extends CustomError {
  reason = "error connection to database";
  statusCode = 400
  constructor() {
    super("error connection to database");

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
