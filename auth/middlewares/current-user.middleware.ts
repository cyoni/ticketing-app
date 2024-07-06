import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

interface ICurrentUser {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: ICurrentUser;
    }
  }
}
export const CurrentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session || !req.session.jwt) {
    return next();
  }

  try {
    const currentUser = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as ICurrentUser;

    req.currentUser = currentUser;
  } catch (e) {}
  
  next();
};
