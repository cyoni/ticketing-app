import express, { json } from "express";
import cookieSession from "cookie-session";
import { indexRouter } from "./routes/index.route";
import { deleteOrderRouter } from "./routes/delete.route";
import { showOrderRouter } from "./routes/show.route";
import { newOrderRouter } from "./routes/new.route";
import { CurrentUser } from "@cyoni10/common";
const cookieParser = require("cookie-parser");

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



app.use(CurrentUser);
app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(indexRouter);
app.use(deleteOrderRouter);

app.get("/currentuser", (req, res) => {
  res.send("hello user");
});

export { app };
