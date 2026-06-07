import OrderDetailsHeader from "../../../components_admin/order_details/Header";
import Order_Iitems from "../../../components_admin/order_details/Order_Items";
import User_Info from "../../../components_admin/order_details/User_Info";
import UpdateStatus from "../../../components_admin/order_details/UpdateStatus";
export default function ReturnOrderDetailsPage({params}) {
  const { id } = params;

  return (
    <div className="h-full p-5 bg-[#F9FAFB]">
      <div className=" relative">
        <OrderDetailsHeader orderId={id} orderType={"return-orders"} />
        <UpdateStatus orderId={id} orderType={"return-orders"} />
        <div className="flex md:flex-row xs:flex-col gap-5 md:justify-between items-start mt-7">
          <Order_Iitems orderId={id} orderType={"return-orders"}/>
          <User_Info orderId={id} orderType={"return-orders"} />
        </div>
      </div>
    </div>
  );
}
