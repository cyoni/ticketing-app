import { RequireAuth, validateRequest } from "@cyoni10/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Ticket } from "../models/ticket.model";

const router = express.Router();

router.post(
  "/api/tickets",
  RequireAuth,
  [
    body("title").notEmpty().withMessage("title is required."),
    body("price").isFloat({ gt: 0 }).withMessage("price is invalid."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });

    await ticket.save();

    console.log("got cookie", req.cookies);
    console.log("and session....", JSON.stringify(req.session));
    res.sendStatus(200);
  }
);

export { router as newRouter };
