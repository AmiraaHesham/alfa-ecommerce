import SideMenu from "../../../components_admin/SideMenu";
import Header from "../../../components_admin/Header";
import OrderDetailsHeader from "../../../components_admin/order_details/Header";
import Order_Iitems from "../../../components_admin/order_details/Order_Items";
import User_Info from "../../../components_admin/order_details/User_Info";

export default function OrderDetailsPage() {
  return (
    <div className="h-full bg-[#F9FAFB]">
      <main className=" flex border  ">
        <SideMenu orders={"bg-[#e0e7ff6e] text-[#6158ff]"} />
        <div className="w-full">
          <Header page_title={"Order Details"} />
          <div className="mx-5 mt-2 relative">
            <OrderDetailsHeader />
            <div className="flex md:flex-row xs:flex-col gap-5 md:justify-between items-start mt-7">
              <Order_Iitems />
              <User_Info />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
