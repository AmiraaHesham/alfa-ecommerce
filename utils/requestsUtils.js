import axios from "axios";

export const postRequest = async (endpoint, data) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  // const lang =
  //   typeof window !== "undefined" ? localStorage.getItem("lang") : null;
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_BASE_URL + endpoint,
      data,
      {
        headers: {
        //  " Content-Type": "multipart/form-data",
          Authorization: token ? `Bearer ${token}` : undefined,
          "Accept-Language": localStorage.getItem("lang"),
        },
      }
    );
    console.log(response);
    return await response.data;
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

export const putRequest = async (endpoint, data) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;


  try {
    const response = await axios.put(
      process.env.NEXT_PUBLIC_API_BASE_URL + endpoint,
      data,
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

export const deleteRequest = async (endpoint, data) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;


  try {
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
  } catch (error) {
    console.error("POST request error:", error);
    throw error;
  }
};
