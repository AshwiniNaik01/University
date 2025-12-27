import { api } from "../../apiUtils/instance";
import { DIR } from "../../config";

/**
 * Fetches testimonials from the backend and maps them into the format expected by the frontend.
 */

export const fetchTestimonials = async () => {
  try {
    const res = await api.get("/feedback/all");
    const data = res.data.data;

    // Map the raw API data to the structure used in the component
    return data.map((item) => ({
      name: item.fullName,
      message: item.message.replace(/“|”/g, ""),
      company: item.collegeName,
      image: `${DIR.FEEDBACK_PROFILE}${item.profile}`,
      rating: item.rating,
    }));
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
};
