import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

// const redirectToLogin = () => {
//   if (typeof window !== "undefined") {
//     window.location.href = "/signin";
//   }
// };

export const postRequest = async (endpoint, dataBody, message) => {
  const getToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const lang =
    typeof window !== "undefined" ? localStorage.getItem("lang") : null;
  const request = async (token) => {


    return axios.post(
      process.env.NEXT_PUBLIC_API_BASE_URL + endpoint,
      dataBody,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          "Accept-Language": lang,
        },
      }
    )
  }


  try {
    // 🟢 بدون confirm
    if (message === "") {
      const token = getToken();

      const response = await request(token)
      toast.success(response.data.message);
      return response.data;



    }

    // 🟡 مع confirm
    const result = await Swal.fire({
      icon: "question",
      title: message,
      showCancelButton: true,
      confirmButtonText: lang === "ar" ? "نعم" : "OK",
      cancelButtonText: lang === "ar" ? "إلغاء" : "Cancel",
      customClass: {
        popup: "rounded-xl shadow-lg border border-gray-200 p-6",
        title: "text-xl font-bold text-gray-800 mb-2",
        content: "text-sm text-gray-600 mb-4",
        confirmButton:
          "bg-red-600 hover:bg-red-500 text-white font-medium px-6 py-2 rounded-lg",
        cancelButton:
          "bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-6 py-2 rounded-lg ml-2",
      },
      reverseButtons: lang === "ar",
    });

    if (result.isConfirmed) {

      const token = getToken();
      console.log(token)

      const response = await request(token);
      toast.success(response.data.message);
      return response.data;

    }
  } catch (error) {


    // 🔥 refresh token handling
    if (error.response?.status === 403) {
      const refreshToken = localStorage.getItem('refreshToken')

      try {
        const refreshRes = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/refresh`, {},
          {
            headers: {
              Authorization: refreshToken ? `Bearer ${refreshToken}` : undefined,
            },
          });

        const newAccessToken = refreshRes.data.accessToken;
        const newRefreshToken = refreshRes.data.refreshToken;

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // 🔁 إعادة الطلب بعد التحديث
        try {
          const retryResponse = await request(newAccessToken);

          toast.success(retryResponse.data.message);

          return retryResponse.data;
        } catch (error) {
          toast.error(error.response.data.error.message)

        }
      } catch (refreshError) {
        if (refreshError.response?.status === 500) {
          window.location.href = "/signin";

        }
      }
    }
    else {
      // toast.error(error.data.message);
      toast.error(error.response.data.error.message)
    }

    throw error;
  }

}
export const getRequest = async (endpoint) => {
  const getToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const lang =
    typeof window !== "undefined" ? localStorage.getItem("lang") : null;
  const request = async (token) => {
    return axios.get(
      process.env.NEXT_PUBLIC_API_BASE_URL + endpoint,

      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          "Accept-Language": lang,
        },
      },
    );
  }
  try {
    const token = getToken();
    const response = await request(token);
    return response.data;
  } catch (error) {
    // 🔥 refresh token handling
    if (error.response?.status === 403) {
      const refreshToken = localStorage.getItem('refreshToken')

      try {
        const refreshRes = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/refresh`, {},
          {
            headers: {
              Authorization: refreshToken ? `Bearer ${refreshToken}` : undefined,
            },
          });

        const newAccessToken = refreshRes.data.accessToken;
        const newRefreshToken = refreshRes.data.refreshToken;

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // 🔁 إعادة الطلب بعد التحديث
        try {
          const retryResponse = await request(newAccessToken);

          toast.success(retryResponse.data.message);

          return retryResponse.data;
        } catch (error) {
          toast.error(error.response.data.error.message)



        }

      } catch (refreshError) {
        if (refreshError.response?.status === 500) {
          window.location.href = "/signin";

        }
      }
    }
    throw error;
  }
};

