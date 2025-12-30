import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaBookOpen,
  FaCertificate,
  FaChevronRight,
  FaClipboardCheck,
  FaTasks,
  FaUserPlus,
} from "react-icons/fa";

const MotionDiv = motion.div;

export default function CourseProcess() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: "Registration",
      description: "Create your student account and verify your details",
      icon: <FaUserPlus className="text-2xl" />,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      duration: "1-2 Days",
      details: [
        "Online registration form",
        "Email verification",
        "Profile setup",
      ],
    },
    {
      id: 2,
      title: "Course Enrollment",
      description: "Select your program and complete admission formalities",
      icon: <FaClipboardCheck className="text-2xl" />,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      duration: "1 Day",
      details: ["Select course", "Payment processing", "Document submission"],
    },
    {
      id: 3,
      title: "Course Access",
      description: "Get access to learning materials and faculty guidance",
      icon: <FaBookOpen className="text-2xl" />,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      duration: "Instant",
      details: ["LMS access", "Study materials", "Faculty assignment"],
    },
    {
      id: 4,
      title: "Learning Journey",
      description: "Attend classes, complete assignments, and participate",
      icon: <FaTasks className="text-2xl" />,
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      duration: "Course Duration",
      details: ["Live sessions", "Assignments", "Examinations"],
    },
    {
      id: 5,
      title: "Certificate Award",
      description: "Receive your university-recognized certificate",
      icon: <FaCertificate className="text-2xl" />,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      duration: "15 Days",
      details: ["Result declaration", "Digital certificate", "Verification"],
    },
  ];

  // Auto-rotate through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Your Journey to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Success
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A simple 5-step process from registration to certification. Follow
            our guided path to academic excellence at SGBAU.
          </p>
        </div>

        {/* Main Process Timeline */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-2 bg-gradient-to-r from-blue-200 via-purple-200 to-red-200 rounded-full hidden lg:block">
            <div
              className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 rounded-full transition-all duration-1000"
              style={{ width: `${(activeStep + 1) * 20}%` }}
            ></div>
          </div>

          {/* Mobile Connecting Dots */}
          <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 flex justify-between px-4 lg:hidden">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-gray-300 rounded-full relative"
              >
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-500 ${
                    i < activeStep ? "bg-blue-500 scale-125" : ""
                  }`}
                ></div>
              </div>
            ))}
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, index) => (
              <MotionDiv
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => setActiveStep(index)}
                className={`relative cursor-pointer ${step.bgColor} ${
                  step.borderColor
                } border-2 rounded-2xl p-6 transition-all duration-300 ${
                  activeStep === index
                    ? "ring-4 ring-opacity-30 ring-current transform scale-105 shadow-2xl"
                    : "shadow-lg hover:shadow-xl"
                }`}
              >
                {/* Step Number Badge */}
                <div
                  className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-r ${step.color} text-white font-bold text-lg flex items-center justify-center shadow-lg border-4 border-white`}
                >
                  {step.id}
                </div>

                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 mx-auto`}
                >
                  <div className="text-white">{step.icon}</div>
                </div>

                {/* Step Content */}
                <div className="text-center">
                  <h3
                    className={`text-xl font-bold mb-3 ${
                      activeStep === index ? "text-gray-900" : "text-gray-800"
                    }`}
                  >
                    {step.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {step.description}
                  </p>

                  {/* Details List */}
                  <div className="space-y-2 text-left">
                    {step.details.map((detail, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-current opacity-50"></div>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>

          {/* Step Navigation */}
          <div className="flex justify-center items-center gap-6 mt-12">
            <button
              onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
              className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-blue-500 hover:text-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={activeStep === 0}
            >
              <FaChevronRight className="rotate-180" />
              Previous Step
            </button>

            <div className="text-center">
              {/* <div className="text-sm text-gray-500 mb-1">Currently Viewing</div> */}
              <div className="text-2xl font-bold text-blue-700">
                Step {activeStep + 1}: {steps[activeStep]?.title}
              </div>
            </div>

            <button
              onClick={() =>
                setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))
              }
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={activeStep === steps.length - 1}
            >
              Next Step
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
