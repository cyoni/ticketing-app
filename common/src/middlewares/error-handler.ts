import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../common/errors/customError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  console.log("something went wrong", err);
  res.status(500).send({ message: err.message });
};
