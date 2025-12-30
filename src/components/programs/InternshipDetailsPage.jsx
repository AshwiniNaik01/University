import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchInternshipSessionById } from "./events";

/**
 *
 *  InternshipDetailsPage:
 * ------------------------------------------------------------------------------------
 * this page shows the detail information about each perticular internship by its id
 */

const InternshipDetailsPage = () => {
  const { sessionId } = useParams(); // fetch session id from params
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchInternshipSessionById(sessionId)
      .then((response) => {
        if (response.success) {
          setSession(response.data);
        }
      })
      .catch((err) => console.error("Error fetching session:", err))
      .finally(() => setLoading(false));
  }, [sessionId]);

  if (loading)
    return (
      <div className="text-center text-lg py-10 text-blue-500 font-semibold">
        Loading Internship Details...
      </div>
    );

  if (!session)
    return (
      <div className="text-center text-lg py-10 text-red-500 font-semibold">
        Internship session not found.
      </div>
    );

  const {
    title,
    description,
    startDate,
    endDate,
    duration,
    mode,
    location,
    topics,
    capacity,
    certification,
    fees,
    status,
  } = session;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden font-sans">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-96 h-96 bg-indigo-600 rounded-full opacity-25 blur-4xl animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 w-80 h-80 bg-purple-600 rounded-full opacity-25 blur-4xl animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-72 h-72 bg-pink-600 rounded-full opacity-20 blur-4xl animate-pulse"
          style={{ animationDelay: "6s" }}
        ></div>
      </div>

      {/* Enhanced Floating Particles */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/20"
          style={{
            width: `${Math.random() * 8 + 4}px`,
            height: `${Math.random() * 8 + 4}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 25 + 15}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 8}s`,
          }}
        ></div>
      ))}

      <div className="relative max-w-7xl mx-auto px-6 py-20 z-10">
        {/* Enhanced Hero Section */}
        <motion.section
          initial={{ y: 60, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/95 backdrop-blur-3xl rounded-4xl p-10 mb-20 shadow-2xl border-2 border-white/30 relative overflow-hidden group hover:shadow-3xl transition-all duration-700"
        >
          {/* Enhanced Neon Border */}
          <div className="absolute inset-0 rounded-4xl bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Decorative Corner Elements */}
          <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-indigo-400 opacity-60"></div>
          <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-purple-400 opacity-60"></div>
          <div className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-pink-400 opacity-60"></div>
          <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-indigo-400 opacity-60"></div>

          <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-8 drop-shadow-2xl leading-tight">
            {title}
          </h1>
          <p className="text-2xl text-gray-700 max-w-4xl leading-relaxed mb-10 font-medium">
            {description}
          </p>

          {/* Enhanced Decorative Elements */}
          <div className="absolute -top-16 -right-16 w-60 h-60 bg-gradient-to-tr from-indigo-500 to-purple-600 opacity-15 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-gradient-to-br from-pink-500 to-purple-600 opacity-15 rounded-full blur-3xl"></div>
        </motion.section>

        {/* Enhanced Info Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mb-20">
          {/* Enhanced Overview Card */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-white/95 backdrop-blur-2xl rounded-4xl p-10 shadow-2xl border-2 border-white/30 relative overflow-hidden group hover:scale-[1.02] transition-all duration-500"
          >
            <div className="absolute top-8 left-8 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-2xl">
              📅
            </div>

            <h2 className="text-4xl font-bold text-gray-800 mb-12 ml-20">
              Session Overview
            </h2>

            <div className="relative">
              {/* Enhanced Timeline */}
              <div className="absolute left-5 top-0 bottom-0 w-2 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-lg"></div>

              <ul className="space-y-8 ml-12">
                {[
                  {
                    label: "Start Date",
                    value: new Date(startDate).toLocaleDateString(),
                    icon: "🚀",
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    label: "End Date",
                    value: new Date(endDate).toLocaleDateString(),
                    icon: "🎯",
                    color: "from-purple-500 to-pink-500",
                  },
                  {
                    label: "Duration",
                    value: duration,
                    icon: "⏰",
                    color: "from-amber-500 to-orange-500",
                  },
                  {
                    label: "Mode",
                    value: mode,
                    icon: "💻",
                    color: "from-green-500 to-emerald-500",
                  },
                  {
                    label: "Location",
                    value: location,
                    icon: "📍",
                    color: "from-red-500 to-rose-500",
                  },
                  {
                    label: "Capacity",
                    value: `${capacity} students`,
                    icon: "👥",
                    color: "from-indigo-500 to-blue-500",
                  },
                  {
                    label: "Certification",
                    value: certification ? "✅ Included" : "❌ Not Included",
                    icon: "🏆",
                    color: "from-yellow-500 to-amber-500",
                  },
                ].map(({ label, value, icon, color }, index) => (
                  <motion.li
                    key={label}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 }}
                    className="flex items-center gap-6 group/item"
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center text-white text-lg font-bold shadow-lg flex-shrink-0 z-10 transform group-hover/item:scale-110 transition-transform duration-300`}
                    >
                      {icon}
                    </div>
                    <div className="flex-1 bg-gray-50/80 rounded-2xl p-5 backdrop-blur-sm border-2 border-white/20 group-hover/item:bg-white group-hover/item:shadow-xl transition-all duration-300">
                      <div className="flex justify-between items-center">
                        <strong className="text-gray-700 text-base font-semibold">
                          {label}:
                        </strong>
                        <span className="text-gray-800 font-bold text-lg">
                          {value}
                        </span>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Enhanced Premium Pricing Card */}
          <motion.div
            initial={{ x: 60, opacity: 0, scale: 0.95 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className=" bg-white shadow-xl border border-yellow-100 via-yellow-500/20 to-orange-500/20 backdrop-blur-2xl rounded-3xl p-8  relative overflow-hidden group hover:scale-[1.02] transition-all duration-500"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffd700' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            }}
          >
            {/* Enhanced Floating Money Elements */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-3xl text-amber-400/40 pointer-events-none"
                style={{
                  top: `${Math.random() * 80 + 10}%`,
                  left: `${Math.random() * 80 + 10}%`,
                  animation: `floatMoney ${
                    Math.random() * 12 + 6
                  }s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 3}s`,
                  rotate: `${Math.random() * 360}deg`,
                }}
              >
                {
                  [
                    "💰",
                    "💵",
                    "💸",
                    "💎",
                    "🏆",
                    "🎯",
                    "⭐",
                    "💫",
                    "✨",
                    "🔥",
                    "🚀",
                    "🎉",
                  ][i]
                }
              </motion.div>
            ))}

            {/* Enhanced Crown Icon */}
            <div className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center text-3xl shadow-3xl border-2 border-amber-300/60 animate-bounce"></div>

            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-700 mb-12 drop-shadow-2xl text-center">
              💰 Premium Investment
            </h2>

            {/* Enhanced Price Display */}
            <div className="text-center mb-12 relative">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.6,
                  duration: 1,
                  type: "spring",
                  bounce: 0.4,
                }}
                className="inline-flex items-baseline bg-gradient-to-br from-amber-400/40 to-yellow-600/40 rounded-4xl px-12 py-8 backdrop-blur-sm border-2 border-amber-400/60 shadow-3xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/30 to-transparent -skew-x-12 animate-shine"></div>

                <span className="text-4xl text-yellow-800 mr-4 font-bold">
                  ₹
                </span>
                <span className="text-8xl font-black text-yellow-900 drop-shadow-lg">
                  {fees.amount}
                </span>
                <span className="text-2xl text-yellow-800 ml-4 font-semibold">
                  ONLY
                </span>
              </motion.div>

              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-base font-bold px-6 py-2  shadow-2xl border-2 border-emerald-400/60">
                ⚡ BEST VALUE GUARANTEED
              </div>
            </div>

            {/* Enhanced Refund Policy */}
            <div className="bg-gradient-to-br from-amber-500/15 to-orange-500/15 rounded-3xl p-7 backdrop-blur-sm border-2 border-amber-400/40 relative overflow-hidden mb-8">
              <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-amber-500"></div>
              <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-amber-500"></div>
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-amber-500"></div>
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-amber-500"></div>

              <h4 className="text-2xl font-semibold text-yellow-800 mb-4 flex items-center gap-3">
                <span className="text-3xl">🛡️</span>
                Money-Back Guarantee
              </h4>
              <p className="text-yellow-700 text-base leading-relaxed font-medium">
                {fees.refundPolicy}
              </p>
            </div>

            {/* Enhanced Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                {
                  icon: "👨‍💻",
                  text: "Hands-on Coding",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: "🧠",
                  text: "Real Projects",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  icon: "🎓",
                  text: "Mentorship",
                  color: "from-green-500 to-emerald-500",
                },
                {
                  icon: "📜",
                  text: "Certificate",
                  color: "from-amber-500 to-orange-500",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className={`bg-gradient-to-br ${item.color}/20 rounded-2xl p-4 text-center border-2 border-white/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300`}
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="text-gray-800 text-sm font-bold">{item.text}</p>
                </motion.div>
              ))}
            </div>

            <div className="absolute -bottom-28 -left-28 w-96 h-96 bg-amber-400/15 rounded-full blur-4xl"></div>
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-yellow-500/15 rounded-full blur-3xl"></div>
          </motion.div>
        </div>

        {/* Enhanced Topics Section */}
        <motion.section
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-2xl rounded-4xl shadow-2xl border-2 border-white/30 p-12 mb-20"
        >
          <div className="flex items-center gap-6 mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-2xl">
              📚
            </div>
            <h2 className="text-4xl font-bold text-purple-100">
              Curriculum Highlights
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0, rotateY: 90 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                className="bg-purple-100 rounded-3xl p-6 backdrop-blur-sm border-2 border-white/30 hover:border-purple-400/50 hover:scale-105 transition-all duration-300 group cursor-pointer shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-md">
                    {index + 1}
                  </div>
                  <span className="text-gray-800 font-semibold text-base group-hover:text-purple-700 transition-colors">
                    {topic}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Enhanced Features Section */}
        <motion.section
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-2xl rounded-4xl p-12 shadow-2xl border-2 border-white/30"
        >
          <h2 className="text-4xl font-bold text-purple-100 mb-16 text-center">
            Why This Workshop Stands Out
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎓",
                title: "Expert-Led Training",
                desc: "Learn from industry veterans with 10+ years experience",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: "🛠️",
                title: "Project-Based Learning",
                desc: "Build real applications from day one",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: "📈",
                title: "Career Acceleration",
                desc: "Get job-ready with portfolio projects",
                color: "from-amber-500 to-orange-500",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 + index * 0.2 }}
                className="text-center p-8 bg-white/80 rounded-3xl backdrop-blur-sm border-2 border-white/40 hover:shadow-2xl transition-all duration-300 group"
              >
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-4xl mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {item.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Global Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(5deg);
          }
        }
        @keyframes floatMoney {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          33% {
            transform: translateY(-20px) rotate(5deg) scale(1.1);
          }
          66% {
            transform: translateY(10px) rotate(-5deg) scale(0.9);
          }
        }
        @keyframes shine {
          0% {
            left: -100%;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }
        .animate-shine {
          animation: shine 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default InternshipDetailsPage;
