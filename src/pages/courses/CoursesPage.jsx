import {
  Calendar,
  CheckCircle,
  ChevronDown,
  Clock,
  GraduationCap,
  Laptop,
  MoveRight,
  PlayCircle,
  Video,
} from "lucide-react";
import { useEffect, useState } from "react";
import { FaBookReader, FaGraduationCap, FaUserGraduate } from "react-icons/fa";
import { coursesBgVideo } from "../../access-assets/videos";
import { Button } from "../../components/utility/Button";
import Image from "../../components/utility/Image";
import useScrollToHash from "../../hooks/useScrollToHash";
import { getAllCourses } from "./courses";

// CoursesPage

// This page serves as the main landing and promotional page for all courses.

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await getAllCourses();
      setCourses(data);
    };
    fetchCourses();
  }, []);

  useScrollToHash();

  return (
    <>
      <section className="relative min-h-dvh flex items-center text-center overflow-hidden">
        {/* ✅ Background Video */}
        <video
          src={coursesBgVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        ></video>

        {/* ✅ Dark Overlay */}
        <div className="absolute inset-0 bg-[#00000099]"></div>

        {/* ✅ Foreground Content */}
        <div className="relative z-10 container">
          <div className="h-full flex flex-col md:justify-center">
            {/* ✅ Heading moved slightly up */}
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-xl mb-3">
                Advance Your Career With <br />
                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg">
                  World-Class Education & Skills
                </span>
              </h1>
              <p className="max-w-3xl mx-auto text-gray-200 text-lg leading-relaxed drop-shadow">
                Sant Gadge Baba Amravati University provides a transformative
                learning experience, equipping students with in-demand knowledge
                and practical skills to excel in their chosen careers and
                contribute meaningfully to society.
              </p>
            </div>

            {/* ✅ Stats Boxes */}
            <div className="flex justify-center gap-6 md:gap-8 flex-wrap mb-8">
              {[
                { label: "Departments", value: "15+" },
                { label: "Research Labs", value: "25+" },
                { label: "Student Clubs", value: "12+" },
                { label: "Annual Projects", value: "200+" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/90 backdrop-blur-md px-6 md:px-8 py-4 md:py-5 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition duration-300"
                >
                  <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-gray-700 text-xs md:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* ✅ Explore Button */}
            <div>
              <Button
                as="hashlink"
                smooth
                to="/courses#courses-list"
                className="group w-fit bg-white/60 backdrop-blur-md text-codedrift-indigo font-semibold px-6 py-3 rounded-full shadow-md 
                            hover:bg-white/80 hover:text-codedrift-indigo transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto"
              >
                <div className="flex items-center justify-center">
                  <span>Explore Courses</span>
                  <ChevronDown className="size-5 text-codedrift-indigo group-hover:text-codedrift-indigo animate-bounce" />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section
        id="courses-start"
        className="relative py-20 bg-white overflow-hidden"
      >
        {/* Decorative Gradient Circles */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-56 h-56 bg-orange-400/10 rounded-full blur-3xl"></div>

        <div className="container space-y-20">
          {/* Undergraduate Section */}
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            {/* Left Content */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FaGraduationCap className="w-8 h-8 text-indigo-900" />
                <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 bg-clip-text text-transparent">
                  Undergraduate Programs
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                SGBAU offers a variety of undergraduate courses including:
                <strong>B.A. (Arts)</strong> – Marathi, English, History,
                Political Science, Sociology, Economics.
                <br />
                <strong>B.Sc. (Science)</strong> – Physics, Chemistry, Biology,
                Mathematics, Computer Science.
                <br />
                <strong>B.Com.</strong> – Commerce.
                <br />
                <strong>B.Tech / BE</strong> – Engineering.
                <br />
                <strong>B.Pharm.</strong> – Pharmacy.
                <br />
                <strong>BCA</strong> – Computer Applications.
                <br />
                <strong>B.Ed.</strong> – Education.
                <br />
                <strong>LL.B.</strong> – Law (via affiliated colleges).
                <br />
                And other programs like BBA, BMLT, etc.
              </p>
            </div>
            {/* Right Image */}
            <div className="hidden md:block relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-yellow-200/20 to-orange-300/20 blur-xl"></div>
              <Image
                // src={coursesFrontendImage}
                src="https://img.freepik.com/free-vector/flat-graduate-students-mantle-cap-holding-university-diploma-paper-scroll-happy-young-people-academic-gown-with-bachelor-degree-celebrating-graduation-from-college-university-high-school_88138-929.jpg?semt=ais_hybrid&w=740&q=80"
                alt="Undergraduate Programs"
                className="relative rounded-2xl shadow-xl border-2 border-transparent bg-clip-border"
              />
            </div>
          </div>

          {/* Postgraduate Section */}
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            {/* Left Image */}
            <div className="hidden md:block relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-200/20 to-yellow-300/20 blur-xl"></div>
              <Image
                // src={coursesBackendImage}
                src="https://static.vecteezy.com/system/resources/previews/047/072/777/non_2x/a-graduate-student-celebrates-their-achievement-with-a-trophy-books-and-a-globe-this-illustration-represents-the-hard-work-dedication-and-knowledge-gained-throughout-their-studies-free-vector.jpg"
                alt="Postgraduate Programs"
                className="relative rounded-2xl shadow-xl border-2 border-transparent bg-clip-border"
              />
            </div>
            {/* Right Content */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FaUserGraduate className="w-8 h-8 text-indigo-900" />
                <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 bg-clip-text text-transparent">
                  Postgraduate Programs
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Popular PG courses include:
                <strong>M.A.</strong> – Economics, Sociology, History, Marathi,
                Psychology, Ambedkar Thought, Lifelong Learning.
                <br />
                <strong>M.Sc.</strong> – Computer Science, Geology, Home
                Science, Food Science, Zoology, Biotechnology, Physics,
                Chemistry.
                <br />
                <strong>M.Com.</strong> – Commerce.
                <br />
                <strong>MBA</strong> – Finance, Marketing, HR, Operations.
                <br />
                <strong>MCA</strong> – Computer Applications.
                <br />
                <strong>M.Ed.</strong> – Education.
                <br />
                <strong>LL.M.</strong> – Law.
                <br />
                <strong>M.Tech.</strong> – Technology specializations.
              </p>
            </div>
          </div>

          {/* Diploma & Certificate Section */}
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            {/* Left Content */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FaBookReader className="w-8 h-8 text-indigo-900" />
                <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 bg-clip-text text-transparent">
                  Doctoral & Research Programs
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                SGBAU offers doctoral and research programs across a variety of
                disciplines including:
                <strong>Ph.D. in Economics</strong> – Advanced research in
                economic theory and applications.
                <br />
                <strong>Ph.D. in Physics</strong> – Specializations in
                theoretical and experimental physics.
                <br />
                <strong>Ph.D. in Zoology</strong> – Research in animal biology
                and related fields.
                <br />
                <strong>Ph.D. in Computer Science</strong> – Cutting-edge
                research in computing and AI.
                <br />
                <strong>Ph.D. in Geology</strong> – Studies in earth sciences
                and environmental geology.
                <br />
                <strong>Ph.D. in Education</strong> – Research in pedagogy,
                curriculum, and educational development.
                <br />
                <strong>Ph.D. in Commerce</strong> – Advanced studies in
                business, finance, and management.
                <br />
                Admissions are generally based on master’s degree eligibility
                and entrance exams like <strong>NET/SET/University PAT</strong>.
              </p>
            </div>
            {/* Right Image */}
            <div className="hidden md:block relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-yellow-200/20 to-orange-300/20 blur-xl"></div>
              <Image
                // src={coursesUiUxImage}
                src="https://static.vecteezy.com/system/resources/previews/001/890/904/non_2x/female-and-male-nurse-and-doctors-with-uniforms-and-masks-design-free-vector.jpg"
                alt="Diploma & Certificate Programs"
                className="relative rounded-2xl shadow-xl border-2 border-transparent bg-clip-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Premium Courses Grid */}
      <section
        id="courses-list"
        className="relative py-20 bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] overflow-hidden"
      >
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-codedrift-pink/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-codedrift-blue/10 rounded-full blur-3xl"></div>

        <div className="container relative z-10">
          {/* Section Heading */}
          <div className="max-w-6xl mx-auto text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 font-serif bg-clip-text text-transparent">
              Our Courses
            </h2>
            <p className="text-gray-600 text-lg mt-3">
              A curriculum enriched with applied projects, real-world
              challenges, and mentorship from distinguished professionals.
            </p>
          </div>

          {/* Courses Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {courses.map((course) => (
              <div
                key={course._id}
                className="group relative rounded-2xl p-[2px]
  bg-gradient-to-r from-blue-900 via-blue-500 to-blue-900
  bg-[length:200%_200%] codedrift-gradient-animate
  shadow-xl hover:shadow-[0_25px_60px_-12px_rgba(37,99,235,0.6)]
  transition-all duration-500 hover:-translate-y-3"
              >
                <div
                  className="relative bg-white/85 backdrop-blur-xl rounded-2xl p-6 h-full flex flex-col justify-between
ring-1 ring-white/40 overflow-hidden"
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-700" />
                  {/* Course Title */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-blue-900 tracking-tight group-hover:text-blue-700 transition">
                      {course.title}
                    </h3>

                    {/* Batch status (show if batches exist) */}
                    {course.batches && course.batches.length > 0 && (
                      <span
                        className={`inline-flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-full
border shadow-sm backdrop-blur-md animate-pulse
${
  course.batches[0].status === "Upcoming"
    ? "bg-yellow-100/80 text-yellow-800 border-yellow-300"
    : course.batches[0].status === "Ongoing"
    ? "bg-green-100/80 text-green-800 border-green-300"
    : "bg-gray-100/80 text-gray-700 border-gray-300"
}`}
                      >
                        {/* Dynamic icon */}
                        {course.batches[0].status === "Upcoming" && (
                          <Clock className="w-4 h-4" />
                        )}
                        {course.batches[0].status === "Ongoing" && (
                          <PlayCircle className="w-4 h-4 animate-pulse" />
                        )}
                        {course.batches[0].status === "Completed" && (
                          <CheckCircle className="w-4 h-4 text-green-700" />
                        )}
                        {course.batches[0].status}
                      </span>
                    )}
                  </div>

                  {/* Course Info */}
                  <ul className="text-gray-700 text-sm space-y-2 mb-5">
                    <li className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">{course.duration}</span>
                    </li>

                    {course.features?.certificate && (
                      <li className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-codedrift-blue" />
                        Professional Certificate
                      </li>
                    )}
                    {course.features?.codingExercises && (
                      <li className="flex items-center gap-2">
                        <Laptop className="w-4 h-4 text-codedrift-indigo" />
                        Coding Exercises
                      </li>
                    )}
                    {course.features?.recordedLectures && (
                      <li className="flex items-center gap-2">
                        <Video className="w-4 h-4 text-codedrift-pink" />
                        Recorded Lectures
                      </li>
                    )}
                  </ul>

                  <Button
                    as="link"
                    to={`/courses/c/${course._id}`}
                    className="group w-full flex items-center justify-center gap-2
  bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400
  text-gray-900 rounded-full font-bold shadow-lg
  transition-all duration-300 hover:shadow-[0_10px_40px_rgba(234,179,8,0.6)]
  hover:scale-105"
                  >
                    Start Learning
                    <MoveRight className="w-5 h-5 transition-all duration-300 group-hover:translate-x-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CoursesPage;
