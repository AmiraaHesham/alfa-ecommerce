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
      <div className="w-full bg-[#eff1ef] p-20 flex flex-col gap-5">
        <div className="bg-white h-full flex flex-col rounded-2xl p-4">
          <div className="w-[40px] h-[40px] bg-red-200 rounded-full flex items-center justify-center">
            <AiFillSafetyCertificate className="text-2xl text-red-700" />
          </div>
          <span className="font-semibold">
            {lang === "ar" ? "سياسة الضمان" : "Guarantee Policy"}
          </span>

          {lang === "ar" ? (
            <span className="text-xs font-semibold text-gray-600">
              سياسة ضمان المنتجات الإلكترونية جميع منتجاتنا مشمولة بضمان ضد عيوب
              الصناعة من تاريخ الشراء المثبت بالفاتورة، وذلك وفقًا لمدة الضمان
              الخاصة بكل منتج: * الشاشات: ضمان لمدة سنتين. * المراوح: ضمان لمدة
              سنة واحدة. * الرسيفرات: ضمان لمدة سنة واحدة. يشمل الضمان الأعطال
              الناتجة عن خلل تصنيع أو عيوب في المكونات الداخلية تحت ظروف
              الاستخدام الطبيعية. لا يشمل الضمان الحالات التالية: الكسر، الشرخ،
              السقوط، الصدمات، دخول السوائل أو الرطوبة، الحرق الكهربائي، سوء
              الاستخدام، التوصيل الخاطئ، فتح الجهاز أو إصلاحه لدى جهة غير
              معتمدة، إزالة الرقم التسلسلي، التعديلات غير المعتمدة، الاستهلاك
              الطبيعي، الملحقات والإكسسوارات ما لم يُذكر خلاف ذلك. للاستفادة من
              الضمان يجب تقديم فاتورة الشراء الأصلية أو ما يثبت عملية الشراء.
              يخضع المنتج للفحص الفني خلال 3 إلى 7 أيام عمل، وفي حال ثبوت عيب
              تصنيع يتم الإصلاح أو الاستبدال أو استرداد المبلغ وفقًا لتقييم
              القسم الفني وسياسة الشركة. العميل مسؤول عن تسليم المنتج بحالته
              الكاملة مع جميع الملحقات المطلوبة للفحص عند الحاجة. في حال
              الاستبدال، يستكمل المنتج البديل المدة المتبقية من الضمان الأصلي.
            </span>
          ) : (
            <span>
              All our electronic products are covered by a manufacturer's
              warranty from the date of purchase as evidenced by the invoice,
              according to the warranty specific to each product: * Monitors:
              2-year warranty. * Architecture: 1-year warranty. * Receivers:
              1-year warranty. This covers defects that begin to deteriorate or
              that occur in components under normal operating conditions. It
              does not cover the following: breakage, cracking, theft, damage,
              leakage or moisture damage, electrical damage, misuse, incorrect
              connection, opening or repairing the device with an unauthorized
              part, removal of the serial number, unauthorized use, normal wear
              and tear, or accessories unless otherwise specified in the defect
              report. The original purchase invoice or proof of purchase must be
              presented to claim the warranty. The product will be subject to
              technical inspection within 3 to 7 business days. If the product
              is found to be defective, it will be repaired, replaced, or fully
              refunded according to the technical department and company policy.
              The responsible party is responsible for delivering the product in
              its original condition with all necessary accessories for
              inspection, if required. In the event of a defect, the product
              will complete the remaining term of the original warranty.
            </span>
          )}
        </div>
        <div className="bg-white h-full flex flex-col rounded-2xl p-4">
          <div className="w-[40px] h-[40px] bg-red-200 rounded-full flex items-center justify-center">
            <GiMoneyStack className="text-2xl text-red-700" />
          </div>
          <span className="font-semibold">
            {lang === "ar" ? "سياسة الشراء " : "Purchase Policy"}
          </span>
        </div>

        <div className="bg-white h-full flex flex-col rounded-2xl p-4">
          <div className="w-[40px] h-[40px] bg-red-200 rounded-full flex items-center justify-center">
            <TbTruckReturn className="text-2xl text-red-700" />
          </div>{" "}
          <span className="font-semibold">
            {lang === "ar" ? "سياسة الاسترجاع" : "Return Policy"}
          </span>
          {lang === "ar" ? (
            <p className="text-xs font-semibold text-gray-600">
              نسعى لتقديم منتجات عالية الجودة ورضا كامل لعملائنا، وفي حال وجود
              أي مشكلة يمكن الاستفادة من سياسة الاسترجاع والاستبدال وفق الشروط
              التالية:
               1. مدة طلب الاسترجاع أو الاستبدال يحق للعميل طلب
              الاسترجاع أو الاستبدال خلال 14 يومًا من تاريخ الاستلام، ما لم
              يُذكر خلاف ذلك على المنتج.
               2. حالة المنتج يشترط أن يكون المنتج
              بحالته الأصلية، غير مستخدم، وخاليًا من التلف، مع كامل الملحقات
              والتغليف الأصلي والفاتورة أو ما يثبت الشراء.
               3. الحالات التي يحق
              فيها الاسترجاع أو الاستبدال * وصول منتج مختلف عن الطلب. * وجود عيب
              مصنعي. * تلف المنتج أثناء الشحن. * عدم مطابقة المنتج للمواصفات
              المعلنة بشكل جوهري. 4. الحالات التي لا يشملها الاسترجاع أو
              الاستبدال * سوء الاستخدام أو التلف الناتج بعد الاستلام. * الكسر أو
              الخدوش الناتجة عن الاستخدام. * المنتجات التي تم تركيبها أو تشغيلها
              بشكل أدى إلى تلفها. * المنتجات المفتوحة أو المستخدمة بما يمنع
              إعادة بيعها كجديدة، ما لم يكن بها عيب مصنعي. * أي طلب بعد انتهاء
              المدة المحددة. 5. الفحص والموافقة يخضع المنتج للفحص عند استلامه،
              ويتم اعتماد طلب الاسترجاع أو الاستبدال بعد التأكد من مطابقته
              للشروط. 6. رسوم الشحن في حال كان السبب خطأ من المتجر أو عيبًا
              مصنعيًا، يتحمل المتجر رسوم الشحن. وفي غير ذلك قد يتحمل العميل رسوم
              الشحن والاسترجاع. 7. استرداد المبلغ يتم رد المبلغ خلال 7 إلى 14
              يوم عمل بعد الموافقة على الطلب، باستخدام نفس وسيلة الدفع إن أمكن
              أو أي وسيلة مناسبة. 8. الاستبدال يتم إرسال المنتج البديل بعد
              استلام المنتج المرتجع وفحصه وتوفر المخزون. 9. طريقة تقديم الطلب
              يتم التواصل مع خدمة العملاء وإرسال رقم الطلب وسبب الاسترجاع أو
              الاستبدال وصور توضيحية عند الحاجة.
            </p>
          ) : (
            <p>
              We strive to provide high-quality products and complete customer
              satisfaction. In case of any issue, you can take advantage of our
              return and exchange policy according to the following conditions:
              1. Return or Exchange Period Customers have the right to request a
              return or exchange within 14 days of the date of receipt, unless
              otherwise stated on the product. 2. Product Condition The product
              must be in its original condition, unused, and free from damage,
              with all accessories, original packaging, and the invoice or proof
              of purchase. 3. Conditions Under Which Returns or Exchanges Are
              Eligible * Receiving a product different from the order. * A
              manufacturing defect. * Damage to the product during shipping. *
              The product does not materially conform to the advertised
              specifications. 4. Conditions Not Covered by Returns or Exchanges
              * Misuse or damage resulting from receipt. * Breakage or scratches
              resulting from use. * Products that have been installed or
              operated in a manner that has caused damage. * Opened or used
              products that cannot be resold as new, unless they have a
              manufacturing defect. * Any order placed after the specified
              deadline. 5. Inspection and Approval The product will be inspected
              upon receipt. Return or exchange requests will be approved after
              verifying that they meet the requirements. 6. Shipping Fees If the
              reason for the return or exchange is a store error or a
              manufacturing defect, the store will bear the shipping fees.
              Otherwise, the customer may be responsible for the return shipping
              fees. 7. Refund Refunds will be issued within 7 to 14 business
              days after request approval, using the same payment method if
              possible, or any other suitable method. 8. Replacement The
              replacement product will be sent after the returned product has
              been received, inspected, and is available in stock. 9. How to
              Place an Order Contact customer service and provide the order
              number, the reason for the return or exchange, and supporting
              photos if needed.
            </p>
          )}
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
        <div className="grid grid-cols-4 gap-10 mt-20 ">
          <div className="flex flex-col text-center">
            <Image
              src="/Images/unnamed.png"
              width={250}
              height={350}
              className="w-full h-full rounded-xl"
            />
            <span>Julian Thorne</span>
            <span>Chief Technology Officer</span>
          </div>

          <div className="flex flex-col text-center">
            <Image
              src="/Images/unnamed.png"
              width={250}
              height={350}
              className="w-full h-full rounded-xl"
            />
            <span>Julian Thorne</span>
            <span>Chief Technology Officer</span>
          </div>
          <div className="flex flex-col text-center">
            <Image
              src="/Images/unnamed.png"
              width={250}
              height={350}
              className="w-full h-full rounded-xl"
            />
            <span>Julian Thorne</span>
            <span>Chief Technology Officer</span>
          </div>
          <div className="flex flex-col text-center">
            <Image
              src="/Images/unnamed.png"
              width={250}
              height={350}
              className="w-full h-full rounded-xl"
            />
            <span>Julian Thorne</span>
            <span>Chief Technology Officer</span>
          </div>
        </div>
      </div>
    </div>
  );
}
