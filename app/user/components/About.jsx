"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { FaLeaf } from "react-icons/fa";
import { HiLightBulb } from "react-icons/hi";
import { IoHeart, IoShieldCheckmark } from "react-icons/io5";
import { TbTruckReturn } from "react-icons/tb";
import { useLanguage } from "../../../context/LanguageContext";

export default function About() {
  const [lang, setLang] = useState(null);
  const { locale } = useLanguage();
  useEffect(() => {
    setLang(localStorage.getItem("lang"));
  }, [locale]);
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
            alt={lang === "ar" ? "صورة من نحن" : "About us image"}
            width={500}
            height={500}
            className="w-[400px] h-[400px] rounded-3xl"
            priority
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
      <div className="w-full bg-[#eff1ef] md:p-28 xs:p-10 flex flex-col gap-5 ">
        <div
          id="Guarantee_Policy"
          className="bg-white h-full flex flex-col rounded-2xl p-4"
        >
          <div className="flex  items-center gap-3">
            <div className="w-[40px] h-[40px] bg-red-200 rounded-full flex items-center justify-center">
              <AiFillSafetyCertificate className="text-2xl text-red-700" />
            </div>
            <span className="font-semibold">
              {lang === "ar" ? "سياسة الضمان" : "Guarantee Policy"}
            </span>
          </div>
          {lang === "ar" ? (
            <span className="text-xs font-semibold text-gray-600 whitespace-pre-wrap  mt-5">
              {`سياسة ضمان المنتجات الإلكترونية

جميع منتجاتنا مشمولة بضمان ضد عيوب الصناعة من تاريخ الشراء المثبت بالفاتورة، وذلك وفقًا لمدة الضمان الخاصة بكل منتج:

* الشاشات: ضمان لمدة سنتين.
* المراوح: ضمان لمدة سنة واحدة.
* الرسيفرات: ضمان لمدة سنة واحدة.

يشمل الضمان الأعطال الناتجة عن خلل تصنيع أو عيوب في المكونات الداخلية تحت ظروف الاستخدام الطبيعية.

لا يشمل الضمان الحالات التالية:
* الكسر، الشرخ، السقوط، الصدمات
* دخول السوائل أو الرطوبة
* الحرق الكهربائي
* سوء الاستخدام أو التوصيل الخاطئ
* فتح الجهاز أو إصلاحه لدى جهة غير معتمدة
* إزالة الرقم التسلسلي أو التعديلات غير المعتمدة
* الاستهلاك الطبيعي
* الملحقات والإكسسوارات ما لم يُذكر خلاف ذلك

للاستفادة من الضمان:
يجب تقديم فاتورة الشراء الأصلية أو ما يثبت عملية الشراء.

الفحص:
يخضع المنتج للفحص الفني خلال 3 إلى 7 أيام عمل.

في حال ثبوت عيب تصنيع:
يتم الإصلاح أو الاستبدال أو استرداد المبلغ وفقًا لتقييم القسم الفني.

ملاحظات:
* العميل مسؤول عن تسليم المنتج بحالته الكاملة
* في حال الاستبدال، المنتج البديل يكمل مدة الضمان`}
            </span>
          ) : (
            <span className="text-xs text-gray-600 whitespace-pre-wrap  mt-5">
              {`All our electronic products are covered by a manufacturer's warranty from the date of purchase (as shown on the invoice), according to each product:

* Monitors: 2-year warranty
* Fans: 1-year warranty
* Receivers: 1-year warranty

The warranty covers defects in manufacturing or internal components under normal use.

Not covered:
* Breakage, cracks, drops, shocks
* Liquid or moisture damage
* Electrical damage
* Misuse or incorrect connection
* Unauthorized repair or opening
* Removed serial number or unauthorized modifications
* Normal wear and tear
* Accessories unless stated otherwise

To claim warranty:
Provide the original invoice or proof of purchase.

Inspection:
3–7 business days.

If defect is confirmed:
Repair, replacement, or refund per company policy.

Notes:
* Customer must deliver the product with all accessories
* Replacement continues the remaining warranty period`}
            </span>
          )}
        </div>
        {/* <div className="bg-white h-full flex  items-center gap-3 rounded-2xl p-4">
                    <div className="flex  items-center gap-3">

          <div className="w-[40px] h-[40px] bg-red-200 rounded-full flex items-center justify-center">
            <GiMoneyStack className="text-2xl text-red-700" />
          </div>
          <span className="font-semibold">
            {lang === "ar" ? "سياسة الشراء " : "Purchase Policy"}
          </span>
        </div>
        </div> */}

        <div
          id="Return_Policy"
          className="bg-white h-full flex flex-col rounded-2xl p-4"
        >
          <div className="flex  items-center gap-3">
            <div className="w-[40px] h-[40px] bg-red-200 rounded-full flex items-center justify-center">
              <TbTruckReturn className="text-2xl text-red-700" />
            </div>{" "}
            <span className="font-semibold">
              {lang === "ar" ? "سياسة الاسترجاع" : "Return Policy"}
            </span>
          </div>
          {lang === "ar" ? (
            <p className="text-xs font-semibold text-gray-600 whitespace-pre-wrap break-words  mt-5">
              {`نسعى لتقديم منتجات عالية الجودة ورضا كامل لعملائنا، وفي حال وجود أي مشكلة يمكن الاستفادة من سياسة الاسترجاع والاستبدال وفق الشروط التالية:

1. مدة طلب الاسترجاع أو الاستبدال
يحق للعميل طلب الاسترجاع أو الاستبدال خلال 14 يومًا من تاريخ الاستلام، ما لم يُذكر خلاف ذلك على المنتج.

2. حالة المنتج
يشترط أن يكون المنتج بحالته الأصلية، غير مستخدم، وخاليًا من التلف، مع كامل الملحقات والتغليف الأصلي والفاتورة أو ما يثبت الشراء.

3. الحالات التي يحق فيها الاسترجاع أو الاستبدال
* وصول منتج مختلف عن الطلب
* وجود عيب مصنعي
* تلف المنتج أثناء الشحن
* عدم مطابقة المنتج للمواصفات المعلنة بشكل جوهري

4. الحالات التي لا يشملها الاسترجاع أو الاستبدال
* سوء الاستخدام أو التلف الناتج بعد الاستلام
* الكسر أو الخدوش الناتجة عن الاستخدام
* المنتجات التي تم تركيبها أو تشغيلها بشكل أدى إلى تلفها
* المنتجات المفتوحة أو المستخدمة بما يمنع إعادة بيعها كجديدة
* أي طلب بعد انتهاء المدة المحددة

5. الفحص والموافقة
يخضع المنتج للفحص عند استلامه، ويتم اعتماد الطلب بعد التأكد من مطابقته للشروط.

6. رسوم الشحن
في حال كان السبب خطأ من المتجر أو عيبًا مصنعيًا يتحمل المتجر الرسوم، وغير ذلك يتحمل العميل.

7. استرداد المبلغ
يتم رد المبلغ خلال 7 إلى 14 يوم عمل.

8. الاستبدال
يتم إرسال المنتج البديل بعد استلام المرتجع وفحصه.

9. طريقة تقديم الطلب
يتم التواصل مع خدمة العملاء وإرسال رقم الطلب وسبب الاسترجاع.`}
            </p>
          ) : (
            <p className="whitespace-pre-wrap text-sm text-gray-600 mt-5">
              {`We strive to provide high-quality products and complete customer satisfaction.

In case of any issue, you can take advantage of our return and exchange policy according to the following conditions:

1. Return or Exchange Period
Customers have the right to request a return or exchange within 14 days of the date of receipt, unless otherwise stated on the product.

2. Product Condition
The product must be in its original condition, unused, and free from damage, with all accessories, original packaging, and proof of purchase.

3. Conditions Under Which Returns or Exchanges Are Eligible
* Receiving a product different from the order
* A manufacturing defect
* Damage during shipping
* Product does not match specifications

4. Conditions Not Covered
* Misuse after receipt
* Breakage or scratches from use
* Installed or used products causing damage
* Opened products that cannot be resold
* Requests after deadline

5. Inspection and Approval
The product will be inspected upon receipt.

6. Shipping Fees
Store covers fees if it's their fault.

7. Refund
Within 7–14 business days.

8. Replacement
After inspection and stock availability.

9. How to Request
Contact support with order number and reason.`}
            </p>
          )}
        </div>
      </div>
      <div className="w-full bg-[#f5f7f5] md:p-28 xs:p-10  text-center ">
        <h1 className="text-2xl font-bold">
          {lang === "ar" ? "القيم التي تحركنا" : "Values That Drive Us"}
        </h1>
        <div className="grid md:grid-cols-4 xs:grid-cols-2 gap-5 mt-16">
          <div className="flex flex-col items-center justify-center gap-3 bg-white p-5 rounded-lg">
            <div className="w-[50px] h-[50px] bg-red-200 rounded-full flex items-center justify-center">
              <IoShieldCheckmark className="text-2xl text-red-700" />
            </div>
            <h1 className="font-semibold">
              {lang === "ar" ? "الجودة" : "Quality"}
            </h1>
            <h1 className="font-semibold text-sm text-gray-600">
              {lang === "ar"
                ? "معايير لا تقبل المساومة."
                : "Uncompromising standards ."}
            </h1>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 bg-white p-5 rounded-lg">
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

          <div className="flex flex-col items-center justify-center gap-3 bg-white p-5 rounded-lg">
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

          <div className="flex flex-col items-center justify-center gap-3 bg-white p-5 rounded-lg">
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
      <div className="bg-white text-center md:p-28 xs:p-10">
        <h1 className="text-2xl font-bold">
          {lang === "ar"
            ? "العقول المبدعة خلفنا"
            : "The Minds Behind the Light"}
        </h1>

        <h1 className="text-gray-600 text-sm font-semibold mt-5 ">
          {lang === "ar"
            ? "تعرّف على الخبراء في تقديم أفضل ما في عالم التكنولوجيا."
            : "Meet the passionate experts dedicated to bringing you the best in tech."}
        </h1>
        <div className="grid md:grid-cols-4 xs:grid-cols-2 gap-10 mt-20 ">
          <div className="flex flex-col text-center">
            <Image
              src="/Images/unnamed.png"
              alt={lang === "ar" ? "صورة الفريق" : "Team member photo"}
              width={250}
              height={350}
              className="w-full h-full rounded-xl"
            />
            <span>Julian Thorne</span>
            <span className="text-sm font-semibold text-gray-400">
              Chief Technology Officer
            </span>
          </div>

          <div className="flex flex-col text-center">
            <Image
              src="/Images/unnamed.png"
              alt={lang === "ar" ? "صورة الفريق" : "Team member photo"}
              width={250}
              height={350}
              className="w-full h-full rounded-xl"
            />
            <span>Julian Thorne</span>
            <span className="text-sm font-semibold text-gray-400">
              Chief Technology Officer
            </span>
          </div>
          <div className="flex flex-col text-center">
            <Image
              src="/Images/unnamed.png"
              alt={lang === "ar" ? "صورة الفريق" : "Team member photo"}
              width={250}
              height={350}
              className="w-full h-full rounded-xl"
            />
            <span>Julian Thorne</span>
            <span className="text-sm font-semibold text-gray-400">
              Chief Technology Officer
            </span>
          </div>
          <div className="flex flex-col text-center">
            <Image
              src="/Images/unnamed.png"
              alt={lang === "ar" ? "صورة الفريق" : "Team member photo"}
              width={250}
              height={350}
              className="w-full h-full rounded-xl"
            />
            <span>Julian Thorne</span>
            <span className="text-sm font-semibold text-gray-400">
              Chief Technology Officer
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
