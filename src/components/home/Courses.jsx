import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Code, Rocket, Smartphone } from "lucide-react";
import { getAllCourses } from "../../pages/courses/courses";

const MotionLink = motion(Link);

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [upcomingCourses, setUpcomingCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();

        const mappedCourses = data.map((course) => ({
          ...course,
          title: course.title,
          desc: `${course.duration} • ${
            course.features.certificate ? "Certificate" : ""
          }${course.features.codingExercises ? " • Coding Exercises" : ""}${
            course.features.recordedLectures ? " • Recorded Lectures" : ""
          }`,
          icon: course.title.toLowerCase().includes("mern") ? (
            <Code className="w-6 h-6 text-codedrift-pink" />
          ) : course.title.toLowerCase().includes("java") ? (
            <Rocket className="w-6 h-6 text-codedrift-indigo" />
          ) : (
            <Smartphone className="w-6 h-6 text-codedrift-blue" />
          ),
          link: `#${course._id}`,
        }));

        // ✅ Filter upcoming courses (leave logic as-is)
        const upcoming = mappedCourses.filter(
          (course) =>
            course.batches &&
            Array.isArray(course.batches) &&
            course.batches[0]?.status === "Upcoming"
        );
        setUpcomingCourses(upcoming);

        // ✅ Randomize the full course list
        const shuffledCourses = [...mappedCourses].sort(
          () => Math.random() - 0.5
        );
        setCourses(shuffledCourses);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setCourses([]);
        setUpcomingCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">Loading courses...</div>
    );
  }

  return (
    <section className="relative bg-gradient-to-br from-[#fbfdfd] to-[#ebedee] py-10 overflow-hidden">
      <div className="container">
        {/* Decorative Background Elements */}
        <img
          src="https://cdn.svgporn.com/logos/react.svg"
          alt=""
          className="absolute top-10 left-10 w-24 opacity-10 rotate-12"
        />
         <img
          src="https://png.pngtree.com/element_pic/00/16/09/0157c78593038f9.jpg"
          alt="HTML"
          className="absolute top-1/3 right-55 w-40 opacity-10 -rotate-12"
        />
        <img
          src="https://cdn.svgporn.com/logos/javascript.svg"
          alt=""
          className="absolute bottom-12 right-12 w-28 opacity-10 rotate-6"
        />
        <img
          src="https://cdn.svgporn.com/logos/html-5.svg"
          alt="HTML"
          className="absolute top-1/3 right-8 w-20 opacity-10 -rotate-12"
        />
           <img
          src="https://cdn-icons-png.flaticon.com/512/10270/10270032.png"
          alt="HTML"
          className="absolute bottom-1/3 left-55 w-40 opacity-10 -rotate-12"
        />

            <img
          src="https://png.pngtree.com/png-vector/20240527/ourlarge/pngtree-app-icon-with-vibrant-colored-colors-vector-png-image_6941767.png"
          alt="HTML"
          className="absolute bottom-1/3 right-55 w-40 opacity-10 -rotate-12"
        />
        <img
          src="https://cdn.svgporn.com/logos/python.svg"
          alt="Python"
          className="absolute top-1/4 left-1/3 w-24 opacity-10 rotate-3"
        />
        <img
          src="https://cdn.svgporn.com/logos/java.svg"
          alt="Java"
          className="absolute bottom-1/4 left-1/4 w-24 opacity-10 -rotate-6"
        />
        <img
          src="https://cdn.svgporn.com/logos/mysql.svg"
          alt="MySQL"
          className="absolute bottom-10 left-10 w-24 opacity-10 rotate-6"
        />
        <img
          src="https://cdn.svgporn.com/logos/mongodb-icon.svg"
          alt="MongoDB"
          className="absolute top-16 right-1/4 w-20 opacity-10 rotate-12"
        />
        <img
          src="https://cdn.svgporn.com/logos/tensorflow.svg"
          alt="Machine Learning"
          className="absolute bottom-1/3 right-1/3 w-20 opacity-10 rotate-6"
        />
        <img
          src="https://cdn.svgporn.com/logos/artificial-intelligence.svg"
          alt="AI"
          className="absolute top-1/2 left-1/2 w-24 opacity-10 -rotate-12"
        />

        {/* Colored Blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-codedrift-pink opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-codedrift-blue opacity-10 rounded-full blur-3xl"></div>

        {/* Main Content */}
        <div className="text-center relative z-10">
          {/* ✅ UPCOMING COURSES */}
          {upcomingCourses.length > 0 && (
            <>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 relative inline-block">
                Upcoming Courses
                <span className="absolute left-1/2 -bottom-2 w-2/3 h-1  bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-full transform -translate-x-1/2"></span>
              </h2>
              <p className="text-lg text-gray-600 mb-16">
                Plan ahead and secure your spot in these upcoming programs.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 text-left mb-20">
                {upcomingCourses.map((course, i) => (
                  <motion.div
                    key={i}
                    className="bg-white/30 p-8 rounded-2xl border border-gray-100 shadow-md transition relative overflow-hidden backdrop-blur"
                    initial={{ scale: 1 }}
                    animate={{
                      boxShadow: [
                        "0px 20px 40px rgba(238,79,126,0.5)", // pink (bottom)
                        "20px 0px 50px rgba(76,183,229,0.5)", // blue (right)
                        "0px -20px 50px rgba(57,73,171,0.5)", // indigo (top)
                        "-20px 0px 50px rgba(238,79,126,0.5)", // pink (left)
                        "0px 20px 40px rgba(238,79,126,0.5)", // back to bottom
                      ],
                    }}
                    transition={{
                      boxShadow: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    whileHover={{
                      scale: 1.05,
                      transition: {
                        duration: 0.2,
                        ease: "easeOut",
                      },
                    }}
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900"></div>
                    <div className="absolute top-3 right-3 animate-bounce bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full shadow-sm border border-yellow-300">
                      Upcoming
                    </div>

                    {/* <motion.div
  className="absolute top-3 right-3 bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm border border-yellow-300"
  animate={{ scale: [1, 1.05, 1] }}
  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
>
  Upcoming
</motion.div> */}

                    <div className="flex items-center gap-3 mb-3">
                      {course.icon}
                      <h3 className="text-lg font-semibold text-codedrift-indigo">
                        {course.title}
                      </h3>
                    </div>

                    <p className="text-gray-600 mb-3">{course.desc}</p>
                    <p className="text-sm text-gray-900 mb-4">
                      <strong>Start Date:</strong>{" "}
                      {course.batches.find((b) => b.status === "Upcoming")
                        ?.startDate || "TBA"}
                    </p>

                    <Link
                      to={`/courses/c/${course._id}`}
                      className="text-blue-900 font-medium hover:underline flex items-center gap-1"
                    >
                      Explore Course →
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {/* ✅ MAIN COURSES SECTION */}

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 relative inline-block">
            Our Courses
            <span className="absolute left-1/2 -bottom-2 w-2/3 h-1 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-full transform -translate-x-1/2"></span>
          </h2>

          <p className="text-lg text-gray-600 mb-16">
            Programs designed to help you upskill, build real-world projects,
            and stay ahead in your tech career.
          </p>

          {/* Course Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
            {courses.slice(0, 3).map((course, i) => (
              <motion.div
                key={i}
                className="bg-white/30 p-8 rounded-2xl border border-gray-100 shadow-md hover:shadow-2xl transition relative overflow-hidden backdrop-blur"
                whileHover={{
                  rotate: [-1, 1, 0],
                  scale: 1.05,
                  boxShadow: [
                    "0 15px 30px rgba(238,79,126,0.25)",
                    "0 18px 36px rgba(76,183,229,0.25)",
                    "0 20px 40px rgba(57,73,171,0.25)",
                  ],
                  transition: { duration: 0.4 },
                }}
              >
                {/* Top Border Gradient Strip */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900"></div>

                {/* Icon + Title */}
                <div className="flex items-center gap-3 mb-3">
                  {course.icon}
                  <h3 className="text-lg font-semibold text-codedrift-indigo">
                    {course.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-5">{course.desc}</p>

                {/* Link */}
                <Link
                  to="/courses#courses-list"
                  className="text-blue-900 font-medium hover:underline flex items-center gap-1"
                >
                  Explore Course →
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-14">
            <MotionLink
              to="/courses#courses-list"
              whileHover={{ y: -4 }}
              className="inline-block bg-codedrift-indigo text-white font-medium px-8 py-4 rounded-full shadow-lg hover:bg-codedrift-indigo-dark hover:scale-105 transition-transform"
            >
              Browse All Programs
            </MotionLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;


// // CoursesSection.jsx
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FaClock, FaCertificate, FaArrowRight } from "react-icons/fa";
// import { Code, Rocket, Smartphone } from "lucide-react";
// import { getAllCourses } from "../../pages/courses/courses";

// const MotionLink = motion(Link);
// const MotionDiv = motion.div;

// export default function CoursesSection() {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [upcomingCourses, setUpcomingCourses] = useState([]);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const data = await getAllCourses();

//         const mappedCourses = data.map((course) => ({
//           ...course,
//           title: course.title,
//           desc: `${course.duration} • ${
//             course.features.certificate ? "Certificate" : ""
//           }${course.features.codingExercises ? " • Coding Exercises" : ""}${
//             course.features.recordedLectures ? " • Recorded Lectures" : ""
//           }`,
//           icon: course.title.toLowerCase().includes("mern") ? (
//             <Code className="w-6 h-6 text-red-500" />
//           ) : course.title.toLowerCase().includes("java") ? (
//             <Rocket className="w-6 h-6 text-blue-500" />
//           ) : (
//             <Smartphone className="w-6 h-6 text-green-500" />
//           ),
//         }));

//         const upcoming = mappedCourses.filter(
//           (course) =>
//             course.batches &&
//             Array.isArray(course.batches) &&
//             course.batches[0]?.status === "Upcoming"
//         );
//         setUpcomingCourses(upcoming);

//         setCourses(mappedCourses.sort(() => Math.random() - 0.5));
//       } catch (err) {
//         console.error("Error fetching courses:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   if (loading) {
//     return (
//       <div className="py-20 text-center text-gray-500">
//         Loading courses...
//       </div>
//     );
//   }

//   return (
//     <section className="relative bg-gradient-to-br from-white to-blue-50 py-16 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
//         {/* Section Heading */}
//         <h2 className="text-4xl font-extrabold text-gray-800 mb-4 relative inline-block">
//           Our Courses
//           <span className="absolute left-1/2 -bottom-2 w-2/3 h-1 bg-codedrift-gradient rounded-full transform -translate-x-1/2"></span>
//         </h2>
//         <p className="text-lg text-gray-600 mb-16">
//           Explore our programs designed to help you upskill, build projects, and stay ahead.
//         </p>

//         {/* Courses Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {courses.map((course, i) => (
//             <MotionDiv
//               key={i}
//               whileHover={{ scale: 1.05, y: -5 }}
//               className="relative bg-white/20 backdrop-blur-md rounded-2xl border border-transparent hover:border-transparent shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300"
//             >
//               {/* Gradient Top Strip */}
//               <div className="absolute top-0 left-0 w-full h-1 bg-codedrift-gradient"></div>

//               <div className="p-6">
//                 <div className="flex items-center gap-3 mb-3">
//                   {course.icon}
//                   <h3 className="text-lg font-bold text-gray-800">{course.title}</h3>
//                 </div>
//                 <p className="text-gray-700 mb-5">{course.desc}</p>

//                 <div className="flex items-center justify-between text-sm text-gray-600">
//                   <span className="flex items-center gap-1">
//                     <FaClock /> {course.duration}
//                   </span>
//                   {course.features.certificate && (
//                     <span className="flex items-center gap-1">
//                       <FaCertificate /> Certificate
//                     </span>
//                   )}
//                   <Link
//                     to={`/courses/c/${course._id}`}
//                     className="text-blue-600 font-medium hover:underline flex items-center gap-1"
//                   >
//                     Explore <FaArrowRight className="text-xs" />
//                   </Link>
//                 </div>

//                 {/* Upcoming Badge */}
//                 {course.batches?.[0]?.status === "Upcoming" && (
//                   <span className="absolute top-4 right-4 px-3 py-1 text-yellow-800 bg-yellow-100 rounded-full text-xs font-bold shadow-sm">
//                     Upcoming
//                   </span>
//                 )}
//               </div>
//             </MotionDiv>
//           ))}
//         </div>

//         {/* Browse All Button */}
//         <div className="mt-14">
//           <MotionLink
//             to="/courses"
//             whileHover={{ scale: 1.05, y: -2 }}
//             whileTap={{ scale: 0.95 }}
//             className="inline-block bg-codedrift-gradient text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
//           >
//             Browse All Courses
//           </MotionLink>
//         </div>
//       </div>
//     </section>
//   );
// }




// // CoursesSection.jsx
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FaClock, FaCertificate, FaPlayCircle, FaArrowRight } from "react-icons/fa";
// import { Code, Rocket, Smartphone } from "lucide-react";
// // import { getAllCourses } from "../../api/courseApi";
// import { getAllCourses } from "../../pages/courses/courses";

// const MotionLink = motion(Link);
// const MotionDiv = motion.div;

// export default function Courses() {
//   const [courses, setCourses] = useState([]);
//   const [upcomingCourses, setUpcomingCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const data = await getAllCourses();
//         const mappedCourses = data.map((course) => ({
//           ...course,
//           title: course.title,
//           desc: `${course.duration} • ${
//             course.features.certificate ? "Certificate" : ""
//           }${course.features.codingExercises ? " • Coding Exercises" : ""}${
//             course.features.recordedLectures ? " • Recorded Lectures" : ""
//           }`,
//           icon: course.title.toLowerCase().includes("mern") ? (
//             <Code className="w-6 h-6 text-red-500" />
//           ) : course.title.toLowerCase().includes("java") ? (
//             <Rocket className="w-6 h-6 text-blue-500" />
//           ) : (
//             <Smartphone className="w-6 h-6 text-green-500" />
//           ),
//         }));

//         const upcoming = mappedCourses.filter(
//           (course) =>
//             course.batches &&
//             Array.isArray(course.batches) &&
//             course.batches[0]?.status === "Upcoming"
//         );
//         setUpcomingCourses(upcoming);

//         const shuffledCourses = [...mappedCourses].sort(() => Math.random() - 0.5);
//         setCourses(shuffledCourses);
//       } catch (err) {
//         console.error("Error fetching courses:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   if (loading) {
//     return (
//       <div className="py-20 text-center text-gray-500">
//         Loading courses...
//       </div>
//     );
//   }

//   return (
//     <section className="py-20 bg-gradient-to-br from-white to-blue-50">
//       <div className="max-w-7xl mx-auto px-4 lg:px-8">
//         {/* Upcoming Courses */}
//         {upcomingCourses.length > 0 && (
//           <div className="mb-20">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
//                 Upcoming <span className="text-blue-600">Courses</span>
//               </h2>
//               <p className="text-gray-600 text-lg max-w-3xl mx-auto">
//                 Plan ahead and secure your spot in these upcoming programs
//               </p>
//             </div>

//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {upcomingCourses.slice(0, 3).map((course, i) => (
//                 <MotionDiv
//                   key={i}
//                   whileHover={{ y: -10 }}
//                   className="bg-white rounded-2xl border-2 border-blue-200 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
//                 >
//                   <div className="p-6">
//                     <div className="flex justify-between items-start mb-4">
//                       <div className="flex items-center gap-3">
//                         {course.icon}
//                         <h3 className="text-lg font-bold text-gray-800">{course.title}</h3>
//                       </div>
//                       <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">
//                         Upcoming
//                       </span>
//                     </div>
//                     <p className="text-gray-600 mb-4">{course.desc}</p>
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm text-gray-700">
//                         <FaClock className="inline mr-1" /> Starts:{" "}
//                         {course.batches.find((b) => b.status === "Upcoming")?.startDate || "TBA"}
//                       </span>
//                       <Link
//                         to={`/courses/c/${course._id}`}
//                         className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1"
//                       >
//                         Details <FaArrowRight className="text-xs" />
//                       </Link>
//                     </div>
//                   </div>
//                 </MotionDiv>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Featured Courses */}
//         <div className="text-center mb-16">
//           <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
//             Featured <span className="text-blue-600">Courses</span>
//           </h2>
//           <p className="text-gray-600 text-lg max-w-3xl mx-auto">
//             Explore our comprehensive academic programs
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8">
//           {courses.slice(0, 3).map((course, i) => (
//             <MotionDiv
//               key={i}
//               whileHover={{ y: -10 }}
//               className="bg-white rounded-2xl border-2 border-blue-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
//             >
//               <div className="p-6">
//                 <div className="flex items-center gap-3 mb-4">
//                   {course.icon}
//                   <h3 className="text-lg font-bold text-gray-800">{course.title}</h3>
//                 </div>
//                 <p className="text-gray-600 mb-6">{course.desc}</p>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4 text-sm text-gray-600">
//                     <span className="flex items-center gap-1">
//                       <FaClock /> {course.duration}
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <FaCertificate /> Certificate
//                     </span>
//                   </div>
//                   <Link
//                     to={`/courses/c/${course._id}`}
//                     className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1"
//                   >
//                     Explore <FaArrowRight className="text-xs" />
//                   </Link>
//                 </div>
//               </div>
//             </MotionDiv>
//           ))}
//         </div>

//         <div className="text-center mt-12">
//           <MotionLink
//             to="/courses"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
//           >
//             Browse All Courses <FaArrowRight />
//           </MotionLink>
//         </div>
//       </div>
//     </section>
//   );
// }