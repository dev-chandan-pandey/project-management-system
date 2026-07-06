import { Router } from "express";

import authRoutes from "./auth.routes";

const router = Router();

router.use("/auth", authRoutes);

router.get("/health", (_, res) => {
    res.json({
        success: true,
        message: "API running",
    });
});

export default router;