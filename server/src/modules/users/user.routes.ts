import { Router } from "express";

import {

getTeamMembers,

getProfile

} from "./user.controller";

import {

authenticate

} from "../../common/middleware/auth.middleware";

const router=Router();

router.use(authenticate);

router.get(
"/",
getTeamMembers
);

router.get(
"/:id",
getProfile
);

export default router;