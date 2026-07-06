import OrderDetails from'../components/OrderDetails'



export default function OrderDetailsPage({params}) {  
  const { id } = params; 

return(
<div className=''>
    <OrderDetails orderId={id}/>


</div>
)}