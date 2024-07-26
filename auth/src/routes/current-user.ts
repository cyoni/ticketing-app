import express from "express";
import { CurrentUser } from "../../../client/middlewares/current-user.middleware";
import { RequireAuth } from "../../../client/middlewares/require-auth.middleware copy";

const router = express.Router();

router.get("/current-user", CurrentUser, RequireAuth, (req, res) => {
  return res.send({ currentUser: req.currentUser });
});

export { router as currentUserRouter };
