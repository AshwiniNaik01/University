import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Calendar,
  Award,
  Star,
  ArrowLeft,
  CheckCircle2,
  PlayCircle,
  ChevronDown,
  ChevronUp,
  BookOpen,
  User,
  GraduationCap,
  FileText,
  ChevronDownIcon,
} from "lucide-react";
// import { courseList } from "../../data/coursesList";
import { Accordion, AccordionItem } from "../../components/utility/Accordion";
import Image from "../../components/utility/Image";
import { Button } from "../../components/utility/Button";
import { Modal } from "../../components/utility/Modal";
import EnrollStrip from "../../components/courses/EnrollStrip";
import { useInView } from "react-intersection-observer";
import { api } from "../../apiUtils/instance";
import { getCourseById } from "./courses";
import { API_BASE_URL, DIR } from "../../config";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "../../apiUtils/cookieUtils"; // 👈 import
// import { enrollStudent } from "./enrollment";
import EnrollFormModal from "./EnrollFormModal";

// ✅ Hero background images mapped by course ID (replace with real assets)
const courseHeroImages = {
  1: "https://cdn.pixabay.com/photo/2015/06/24/15/45/code-820275_1280.jpg",
  2: "https://cdn.pixabay.com/photo/2017/06/08/19/09/programming-2389236_1280.jpg",
  3: "https://cdn.pixabay.com/photo/2020/06/23/20/43/programming-5336392_1280.jpg",
  4: "https://cdn.pixabay.com/photo/2017/08/30/01/05/python-2697880_1280.jpg",
  5: "https://cdn.pixabay.com/photo/2017/05/11/08/36/dot-net-2300420_1280.jpg",
  6: "https://cdn.pixabay.com/photo/2015/09/05/22/46/php-925468_1280.jpg",
};

