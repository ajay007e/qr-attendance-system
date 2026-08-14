import axios from "axios";
import { AppError } from "../errors/AppError";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    // No response = network problem
    if (!error.response) {
      throw new AppError("NETWORK", "Unable to connect to server.");
    }

    const status = error.response.status;

    const message = error.response.data?.message ?? "Something went wrong.";

    switch (status) {
      case 400:
      case 422:
        throw new AppError("VALIDATION", message, status, error.response.data?.details);

      case 401:
        throw new AppError("AUTH", message, status);

      case 403:
        throw new AppError("FORBIDDEN", message, status);

      case 404:
        throw new AppError("NOT_FOUND", message, status);

      case 500:
      case 502:
      case 503:
        throw new AppError("SERVER", "Server unavailable. Please try again later.", status);

      default:
        throw new AppError("UNKNOWN", message, status);
    }
  },
);

export default api;
