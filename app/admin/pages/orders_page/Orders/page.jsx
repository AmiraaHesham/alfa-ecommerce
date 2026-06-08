import SideMenu from "../../../components_admin/SideMenu";
import Header from "../../../components_admin/Header";
import Orders_Details from "../../../components_admin/orders/Orders_Details";
import Orders_Failter from "../../../../components/Failter";
import Orders_Table from "../../../components_admin/orders/Orders_Table";
import Image from "next/image";

export default function Orders() {

  return (
    <div className="bg-[#F9FAFB]">
      {/* <div className="flex w-full flex-col justify-center items-center mt-6 relative"> */}
      <div className="flex w-full  flex-col justify-center items-center  relative">
        <div className="px-5 w-full mt-3 ">
          <Orders_Details />
          <Orders_Table />
        </div>
      </div>
    </div>
  );
  
}
