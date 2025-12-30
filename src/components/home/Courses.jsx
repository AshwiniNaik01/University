import { motion } from "framer-motion";
import { Code, Rocket, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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