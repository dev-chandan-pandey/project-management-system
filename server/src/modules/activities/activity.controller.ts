import { Response } from "express";

import { asyncHandler } from "../../common/utils/asyncHandler";

import { activityService } from "./activity.service";

export const getTimeline =
  asyncHandler(async (req, res: Response) => {
    const page = Number(
      req.query.page ?? 1
    );

    const limit = Number(
      req.query.limit ?? 20
    );

    const result =
      await activityService.timeline(
        page,
        limit
      );

    res.json({
      success: true,
      data: result,
    });
  });