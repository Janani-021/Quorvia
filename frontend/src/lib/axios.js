import axios from "axios";

// Prefer env-provided backend URL; fallback to the old hardcoded value for local dev.
// Set VITE_BACKEND_URL in your frontend deployment (e.g. https://your-backend.onrender.com)
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api"
    : `${import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"}/api`;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
