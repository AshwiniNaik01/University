// pages/HomePage.jsx
import CampusHighlights from "../../components/home/CampusHighlights";
import CertificateSection from "../../components/home/CertificateSection";
import CourseProcess from "../../components/home/CourseProcess";
import Courses from "../../components/home/Courses";
import FeaturedPrograms from "../../components/home/FeaturedPrograms";
import HeroSection from "../../components/home/HeroSection";
import Mentors from "../../components/home/Mentors";
import Testimonials from "../../components/home/Testimonials";
import WhyUs from "../../components/home/WhyUs";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white">
      <HeroSection />
      <Courses />
      {/* <QuickAccess /> */}
      <FeaturedPrograms />
      <CampusHighlights />
      <Testimonials />
      <CourseProcess />
      <WhyUs />
      {/* <AcademicOutcomes /> */}
      {/* <AdmissionsSection /> */}
      <Mentors />
      <CertificateSection />
      {/* <QuickLinks /> */}
    </div>
  );
}
