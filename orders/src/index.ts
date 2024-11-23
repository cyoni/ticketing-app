import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import { TicketCreatedListener } from "./events/publishers/ticket-created-listener";
import { TicketUpdatedListener } from "./events/publishers/ticket-updated-listener";

const start = async () => {
  process.env.JWT_KEY = "my-secret!";
  if (!process.env.JWT_KEY) throw new Error("JWT_KEY must be provided");

  try {
    await mongoose.connect("mongodb://tickets-mongo-srv:27017/tickets");
  } catch (error) {
    console.error(error);
  }

  new TicketCreatedListener(natsWrapper.client).listen();
  new TicketUpdatedListener(natsWrapper.client).listen();

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

start();
