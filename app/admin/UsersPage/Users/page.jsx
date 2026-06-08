import SideMenu from "../../components_admin/SideMenu";
import Header from "../../components_admin/Header";
import Failter from "../../../components/Failter";
import Users_Table from "../../components_admin/users/Users_Table";
import Image from "next/image";
export default function UsersPage() {
  return (
    <div className=" bg-[#F9FAFB]">
      <div className="w-full relative p-5 ">
        <Users_Table />
      </div>
    </div>
  );
}
