// "use client";
import SideMenu from "../components_admin/SideMenu";
import Header from "../components_admin/Header";
import Table_Category from "../components_admin/categorys/CategoryTable";
import axios from "axios";
// import React, {  useRef, useState } from "react";
import FormCategory from "../components_admin/categorys/CategoryForm";


export default function Categorys() {


  return (
    <div className="bg-[#F9FAFB] h-full ">
      <main className=" flex border h-full">
        <SideMenu categorys={'bg-[#e0e7ff6e] text-[#6158ff]'}/>
        <div className="w-full">
          <Header page_title= {"Categories Management"} />

          <div className=" mx-5 mt-5 relative ">
          <div className="flex justify-center md:w-[80%] xs:w-full absolute items-center">
            <FormCategory />
          </div>
           <Table_Category />

          </div>
        </div>
      </main>
    </div>
  );
}
