import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { BadRequestError, validateRequest } from "@cyoni10/common";

const router = express.Router();

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("password must be between 4-20 chars"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return next(new BadRequestError("email in use"));
    }

    const user = User.build({ email, password });
    await user.save();

    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );
    req.session = { jwt: userJwt };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
