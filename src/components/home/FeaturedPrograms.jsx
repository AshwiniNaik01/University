// FeaturedPrograms.jsx
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaHeartbeat,
  FaLaptop,
  FaMicroscope
} from "react-icons/fa";
import { Link } from "react-router-dom";

const MotionLink = motion(Link);
const MotionDiv = motion.div;

export default function FeaturedPrograms() {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Featured{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Academic Programs
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Explore our diverse range of undergraduate, postgraduate, and
            doctoral programs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <ProgramCard
            title="Medical Sciences"
            description="MBBS, BDS, Nursing, Physiotherapy, Pharmacy with modern clinical training"
            icon={<FaHeartbeat />}
            color="red"
            programs={[
              "MBBS",
              "BDS",
              "B.Sc Nursing",
              "B.Pharm",
              "Physiotherapy",
            ]}
          />
          <ProgramCard
            title="Engineering & Technology"
            description="B.Tech, M.Tech in Computer Science, Mechanical, Civil, Electronics, and more"
            icon={<FaLaptop />}
            color="blue"
            programs={[
              "Computer Science",
              "Mechanical",
              "Civil",
              "Electronics",
              "AI & ML",
            ]}
          />
          <ProgramCard
            title="Research Programs"
            description="Ph.D. and M.Phil in various disciplines with advanced research facilities"
            icon={<FaMicroscope />}
            color="purple"
            programs={[
              "Science",
              "Arts",
              "Commerce",
              "Education",
              "Social Sciences",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function ProgramCard({ title, description, icon, color, programs }) {
  const gradientMap = {
    red: "from-red-100 via-red-50 to-white",
    blue: "from-blue-100 via-blue-50 to-white",
    purple: "from-purple-100 via-purple-50 to-white",
  };

  const accentMap = {
    red: "from-red-500 to-red-600",
    blue: "from-blue-500 to-blue-600",
    purple: "from-purple-500 to-purple-600",
  };

  const iconColor = {
    red: "text-red-600",
    blue: "text-blue-600",
    purple: "text-purple-600",
  };

  return (
    <MotionDiv
      whileHover={{ y: -10 }}
      className={`relative rounded-2xl p-6 
        bg-gradient-to-br ${gradientMap[color]} 
        border border-gray-200 shadow-md hover:shadow-xl 
        transition-all duration-300 overflow-hidden`}
    >
      {/* Top Gradient Accent */}
      <div
        className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${accentMap[color]}`}
      />

      {/* Content */}
      <div className="relative z-10">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 
          bg-white shadow-sm"
        >
          <div className={`text-2xl ${iconColor[color]}`}>{icon}</div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>

        <p className="text-gray-600 mb-6">{description}</p>

        <div className="space-y-2">
          {programs.map((program, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <FaCheckCircle className={`text-sm ${iconColor[color]}`} />
              <span className="text-gray-700">{program}</span>
            </div>
          ))}
        </div>
      </div>
    </MotionDiv>
  );
}
