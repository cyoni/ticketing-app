import { CurrentUser, RequireAuth } from "@cyoni10/common";
import express from "express";

const router = express.Router();

router.get("/current-user", CurrentUser, RequireAuth, (req, res) => {
  return res.send({ currentUser: req.currentUser });
});

export { router as currentUserRouter };
