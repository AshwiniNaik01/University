// import React, { useEffect, useRef, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import {
//   Calendar,
//   Award,
//   Star,
//   ArrowLeft,
//   CheckCircle2,
//   PlayCircle,
//   ChevronDown,
//   ChevronUp,
//   BookOpen,
//   User,
//   GraduationCap,
//   FileText,
//   ChevronDownIcon,
// } from "lucide-react";
// // import { courseList } from "../../data/coursesList";
// import { Accordion, AccordionItem } from "../../components/utility/Accordion";
// import Image from "../../components/utility/Image";
// import { Button } from "../../components/utility/Button";
// import { Modal } from "../../components/utility/Modal";
// import EnrollStrip from "../../components/courses/EnrollStrip";
// import { useInView } from "react-intersection-observer";
// import { api } from "../../apiUtils/instance";
// import { getCourseById } from "./courses";
// import { API_BASE_URL, DIR } from "../../config";
// import * as Yup from "yup";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { getCookie } from "../../apiUtils/cookieUtils"; // 👈 import
// // import { enrollStudent } from "./enrollment";
// import EnrollFormModal from "./EnrollFormModal";

// // ✅ Hero background images mapped by course ID (replace with real assets)
// const courseHeroImages = {
//   1: "https://cdn.pixabay.com/photo/2015/06/24/15/45/code-820275_1280.jpg",
//   2: "https://cdn.pixabay.com/photo/2017/06/08/19/09/programming-2389236_1280.jpg",
//   3: "https://cdn.pixabay.com/photo/2020/06/23/20/43/programming-5336392_1280.jpg",
//   4: "https://cdn.pixabay.com/photo/2017/08/30/01/05/python-2697880_1280.jpg",
//   5: "https://cdn.pixabay.com/photo/2017/05/11/08/36/dot-net-2300420_1280.jpg",
//   6: "https://cdn.pixabay.com/photo/2015/09/05/22/46/php-925468_1280.jpg",
// };

// const CoursePage = () => {
//   const { courseId } = useParams(); // Extract courseId from URL params
//   const [course, setCourse] = useState(null);
//   const [showEnrollStrip, setShowEnrollStrip] = useState(false);
//   let introRef = useRef(null); // Ref to the intro section to observe its visibility in viewport
//   const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
//   const [expandedPhases, setExpandedPhases] = useState([]);
//   const [expandedWeeks, setExpandedWeeks] = useState([]);
//   const phaseRefs = useRef([]); // Refs to each phase DOM element for scroll-into-view functionality

//   // Setup refs for smooth scroll, Initialize refs array once course data is loaded
//   useEffect(() => {
//     if (course?.phases?.length) {
//       phaseRefs.current = new Array(course.phases.length).fill(null);
//     }
//   }, [course?.phases?.length]);

//   // Auto-scroll to a phase when it's expanded
//   useEffect(() => {
//     expandedPhases.forEach((index) => {
//       const el = phaseRefs.current[index];
//       if (el) {
//         el.scrollIntoView({ behavior: "smooth", block: "start" });
//       }
//     });
//   }, [expandedPhases]);

//   // Toggle a phase open/closed by index
//   const togglePhase = (index) => {
//     setExpandedPhases(
//       (prev) =>
//         prev.includes(index)
//           ? prev.filter((i) => i !== index)
//           : [...prev, index] // Remove from expanded if already open and add to expanded if closed
//     );
//   };

//   // Toggle a specific week open/closed using a composite key
//   const toggleWeek = (phaseIndex, weekIndex) => {
//     const key = `${phaseIndex}-${weekIndex}`;
//     setExpandedWeeks(
//       (prev) =>
//         prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key] // Remove from expanded if already open and add to expanded if closed
//     );
//   };

//   // Fetch course data by courseId on component mount and whenever courseId changes
//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const data = await getCourseById(courseId);

//         // 1. Generate Key Features HTML
//         const keyFeaturesHTML = `
//         <div class="mb-6">
//           <h3 class="text-xl font-semibold text-codedrift-pink mb-2">Key Features:</h3>
//           <ul class="list-disc list-inside space-y-2 text-gray-700">
//             ${data.keyFeatures
//               .map((feature) => {
//                 const subList = feature.subPoints?.length
//                   ? `<ul class="list-disc list-inside pl-4 space-y-1">
//                       ${feature.subPoints
//                         .map((pt) => `<li>${pt}</li>`)
//                         .join("")}
//                     </ul>`
//                   : "";
//                 return `<li><strong>${feature.title}:</strong> ${
//                   feature.description || ""
//                 }${subList}</li>`;
//               })
//               .join("")}
//           </ul>
//         </div>`;

//         // 2. Benefits HTML
//         const benefitsHTML = `
//         <div class="mb-6">
//           <h3 class="text-xl font-semibold text-codedrift-pink mb-2">Benefits:</h3>
//           <ul class="list-disc list-inside space-y-2 text-gray-700">
//             ${data.benefits.map((benefit) => `<li>${benefit}</li>`).join("")}
//           </ul>
//         </div>`;

//         // 3. Overview & Final HTML
//         const courseInfoHTML = `
//         <div class="mb-6">
//           <h2 class="text-2xl md:text-3xl font-bold text-codedrift-indigo mb-4">
//             ${data.title} Course
//           </h2>
//         </div>

