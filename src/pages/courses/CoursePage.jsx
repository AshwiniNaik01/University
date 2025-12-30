import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBook,
  FaCertificate,
  FaChalkboardTeacher,
  FaCheck,
  FaCheckCircle,
  FaChevronDown,
  FaClock,
  FaGraduationCap,
  FaStar,
  FaUsers,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import EnrollStrip from "../../components/courses/EnrollStrip";
import { DIR } from "../../config";
import { getCourseById } from "./courses";
import EnrollFormModal from "./EnrollFormModal";

const MotionDiv = motion.div;
const MotionLink = motion(Link);

export default function CoursePage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [showEnrollStrip, setShowEnrollStrip] = useState(true);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [expandedPhases, setExpandedPhases] = useState([]);
  const [expandedWeeks, setExpandedWeeks] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const introRef = useRef(null);

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(courseId);

        // Process course data for display
        const keyFeaturesHTML =
          data.keyFeatures
            ?.map(
              (feature) => `
          <div class="mb-4">
            <h4 class="font-bold text-lg text-blue-700 mb-1">${
              feature.title
            }</h4>
            <p class="text-gray-700 mb-2">${feature.description || ""}</p>
            ${
              feature.subPoints?.length
                ? `
              <ul class="list-disc pl-5 space-y-1">
                ${feature.subPoints
                  .map((point) => `<li class="text-gray-600">${point}</li>`)
                  .join("")}
              </ul>
            `
                : ""
            }
          </div>
        `
            )
            .join("") || "";

        const benefitsHTML =
          data.benefits
            ?.map(
              (benefit) => `
          <li class="flex items-start gap-3 mb-3">
            <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span class="text-green-600 text-sm">✓</span>
            </div>
            <span class="text-gray-700">${benefit}</span>
          </li>
        `
            )
            .join("") || "";

        const courseInfoHTML = `
          <div class="space-y-6">
            <div>
              <h2 class="text-3xl font-bold text-blue-900 mb-4">Course Overview</h2>
              <p class="text-gray-700 leading-relaxed text-lg">${
                data.overview || ""
              }</p>
            </div>

            ${
              data.keyFeatures?.length
                ? `
              <div class="bg-blue-50 rounded-xl p-6">
                <h3 class="text-2xl font-bold text-blue-800 mb-4">Key Features</h3>
                ${keyFeaturesHTML}
              </div>
            `
                : ""
            }

            ${
              data.benefits?.length
                ? `
              <div>
                <h3 class="text-2xl font-bold text-blue-800 mb-4">What You'll Gain</h3>
                <ul class="space-y-2">
                  ${benefitsHTML}
                </ul>
              </div>
            `
                : ""
            }
          </div>
        `;

        setCourse({
          ...data,
          name: data.title,
          course_info_html: courseInfoHTML,
        });
      } catch (err) {
        console.error("Error loading course:", err);
        setCourse(null);
      }
    };

    if (courseId) fetchCourse();
  }, [courseId]);

  // Toggle phase expansion
  const togglePhase = (index) => {
    setExpandedPhases((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Toggle week expansion
  const toggleWeek = (phaseIndex, weekIndex) => {
    const key = `${phaseIndex}-${weekIndex}`;
    setExpandedWeeks((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-700">
            Loading Course...
          </h2>
          <Link
            to="/courses"
            className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-300"
          >
            <FaArrowLeft /> Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-8xl mx-auto px-4 lg:px-8 py-6 lg:py-6">
          {/* Navigation */}
          <div className="mb-8">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors duration-300"
            >
              <FaArrowLeft /> Back to All Courses
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Course Info */}
            <div className="space-y-8">
              {/* Title */}
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                {course.title}
              </h1>

              {/* Description */}
              <p className="text-xl text-blue-100 leading-relaxed">
                {course.description ||
                  "Master the skills that industry demands with our comprehensive university program."}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                  icon={<FaClock className="text-blue-400" />}
                  value={course.duration || "12 Weeks"}
                  label="Duration"
                />
                <StatCard
                  icon={<FaCertificate className="text-green-400" />}
                  value="Certificate"
                  label="Included"
                />
                <StatCard
                  icon={<FaUsers className="text-yellow-400" />}
                  value={`${course.enrolledCount || 0}+`}
                  label="Enrolled"
                />
                <StatCard
                  icon={<FaStar className="text-purple-400" />}
                  value={course.rating || "4.8"}
                  label="Rating"
                />
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={() => setIsEnrollModalOpen(true)}
                  className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  Enroll Now <FaArrowRight />
                </button>
              </div>
            </div>

            {/* Course Image */}
            <div className="relative">
              <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt={course.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full animate-pulse"></div>
                    <span className="text-yellow-300 text-sm font-bold">
                      UNIVERSITY PROGRAM
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {course.title}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        {/* Tabs Navigation */}
        <div className="flex flex-wrap gap-4 mb-12">
          {[
            { id: "overview", label: "Course Overview", icon: <FaBook /> },
            {
              id: "curriculum",
              label: "Curriculum",
              icon: <FaGraduationCap />,
            },
            {
              id: "trainers",
              label: "Trainers",
              icon: <FaChalkboardTeacher />,
            },
            {
              id: "outcomes",
              label: "Learning Outcomes",
              icon: <FaCheckCircle />,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div
                dangerouslySetInnerHTML={{ __html: course.course_info_html }}
              />
            </div>
          )}

          {/* Curriculum Tab */}
          {activeTab === "curriculum" && course.phases?.length > 0 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-blue-900 mb-4">
                  Course Curriculum
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Structured learning path designed by industry experts and
                  university faculty
                </p>
              </div>

              <div className="space-y-6">
                {course.phases.map((phase, phaseIndex) => (
                  <div
                    key={phase._id}
                    className="border-2 border-blue-100 rounded-xl overflow-hidden"
                  >
                    {/* Phase Header */}
                    <button
                      onClick={() => togglePhase(phaseIndex)}
                      className="w-full flex justify-between items-center p-6 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                          {phaseIndex + 1}
                        </div>
                        <div className="text-left">
                          <h3 className="text-xl font-bold text-gray-900">
                            {phase.title}
                          </h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <FaClock /> {phase.weeks?.length || 0} weeks
                            </span>
                            <span className="flex items-center gap-1">
                              <FaBook />{" "}
                              {phase.weeks?.reduce(
                                (total, week) =>
                                  total + (week.chapters?.length || 0),
                                0
                              )}{" "}
                              topics
                            </span>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`transform transition-transform duration-300 ${
                          expandedPhases.includes(phaseIndex)
                            ? "rotate-180"
                            : ""
                        }`}
                      >
                        <FaChevronDown className="text-blue-600 text-xl" />
                      </div>
                    </button>

                    {/* Weeks Content */}
                    {expandedPhases.includes(phaseIndex) && (
                      <div className="p-6 bg-white space-y-4">
                        {phase.weeks?.map((week, weekIndex) => (
                          <div
                            key={week._id}
                            className="border border-gray-200 rounded-lg overflow-hidden"
                          >
                            <button
                              onClick={() => toggleWeek(phaseIndex, weekIndex)}
                              className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <span className="font-bold text-blue-700">
                                    W{weekIndex + 1}
                                  </span>
                                </div>
                                <h4 className="font-semibold text-gray-800">
                                  {week.title}
                                </h4>
                              </div>
                              <div
                                className={`transform transition-transform duration-300 ${
                                  expandedWeeks.includes(
                                    `${phaseIndex}-${weekIndex}`
                                  )
                                    ? "rotate-180"
                                    : ""
                                }`}
                              >
                                <FaChevronDown className="text-gray-600" />
                              </div>
                            </button>

                            {expandedWeeks.includes(
                              `${phaseIndex}-${weekIndex}`
                            ) && (
                              <div className="p-4 space-y-3">
                                {week.chapters?.map((chapter, chapterIndex) => (
                                  <div
                                    key={chapter._id}
                                    className="flex items-start gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors duration-300"
                                  >
                                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                      <FaCheck className="text-green-600 text-xs" />
                                    </div>
                                    <div>
                                      <h5 className="font-medium text-gray-900">
                                        {chapter.title}
                                      </h5>
                                      {chapter.points?.length > 0 && (
                                        <ul className="mt-2 space-y-1">
                                          {chapter.points
                                            .slice(0, 3)
                                            .map((point, pointIndex) => (
                                              <li
                                                key={point._id}
                                                className="flex items-center gap-2 text-sm text-gray-600"
                                              >
                                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                                                {point.title}
                                              </li>
                                            ))}
                                        </ul>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trainers Tab */}
          {activeTab === "trainers" && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-blue-900 mb-4">
                  Meet Your Trainers
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Learn from experienced professionals and university faculty
                  members
                </p>
              </div>

              {course.trainer?.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {course.trainer.map((trainer) => (
                    <div
                      key={trainer._id}
                      className="bg-gradient-to-b from-white to-blue-50 rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="flex flex-col items-center text-center">
                        <img
                          src={`${DIR.TRAINER_PROFILE_PHOTO}${trainer.profilePhotoTrainer}`}
                          alt={trainer.fullName}
                          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mb-4"
                        />
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {trainer.fullName}
                        </h3>
                        <p className="text-blue-600 mb-3">
                          {trainer.highestQualification}
                        </p>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {trainer.summary || "Experienced trainer at SGBAU"}
                        </p>
                        <Link
                          to={`/mentors/m/${trainer._id}`}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-2"
                        >
                          View Profile <FaArrowRight className="text-xs" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaChalkboardTeacher className="text-blue-600 text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">
                    Trainer Information
                  </h3>
                  <p className="text-gray-600">
                    Trainer details will be announced soon
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Learning Outcomes Tab */}
          {activeTab === "outcomes" && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-blue-900 mb-4">
                  Learning Outcomes
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  What you'll achieve after completing this course
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {course.learningOutcomes?.map((outcome, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 border border-blue-100 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 font-bold text-lg">
                          {index + 1}
                        </span>
                      </div>
                      <p className="text-gray-700 font-medium">{outcome}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white shadow-xl">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of successful students who have transformed their
              careers with our university programs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsEnrollModalOpen(true)}
                className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
              >
                Enroll Now <FaArrowRight />
              </button>
              <Link
                to="/contact"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3"
              >
                Contact Admissions
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Enroll Modal */}
      <EnrollFormModal
        open={isEnrollModalOpen}
        setOpen={setIsEnrollModalOpen}
        course={course}
      />

      {/* Enroll Strip */}
      {showEnrollStrip && (
        <EnrollStrip
          handleEnrollCourse={() => setIsEnrollModalOpen(true)}
          course={course}
        />
      )}
    </div>
  );
}

// Stat Card Component
function StatCard({ icon, value, label }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-300">
      <div className="flex justify-center mb-2">{icon}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-blue-200">{label}</div>
    </div>
  );
}
