
// import React from "react";
// import { Link } from "react-router-dom";
// import { Code, Cpu, Database, CircuitBoard, Brain } from "lucide-react";
// import Image from "../../components/utility/Image";
// import {
//   aboutBgImage,
//   codingIllustrationImage,
// } from "../../access-assets/images";
// import MissionsVision from "../../components/about/MissionsVision";
// import Values from "../../components/about/Values";
// import { Button } from "../../components/utility/Button";

// const AboutPage = () => {
//   return (
//     <div className="overflow-x-hidden">
//       {/* ✅ Hero Section */}
//       <section className="relative min-h-dvh flex items-center overflow-hidden bg-gradient-to-br from-[#fdfbfb] via-[#f7f9fc] to-[#f0f4f8] text-gray-800 py-16 px-4 sm:px-6 lg:px-8">
//         {/* Background Pattern */}
//         <div
//           className="absolute inset-0 opacity-[0.06] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat"
//           style={{ backgroundSize: "300px 300px" }}
//         ></div>
//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-br from-[#ee4f7e0d] via-[#4cb7e50d] to-transparent"></div>

//         {/* Main Content */}
//         <div className="relative z-10 max-w-5xl mx-auto text-center">
//           <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-codedrift-indigo">
//             About <span className="text-codedrift-pink">Code Drift</span>
//           </h1>
//           <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
//             Empowering developers through immersive, project-based learning.
//             Master 🔥{" "}
//             <span className="text-codedrift-blue font-semibold">MERN</span>,
//             <span className="text-codedrift-blue font-semibold"> Java FSD</span>
//             , and
//             <span className="text-codedrift-blue font-semibold">
//               {" "}
//               Python
//             </span>{" "}
//             with hands-on guidance from industry experts.
//           </p>

//           {/* Feature Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
//             <div className="p-6 bg-white/70 backdrop-blur-lg rounded-xl shadow hover:shadow-lg transition">
//               <h3 className="text-codedrift-pink text-lg font-semibold mb-2">
//                 💡 Hands-On Projects
//               </h3>
//               <p className="text-gray-700 text-sm">
//                 Learn by building real-world apps & simulations.
//               </p>
//             </div>
//             <div className="p-6 bg-white/70 backdrop-blur-lg rounded-xl shadow hover:shadow-lg transition">
//               <h3 className="text-codedrift-blue text-lg font-semibold mb-2">
//                 🎯 Expert Mentors
//               </h3>
//               <p className="text-gray-700 text-sm">
//                 Learn directly from seasoned software professionals.
//               </p>
//             </div>
//             <div className="p-6 bg-white/70 backdrop-blur-lg rounded-xl shadow hover:shadow-lg transition">
//               <h3 className="text-codedrift-indigo text-lg font-semibold mb-2">
//                 🌐 Flexible Learning
//               </h3>
//               <p className="text-gray-700 text-sm">
//                 Join live online, self-paced, or classroom sessions.
//               </p>
//             </div>
//           </div>

//           <Button as="link" to="/courses" variant="gradient" className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-black">
//             Explore Our Courses
//           </Button>
//         </div>


//         {/* Floating Icons */}
//         <div className="pointer-events-none absolute inset-0 overflow-hidden">
//           <Code className="hidden md:block absolute top-10 left-1/4 w-16 h-16 text-codedrift-pink/20 animate-pulse" />
//           <Cpu className="absolute bottom-10 right-1/3 w-20 h-20 text-codedrift-blue/20 animate-ping" />
//           <Database className="absolute top-1/2 left-10 w-14 h-14 text-codedrift-indigo/20 animate-bounce" />
//           <CircuitBoard className="absolute bottom-20 left-1/3 w-16 h-16 text-codedrift-blue/15 animate-pulse" />
//           <Brain className="absolute top-1/2 right-10 w-16 h-16 text-codedrift-pink/15 animate-bounce" />
//         </div>
//       </section>

//       {/* ✅ Mission & Vision */}
//       <MissionsVision />

//       {/* ✅ Core Values */}
//       <Values />

//       {/* ✅ Final CTA */}
//       <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center text-center overflow-hidden px-4 sm:px-6 lg:px-8">
//         {/* Background */}
//         <div className="absolute inset-0">
//           <Image
//             src={codingIllustrationImage}
//             alt="Learning and Mentorship"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-gray-900/30"></div>
//         </div>

//         {/* CTA Content */}
//         <div className="max-w-4xl mx-auto relative z-10 text-white">
//           <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
//             Learn & Grow With Us
//           </h2>
//           <p className="text-gray-200 max-w-2xl mx-auto mb-8 leading-relaxed text-base sm:text-lg md:text-xl">
//             Take the next step in your career, whether you're a beginner or
//             looking to advance your skills. Learn industry-relevant tech with
//             expert mentorship and hands-on projects.
//           </p>

