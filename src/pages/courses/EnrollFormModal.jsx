// React and external library imports
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import * as Yup from "yup";
import {
  sendEmailOtp,
  sendOtp,
  verifyEmailOtp,
  verifyOtp,
} from "../../components/auth/loginApi";
import { Button } from "../../components/utility/Button";
import { Modal } from "../../components/utility/Modal";
import { LMS_BASE_URL } from "../../config";
import { assignStudentToBatch, fetchBatches } from "./batches";
import { checkEnrollmentByMobile } from "./enrollment";

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

// Reusable component for password fields
const FormikPasswordField = ({ label, name, required = false }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative w-full flex flex-col gap-1">
      <label className="block text-sm font-medium text-gray-700" htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <Field
        id={name}
        name={name}
        type={show ? "text" : "password"}
        autoComplete="new-password"
        className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required={required}
      />

      <button
        type="button" // ✅ prevents form reset
        onClick={() => setShow((prev) => !prev)}
        className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
      >
        {show ? <FiEyeOff size={20} /> : <FiEye size={20} />}
      </button>
      {/* Error Message  */}
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-xs mt-1"
      />
    </div>
  );
};

// Form validation schemas using Yup
const mobileSchema = Yup.object({
  mobileNo: Yup.string()
    .matches(/^[0-9]{10}$/, "Must be 10 digits")
    .required("Mobile number is required"),
});

