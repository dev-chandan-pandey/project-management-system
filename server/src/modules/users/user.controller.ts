import { Response } from "express";

import { asyncHandler } from "../../common/utils/asyncHandler";

import { userService } from "./user.service";

export const getTeamMembers =
asyncHandler(

async(_,res:Response)=>{

 const users=
 await userService.teamMembers();

 res.json({

   success:true,

   data:users

 });

});

export const getProfile=
asyncHandler(

async(req,res:Response)=>{

 const user=
 await userService.profile(
   req.params.id
 );

 res.json({

   success:true,

   data:user

 });

});