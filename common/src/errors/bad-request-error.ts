import { CustomError } from "./customError";

export class BadRequestError extends CustomError {
  reason = "bad request";
  statusCode = 400
  constructor(public message:string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
