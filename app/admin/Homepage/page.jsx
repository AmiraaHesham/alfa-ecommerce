"use client";
import Sliders from './components/Sliders'
import FeatuersProducts  from './components/FeatuersProducts'
import SliderForm from './components/SliderForm'
import { useState } from 'react';
export default function Homepage() {
    const [isFormOpen, setIsFormOpen] = useState(false);
  
    const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null;
  return (
 <div className="w-full ">
 
          <div className=" relative   ">
            <SliderForm setIsFormOpen={setIsFormOpen} isFormOpen={isFormOpen}/>
          <Sliders setIsFormOpen={setIsFormOpen}/>
          <hr className="h-1  my-10"></hr>
          <div className="bg-[#F9FAFB] w-full px-5 ">
          <FeatuersProducts/>

          </div>
          </div>
        </div>
  ) 

}