//         <div class="mb-6">
//           <p class="text-gray-700 leading-relaxed">
//             <strong>Overview:</strong> ${data.overview}
//           </p>
//         </div>

//         ${keyFeaturesHTML}
//         ${benefitsHTML}

//         <div>
//           <h3 class="text-xl font-semibold text-codedrift-pink mb-2">How to Get Started:</h3>
//           <ul class="list-disc list-inside space-y-2 text-gray-700">
            
//             <li><strong>Contact Us:</strong> Have any questions? <a class="text-codedrift-indigo underline hover:text-codedrift-indigo-dark" href="/contact">Click here to contact us!</a></li>
//           </ul>
//         </div>`;
//         // <li><strong>Enroll Now:</strong> Ready to start your ${data.title} journey? <a class="text-codedrift-indigo underline hover:text-codedrift-indigo-dark" href="/enroll">Click here to enroll now!</a></li>

//         // Set fetched and processed course data into state
//         setCourse({
//           ...data,
//           name: data.title,
//           course_info_html: courseInfoHTML,
//         });
//       } catch (err) {
//         console.error("Error loading course:", err);
//         setCourse(null);
//       }
//     };

//     if (courseId) {
//       fetchCourse();
//     }
//   }, [courseId]);

//   // Inside your component: Setup intersection observer to track visibility of intro section for enroll strip toggle
//   const { ref: observeIntroRef, inView } = useInView({
//     threshold: 0.6,
//     rootMargin: "0px",
//     skip: typeof window === "undefined", // Disable during server-side rendering to avoid errors
//   });

//   // connecting the scroll observer (used to detect if the section is visible) to the introRef element so that we can track when this part of the page is in view
//   useEffect(() => {
//     if (introRef.current) {
//       observeIntroRef(introRef.current);
//     }
//   }, [introRef.current]);

//   // Watch inView change
//   useEffect(() => {
//     setShowEnrollStrip(!inView);
//   }, [inView]);

//   // Render fallback UI if course data is not found or failed to load
//   if (!course) {
//     return (
//       <div className="container text-center py-20">
//         <h2 className="text-2xl font-bold text-gray-700">Course not found</h2>
//         <Link
//           to="/courses"
//           className="mt-4 inline-block bg-codedrift-pink text-white px-6 py-3 rounded-full shadow-md hover:bg-codedrift-indigo-dark transition"
//         >
//           <ArrowLeft className="inline w-4 h-4 mr-2" /> Back to All Courses
//         </Link>
//       </div>
//     );
//   }

//   // Handler to open enrollment modal on clicking enroll button
//   function handleEnrollCourse() {
//     setIsEnrollModalOpen(true);
//   }

//   return (
//     <>
//       <div className="relative min-h-dvh bg-gray-50">
//         {/* ✅ Subtle Animated Background Pattern */}
//         <div
//           className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] animate-pulse"
//           style={{ backgroundSize: "300px 300px" }}
//         ></div>

//         <div className="relative z-10">
//           {/* ✅ HERO SECTION */}
//           <section
//             id="course-intro-section"
//             ref={introRef}
//             className="relative h-fit py-4 md:h-[65vh] flex flex-col items-center justify-center text-center rounded-b-[3rem] shadow-2xl overflow-hidden bg-gradient-to-br from-[#f43f5e] via-[#6366f1] to-[#4cb7e5] text-white"
//           >
//             {/* ✅ Optional Pattern Overlay */}
//             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
//             <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

//             {/* ✅ Content */}
//             <div className="relative z-10 max-w-8xl mx-auto px-6">
//               <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg tracking-tight">
//                 {course.title}
//               </h1>
//               <p className="mt-4 text-gray-100 max-w-3xl mx-auto text-lg leading-relaxed drop-shadow">
//                 {course.description}
//               </p>

//               {/* Mentor: Trainer info */}
//               {/* {course.trainer && (
//                 <div className="flex items-center justify-center gap-3 mt-6">
//                   <Image
//                     src={`${DIR.TRAINER_PROFILE_PHOTO}${course.trainer.profilePhotoTrainer}`}
//                     alt={course.trainer.fullName}
//                     className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover"
//                   />
//                   <Link
//                     to={`/mentors/m/${course.trainer._id}`}
//                     className="text-sm text-gray-100"
//                   >
//                     Taught by{" "}
//                     <span className="font-semibold">
//                       {course.trainer.fullName}
//                     </span>
//                     , {course.trainer.highestQualification}
//                   </Link>
//                 </div>
//               )} */}

//               {/* {course.trainer && course.trainer.length > 0 && (
//                 <div className="flex flex-col gap-4 mt-6">
//                   {course.trainer.map((trainer) => (
//                     <div
//                       key={trainer._id}
//                       className="flex items-center justify-center gap-3"
//                     >
//                       <Image
//                         src={`${DIR.TRAINER_PROFILE_PHOTO}${trainer.profilePhotoTrainer}`}
//                         alt={trainer.fullName}
//                         className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover"
//                       />
//                       <Link
//                         to={`/mentors/m/${trainer._id}`}
//                         className="text-sm text-gray-100"
//                       >
//                         Taught by{" "}
//                         <span className="font-semibold">
//                           {trainer.fullName}
//                         </span>
//                         , {trainer.highestQualification}
//                       </Link>
//                     </div>
//                   ))}
//                 </div>
//               )} */}

