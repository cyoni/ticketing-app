import {
  RequireAuth,
  NotFoundError,
  NotAuthorizedError,
  OrderStatus,
} from "@cyoni10/common";
import express, { NextFunction, Request, Response } from "express";
import { Order } from "../models/order";
import { OrderCancelledPublisher } from "../events/publishers/order-cancelled-publisher";
import { natsWrapper } from "../nats-wrapper";

// fix "cyoni/common" errors
// test this module

const router = express.Router();

router.delete(
  "/api/orders/:id",
  RequireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const order = await Order.findById(req.query.id).populate("ticket");

    if (!order) {
      throw new NotFoundError("order not found");
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError("Not authorized.");
    }

    order.status = OrderStatus.Cancelled;
    order.save();

    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      ticket: {
        id: order.ticket.id,
      },
    });

    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
