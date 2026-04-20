"use client";
import FormProduct from "../../components_admin/products/ProductForm";
import ProductsTable from "../../components_admin/products/ProductsTable";
import { useState } from "react";

export default function Products() {
  // const role =
  //   typeof window !== "undefined" ? localStorage.getItem("role") : null;
  // if(role === "ADMIN"){
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <div className=" p-5 bg-[#F9FAFB]">
      <div className="  relative ">
        <FormProduct isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
        <ProductsTable setIsFormOpen={setIsFormOpen} />
      </div>
    </div>
  );
  // ;}
  //    else{
  //     return(
  //       <div className="w-full h-screen flex justify-center items-center text-center">
  //         <div className=" ">
  //           <div className="flex justify-center items-center mb-10">
  // <Image src='/Images/logo.png' width={200} height={200} alt='logo ' className="flex justify-center items-center"/>

  //           </div>
  //       <h1 className="text-2xl font-semibold ">You are not authorized to view this page</h1>
  //         </div>

  //         </div>
  //     )}
}
