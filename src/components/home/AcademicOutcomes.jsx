// AcademicOutcomes.jsx
import { motion } from "framer-motion";
import { BookOpen, Briefcase, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const MotionLink = motion(Link);

export default function AcademicOutcomes() {
  const outcomes = [
    {
      title: "Strong Academic Foundation",
      desc: "Gain in-depth theoretical and practical knowledge through UG, PG, and Ph.D. programs aligned with SGBAU curriculum and standards.",
      color: "text-blue-600",
      icon: <BookOpen size={40} className="text-blue-600" />,
    },
    {
      title: "Career & Competitive Exam Readiness",
      desc: "Prepare for careers in education, industry, administration, research, and competitive exams like NET, SET, MPSC, and UPSC.",
      color: "text-red-600",
      icon: <GraduationCap size={40} className="text-red-600" />,
    },
    {
      title: "Employability & Professional Growth",
      desc: "Build skills for employment, internships, entrepreneurship, and higher studies through industry-relevant and professional programs.",
      color: "text-green-600",
      icon: <Briefcase size={40} className="text-green-600" />,
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-white via-blue-50/30 to-white overflow-hidden">
      <div className="absolute top-[-60px] left-[-60px] w-[220px] h-[220px] bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-80px] right-[-80px] w-[250px] h-[250px] bg-emerald-500/10 rounded-full blur-3xl"></div>

      <div className="container relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 relative inline-block">
          Academic & Career Outcomes
          <span className="absolute left-1/2 -bottom-2 w-2/3 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transform -translate-x-1/2"></span>
        </h2>

        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Sant Gadge Baba Amravati University focuses on holistic education,
          academic excellence, and career readiness across technical and
          non-technical disciplines.
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          {outcomes.map((item, i) => (
            <motion.div
              key={i}
              className="relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, type: "spring", stiffness: 80 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <div className="mb-4">{item.icon}</div>
              <h3 className={`text-xl font-semibold mb-2 ${item.color}`}>
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-14">
          <MotionLink
            to="/courses"
            className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            whileHover={{ y: -3 }}
          >
            Explore SGBAU Academic Programs
          </MotionLink>
        </div>
      </div>
    </section>
  );
}
