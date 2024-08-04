import { CustomError } from "./customError";

export class NotAuthorizedError extends CustomError {
  reason = "not authorized";
  statusCode = 401;

  constructor(public message: string) {
    super(message || "Not authorized");

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
