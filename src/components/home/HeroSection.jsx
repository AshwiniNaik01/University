// HeroSection.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaUniversity, FaAward, FaGlobe } from "react-icons/fa";

const MotionLink = motion(Link);
const MotionDiv = motion.div;

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const sliderImages = [
    {
      url: "https://campuspro.co.in/collage-image/1749038383_row_282.jpg",
      title: "Sant Gadge Baba Amravati University",
      subtitle: "Est. 1983 • NAAC 'B++' Grade • UGC Approved"
    },
    {
      url: "https://sgbau.ac.in/departments/botany/images/frontimg.jpg",
      title: "Innovative Learning Ecosystem",
      subtitle: "State-of-the-art infrastructure for holistic education"
    },
    {
      url: "https://mba.icnn.in/wp-content/uploads/2021/09/SGBAU-MBA-Admission-1.png",
      title: "Global Academic Excellence",
      subtitle: "Connecting students to worldwide opportunities"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-8xl mx-auto px-14 lg:px-14 py-12 lg:py-18">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center">
                <FaUniversity className="text-white text-xl" />
              </div>
              <div>
                <div className="text-lg font-bold">SGBAU</div>
                <div className="text-xs text-blue-200">Since 1983</div>
              </div>
            </div> */}

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight font-serif">
              <span className="text-white">Sant Gadge Baba</span>
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                Amravati University
              </span>
            </h1>

            <p className="text-xl text-blue-100 leading-relaxed">
              Where tradition meets innovation in education. 
              <span className="font-semibold text-yellow-300"> Nurturing excellence</span> across 
              <span className="font-semibold text-emerald-300"> 200+ programs</span> for 
              <span className="font-semibold text-cyan-300"> 50,000+ students</span>.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <StatCard number="50K+" label="Students" color="yellow" />
              <StatCard number="200+" label="Programs" color="emerald" />
              <StatCard number="800+" label="Faculty" color="cyan" />
              <StatCard number="40+" label="Years" color="purple" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <MotionLink
                to="/courses#courses-list"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3"
              >
                   Explore Courses <FaArrowRight />
              </MotionLink>
              <MotionLink
                to="/auth/register"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3"
              >
                 Join Now <FaGlobe />
              </MotionLink>
            </div>
          </div>

          {/* Right Slider */}
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-2xl border-2 border-white/20 backdrop-blur-sm">
              <div className="relative h-[400px] lg:h-[500px]">
                {sliderImages.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ${
                      index === currentSlide
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-105'
                    }`}
                  >
                    <img
                      src={slide.url}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent"></div>
                    <div className={`absolute bottom-0 left-0 right-0 p-8 transition-all duration-700 ${
                      index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full animate-pulse"></div>
                        <span className="text-yellow-300 text-sm font-bold">UNIVERSITY HIGHLIGHT</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{slide.title}</h3>
                      <p className="text-blue-100">{slide.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                {sliderImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'w-8 bg-gradient-to-r from-yellow-400 to-yellow-500'
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="absolute -top-6 -right-6">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 text-white p-4 rounded-lg shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500">
                <div className="flex items-center gap-3">
                  <FaAward className="text-2xl" />
                  <div>
                    <div className="font-bold">NAAC B++</div>
                    <div className="text-xs text-yellow-200">Accredited</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ number, label, color }) {
  const colorMap = {
    yellow: 'text-yellow-400',
    emerald: 'text-emerald-400',
    cyan: 'text-cyan-400',
    purple: 'text-purple-400'
  };

  return (
    <MotionDiv 
      whileHover={{ scale: 1.05 }}
      className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
    >
      <div className={`text-3xl font-bold ${colorMap[color]} mb-1`}>
        {number}
      </div>
      <div className="text-white/90 text-sm">{label}</div>
    </MotionDiv>
  );
}


// // HeroSection.jsx
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { 
//   FaArrowRight, 
//   FaUniversity, 
//   FaAward, 
//   FaGlobe, 
//   FaUsers,
//   FaGraduationCap,
//   FaBookOpen,
//   FaChevronLeft,
//   FaChevronRight
// } from "react-icons/fa";

// const MotionLink = motion(Link);
// const MotionDiv = motion.div;

// export default function HeroSection() {
//   const [currentSlide, setCurrentSlide] = useState(0);
  
//   const sliderImages = [
//     {
//       url: "https://campuspro.co.in/collage-image/1749038383_row_282.jpg",
//       title: "Sant Gadge Baba Amravati University",
//       subtitle: "Established 1983 • NAAC 'A+' Grade • UGC Approved University"
//     },
//     {
//       url: "https://sgbau.ac.in/departments/botany/images/frontimg.jpg",
//       title: "Excellence in Higher Education",
//       subtitle: "State-of-the-art infrastructure with 200+ academic programs"
//     },
//     {
//       url: "https://mba.icnn.in/wp-content/uploads/2021/09/SGBAU-MBA-Admission-1.png",
//       title: "Shaping Future Leaders",
//       subtitle: "Connecting students to global opportunities and careers"
//     }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
//   };

//   return (
//     <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50 to-white">
//       {/* Background decorative elements */}
//       <div className="absolute inset-0">
//         <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
//         <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-40"></div>
        
//         {/* Subtle grid pattern */}
//         <div className="absolute inset-0 opacity-5">
//           <div className="h-full w-full" style={{
//             backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px),
//                              linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
//             backgroundSize: '50px 50px'
//           }}></div>
//         </div>
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-20">
//         <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
//           {/* Left Content - University Info */}
//           <div className="space-y-8">
//             {/* University Badge */}
//             <div className="inline-flex items-center gap-4 bg-white border-2 border-blue-200 rounded-2xl px-6 py-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-md">
//                 <FaUniversity className="text-white text-2xl" />
//               </div>
//               <div>
//                 <div className="text-xl font-bold text-blue-900">SGBAU</div>
//                 <div className="text-sm text-gray-600">Sant Gadge Baba Amravati University</div>
//                 <div className="flex items-center gap-2 mt-1">
//                   <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                   <span className="text-xs text-green-600 font-medium">NAAC A+ Accredited</span>
//                 </div>
//               </div>
//             </div>

//             {/* Main Heading */}
//             <div className="space-y-4">
//               <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
//                 <span className="text-blue-900">Sant Gadge Baba</span>
//                 <br />
//                 <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
//                   Amravati University
//                 </span>
//               </h1>
              
//               {/* Tagline */}
//               <p className="text-xl text-gray-700 leading-relaxed">
//                 Where <span className="font-semibold text-blue-600">tradition</span> meets 
//                 <span className="font-semibold text-blue-600"> innovation</span> in education. 
//                 Empowering <span className="font-semibold text-blue-600">50,000+ students</span> across 
//                 <span className="font-semibold text-blue-600"> 200+ programs</span>.
//               </p>
//             </div>

//             {/* Quick Stats */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               <StatCard 
//                 icon={<FaUsers className="text-blue-600" />}
//                 number="50K+"
//                 label="Students"
//                 description="Enrolled across campuses"
//               />
//               <StatCard 
//                 icon={<FaGraduationCap className="text-green-600" />}
//                 number="200+"
//                 label="Programs"
//                 description="UG, PG & Research"
//               />
//               <StatCard 
//                 icon={<FaBookOpen className="text-purple-600" />}
//                 number="800+"
//                 label="Faculty"
//                 description="Expert Professors"
//               />
//               <StatCard 
//                 icon={<FaAward className="text-yellow-600" />}
//                 number="40+"
//                 label="Years"
//                 description="Of Excellence"
//               />
//             </div>

//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 pt-4">
//               <MotionLink
//                 to="/admissions"
//                 whileHover={{ y: -3 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center gap-3 group"
//               >
//                 <span>Apply for Admission 2025</span>
//                 <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
//               </MotionLink>
              
//               <MotionLink
//                 to="/programs"
//                 whileHover={{ y: -3 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
//               >
//                 Explore Programs
//               </MotionLink>
//             </div>
//           </div>

//           {/* Right Column - Image Slider */}
//           <div className="relative">
//             {/* Main Slider Container */}
//             <div className="relative rounded-lg overflow-hidden shadow-2xl border-4 border-blue-900">
//               <div className="relative h-[350px] lg:h-[450px]">
//                 {sliderImages.map((slide, index) => (
//                   <div
//                     key={index}
//                     className={`absolute inset-0 transition-all duration-700 ${
//                       index === currentSlide
//                         ? 'opacity-100 scale-100'
//                         : 'opacity-0 scale-105'
//                     }`}
//                   >
//                     <img
//                       src={slide.url}
//                       alt={slide.title}
//                       className="w-full h-full object-cover"
//                     />
                    
//                     {/* Gradient Overlay */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                    
//                     {/* Slide Content */}
//                     <div className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-700 ${
//                       index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
//                     }`}>
//                       <div className="flex items-center gap-3 mb-3">
//                         <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse"></div>
//                         <span className="text-blue-100 text-sm font-bold bg-blue-900/50 px-3 py-1 rounded-full">
//                           SGBAU CAMPUS
//                         </span>
//                       </div>
//                       <h3 className="text-2xl font-bold text-white mb-2">{slide.title}</h3>
//                       <p className="text-blue-100">{slide.subtitle}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Navigation Arrows */}
//               <button
//                 onClick={prevSlide}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-blue-600 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
//               >
//                 <FaChevronLeft />
//               </button>
//               <button
//                 onClick={nextSlide}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-blue-600 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
//               >
//                 <FaChevronRight />
//               </button>

//               {/* Slide Indicators */}
//               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
//                 {sliderImages.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentSlide(index)}
//                     className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                       index === currentSlide
//                         ? 'w-10 bg-gradient-to-r from-blue-500 to-blue-700'
//                         : 'bg-white/80 hover:bg-white'
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Accent Feature Cards */}
//             <div className="flex justify-center mt-6 gap-4">
//               <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-4 text-center min-w-[120px] shadow-sm hover:shadow-md transition-shadow duration-300">
//                 <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
//                   <FaAward className="text-green-600 text-lg" />
//                 </div>
//                 <div className="text-sm font-bold text-green-800">NAAC B++</div>
//                 <div className="text-xs text-green-600">Accredited</div>
//               </div>
              
//               <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 text-center min-w-[120px] shadow-sm hover:shadow-md transition-shadow duration-300">
//                 <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
//                   <FaGlobe className="text-blue-600 text-lg" />
//                 </div>
//                 <div className="text-sm font-bold text-blue-800">UGC</div>
//                 <div className="text-xs text-blue-600">Recognized</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Quick Info Bar */}
//         <div className="mt-12 pt-8 border-t border-gray-200">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <InfoItem 
//               title="Admissions 2025"
//               description="Applications open for all UG/PG programs"
//               link="/admissions"
//               linkText="Apply Now"
//               color="blue"
//             />
//             <InfoItem 
//               title="Campus Visit"
//               description="Schedule a guided campus tour"
//               link="/campus-tour"
//               linkText="Book Tour"
//               color="green"
//             />
//             <InfoItem 
//               title="Virtual Learning"
//               description="Access online resources & e-library"
//               link="/e-resources"
//               linkText="Explore"
//               color="purple"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function StatCard({ icon, number, label, description }) {
//   return (
//     <MotionDiv 
//       whileHover={{ y: -5 }}
//       className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
//     >
//       <div className="flex items-center gap-3 mb-2">
//         <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
//           {icon}
//         </div>
//         <div>
//           <div className="text-2xl font-bold text-gray-900">{number}</div>
//           <div className="text-sm font-medium text-gray-700">{label}</div>
//         </div>
//       </div>
//       <div className="text-xs text-gray-500">{description}</div>
//     </MotionDiv>
//   );
// }

// function InfoItem({ title, description, link, linkText, color }) {
//   const colorClasses = {
//     blue: 'border-blue-200 bg-blue-50 hover:bg-blue-100',
//     green: 'border-green-200 bg-green-50 hover:bg-green-100',
//     purple: 'border-purple-200 bg-purple-50 hover:bg-purple-100'
//   };

//   return (
//     <div className={`border rounded-xl p-5 ${colorClasses[color]} transition-colors duration-300`}>
//       <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
//       <p className="text-gray-600 mb-4">{description}</p>
//       <Link 
//         to={link}
//         className={`inline-flex items-center gap-2 text-sm font-semibold ${
//           color === 'blue' ? 'text-blue-700' : 
//           color === 'green' ? 'text-green-700' : 'text-purple-700'
//         } hover:gap-3 transition-all duration-300`}
//       >
//         {linkText} <FaArrowRight className="text-xs" />
//       </Link>
//     </div>
//   );
// }