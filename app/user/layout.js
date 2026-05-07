
"use client"
import Header from "./components/Header";
import Footer from './components/Footer'
import { FaSquareWhatsapp } from "react-icons/fa6";
import { getRequest } from "../../utils/requestsUtils";
import { useEffect, useState } from "react";


export default  function UserLayout  ({ children }) {
  const [whatsAppUrl , setWhatsAppUrl] = useState()
const getWhatsappUrl = async ()=>{
  const response = await getRequest("/api/public/contact");
 setWhatsAppUrl(response?.data?.whatsappURL) ;
}
useEffect(()=>{
  getWhatsappUrl()
},[])
  
  return (
    <div >
        <Header />
        <main  className=" bg-[#F9FAFB] ">
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
        <footer id="footer" className="w-full   flex items-center bg-white border-t-2">
              <Footer/>
        </footer>
       
    </div>
  );}