// HeroSection.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowRight, FaAward, FaGlobe } from "react-icons/fa";
import { Link } from "react-router-dom";

const MotionLink = motion(Link);
const MotionDiv = motion.div;

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderImages = [
    {
      url: "https://campuspro.co.in/collage-image/1749038383_row_282.jpg",
      title: "Sant Gadge Baba Amravati University",
      subtitle: "Est. 1983 • NAAC 'B++' Grade • UGC Approved",
    },
    {
      url: "https://sgbau.ac.in/departments/botany/images/frontimg.jpg",
      title: "Innovative Learning Ecosystem",
      subtitle: "State-of-the-art infrastructure for holistic education",
    },
    {
      url: "https://mba.icnn.in/wp-content/uploads/2021/09/SGBAU-MBA-Admission-1.png",
      title: "Global Academic Excellence",
      subtitle: "Connecting students to worldwide opportunities",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-8xl mx-auto px-14 lg:px-14 py-12 lg:py-18">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight font-serif">
              <span className="text-white">Sant Gadge Baba</span>
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                Amravati University
              </span>
            </h1>

            <p className="text-xl text-blue-100 leading-relaxed">
              Where tradition meets innovation in education.
              <span className="font-semibold text-yellow-300">
                {" "}
                Nurturing excellence
              </span>{" "}
              across
              <span className="font-semibold text-emerald-300">
                {" "}
                200+ programs
              </span>{" "}
              for
              <span className="font-semibold text-cyan-300">
                {" "}
                50,000+ students
              </span>
              .
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <StatCard number="50K+" label="Students" color="yellow" />
              <StatCard number="200+" label="Programs" color="emerald" />
              <StatCard number="800+" label="Faculty" color="cyan" />
              <StatCard number="40+" label="Years" color="purple" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <MotionLink
                to="/courses#courses-list"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3"
              >
                Explore Courses <FaArrowRight />
              </MotionLink>
              <MotionLink
                to="/auth/register"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3"
              >
                Join Now <FaGlobe />
              </MotionLink>
            </div>
          </div>

          {/* Right Slider */}
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-2xl border-2 border-white/20 backdrop-blur-sm">
              <div className="relative h-[400px] lg:h-[500px]">
                {sliderImages.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ${
                      index === currentSlide
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-105"
                    }`}
                  >
                    <img
                      src={slide.url}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent"></div>
                    <div
                      className={`absolute bottom-0 left-0 right-0 p-8 transition-all duration-700 ${
                        index === currentSlide
                          ? "translate-y-0 opacity-100"
                          : "translate-y-10 opacity-0"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full animate-pulse"></div>
                        <span className="text-yellow-300 text-sm font-bold">
                          UNIVERSITY HIGHLIGHT
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {slide.title}
                      </h3>
                      <p className="text-blue-100">{slide.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                {sliderImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "w-8 bg-gradient-to-r from-yellow-400 to-yellow-500"
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="absolute -top-6 -right-6">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 text-white p-4 rounded-lg shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500">
                <div className="flex items-center gap-3">
                  <FaAward className="text-2xl" />
                  <div>
                    <div className="font-bold">NAAC B++</div>
                    <div className="text-xs text-yellow-200">Accredited</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ number, label, color }) {
  const colorMap = {
    yellow: "text-yellow-400",
    emerald: "text-emerald-400",
    cyan: "text-cyan-400",
    purple: "text-purple-400",
  };

  return (
    <MotionDiv
      whileHover={{ scale: 1.05 }}
      className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
    >
      <div className={`text-3xl font-bold ${colorMap[color]} mb-1`}>
        {number}
      </div>
      <div className="text-white/90 text-sm">{label}</div>
    </MotionDiv>
  );
}
