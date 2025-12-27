// QuickLinks.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaBook, FaUserGraduate, FaChalkboardTeacher, FaCertificate, FaClock, FaSearch, FaShieldAlt } from "react-icons/fa";

const MotionLink = motion(Link);

export default function QuickLinks() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Quick Links</h2>
          <p className="text-gray-600">Access university resources instantly</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <QuickLink icon={<FaCalendarAlt />} title="Academic Calendar" />
          <QuickLink icon={<FaBook />} title="Examination Portal" />
          <QuickLink icon={<FaUserGraduate />} title="Student Portal" />
          <QuickLink icon={<FaChalkboardTeacher />} title="Faculty Login" />
          <QuickLink icon={<FaCertificate />} title="Results" />
          <QuickLink icon={<FaClock />} title="Time Table" />
          <QuickLink icon={<FaSearch />} title="Research Portal" />
          <QuickLink icon={<FaShieldAlt />} title="Grievance Cell" />
        </div>
      </div>
    </section>
  );
}

function QuickLink({ icon, title }) {
  return (
    <MotionLink
      to="#"
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 transition-all duration-300"
    >
      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
        <div className="text-blue-600">{icon}</div>
      </div>
      <span className="text-gray-700 font-medium">{title}</span>
    </MotionLink>
  );
}