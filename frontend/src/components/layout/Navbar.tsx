// "use client";

// import { useAuthStore } from "@/store/authStore";

// export default function Navbar() {

//     const { user } = useAuthStore();

//     return (

//         <header className="bg-white border-b px-8 py-5 flex justify-between items-center">

//             <div>

//                 <h2 className="text-xl font-bold">

//                     Project Collaboration System

//                 </h2>

//             </div>

//             <div className="text-right">

//                 <p className="font-semibold">

//                     {user?.name}

//                 </p>

//                 <p className="text-sm text-gray-500">

//                     {user?.role}

//                 </p>

//             </div>

//         </header>

//     )

// }

"use client";

import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
  // const { user } = useAuthStore();
const user = useAuthStore((state) => state.user);
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-8">

      <div>
        <h1 className="text-xl font-bold">
          Project Collaboration System
        </h1>
      </div>

      <div className="text-right">

        <p className="font-semibold">
          {user?.name ?? "User"}
        </p>

        <p className="text-sm text-gray-500">
          {user?.role ?? ""}
        </p>

      </div>

    </header>
  );
}