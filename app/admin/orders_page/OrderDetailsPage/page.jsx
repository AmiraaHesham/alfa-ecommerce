import SideMenu from "../../components_admin/SideMenu";
import Header from "../../components_admin/Header";
import OrderDetailsHeader from "../../components_admin/order_details/Header";
import Order_Iitems from "../../components_admin/order_details/Order_Items";
import User_Info from "../../components_admin/order_details/User_Info";

export default function OrderDetailsPage() {
  return (
    <div className="h-full bg-[#F9FAFB]">
            <main className=" flex border  ">
              <SideMenu tabId={"Orders"} />
              <div className="w-full">
                <Header page_title={"Order Details"} />
                             <div className="mx-10 mt-2 relative">

                <OrderDetailsHeader/>
                <div className="flex gap-10 justify-between mt-5">
                   <Order_Iitems/>
                   <User_Info/>   
                </div>
            
                </div>
                </div>
                </main>
    </div>
  )}