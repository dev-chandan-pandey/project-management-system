import { Router } from "express";

import { authenticate } from "../../common/middleware/auth.middleware";

import { getTimeline } from "./activity.controller";

const router = Router();

router.get(
  "/",
  authenticate,
  getTimeline
);

export default router;