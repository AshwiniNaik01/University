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

const EnrollFormModal = ({ open, setOpen, course }) => {
  const enrollSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    middleName: Yup.string(),
    lastName: Yup.string().required("Last Name is required"),
    mobileNo: Yup.string()
      .required("Mobile Number is required")
      .matches(/^\d{10}$/, "Mobile number must be 10 digits"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    collegeName: Yup.string().required("College Name is required"),
  });

  const handleClose = (resetForm) => {
    resetForm(); // clear fields
    setOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        variant="lg"
        scrollableBody
      >
        <Modal.Header>
          Enroll for {course?.title || "Selected Course"}
        </Modal.Header>

        <Modal.Body>
          <Formik
            initialValues={{
              firstName: "",
              middleName: "",
              lastName: "",
              mobileNo: "",
              email: "",
              collegeName: "",
            }}
            validationSchema={enrollSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              const fullName = [
                values.firstName,
                values.middleName,
                values.lastName,
              ]
                .filter(Boolean)
                .join(" ");

              try {
                const response = await api.post("/enrollments/enroll", {
                  fullName,
                  mobileNo: values.mobileNo,
                  email: values.email,
                  collegeName: values.collegeName,
                  selectedProgram: course?.title || "Unknown Program",
                  enrolledCourses: course?._id,
                });

                if (response.data.success) {
                  toast.success("Enrolled successfully!");
                  handleClose(resetForm);
                } else {
                  toast.error(response.data.message || "Enrollment failed");
                }
              } catch (err) {
                console.error("Enrollment error:", err);
                const backendMessage =
                  err.response?.data?.message || "Something went wrong";

                // Show backend error in toast
                toast.error(backendMessage);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                {/* Name Fields */}
                <div className="grid md:grid-cols-3 gap-4">
                  {["First", "Middle", "Last"].map((label) => {
                    const nameKey = `${label.toLowerCase()}Name`;
                    return (
                      <div key={nameKey}>
                        <label className="block text-gray-700 text-sm mb-1">
                          {label} Name{" "}
                          {label !== "Middle" && (
                            <span className="text-red-500">*</span>
                          )}
                        </label>
                        <Field
                          type="text"
                          name={nameKey}
                          placeholder={`Enter ${label.toLowerCase()} name`}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
                        />
                        <ErrorMessage
                          name={nameKey}
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Mobile & Email */}
                <div className="grid md:grid-cols-2 gap-4">
                  {["mobileNo", "email"].map((field) => (
                    <div key={field}>
                      <label className="block text-gray-700 text-sm mb-1">
                        {field === "mobileNo" ? "Mobile" : "Email"}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <Field
                        type={field === "email" ? "email" : "tel"}
                        name={field}
                        placeholder={
                          field === "email"
                            ? "Enter email address"
                            : "Enter mobile number"
                        }
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
                      />
                      <ErrorMessage
                        name={field}
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  ))}
                </div>

                {/* College Name */}
                <div>
                  <label className="block text-gray-700 text-sm mb-1">
                    College Name <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    name="collegeName"
                    placeholder="Enter college name"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
                  />
                  <ErrorMessage
                    name="collegeName"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="pink"
                    size="md"
                    className="w-full shadow-md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enrolling..." : "Enroll"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar />
    </>
  );
};

// ✅ Hero background images (replace with real assets)
const courseHeroImages = {
  1: "https://cdn.pixabay.com/photo/2015/06/24/15/45/code-820275_1280.jpg",
  2: "https://cdn.pixabay.com/photo/2017/06/08/19/09/programming-2389236_1280.jpg",
  3: "https://cdn.pixabay.com/photo/2020/06/23/20/43/programming-5336392_1280.jpg",
  4: "https://cdn.pixabay.com/photo/2017/08/30/01/05/python-2697880_1280.jpg",
  5: "https://cdn.pixabay.com/photo/2017/05/11/08/36/dot-net-2300420_1280.jpg",
  6: "https://cdn.pixabay.com/photo/2015/09/05/22/46/php-925468_1280.jpg",
};

// ✅ Dummy Mentor Image (replace with real later)
const mentorImage = "https://randomuser.me/api/portraits/men/32.jpg";

const CoursePage = () => {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);

  const [showEnrollStrip, setShowEnrollStrip] = useState(false);

  let introRef = useRef(null);

  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

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
            <li><strong>Enroll Now:</strong> Ready to start your ${data.title} journey? <a class="text-codedrift-indigo underline hover:text-codedrift-indigo-dark" href="/enroll">Click here to enroll now!</a></li>
            <li><strong>Contact Us:</strong> Have any questions? <a class="text-codedrift-indigo underline hover:text-codedrift-indigo-dark" href="/contact">Click here to contact us!</a></li>
          </ul>
        </div>`;

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

  // Inside your component:
  const { ref: observeIntroRef, inView } = useInView({
    threshold: 0.6,
    rootMargin: "0px",
    skip: typeof window === "undefined", // prevent issues on SSR
  });

  // Sync observer to your existing ref
  useEffect(() => {
    if (introRef.current) {
      observeIntroRef(introRef.current);
    }
  }, [introRef.current]);

  // Watch inView change
  useEffect(() => {
    setShowEnrollStrip(!inView);
  }, [inView]);

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
            <div className="relative z-10 max-w-3xl mx-auto px-6">
              <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg tracking-tight">
                {/* {course.name} */}
                {course.title}
              </h1>
              <p className="mt-4 text-gray-100 max-w-xl mx-auto text-lg leading-relaxed drop-shadow">
                {course.description}
              </p>

              {/* Mentor */}

              {course.trainer && (
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
              )}

              {/* Course Stats */}
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur-md shadow-md">
                  <Calendar className="w-5 h-5 text-white" />
                  <span className="text-sm font-medium">{course.duration}</span>
                </div>

                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur-md shadow-md">
                  <Award className="w-5 h-5 text-white" />
                  {/* <span className="text-sm font-medium">Certificate Included</span> */}
                  {course.features?.certificate && (
                    <span>Certificate Included</span>
                  )}
                </div>

                <div className="flex items-center gap-1 bg-white/10 px-3 py-2 rounded-full backdrop-blur-md shadow-md">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                  {/* <span className="text-sm font-medium ml-1">{course.rating?.toFixed(1) || "N/A"}/5</span> */}
                  {course.rating && <span>({course.rating}/5)</span>}
                </div>

                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur-md shadow-md">
                  <User className="w-5 h-5 text-white" />
                  {/* <span className="text-sm font-medium">
                    {course.enrolledCount.toLocaleString()} Enrolled
                  </span> */}
                  {course.enrolledCount && (
                    <span>{course.enrolledCount}+ Enrolled</span>
                  )}
                </div>
              </div>

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

          {/* ✅ What You’ll Learn */}
          <section className="max-w-4xl mx-auto px-6 mt-12">
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-4 text-center">
              What You’ll Learn
            </h2>

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
            {/* <article
              className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-xl p-8 md:p-12 leading-relaxed
                        prose max-w-none prose-p:leading-relaxed prose-li:leading-relaxed
                        prose-headings:text-codedrift-indigo prose-strong:text-gray-900 hover:shadow-2xl hover:scale-[1.01] transition-all duration-500"
              // dangerouslySetInnerHTML={{ __html: course.course_info_html }}
            //   dangerouslySetInnerHTML={{ __html: course.overview }}
            /> */}

            <article
              className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-xl p-8 md:p-12 leading-relaxed
             prose max-w-none prose-p:leading-relaxed prose-li:leading-relaxed
             prose-headings:text-codedrift-indigo prose-strong:text-gray-900 hover:shadow-2xl hover:scale-[1.01] transition-all duration-500"
              dangerouslySetInnerHTML={{ __html: course.course_info_html }}
            />
          </div>

          {/* ✅ Placeholder for Future Accordion */}
          {/* 👉 We will add "Course Curriculum Accordion" here later */}
          <div className="container mt-16">
            <div className="text-center mb-8">
              <h2 className="relative inline-block text-2xl md:text-3xl font-bold text-codedrift-indigo">
                Course Curriculum
                <span className="absolute left-1/2 -bottom-1 w-2/3 h-1 bg-gradient-to-r from-[#ee4f7e] to-[#4cb7e5] rounded-full transform -translate-x-1/2"></span>
              </h2>
            </div>
            {/* ✅ Video Lectures & Notes Accordion */}
            {(course.videolectures?.length > 0 || course.notes?.length > 0) && (
              <div className="container mt-16">
                {/* <div className="text-center mb-8">
                  <h2 className="relative inline-block text-2xl md:text-3xl font-bold text-codedrift-indigo">
                    Resources
                    <span className="absolute left-1/2 -bottom-1 w-2/3 h-1 bg-gradient-to-r from-[#ee4f7e] to-[#4cb7e5] rounded-full transform -translate-x-1/2"></span>
                  </h2>
                </div> */}

                <Accordion allowMultiple>
                  {/* 🎥 Video Lectures */}
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

                  {/* 📘 Notes / Docs / PDFs */}

                  {/* 📘 Notes / Docs / PDFs */}
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

                            {/* Optional content preview */}
                            {note.content && (
                              <p className="text-sm text-gray-700 whitespace-pre-line mb-2">
                                {note.content.slice(0, 300)}
                              </p>
                            )}

                            {/* ✅ File section (PDF viewer or download link) */}
                            {/* {note.file && (
            <div className="mt-2">
              <span className="text-xs font-medium text-gray-600">
                Attached File:
              </span>
              <div className="mt-1">
                {note.file.endsWith(".pdf") ? (
                  <iframe
                    src={`${API_BASE_URL}/uploads/course-notes/${note.file}`}
                    className="w-full h-64 rounded border"
                    title={note.title}
                  />
                ) : (
                  <a
                    href={`${API_BASE_URL}/uploads/course-notes/${note.file}`}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-codedrift-blue hover:underline"
                  >
                    Download File
                  </a>
                )}
              </div>
            </div>
          )} */}

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
                                    Open File in New Tab
                                  </a>
                                </div>
                              </div>
                            )}

                            {/* Duration display */}
                            {/* {note.duration && (
            <div className="text-right mt-2">
              <span className="text-xs text-gray-500">{note.duration}</span>
            </div>
          )} */}
                          </li>
                        ))}
                      </ul>
                    </AccordionItem>
                  )}
                </Accordion>
              </div>
            )}
          </div>

          {/* ✅ CTA */}
          <div className="mt-16 text-center pb-20">
            <Button as="link" to="/courses#courses-list">
              <ArrowLeft className="size-4" />
              <span className="ml-2">Explore Courses</span>
            </Button>
          </div>
        </div>

        {!inView && (
          <EnrollStrip
            handleEnrollCourse={handleEnrollCourse}
            course={course}
          />
        )}

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
