import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import Activity from "../models/activity.model";

export const getActivities = asyncHandler(
  async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 15;

    const filter: any = {};

    if (req.query.action) {
      filter.action = req.query.action;
    }

    if (req.query.user) {
      filter.user = req.query.user;
    }

    if (req.query.project) {
      filter.project = req.query.project;
    }

    if (req.query.task) {
      filter.task = req.query.task;
    }

    if (req.query.search) {
      filter.description = {
        $regex: req.query.search,
        $options: "i",
      };
    }

    const total = await Activity.countDocuments(filter);

    const activities = await Activity.find(filter)
      .populate("user", "name email")
      .populate("project", "name")
      .populate("task", "title")
      .sort({
        createdAt: -1,
      })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.json(
      new ApiResponse(
        true,
        "Activities fetched successfully",
        {
          activities,
          total,
          page,
          totalPages: Math.ceil(total / limit),
        }
      )
    );
  }
);