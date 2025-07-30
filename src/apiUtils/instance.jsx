import axios from "axios";

/**
 * Axios instance configured with default settings for API communication.
 *
 * @type {import('axios').AxiosInstance}
 *
 * @description
 * - Automatically sets base URL for all API requests.
 * - Adds common headers such as `Content-Type` and Authorization (if needed).
 * - Can be extended to include interceptors for error handling or auth tokens.
 */
const instance = axios.create({
    baseURL: process.env.VITE_APP_API_BASE_URL, // ✅ Replace with your actual base API URL
    timeout: 10000,                     // ✅ 10 seconds timeout
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Authorization: `Bearer ${token}`  // 🔐 Optional: dynamically add token via interceptor
    },
    withCredentials: true,              // ✅ Sends cookies if dealing with authentication
});

export { instance };
