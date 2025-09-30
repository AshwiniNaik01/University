import React, { useEffect, useState } from "react";
import {
  Code,
  Laptop,
  Database,
  Layers,
  Cpu,
  Terminal,
  GraduationCap,
  Calendar,
  Video,
  Palette,
  Server,
  ArrowRight,
  MoveRight,
  MoveDown,
  ChevronDown,
} from "lucide-react";
import { courseList } from "../../data/coursesList";
import { Link, useLocation } from "react-router-dom";
import Image from "../../components/utility/Image";
import {
  coursesBackendImage,
  coursesFrontendImage,
  coursesUiUxImage,
} from "../../access-assets/images";
import { coursesBgVideo } from "../../access-assets/videos";
import { Button } from "../../components/utility/Button";
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
                <span className="bg-gradient-to-r from-[#ee4f7e] to-[#4cb7e5] bg-clip-text text-transparent drop-shadow-lg">
                  Industry Leading Tech Stack
                </span>
              </h1>
              <p className="max-w-3xl mx-auto text-gray-200 text-lg leading-relaxed drop-shadow">
                "Enrolling in our courses can lead to tangible career
                advantages, including expanded job opportunities and increased
                chances for promotions."
              </p>
            </div>

            {/* ✅ Stats Boxes */}
            <div className="flex justify-center gap-6 md:gap-8 flex-wrap mb-8">
              {[
                { label: "Technologies", value: "20+" },
                { label: "Frameworks", value: "7+" },
                { label: "Design Tools", value: "6+" },
                { label: "Projects", value: "100+" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/90 backdrop-blur-md px-6 md:px-8 py-4 md:py-5 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition duration-300"
                >
                  <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#ee4f7e] to-[#4cb7e5] bg-clip-text text-transparent">
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
                className="group w-fit bg-white/30 backdrop-blur-md text-codedrift-pink font-semibold px-6 py-3 rounded-full shadow-md 
                            hover:bg-white/60 hover:text-codedrift-indigo transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto"
              >
                <div className="flex items-center justify-center">
                  <span>Explore Courses</span>
                  <ChevronDown className="size-5 text-codedrift-pink group-hover:text-codedrift-indigo animate-bounce" />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Front End Section */}
      <section
        id="courses-start"
        className="relative py-20 bg-white overflow-hidden"
      >
        {/* Decorative Gradient Circles */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-codedrift-pink/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-56 h-56 bg-codedrift-blue/10 rounded-full blur-3xl"></div>

        <div className="container">
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            {/* Left Content */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Code className="w-8 h-8 text-codedrift-pink" />
                <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#ee4f7e] to-[#4cb7e5] bg-clip-text text-transparent">
                  Front End
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                At{" "}
                <span className="text-codedrift-pink font-semibold">
                  Code Drift
                </span>
                , we offer comprehensive training in essential web development
                technologies including <strong>HTML</strong>,{" "}
                <strong>CSS</strong>, <strong>JavaScript</strong>, and modern
                frameworks like <strong>React</strong>, <strong>Angular</strong>
                , and
                <strong> Vue</strong>. Learn to build responsive websites,
                dynamic user interfaces, and single-page applications.
              </p>
            </div>
            {/* Right Image */}
            <div className="hidden md:block relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-codedrift-pink/20 to-codedrift-blue/20 blur-xl"></div>
              <Image
                src={coursesFrontendImage}
                alt="Front End Development"
                className="relative rounded-2xl shadow-xl border-2 border-transparent bg-clip-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Back End Section */}
      <section className="relative py-20 bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-codedrift-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-codedrift-pink/10 rounded-full blur-3xl"></div>

        <div className="container relative grid md:grid-cols-2 gap-10 items-center">
          {/* Left Image */}
          <div className="hidden md:block relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-codedrift-blue/20 to-codedrift-indigo/20 blur-xl"></div>
            <Image
              src={coursesBackendImage}
              alt="Back End Development"
              className="relative rounded-2xl shadow-xl border-2 border-transparent bg-clip-border"
            />
          </div>
          {/* Right Content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Server className="w-8 h-8 text-codedrift-blue" />
              <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#ee4f7e] to-[#4cb7e5] bg-clip-text text-transparent">
                Back End
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Learn backend technologies like{" "}
              <strong>Node.js with Express</strong>,{" "}
              <strong>PHP with Laravel</strong>,{" "}
              <strong>Python with Django</strong>, and{" "}
              <strong>Java with Spring Boot</strong>. Gain hands-on experience
              in building robust APIs, managing databases, and creating secure,
              scalable applications.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ UI/UX Section */}
      <section className="relative py-20 bg-white overflow-hidden">
        <div className="absolute top-0 right-10 w-64 h-64 bg-codedrift-indigo/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-codedrift-pink/10 rounded-full blur-3xl"></div>

        <div className="container relative grid md:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-8 h-8 text-codedrift-indigo" />
              <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#ee4f7e] to-[#4cb7e5] bg-clip-text text-transparent">
                UI / UX
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Master UI/UX tools like <strong>Figma</strong>,{" "}
              <strong>Adobe XD</strong>, <strong>Photoshop</strong>, and{" "}
              <strong>Illustrator</strong>. Create stunning, user-friendly
              digital experiences with expert guidance and real-world design
              principles.
            </p>
          </div>
          {/* Right Image */}
          <div className="hidden md:block relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-codedrift-indigo/20 to-codedrift-pink/20 blur-xl"></div>
            <Image
              src={coursesUiUxImage}
              alt="UI UX Design"
              className="relative rounded-2xl shadow-xl border-2 border-transparent bg-clip-border"
            />
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
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#ee4f7e] to-[#4cb7e5] bg-clip-text text-transparent">
              Our Courses
            </h2>
            <p className="text-gray-600 text-lg mt-3">
              Hands-on projects, real-world scenarios, and expert mentorship.
            </p>
          </div>

          {/* Courses Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {courses.map((course) => (
              <div
                key={course._id}
                className="relative rounded-2xl p-[2px] codedrift-gradient codedrift-gradient-animate shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-2 duration-300"
              >
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 h-full flex flex-col justify-between">
                  {/* Course Title */}
                  <div className="flex items-center mb-4">
                    <h3 className="text-lg font-semibold text-codedrift-indigo">
                      {course.title}
                    </h3>
                  </div>

                  {/* Course Info */}
                  <ul className="text-gray-700 text-sm space-y-2 mb-5">
                    <li className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-codedrift-pink" />
                      {course.duration}
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

                  {/* Button */}
                  <Button
                    as="link"
                    to={`/courses/c/${course._id}`}
                    variant="pink"
                    className="group w-full flex items-center justify-center gap-2 bg-codedrift-pink text-white rounded-full font-semibold shadow-md
                    transition-all duration-300 hover:bg-gradient-to-r hover:from-codedrift-pink hover:to-codedrift-blue hover:shadow-lg hover:scale-105"
                  >
                    Start Learning
                    <MoveRight className="w-5 h-5 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-x-125" />
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
