export type ProjectStatus =
  | "Planning"
  | "Active"
  | "Completed"
  | "Archived";

export interface Project {

  _id:string;

  name:string;

  description:string;

  startDate:string;

  endDate:string;

  status:ProjectStatus;

}