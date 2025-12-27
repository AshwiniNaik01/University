import { api } from "../../apiUtils/instance";


// Fetch Batches by id
export const fetchBatches = async (courseId) => {
  const batchesResponse = await api.get(`/batches/course/${courseId}`);
  return batchesResponse.data;
};

export const assignStudentToBatch = async (assignPayload) => {
  const response = await api.post('/batches/student-batche', assignPayload);
  return response.data; // Assuming your API returns data in `response.data`
};