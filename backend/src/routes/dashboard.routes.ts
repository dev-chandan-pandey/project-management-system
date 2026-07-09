import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

import {
  getDashboardStats,
} from "../controllers/dashboard.controller";

const router = Router();

/*
|--------------------------------------------------------------------------
| All Dashboard Routes Require Authentication
|--------------------------------------------------------------------------
*/

router.use(authenticate);

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
| Admin
| Project Manager
| Team Member
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  authorize(
    "Admin",
    "Project Manager",
    "Team Member"
  ),
  getDashboardStats
);

export default router;