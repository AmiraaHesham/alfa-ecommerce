import { IoMdInformationCircleOutline } from "react-icons/io";
import { useLanguage } from "../../../../context/LanguageContext";
import { RiRuler2Line } from "react-icons/ri";

export default function Specification({ product }) {
    const { t } = useLanguage();

    return (
        <div className="w-full ">
            <h1 className="text-2xl font-semibold mb-3">{t("specification")} </h1>
            <div className="bg-[#f6f5f8] w-full h-[350px] rounded-3xl p-7">
                <div className="flex flex-col gap-5">
                    <h1 className="text-xl font-semibold flex items-center justify-start gap-3"><IoMdInformationCircleOutline className="text-2xl text-[#E14A5C]" />
                        {t("Overview")}</h1>
                    <div className="w-full text-lg flex flex-col gap-5 items-start">
                        <div className="w-full flex justify-normal items-baseline">
                            <span className="w-full text-gray-600">Brand</span>
                            <span className="w-full font-medium">oki</span>
                        </div>
                        <div className="w-full flex justify-normal items-baseline">
                            <span className="w-full text-gray-600">model</span>
                            <span className="w-full font-medium">oki</span>
                        </div>
                    </div>
                    <hr className="w-full h-[2px]  bg-gray-400 opacity-60"></hr>
                    <h1 className="text-xl font-semibold flex items-center justify-start gap-3"><RiRuler2Line className="text-2xl text-[#E14A5C]" />
                        {t("General")}</h1>
                    <div className="w-full flex flex-col gap-5 text-lg items-start">
                        <div className="w-full flex justify-normal items-baseline">
                            <span className="w-full text-gray-600">Color</span>
                            <span className="w-full font-medium">White
                            </span>
                        </div>
                        <div className="w-full flex justify-normal items-baseline">
                            <span className="w-full text-gray-600">Release years
                            </span>
                            <span className="w-full font-medium">2021
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
