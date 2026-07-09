// import {
//   LayoutDashboard,
//   FolderKanban,
//   CheckSquare,
//   Users,
//   Activity,
//   Columns3,
// } from "lucide-react";

// export type UserRole =
//   | "Admin"
//   | "Project Manager"
//   | "Team Member";

// export interface NavItem {
//   title: string;
//   href: string;
//   icon: any;
//   roles: UserRole[];
// }

// export const navigation: NavItem[] = [
//   {
//     title: "Dashboard",
//     href: "/dashboard",
//     icon: LayoutDashboard,
//     roles: [
//       "Admin",
//       "Project Manager",
//       "Team Member",
//     ],
//   },
//   {
//     title: "Projects",
//     href: "/projects",
//     icon: FolderKanban,
//     roles: ["Admin", "Project Manager"],
//   },
//   {
//     title: "Tasks",
//     href: "/tasks",
//     icon: CheckSquare,
//     roles: [
//       "Admin",
//       "Project Manager",
//       "Team Member",
//     ],
//   },
//   {
//     title: "Kanban",
//     href: "/kanban",
//     icon: Columns3,
//     roles: [
//       "Admin",
//       "Project Manager",
//       "Team Member",
//     ],
//   },
//   {
//     title: "Team",
//     href: "/team",
//     icon: Users,
//     roles: ["Admin"],
//   },
//   {
//     title: "Activity",
//     href: "/activity",
//     icon: Activity,
//     roles: [
//       "Admin",
//       "Project Manager",
//     ],
//   },


import {
    LayoutDashboard,
    FolderKanban,
    CheckSquare,
    Columns3,
    Users,
    Activity,
    LucideIcon
} from "lucide-react";

export type UserRole =
    | "Admin"
    | "Project Manager"
    | "Team Member";

export interface NavigationItem{

    title:string;

    href:string;

    icon:LucideIcon;

    roles:UserRole[];

}

export const navigation:NavigationItem[]=[

{

title:"Dashboard",

href:"/dashboard",

icon:LayoutDashboard,

roles:[

"Admin",

"Project Manager",

"Team Member"

]

},

{

title:"Projects",

href:"/projects",

icon:FolderKanban,

roles:[

"Admin",

"Project Manager"

]

},

{

title:"Tasks",

href:"/tasks",

icon:CheckSquare,

roles:[

"Admin",

"Project Manager",

"Team Member"

]

},

{

title:"Kanban",

href:"/kanban",

icon:Columns3,

roles:[

"Admin",

"Project Manager",

"Team Member"

]

},

{

title:"Team",

href:"/team",

icon:Users,

roles:["Admin"]

},

{

title:"Activity",

href:"/activity",

icon:Activity,

roles:[

"Admin",

"Project Manager"

]

}

];