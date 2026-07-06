import Sliders from './components/Sliders'
import FeatuersProducts  from './components/FeatuersProducts'

export default function HomePage() {
    const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null;
  return (
 <div className="w-full ">
 
          <div className=" relative   ">
          <Sliders/>
          <hr className="h-1  my-10"></hr>
          <div className="bg-[#F9FAFB] w-full px-5 ">
          <FeatuersProducts/>

          </div>
          </div>
        </div>
  ) 

}