//           <Link
//             to="/courses"
//             className="inline-block bg-codedrift-pink text-white font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-md hover:bg-codedrift-indigo-dark transition"
//           >
//             Explore Your Courses
//           </Link>

//         </div>
//       </section>
//     </div>
//   );
// };

// export default AboutPage;



import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Globe, Award, BookOpen, Users, Target, BarChart, Shield } from "lucide-react";
import Image from "../../components/utility/Image";
import {
  aboutBgImage,
  codingIllustrationImage,
} from "../../access-assets/images";
import MissionsVision from "../../components/about/MissionsVision";
import Values from "../../components/about/Values";
import { Button } from "../../components/utility/Button";

const AboutPage = () => {
  return (
    <div className="overflow-x-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Background with University Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
          {/* University Seal Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-8 grid-rows-8 h-full">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div>
              {/* <div className="inline-flex items-center gap-3 mb-6 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></span>
                <span className="text-sm font-semibold text-blue-800 tracking-wider">
                  ESTABLISHED 1975
                </span>
              </div> */}
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-blue-800 via-purple-800 to-blue-800 bg-clip-text text-transparent">
                  University Academic
                </span>
                <br />
                <span className="text-gray-900">Excellence Center</span>
              </h1>
              
              <p className="text-xl text-gray-700 leading-relaxed mb-8 max-w-2xl">
                A premier institution dedicated to advancing knowledge, fostering innovation, 
                and developing future leaders through comprehensive academic programs and 
                cutting-edge research initiatives.
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-8 mb-10">
                <div>
                  <p className="text-3xl font-bold text-blue-800">25,000+</p>
                  <p className="text-gray-600">Active Students</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-purple-800">1,200+</p>
                  <p className="text-gray-600">Faculty Members</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-amber-700">50+</p>
                  <p className="text-gray-600">Academic Programs</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button 
                  as="link" 
                  to="/courses" 
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 
                    text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 
                    hover:-translate-y-1"
                >
                  Explore Academic Programs →
                </Button>
            
              </div>
            </div>

            {/* Right Column - University Building Image */}
            <div className="relative">
              <div className="relative rounded-md overflow-hidden shadow-2xl">
                <Image
                  // src={aboutBgImage}
                  src="https://www.sgbaukrc.ac.in/images/stories/library/library_building1.jpg"
                  alt="University Campus"
                  className="w-full h-[500px] object-cover border-4 border-yellow-900"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                
                {/* Floating Info Cards */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-lg p-6 shadow-xl max-w-xs border-4 border-yellow-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">B++ Accredited</p>
                      <p className="text-sm text-gray-600">NAAC Grade</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Recognized for academic excellence and institutional quality
                  </p>
                </div>

                <div className="absolute -top-6 -right-6 bg-white rounded-lg p-6 shadow-xl max-w-xs border-4 border-yellow-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl flex items-center justify-center">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Global Network</p>
                      <p className="text-sm text-gray-600">30+ Countries</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">
                    International collaborations and exchange programs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
       
      </section>

      {/* Quick Facts Banner */}
      <section className="py-6 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <BookOpen className="w-8 h-8" />, value: "200+", label: "Research Centers" },
              { icon: <Users className="w-8 h-8" />, value: "95%", label: "Placement Rate" },
              { icon: <Target className="w-8 h-8" />, value: "150+", label: "Industry Partners" },
              { icon: <Shield className="w-8 h-8" />, value: "50+", label: "Years Excellence" },
            ].map((item, i) => (
              <div key={i} className="text-center text-white">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                  {item.icon}
                </div>
                <p className="text-3xl font-bold mb-2">{item.value}</p>
                <p className="text-blue-100">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <MissionsVision />

      {/* Core Values */}
      <Values />

      {/* Final CTA */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src={codingIllustrationImage}
            alt="University Graduation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 via-blue-800/50 to-blue-900/50 text-white"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-3 mb-8 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
            <span className="text-white font-semibold">Join Our Academic Community</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Shape Your Future With Us
          </h2>
          
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            Embark on a transformative educational journey that combines academic rigor with 
            practical experience, preparing you for leadership roles in an ever-changing world.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/courses"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 
                text-white font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 
                hover:-translate-y-1"
            >
              <GraduationCap className="w-5 h-5" />
              Explore Academic Programs
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-md 
                text-white font-bold rounded-xl border-2 border-white/30 hover:bg-white/30 
                transition-all duration-300"
            >Join Us
            </Link>
          </div>

         
        </div>
      </section>

    </div>
  );
};

export default AboutPage;