// import React from "react";
// import Hero from "../../components/home/Hero";
// import Outcomes from "../../components/home/Outcomes";
// import Courses from "../../components/home/Courses";
// import Mentors from "../../components/home/Mentors";
// import Testimonials from "../../components/home/Testimonials";
// import WhyUs from "../../components/home/WhyUs";
// import FullScreenLogoLoader from "../../components/loaders/FullScreenLogoLoader";
// import { Link } from "react-router-dom";
// import { Button } from "../../components/utility/Button";
// import HeroTechNontech from "../../components/home/HeroTechNontech";
// import NontechOutcomes from "../../components/home/NontechOutcomes";
// import InfoSection from "../../components/home/InfoSection";

// const HomePage = () => {
//   return (
//     <>
//     <InfoSection/>
//       {/* <Hero /> */}
//       <HeroTechNontech/>

//       {/* Courses / Programs Section */}
//       <Courses />

//       {/* Outcomes */}
//       {/* <Outcomes /> */}
//       <NontechOutcomes/>

//       {/* Features / Why Choose Us Section */}
//       <WhyUs />

//       {/* Testimonials Section */}
//       <Testimonials />

//       {/* Mentors / Mentors Section */}
//       <Mentors />

//       {/* Call to Action (CTA) Section */}
//       <section className="relative py-20 bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] overflow-hidden text-center">
//         {/* Decorative Brand-Colored Background Shapes */}
//         <div className="absolute top-0 left-10 w-72 h-72 bg-codedrift-pink opacity-10 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-0 right-10 w-72 h-72 bg-codedrift-blue opacity-10 rounded-full blur-3xl"></div>

//         <div className="container">
//           <div className="relative">
//             <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-gray-100 max-w-3xl mx-auto">
//               {/* Heading */}
//               <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 relative inline-block">
//                 Ready to Elevate Your Skills?
//                 <span className="absolute left-1/2 -bottom-2 w-2/3 h-1 bg-codedrift-gradient rounded-full transform -translate-x-1/2"></span>
//               </h2>

//               <p className="text-gray-600 mb-8">
//                 Join Code Drift today and start building real-world projects,
//                 cracking coding contests, and landing opportunities.
//               </p>

//               {/* CTA Buttons */}
//               <div className="flex justify-center gap-5">
//                 <Button as="link" to="/courses#courses-list" variant="pink">
//                   Explore Courses
//                 </Button>

//                 <Button as="link" to="/auth/register" variant="outline">
//                   Get Started
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default HomePage;

// pages/HomePage.jsx
import React from "react";
import HeroSection from "../../components/home/HeroSection";
import QuickAccess from "../../components/home/QuickAccess";
import FeaturedPrograms from "../../components/home/FeaturedPrograms";
import WhyUs from "../../components/home/WhyUs";
import CampusHighlights from "../../components/home/CampusHighlights";
import AcademicOutcomes from "../../components/home/AcademicOutcomes";
import Courses from "../../components/home/Courses";
import AdmissionsSection from "../../components/home/AdmissionsSection";
import Testimonials from "../../components/home/Testimonials";
import Mentors from "../../components/home/Mentors";
import CertificateSection from "../../components/home/CertificateSection";
import QuickLinks from "../../components/home/QuickLinks";
import CourseProcess from "../../components/home/CourseProcess";
// import HeroSection from "../components/Home/HeroSection";
// import QuickAccess from "../components/Home/QuickAccess";
// import FeaturedPrograms from "../components/Home/FeaturedPrograms";
// import WhyChooseSGBAU from "../components/Home/WhyChooseSGBAU";
// import CampusHighlights from "../components/Home/CampusHighlights";
// import AcademicOutcomes from "../components/Home/AcademicOutcomes";
// import CoursesSection from "../components/Home/CoursesSection";
// import AdmissionsSection from "../components/Home/AdmissionsSection";
// import TestimonialsSection from "../components/Home/TestimonialsSection";
// import MentorsSection from "../components/Home/MentorsSection";
// import CertificateSection from "../components/Home/CertificateSection";
// import QuickLinks from "../components/Home/QuickLinks";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white">
      <HeroSection />
         <Courses />
      {/* <QuickAccess /> */}
      <FeaturedPrograms />
        <CampusHighlights />
  
   <Testimonials />
  <CourseProcess/>
      <WhyUs />
      
      {/* <AcademicOutcomes /> */}

      {/* <AdmissionsSection /> */}
      
      <Mentors />
      <CertificateSection />
      {/* <QuickLinks /> */}
    </div>
  );
}
