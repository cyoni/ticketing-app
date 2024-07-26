import { ValidationError } from "express-validator";
import { CustomError } from "./customError";

export class RequestValidationError extends CustomError {
  path = "";
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super("request validation error");

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => ({
      message: `${error.msg}`,
    }));
  }
}
