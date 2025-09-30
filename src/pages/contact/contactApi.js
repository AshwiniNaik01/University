
import { api } from "../../apiUtils/instance";

// Contact form submission api
export const sendContactMessage = async (formData) => {
  try {
    const response = await api.post("/contact", formData);

    return response.data;
  } catch (error) {
    console.error("Error sending contact form:", error);
    throw error.response?.data || { message: "Please Try Again!" };
  }
};