//               {course.trainer && course.trainer.length > 0 && (
//                 <div className="my-4">
//                   {/* Section Title */}
//                   <h3 className="text-xl font-bold mb-2 underline">
//                     {course.trainer.length > 1
//                       ? "Meet Your Trainers"
//                       : "Meet Your Trainer"}
//                   </h3>

//                   {/* Trainers container */}
//                   <div className="flex gap-6 overflow-x-auto no-scrollbar justify-center px-2 md:px-4">
//                     {course.trainer.map((trainer) => (
//                       <div
//                         key={trainer._id}
//                         className="group relative flex flex-col items-center min-w-[80px] duration-300 ease-in-out"
//                       >
//                         {/* Glowing ring effect */}
//                         <div className="relative mb-3">
//                           <div className="absolute -inset-1 bg-gradient-to-r from-codedrift-pink to-codedrift-blue rounded-full blur opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
//                           <Image
//                             src={`${DIR.TRAINER_PROFILE_PHOTO}${trainer.profilePhotoTrainer}`}
//                             alt={trainer.fullName}
//                             className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover relative z-10"
//                           />
//                         </div>

//                         {/* Name */}
//                         <Link
//                           to={`/mentors/m/${trainer._id}`}
//                           className="text-sm font-semibold text-white hover:underline text-center z-10"
//                           title={`View profile of ${trainer.fullName}`}
//                         >
//                           {trainer.fullName}
//                         </Link>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Course Stats */}
//               <div className="flex flex-wrap justify-center gap-4 mt-6">
//                 <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur-md shadow-md">
//                   <Calendar className="w-5 h-5 text-white" />
//                   <span className="text-sm font-medium">{course.duration}</span>
//                 </div>

//                 {/* Certificate availability */}
//                 <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur-md shadow-md">
//                   <Award className="w-5 h-5 text-white" />
//                   {course.features?.certificate && (
//                     <span>Certificate Included</span>
//                   )}
//                 </div>

//                 {/* Rating stars */}
//                 <div className="flex items-center gap-1 bg-white/10 px-3 py-2 rounded-full backdrop-blur-md shadow-md">
//                   {Array.from({ length: 5 }).map((_, i) => (
//                     <Star
//                       key={i}
//                       className="w-4 h-4 text-yellow-400 fill-yellow-400"
//                     />
//                   ))}
//                   {course.rating && <span>({course.rating}/5)</span>}
//                 </div>

//                 {/* Enrollment count */}
//                 <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur-md shadow-md">
//                   <User className="w-5 h-5 text-white" />
//                   {course.enrolledCount && (
//                     <span>{course.enrolledCount}+ Enrolled</span>
//                   )}
//                 </div>
//               </div>

//               {/* Enroll button */}
//               <div className="mt-4">
//                 <Button
//                   onClick={() => setIsEnrollModalOpen(true)}
//                   size="md"
//                   variant="gradient"
//                 >
//                   Enroll Now
//                 </Button>
//               </div>
//             </div>
//           </section>

//           {/* Section: What You'll Learn */}
//           <section className="max-w-4xl mx-auto px-6 mt-12">
//             <h2 className="text-2xl font-bold text-codedrift-indigo mb-4 text-center">
//               What You’ll Learn
//             </h2>

//             {/* Learning outcomes */}
//             <ul className="grid md:grid-cols-2 gap-3">
//               {course.learningOutcomes?.map((point, index) => (
//                 <li
//                   key={index}
//                   className="flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-3 rounded-lg shadow hover:shadow-md transition"
//                 >
//                   <CheckCircle2 className="w-5 h-5 text-codedrift-blue" />
//                   <span className="text-sm text-gray-700">{point}</span>
//                 </li>
//               ))}
//             </ul>
//           </section>

//           {/* ✅ Glassmorphic Course Details */}
//           <div className="container mt-12">
//             <article
//               className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-xl p-8 md:p-12 leading-relaxed
//              prose max-w-none prose-p:leading-relaxed prose-li:leading-relaxed
//              prose-headings:text-codedrift-indigo prose-strong:text-gray-900 hover:shadow-2xl hover:scale-[1.01] transition-all duration-500"
//               dangerouslySetInnerHTML={{ __html: course.course_info_html }}
//             />
//           </div>

//           {/* ✅ Placeholder for Future Accordion : dont delete its s video and notes section */}
//           {/* 👉 We will add "Course Curriculum Accordion" here later */}
//           {(course.videolectures?.length > 0 || course.notes?.length > 0) && (
//             <div className="container mt-16">
//               {/* ✅ Heading only when content exists */}
//               <div className="text-center mb-8">
//                 <h2 className="relative inline-block text-2xl md:text-3xl font-bold text-codedrift-indigo">
//                   Learning Resources
//                   <span className="absolute left-1/2 -bottom-1 w-2/3 h-1 bg-gradient-to-r from-[#ee4f7e] to-[#4cb7e5] rounded-full transform -translate-x-1/2"></span>
//                 </h2>
//               </div>

