// React and external library imports
import React, { useState, useEffect } from "react";
import { Modal } from "../../components/utility/Modal";
import { Button } from "../../components/utility/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

// Utility imports for cookies and API
import { setCookie } from "../../apiUtils/cookieUtils";
import { sendOtp, verifyOtp } from "../../components/auth/loginApi";
import { checkEnrollmentByMobile } from "./enrollment";
import { api } from "../../apiUtils/instance";
import { assignStudentToBatch, fetchBatches } from "./batches";

/**
 * Reusable Formik input component with error handling and styling.
 * Accepts common props and supports conditional disabling.
 */
const FormikInput = ({
  label,
  name,
  type = "text",
  placeholder = "",
  disabled = false,
  required = false,
}) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={name} className="text-sm font-medium text-gray-600">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <Field
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full px-4 py-2 border rounded-md transition 
        ${
          disabled
            ? "bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed"
            : "border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        }`}
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-xs mt-1"
    />
  </div>
);

// Form validation schemas using Yup
const mobileSchema = Yup.object({
  mobileNo: Yup.string()
    .matches(/^[0-9]{10}$/, "Must be 10 digits")
    .required("Mobile number is required"),
});

const fullFormSchema = Yup.object({
  fullName: Yup.string().required("Full name required"),
  email: Yup.string().email("Invalid email").required("Email required"),
});

const otpSchema = Yup.object({
  otp: Yup.string()
    .matches(/^[0-9]{6}$/, "OTP must be 6 digits")
    .required("OTP required"),
});

/**
 * Main Enroll Modal Component
 * Manages 3 stages: Mobile Input → Prefill/Registration → OTP Verification
 */
