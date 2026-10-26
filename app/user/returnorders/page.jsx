import ReturnOrders from "./components/returnOrdersHistory"
import RequireAuth from "../components/RequireAuth";

export default function OrdersHistoryPage() {  

return(
<RequireAuth>
  <div className= "w-full md:p-10 xs:p-5">
      <ReturnOrders/>
  </div>
</RequireAuth>
)}