//               <Accordion allowMultiple>
//                 {/* ✅ Video Lectures Section */}
//                 {course.videolectures?.length > 0 && (
//                   <AccordionItem
//                     header={
//                       <div className="w-full flex flex-col gap-2 md:flex-row md:items-center justify-between bg-[#fef9f9] px-4 py-3 rounded-xl">
//                         <div className="flex items-center gap-2">
//                           <PlayCircle className="w-5 h-5 text-codedrift-pink" />
//                           <span className="text-sm sm:text-base font-semibold text-codedrift-indigo">
//                             Video Lectures
//                           </span>
//                         </div>
//                         <span className="w-fit text-xs sm:text-sm text-gray-600 bg-white border border-gray-300 px-2 py-0.5 rounded-full">
//                           {course.videolectures.length} Videos
//                         </span>
//                       </div>
//                     }
//                     expandIcon={
//                       <ChevronDown className="w-4 h-4 text-codedrift-blue" />
//                     }
//                     collapseIcon={
//                       <ChevronUp className="w-4 h-4 text-codedrift-pink" />
//                     }
//                   >
//                     <ul className="space-y-3 mt-2">
//                       {course.videolectures.map((video) => (
//                         <li
//                           key={video._id}
//                           className="flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition"
//                         >
//                           <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-700">
//                             <div className="flex items-center gap-2">
//                               <PlayCircle className="w-4 h-4 text-codedrift-indigo" />
//                               <span className="text-sm font-medium">
//                                 {video.title}
//                               </span>
//                             </div>
//                             <span className="text-xs text-gray-500">
//                               {video.duration}
//                             </span>
//                           </div>
//                           <a
//                             href={video.contentUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-sm text-codedrift-blue hover:underline"
//                           >
//                             Watch
//                           </a>
//                         </li>
//                       ))}
//                     </ul>
//                   </AccordionItem>
//                 )}

//                 {/* ✅ Notes Section */}
//                 {course.notes?.length > 0 && (
//                   <AccordionItem
//                     header={
//                       <div className="w-full flex flex-col gap-2 md:flex-row md:items-center justify-between bg-[#f0f9ff] px-4 py-3 rounded-xl">
//                         <div className="flex items-center gap-2">
//                           <FileText className="w-5 h-5 text-codedrift-blue" />
//                           <span className="text-sm sm:text-base font-semibold text-codedrift-indigo">
//                             Notes & Articles
//                           </span>
//                         </div>
//                         <span className="w-fit text-xs sm:text-sm text-gray-600 bg-white border border-gray-300 px-2 py-0.5 rounded-full">
//                           {course.notes.length} Notes
//                         </span>
//                       </div>
//                     }
//                     expandIcon={
//                       <ChevronDown className="w-4 h-4 text-codedrift-blue" />
//                     }
//                     collapseIcon={
//                       <ChevronUp className="w-4 h-4 text-codedrift-pink" />
//                     }
//                   >
//                     <ul className="space-y-3 mt-2">
//                       {course.notes.map((note) => (
//                         <li
//                           key={note._id}
//                           className="bg-white px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition"
//                         >
//                           <h4 className="text-sm font-semibold text-gray-800 mb-1">
//                             {note.title}
//                           </h4>

//                           {note.content && (
//                             <p className="text-sm text-gray-700 whitespace-pre-line mb-2">
//                               {note.content.slice(0, 300)}...
//                             </p>
//                           )}

//                           {note.file && (
//                             <div className="mt-2">
//                               <span className="text-xs font-medium text-gray-600">
//                                 Attached File:
//                               </span>
//                               <div className="mt-1">
//                                 <a
//                                   href={`${DIR.COURSE_NOTES}${note.file}`}
//                                   target="_blank"
//                                   rel="noopener noreferrer"
//                                   className="inline-block text-sm text-codedrift-blue hover:underline mt-1"
//                                 >
//                                   Open File
//                                 </a>
//                               </div>
//                             </div>
//                           )}
//                         </li>
//                       ))}
//                     </ul>
//                   </AccordionItem>
//                 )}
//               </Accordion>
//             </div>
//           )}

//           {/* ✅ Course Curriculum Accordion */}
//           {course.phases?.length > 0 && (
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
//               {/* Animated Heading */}
//               <div className="text-center mb-16">
//                 <div className="relative inline-block">
//                   <h2 className="relative text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#ee4f7e] via-[#4cb7e5] to-[#ee4f7e] bg-clip-text text-transparent animate-gradient-x mb-4">
//                     Course Curriculum
//                   </h2>
//                   <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#ee4f7e] to-[#4cb7e5] rounded-full transform scale-x-0 animate-scale-in"></div>
//                 </div>
//                 {/* <p className="text-gray-600 max-w-2xl mx-auto text-lg mt-4">
//                   🚀 Master{" "}
//                   {course.phases.reduce(
//                     (total, phase) =>
//                       total +
//                       phase.weeks.reduce(
//                         (weekTotal, week) => weekTotal + week.chapters.length,
//                         0
//                       ),
//                     0
//                   )}
//                   + topics across {course.phases.length} intensive phases
//                 </p> */}

//                 <p className="text-gray-900 max-w-5xl mx-auto text-lg mt-4 leading-relaxed">
//                   🚀 Dive into a powerful, hands-on journey through{" "}
//                   <span className="font-bold text-codedrift-indigo">
//                     {course.phases.length} in-depth phases
//                   </span>{" "}
//                   — each carefully designed to guide you from fundamentals to
//                   mastery. 💼 With over{" "}
//                   <span className="font-bold text-[#ee4f7e]">
//                     {course.phases.reduce(
//                       (total, phase) =>
//                         total +
//                         phase.weeks.reduce(
//                           (weekTotal, week) => weekTotal + week.chapters.length,
//                           0
//                         ),
//                       0
//                     )}
//                   </span>{" "}
//                   real-world topics, you won't just learn —{" "}
//                   <span className="font-semibold text-green-600">
//                     you’ll build skills that stick
//                   </span>
//                   .
//                 </p>
//               </div>

