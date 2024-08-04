import express, { NextFunction, Request, Response } from "express";
import { Ticket } from "../models/ticket.model";
import {
  BadRequestError,
  NotAuthorizedError,
  RequireAuth,
  validateRequest,
} from "@cyoni10/common";
import { body } from "express-validator";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  RequireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required."),
    body("price").isFloat({ gt: 0 }).withMessage("Price is invalid number."),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return next(new BadRequestError(`Ticket #${id} does not exist.`));
    }

    if (ticket.userId !== req.currentUser!.id) {
      return next(
        new NotAuthorizedError(
          `User #${req.currentUser!.id} does not own the ticket.`
        )
      );
    }

    ticket.set({ title: req.body.title, price: req.body.price });
    await ticket.save()

    res.send(ticket);
  }
);

export { router as indexRouter };
