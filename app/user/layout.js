
"use client"
import Header from "./components/Header";
import Footer from './components/Footer'
import { FaSquareWhatsapp } from "react-icons/fa6";
import { getRequest } from "../../utils/requestsUtils";


export default async function UserLayout  ({ children }) {

  const response = await getRequest("/api/public/contact");
  const whatsappUrl = response?.data?.whatsappURL;
  return (
    <div >
        <Header />
        <main  className=" bg-[#F9FAFB] ">
          {children} 
          <a
      href={whatsappUrl}
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