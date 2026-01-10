// import ImageSlider from "../../components/home/ImageSlider"

// export default function Homepage() {
//      const [ImagesSliders, setImagesSliders] = useState([]);


// const getImages = async () => {
//   try {
//     const res = await getSliderImage();
//     setImagesSliders(res);
//   } catch (error) {
//     console.error('Failed to fetch slider images:', error);
//   } 
// };
// const lang = typeof window !== 'undefined' 
//     ? localStorage.getItem('lang') || 'ar' 
//     : 'ar';
//   useEffect(() => {
//     getImages()
//   }, []);
//   return (
//     <div>
// <ImageSlider images={ImagesSliders} lang={lang}/>
//     </div>
//   )}