"use client";
import Image from "next/image";
import { MdCancel } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { getRequest, postRequest } from "../../../../utils/requestsUtils.js";
import { useRefresh } from "../../../../context/refreshContext.jsx";
import { getThumbnailUrl } from "../../../../utils/functions.jsx";
import Select from "react-select";

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL;

// The public search endpoint returns a paginated object (`data.content`),
// while `/items/recent` returns a plain array. Normalise both shapes so the
// dropdown can render whichever one the API sends.
const extractProducts = (payload) => {
    const data = payload?.data ?? payload;
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.content)) return data.content;
    return [];
};

const mapProductToOption = (product, locale) => ({
    value: product.itemId,
    label:
        (locale === "ar" ? product.nameAr : product.nameEn) ||
        product.nameAr ||
        product.nameEn ||
        product.code ||
        `#${product.itemId}`,
    product,
});

export default function SliderForm({ isFormOpen, setIsFormOpen }) {
    const [photo, setPhoto] = useState({
        imageFile: "",
        image: "",
    });

    const [itemId, setItemId] = useState("");
    const { t, locale } = useLanguage();
    const { triggerRefresh } = useRefresh();
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [options, setOptions] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchLoading, setSearchLoading] = useState(false);
    const [focusedOption, setFocusedOption] = useState(null);
    const recentOptionsRef = useRef([]);
    const searchTimerRef = useRef(null);
    const searchRequestIdRef = useRef(0);
    const searchValueRef = useRef("");

    useEffect(() => {
        searchValueRef.current = search;
    }, [search]);

    const resetForm = useCallback(() => {
        setPhoto({ imageFile: "", image: "" });
        setItemId("");
        setSelectedProduct(null);
        setSearch("");
        setFocusedOption(null);
        setSearchLoading(false);
        searchValueRef.current = "";
        searchRequestIdRef.current++;
        clearTimeout(searchTimerRef.current);
    }, []);

    const fetchRecentItems = useCallback(async () => {
        try {
            const res = await getRequest("/api/public/items/recent");
            const recentOptions = extractProducts(res).map((product) =>
                mapProductToOption(product, locale)
            );
            recentOptionsRef.current = recentOptions;
            // Don't overwrite results if the user already started typing.
            if (!searchValueRef.current.trim()) {
                setOptions(recentOptions);
            }
        } catch (error) {
            recentOptionsRef.current = [];
            if (!searchValueRef.current.trim()) {
                setOptions([]);
            }
        }
    }, [locale]);

    useEffect(() => {
        if (!isFormOpen) return;
        resetForm();
        fetchRecentItems();
    }, [isFormOpen, resetForm, fetchRecentItems]);

    const searchProducts = useCallback(
        async (value) => {
            const query = value.trim();
            const requestId = ++searchRequestIdRef.current;

            if (!query) {
                setSearchLoading(false);
                setOptions(recentOptionsRef.current);
                return;
            }

            setSearchLoading(true);
            try {
                const res = await postRequest(
                    "/api/public/items/search",
                    {
                        page: 0,
                        size: 50,
                        searchText: query,
                    },
                    ""
                );

                if (requestId !== searchRequestIdRef.current) return;

                setOptions(
                    extractProducts(res).map((product) =>
                        mapProductToOption(product, locale)
                    )
                );
            } catch (error) {
                if (requestId !== searchRequestIdRef.current) return;
                setOptions([]);
            } finally {
                if (requestId === searchRequestIdRef.current) {
                    setSearchLoading(false);
                }
            }
        },
        [locale]
    );

    // Search as the user types; pressing Enter still searches immediately.
    useEffect(() => {
        if (!isFormOpen) return;

        clearTimeout(searchTimerRef.current);

        if (!search.trim()) {
            searchRequestIdRef.current++;
            setSearchLoading(false);
            setOptions(recentOptionsRef.current);
            return;
        }

        searchTimerRef.current = setTimeout(() => searchProducts(search), 350);
        return () => clearTimeout(searchTimerRef.current);
    }, [search, isFormOpen, searchProducts]);

    useEffect(() => () => clearTimeout(searchTimerRef.current), []);

    const formatOptionLabel = ({ label, product }) => {
        const url = product?.images?.[0]?.imageUrl || product?.mainImageURL || "";
        const thumbnail = url ? IMAGE_BASE_URL + getThumbnailUrl(url) : "";

        return (
            <div className="flex items-center gap-3">
                {thumbnail ? (
                    <Image
                        src={thumbnail}
                        alt=""
                        width={30}
                        height={30}
                        className="rounded-md object-cover w-[30px] h-[30px]"
                    />
                ) : (
                    <div className="w-[30px] h-[30px] bg-gray-100 rounded-md" />
                )}
                <span>{label}</span>
            </div>
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
        if (loading) return;
        if (!photo.imageFile) {
            alert(t("please_fill_all_fields"));
            return;
        }

        const formData = new FormData();
        formData.append("imageFile", photo.imageFile);
        formData.append("itemId", itemId);

        try {
            setLoading(true);
            const res = await postRequest(
                "/api/admin/sliderImages",
                formData,
                t("message")
            );

            // `postRequest` resolves with no value when the user cancels the
            // confirmation dialog, so don't close or refresh in that case.
            if (!res) return;

            triggerRefresh();
            setIsFormOpen(false);
            resetForm();
        } catch (error) {
            // The shared request helper already displays the API error.
        } finally {
            setLoading(false);
        }
    };

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
            <div className="bg-white shadow-md shadow-slate-400 min-h-[450px] h-auto w-[95%] max-w-[500px] flex flex-col border rounded-md max-h-[90vh] overflow-y-auto">
                <div className="m-4 flex justify-between items-center">
                    <h1 id="nameFormCategory" className="text-lg font-semibold">
                        {t("add_slider")}
                    </h1>
                    <button
                        className="text-3xl text-red-950  hover:text-red-800"
                        onClick={() => {
                            setIsFormOpen(false);
                            resetForm();
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
                            handleSubmit();
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
                                    isLoading={searchLoading}
                                    filterOption={() => true}
                                    formatOptionLabel={formatOptionLabel}
                                    placeholder={t("search")}
                                    onInputChange={(value, actionMeta) => {
                                        if (actionMeta.action === "input-change") {
                                            setSearch(value);
                                        }
                                        return value;
                                    }}
                                    onFocusedOptionChange={({ focusedOption: option }) => setFocusedOption(option)}

                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !focusedOption) {
                                            e.preventDefault();
                                            clearTimeout(searchTimerRef.current);
                                            searchProducts(search);
                                        }
                                    }}

                                    onChange={(selected) => {
                                        if (!selected) return;
                                        setItemId(selected.value);
                                        setSelectedProduct(selected);
                                        setSearch("");
                                        setFocusedOption(null);
                                    }}

                                    noOptionsMessage={() => t("no_products") || "لا توجد منتجات"}
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
                                disabled={loading}
                                className={`bg-red-600 py-2 px-3 text-white mt-7  hover:bg-red-800 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed`}
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
