"use client";
import Table_Category from "../../components_admin/categories/CategoryTable";
import FormCategory from "../../components_admin/categories/CategoryForm";
import { useState } from "react";


export default function Categorys() {

  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className=" bg-[#F9FAFB]">
         
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

}
