"use client"
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
        <SideMenu/>
        <div className="w-full">
          <Header page_title={"Dashboard Overview"} />
             <div className="mx-10 mt-6 relative">
            <Dashboard_Details />
            <div className="flex justify-center gap-3 mt-3 items-center w-full">
            <RecentOrders_Table />
<QuicksAction />
            </div>
             </div>
        </div>

      </main>

    </div>
  );
}