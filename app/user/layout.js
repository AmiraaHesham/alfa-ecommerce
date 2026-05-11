
"use client"
import Header from "./components/Header";
import Footer from './components/Footer'
import { FaSquareWhatsapp } from "react-icons/fa6";
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
            <main className=" bg-[#F9FAFB] w-full ">
              {children}
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-5 right-5 z-50"
              >
                <FaSquareWhatsapp
                  className="text-green-500 text-5xl drop-shadow-lg hover:scale-110 duration-300"
                />
              </a>
            </main>
            <footer id="footer" className="w-full  bg-white border-t-2">
              <Footer />
            </footer>
          </div>
        )
      }
    </div>


  );
}