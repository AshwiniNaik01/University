// React and external library imports
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { Button } from "../../components/utility/Button";
import { Modal } from "../../components/utility/Modal";

// Utility imports for cookies and API
import { setCookie } from "../../apiUtils/cookieUtils";
import { sendOtp, verifyOtp } from "../../components/auth/loginApi";
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
            console.log("🧪 fetchBatches response:", batchesResponse);

            // if (batchesResponse.success && batchesResponse.data.length > 0) {
            //   setAvailableBatches(batchesResponse.data);
            //   console.log("Fetched batches:", batchesResponse.data);
            //   setStage("batch");
            // }

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

          // ✅ Close modal for specific batch error
          if (
            message.includes("No batches found") ||
            err?.response?.status === 404
          ) {
            toast.success("Enrolled successfully! Batches coming soon 🚀");
            setTimeout(() => handleClose(), 3000);
          }
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
              //       return (
              //         <div
              //           key={batch._id}
              //           onClick={() => {
              //             if (!isEnrolled) setSelectedBatchId(batch._id);
              //           }}
              //           // onClick={() => setSelectedBatchId(batch._id)}
              //           onMouseEnter={() => setHoveredBatch(batch._id)}
              //           onMouseLeave={() => setHoveredBatch(null)}
              //           // className={`relative cursor-pointer border-2 rounded-2xl p-6 transition-all duration-500 transform overflow-hidden group ${
              //           //   isSelected
              //           //     ? "border-purple-500 bg-gradient-to-br from-purple-100 to-blue-50 shadow-xl scale-105"
              //           //     : "border-gray-200 bg-white hover:border-purple-300 hover:shadow-lg hover:scale-[1.02]"
              //           // }`}

              //           className={`relative cursor-pointer border-2 rounded-2xl p-6 transition-all duration-500 transform overflow-hidden group
              // ${
              //   isSelected
              //     ? "border-purple-500 bg-gradient-to-br from-purple-100 to-blue-50 shadow-xl scale-105"
              //     : isEnrolled
              //     ? "opacity-50 pointer-events-none border-gray-300 bg-gray-100"
              //     : "border-gray-200 bg-white hover:border-purple-300 hover:shadow-lg hover:scale-[1.02]"
              // }`}
              //         >
              //           {/* Status badge */}
              //           <span
              //             className={`absolute top-4 right-4 px-3 py-1 text-xs font-bold rounded-full border transition ${
              //               batch.status === "Upcoming"
              //                 ? "bg-green-100 text-green-800 border-green-300"
              //                 : "bg-gray-100 text-gray-700 border-gray-300"
              //             }`}
              //           >
              //             {batch.status === "Upcoming" ? "🟢" : "🔘"} {batch.status}
              //           </span>

              //           {/* Batch name */}
              //           <h4 className="text-xl font-semibold mb-2 text-gray-900">
              //             {batch.batchName}
              //           </h4>

              //           {/* Notes */}
              //           {/* {batch.additionalNotes && (
              //           <p className="text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-lg p-2 mb-3">
              //             💡 {batch.additionalNotes}
              //           </p>
              //         )} */}

              //           {/* Time & mode */}
              //           <div className="flex items-center gap-2 text-gray-700 mb-3">
              //             <span className="text-lg">🕐</span>
              //             <p className="text-sm md:text-base font-medium text-gray-700">
              //               {batch.mode} | {batch.time.start} - {batch.time.end}
              //             </p>
              //           </div>

              //           {/* Start date */}
              //           <div className="flex items-center gap-3 text-gray-700">
              //             <span className="text-lg">🎯</span>
              //             <div>
              //               <p className="text-sm text-gray-500">Starts at</p>
              //               <p className="font-semibold text-gray-900">
              //                 {formatDate(batch.startDate)}
              //               </p>
              //             </div>
              //           </div>

              //           {/* Selection tick */}
              //           {isSelected && (
              //             <div className="absolute bottom-4 right-4 bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
              //               ✓
              //             </div>
              //           )}
              //         </div>
              //       );

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
                    <style jsx>{`
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
                  {/* {batch.days && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          📅 Class Days
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                          (day) => (
                            <div
                              key={day}
                              className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                                batch.days.includes(day)
                                  ? "bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-md scale-110"
                                  : "bg-gray-100 text-gray-400 scale-90"
                              }`}
                            >
                              {day[0]}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )} */}

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

                  {/* Additional Notes with Floating Animation */}
                  {/* {batch.additionalNotes && (
                    <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200/50 backdrop-blur-sm transform transition-all duration-500 group-hover:scale-105">
                      <p className="text-sm text-blue-700 font-medium flex items-center gap-2">
                        <span className="text-lg animate-bounce">💡</span>
                        {batch.additionalNotes}
                      </p>
                    </div>
                  )} */}

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

        {/* Continue Button */}
        <div className="text-center mt-10">
          <button
            disabled={!selectedBatchId}
            onClick={() => setStage("otp")}
            className={`px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform ${
              selectedBatchId
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:scale-105"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {selectedBatchId
              ? "Continue to OTP 🚀"
              : "Select a Batch to Continue"}
          </button>

          {selectedBatchId && (
            <p className="text-gray-500 mt-4 text-sm">
              You've selected a batch! Let's move to the next step.
            </p>
          )}
        </div>
      </div>
    );
  };

  // const BatchSelectionForm = () => (
  //   <div className="px-4 py-6">
  //     <h3 className="text-xl font-semibold mb-4">Select a Batch</h3>

  //     {availableBatches.length === 0 ? (
  //       <p className="text-gray-500">No batches available for this course.</p>
  //     ) : (
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //         {availableBatches.map((batch) => (
  //           <div
  //             key={batch._id}
  //             onClick={() => setSelectedBatchId(batch._id)}
  //             className={`cursor-pointer border rounded-md p-4 transition ${
  //               selectedBatchId === batch._id
  //                 ? "border-blue-500 bg-blue-50"
  //                 : "border-gray-200"
  //             }`}
  //           >
  //             <p className="font-medium text-lg">{batch.batchName}</p>
  //             <p className="text-sm text-gray-600 mb-1">
  //               {batch.additionalNotes || "No additional notes"}
  //             </p>
  //             <p className="text-sm text-gray-500">
  //               {batch.mode} | {batch.time.start} - {batch.time.end}
  //             </p>
  //           </div>
  //         ))}
  //       </div>
  //     )}

  //     <Button
  //       disabled={!selectedBatchId}
  //       onClick={() => setStage("otp")}
  //       className="mt-6"
  //     >
  //       Continue to OTP
  //     </Button>
  //   </div>
  // );
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
