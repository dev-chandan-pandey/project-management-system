import { Response } from "express";

import { asyncHandler } from "../../common/utils/asyncHandler";

import { dashboardService } from "./dashboard.service";

export const getDashboard =
  asyncHandler(async (_, res: Response) => {
    const dashboard =
      await dashboardService.getDashboard();

    res.json({
      success: true,
      data: dashboard,
    });
  });