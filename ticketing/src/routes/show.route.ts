import { BadRequestError, RequireAuth, validateRequest } from "@cyoni10/common";
import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { Ticket } from "../models/ticket.model";
import mongoose from "mongoose";

const router = express.Router();

router.get(
  "/api/tickets/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const ticket = await Ticket.findById(id);

    //const randomId = new mongoose.Types.ObjectId().toHexString()

    if (!ticket) {
      return next(new BadRequestError(`Ticket #${id} does not exist.`));
    }

    res.send(ticket);
  }
);


export { router as newRouter };
