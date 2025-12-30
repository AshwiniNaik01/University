import { api } from "../../apiUtils/instance";

//  Registers a candidate using basic student details

export const registerCandidate = async (data) => {
  try {
    const response = await api.post(`/student/register`, data);
    return response.data;
  } catch (error) {
    throw error?.response?.data || { message: "Please Try Again!" };
  }
};
