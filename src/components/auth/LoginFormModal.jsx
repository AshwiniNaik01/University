import { useState, useEffect } from "react";
import { Modal } from "../utility/Modal";
import { codedriftLogoImage } from "../../access-assets/images";
import { Button } from "../utility/Button";
import Image from "../utility/Image";
import { sendOtp, verifyOtp } from "./loginApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const LoginFormModal = ({ open, setOpen }) => {
  const [referenceId, setReferenceId] = useState(null);
  const [mode, setMode] = useState("default"); // default → input mobile, otp → enter otp
  const [loading, setLoading] = useState(false);

  // ✅ Clear fields when modal closes
  useEffect(() => {
    if (!open) {
      formik.resetForm();
      otpFormik.resetForm();
      setReferenceId(null);
      setMode("default");
      setLoading(false);
    }
  }, [open]);

  // Yup Schemas
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

  // Mobile Form
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
          toast.error(res.success || "Failed to send OTP");
        }
      } catch (err) {
        toast.error(err.message || "Failed to send OTP");
      } finally {
        setLoading(false);
      }
    },
  });

  // OTP Form
  const otpFormik = useFormik({
    initialValues: { otp: "" },
    validationSchema: otpSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await verifyOtp(referenceId, values.otp);
        if (res.success) {
          toast.success(res.message || "Login successful");
          setOpen(false); // close modal
        } else {
          toast.error(res.success || "Invalid OTP");
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

        {/* FORM START */}
        {mode === "default" && (
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Mobile Input */}
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

        {/* OTP FLOW */}
        {mode === "otp" && (
          <form onSubmit={otpFormik.handleSubmit} className="space-y-4">
            {/* Mobile (readonly) */}
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

            {/* OTP Actions */}
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
              {/* <Button
                type="button"
                variant="outline"
                size="md"
                className="w-full text-codedrift-indigo border-codedrift-indigo"
                onClick={() => {
                  setMode("default");
                  otpFormik.resetForm();
                }}
              >
                Resend OTP
              </Button> */}
            </div>
          </form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default LoginFormModal;
