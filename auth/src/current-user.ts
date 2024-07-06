import express from "express";
import { CurrentUser } from "../middlewares/current-user.middleware";
import { RequireAuth } from "../middlewares/require-auth.middleware copy";

const router = express.Router();

router.post("/current-user", CurrentUser, RequireAuth, (req, res) => {
  return res.send({ currentUser: req.currentUser });
});

export { router as currentUserRouter };
