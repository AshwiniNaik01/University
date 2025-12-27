import { api } from "../../apiUtils/instance";

// Send OTP
// export const sendOtp = async (mobileNo) => {
//   try {
//     const res = await api.post(`/otp/send`, { mobileNo, email });
//     return res.data;
//   } catch (error) {
//     throw error.response?.data || { message: "Failed to send OTP" };
//   }
// };

export const sendOtp = async ({ mobileNo, email }) => {
  try {
    const res = await api.post("/otp/send", {
      mobileNo,
      email,
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to send OTP" };
  }
};


// Verify OTP
export const verifyOtp = async (reference_id, otp) => {
  try {
    const res = await api.post(`/otp/verify`, {
      reference_id,
      otp,
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to verify OTP" };
  }
};