export const putRequest = async (endpoint, dataBody, message) => {
  const getToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const lang =
    typeof window !== "undefined" ? localStorage.getItem("lang") : null;
  const request = async (token) => {
    return await axios.put(
      process.env.NEXT_PUBLIC_API_BASE_URL + endpoint,
      dataBody,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          "Accept-Language": lang,
        },
      },
    );
  }
  try {
    const result = await Swal.fire({
      icon: "info",
      title: message,
      showCancelButton: true,
      confirmButtonText: lang === "ar" ? "نعم" : "OK",
      cancelButtonText: lang === "ar" ? "إلغاء" : "Cancel",
      customClass: {
        popup: "rounded-xl shadow-lg border border-gray-200 p-6",
        title: "text-xl font-bold text-gray-800 mb-2",
        content: "text-sm text-gray-600 mb-4",
        confirmButton:
          "bg-red-600 hover:bg-red-500 text-white font-medium px-6 py-2 rounded-lg",
        cancelButton:
          "bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-6 py-2 rounded-lg ml-2",
      },
      reverseButtons: lang === "ar",
    });

    if (result.isConfirmed) {
      const token = getToken();
      const response = await request(token);
      toast.success(response.data.message);
      return response.data;
    }
  } catch (error) {
    // 🔥 refresh token handling

    if (error.response.status === 403) {
      const refreshToken = localStorage.getItem('refreshToken')

      try {
        const refreshRes = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/refresh`, {},
          {
            headers: {
              Authorization: refreshToken ? `Bearer ${refreshToken}` : undefined,
            },
          });

        const newAccessToken = refreshRes.data.accessToken;
        const newRefreshToken = refreshRes.data.refreshToken;

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // 🔁 إعادة الطلب بعد التحديث
        try {
          const retryResponse = await request(newAccessToken);

          toast.success(retryResponse.data.message);

          return retryResponse.data;
        } catch (error) {
          toast.error(error.response.data.error.message)

        }


      } catch (refreshError) {
if (refreshError.response?.status === 500) {
            window.location.href = "/signin";

          }      }

    } else {
      toast.error(error.response.data.error.message)
    }

    throw error;
  }
};

export const deleteRequest = async (endpoint, message) => {
  const getToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const lang =
    typeof window !== "undefined" ? localStorage.getItem("lang") : null;
  const request = async (token) => {
    return await axios.delete(
      process.env.NEXT_PUBLIC_API_BASE_URL + endpoint,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined,
          "Accept-Language": lang,
        },
      })
  }
  try {
    // 🟡 نستخدم Swal.fire مع icon: 'warning' (مش error)
    const result = await Swal.fire({
      icon: "warning",
      title: message,
      showCancelButton: true,
      confirmButtonText: lang === "ar" ? "نعم" : "OK",
      cancelButtonText: lang === "ar" ? "إلغاء" : "Cancel",
      customClass: {
        popup: "rounded-xl shadow-lg border border-gray-200 p-6",
        title: "text-xl font-bold text-gray-800 mb-2",
        content: "text-sm text-gray-600 mb-4",
        confirmButton:
          "bg-red-600 hover:bg-red-500 text-white font-medium px-6 py-2 rounded-lg",
        cancelButton:
          "bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-6 py-2 rounded-lg ml-2",
      },
      reverseButtons: lang === "ar",
    });

    if (result.isConfirmed) {
      const token = getToken();
      const response = await request(token);
      toast.success(response.data.message);
      return response.data;
    }
  } catch (error) {
    const refreshToken = localStorage.getItem('refreshToken')
    // 🔥 refresh token handling
    if (error.response.status === 403) {


      try {
        console.log(refreshToken)
        const refreshRes = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/refresh`, {},
          {
            headers: {
              Authorization: refreshToken ? `Bearer ${refreshToken}` : undefined,
            },
          });

        const newAccessToken = refreshRes.data.accessToken;
        const newRefreshToken = refreshRes.data.refreshToken;

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // 🔁 إعادة الطلب بعد التحديث
        try {
          const retryResponse = await request(newAccessToken);

          toast.success(retryResponse.data.message);

          return retryResponse.data;
        } catch (error) {
          toast.error(error.response.data.error.message)

        }

      } catch (refreshError) {
if (refreshError.response?.status === 500) {
            window.location.href = "/signin";

          }      }
    }
    else {
      // toast.error(error.data.message);
      toast.error(error.response.data.error.message)
    }
    throw error;
  }
};
