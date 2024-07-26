import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export const RequireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("req.currentUser", req.currentUser);
  if (!req.currentUser) {
    return next(new NotAuthorizedError());
  }

  next();
};
