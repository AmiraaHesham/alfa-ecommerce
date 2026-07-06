import ReturnOrderDetails from'../components/returnOrderDetails'

export default function ReturnOrderDetailsPage({params}) {  
  const { id } = params; 

return(
<div className=''>
    <ReturnOrderDetails returnOrderId={id}/>


</div>
)}