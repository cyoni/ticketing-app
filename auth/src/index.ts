import express, { json } from "express";
import { currentUserRouter } from "./current-user";
import { signinRouter } from "./signin";
import { signoutRouter } from "./signout";
import { signupRouter } from "./signup";
import { errorHandler } from "../middlewares/error-handler";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

const app = express();
app.set("trust proxy", true);
app.use(json())

app.use(
  cookieSession({
    name: "ticketing-session",
    keys: ["my-secret-key"],
    signed: true,
    secure: true,
  })
);
app.use(express.json());

app.get("/currentuser", (req, res) => {
  res.send("hello user");
});

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) throw new Error("JWT_KEY must be provided");

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

start();
