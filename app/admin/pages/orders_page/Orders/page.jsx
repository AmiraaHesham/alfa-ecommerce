import SideMenu from "../../../components_admin/SideMenu";
import Header from "../../../components_admin/Header";
import Orders_Details from "../../../components_admin/orders/Orders_Details";
import Orders_Failter from "../../../../components/Failter";
import Orders_Table from "../../../components_admin/orders/Orders_Table";

export default function Orders() {
  return (
     <div className="h-full bg-[#F9FAFB]">
         <main className=" flex border  ">
           <SideMenu orders={"bg-[#e0e7ff6e] text-[#6158ff]"} />
           <div className="w-full">
             <Header page_title={"Orders Management"} />
             {/* <div className="flex w-full flex-col justify-center items-center mt-6 relative"> */}
          <div className="flex w-full flex-col justify-center items-center  relative">
             <div className="w-[90%] mt-3 ">
              <Orders_Details />
              <Orders_Failter placeholder={"Search by order code or name"}  />
              <Orders_Table />
        </div>
             </div>
           </div>
         </main>
       </div>
  )
}