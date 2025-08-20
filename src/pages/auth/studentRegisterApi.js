import axios from "axios";
import { api } from "../../apiUtils/instance";

// const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"; // fallback

/**
 * Registers a candidate using basic student details
 * @param {Object} data - Candidate data
 * @returns {Promise<Object>} - API response
 */
export const registerCandidate = async (data) => {
  try {
    const response = await api.post(`/student/register`, data);
    return response.data;
  } catch (error) {
    throw error?.response?.data || { message: "Something went wrong" };
  }
};
