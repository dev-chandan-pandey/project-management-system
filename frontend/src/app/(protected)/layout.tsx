// "use client";

// import { useRouter } from "next/navigation";

// import { useEffect } from "react";

// import Layout from "@/components/layout/Layout";

// export default function ProtectedLayout({

// children

// }:{

// children:React.ReactNode

// }){

// const router=useRouter();

// useEffect(()=>{

// const token=localStorage.getItem("token");

// if(!token){

// router.push("/login");

// }

// },[]);

// return(

// <Layout>

// {children}

// </Layout>

// )

// }

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import Layout from "@/components/layout/Layout";
import LoadingScreen from "@/components/common/LoadingScreen";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const {
  initialize,
  loading,
  user,initialized
} = useAuthStore();

// useEffect(() => {
//   initialize();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, []);

// useEffect(() => {
//   if (!loading && !user) {
//     router.replace("/login");
//   }
// }, [loading, user, router]);

useEffect(() => {

  if (!initialized){
    initialize();
  }

}, [initialized, initialize]);

if (loading) {
  return <LoadingScreen/>;
}

  return <Layout>{children}</Layout>;
}