import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";

import { getActivities } from "../controllers/activity.controller";
import { authorize } from "../middleware/role.middleware";

const router = Router();

router.use(authenticate);

router.get(
    "/",
    authenticate,
    authorize(
        "Admin",
        "Project Manager"
    ),
    getActivities
);

export default router;