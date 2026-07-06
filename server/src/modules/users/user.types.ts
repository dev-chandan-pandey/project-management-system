export enum UserRole {
  ADMIN = "ADMIN",
  PROJECT_MANAGER = "PROJECT_MANAGER",
  TEAM_MEMBER = "TEAM_MEMBER",
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
}