import axios from "axios";
export const postRequest = async (endpoint, data) => {
  console.log(localStorage.getItem('accessToken'));

  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_BASE_URL+endpoint,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + localStorage.getItem('accessToken'),
        },
      },
      { data }
    );
    return await response.data;
  } catch (error) {
    console.error("POST request error:", error);
  }
};
