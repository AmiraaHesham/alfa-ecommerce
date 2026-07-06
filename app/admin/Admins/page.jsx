"use client";
import Admins_Table from "./components/AdminsTable";
import AdminForm from "./components/AdminForm";
import { useState } from "react";

export default function AdminsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="bg-[#F9FAFB]">
      <div className="flex w-full  flex-col justify-center items-center  relative">
        <div className="px-5 w-full mt-3 ">
          <AdminForm isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />

          <Admins_Table setIsFormOpen={setIsFormOpen} />
        </div>
      </div>
    </div>
  );
}
