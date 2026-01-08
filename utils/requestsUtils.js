import axios from "axios";
import Swal from "sweetalert2";

export const postRequest = async (endpoint, dataBody, message) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  // const lang =
  //   typeof window !== "undefined" ? localStorage.getItem("lang") : null;
  try {
    
    if (message === "") {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_BASE_URL + endpoint,
        dataBody,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            "Accept-Language": localStorage.getItem("lang"),
          },
        }
      );
      console.log(response);
      return await response.data;
    } else {
     await Swal.fire({
        text: message,
        showCancelButton: true,
      }).then(async (data) => {
        if (data.isConfirmed) {
          const response = await axios.post(
            process.env.NEXT_PUBLIC_API_BASE_URL + endpoint,
            dataBody,
            {
              headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
                "Accept-Language": localStorage.getItem("lang"),
              },
            }
          );
          console.log(response);
          return await response.data;
        }
      });
    }
  } catch (error) {
    console.error("POST request error:", error);
    throw error;
  }
};

export const getRequest = async (endpoint) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_BASE_URL + endpoint,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined,
          "Accept-Language": localStorage.getItem("lang"),
        },
      }
    );
    console.log(response.data.data);
    return await response.data.data;
  } catch (error) {
    console.error("POST request error:", error);
    throw error;
  }
};

export const putRequest = async (endpoint, dataBody, message) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  try {
  await  Swal.fire({
      text: message,
      showCancelButton: true,
    }).then(async (data) => {
      if (data.isConfirmed) {
        const response = await axios.put(
          process.env.NEXT_PUBLIC_API_BASE_URL + endpoint,
          dataBody,
          {
            headers: {
              // "Content-Type": "multipart/form-data",
              Authorization: token ? `Bearer ${token}` : undefined,
              "Accept-Language": localStorage.getItem("lang"),
            },
          }
        );
        console.log(response);
        return await response.data;
      }
    });
  } catch (error) {
    console.error("POST request error:", error);
    throw error;
  }
};

// export const patchRequest = async (endpoint, data) => {
//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

//   try {
//     const response = await axios.patch(
//       process.env.NEXT_PUBLIC_API_BASE_URL + endpoint,
//       {
//         headers: {
//           // "Content-Type": "multipart/form-data",
//           Authorization: token ? `Bearer ${token}` : undefined,
//           "Accept-Language": localStorage.getItem("lang"),
//         },
//       }
//     );
//     console.log(response);
//     return await response.data;
//   } catch (error) {
//     console.error("POST request error:", error);
//     throw error;
//   }
// };

export const deleteRequest = async (endpoint, message) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  try {
   await Swal.error({
    title:localStorage.lang ==='en'? message +'Delete':message+"حذف",
      showCancelButton: true,
      confirmButtonText: localStorage.lang === "ar" ? "موافق" : "OK",
      cancelButtonText: localStorage.lang === "ar" ? "إلغاء" : "Cancel",
      customClass: {
      
    confirmButton: 'bg-blue-600 hover:  bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold',
    cancelButton: 'bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg'        
      },
     
      
    }).then(async (data) => {
      if (data.isConfirmed) {
        const response = await axios.delete(
          process.env.NEXT_PUBLIC_API_BASE_URL + endpoint,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : undefined,
              "Accept-Language": "ar",
            },
          }
        );
        console.log(response);
        return await response.data;
      }
    });
  } catch (error) {
    console.error("POST request error:", error);
    throw error;
  }
};
