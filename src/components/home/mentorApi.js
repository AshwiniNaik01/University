import { api } from "../../apiUtils/instance";

// Fetch all mentors
export const getAllMentors = async () => {
  try {
    const res = await api.get("/trainer/all-profile");
    if (res.data?.success && Array.isArray(res.data.data)) {
        console.log(res.data.data);
      return res.data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching mentors:", error);
    throw error;
  }
};
