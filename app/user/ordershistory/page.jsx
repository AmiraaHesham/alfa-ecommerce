import OrdersHistory from "./components/ordersHistory"
import RequireAuth from "../components/RequireAuth";

export default function OrdersHistoryPage() {  

return(
<RequireAuth>
  <div className= "w-full p-5">
      <OrdersHistory/>
  </div>
</RequireAuth>
)}