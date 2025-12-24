"use client"
import SideMenu from "../components_admin/SideMenu";
import Header from "../components_admin/Header";
 import Failter from "../../../app/components/Failter";
 import Users_Table from "../components_admin/users/Users_Table";
export default function UsersPage() {
  return(
   <div className="h-full bg-[#F9FAFB]">
        <main className=" flex border  ">
          <SideMenu tabId={"Categorys"} />
          <div className="w-full">
            <Header page_title={"Users Management"} />
              <div className="mx-10 mt-3 relative">
                <Failter placeholder={"Search by user name or email"} view={"hidden"} />
                <Users_Table />
              </div>
  </div>
  </main>
        </div>
        ) 
}
