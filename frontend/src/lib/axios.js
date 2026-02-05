import axios from "axios";

// https://quorvia-backend-2oii6r0xk-jananis-projects-2e132d83.vercel.app/api
 const BASE_URL =
   import.meta.env.MODE === "development"
     ? "http://localhost:5000/api"
     : "https://quorvia-backend-2oii6r0xk-jananis-projects-2e132d83.vercel.app/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});