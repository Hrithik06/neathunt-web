import type { ApiError } from "@/types/error";
import axios from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api`
    : "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// http.interceptors.response.use(
//   (response) => response,

//   (error) => {
//     let message = "Something went wrong. Try again later.";
//     let status = 0;

//     if (error.response) {
//       status = error.response.status;

//       // backend message (API)
//       message =
//         error.response.data?.message || error.response.data?.error || message;

//       // optional: handle specific cases
//       if (status === 401) {
//         message = "Session expired. Please login again.";
//         // window.location.href = "/";
//       } else if (status === 500) {
//         message = "Server error. Try again later.";
//       }
//     } else if (error.request) {
//       message = "Network error. Check your connection.";
//     } else {
//       message = error.message;
//     }

//     // 🔥 THIS IS THE KEY CHANGE
//     return Promise.reject<ApiError>({
//       message,
//       status,
//     });
//   },
// );
http.interceptors.response.use(
  (response) => response,

  (error) => {
    const apiError: ApiError = {
      message: "Something went wrong. Try again later.",
      status: error.response?.status ?? 0,

      errors: error.response?.data?.errors,
    };

    if (error.response) {
      apiError.message =
        error.response.data?.message ??
        error.response.data?.error ??
        apiError.message;

      if (apiError.status === 401) {
        apiError.message = "Session expired. Please login again.";
      }

      if (apiError.status === 500) {
        apiError.message = "Server error. Try again later.";
      }
    } else if (error.request) {
      apiError.message = "Network error. Check your connection.";
    } else {
      apiError.message = error.message;
    }

    return Promise.reject(apiError);
  },
);
