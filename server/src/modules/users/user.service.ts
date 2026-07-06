import { userRepository } from "./user.repository";

import { ProjectModel } from "../projects/project.model";

import { TaskModel } from "../tasks/task.model";

export class UserService {

 async teamMembers(){

   const users =
     await userRepository.findAll();

   return Promise.all(

      users.map(async user=>{

        const [
          projects,
          tasks
        ]=await Promise.all([

          ProjectModel.find({

             members:user._id

          }).select("name status"),

          TaskModel.find({

             assignedTo:user._id

          }).select("title status priority")

        ]);

        return{

           id:user.id,

           name:user.name,

           email:user.email,

           role:user.role,

           assignedProjects:projects,

           assignedTasks:tasks

        };

      })

   );

 }

 async profile(id:string){

    const user=
       await userRepository.findById(id);

    return user;

 }

}

export const userService =
new UserService();