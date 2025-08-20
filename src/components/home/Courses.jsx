import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Code, Rocket, Smartphone } from "lucide-react";
import { getAllCourses } from "../../pages/courses/courses";

const MotionLink = motion(Link);

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        // Map API data to include icons and description
        const mappedCourses = data.map((course) => ({
          title: course.title,
          desc: `${course.duration} • ${
            course.features.certificate ? "Certificate" : ""
          } ${course.features.codingExercises ? " • Coding Exercises" : ""} ${
            course.features.recordedLectures ? "• Recorded Lectures" : ""
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
        setCourses(mappedCourses);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setCourses([]);
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
    <section className="relative bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] py-20 overflow-hidden">
      <div className="container">
        {/* Decorative Background Elements */}
        <img
          src="https://cdn.svgporn.com/logos/react.svg"
          alt=""
          className="absolute top-10 left-10 w-24 opacity-10 rotate-12"
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
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 relative inline-block">
            Our Courses
            <span className="absolute left-1/2 -bottom-2 w-2/3 h-1 bg-codedrift-gradient rounded-full transform -translate-x-1/2"></span>
          </h2>

          <p className="text-lg text-gray-600 mb-16">
            Programs designed to help you upskill, build real-world projects,
            and stay ahead in your tech career.
          </p>

          {/* Course Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
            {courses.map((course, i) => (
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
                <div className="absolute top-0 left-0 w-full h-1 bg-codedrift-gradient"></div>

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
                  to={course.link}
                  className="text-codedrift-pink font-medium hover:underline flex items-center gap-1"
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
