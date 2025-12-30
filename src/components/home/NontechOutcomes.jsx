import { motion } from "framer-motion";
import { BookOpen, Briefcase, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const MotionLink = motion(Link);

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, type: "spring", stiffness: 80 },
  }),
};

const NontechOutcomes = () => {
  const outcomes = [
    {
      title: "Strong Academic Foundation",
      desc: "Gain in-depth theoretical and practical knowledge through UG, PG, and Ph.D. programs aligned with SGBAU curriculum and standards.",
      color: "text-codedrift-indigo",
      icon: <BookOpen size={40} className="text-codedrift-indigo" />,
    },
    {
      title: "Career & Competitive Exam Readiness",
      desc: "Prepare for careers in education, industry, administration, research, and competitive exams like NET, SET, MPSC, and UPSC.",
      color: "text-codedrift-pink",
      icon: <GraduationCap size={40} className="text-codedrift-pink" />,
    },
    {
      title: "Employability & Professional Growth",
      desc: "Build skills for employment, internships, entrepreneurship, and higher studies through industry-relevant and professional programs.",
      color: "text-codedrift-blue",
      icon: <Briefcase size={40} className="text-codedrift-blue" />,
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-[#fdfbfb] via-[#f7f9fc] to-[#f0f4f8] py-20 overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-[-60px] left-[-60px] w-[220px] h-[220px] bg-codedrift-pink/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-80px] right-[-80px] w-[250px] h-[250px] bg-codedrift-blue/10 rounded-full blur-3xl"></div>

      <div className="container relative z-10 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 relative inline-block">
          Academic & Career Outcomes
          <span className="absolute left-1/2 -bottom-2 w-2/3 h-1 bg-codedrift-gradient rounded-full transform -translate-x-1/2"></span>
        </h2>

        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Sant Gadge Baba Amravati University focuses on holistic education,
          academic excellence, and career readiness across technical and
          non-technical disciplines.
        </p>

        {/* Animated Cards */}
        <div className="grid md:grid-cols-3 gap-8 text-left">
          {outcomes.map((item, i) => (
            <motion.div
              key={i}
              className="relative bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 overflow-hidden"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              {/* Gradient Top Bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-codedrift-gradient"></div>

              {/* Icon */}
              <div className="mb-4">{item.icon}</div>

              {/* Content */}
              <h3 className={`text-xl font-semibold mb-2 ${item.color}`}>
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>

              {/* Decorative Shape */}
              <div className="absolute bottom-[-30px] right-[-30px] w-24 h-24 bg-codedrift-blue/5 rounded-full blur-xl"></div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14">
          <MotionLink
            to="/courses"
            className="inline-block bg-codedrift-indigo text-white font-medium px-8 py-4 rounded-full shadow-lg hover:bg-codedrift-indigo-dark hover:scale-105 transition-transform duration-300"
            whileHover={{ y: -3 }}
          >
            Explore SGBAU Academic Programs
          </MotionLink>
        </div>
      </div>
    </section>
  );
};

export default NontechOutcomes;
