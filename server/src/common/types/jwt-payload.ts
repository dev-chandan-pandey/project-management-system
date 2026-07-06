import { UserRole } from "../../modules/users/user.types";

export interface JwtPayload {
  id: string;
  role: UserRole;
}