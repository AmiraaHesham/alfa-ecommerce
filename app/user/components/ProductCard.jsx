import { useIdContext } from "../../../context/idContext";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { deleteRequest, postRequest } from "../../../utils/requestsUtils";
import { useLanguage } from "../../../context/LanguageContext";
import { useRouter } from "next/navigation";
import { useRefresh } from "../../../context/refreshContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function ProductCard({ productInfo, favorite }) {
  const { setSelectedProductId } = useIdContext();
  const navigate = useRouter();
  const { t } = useLanguage();
  // const { triggerRefresh } = useRefresh();

  const userId = localStorage.id;
  const addToCart = async (productId) => {
    await postRequest(
      `/api/shopCarts/${userId}/addLine`,
      {
        itemId: productId,
        quantity: 1,
      },
      ""
    );
    const result = await Swal.fire({
      icon: "success",
      title: t("تم إضافة المنتج الى سلة التسوق"),
      showCancelButton: true,
      confirmButtonText: localStorage.lang === "ar" ? " إتمام  الشراء " : "Yes",
      cancelButtonText: t("continueShopping"),
      customClass: {
        popup: "rounded-xl shadow-lg border border-gray-200 p-6",
        title: "text-xl font-bold text-gray-800 mb-2",
        content: "text-sm text-gray-600 mb-4",
        confirmButton:
          "bg-red-600 hover:bg-red-500 text-white font-medium px-6 py-2 rounded-lg",
        cancelButton:
          "bg-gray-500 hover:bg-gray-400 text-w  font-medium px-6 py-2 rounded-lg ml-2",
      },
    });
    if (result.isConfirmed) {
      navigate.push("/user/cart");
    }
  };
  const addFavoriteItems = async (productId) => {
    const res = await postRequest(
      `/api/users/${userId}/favoriteItems/${productId}`,
      "",
      ""
    );
  };

  const deleteFavoriteItems = async (productId) => {
    try {
      const res = await deleteRequest(
        `/api/users/${userId}/favoriteItems/${productId}`,
        t("message_DeleteText")
      );
      // triggerRefresh();
      console.log(res);
      if (res.success === true) {
        const divProductId = document.querySelector(
          `#div_${productInfo.itemId}`
        );
        divProductId.classList.add("hidden");
      }
    } catch (error) {}
  };
  const describtion =
    localStorage.lang === "ar"
      ? productInfo.descriptionAr
      : productInfo.descriptionEn;

  const productName =
    localStorage.lang === "ar" ? productInfo.nameAr : productInfo.nameEn;

  return (
    // <div className="h-full w-full border rounded-md bg-white flex justify-center py-2  cursor-pointer duration-300 hover:scale-105 ">
    <div
      id={`div_${productInfo.itemId}`}
      className="h-[350px] w-full bg-white border rounded-md cursor-pointer  hover:border-b-[7px] hover:border-b-red-600  hover:scale-105 duration-200   hover:shadow-lg "
    >
      <div className="flex flex-col justify-between items-baseline">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL}${
            productInfo.mainImageURL || ""
          }`}
          alt=""
          width={500}
          height={500}
          priority
          className="h-[160px]  w-full rounded-t-lg"
          onClick={() => {
            setSelectedProductId(productInfo.itemId);
            navigate.push(`/user/pages/productdetails/${productInfo.itemId}`);
          }}
        />
        <div className="px-3 flex flex-col gap-3 my-2">
          <div className="flex justify-between items-center">
            {/* <div> */}
            <h1
              className=" text-sm font-semibold"
              onClick={() => {
                setSelectedProductId(productInfo.itemId);
                navigate.push(
                  `/user/pages/productdetails/${productInfo.itemId}`
                );
              }}
            >
              {productName.length <= 29
                ? productName
                : productName.slice(0, 29) + " ..."}
            </h1>
            {/* <div className="absolute bottom-full left-0  
                  hidden group-hover:block 
                  bg-white text-gray-800 text-sm rounded-lg 
                  shadow-lg border border-gray-200
                  p-3 w-64
                  z-50">
{describtion}  </div> */}
            {/* </div> */}
            <span
              id={`btn_fov_${productInfo.itemId}`}
              className={`hover:text-red-600 hover:scale-110 duration-200 ${
                favorite === true ? "text-red-600" : "text-gray-400"
              } rounded-full`}
              onClick={() => {
                const btn_fov = document.querySelector(
                  `#btn_fov_${productInfo.itemId}`
                );
                if (favorite === true) {
                  btn_fov.classList.add("text-red-600");
                  deleteFavoriteItems(productInfo.itemId);
                } else {
                  btn_fov.classList.remove("text-gray-400");
                  addFavoriteItems(productInfo.itemId);
                  btn_fov.classList.add("text-red-600");
                }
                setSelectedProductId(productInfo.itemId);
              }}
            >
              <FaHeart />
            </span>
          </div>
          {/* <div className="group relative inline-block"> */}

          <h1
            className="text-sm text-gray-400 w-full h-16 overflow-hidden"
            onClick={() => {
              setSelectedProductId(productInfo.itemId);
              navigate.push(`/user/pages/productdetails/${productInfo.itemId}`);
            }}
            // title={describtion}
          >
            {describtion
              ? describtion.length <= 70
                ? describtion
                : describtion.slice(0, 70) + " ..."
              : ""}
          </h1>

          {/* <div className="absolute bottom-full left-0  
                  hidden group-hover:block 
                  bg-white text-gray-800 text-sm rounded-lg 
                  shadow-lg border border-gray-200
                  p-3 w-64
                  z-50">
{describtion}  </div> */}
          {/* </div> */}
        </div>

        <div className="flex w-full justify-between items-center   px-3">
          <div
            className="flex flex-col my-2"
            onClick={() => {
              setSelectedProductId(productInfo.itemId);
              navigate.push(`/user/pages/productdetails/${productInfo.itemId}`);
            }}
          >
            {productInfo.oldPrice ? (
              <div className="flex gap-2">
                <span className=" font-semibold line-through text-sm flex text-gray-400">
                  {productInfo.oldPrice} {t("currency")}
                </span>
              </div>
            ) : (
              <span className="p-[11px]"></span>
            )}
            <div className="flex items-center gap-2">
              <span className=" font-bold ">
                {productInfo.price} {t("currency")}
              </span>
              {productInfo.oldPrice ? (
                <span className=" font-semibold  text-center bg-green-600 text-sm p-1 text-white rounded-md">
                  {(
                    ((productInfo.oldPrice - productInfo.price) /
                      productInfo.oldPrice) *
                    100
                  ).toFixed(0)}
                  %
                </span>
              ) : (
                ""
              )}
            </div>
          </div>

          <button
            className="text-xl text-red-700 bg-red-50 p-2 mt-2  hover:bg-red-300 duration-500 hover:scale-110 rounded-md"
            onClick={() => {
              addToCart(productInfo.itemId);
            }}
          >
            <MdOutlineAddShoppingCart />
          </button>
        </div>
      </div>
    </div>
    // </div>
  );
}
