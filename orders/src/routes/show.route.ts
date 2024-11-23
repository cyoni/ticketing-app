import {
  RequireAuth,
  NotFoundError,
  NotAuthorizedError,
} from "@cyoni10/common";
import express, { NextFunction, Request, Response } from "express";
import { Order } from "../models/order";

const router = express.Router();

router.get(
  "/api/orders/:id",
  RequireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const order = await Order.findById(req.query.id).populate("ticket");

    if (!order) {
      throw new NotFoundError("");
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError("Not authorized.");
    }

    res.send(order);
  }
);

export { router as showOrderRouter };
