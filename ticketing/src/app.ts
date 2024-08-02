import express, { json } from "express";
import cookieSession from "cookie-session";
import { newRouter } from "./routes/new.route";
import { CurrentUser } from "@cyoni10/common";
const cookieParser = require("cookie-parser");

const app = express();
app.set("trust proxy", true);
app.use(json());

app.use(cookieParser());


app.use(
  cookieSession({
    name: "ticketing-session",
    keys: ["my-secret-key"],
    signed: true,
    secure: process.env.NODE_ENV !== "test", // to make tests pass since they run on http channel
  })
);

app.use((req)=> {
    const cc = req.cookies
    console.log("ABCDEF@@@", JSON.stringify(cc))
    console.log("req.session??", JSON.stringify(req.session))
})


app.use(express.json());

app.use(CurrentUser);
app.use(newRouter);

app.get("/currentuser", (req, res) => {
  res.send("hello user");
});

export { app };
