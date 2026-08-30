"use client";
import Image from "next/image";
import { MdCancel } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { getRequest, postRequest } from "../../../../utils/requestsUtils.js";
import { useRefresh } from "../../../../context/refreshContext.jsx";
import Select from "react-select";

export default function SliderForm({ isFormOpen, setIsFormOpen }) {
    const [photo, setPhoto] = useState({
        imageFile: "",
        image: "",
    });

    const [itemId, setItemId] = useState("");
    const { t } = useLanguage();
    const{locale} = useLanguage()
    const { triggerRefresh } = useRefresh();
    const [loading, setLoading] = useState();
    const [search, setSearch] = useState("");
    const [options, setOptions] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    useEffect(() => {
        const fetchRecentItems = async () => {
            const res = await getRequest("/api/public/items/recent");
            const products = res?.data || [];
            setOptions(
                products.map((product) => ({
                    value: product.itemId,
                    label: locale === "ar" ? product.nameAr : product.nameEn,
                    product,
                }))
            );
        };
        fetchRecentItems();
    }, []);

    const handleSearch = async () => {
        if (!search.trim()) {
            setOptions([]);
            return;
        }

        const res = await postRequest(
            "/api/public/items/search",
            {
                searchText: search,
            }, ""
        );

        const products = res?.data || [];

        setOptions(
            products.map((product) => ({
                value: product.itemId,
                label: locale === "ar"? product.nameAr : product.nameEn,
                
                product,
            }))
        );
    };
    const handelupload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return; // مهم جدًا

        const reader = new FileReader();

        reader.onload = () => {
            setPhoto((prev) => ({
                ...prev,
                image: reader.result,
                imageFile: file,
            }));
        };
        reader.readAsDataURL(file);


    };
 
    const handleSubmit = async () => {
        
        const formData = new FormData();
        formData.append("imageFile", photo.imageFile);
        formData.append("itemId", itemId);
        
        await postRequest("/api/admin/sliderImages", formData, t("message"));
        triggerRefresh()
    }

    return (
        <div
            id="add-slider-form"
            className={`fixed inset-0 bg-black/40 flex items-center justify-center z-50 ${isFormOpen ? "flex" : "hidden"}`}
        >
            {loading && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <Image
                        src="/Images/logo.png"
                        alt=""
                        className="w-[100px] h-[100px]  border-t-transparent rounded-full animate-pulse"
                        width={100}
                        height={100}
                        priority
                    />
                </div>
            )}
            <div className="bg-white shadow-md shadow-slate-400 h-[450px] xs:w-full lg:w-[500px] flex flex-col border rounded-md">
                <div className="m-4 flex justify-between items-center">
                    <h1 id="nameFormCategory" className="text-lg font-semibold">
                        {t("add_slider")}
                    </h1>
                    <button
                        className="text-3xl text-red-950  hover:text-red-800"
                        onClick={() => {
                            setIsFormOpen(false);
                            setPhoto({ imageFile: "", image: "" });
                            setSelectedProduct(null)
                            setSearch("")
                            setOptions([])
                        }}
                    >
                        <MdCancel />
                    </button>
                </div>
                <hr className="h-1 mb-3"></hr>
                <div className="flex justify-center items-center ">
                    <form
                        className=" md:w-[60%] xs:w-[80%] "
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <label htmlFor="fileInput" className="cursor-pointer ">
                            <div className="flex flex-col items-center relative h-[150px] justify-center p-3 border-2 border-dashed border-red-300 rounded-lg hover:bg-gray-50">
                                {!photo.image ? (
                                    <div className="flex flex-col justify-center items-center">
                                        <span className="text-4xl text-red-600">
                                            <IoCloudUploadSharp />
                                        </span>
                                        <span className="text-sm ">
                                            {t("add-photo")}
                                        </span>
                                    </div>
                                ) : (
                                    // 🖼️ Image Preview
                                    <div className="w-[100px] h-[100px] ">
                                        <Image
                                            alt=""
                                            src={photo.image}
                                            fill
                                            className="w-full h-full object-contain rounded-lg"
                                        />
                                    </div>
                                )}
                            </div>
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handelupload}
                            className="hidden"
                            id="fileInput"
                        />
                        <div className="mt-4">
                            <div className="flex flex-col gap-2 ">

                                <label className="text-md ">
                                    {t("choose_product")}
                                </label>
                                <div className="border rounded-lg border-red-300 px-1 ">

                                <Select
                                    options={options}
                                    value={selectedProduct}
                                    inputValue={search}
                                    isSearchable
                                    placeholder={t("search")}
                                    onInputChange={(value, actionMeta) => {
                                        if (actionMeta.action === "input-change") {
                                            setSearch(value);
                                        }
                                        return value;
                                    }}

                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            handleSearch();
                                        }
                                    }}

                                    onChange={(selected) => {
                                        setItemId(selected.value)
                                        setSelectedProduct(selected);
                                        setSearch("");
                                    }}

                                    noOptionsMessage={() => "لا توجد منتجات"}
                                     styles={{
                    control: (provided) => ({
                      ...provided,
                      border: "none",
                      boxShadow: "none",
                      fontWeight: "600",
                      height: "100%",
                      width: "100%",
                    }),
                    option: (provided) => ({
                      ...provided,
                      // backgroundColor: '#b91c1c',
                      color: "white",
                      fontSize: "18px",
                      fontWeight: "600",
                    }),
                    input: (base) => ({
                      ...base,
                      color: "#374151",
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isSelected
                        ? "#dc2626"
                        : state.isFocused
                          ? "#fee2e2"
                          : "#ffffff",
                      color: state.isSelected ? "#ffffff" : "#374151",
                      cursor: "pointer",
                      padding: "10px",
                      "&:hover": {
                        backgroundColor: state.isSelected
                          ? "#dc2626"
                          : "#fee2e2",
                      },
                    }),
                  }}
                                />
                                </div>

                            </div>
                        </div>



                        <div className="flex justify-center items-center">
                            <button
                                type="submit"
                                id="btn-saveCategory"
                                className={`bg-red-600 py-2 px-3 text-white mt-7  hover:bg-red-800 rounded-lg `}
                                onClick={() => {
                            setPhoto({ imageFile: "", image: "" });
                                    setSelectedProduct(null)
                                    setSearch("")
                                    setOptions([])
                                    handleSubmit()
                                      setIsFormOpen(false);

                                }}
                            >
                                {t("save")}
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
