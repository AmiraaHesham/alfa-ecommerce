"use client";
import Table_Category from "../../components_admin/categories/CategoryTable";
import FormCategory from "../../components_admin/categories/CategoryForm";
import { useState } from "react";


export default function Categorys() {

// const role =
//     typeof window !== "undefined" ? localStorage.getItem("role") : null;
//   if(role === "ADMIN"){

  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="h-screen bg-[#F9FAFB]">
         
<div className=" w-full bg-[#F9FAFB]">
 <div className=" pt-5 mx-5 relative h-full  ">
          <div className="flex justify-center md:w-[80%] xs:w-full absolute items-center ">
            <FormCategory isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen}/>
          </div>
           <Table_Category setIsFormOpen={setIsFormOpen} />

          </div>
        </div>
</div>
         
   
  )
  // ;}
  //  else{
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
