'use client'
import Header from "./components/Header";
import Footer from './components/Footer'
// import Image from "next/image";
// import { useEffect, useState } from "react";

export default function UserLayout({ children }) {
//       const [loading, setLoading] = useState(true);
//  useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, []);
//   if (loading) {
//     return (

//     <div className="flex flex-col gap-10 justify-center items-center h-screen bg-color1">
//         <Image src="/Images/logo.png" alt="" className="w-[100px] h-[100px]  border-t-transparent rounded-full animate-pulse"  width={200} height={200}/>
//         <h1 className="md:text-5xl xs:text-4xl  font-serif font-semibold animate-pulse bg-gradient-to-r from-[#d62828] via-color3 to-color2 bg-clip-text text-transparent "></h1>

//       </div>

//     );
//   }

  return (
    <div >
        <Header />
        <main  className=" bg-[#F9FAFB] ">
          {children}
        </main>
        <footer id="footer" className="w-full h-[200px]  flex items-center bg-white border-t-2">
              <Footer/>
        </footer>
    </div>
  );}