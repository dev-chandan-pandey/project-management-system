// User controller placeholder
import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";
import User from "../models/user.model";

// export const getUsers = asyncHandler(
//   async (req: Request, res: Response) => {
//     const filter: any = {};

// if (req.query.search) {
//   filter.$or = [
//     {
//       name: {
//         $regex: req.query.search,
//         $options: "i",
//       },
//     },
//     {
//       email: {
//         $regex: req.query.search,
//         $options: "i",
//       },
//     },
//   ];
// }
//     const users = await User.find()
//       .select("-password")
//       .populate("assignedProjects", "name status")
//       .populate(
//         "assignedTasks",
//         "title status priority"
//       );

//     res.json(
//       new ApiResponse(true, "Users fetched", users)
//     );
//   }
// );

export const getUsers = asyncHandler(
  async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const filter: any = {};

    if (req.query.search) {
      filter.$or = [
        {
          name: {
            $regex: req.query.search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: req.query.search,
            $options: "i",
          },
        },
      ];
    }

    if (req.query.role) {
      filter.role = req.query.role;
    }

    const total = await User.countDocuments(filter);

    const users = await User.find(filter)
      .select("-password")
      .populate("assignedProjects", "name status")
      .populate(
        "assignedTasks",
        "title status priority"
      )
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({
        createdAt: -1,
      });

    return res.json(
      new ApiResponse(
        true,
        "Users fetched",
        {
          users,
          total,
          page,
          totalPages: Math.ceil(total / limit),
        }
      )
    );
  }
);
export const getUser = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("assignedProjects")
      .populate("assignedTasks");

    if (!user)
      throw new ApiError(404, "User not found");

    res.json(
      new ApiResponse(true, "User fetched", user)
    );
  }
);