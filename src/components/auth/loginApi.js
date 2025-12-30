import { api } from "../../apiUtils/instance";

// Send mobile OTP
export const sendOtp = async ({ mobileNo }) => {
  try {
    const res = await api.post("/otp/send", { mobileNo });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to send OTP" };
  }
};

// Send email OTP
export const sendEmailOtp = async ({ email }) => {
  try {
    const res = await api.post("/otp/otp-send", { email });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to send email OTP" };
  }
};

// Verify mobile OTP
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

// Verify email OTP
export const verifyEmailOtp = async (reference_id, otp) => {
  try {
    const res = await api.post("/otp/otp-verify", {
      reference_id,
      otp,
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to verify email OTP" };
  }
};
