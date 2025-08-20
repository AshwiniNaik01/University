import axios from "axios";

/**
 * Axios instance configured with default settings for API communication.
 *
 * @type {import('axios').AxiosInstance}
 *
 * @description
 * - Automatically sets base URL for all API requests from .env
 * - Adds common headers such as `Content-Type` and Authorization (if needed).
 * - Can be extended with interceptors for error handling or auth tokens.
 */

const api = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_BASE_URL}/api`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

export { api };
