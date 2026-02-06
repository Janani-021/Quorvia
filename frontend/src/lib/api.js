import { axiosInstance } from "./axios";

export async function getStreamToken() {
  console.log("getStreamToken: Fetching token from backend");
  try {
    const response = await axiosInstance.get("/chat/token");
    console.log("getStreamToken: Token received", !!response.data?.token, response.data);
    return response.data;
  } catch (error) {
    console.log("getStreamToken: Error fetching token", error.response?.data || error.message);
    throw error;
  }
}
