import Dashboard_Details from "../../components_admin/dashboard/Details";
import RecentOrders_Table from "../../components_admin/dashboard/Table";
import QuicksAction from "../../components_admin/dashboard/QuicksAction";
export default function Dashboard() {
  return (
    <div className="bg-[#F9FAFB]">
      <div className="flex w-full flex-col justify-center items-center p-5 ">
        <div className="w-full  ">
          <Dashboard_Details />
          <QuicksAction />
          <RecentOrders_Table />
        </div>
      </div>
    </div>
  );

}
