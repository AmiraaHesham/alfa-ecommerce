"use client"
import Admins_Table from "../../components_admin/admins/AdminsTable";
import AdminForm from "../../components_admin/admins/AdminForm";
import { useState } from "react";


export default function AdminsPage() {

//  const role =
//     typeof window !== "undefined" ? localStorage.getItem("role") : null;
//   if(role === "ADMIN"){
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="w-full h-full p-5 bg-[#F9FAFB] ">
      

          <div className=" h-full relative">
            <AdminForm  isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />

            <Admins_Table setIsFormOpen={setIsFormOpen}/>
          </div>
        </div>
     
  )
// }
//   else{
//     return(
//       <div className="w-full h-screen flex justify-center items-center text-center">
//         <div className=" ">
//           <div className="flex justify-center items-center mb-20">
// <Image src='/Images/logo.png' width={200} height={200} alt='logo ' className="flex justify-center items-center"/>

//           </div>
//       <h1 className="text-2xl font-semibold ">You are not authorized to view this page</h1>
//         </div>
        
//         </div>
//     )}

  
}
