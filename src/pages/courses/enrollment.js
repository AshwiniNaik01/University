// src/api/enrollmentApi.js

import { api } from "../../apiUtils/instance";

/**
 *  Check if mobile number is already enrolled.
 * Used to determine whether the student is new or existing.

 */
export const checkEnrollmentByMobile = async (payload) => {
  try {
    const response = await api.post("/enrollments/enroll", payload); // just { mobileNo }
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to check enrollment",
      }
    );
  }
};


