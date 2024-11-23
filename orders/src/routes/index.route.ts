import express, { NextFunction, Request, Response } from "express";
import { Order } from "../models/order";
import { RequireAuth } from "@cyoni10/common";

const router = express.Router();

router.get(
  "/api/orders",
  RequireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const orders = await Order.find({
      userId: req.currentUser!.id,
    }).populate("ticket");


    res.send(orders);
  }
);

export { router as indexRouter };
