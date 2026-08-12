"use client";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import Image from "next/image";

export default function AdminLayout({ children }) {

  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('')
  useEffect(() => {
    setRole(localStorage.role)
  }, [role])
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-10 justify-center items-center h-screen bg-color1">
        <Image src="/Images/logo.png" alt="" priority width={200} height={200} className="w-[100px] h-[100px]  border-t-transparent rounded-full animate-pulse" />
        <h1 className="md:text-5xl xs:text-4xl  font-serif font-semibold animate-pulse bg-gradient-to-r from-[#d62828] via-color3 to-color2 bg-clip-text text-transparent "></h1>
      </div>

    );
  }

  return (
    <div className=" bg-[#F9FAFB] h-screen">
      {
        role === 'ADMIN' ?
          (
            <main className=" flex border  ">
              <SideMenu homepage={"bg-red-100 text-red-500"} />
              <div className="w-full h-full ">
                <Header page_title={"Homepage Management"} />
                <div className="bg-[#F9FAFB] h-screen ">{children}</div>
              </div>
            </main>
          ) : (

            <div className="w-full h-screen flex justify-center items-center text-center">
              <div className=" ">
                <div className="flex justify-center items-center mb-20">
                  <Image src='/Images/logo.png' width={200} height={200} alt='logo ' className="flex justify-center items-center" />

                </div>
                <h1 className="text-2xl font-semibold ">You are not authorized to view this page</h1>
              </div>

            </div>
          )
      }

    </div>
  );
}
