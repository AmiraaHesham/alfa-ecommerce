"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { BiSolidBulb } from "react-icons/bi";
import { FaHeart, FaLeaf } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { HiLightBulb } from "react-icons/hi";
import { IoHeart, IoShieldCheckmark } from "react-icons/io5";
import { TbTruckReturn } from "react-icons/tb";

export default function About() {
  const [lang, setLang] = useState(null);

  useEffect(() => {
    setLang(localStorage.getItem("lang"));
  }, []);
  return (
    <div className="w-full bg-white">
      <div className="w-full flex flex-col justify-center text-center h-full py-20">
        {/* <h1 className="text-xs text-gray-500">{lang === 'ar' ? 'تأسست عام 2010' : 'ESTABLISHED 2010'}</h1> */}
        <h1 className="text-5xl font-bold  text-center mt-5">
          {lang === "ar" ? (
            <span className=" ">
              {" "}
              <span>تمكين</span> <br />{" "}
              <span className="text-red-700"> نمط حياتك الرقمي</span>
            </span>
          ) : (
            <span className=" ">
              {" "}
              <span>Empowering Your</span> <br />{" "}
              <span className="text-red-700 "> Digital Lifestyle</span>
            </span>
          )}
        </h1>
        <h1 className="text-lg text-gray-600 mt-10">
          {lang === "ar"
            ? "مؤسسة الفا جروب الرائدة في مجال تقديم الخدمات الرقمية المتطورة تأسست  ٢٠١٠"
            : "Alpha Group, a leader in providing advanced digital services."}
        </h1>
      </div>
      <div className="w-full bg-[#f5f7f5] py-20  mt-10">
        <div className="flex md:flex-row xs:flex-col items-center justify-center gap-5">
          <Image
            src="/Images/23@4x.png"
            alt=""
            width={500}
            height={500}
            className="w-[400px] h-[400px] rounded-3xl"
          />
          <div className="md:w-[600px] xs:w-[400px] h-full p-5">
            <div>
              <h1 className="font-semibold text-lg">
                {lang === "ar" ? "من نحن ؟" : "Who We Are ?"}
              </h1>
              {lang === "ar" ? (
                <p className="text-sm font-semibold text-gray-600">
                  {" "}
                  نحن الفا جروب الرائدة في مجال تقديم الخدمات الرقمية المتطورة
                  تأسست ٢٠١٠ مؤسسة الفا جروب في عام لتصبح واحدة من الشركات
                  الرائدة في مجال [مجال الخدمات الرقمية المتطورة وخدمات استقبال
                  الأقمار الاصطناعية ننلتزم الفا جروب بتقديم حلول رائدة ومبتكرة
                  وعالية الجودة تهدف إلى تقديم خدمات تستحوذ علي ارضاء العملاء
                  عبر نخبة خبراء وتقنين يقدموا للعملاء كافة الخدمات باحترافية
                  ].علي مدار الساعه تسعى الفا جروب دوما الي الريادة من خلال
                  الابتكار المستمر والتميز في الخدمات المقدمة للسادة العملاء .
                </p>
              ) : (
                <p className="text-sm font-semibold text-gray-600">
                  We are Alpha Group, a leader in providing advanced digital
                  services. Founded in 2010, Alpha Group has become one of the
                  leading companies in the field of advanced digital services
                  and satellite reception. Alpha Group is committed to providing
                  leading, innovative, and high-quality solutions aimed at
                  achieving customer satisfaction through a select team of
                  experts and technicians who professionally provide all
                  services to clients around the clock. Alpha Group always
                  strives for leadership through continuous innovation and
                  excellence in the services provided to our valued clients.
                </p>
              )}
            </div>
            <div className="mt-10">
              <h1 className="font-semibold text-lg">
                {lang === "ar" ? "رسالتنا" : "Our message"}
              </h1>
              {lang === "ar" ? (
                <p className="text-sm font-semibold text-gray-600">
                  تقديم خدمات/منتجات استثنائية تفوق توقعات عملائنا، مع الالتزام
                  بأعلى معايير الجودة والمهنية، خدماتنا ومنتجاتنا تغطي مصر
                  والخليج العربي عبر الوكلاء الرسميين في منطقة الخليج العربي
                  (دبى-دولة الإمارات العربية المتحدة )
                </p>
              ) : (
                <p className="text-sm font-semibold text-gray-600">
                  Providing exceptional services/products that exceed our
                  clients' expectations, while adhering to the highest standards
                  of quality and professionalism. Our services and products
                  cover Egypt and the Arabian Gulf through official agents in
                  the Arabian Gulf region (Dubai, United Arab Emirates).
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#eff1ef] p-20 grid lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1   gap-10">
        <div className="bg-white h-full rounded-2xl p-4">
          <div className="w-[40px] h-[40px] bg-red-200 rounded-full flex items-center justify-center">
            <AiFillSafetyCertificate  className="text-2xl text-red-700" />
          </div>
          <span className="font-semibold">{lang === "ar" ? "سياسة الضمان" : "Guarantee Policy"}</span>
        </div>
        <div className="bg-white h-full rounded-2xl p-4">
          <div className="w-[40px] h-[40px] bg-red-200 rounded-full flex items-center justify-center">
            <GiMoneyStack className="text-2xl text-red-700" />
          </div>
          <span className="font-semibold">{lang === "ar" ? "سياسة الشراء " : "Purchase Policy"}</span>
        </div>

        <div className="bg-white h-full rounded-2xl p-4">
          <div className="w-[40px] h-[40px] bg-red-200 rounded-full flex items-center justify-center">
            <TbTruckReturn  className="text-2xl text-red-700" />
          </div>{" "}
          <span className="font-semibold">{lang === "ar" ? "سياسة الاسترجاع" : "Return Policy"}</span>
        </div>
      </div>
      <div className="w-full bg-[#f5f7f5] py-20 px-32 text-center ">
        <h1 className="text-2xl font-bold">
          {lang === "ar" ? "القيم التي تحركنا" : "Values That Drive Us"}
        </h1>
        <div className="grid md:grid-cols-4 xs:grid-cols-2 gap-10 mt-16">
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-[50px] h-[50px] bg-red-200 rounded-full flex items-center justify-center">
              <IoShieldCheckmark className="text-2xl text-red-700" />
            </div>
            <h1 className="font-semibold">
              {lang === "ar" ? "الجودة" : "Quality"}
            </h1>
            <h1 className="font-semibold text-sm text-gray-600">
              {lang === "ar"
                ? "معايير لا تقبل المساومة في كل بكسل ودائرة إلكترونية."
                : "Uncompromising standards in every pixel and circuit."}
            </h1>
          </div>

          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-[50px] h-[50px] bg-red-200 rounded-full flex items-center justify-center">
              <HiLightBulb className="text-3xl text-red-700" />
            </div>
            <h1 className="font-semibold">
              {lang === "ar" ? "ابتكار" : "Innovation"}
            </h1>
            <h1 className="font-semibold text-sm text-gray-600">
              {lang === "ar"
                ? "تجاوز الحدود لحل تحديات الغد."
                : "Pushing boundaries to solve tomorrow's challenges."}
            </h1>
          </div>

          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-[50px] h-[50px] bg-red-200 rounded-full flex items-center justify-center">
              <IoHeart className="text-2xl text-red-700" />
            </div>
            <h1 className="font-semibold">
              {lang === "ar" ? "العميل أولاً" : "Customer First"}
            </h1>
            <h1 className="font-semibold text-sm text-gray-600">
              {lang === "ar"
                ? "إن تجربتكم هي بوصلة قراراتنا."
                : "Your experience is the compass for our decisions."}
            </h1>
          </div>

          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-[50px] h-[50px] bg-red-200 rounded-full flex items-center justify-center">
              <FaLeaf className="text-2xl text-red-700" />
            </div>
            <h1 className="font-semibold">
              {lang === "ar" ? "الاستدامة" : "Sustainability"}
            </h1>
            <h1 className="font-semibold text-sm text-gray-600">
              {lang === "ar"
                ? "الابتكار مع احترام مستقبل كوكبنا."
                : "Innovating with respect for our planet’s future."}
            </h1>
          </div>
        </div>
      </div>
      <div className="bg-white text-center p-20">
<h1 className="text-2xl font-bold">{lang === 'ar'? "العقول المبدعة خلفنا":"The Minds Behind the Light"}</h1>

<h1 className="text-gray-600 text-sm font-semibold ">{lang === 'ar'? "تعرّف على الخبراء في تقديم أفضل ما في عالم التكنولوجيا.":"Meet the passionate experts dedicated to bringing you the best in tech."}</h1>
   <div className="grid grid-cols-4 gap-10 mt-20 ">
    <div className="flex flex-col text-center">
      <Image src='/Images/unnamed.png' width={250} height={350} className="w-full h-full rounded-xl"/>
      <span>Julian Thorne</span>
      <span>Chief Technology Officer</span>
      </div>

 <div className="flex flex-col text-center">
      <Image src='/Images/unnamed.png' width={250} height={350} className="w-full h-full rounded-xl"/>
      <span>Julian Thorne</span>
      <span>Chief Technology Officer</span>
      </div>
       <div className="flex flex-col text-center">
      <Image src='/Images/unnamed.png' width={250} height={350} className="w-full h-full rounded-xl"/>
      <span>Julian Thorne</span>
      <span>Chief Technology Officer</span>
      </div>
       <div className="flex flex-col text-center">
      <Image src='/Images/unnamed.png' width={250} height={350} className="w-full h-full rounded-xl"/>
      <span>Julian Thorne</span>
      <span>Chief Technology Officer</span>
      </div>
   </div>
      </div>
    </div>
  );
}
