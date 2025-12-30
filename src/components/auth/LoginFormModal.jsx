import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { codedriftLogoImage } from "../../access-assets/images";
import { setCookie } from "../../apiUtils/cookieUtils";
import { LMS_BASE_URL } from "../../config";
import { Button } from "../utility/Button";
import Image from "../utility/Image";
import { Modal } from "../utility/Modal";
import { sendOtp, verifyOtp } from "./loginApi";

/**
 * LoginFormModal Component
 *
 * Handles mobile-based OTP login with validation, API integration, and redirection.
 * Auth token and other session values are stored in cookies for session persistence.
 */
const LoginFormModal = ({ open, setOpen }) => {
  const [referenceId, setReferenceId] = useState(null);
  const [mode, setMode] = useState("default");
  const [loading, setLoading] = useState(false);

  //  Reset form states when modal is closed.
  useEffect(() => {
    if (!open) {
      formik.resetForm();
      otpFormik.resetForm();
      setReferenceId(null);
      setMode("default");
      setLoading(false);
    }
  }, [open]);

  // Yup Schemas for validation
  const mobileSchema = Yup.object({
    mobileNo: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
  });

  const otpSchema = Yup.object({
    otp: Yup.string()
      .matches(/^[0-9]{6}$/, "OTP must be 6 digits")
      .required("OTP is required"),
  });

  // Formik handler for mobile input and sending OTP.
  const formik = useFormik({
    initialValues: { mobileNo: "" },
    validationSchema: mobileSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await sendOtp(values.mobileNo);
        if (res.success) {
          setReferenceId(res.data.reference_id);
          setMode("otp");
          toast.success(res.message || "OTP sent successfully");
        } else {
          toast.error(res.message || "Failed to send OTP");
        }
      } catch (err) {
        toast.error(err.message || "Failed to send OTP");
      } finally {
        setLoading(false);
      }
    },
  });

  //  Formik handler for OTP verification and login.
  const otpFormik = useFormik({
    initialValues: { otp: "" },
    validationSchema: otpSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await verifyOtp(referenceId, values.otp);

        if (res.success && res.data) {
          // Destructure all required fields
          const { studentId, mobileNo, courseId, role, token } = res.data;

          // Set cookies for all fields
          setCookie("studentId", studentId);
          setCookie("mobileNo", mobileNo);
          setCookie("courseId", courseId);
          setCookie("role", role);
          setCookie("token", token); // ⚠️ Make sure this is secure if it's a JWT

          toast.success(res.message || "Login successful");
          setOpen(false);

          // Check env var - add this log:
          // console.log("VITE_ENV:", import.meta.env.VITE_ENV);
          // 🔁 Route user to dashboard depending on environment

          let baseUrl = LMS_BASE_URL;
          // let baseUrl = "";
          // switch (import.meta.env.VITE_ENV) {
          //   case "development":
          //     baseUrl = "http://localhost:6174";
          //     break;
          //   case "uat":
          //     baseUrl = "https://uat-lms.codedrift.co";
          //     break;
          //   case "production":
          //     baseUrl = "https://lms.codedrift.co";
          //     break;
          //   default:
          //     baseUrl = window.location.origin;
          // }

          // console.log("Redirecting to:", `${baseUrl}/student/dashboard`);

          // Delay to allow toast/modal transition before redirection
          setTimeout(() => {
            window.location.href = `${baseUrl}/student/dashboard`;
          }, 100);
        } else {
          toast.error(res.message || "Invalid OTP");
        }
      } catch (err) {
        toast.error(err.message || "Failed to verify OTP");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Modal
      isOpen={open}
      onClose={() => setOpen(false)}
      variant="sm"
      scrollableBody={false}
    >
      <Modal.Body>
        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold focus:outline-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image
            src={codedriftLogoImage}
            alt="CodeDrift Logo"
            className="w-16 h-16 rounded-full shadow-md"
          />
        </div>

        {/* Heading */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Login to CodeDrift
          </h2>
          <p className="text-sm text-gray-500">
            {mode === "default"
              ? "Enter your mobile number to receive an OTP"
              : "Enter the OTP sent to your number"}
          </p>
        </div>

        {/* === MOBILE FORM === */}
        {mode === "default" && (
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Mobile Number Input */}
            <div>
              <label className="block text-gray-700 text-sm mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="mobileNo"
                value={formik.values.mobileNo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter mobile number"
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  formik.touched.mobileNo && formik.errors.mobileNo
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-codedrift-pink outline-none`}
                maxLength={10}
              />
              {formik.touched.mobileNo && formik.errors.mobileNo && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.mobileNo}
                </p>
              )}
            </div>

            {/* Send OTP Button */}
            <Button
              type="submit"
              variant="pink"
              size="md"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </Button>
          </form>
        )}

        {/* === OTP FORM === */}
        {mode === "otp" && (
          <form onSubmit={otpFormik.handleSubmit} className="space-y-4">
            {/* Read-only Mobile Field */}
            <div>
              <label className="block text-gray-700 text-sm mb-1">Mobile</label>
              <input
                type="text"
                value={formik.values.mobileNo}
                readOnly
                className="w-full px-4 py-2.5 rounded-lg bg-gray-100 text-gray-500 border border-gray-200"
              />
            </div>

            {/* OTP Input */}
            <div>
              <label className="block text-gray-700 text-sm mb-1">
                OTP <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="otp"
                value={otpFormik.values.otp}
                onChange={otpFormik.handleChange}
                onBlur={otpFormik.handleBlur}
                placeholder="Enter OTP"
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  otpFormik.touched.otp && otpFormik.errors.otp
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-codedrift-pink outline-none`}
                maxLength={6}
              />
              {otpFormik.touched.otp && otpFormik.errors.otp && (
                <p className="text-red-500 text-xs mt-1">
                  {otpFormik.errors.otp}
                </p>
              )}
            </div>

            {/* Submit OTP Action Button */}
            <div className="space-y-2 pt-2">
              <Button
                type="submit"
                variant="pink"
                size="md"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Login with OTP"}
              </Button>
            </div>
          </form>
        )}
      </Modal.Body>

      {/* Modal Footer – Register CTA */}
      <Modal.Footer>
        <div className="w-full text-center text-sm">
          <span className="text-gray-600">New user?</span>{" "}
          <a
            href="/auth/register"
            className="text-codedrift-pink font-medium hover:underline"
          >
            Register here
          </a>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginFormModal;
