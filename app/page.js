"use client"
import { useRouter } from "next/navigation";
import Header from "./user/components/Header";
import Footer from './user/components/Footer'
import BottomNav from './user/components/BottomNav'
import Menu from './user/components/Menu'
import { MenuOpenProvider } from "../context/MenuOpenContext";
import { FaSquareWhatsapp, FaWhatsapp } from "react-icons/fa6";
import { getRequest } from "../utils/requestsUtils";
import { useEffect, useState } from "react";
import Image from "next/image";
import HomePage from "./user/home/page";
export default function Home() {
  const router = useRouter();
    const [whatsAppUrl, setWhatsAppUrl] = useState()
    const [role, setRole] = useState()
  
    const getWhatsappUrl = async () => {
      const response = await getRequest("/api/public/contact");
      setWhatsAppUrl(response?.data?.whatsappURL);
    }
    useEffect(() => {
      getWhatsappUrl()
    }, [])
  
    useEffect(() => {
      setRole(localStorage.role)
    }, [role])
  useEffect(() => {
    // غيّر '/ar' إلى الرابط اللي عايزه
    const role =
      typeof window !== "undefined" ? localStorage.getItem("role") : null;
    if (
      role === "ADMIN"

    ) {
      router.replace('/admin/Dashboard');

    } else {
      router.replace('/'); // استخدم replace عشان ما يبقاش في التاريخ

    }
  }, [router]);

  return (
       <>
    
          {
            role === 'ADMIN' ? (
              <div className="w-full h-screen flex justify-center items-center text-center">
                <div className=" ">
                  <div className="flex justify-center items-center mb-20">
                    <Image src='/Images/logo.png' width={200} height={200} alt='logo ' className="flex justify-center items-center" />
    
                  </div>
                  <h1 className="text-2xl font-semibold ">You are not authorized to view this page</h1>
                </div>
    
              </div>
    
            ) : (
              <MenuOpenProvider>
                <div className="w-full">
                  <Header />
                  <div className=" w-full max-w-[1500px] min-w-0 pb-20 sm:pb-0 overflow-x-clip mx-auto">
<HomePage/>
                  </div>
    
      <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="fixed bottom-[5.5rem] right-5 z-40 sm:bottom-14"
                    >
                      <FaWhatsapp
                        className="bg-green-500 text-white p-1 rounded-xl text-5xl drop-shadow-lg hover:scale-110 duration-300"
                      />
                    </a>
          <footer id="footer" className="w-full  bg-white pb-20 sm:pb-0">
                  <Footer />
                </footer>
                <BottomNav />
                <Menu />
              </div>
            </MenuOpenProvider>
          )
        }
      </>
  );

}
