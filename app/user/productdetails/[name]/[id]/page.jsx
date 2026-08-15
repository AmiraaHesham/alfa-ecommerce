import ProductDetails from'../../components/productDetails'



export default function ProductDetailsPage({params}) {  
  const { id } = params; 

return(
<div className=''>
    <ProductDetails itemId={id}/>


</div>
)}