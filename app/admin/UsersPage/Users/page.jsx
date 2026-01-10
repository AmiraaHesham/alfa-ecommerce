import SideMenu from "../../components_admin/SideMenu";
import Header from "../../components_admin/Header";
import Failter from "../../../components/Failter";
import Users_Table from "../../components_admin/users/Users_Table";
export default function UsersPage() {
  return (
    <div className="h-full bg-[#F9FAFB]">
      <main className=" flex border  ">
        <SideMenu users={"bg-[#e0e7ff6e] text-[#6158ff]"} />
        <div className="w-full bg-[#F9FAFB]  h-full">
          <Header page_title={"Users Management"} />
          <div className="flex w-full flex-col justify-center  items-center  relative">
            <div className="w-[90%] mt-3 ">
              <Users_Table />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
