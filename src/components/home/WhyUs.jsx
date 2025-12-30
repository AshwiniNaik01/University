// WhyChooseSGBAU.jsx
import { motion } from "framer-motion";
import {
  FaAward,
  FaBuilding,
  FaChalkboardTeacher,
  FaGlobe,
  FaHandshake,
  FaRocket,
} from "react-icons/fa";

const MotionDiv = motion.div;

export default function WhyUs() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              SGBAU
            </span>
            ?
          </h2>
          <p className="text-blue-100 text-lg max-w-3xl mx-auto">
            Discover what makes us a preferred destination for higher education
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FaAward />}
            title="NAAC B++ Accredited"
            description="Recognized accreditation ensuring high-quality academic standards"
            color="yellow"
          />
          <FeatureCard
            icon={<FaChalkboardTeacher />}
            title="Expert Faculty"
            description="800+ experienced professors and industry professionals"
            color="blue"
          />
          <FeatureCard
            icon={<FaBuilding />}
            title="Modern Infrastructure"
            description="Advanced labs, libraries, hostels, and sports complexes"
            color="green"
          />
          <FeatureCard
            icon={<FaHandshake />}
            title="Industry Partnerships"
            description="Strong ties with leading companies and hospitals"
            color="purple"
          />
          <FeatureCard
            icon={<FaGlobe />}
            title="Global Opportunities"
            description="International collaborations & student exchange programs"
            color="red"
          />
          <FeatureCard
            icon={<FaRocket />}
            title="Placement Support"
            description="Dedicated placement cell with strong career guidance"
            color="cyan"
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description, color }) {
  const gradientMap = {
    yellow: "from-yellow-400 to-yellow-600",
    blue: "from-blue-400 to-blue-600",
    green: "from-green-400 to-green-600",
    purple: "from-purple-400 to-purple-600",
    red: "from-red-400 to-red-600",
    cyan: "from-cyan-400 to-cyan-600",
  };

  return (
    <MotionDiv
      whileHover={{ y: -10, scale: 1.03 }}
      className="group relative rounded-3xl p-[2px] bg-gradient-to-br from-white/20 to-white/5 hover:shadow-2xl transition-all duration-300"
    >
      <div className="h-full rounded-3xl bg-white/10 backdrop-blur-lg p-6 border border-white/20">
        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradientMap[color]} 
          flex items-center justify-center text-white text-xl shadow-lg mb-5`}
        >
          {icon}
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-blue-100 leading-relaxed">{description}</p>

        {/* Hover Glow */}
        <div
          className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 
          transition-opacity duration-500 bg-gradient-to-br ${gradientMap[color]}`}
        />
      </div>
    </MotionDiv>
  );
}