const CoursePage = () => {
  const { courseId } = useParams(); // Extract courseId from URL params
  const [course, setCourse] = useState(null);
  const [showEnrollStrip, setShowEnrollStrip] = useState(false);
  let introRef = useRef(null); // Ref to the intro section to observe its visibility in viewport
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [expandedPhases, setExpandedPhases] = useState([]);
  const [expandedWeeks, setExpandedWeeks] = useState([]);
  const phaseRefs = useRef([]); // Refs to each phase DOM element for scroll-into-view functionality

  // Setup refs for smooth scroll, Initialize refs array once course data is loaded
  useEffect(() => {
    if (course?.phases?.length) {
      phaseRefs.current = new Array(course.phases.length).fill(null);
    }
  }, [course?.phases?.length]);

  // Auto-scroll to a phase when it's expanded
  useEffect(() => {
    expandedPhases.forEach((index) => {
      const el = phaseRefs.current[index];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }, [expandedPhases]);

  // Toggle a phase open/closed by index
  const togglePhase = (index) => {
    setExpandedPhases(
      (prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index] // Remove from expanded if already open and add to expanded if closed
    );
  };

  // Toggle a specific week open/closed using a composite key
  const toggleWeek = (phaseIndex, weekIndex) => {
    const key = `${phaseIndex}-${weekIndex}`;
    setExpandedWeeks(
      (prev) =>
        prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key] // Remove from expanded if already open and add to expanded if closed
    );
  };

  // Fetch course data by courseId on component mount and whenever courseId changes
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(courseId);

        // 1. Generate Key Features HTML
        const keyFeaturesHTML = `
        <div class="mb-6">
          <h3 class="text-xl font-semibold text-codedrift-pink mb-2">Key Features:</h3>
          <ul class="list-disc list-inside space-y-2 text-gray-700">
            ${data.keyFeatures
              .map((feature) => {
                const subList = feature.subPoints?.length
                  ? `<ul class="list-disc list-inside pl-4 space-y-1">
                      ${feature.subPoints
                        .map((pt) => `<li>${pt}</li>`)
                        .join("")}
                    </ul>`
                  : "";
                return `<li><strong>${feature.title}:</strong> ${
                  feature.description || ""
                }${subList}</li>`;
              })
              .join("")}
          </ul>
        </div>`;

        // 2. Benefits HTML
        const benefitsHTML = `
        <div class="mb-6">
          <h3 class="text-xl font-semibold text-codedrift-pink mb-2">Benefits:</h3>
          <ul class="list-disc list-inside space-y-2 text-gray-700">
            ${data.benefits.map((benefit) => `<li>${benefit}</li>`).join("")}
          </ul>
        </div>`;

        // 3. Overview & Final HTML
        const courseInfoHTML = `
        <div class="mb-6">
          <h2 class="text-2xl md:text-3xl font-bold text-codedrift-indigo mb-4">
            ${data.title} Course
          </h2>
        </div>

        <div class="mb-6">
          <p class="text-gray-700 leading-relaxed">
            <strong>Overview:</strong> ${data.overview}
          </p>
        </div>

        ${keyFeaturesHTML}
        ${benefitsHTML}

        <div>
          <h3 class="text-xl font-semibold text-codedrift-pink mb-2">How to Get Started:</h3>
          <ul class="list-disc list-inside space-y-2 text-gray-700">
            
            <li><strong>Contact Us:</strong> Have any questions? <a class="text-codedrift-indigo underline hover:text-codedrift-indigo-dark" href="/contact">Click here to contact us!</a></li>
          </ul>
        </div>`;
        // <li><strong>Enroll Now:</strong> Ready to start your ${data.title} journey? <a class="text-codedrift-indigo underline hover:text-codedrift-indigo-dark" href="/enroll">Click here to enroll now!</a></li>

        // Set fetched and processed course data into state
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

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  // Inside your component: Setup intersection observer to track visibility of intro section for enroll strip toggle
  const { ref: observeIntroRef, inView } = useInView({
    threshold: 0.6,
    rootMargin: "0px",
    skip: typeof window === "undefined", // Disable during server-side rendering to avoid errors
  });

  // connecting the scroll observer (used to detect if the section is visible) to the introRef element so that we can track when this part of the page is in view
  useEffect(() => {
    if (introRef.current) {
      observeIntroRef(introRef.current);
    }
  }, [introRef.current]);

  // Watch inView change
  useEffect(() => {
    setShowEnrollStrip(!inView);
  }, [inView]);

  // Render fallback UI if course data is not found or failed to load
  if (!course) {
    return (
      <div className="container text-center py-20">
        <h2 className="text-2xl font-bold text-gray-700">Course not found</h2>
        <Link
          to="/courses"
          className="mt-4 inline-block bg-codedrift-pink text-white px-6 py-3 rounded-full shadow-md hover:bg-codedrift-indigo-dark transition"
        >
          <ArrowLeft className="inline w-4 h-4 mr-2" /> Back to All Courses
        </Link>
      </div>
    );
  }

  // Handler to open enrollment modal on clicking enroll button
  function handleEnrollCourse() {
    setIsEnrollModalOpen(true);
  }

  return (
    <>
      <div className="relative min-h-dvh bg-gray-50">
        {/* ✅ Subtle Animated Background Pattern */}
        <div
          className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] animate-pulse"
          style={{ backgroundSize: "300px 300px" }}
        ></div>

        <div className="relative z-10">
          {/* ✅ HERO SECTION */}
          <section
            id="course-intro-section"
            ref={introRef}
            className="relative h-fit py-4 md:h-[65vh] flex flex-col items-center justify-center text-center rounded-b-[3rem] shadow-2xl overflow-hidden bg-gradient-to-br from-[#f43f5e] via-[#6366f1] to-[#4cb7e5] text-white"
          >
            {/* ✅ Optional Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

            {/* ✅ Content */}
            <div className="relative z-10 max-w-8xl mx-auto px-6">
              <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg tracking-tight">
                {course.title}
              </h1>
              <p className="mt-4 text-gray-100 max-w-3xl mx-auto text-lg leading-relaxed drop-shadow">
                {course.description}
              </p>

              {/* Mentor: Trainer info */}
              {/* {course.trainer && (
                <div className="flex items-center justify-center gap-3 mt-6">
                  <Image
                    src={`${DIR.TRAINER_PROFILE_PHOTO}${course.trainer.profilePhotoTrainer}`}
                    alt={course.trainer.fullName}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover"
                  />
                  <Link
                    to={`/mentors/m/${course.trainer._id}`}
                    className="text-sm text-gray-100"
                  >
                    Taught by{" "}
                    <span className="font-semibold">
                      {course.trainer.fullName}
                    </span>
                    , {course.trainer.highestQualification}
                  </Link>
                </div>
              )} */}

              {/* {course.trainer && course.trainer.length > 0 && (
                <div className="flex flex-col gap-4 mt-6">
                  {course.trainer.map((trainer) => (
                    <div
                      key={trainer._id}
                      className="flex items-center justify-center gap-3"
                    >
                      <Image
                        src={`${DIR.TRAINER_PROFILE_PHOTO}${trainer.profilePhotoTrainer}`}
                        alt={trainer.fullName}
                        className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover"
                      />
                      <Link
                        to={`/mentors/m/${trainer._id}`}
                        className="text-sm text-gray-100"
                      >
                        Taught by{" "}
                        <span className="font-semibold">
                          {trainer.fullName}
                        </span>
                        , {trainer.highestQualification}
                      </Link>
                    </div>
                  ))}
                </div>
              )} */}

              {course.trainer && course.trainer.length > 0 && (
                <div className="my-4">
                  {/* Section Title */}
                  <h3 className="text-xl font-bold mb-2 underline">
                    {course.trainer.length > 1
                      ? "Meet Your Trainers"
                      : "Meet Your Trainer"}
                  </h3>

                  {/* Trainers container */}
                  <div className="flex gap-6 overflow-x-auto no-scrollbar justify-center px-2 md:px-4">
                    {course.trainer.map((trainer) => (
                      <div
                        key={trainer._id}
                        className="group relative flex flex-col items-center min-w-[80px] duration-300 ease-in-out"
                      >
                        {/* Glowing ring effect */}
                        <div className="relative mb-3">
                          <div className="absolute -inset-1 bg-gradient-to-r from-codedrift-pink to-codedrift-blue rounded-full blur opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
                          <Image
                            src={`${DIR.TRAINER_PROFILE_PHOTO}${trainer.profilePhotoTrainer}`}
                            alt={trainer.fullName}
                            className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover relative z-10"
                          />
                        </div>

                        {/* Name */}
                        <Link
                          to={`/mentors/m/${trainer._id}`}
                          className="text-sm font-semibold text-white hover:underline text-center z-10"
                          title={`View profile of ${trainer.fullName}`}
                        >
                          {trainer.fullName}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Course Stats */}
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur-md shadow-md">
                  <Calendar className="w-5 h-5 text-white" />
                  <span className="text-sm font-medium">{course.duration}</span>
                </div>

                {/* Certificate availability */}
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur-md shadow-md">
                  <Award className="w-5 h-5 text-white" />
                  {course.features?.certificate && (
                    <span>Certificate Included</span>
                  )}
                </div>

                {/* Rating stars */}
                <div className="flex items-center gap-1 bg-white/10 px-3 py-2 rounded-full backdrop-blur-md shadow-md">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                  {course.rating && <span>({course.rating}/5)</span>}
                </div>

                {/* Enrollment count */}
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur-md shadow-md">
                  <User className="w-5 h-5 text-white" />
                  {course.enrolledCount && (
                    <span>{course.enrolledCount}+ Enrolled</span>
                  )}
                </div>
              </div>

              {/* Enroll button */}
              <div className="mt-4">
                <Button
                  onClick={() => setIsEnrollModalOpen(true)}
                  size="md"
                  variant="gradient"
                >
                  Enroll Now
                </Button>
              </div>
            </div>
          </section>

          {/* Section: What You'll Learn */}
          <section className="max-w-4xl mx-auto px-6 mt-12">
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-4 text-center">
              What You’ll Learn
            </h2>

            {/* Learning outcomes */}
            <ul className="grid md:grid-cols-2 gap-3">
              {course.learningOutcomes?.map((point, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-3 rounded-lg shadow hover:shadow-md transition"
                >
                  <CheckCircle2 className="w-5 h-5 text-codedrift-blue" />
                  <span className="text-sm text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ✅ Glassmorphic Course Details */}
          <div className="container mt-12">
            <article
              className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-xl p-8 md:p-12 leading-relaxed
             prose max-w-none prose-p:leading-relaxed prose-li:leading-relaxed
             prose-headings:text-codedrift-indigo prose-strong:text-gray-900 hover:shadow-2xl hover:scale-[1.01] transition-all duration-500"
              dangerouslySetInnerHTML={{ __html: course.course_info_html }}
            />
          </div>

          {/* ✅ Placeholder for Future Accordion : dont delete its s video and notes section */}
          {/* 👉 We will add "Course Curriculum Accordion" here later */}
          {(course.videolectures?.length > 0 || course.notes?.length > 0) && (
            <div className="container mt-16">
              {/* ✅ Heading only when content exists */}
              <div className="text-center mb-8">
                <h2 className="relative inline-block text-2xl md:text-3xl font-bold text-codedrift-indigo">
                  Learning Resources
                  <span className="absolute left-1/2 -bottom-1 w-2/3 h-1 bg-gradient-to-r from-[#ee4f7e] to-[#4cb7e5] rounded-full transform -translate-x-1/2"></span>
                </h2>
              </div>

              <Accordion allowMultiple>
                {/* ✅ Video Lectures Section */}
                {course.videolectures?.length > 0 && (
                  <AccordionItem
                    header={
                      <div className="w-full flex flex-col gap-2 md:flex-row md:items-center justify-between bg-[#fef9f9] px-4 py-3 rounded-xl">
                        <div className="flex items-center gap-2">
                          <PlayCircle className="w-5 h-5 text-codedrift-pink" />
                          <span className="text-sm sm:text-base font-semibold text-codedrift-indigo">
                            Video Lectures
                          </span>
                        </div>
                        <span className="w-fit text-xs sm:text-sm text-gray-600 bg-white border border-gray-300 px-2 py-0.5 rounded-full">
                          {course.videolectures.length} Videos
                        </span>
                      </div>
                    }
                    expandIcon={
                      <ChevronDown className="w-4 h-4 text-codedrift-blue" />
                    }
                    collapseIcon={
                      <ChevronUp className="w-4 h-4 text-codedrift-pink" />
                    }
                  >
                    <ul className="space-y-3 mt-2">
                      {course.videolectures.map((video) => (
                        <li
                          key={video._id}
                          className="flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-700">
                            <div className="flex items-center gap-2">
                              <PlayCircle className="w-4 h-4 text-codedrift-indigo" />
                              <span className="text-sm font-medium">
                                {video.title}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500">
                              {video.duration}
                            </span>
                          </div>
                          <a
                            href={video.contentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-codedrift-blue hover:underline"
                          >
                            Watch
                          </a>
                        </li>
                      ))}
                    </ul>
                  </AccordionItem>
                )}

                {/* ✅ Notes Section */}
                {course.notes?.length > 0 && (
                  <AccordionItem
                    header={
                      <div className="w-full flex flex-col gap-2 md:flex-row md:items-center justify-between bg-[#f0f9ff] px-4 py-3 rounded-xl">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-codedrift-blue" />
                          <span className="text-sm sm:text-base font-semibold text-codedrift-indigo">
                            Notes & Articles
                          </span>
                        </div>
                        <span className="w-fit text-xs sm:text-sm text-gray-600 bg-white border border-gray-300 px-2 py-0.5 rounded-full">
                          {course.notes.length} Notes
                        </span>
                      </div>
                    }
                    expandIcon={
                      <ChevronDown className="w-4 h-4 text-codedrift-blue" />
                    }
                    collapseIcon={
                      <ChevronUp className="w-4 h-4 text-codedrift-pink" />
                    }
                  >
                    <ul className="space-y-3 mt-2">
                      {course.notes.map((note) => (
                        <li
                          key={note._id}
                          className="bg-white px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition"
                        >
                          <h4 className="text-sm font-semibold text-gray-800 mb-1">
                            {note.title}
                          </h4>

                          {note.content && (
                            <p className="text-sm text-gray-700 whitespace-pre-line mb-2">
                              {note.content.slice(0, 300)}...
                            </p>
                          )}

                          {note.file && (
                            <div className="mt-2">
                              <span className="text-xs font-medium text-gray-600">
                                Attached File:
                              </span>
                              <div className="mt-1">
                                <a
                                  href={`${DIR.COURSE_NOTES}${note.file}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-block text-sm text-codedrift-blue hover:underline mt-1"
                                >
                                  Open File
                                </a>
                              </div>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </AccordionItem>
                )}
              </Accordion>
            </div>
          )}

          {/* ✅ Course Curriculum Accordion */}
          {course.phases?.length > 0 && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
              {/* Animated Heading */}
              <div className="text-center mb-16">
                <div className="relative inline-block">
                  <h2 className="relative text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#ee4f7e] via-[#4cb7e5] to-[#ee4f7e] bg-clip-text text-transparent animate-gradient-x mb-4">
                    Course Curriculum
                  </h2>
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#ee4f7e] to-[#4cb7e5] rounded-full transform scale-x-0 animate-scale-in"></div>
                </div>
                {/* <p className="text-gray-600 max-w-2xl mx-auto text-lg mt-4">
                  🚀 Master{" "}
                  {course.phases.reduce(
                    (total, phase) =>
                      total +
                      phase.weeks.reduce(
                        (weekTotal, week) => weekTotal + week.chapters.length,
                        0
                      ),
                    0
                  )}
                  + topics across {course.phases.length} intensive phases
                </p> */}

                <p className="text-gray-900 max-w-5xl mx-auto text-lg mt-4 leading-relaxed">
                  🚀 Dive into a powerful, hands-on journey through{" "}
                  <span className="font-bold text-codedrift-indigo">
                    {course.phases.length} in-depth phases
                  </span>{" "}
                  — each carefully designed to guide you from fundamentals to
                  mastery. 💼 With over{" "}
                  <span className="font-bold text-[#ee4f7e]">
                    {course.phases.reduce(
                      (total, phase) =>
                        total +
                        phase.weeks.reduce(
                          (weekTotal, week) => weekTotal + week.chapters.length,
                          0
                        ),
                      0
                    )}
                  </span>{" "}
                  real-world topics, you won't just learn —{" "}
                  <span className="font-semibold text-green-600">
                    you’ll build skills that stick
                  </span>
                  .
                </p>
              </div>

              {/* Curriculum Container */}
              <div className="rounded-2xl border-2 border-gray-200/50 shadow-2xl backdrop-blur-sm bg-white/95 transition-all duration-500 hover:shadow-3xl hover:border-[#4cb7e5]/30">
                {course.phases.map((phase, phaseIndex) => {
                  const isPhaseOpen = expandedPhases.includes(phaseIndex);

                  return (
                    <div
                      key={phase._id}
                      className="group/phase border-b-2 border-gray-100 last:border-b-0"
                    >
                      {/* Phase Header - Compact */}
                      <button
                        onClick={() => togglePhase(phaseIndex)}
                        className="w-full px-6 py-4 bg-gradient-to-r from-gray-50/80 to-blue-50/50 hover:from-blue-50 hover:to-purple-50/60 transition-all duration-500 cursor-pointer relative overflow-hidden"
                      >
                        {/* Hover BG */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#ee4f7e]/5 to-[#4cb7e5]/5 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center w-full">
                          {/* Left Side - Phase Title */}
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ee4f7e] to-[#4cb7e5] flex items-center justify-center text-white font-bold text-lg shadow-md">
                              {phaseIndex + 1}
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover/phase:text-[#4cb7e5] transition-colors duration-300">
                              {phase.title}
                            </h3>
                          </div>

                          {/* Right Side - Stats */}
                          <div className="flex flex-col items-end mt-4 lg:mt-0 space-y-1 text-md">
                            {/* Stats */}
                            <div className="flex gap-3 text-gray-700">
                              <span className="flex items-center gap-1 bg-white/80 px-2.5 py-0.5 rounded-full text-sm font-medium">
                                📅 {phase.weeks.length} weeks
                              </span>
                              <span className="flex items-center gap-1 bg-white/80 px-2.5 py-0.5 rounded-full text-sm font-medium">
                                📚{" "}
                                {phase.weeks.reduce(
                                  (total, week) => total + week.chapters.length,
                                  0
                                )}{" "}
                                topics
                              </span>
                              <span
                                className={`transform transition-transform duration-300 ${
                                  isPhaseOpen ? "rotate-180" : ""
                                }`}
                              >
                                <span className="text-xl">
                                  <ChevronDownIcon />{" "}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>

                      {/* Weeks Container - Enhanced */}
                      {isPhaseOpen && (
                        <div className="bg-gradient-to-br from-blue-50/30 to-purple-50/20 p-6 space-y-6 animate-slide-down">
                          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                            {phase.weeks.map((week, weekIndex) => {
                              const key = `${phaseIndex}-${weekIndex}`;
                              const isWeekOpen = expandedWeeks.includes(key);

                              return (
                                <div
                                  key={week._id}
                                  className="bg-white/80 backdrop-blur-sm rounded-xl border-2 border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#4cb7e5]/40 group/week"
                                >
                                  {/* Week Header */}
                                  <button
                                    onClick={() =>
                                      toggleWeek(phaseIndex, weekIndex)
                                    }
                                    className="w-full flex justify-between items-center p-5 bg-gradient-to-r from-white to-gray-50/80 hover:from-blue-50/60 hover:to-purple-50/40 rounded-t-xl transition-all duration-300"
                                  >
                                    <div className="flex items-center space-x-4">
                                      <div
                                        className={`w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold transform transition-transform duration-300 group-hover/week:scale-105
                                        `}
                                      >
                                        {weekIndex + 1}
                                      </div>
                                      <div className="text-left">
                                        <h4 className="font-semibold text-gray-900 group-hover/week:text-[#4cb7e5] transition-colors">
                                          {week.title}
                                        </h4>
                                      </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                      <span
                                        className={`transform transition-transform duration-300 ${
                                          isWeekOpen ? "rotate-180" : ""
                                        }`}
                                      >
                                        <span className="text-xl">
                                          <ChevronDownIcon />{" "}
                                        </span>
                                      </span>
                                    </div>
                                  </button>

                                  {/* Topics - Enhanced */}
                                  {isWeekOpen && (
                                    <div className="p-4 space-y-3 animate-fade-in">
                                      {week.chapters.map(
                                        (chapter, chapterIndex) => (
                                          <div
                                            key={chapter._id}
                                            className="group/topic p-4 bg-gradient-to-r from-white to-gray-50/50 transition-all duration-300 transform hover:scale-[1.02]"
                                          >
                                            <div className="flex items-start space-x-3">
                                              <div className="flex-shrink-0 mt-1"></div>

                                              <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                  <div>
                                                    <h5 className="font-semibold text-gray-900 group-hover/topic:text-[#ee4f7e] transition-colors flex items-center space-x-2">
                                                      <span>
                                                        {chapter.title}
                                                      </span>
                                                    </h5>

                                                    {/* Learning Points - Enhanced */}
                                                    {chapter.points?.length >
                                                      0 && (
                                                      <ul className="mt-3 space-y-2">
                                                        {chapter.points.map(
                                                          (pt, pointIndex) => (
                                                            <li
                                                              key={pt._id}
                                                              className="flex items-start space-x-2 animate-fade-in-up"
                                                              style={{
                                                                animationDelay: `${
                                                                  pointIndex *
                                                                  100
                                                                }ms`,
                                                              }}
                                                            >
                                                              <span className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                                                                <span className="text-green-500 text-md">
                                                                  ✓
                                                                </span>
                                                              </span>
                                                              <div className="flex-1 text-md text-gray-800">
                                                                <span className="font-medium">
                                                                  {pt.title}
                                                                </span>
                                                                {pt.description && (
                                                                  <span className="text-gray-600">
                                                                    :{" "}
                                                                    {
                                                                      pt.description
                                                                    }
                                                                  </span>
                                                                )}
                                                              </div>
                                                            </li>
                                                          )
                                                        )}
                                                      </ul>
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Enhanced Summary */}
                <div className="bg-gradient-to-r from-[#ee4f7e]/5 to-[#4cb7e5]/5 px-8 py-6 border-t-2 border-gray-200/50">
                  <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
                    <div className="text-center lg:text-left">
                      <h4 className="font-bold text-gray-900 text-lg">
                        🎉 Complete your Learning Journey
                      </h4>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <span>📊</span>
                          <span>
                            {course.phases.reduce(
                              (total, phase) => total + phase.weeks.length,
                              0
                            )}{" "}
                            weeks
                          </span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <span>🎯</span>
                          <span>
                            {course.phases.reduce(
                              (total, phase) =>
                                total +
                                phase.weeks.reduce(
                                  (weekTotal, week) =>
                                    weekTotal + week.chapters.length,
                                  0
                                ),
                              0
                            )}{" "}
                            topics
                          </span>
                        </span>
                      </div>
                    </div>

                    <div className="relative flex justify-center mt-8">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
                        alt="Motivate"
                        className="absolute -top-12 right-1/3 w-24 animate-bounce"
                      />

                      {/* CTA button code here */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ✅ CTA - Explore Other Courses*/}

          {/* Simple back button that takes users to the full course list */}
          <div className="mt-16 text-center pb-20">
            <Button as="link" to="/courses#courses-list">
              <ArrowLeft className="size-4" />
              <span className="ml-2">Explore Courses</span>
            </Button>
          </div>
        </div>

        {/* ✅ Floating Enroll Strip */}
        {!inView && (
          <EnrollStrip
            handleEnrollCourse={handleEnrollCourse}
            course={course}
          />
        )}

        {/* ✅ Enroll Modal
  Triggered by either main CTA button or the enroll strip */}
        <EnrollFormModal
          open={isEnrollModalOpen}
          setOpen={setIsEnrollModalOpen}
          course={course}
        />
      </div>
    </>
  );
};

export default CoursePage;
