// import { create } from "zustand";
// import api from "@/services/api";

// export type UserRole =
//   | "Admin"
//   | "Project Manager"
//   | "Team Member";

// export interface User {
//   _id: string;
//   name: string;
//   email: string;
//   role: UserRole;
// }

// interface AuthStore {
//   token: string | null;

//   user: User | null;

//   loading: boolean;

//   isAuthenticated: boolean;

//   setUser: (user: User | null) => void;

//   setToken: (token: string | null) => void;

//   initialize: () => Promise<void>;

//   logout: () => void;
// }

// export const useAuthStore = create<AuthStore>((set) => ({
//   token:
//     typeof window !== "undefined"
//       ? localStorage.getItem("token")
//       : null,

//   user: null,

//   loading: true,

//   isAuthenticated: false,

//   setUser: (user) =>
//     set({
//       user,
//       isAuthenticated: !!user,
//     }),

//   setToken: (token) => {
//     if (token) {
//       localStorage.setItem("token", token);
//     } else {
//       localStorage.removeItem("token");
//     }

//     set({
//       token,
//     });
//   },

//   initialize: async () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       set({
//         loading: false,
//         user: null,
//         token: null,
//         isAuthenticated: false,
//       });

//       return;
//     }

//     try {
//       const res = await api.get("/auth/me");

//       set({
//         token,
//         user: res.data.data,
//         loading: false,
//         isAuthenticated: true,
//       });
//     } catch {
//       localStorage.removeItem("token");

//       set({
//         token: null,
//         user: null,
//         loading: false,
//         isAuthenticated: false,
//       });
//     }
//   },

//   logout: () => {
//     localStorage.removeItem("token");

//     set({
//       token: null,
//       user: null,
//       isAuthenticated: false,
//     });

//     window.location.replace("/login");
//   },
// }));



import { create } from "zustand";
import api from "@/services/api";

export type UserRole =
  | "Admin"
  | "Project Manager"
  | "Team Member";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  initialized: boolean;

  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;

  initialize: () => Promise<void>;

  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token:
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null,

  user:
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user") || "null")
    : null,

  loading: true,

  initialized: false,

  // setUser: (user) =>
  //   set({
  //     user,
  //   }),
  setUser: (user) => {
  if (typeof window !== "undefined") {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }

  set({
    user,
  });
},
  setToken: (token) => {
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
    }

    set({
      token,
    });
  },

  // initialize: async () => {
  //   const token =
  //     typeof window !== "undefined"
  //       ? localStorage.getItem("token")
  //       : null;

  //   if (!token) {
  //     set({
  //       token: null,
  //       user: null,
  //       loading: false,
  //       initialized: true,
  //     });

  //     return;
  //   }

  //   try {
  //     const res = await api.get("/auth/me");

  //     set({
  //       token,
  //       user: res.data.data,
  //       loading: false,
  //       initialized: true,
  //     });
  //   } catch {
  //     localStorage.removeItem("token");

  //     set({
  //       token: null,
  //       user: null,
  //       loading: false,
  //       initialized: true,
  //     });
  //   }
  // },
 initialize: async () => {

  if (useAuthStore.getState().initialized) {
    return;
  }

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  if (!token) {
    set({
      token: null,
      user: null,
      loading: false,
      initialized: true,
    });

    return;
  }

  try {
    const res = await api.get("/auth/me");
localStorage.setItem(
  "user",
  JSON.stringify(res.data.data)
);
    set({
      token,
      user: res.data.data,
      loading: false,
      initialized: true,
    });

  } catch {

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({
      token: null,
      user: null,
      loading: false,
      initialized: true,
    });

  }

},
  // logout: () => {
  //   localStorage.removeItem("token");

  //   set({
  //     token: null,
  //     user: null,
  //     loading: false,
  //     initialized: true,
  //   });

  //   window.location.replace("/login");
  // },
  logout: () => {

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  set({
    token: null,
    user: null,
    loading: false,
    initialized: true,
  });

  window.location.replace("/login");
},
}));