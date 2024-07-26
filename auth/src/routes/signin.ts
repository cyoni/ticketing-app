import express, { NextFunction, Response, Request } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";
import { BadRequestError, validateRequest } from "@cyoni10/common";

const router = express.Router();

router.post(
  "/signin",
  [
    body("email").isEmail().withMessage("email must be valid"),
    body("password").notEmpty().withMessage("password must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(new BadRequestError("user does not exist"));
    }

    const passwordMatched = await Password.compare(user.password, password);
    if (!passwordMatched) {
      return next(new BadRequestError("wrong password"));
    }

    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );
    req.session = { jwt: userJwt };

    res.status(200).send(user);
  }
);

export { router as signinRouter };
