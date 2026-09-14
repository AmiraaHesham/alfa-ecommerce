
"use client"
import Header from "./components/Header";
import Footer from './components/Footer'
import BottomNav from './components/BottomNav'
import { FaSquareWhatsapp, FaWhatsapp } from "react-icons/fa6";
import { getRequest } from "../../utils/requestsUtils";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function UserLayout({ children }) {
  const [whatsAppUrl, setWhatsAppUrl] = useState()
  const [role, setRole] = useState('')

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
  return (
    <div>

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
          <div className="w-full">
            <Header />
            
            <main className="  w-full pb-20 sm:pb-0 ">
              {children}
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
            </main>
            <footer id="footer" className="w-full  bg-white pb-20 sm:pb-0">
              <Footer />
            </footer>
            <BottomNav />
          </div>
        )
      }
    </div>


  );
}