const EnrollFormModal = ({ open, setOpen, course }) => {
  const [stage, setStage] = useState("mobile"); // Track modal stage
  const [prefillData, setPrefillData] = useState(null); // Holds user info if available
  const [otpToastShown, setOtpToastShown] = useState(false); // Prevents duplicate OTP toasts
  const [availableBatches, setAvailableBatches] = useState([]);
  const [selectedBatchId, setSelectedBatchId] = useState(null);

  const steps = [
    { key: "mobile", label: "Mobile Number" },
    { key: "prefill", label: "Details" },
    { key: "batch", label: "Batch" },
    { key: "otp", label: "OTP" },
  ];

  /**
   * Reset component state when modal is closed.
   * This ensures clean state for next open.
   */
  useEffect(() => {
    if (!open) {
      setStage("mobile");
      setPrefillData(null);
      setOtpToastShown(false);
      setSelectedBatchId(null);
      setAvailableBatches([]);
    }
  }, [open]);

  // Helper function
  const getBaseUrl = () => {
    switch (import.meta.env.VITE_ENV) {
      case "development":
        return "http://localhost:6174";
      case "production":
        return "https://learning.codedrift.co";
      default:
        return window.location.origin;
    }
  };

  /**
   * Automatically triggers OTP sending when entering the 'otp' stage.
   * Uses a local flag to prevent duplicate OTP toasts/API calls.
   */
  useEffect(() => {
    const sendOtpOnOtpStage = async () => {
      if (stage === "otp" && prefillData?.mobileNo && !otpToastShown) {
        try {
          const response = await sendOtp(prefillData.mobileNo);
          if (response.success && response.data.reference_id) {
            setPrefillData((prev) => ({
              ...prev,
              reference_id: response.data.reference_id,
            }));
            toast.success("OTP sent to your mobile");
            setOtpToastShown(true); // Flag to avoid duplicate toasts
          } else {
            toast.error(response.message || "Failed to send OTP");
          }
        } catch (error) {
          toast.error(error.message || "Error sending OTP");
        }
      }
    };

    sendOtpOnOtpStage();
  }, [stage, prefillData?.mobileNo, otpToastShown]);

  /**
   * Handle modal close - trigger unmounting and cleanup
   */
  const handleClose = () => {
    setOpen(false);
  };

  /**
   * Step 1: Collect user mobile number
   * Calls `checkEnrollmentByMobile` to determine if user already exists
   */
  const MobileForm = () => (
    <Formik
      initialValues={{ mobileNo: "" }}
      validationSchema={mobileSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const res = await checkEnrollmentByMobile({
            mobileNo: values.mobileNo,
          });

          if (res.success) {
            // Existing student - proceed to OTP verification
            setPrefillData({ ...res.data.student, isExistingUser: true });
            setStage("prefill");
            toast.success("Student already enrolled. Please verify OTP.");
          } else {
            // New user - continue to full form
            setPrefillData({
              mobileNo: values.mobileNo,
              isExistingUser: false,
            });
            setStage("prefill");
          }
        } catch (err) {
          const message =
            err?.message ||
            err?.response?.data?.message ||
            "Error checking enrollment";

          toast.error(message);

          // In case of validation error from backend, fallback to registration
          if (
            message ===
              "All required fields must be filled for new enrollment." ||
            err?.statusCode === 400
          ) {
            setPrefillData({
              mobileNo: values.mobileNo,
              isExistingUser: false,
            });
            setStage("prefill");
          }
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <div className="flex justify-center items-center px-4">
          {/* <div className="w-full max-w-4xl  overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-2 md:p-10"> */}

          {/* Form Section */}
          <Form className="space-y-6 w-full">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Enter Your Mobile Number
            </h3>

            <p className="text-sm text-gray-500">
              We’ll send an OTP to verify your number and continue your
              enrollment.
            </p>

            <FormikInput
              label="Mobile Number"
              name="mobileNo"
              placeholder="e.g. 9876543210"
              required
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-6 py-2 text-white font-semibold rounded-md transition-all duration-300 disabled:opacity-50 mx-auto"
            >
              {isSubmitting ? "Checking..." : "Continue"}
            </Button>
          </Form>

          {/* Image Section */}
          <div className="hidden md:flex justify-center items-center relative">
            <div className="relative w-60 h-60 flex justify-center items-center">
              {/* Pulsing ring 1 */}
              <div className="absolute w-26 h-26 rounded-full bg-pink-400 opacity-30 animate-ping"></div>

              {/* Pulsing ring 2 */}
              <div className="absolute w-36 h-36 rounded-full bg-blue-400 opacity-20 animate-ping delay-200"></div>

              {/* Phone image with bounce animation */}
              <img
                src="https://static.vecteezy.com/system/resources/previews/011/157/544/non_2x/mobile-phone-cartoon-icon-illustration-technology-object-icon-concept-isolated-premium-flat-cartoon-style-vector.jpg"
                alt="Ringing mobile"
                className="w-40 h-40 object-contain rounded-full drop-shadow-lg"
              />
            </div>
          </div>
          {/* </div> */}
        </div>
      )}
    </Formik>
  );

  /**
   * Step 2: Prefill user data (existing) or collect it (new)
   * On submit, proceeds to OTP stage
   */
  const PrefillForm = () => (
    <Formik
      enableReinitialize
      initialValues={{
        fullName: prefillData.fullName || "",
        mobileNo: prefillData.mobileNo,
        email: prefillData.email || "",
      }}
      validationSchema={fullFormSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const payload = {
            fullName: values.fullName,
            mobileNo: values.mobileNo,
            email: values.email,
            enrolledCourses: [course?._id],
          };

          const res = await checkEnrollmentByMobile(payload);

          if (res.success) {
            // Save returned user info and proceed to OTP stage
            setPrefillData((prev) => ({
              ...prev,
              ...res.data,
              mobileNo: prev.mobileNo,
              isExistingUser: true,
            }));

            // Fetch batches and move to 'batch' stage
            const batchesResponse = await fetchBatches(course._id);
            if (batchesResponse.success) {
              setAvailableBatches(batchesResponse.data);
              console.log("Fetched batches:", batchesResponse.data);
              setStage("batch");
            } else {
              toast.error("No batches available");
            }
          }

          // setStage("otp");
          // } else {
          //   toast.error(res.message || "Enrollment failed");
          // }
        } catch (err) {
          const message =
            err?.response?.data?.message ||
            err?.message ||
            "Something went wrong during registration.";
          console.error("Registration Error:", err);
          toast.error(message);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6 px-2 py-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {prefillData.fullName
              ? "Verify Your Details"
              : "Complete Your Enrollment"}
          </h3>

          {/* Grid wrapper */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormikInput
              label="Full Name"
              name="fullName"
              className="w-75"
              required
              disabled={prefillData.isExistingUser}
            />

            <FormikInput
              label="Email"
              name="email"
              type="email"
              required
              disabled={prefillData.isExistingUser}
            />

            <FormikInput label="Mobile Number" name="mobileNo" disabled />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mx-auto px-6 py-2 text-white font-medium rounded-md transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? "Registering..." : "Register & Send OTP"}
          </Button>
        </Form>
      )}
    </Formik>
  );

  const BatchSelectionForm = () => (
    <div className="px-4 py-6">
      <h3 className="text-xl font-semibold mb-4">Select a Batch</h3>

      {availableBatches.length === 0 ? (
        <p className="text-gray-500">No batches available for this course.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableBatches.map((batch) => (
            <div
              key={batch._id}
              onClick={() => setSelectedBatchId(batch._id)}
              className={`cursor-pointer border rounded-md p-4 transition ${
                selectedBatchId === batch._id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              <p className="font-medium text-lg">{batch.batchName}</p>
              <p className="text-sm text-gray-600 mb-1">
                {batch.additionalNotes || "No additional notes"}
              </p>
              <p className="text-sm text-gray-500">
                {batch.mode} | {batch.time.start} - {batch.time.end}
              </p>
            </div>
          ))}
        </div>
      )}

      <Button
        disabled={!selectedBatchId}
        onClick={() => setStage("otp")}
        className="mt-6"
      >
        Continue to OTP
      </Button>
    </div>
  );

  /**
   * Step 3: OTP Verification Form
   * Uses `verifyOtp` API, then sets auth cookies and redirects user to dashboard
   */
  const OTPForm = () => (
    <Formik
      initialValues={{ otp: "" }}
      validationSchema={otpSchema}
      onSubmit={async (values, { setSubmitting }) => {
        console.log("🚀 Form submitted with values:", values);

        try {
          if (!prefillData?.reference_id) {
            console.error("❌ Missing reference ID");
            toast.error("Missing reference ID for OTP verification.");
            setSubmitting(false);
            return;
          }

          console.log("🔐 Verifying OTP...");
          const verifyRes = await verifyOtp(
            prefillData.reference_id,
            values.otp
          );
          console.log("✅ OTP verification response:", verifyRes);

          if (verifyRes.success && verifyRes.data) {
            const { studentId, mobileNo, fullName, email, token } =
              verifyRes.data;

            console.log("🎓 Student info received:", verifyRes.data);

            // Store user session info in cookies
            setCookie("studentId", studentId);
            setCookie("mobileNo", mobileNo);
            setCookie("fullName", fullName);
            setCookie("email", email);
            setCookie("token", token);

            toast.success("Login successful");
            console.log("📦 Fetching batches for course:", course._id);
            handleClose();

            // Step 2: Fetch batches
            const batchesResponse = await fetchBatches(course._id);
            console.log("📦 Batches response:", batchesResponse.data);

            if (batchesResponse.success && batchesResponse.data.length > 0) {
              const batchId = selectedBatchId;
              console.log("🧪 Selected batchId:", batchId);

              const assignPayload = {
                batchId: batchId,
                studentId: studentId,
              };
              console.log(
                "📤 Sending batch assignment payload:",
                assignPayload
              );

              try {
                const assignResponse = await assignStudentToBatch(
                  assignPayload
                );

                if (assignResponse.success) {
                  setCookie("batchId", batchId);
                  toast.success(
                    "Batch assigned successfully. Login successful!"
                  );

                  const baseUrl = getBaseUrl();
                  console.log("🔀 Redirecting to dashboard:", baseUrl);
                  setTimeout(() => {
                    window.location.href = `${baseUrl}/student/dashboard`;
                  }, 500);

                  setTimeout(() => {
                    console.log("🧼 Closing modal");
                    handleClose();
                  }, 1000);
                }
              } catch (err) {
                const message = err?.response?.data?.message;
                console.warn("⚠️ Batch assignment failed:", message);

                if (message === "Student already assigned to this batch") {
                  setCookie("batchId", batchId);
                  toast.success("Batch already assigned. Login successful!");

                  const baseUrl = getBaseUrl();
                  console.log("🔁 Redirecting (already assigned):", baseUrl);

                  setTimeout(() => {
                    window.location.href = `${baseUrl}/student/dashboard`;
                  }, 500);

                  setTimeout(() => {
                    console.log("🧼 Closing modal (already assigned)");
                    handleClose();
                  }, 1000);
                } else {
                  toast.error(message || "Failed to assign batch");
                }
              }
            } else {
              console.error("❌ No batches found for course.");
              toast.error("No batches available for this course");
            }
          } else {
            console.error("❌ OTP verification failed:", verifyRes.message);
            toast.error(verifyRes.message || "Invalid OTP");
          }
        } catch (err) {
          console.error("🔥 Exception in onSubmit:", err);
          toast.error(
            err?.response?.data?.message || "OTP verification failed"
          );
        } finally {
          console.log("✅ Done submitting.");
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <div className="flex justify-center items-center px-4">
          {/* <div className="w-full max-w-4xl  overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10"> */}

          {/* OTP Form Section */}
          <Form className="space-y-6 w-full">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              OTP Verification
            </h3>

            <p className="text-sm text-gray-600 mb-3">
              We've sent an OTP to{" "}
              <span className="font-medium text-blue-600">
                {prefillData.mobileNo}
              </span>
              . Please enter it below to verify your identity.
            </p>

            <FormikInput
              label="OTP"
              name="otp"
              placeholder="Enter 6-digit OTP"
              required
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-6 py-2 text-white font-semibold rounded-md transition-all duration-300 disabled:opacity-50 mx-auto"
            >
              {isSubmitting ? "Verifying..." : "Verify OTP"}
            </Button>
          </Form>

          {/* Image Section */}
          <div className="hidden md:flex justify-center items-center relative">
            <div className="relative w-60 h-60 flex justify-center items-center">
              {/* Pulse effect */}
              <div className="absolute w-24 h-24 rounded-full bg-pink-400 opacity-30 animate-ping"></div>
              <div className="absolute w-36 h-36 rounded-full bg-blue-400 opacity-20 animate-ping delay-200"></div>

              {/* OTP verification image */}
              <img
                src="https://ouch-prod-src-cdn.icons8.com/pz/illustration_preview_assets/1guJ-RyGRv69yOkD.png"
                alt="OTP verification"
                className="w-50 h-50 object-contain drop-shadow-lg"
              />
            </div>
          </div>
          {/* </div> */}
        </div>
      )}
    </Formik>
  );

  return (
    <Modal
      isOpen={open}
      onClose={handleClose}
      variant="xl"
      scrollableBody
      closeOnEsc={false}
    >
      <Modal.Header>Enroll for {course?.title || "Course"}</Modal.Header>

      <Modal.Body>
        {/* Step indicator breadcrumb */}
        <div className="flex items-center justify-center mb-4 space-x-4">
          {steps.map((step, index) => {
            const isActive = stage === step.key;
            const isCompleted = steps.findIndex((s) => s.key === stage) > index;

            return (
              <div key={step.key} className="flex items-center space-x-2">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold
              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : isCompleted
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }
            `}
                >
                  {index + 1}
                </div>
                <span
                  className={`text-sm font-medium ${
                    isActive
                      ? "text-blue-600"
                      : isCompleted
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div className="w-6 border-t border-gray-300"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Dynamic form rendering */}
        {stage === "mobile" && <MobileForm />}
        {stage === "prefill" && prefillData && <PrefillForm />}
        {/* {stage === "batch" && availableBatches.length > 0 && <BatchSelectionForm />} */}
        {stage === "batch" && <BatchSelectionForm />}
        {stage === "otp" && prefillData && <OTPForm />}
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleClose} variant="secondary">
          Cancel
        </Button>
      </Modal.Footer>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </Modal>
  );
};

export default EnrollFormModal;
