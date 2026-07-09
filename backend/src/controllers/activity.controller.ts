import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import Activity from "../models/activity.model";

export const getActivities = asyncHandler(
    async (req: Request, res: Response) => {
        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 20;

        const total = await Activity.countDocuments();

        const activities = await Activity.find()
            .populate("user", "name")
            .populate("project", "name")
            .populate("task", "title")
            .sort({
                createdAt: -1
            })
            .skip((page - 1) * limit)
            .limit(limit);

        return res.json(

            new ApiResponse(

                true,

                "Activities",

                {

                    activities,

                    total,

                    page,

                    totalPages:

                        Math.ceil(total / limit)

                }

            )

        );
    }
);