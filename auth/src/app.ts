import express, { json } from "express";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "../../client/middlewares/error-handler";
import cookieSession from "cookie-session";

const app = express();
app.set("trust proxy", true);
app.use(json());

app.use(
  cookieSession({
    name: "ticketing-session",
    keys: ["my-secret-key"],
    signed: true,
    secure: process.env.NODE_ENV !== "test", // to make tests pass since they run on http channel
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

export { app };
