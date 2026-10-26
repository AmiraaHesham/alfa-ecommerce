import OrderDetails from'../components/OrderDetails'
import RequireAuth from "../../components/RequireAuth";



export default function OrderDetailsPage({params}) {  
  const { id } = params; 

return(
<RequireAuth>
  <div className=''>
      <OrderDetails orderId={id}/>
  </div>
</RequireAuth>
)}