//               {/* Curriculum Container */}
//               <div className="rounded-2xl border-2 border-gray-200/50 shadow-2xl backdrop-blur-sm bg-white/95 transition-all duration-500 hover:shadow-3xl hover:border-[#4cb7e5]/30">
//                 {course.phases.map((phase, phaseIndex) => {
//                   const isPhaseOpen = expandedPhases.includes(phaseIndex);

//                   return (
//                     <div
//                       key={phase._id}
//                       className="group/phase border-b-2 border-gray-100 last:border-b-0"
//                     >
//                       {/* Phase Header - Compact */}
//                       <button
//                         onClick={() => togglePhase(phaseIndex)}
//                         className="w-full px-6 py-4 bg-gradient-to-r from-gray-50/80 to-blue-50/50 hover:from-blue-50 hover:to-purple-50/60 transition-all duration-500 cursor-pointer relative overflow-hidden"
//                       >
//                         {/* Hover BG */}
//                         <div className="absolute inset-0 bg-gradient-to-r from-[#ee4f7e]/5 to-[#4cb7e5]/5 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

//                         <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center w-full">
//                           {/* Left Side - Phase Title */}
//                           <div className="flex items-center space-x-4">
//                             <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ee4f7e] to-[#4cb7e5] flex items-center justify-center text-white font-bold text-lg shadow-md">
//                               {phaseIndex + 1}
//                             </div>
//                             <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover/phase:text-[#4cb7e5] transition-colors duration-300">
//                               {phase.title}
//                             </h3>
//                           </div>

//                           {/* Right Side - Stats */}
//                           <div className="flex flex-col items-end mt-4 lg:mt-0 space-y-1 text-md">
//                             {/* Stats */}
//                             <div className="flex gap-3 text-gray-700">
//                               <span className="flex items-center gap-1 bg-white/80 px-2.5 py-0.5 rounded-full text-sm font-medium">
//                                 📅 {phase.weeks.length} weeks
//                               </span>
//                               <span className="flex items-center gap-1 bg-white/80 px-2.5 py-0.5 rounded-full text-sm font-medium">
//                                 📚{" "}
//                                 {phase.weeks.reduce(
//                                   (total, week) => total + week.chapters.length,
//                                   0
//                                 )}{" "}
//                                 topics
//                               </span>
//                               <span
//                                 className={`transform transition-transform duration-300 ${
//                                   isPhaseOpen ? "rotate-180" : ""
//                                 }`}
//                               >
//                                 <span className="text-xl">
//                                   <ChevronDownIcon />{" "}
//                                 </span>
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </button>

//                       {/* Weeks Container - Enhanced */}
//                       {isPhaseOpen && (
//                         <div className="bg-gradient-to-br from-blue-50/30 to-purple-50/20 p-6 space-y-6 animate-slide-down">
//                           <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
//                             {phase.weeks.map((week, weekIndex) => {
//                               const key = `${phaseIndex}-${weekIndex}`;
//                               const isWeekOpen = expandedWeeks.includes(key);

//                               return (
//                                 <div
//                                   key={week._id}
//                                   className="bg-white/80 backdrop-blur-sm rounded-xl border-2 border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#4cb7e5]/40 group/week"
//                                 >
//                                   {/* Week Header */}
//                                   <button
//                                     onClick={() =>
//                                       toggleWeek(phaseIndex, weekIndex)
//                                     }
//                                     className="w-full flex justify-between items-center p-5 bg-gradient-to-r from-white to-gray-50/80 hover:from-blue-50/60 hover:to-purple-50/40 rounded-t-xl transition-all duration-300"
//                                   >
//                                     <div className="flex items-center space-x-4">
//                                       <div
//                                         className={`w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold transform transition-transform duration-300 group-hover/week:scale-105
//                                         `}
//                                       >
//                                         {weekIndex + 1}
//                                       </div>
//                                       <div className="text-left">
//                                         <h4 className="font-semibold text-gray-900 group-hover/week:text-[#4cb7e5] transition-colors">
//                                           {week.title}
//                                         </h4>
//                                       </div>
//                                     </div>

//                                     <div className="flex items-center space-x-3">
//                                       <span
//                                         className={`transform transition-transform duration-300 ${
//                                           isWeekOpen ? "rotate-180" : ""
//                                         }`}
//                                       >
//                                         <span className="text-xl">
//                                           <ChevronDownIcon />{" "}
//                                         </span>
//                                       </span>
//                                     </div>
//                                   </button>

//                                   {/* Topics - Enhanced */}
//                                   {isWeekOpen && (
//                                     <div className="p-4 space-y-3 animate-fade-in">
//                                       {week.chapters.map(
//                                         (chapter, chapterIndex) => (
//                                           <div
//                                             key={chapter._id}
//                                             className="group/topic p-4 bg-gradient-to-r from-white to-gray-50/50 transition-all duration-300 transform hover:scale-[1.02]"
//                                           >
//                                             <div className="flex items-start space-x-3">
//                                               <div className="flex-shrink-0 mt-1"></div>

//                                               <div className="flex-1">
//                                                 <div className="flex justify-between items-start">
//                                                   <div>
//                                                     <h5 className="font-semibold text-gray-900 group-hover/topic:text-[#ee4f7e] transition-colors flex items-center space-x-2">
//                                                       <span>
//                                                         {chapter.title}
//                                                       </span>
//                                                     </h5>

