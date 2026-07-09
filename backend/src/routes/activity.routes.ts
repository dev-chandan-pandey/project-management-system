import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

import {
  getActivities,
} from "../controllers/activity.controller";

const router = Router();

/*
|--------------------------------------------------------------------------
| All Activity Routes Require Authentication
|--------------------------------------------------------------------------
*/

router.use(authenticate);

/*
|--------------------------------------------------------------------------
| View Activity Logs
|--------------------------------------------------------------------------
| Admin           -> Full Access
| Project Manager -> Full Access
*/

router.get(
  "/",
  authorize(
    "Admin",
    "Project Manager"
  ),
  getActivities
);

export default router;