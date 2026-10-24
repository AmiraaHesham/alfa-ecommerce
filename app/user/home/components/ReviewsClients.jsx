import Image from "next/image";
import { useLanguage } from "../../../../context/LanguageContext";

export default function ReviewsClients() {
    const { t } = useLanguage()
return(
<div className="w-full h-auto  rounded-3xl p-5 mt-5 ">
<h1 className="text-2xl font-medium my-7">{t("reviews_clients")}</h1>
<div className="w-full h-[330px] mb-10 grid grid-cols-3 gap-10">
 <span className="relative w-full h-full"><Image src="/Images/ReviewsClients/1.png" alt="Review 1" fill quality={100} priority  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-fill"/></span>   
   <span className="relative w-full h-full"><Image src="/Images/ReviewsClients/2.png" alt="Review 2" fill quality={100} priority sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-fill" /></span>
 <span className="relative w-full h-full">  <Image src="/Images/ReviewsClients/3.png" alt="Review 3" fill quality={100} priority sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-fill"/></span>
   <span className="relative w-full h-full"> <Image src="/Images/ReviewsClients/8.png" alt="Review 8" fill quality={100} priority  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-fill"/></span>
  <span className="relative w-full h-full">  <Image src="/Images/ReviewsClients/5.png" alt="Review 5" fill quality={100} priority  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-fill"/></span>
   <span className="relative w-full h-full"> <Image src="/Images/ReviewsClients/6.png" alt="Review 6" fill quality={100} priority  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-fill"/></span>
  <span className="relative w-full h-full"> <Image src="/Images/ReviewsClients/7.png" alt="Review 7" fill quality={100} priority  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-fill"/></span>
   <span className="relative w-full h-full"> <Image src="/Images/ReviewsClients/9.png" alt="Review 9" fill quality={100} priority  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-fill"/></span>
</div>
</div>
)}