//                                                     {/* Learning Points - Enhanced */}
//                                                     {chapter.points?.length >
//                                                       0 && (
//                                                       <ul className="mt-3 space-y-2">
//                                                         {chapter.points.map(
//                                                           (pt, pointIndex) => (
//                                                             <li
//                                                               key={pt._id}
//                                                               className="flex items-start space-x-2 animate-fade-in-up"
//                                                               style={{
//                                                                 animationDelay: `${
//                                                                   pointIndex *
//                                                                   100
//                                                                 }ms`,
//                                                               }}
//                                                             >
//                                                               <span className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
//                                                                 <span className="text-green-500 text-md">
//                                                                   ✓
//                                                                 </span>
//                                                               </span>
//                                                               <div className="flex-1 text-md text-gray-800">
//                                                                 <span className="font-medium">
//                                                                   {pt.title}
//                                                                 </span>
//                                                                 {pt.description && (
//                                                                   <span className="text-gray-600">
//                                                                     :{" "}
//                                                                     {
//                                                                       pt.description
//                                                                     }
//                                                                   </span>
//                                                                 )}
//                                                               </div>
//                                                             </li>
//                                                           )
//                                                         )}
//                                                       </ul>
//                                                     )}
//                                                   </div>
//                                                 </div>
//                                               </div>
//                                             </div>
//                                           </div>
//                                         )
//                                       )}
//                                     </div>
//                                   )}
//                                 </div>
//                               );
//                             })}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}

//                 {/* Enhanced Summary */}
//                 <div className="bg-gradient-to-r from-[#ee4f7e]/5 to-[#4cb7e5]/5 px-8 py-6 border-t-2 border-gray-200/50">
//                   <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
//                     <div className="text-center lg:text-left">
//                       <h4 className="font-bold text-gray-900 text-lg">
//                         🎉 Complete your Learning Journey
//                       </h4>
//                       <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
//                         <span className="flex items-center space-x-1">
//                           <span>📊</span>
//                           <span>
//                             {course.phases.reduce(
//                               (total, phase) => total + phase.weeks.length,
//                               0
//                             )}{" "}
//                             weeks
//                           </span>
//                         </span>
//                         <span className="flex items-center space-x-1">
//                           <span>🎯</span>
//                           <span>
//                             {course.phases.reduce(
//                               (total, phase) =>
//                                 total +
//                                 phase.weeks.reduce(
//                                   (weekTotal, week) =>
//                                     weekTotal + week.chapters.length,
//                                   0
//                                 ),
//                               0
//                             )}{" "}
//                             topics
//                           </span>
//                         </span>
//                       </div>
//                     </div>

//                     <div className="relative flex justify-center mt-8">
//                       <img
//                         src="https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
//                         alt="Motivate"
//                         className="absolute -top-12 right-1/3 w-24 animate-bounce"
//                       />

//                       {/* CTA button code here */}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* ✅ CTA - Explore Other Courses*/}

//           {/* Simple back button that takes users to the full course list */}
//           <div className="mt-16 text-center pb-20">
//             <Button as="link" to="/courses#courses-list">
//               <ArrowLeft className="size-4" />
//               <span className="ml-2">Explore Courses</span>
//             </Button>
//           </div>
//         </div>

//         {/* ✅ Floating Enroll Strip */}
//         {!inView && (
//           <EnrollStrip
//             handleEnrollCourse={handleEnrollCourse}
//             course={course}
//           />
//         )}

//         {/* ✅ Enroll Modal
//   Triggered by either main CTA button or the enroll strip */}
//         <EnrollFormModal
//           open={isEnrollModalOpen}
//           setOpen={setIsEnrollModalOpen}
//           course={course}
//         />
//       </div>
//     </>
//   );
// };

// export default CoursePage;




import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCalendar,
  FaAward,
  FaStar,
  FaArrowLeft,
  FaCheckCircle,
  FaPlayCircle,
  FaChevronDown,
  FaChevronUp,
  FaBook,
  FaUser,
  FaGraduationCap,
  FaFileAlt,
  FaBookOpen,
  FaClock,
  FaUsers,
  FaCertificate,
  FaVideo,
  FaDownload,
  FaUniversity,
  FaChalkboardTeacher,
  FaHandsHelping,
  FaLaptopCode,
  FaProjectDiagram,
  FaCheck,
  FaArrowRight,
  FaRegCalendarCheck,
  FaRegFileAlt
} from "react-icons/fa";
import { api } from "../../apiUtils/instance";
import { getCourseById } from "./courses";
import { API_BASE_URL, DIR } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "../../apiUtils/cookieUtils";
import EnrollFormModal from "./EnrollFormModal";
import EnrollStrip from "../../components/courses/EnrollStrip";
import Image from "../../components/utility/Image";

const MotionDiv = motion.div;
const MotionLink = motion(Link);

