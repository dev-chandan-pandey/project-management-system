import { Router } from "express";

import { authRoutes } from "../modules/auth";
import { projectRoutes } from "../modules/projects";
import { taskRoutes } from "../modules/tasks";
import { dashboardRoutes } from "../modules/dashboard";
import { activityRoutes } from "../modules/activities";

const router = Router();

router.get("/health", (_, res) => {
  res.json({
    success: true,
    message: "API is running",
  });
});

router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);
router.use("/tasks", taskRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/activities", activityRoutes);

export default router;