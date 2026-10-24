import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { reportApiFailure } from "./connectivityStore";

const showRequestError = (error) => {
  const responseData = error?.response?.data;

  // Try to collect all validation messages
  const messagesSet = new Set();
  
  // Check various possible error structures
  // 1. response.data.error.details (object with field -> message)
  if (responseData?.error?.details) {
    const details = responseData.error.details;
    if (typeof details === "object" && !Array.isArray(details)) {
      Object.values(details).forEach((msg) => {
        if (msg && typeof msg === "string") {
          messagesSet.add(msg);
        } else if (msg && typeof msg === "object") {
          // In case nested objects
          Object.values(msg).forEach((m) => {
            if (typeof m === "string") messagesSet.add(m);
          });
        }
      });
    } else if (Array.isArray(details)) {
      details.forEach((item) => {
        if (typeof item === "string") {
          messagesSet.add(item);
        } else if (item?.message) {
          messagesSet.add(item.message);
        } else if (item?.msg) {
          messagesSet.add(item.msg);
        }
      });
    }
  }
  
  // 2. response.data.details
  if (responseData?.details) {
    const details = responseData.details;
    if (typeof details === "object" && !Array.isArray(details)) {
      Object.values(details).forEach((msg) => {
        if (msg && typeof msg === "string") {
          messagesSet.add(msg);
        }
      });
    } else if (Array.isArray(details)) {
      details.forEach((item) => {
        if (typeof item === "string") {
          messagesSet.add(item);
        } else if (item?.message) {
          messagesSet.add(item.message);
        }
      });
    }
  }
  
  // 3. response.data itself might be validation errors object
  if (responseData && typeof responseData === "object" && !Array.isArray(responseData)) {
    // Check if it's directly field errors (not wrapped)
    if (responseData.error && typeof responseData.error === "object" && !responseData.error.message && responseData.error.details) {
      // Already handled above
    } else if (!responseData.error && !responseData.message && !responseData.data) {
      // Might be direct field errors
      const keys = Object.keys(responseData);
      // If keys look like field names and values are strings, treat as errors
      const hasFieldErrors = keys.some(k => typeof responseData[k] === "string" && !["status", "success", "code"].includes(k));
      if (hasFieldErrors && keys.length > 0) {
        keys.forEach((key) => {
          if (typeof responseData[key] === "string" && !["status", "success", "code", "timestamp"].includes(key)) {
            messagesSet.add(responseData[key]);
          }
        });
      }
    }
  }
  
  // 4. Also check error.response.data.error.message as fallback
  if (messagesSet.size === 0) {
    const message = responseData?.error?.message || responseData?.message || error?.message;
    if (message && typeof message === "string") {
      messagesSet.add(message);
    }
  }
  
  // Display all messages as separate toasts
  if (messagesSet.size > 0) {
    Array.from(messagesSet).forEach((msg) => {
      toast.error(msg);
    });
  } else {
    // Fallback
    toast.error(error?.message || "An error occurred");
  }
};

// const redirectToLogin = () => {
//   if (typeof window !== "undefined") {
//     window.location.href = "/signin";
//   }
// };

export const postRequest = async (endpoint, dataBody, message ,toster) => {
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
      if(toster) toast.success(response.data.message);

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

      const response = await request(token);
      toast.success(response.data.message);
      return response.data;

    }
  } catch (error) {
    reportApiFailure(error);

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
          showRequestError(error)

        }
      } catch (refreshError) {
        if (refreshError.response?.status === 500) {
          window.location.href = "/signin";

        }
      }
    }
    else {
      // toast.error(error.data.message);
      showRequestError(error)
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
    reportApiFailure(error);
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
          showRequestError(error)



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
    reportApiFailure(error);

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
          showRequestError(error)

        }


      } catch (refreshError) {
if (refreshError.response?.status === 500) {
            window.location.href = "/signin";

          }      }

    } else {
      showRequestError(error)
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
    reportApiFailure(error);
    const refreshToken = localStorage.getItem('refreshToken')
    // 🔥 refresh token handling
    if (error.response?.status === 403) {


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
          showRequestError(error)

        }

      } catch (refreshError) {
if (refreshError.response?.status === 500) {
            window.location.href = "/signin";

          }      }
    }
    else {
      // toast.error(error.data.message);
      showRequestError(error)
    }
    throw error;
  }
};
