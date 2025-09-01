// import { api } from "../utils/axiosInstance"; // ✅ adjust path as per folder

import { api } from "../../apiUtils/instance";

// Contact form submission function
export const sendContactMessage = async (formData) => {
  try {
    // const response = await api.post("/contact", formData);
    const response = await api.post("/contact", formData);

    return response.data;
  } catch (error) {
    console.error("Error sending contact form:", error);
    throw error.response?.data || { message: "Something went wrong" };
  }
};
