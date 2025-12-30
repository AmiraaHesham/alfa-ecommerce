"use client";
import Image from "next/image";
import SideMenu from "../components_admin/SideMenu";
import Header from "../components_admin/Header";
import Dashboard_Details from "../components_admin/dashboard/Details";
import RecentOrders_Table from "../components_admin/dashboard/Table";
import QuicksAction from "../components_admin/dashboard/QuicksAction";
export default function Dashboard() {
  return (
    <div className="bg-[#F9FAFB]">
      <main className="flex">
        <SideMenu dashbord={"bg-[#e0e7ff6e] text-[#6158ff]"} />
        <div className="w-full">
          <Header page_title={"Dashboard Overview"} />
          <div className="flex w-full flex-col justify-center items-center mt-6 relative">
            <div className="w-[90%] ">
              <Dashboard_Details />
              <QuicksAction />
              <RecentOrders_Table />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