export default function CoursePage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [showEnrollStrip, setShowEnrollStrip] = useState(false);
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
        const keyFeaturesHTML = data.keyFeatures?.map(feature => `
          <div class="mb-4">
            <h4 class="font-bold text-lg text-blue-700 mb-1">${feature.title}</h4>
            <p class="text-gray-700 mb-2">${feature.description || ''}</p>
            ${feature.subPoints?.length ? `
              <ul class="list-disc pl-5 space-y-1">
                ${feature.subPoints.map(point => `<li class="text-gray-600">${point}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
        `).join('') || '';

        const benefitsHTML = data.benefits?.map(benefit => `
          <li class="flex items-start gap-3 mb-3">
            <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span class="text-green-600 text-sm">✓</span>
            </div>
            <span class="text-gray-700">${benefit}</span>
          </li>
        `).join('') || '';

        const courseInfoHTML = `
          <div class="space-y-6">
            <div>
              <h2 class="text-3xl font-bold text-blue-900 mb-4">Course Overview</h2>
              <p class="text-gray-700 leading-relaxed text-lg">${data.overview || ''}</p>
            </div>

            ${data.keyFeatures?.length ? `
              <div class="bg-blue-50 rounded-xl p-6">
                <h3 class="text-2xl font-bold text-blue-800 mb-4">Key Features</h3>
                ${keyFeaturesHTML}
              </div>
            ` : ''}

            ${data.benefits?.length ? `
              <div>
                <h3 class="text-2xl font-bold text-blue-800 mb-4">What You'll Gain</h3>
                <ul class="space-y-2">
                  ${benefitsHTML}
                </ul>
              </div>
            ` : ''}
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
    setExpandedPhases(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  // Toggle week expansion
  const toggleWeek = (phaseIndex, weekIndex) => {
    const key = `${phaseIndex}-${weekIndex}`;
    setExpandedWeeks(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-700">Loading Course...</h2>
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

        <div className="relative max-w-8xl mx-auto px-4 lg:px-8 py-6 lg:py-8">
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
              {/* Course Badge */}
              {/* <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center">
                  <FaBookOpen className="text-white text-xl" />
                </div>
                <div>
                  <div className="text-lg font-bold">University Course</div>
                  <div className="text-xs text-blue-200">SGBAU Certified</div>
                </div>
              </div> */}

              {/* Title */}
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                {course.title}
              </h1>

              {/* Description */}
              <p className="text-xl text-blue-100 leading-relaxed">
                {course.description || "Master the skills that industry demands with our comprehensive university program."}
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
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => setIsEnrollModalOpen(true)}
                  className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  Enroll Now <FaArrowRight />
                </button>
                {/* <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3">
                  Download Syllabus
                </button> */}
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
                    <span className="text-yellow-300 text-sm font-bold">UNIVERSITY PROGRAM</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{course.title}</h3>
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
            { id: "curriculum", label: "Curriculum", icon: <FaGraduationCap /> },
            { id: "trainers", label: "Trainers", icon: <FaChalkboardTeacher /> },
            // { id: "resources", label: "Resources", icon: <FaFileAlt /> },
            { id: "outcomes", label: "Learning Outcomes", icon: <FaCheckCircle /> }
          ].map(tab => (
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
              <div dangerouslySetInnerHTML={{ __html: course.course_info_html }} />
              
              {/* Course Highlights */}
              {/* <div className="grid md:grid-cols-2 gap-8 mt-12">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FaLaptopCode className="text-blue-600" />
                    </div>
                    Hands-on Learning
                  </h3>
                  <p className="text-gray-700">
                    Practical projects and real-world applications to build job-ready skills.
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <FaProjectDiagram className="text-green-600" />
                    </div>
                    Industry Projects
                  </h3>
                  <p className="text-gray-700">
                    Work on real industry projects and build a professional portfolio.
                  </p>
                </div>
              </div> */}
            </div>
          )}

          {/* Curriculum Tab */}
          {activeTab === "curriculum" && course.phases?.length > 0 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-blue-900 mb-4">Course Curriculum</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Structured learning path designed by industry experts and university faculty
                </p>
              </div>

              <div className="space-y-6">
                {course.phases.map((phase, phaseIndex) => (
                  <div key={phase._id} className="border-2 border-blue-100 rounded-xl overflow-hidden">
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
                          <h3 className="text-xl font-bold text-gray-900">{phase.title}</h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <FaClock /> {phase.weeks?.length || 0} weeks
                            </span>
                            <span className="flex items-center gap-1">
                              <FaBook /> {phase.weeks?.reduce((total, week) => total + (week.chapters?.length || 0), 0)} topics
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={`transform transition-transform duration-300 ${expandedPhases.includes(phaseIndex) ? 'rotate-180' : ''}`}>
                        <FaChevronDown className="text-blue-600 text-xl" />
                      </div>
                    </button>

                    {/* Weeks Content */}
                    {expandedPhases.includes(phaseIndex) && (
                      <div className="p-6 bg-white space-y-4">
                        {phase.weeks?.map((week, weekIndex) => (
                          <div key={week._id} className="border border-gray-200 rounded-lg overflow-hidden">
                            <button
                              onClick={() => toggleWeek(phaseIndex, weekIndex)}
                              className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <span className="font-bold text-blue-700">W{weekIndex + 1}</span>
                                </div>
                                <h4 className="font-semibold text-gray-800">{week.title}</h4>
                              </div>
                              <div className={`transform transition-transform duration-300 ${expandedWeeks.includes(`${phaseIndex}-${weekIndex}`) ? 'rotate-180' : ''}`}>
                                <FaChevronDown className="text-gray-600" />
                              </div>
                            </button>

                            {expandedWeeks.includes(`${phaseIndex}-${weekIndex}`) && (
                              <div className="p-4 space-y-3">
                                {week.chapters?.map((chapter, chapterIndex) => (
                                  <div key={chapter._id} className="flex items-start gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors duration-300">
                                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                      <FaCheck className="text-green-600 text-xs" />
                                    </div>
                                    <div>
                                      <h5 className="font-medium text-gray-900">{chapter.title}</h5>
                                      {chapter.points?.length > 0 && (
                                        <ul className="mt-2 space-y-1">
                                          {chapter.points.slice(0, 3).map((point, pointIndex) => (
                                            <li key={point._id} className="flex items-center gap-2 text-sm text-gray-600">
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
                <h2 className="text-3xl font-bold text-blue-900 mb-4">Meet Your Trainers</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Learn from experienced professionals and university faculty members
                </p>
              </div>

              {course.trainer?.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {course.trainer.map((trainer) => (
                    <div key={trainer._id} className="bg-gradient-to-b from-white to-blue-50 rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
                      <div className="flex flex-col items-center text-center">
                        <img
                          src={`${DIR.TRAINER_PROFILE_PHOTO}${trainer.profilePhotoTrainer}`}
                          alt={trainer.fullName}
                          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mb-4"
                        />
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{trainer.fullName}</h3>
                        <p className="text-blue-600 mb-3">{trainer.highestQualification}</p>
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
                  <h3 className="text-xl font-bold text-gray-700 mb-2">Trainer Information</h3>
                  <p className="text-gray-600">Trainer details will be announced soon</p>
                </div>
              )}
            </div>
          )}

          {/* Resources Tab */}
          {/* {activeTab === "resources" && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-blue-900 mb-4">Learning Resources</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Access comprehensive study materials, videos, and notes
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Video Lectures */}
                {/* <div className="bg-gradient-to-b from-white to-blue-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FaVideo className="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Video Lectures</h3>
                      <p className="text-gray-600">Recorded sessions for flexible learning</p>
                    </div>
                  </div>
                  
                  {course.videolectures?.length > 0 ? (
                    <div className="space-y-3">
                      {course.videolectures.slice(0, 5).map((video) => (
                        <div key={video._id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors duration-300">
                          <div className="flex items-center gap-3">
                            <FaPlayCircle className="text-blue-600" />
                            <span className="font-medium text-gray-800">{video.title}</span>
                          </div>
                          <a
                            href={video.contentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Watch
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">Video lectures will be available soon</p>
                  )}
                </div> */}

                {/* Study Notes */}
                {/* <div className="bg-gradient-to-b from-white to-green-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <FaRegFileAlt className="text-green-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Study Notes</h3>
                      <p className="text-gray-600">Comprehensive reading materials</p>
                    </div>
                  </div>
                  
                  {course.notes?.length > 0 ? (
                    <div className="space-y-3">
                      {course.notes.slice(0, 5).map((note) => (
                        <div key={note._id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-green-300 transition-colors duration-300">
                          <div className="flex items-center gap-3">
                            <FaFileAlt className="text-green-600" />
                            <span className="font-medium text-gray-800">{note.title}</span>
                          </div>
                          {note.file && (
                            <a
                              href={`${DIR.COURSE_NOTES}${note.file}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center gap-1"
                            >
                              <FaDownload /> Download
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">Study notes will be available soon</p>
                  )}
                </div>
              </div>
            </div>
          )} */}

          {/* Learning Outcomes Tab */}
          {activeTab === "outcomes" && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-blue-900 mb-4">Learning Outcomes</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  What you'll achieve after completing this course
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {course.learningOutcomes?.map((outcome, index) => (
                  <div key={index} className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 border border-blue-100 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 font-bold text-lg">{index + 1}</span>
                      </div>
                      <p className="text-gray-700 font-medium">{outcome}</p>
                    </div>
                  </div>
                ))}

                {/* Career Outcomes */}
                {/* <div className="md:col-span-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border border-green-200 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <FaHandsHelping className="text-green-600" />
                    </div>
                    Career Opportunities
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-bold text-gray-800">Job Roles</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-gray-700">
                          <FaCheck className="text-green-500" /> Industry-ready professional
                        </li>
                        <li className="flex items-center gap-2 text-gray-700">
                          <FaCheck className="text-green-500" /> Technical specialist
                        </li>
                        <li className="flex items-center gap-2 text-gray-700">
                          <FaCheck className="text-green-500" /> Project manager
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-bold text-gray-800">Skills Gained</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-gray-700">
                          <FaCheck className="text-green-500" /> Practical expertise
                        </li>
                        <li className="flex items-center gap-2 text-gray-700">
                          <FaCheck className="text-green-500" /> Problem-solving
                        </li>
                        <li className="flex items-center gap-2 text-gray-700">
                          <FaCheck className="text-green-500" /> Project management
                        </li>
                      </ul>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          )}
        </div>

        {/* Course Features */}
        {/* <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <FaRegCalendarCheck className="text-blue-600 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Flexible Schedule</h3>
            <p className="text-gray-600">Learn at your own pace with recorded sessions and live classes</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <FaCertificate className="text-green-600 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">University Certificate</h3>
            <p className="text-gray-600">Earn a recognized certificate from Sant Gadge Baba Amravati University</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <FaHandsHelping className="text-purple-600 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Doubt Support</h3>
            <p className="text-gray-600">Get 24/7 doubt resolution support from faculty and mentors</p>
          </div>
        </div> */}

        {/* Final CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white shadow-xl">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of successful students who have transformed their careers with our university programs
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