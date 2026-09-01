import ProductDetails from'../../components/productDetails'



export default function ProductDetailsPage({params}) {  
  const { id } = params; 

return(
<div className='bg-white'>
    <ProductDetails itemId={id}/>
<hr></hr>

</div>
)}