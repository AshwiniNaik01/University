import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Briefcase, Sword, Rocket } from "lucide-react"; // Lucide icons

const MotionLink = motion(Link);

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, type: "spring", stiffness: 80 },
  }),
};

const Outcomes = () => {
  const outcomes = [
    {
      title: "Real-World Projects",
      desc: "Build apps and tools that solve real problems, not just 'ToDo lists'.",
      color: "text-codedrift-blue",
      icon: <Briefcase size={40} className="text-codedrift-blue" />,
    },
    {
      title: "Contest & DSA Confidence",
      desc: "Crack coding rounds, master logic, and become interview-ready with hands-on practice.",
      color: "text-codedrift-pink",
      icon: <Sword size={40} className="text-codedrift-pink" />,
    },
    {
      title: "Internship & Freelance Ready",
      desc: "Build a strong portfolio that speaks louder than your resume.",
      color: "text-codedrift-indigo",
      icon: <Rocket size={40} className="text-codedrift-indigo" />,
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
          What You’ll Achieve
          <span className="absolute left-1/2 -bottom-2 w-2/3 h-1 bg-codedrift-gradient rounded-full transform -translate-x-1/2"></span>
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-xl mx-auto">
          We don’t just teach syntax — we help you become a confident developer
          ready to build, solve, and ship.
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

        {/* CTA Button */}
        <div className="mt-14">
          <MotionLink
            to="/courses#courses-list"
            className="inline-block bg-codedrift-indigo text-white font-medium px-8 py-4 rounded-full shadow-lg hover:bg-codedrift-indigo-dark hover:scale-105 transition-transform duration-300"
            whileHover={{ y: -3 }}
          >
            Start Your Outcome-Driven Journey
          </MotionLink>
        </div>
      </div>
    </section>
  );
};

export default Outcomes;
