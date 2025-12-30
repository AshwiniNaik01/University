// QuickAccess.jsx
import { motion } from "framer-motion";
import {
  FaBookMedical,
  FaBookOpen,
  FaChartLine,
  FaGraduationCap,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const MotionLink = motion(Link);

export default function QuickAccess() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-white">
      <div className="max-w-8xl mx-auto px-4 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Program Categories
          </h2>
          <p className="mt-2 text-gray-600">
            Choose a category to explore available academic programs
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <QuickAccessCard
            icon={<FaBookMedical className="text-2xl" />}
            title="Medical Programs"
            description="MBBS, BDS, Nursing, Pharmacy"
            color="red"
          />
          <QuickAccessCard
            icon={<FaGraduationCap className="text-2xl" />}
            title="Engineering"
            description="B.Tech, M.Tech in 12+ specializations"
            color="blue"
          />
          <QuickAccessCard
            icon={<FaBookOpen className="text-2xl" />}
            title="Arts & Science"
            description="BA, BSc, MA, MSc, PhD programs"
            color="green"
          />
          <QuickAccessCard
            icon={<FaChartLine className="text-2xl" />}
            title="Management"
            description="BBA, MBA, Commerce & Business"
            color="purple"
          />
        </div>
      </div>
    </section>
  );
}

function QuickAccessCard({ icon, title, description, color, link }) {
  // Softer/light gradient shades
  const colorMap = {
    red: "from-red-200 to-red-400",
    blue: "from-blue-200 to-blue-400",
    green: "from-green-200 to-green-400",
    purple: "from-purple-200 to-purple-400",
  };

  return (
    <MotionLink
      to={link}
      whileHover={{ y: -5 }}
      className={`bg-gradient-to-br ${colorMap[color]} text-black border-3 border-${colorMap[color]} p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300`}
    >
      <div className="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-black text-sm">{description}</p>
    </MotionLink>
  );
}
