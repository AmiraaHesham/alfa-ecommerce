import SideMenu from "../components_admin/SideMenu";
import Header from "../components_admin/Header";
import Sliders from '../components_admin/homepage/Sliders'
import FeatuersProducts  from '../components_admin/homepage/FeatuersProducts'
import ProductForm  from '../components_admin/products/ProductForm'

export default function HomePage() {

    
    // let upload = document.querySelector("#label-uplod");
    // let img = document.querySelector("#lable-img");
    // img.classList.remove("hidden");
    // upload.classList.add("hidden");
  // const contentMargin = locale === 'ar' ? 'mr-[250px]' : 'ml-[250px]';

  return (
    <div className='bg-[#F9FAFB] '>
      <main className="flex  h-screen">
        <SideMenu homepage={"bg-[#e0e7ff6e] text-[#6158ff]"} />
        <div className="w-full  ">
          <Header page_title={"HomePage Management"} />
          <div className=" mt-3  bg-[#F9FAFB]">
          <Sliders/>
          <hr className="h-1 mx-10 my-10"></hr>
          <FeatuersProducts/>
          </div>
        </div>
      </main>
    </div>
  );
}
