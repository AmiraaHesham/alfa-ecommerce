import ReturnOrderDetails from'../components/returnOrderDetails'
import RequireAuth from "../../components/RequireAuth";

export default function ReturnOrderDetailsPage({params}) {  
  const { id } = params; 

return(
<RequireAuth>
  <div className=''>
      <ReturnOrderDetails returnOrderId={id}/>
  </div>
</RequireAuth>
)}