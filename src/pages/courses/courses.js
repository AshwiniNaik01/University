// import { api } from "../apiUtils/instance"; // adjust path if needed
import {api} from "../../apiUtils/instance";

// Fetch all courses
export const getAllCourses = async () => {
  try {
    const res = await api.get("/courses/all");
    if (res.data?.success && Array.isArray(res.data.data)) {
      return res.data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};


// ✅ Fetch a single course by ID
export const getCourseById = async (courseId) => {
  try {
    const res = await api.get(`/courses/${courseId}`);
    if (res.data?.success && res.data?.data) {
      return res.data.data;
    } else {
      throw new Error("Course not found or invalid response");
    }
  } catch (error) {
    console.error(`Error fetching course with ID ${courseId}:`, error);
    throw error;
  }
};