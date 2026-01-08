import SideMenu from "../../components_admin/SideMenu";
import Header from "../../components_admin/Header";
import Sliders from '../../components_admin/homepage/Sliders'
import FeatuersProducts  from '../../components_admin/homepage/FeatuersProducts'
// import ProductForm  from '../components_admin/products/ProductForm'

export default function HomePage() {
  return (
    <div className='bg-[#F9FAFB] '>
      <main className="flex  ">
        <SideMenu homepage={"bg-[#e0e7ff6e] text-[#6158ff]"} />
        <div className="w-full  ">
          <Header page_title={"HomePage Management"} />
          <div className=" mt-3 mx-5 relative   bg-[#F9FAFB]">
            
          <Sliders/>
          <hr className="h-1  my-10"></hr>
          
          <FeatuersProducts/>
          </div>
        </div>
      </main>
    </div>
  );
}