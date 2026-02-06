import { axiosInstance } from "./axios";

export async function getStreamToken() {
  console.log("getStreamToken: Fetching token from backend");
  try {
    const response = await axiosInstance.get("/chat/token");
    console.log("getStreamToken: Token received", !!response.data?.token);
    return response.data;
  } catch (error) {
    console.log("getStreamToken: Error fetching token", error);
    throw error;
  }
}
