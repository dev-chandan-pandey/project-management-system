// Dashboard routes placeholder
import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";

import { getDashboardStats } from "../controllers/dashboard.controller";

const router = Router();

router.use(authenticate);

router.get(
    "/",
    authenticate,
    getDashboardStats
);

export default router;