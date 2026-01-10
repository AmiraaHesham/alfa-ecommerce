import SideMenu from "../../components_admin/SideMenu";
import Header from "../../components_admin/Header";
import Failter from "../../../components/Failter";
import UserInfo from "../../components_admin/users/userInfo";
export default function UsersPage() {
  return (
       <div className="bg-[#F9FAFB] h-screen ">
         <main className="flex bg-[#F9FAFB] ">
           <SideMenu users={"bg-[#e0e7ff6e] text-[#6158ff]"} />
           <div className="w-full h-full  bg-[#F9FAFB] ">
             <Header page_title={""} />
             <div className=" mx-5 mt-3  ">
              <UserInfo/>
            </div>
          </div>
        
      </main>
    </div>
  );
}
