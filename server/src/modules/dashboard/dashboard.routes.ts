import { Router } from "express";

import { authenticate } from "../../common/middleware/auth.middleware";

import { getDashboard } from "./dashboard.controller";

const router = Router();

router.get(
  "/",
  authenticate,
  getDashboard
);

export default router;