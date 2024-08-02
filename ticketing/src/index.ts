import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) throw new Error("JWT_KEY must be provided");

  try {
    await mongoose.connect("mongodb://tickets-mongo-srv:27017/tickets");
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};


start();
