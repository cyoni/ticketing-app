import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../../../common/errors/request-validation-error";
import { User } from "../models/user";
import { BadRequestError } from "../../../common/errors/bad-request-error";
import jwt from "jsonwebtoken";
import { validateRequest } from "../../../client/middlewares/validate-request";

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
