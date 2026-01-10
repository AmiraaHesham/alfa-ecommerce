// pages/index.jsx
"use client"
import { useEffect, useState } from 'react';
import Header from './user/components/Header';
import ImageSlider from './user/components/home/ImageSlider'; // أو المسار الصحيح
import { getSliderImage } from '../utils/functions';

export default function Home() {
  const [sliderImages, setSliderImages] = useState([]);

  const getSliderImages = async () => {
    try {
      const data = await getSliderImage();
    
        setSliderImages(data);
    
    } catch (error) {
      console.error('Failed to fetch slider images:', error);
      setSliderImages([]);
    }
  };

  useEffect(() => {
    getSliderImages();
  }, []);

  return (
    <div className="bg-[#F3F4F6] h-screen  justify-center items-center ">
      <div className=' justify-center '>
<Header />
      <main className="my-10 mx-16">
        <div className=" mb-10">
          <ImageSlider sliderImages={sliderImages} />
        </div>
      </main>
      </div>
      
    </div>
  );
}