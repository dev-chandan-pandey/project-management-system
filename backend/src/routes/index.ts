// Route index placeholder
import { Router } from "express";
import authRoutes from "./auth.routes";
import taskRoutes from "./task.routes";
import userRoutes from "./user.routes";
import activityRoutes from "./activity.routes";
import dashboardRoutes from "./dashboard.routes";
import projectRoutes from "./project.routes";
const router = Router();



router.get("/", (_, res) => {
    res.json({
        success: true,
        message: "Project Collaboration API Running 🚀",
    });
});
router.use("/auth", authRoutes);
router.use("/activities", activityRoutes);
router.use("/users", userRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/tasks", taskRoutes);
router.use("/projects", projectRoutes);
router.use("/auth", authRoutes);

export default router;