const fullFormSchema = Yup.object({
  fullName: Yup.string().required("Full name required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  isExistingUser: Yup.boolean(),

  password: Yup.string().when("isExistingUser", {
    is: false,
    then: (schema) => schema.required("Password is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  confirmPassword: Yup.string().when("isExistingUser", {
    is: false,
    then: (schema) =>
      schema
        .required("Confirm password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const dualOtpSchema = Yup.object({
  mobileOtp: Yup.string()
    .matches(/^[0-9]{6}$/, "Invalid mobile OTP")
    .required("Mobile OTP is required"),

  emailOtp: Yup.string()
    .matches(/^[0-9]{6}$/, "Invalid email OTP")
    .required("Email OTP is required"),
});

/**
 * Main Enroll Modal Component
 * Manages 3 stages: Mobile Input → Prefill/Registration → OTP Verification
 */
const EnrollFormModal = ({ open, setOpen, course }) => {
  const [stage, setStage] = useState("mobile"); // Track modal stage
  const [prefillData, setPrefillData] = useState(null); // Holds user info if available
  const [otpToastShown, setOtpToastShown] = useState(false); // Prevents duplicate OTP toasts
  const [otpRefs, setOtpRefs] = useState({
    mobile: null,
    email: null,
  });
  const [otpSent, setOtpSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpType, setOtpType] = useState("mobile");
  const [availableBatches, setAvailableBatches] = useState([]);
  const [selectedBatchId, setSelectedBatchId] = useState(null);

  // 🔐 HARD GUARD to stop repeated OTP sending
  const otpSentRef = useRef(false);

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
      setOtpRefs({ mobile: null, email: null });
      setOtpSent(false); // 🔥 RESET LOCK
      setSelectedBatchId(null);
      setAvailableBatches([]);
    }
  }, [open]);

  // Helper function
  // const getBaseUrl = () => {
  //   switch (import.meta.env.VITE_ENV) {
  //     case "development":
  //       return "http://localhost:6194";
  //     case "uat":
  //       return "https://uat-lms.codedrift.co";
  //     case "production":
  //       return "https://lms.codedrift.co";
  //     default:
  //       return window.location.origin;
  //   }
  // };

  const getBaseUrl = () => LMS_BASE_URL;

  useEffect(() => {
    console.log("🔁 OTP effect triggered");

    // Stop if not OTP stage, missing data, or already sent
    if (
      stage !== "otp" ||
      !prefillData?.mobileNo ||
      !prefillData?.email ||
      otpSent
    ) {
      console.log("⛔ Skipping OTP send", {
        stage,
        mobile: prefillData?.mobileNo,
        email: prefillData?.email,
        otpSent,
      });
      return;
    }

    const sendOtps = async () => {
      try {
        console.log("📱 Sending mobile OTP:", prefillData.mobileNo);
        const mobileRes = await sendOtp({ mobileNo: prefillData.mobileNo });

        console.log("📧 Sending email OTP:", prefillData.email);
        const emailRes = await sendEmailOtp({ email: prefillData.email });

        // Extract reference_id correctly
        setOtpRefs({
          mobile: mobileRes?.data?.reference_id,
          email: emailRes?.data?.reference_id,
        });

        setOtpSent(true); // lock to prevent auto-repeat
        toast.success("OTP sent to mobile and email");

        console.log("✅ OTP refs set:", {
          mobile: mobileRes?.data?.reference_id,
          email: emailRes?.data?.reference_id,
        });
      } catch (err) {
        console.error("❌ OTP sending failed:", err);

        const message =
          err?.message ||
          err?.response?.data?.message ||
          "Failed to send OTP. Check network or backend.";

        toast.error(message);
      }
    };

    sendOtps();
  }, [stage, prefillData?.mobileNo, prefillData?.email, otpSent]);

  const handleBack = () => {
    const order = ["mobile", "prefill", "batch", "otp"];
    const currentIndex = order.indexOf(stage);
    if (currentIndex > 0) {
      setStage(order[currentIndex - 1]);
    }
  };

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
        setIsSubmitting(true);
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
          setIsSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <div className="flex justify-center items-center px-4">
          {/* Form Section */}
          <Form id="mobileForm" className="space-y-6 w-full">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Enter Your Mobile Number
            </h3>

            <p className="text-sm text-gray-500">
              We’ll send an OTP to verify your number and continue your
              enrollment.
            </p>

            <div className="w-90">
              <FormikInput
                label="Mobile Number"
                name="mobileNo"
                placeholder="e.g. 9876543210"
                required
              />
            </div>
          </Form>

          {/* Image Section */}
          <div className="hidden md:flex justify-center items-center relative">
            <div className="relative w-60 h-60 flex justify-center items-center">
              {/* Pulsing ring 1 */}
              <div className="absolute w-26 h-26 rounded-full bg-yellow-900 opacity-30 animate-ping"></div>

              {/* Pulsing ring 2 */}
              <div className="absolute w-36 h-36 rounded-full bg-blue-900 opacity-20 animate-ping delay-200"></div>

              {/* Phone image with bounce animation */}
              <img
                src="https://thumbs.dreamstime.com/b/mobile-phone-chat-notification-message-yellow-background-vector-illustration-isolated-colored-smartphone-speech-bubble-191221592.jpg"
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
        password: "",
        confirmPassword: "",
        isExistingUser: prefillData.isExistingUser,
      }}
      validationSchema={fullFormSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setIsSubmitting(true);
        try {
          const payload = {
            fullName: values.fullName,
            mobileNo: values.mobileNo,
            email: values.email,
            password: values.password,
            enrolledCourses: [course?._id],
          };

          const res = await checkEnrollmentByMobile(payload);

          if (res.success) {
            setPrefillData({
              ...res.data,

              // ✅ force normalized fields
              mobileNo: values.mobileNo,
              email: res.data?.email || res.data?.student?.email,

              isExistingUser: true,
            });

            // Fetch batches and move to 'batch' stage
            const batchesResponse = await fetchBatches(course._id);
            console.log("🧪 fetchBatches response:", batchesResponse);

            if (batchesResponse.success && batchesResponse.data.length > 0) {
              const enrolledBatchIds =
                res?.data?.enrollment?.enrolledBatches || [];

              const filteredBatches = batchesResponse.data.map((batch) => ({
                ...batch,
                isEnrolled: enrolledBatchIds.includes(batch._id), // mark if already enrolled
              }));

              setAvailableBatches(filteredBatches);

              const totalBatches = filteredBatches.length;
              const enrolledBatchesOnly = filteredBatches.filter(
                (b) => b.isEnrolled
              ).length;

              if (enrolledBatchesOnly === totalBatches) {
                // Student is already enrolled in ALL batches of this course
                toast.info("You are already enrolled in this batch.");
                setTimeout(() => handleClose(), 3000);
              } else {
                setStage("batch"); // Continue to batch selection
              }
            } else {
              // Fallback check (just in case)
              toast.error("No batches available");
              setTimeout(() => handleClose(), 3000);
            }
          }
        } catch (err) {
          const message =
            err?.response?.data?.message ||
            err?.message ||
            "Something went wrong during registration.";
          console.error("Registration Error:", err);
          toast.error(message);

          // ✅ Close modal for specific batch error
          if (
            message.includes("No batches found") ||
            err?.response?.status === 404
          ) {
            toast.success("Enrolled successfully! Batches coming soon 🚀");
            setTimeout(() => handleClose(), 3000);
          }
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form id="prefillForm" className="space-y-6 px-2 py-4">
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

          <div>
            {!prefillData.isExistingUser && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormikPasswordField
                  label="Password"
                  name="password"
                  required
                />
                <FormikPasswordField
                  label="Confirm Password"
                  name="confirmPassword"
                  required
                />
              </div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );

  const BatchSelectionForm = () => {
    const [hoveredBatch, setHoveredBatch] = useState(null);

    const formatDate = (dateString) => {
      if (!dateString) return "TBA";

      // Convert from "DD-MM-YYYY" to "YYYY-MM-DD"
      const [day, month, year] = dateString.split("-");
      const isoFormatted = `${year}-${month}-${day}`;

      const date = new Date(isoFormatted);

      if (isNaN(date)) return "Invalid Date";

      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    };

    return (
      <div className="px-4 py-2">
        <h3 className="text-xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
          Select Your Batch
        </h3>

        {availableBatches.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">
            No batches available for this course.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableBatches.map((batch) => {
              // const isSelected = selectedBatchId === batch._id;

              const isSelected = selectedBatchId === batch._id;
              const isEnrolled = batch.isEnrolled;

              return (
                <div
                  key={batch._id}
                  onClick={() => {
                    if (!isEnrolled) setSelectedBatchId(batch._id);
                  }}
                  onMouseEnter={() => setHoveredBatch(batch._id)}
                  onMouseLeave={() => setHoveredBatch(null)}
                  className={`relative cursor-pointer border-2 rounded-3xl p-3 transition-all duration-700 transform overflow-hidden group perspective-1000
      ${
        isSelected
          ? "border-purple-500 bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 shadow-2xl scale-105"
          : isEnrolled
          ? "opacity-60 pointer-events-none border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200"
          : "border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:border-purple-400 hover:shadow-2xl hover:scale-[1.03]"
      }`}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* 3D Floating Elements */}
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-purple-200/30 rounded-full blur-xl group-hover:scale-150 transition-transform duration-1000"></div>
                  <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-blue-200/30 rounded-full blur-xl group-hover:scale-150 transition-transform duration-1000 delay-200"></div>

                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-50/50 to-transparent animate-pulse"></div>
                  </div>

                  {/* Status Badge with Animation */}

                  <div
                    className={`absolute top-4 right-4 z-20 ${
                      isSelected ? "scale-110" : "hover:scale-105"
                    } transition-all duration-500`}
                  >
                    <div className="relative flex items-center justify-center group">
                      {/* Animated Gradient Ring */}
                      <div
                        className={`absolute -inset-[4px] rounded-full blur-md opacity-40 animate-[spin_6s_linear_infinite] ${
                          batch.status === "Upcoming"
                            ? "bg-[conic-gradient(from_0deg,green_400,emerald_500,green_400)]"
                            : batch.status === "Ongoing"
                            ? "bg-[conic-gradient(from_0deg,yellow_400,amber_500,yellow_400)]"
                            : "bg-[conic-gradient(from_0deg,gray_400,gray_500,gray_400)]"
                        }`}
                      ></div>

                      {/* Badge Plate */}
                      <div
                        className={`relative z-10 px-5 py-2 rounded-full border-2 bg-white/10 backdrop-blur-md shadow-xl flex items-center gap-3 font-semibold text-sm tracking-wide transition-all duration-300 ${
                          batch.status === "Upcoming"
                            ? "border-emerald-300 text-emerald-200"
                            : batch.status === "Ongoing"
                            ? "border-amber-300 text-amber-200"
                            : "border-gray-300 text-gray-300"
                        }`}
                      >
                        {/* Flickering Dot */}
                        <div
                          className={`w-3 h-3 rounded-full shadow-inner animate-[flicker_2s_infinite] ${
                            batch.status === "Upcoming"
                              ? "bg-emerald-400"
                              : batch.status === "Ongoing"
                              ? "bg-amber-400"
                              : "bg-gray-400"
                          }`}
                          style={{
                            animationName: "flicker",
                            animationDuration: "2s",
                            animationIterationCount: "infinite",
                          }}
                        ></div>
                        <span className="uppercase tracking-widest text-black">
                          {batch.status}
                        </span>
                      </div>
                    </div>

                    {/* Inline Keyframes via <style> tag */}
                    <style>{`
                      @keyframes flicker {
                        0%,
                        100% {
                          opacity: 1;
                        }
                        45% {
                          opacity: 0.4;
                        }
                        55% {
                          opacity: 0.7;
                        }
                        65% {
                          opacity: 0.3;
                        }
                        75% {
                          opacity: 0.9;
                        }
                      }
                    `}</style>
                  </div>

                  {/* Batch Header with Icon */}
                  <div className="relative mb-4 transform transition-all duration-500 group-hover:translate-x-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`relative w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all duration-500 group-hover:scale-110 ${
                          isSelected
                            ? "bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg"
                            : "bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600"
                        }`}
                      >
                        {batch.mode === "Live Online" ? "🎥" : "🏢"}
                        {/* Icon glow */}
                        <div
                          className={`absolute inset-0 rounded-2xl blur-md opacity-30 ${
                            isSelected ? "bg-purple-400" : "bg-gray-400"
                          }`}
                        ></div>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-500">
                          {batch.batchName}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-1 bg-gradient-to-r from-orange-100 to-amber-100 text-amber-700 rounded-full border border-amber-200">
                            ⚡ {batch.mode}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Schedule Information */}
                  <div className="space-y-3 mb-4 relative">
                    {/* Time Slot */}
                    <div className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 group-hover:border-purple-200/50 transition-all duration-500 group-hover:translate-x-1">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center text-blue-600 text-lg">
                        🕐
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {batch.time.start} - {batch.time.end}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Daily Schedule
                        </p>
                      </div>
                    </div>

                    {/* Start Date */}
                    <div className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 group-hover:border-green-200/50 transition-all duration-500 group-hover:translate-x-1 delay-100">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center text-green-600 text-lg">
                        🎯
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {formatDate(batch.startDate)}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Batch Starts
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Days Indicator */}

                  {batch.days && batch.days.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          📅 Class Days
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {batch.days.map((day) => (
                          <div
                            key={day}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-md"
                          >
                            {day[0]}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute bottom-4 right-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-white text-lg shadow-2xl animate-pulse">
                          ✓
                        </div>
                        <div className="absolute inset-0 bg-purple-400 rounded-2xl blur-md animate-ping"></div>
                      </div>
                    </div>
                  )}

                  {/* Enrolled Overlay */}
                  {isEnrolled && (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 to-gray-700/10 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                      <div className="text-center p-4 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-300 shadow-lg">
                        <div className="text-2xl mb-2">🎉</div>
                        <p className="text-sm font-semibold text-gray-700">
                          Already Enrolled
                        </p>
                        <p className="text-xs text-gray-500">
                          You're in this batch!
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Hover Border Effect */}
                  <div
                    className={`absolute inset-0 rounded-3xl border-2 pointer-events-none transition-all duration-500 ${
                      isSelected
                        ? "border-purple-400/50"
                        : "border-transparent group-hover:border-purple-300/30"
                    }`}
                  ></div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <Modal
      isOpen={open}
      onClose={handleClose}
      variant="full"
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
        {stage === "batch" && availableBatches.length > 0 && (
          <BatchSelectionForm />
        )}
        {stage === "otp" && prefillData && (
          <OTPForm
            prefillData={prefillData}
            otpRefs={otpRefs}
            setOtpRefs={setOtpRefs}
            selectedBatchId={selectedBatchId}
            course={course}
            handleClose={handleClose}
            getBaseUrl={getBaseUrl}
            setIsSubmitting={setIsSubmitting}
          />
        )}
      </Modal.Body>

      <Modal.Footer className="relative border-t pt-4 flex items-center w-full">
        {/* BACK BUTTON – pinned to left */}
        {stage !== "mobile" && (
          <Button
            variant="secondary"
            onClick={handleBack}
            className="absolute left-34 flex items-center gap-2"
            disabled={isSubmitting}
          >
            ⬅ Back
          </Button>
        )}

        {/* RIGHT SIDE – ACTIONS */}
        <div className="ml-auto flex gap-3">
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>

          {stage === "mobile" && (
            <Button
              form="mobileForm"
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center gap-2 rounded-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Next"}
            </Button>
          )}

          {stage === "prefill" && (
            <Button
              form="prefillForm"
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center gap-2 rounded-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Next"}
            </Button>
          )}

          {stage === "batch" && (
            <Button
              disabled={!selectedBatchId || isSubmitting}
              onClick={() => setStage("otp")}
              className={`flex items-center justify-center gap-2 rounded-lg ${
                selectedBatchId
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Processing..." : "Continue to OTP 🚀"}
            </Button>
          )}

          {stage === "otp" && (
            <Button
              form="otpForm"
              type="submit"
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white flex items-center justify-center gap-2 rounded-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Verifying..." : "Verify & Finish ✅"}
            </Button>
          )}
        </div>
      </Modal.Footer>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </Modal>
  );
};

const OTPForm = ({
  prefillData,
  otpRefs,
  setOtpRefs,
  selectedBatchId,
  course,
  handleClose,
  getBaseUrl,
  setIsSubmitting,
}) => {
  return (
    <Formik
      initialValues={{
        mobileOtp: "",
        emailOtp: "",
      }}
      enableReinitialize={false} // ✅ DO NOT RESET
      validationSchema={dualOtpSchema}
      onSubmit={async (values) => {
        setIsSubmitting(true);

        try {
          // 🔐 VERIFY MOBILE OTP
          const mobileVerify = await verifyOtp(
            otpRefs.mobile,
            values.mobileOtp
          );

          // 🔐 VERIFY EMAIL OTP
          const emailVerify = await verifyEmailOtp(
            otpRefs.email,
            values.emailOtp
          );

          if (!mobileVerify.success || !emailVerify.success) {
            toast.error("Both OTPs must be verified");
            return;
          }

          // 🎯 ASSIGN BATCH
          const batchesResponse = await fetchBatches(course._id);

          if (!batchesResponse.success) {
            toast.error("No batches available");
            return;
          }

          await assignStudentToBatch({
            batchId: selectedBatchId,
            studentId: prefillData.student._id,
          });

          toast.success("Enrollment completed successfully 🎉");

          Swal.fire({
            icon: "success",
            title: "Enrollment Successful 🎉",
            text: "Registration completed successfully.",
            showCancelButton: true,
            confirmButtonText: "Continue",
            cancelButtonText: "Login to LMS",
          }).then((result) => {
            handleClose();
            if (!result.isConfirmed) {
              window.location.href = `${getBaseUrl()}/student-login`;
            }
          });
        } catch (err) {
          console.error(err);
          toast.error("OTP verification failed");
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
      {({ setFieldValue }) => (
        <Form id="otpForm" className="w-full max-w-full mx-auto space-y-8">
          {/* HEADER */}
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-800 tracking-wide">
              🔒 OTP Verification
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Enter the OTPs sent to your mobile and email
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* 📱 MOBILE OTP */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between mb-3">
                <label className="font-semibold text-gray-700 flex items-center gap-2">
                  📱 Mobile OTP
                </label>
                <span className="text-xs text-gray-500">
                  {prefillData.mobileNo}
                </span>
              </div>

              <Field
                name="mobileOtp"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400 transition-all duration-200"
                placeholder="Enter mobile OTP"
              />

              <ErrorMessage
                name="mobileOtp"
                component="div"
                className="text-red-500 text-xs mt-2"
              />

              <button
                type="button"
                className="text-blue-600 mt-3 text-sm font-medium underline hover:text-blue-800 transition-colors"
                onClick={async () => {
                  try {
                    const res = await sendOtp({
                      mobileNo: prefillData.mobileNo,
                    });
                    setOtpRefs((prev) => ({
                      ...prev,
                      mobile: res.data.reference_id,
                    }));
                    setFieldValue("mobileOtp", "");
                    toast.success("Mobile OTP resent");
                  } catch {
                    toast.error("Failed to resend mobile OTP");
                  }
                }}
              >
                Resend Mobile OTP
              </button>
            </div>

            {/* 📧 EMAIL OTP */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 border rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between mb-3">
                <label className="font-semibold text-gray-700 flex items-center gap-2">
                  📧 Email OTP
                </label>
                <span className="text-xs text-gray-500">
                  {prefillData.email}
                </span>
              </div>

              <Field
                name="emailOtp"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none placeholder-gray-400 transition-all duration-200"
                placeholder="Enter email OTP"
              />

              <ErrorMessage
                name="emailOtp"
                component="div"
                className="text-red-500 text-xs mt-2"
              />

              <button
                type="button"
                className="text-green-600 mt-3 text-sm font-medium underline hover:text-green-800 transition-colors"
                onClick={async () => {
                  try {
                    const res = await sendEmailOtp({
                      email: prefillData.email,
                    });
                    setOtpRefs((prev) => ({
                      ...prev,
                      email: res.data.reference_id,
                    }));
                    setFieldValue("emailOtp", "");
                    toast.success("Email OTP resent");
                  } catch {
                    toast.error("Failed to resend email OTP");
                  }
                }}
              >
                Resend Email OTP
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EnrollFormModal;
