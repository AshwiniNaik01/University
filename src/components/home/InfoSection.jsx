import { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaAward,
  FaBook,
  FaBrain,
  FaGraduationCap,
  FaStar,
  FaUniversity,
} from "react-icons/fa";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export default function InfoSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderImages = [
    {
      url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Innovative Learning Environment",
      subtitle: "State-of-the-art campus with modern facilities",
    },
    {
      url: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "World-Class Research Center",
      subtitle: "Pioneering research in health sciences",
    },
    {
      url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Global Recognition",
      subtitle: "Accredited by international health organizations",
    },
  ];

  // Auto slide rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                             linear-gradient(to bottom, white 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative px-4 lg:px-8">
        {/* Main Content Container */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hero Content */}
          <div className="relative z-10 space-y-8">
            {/* University Badge */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <FaUniversity className="text-white text-lg" />
              </div>
              <span className="text-white font-semibold text-lg">MUHS</span>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                  Maharashtra University
                </span>
                <br />
                <span className="text-white">of Health Sciences</span>
              </h1>

              {/* Animated Subtitle */}
              <div className="relative">
                <p className="text-xl text-gray-300 leading-relaxed">
                  Where{" "}
                  <span className="text-cyan-300 font-semibold">
                    innovation
                  </span>{" "}
                  meets
                  <span className="text-emerald-300 font-semibold">
                    {" "}
                    excellence
                  </span>{" "}
                  in
                  <span className="text-blue-300 font-semibold">
                    {" "}
                    healthcare
                  </span>{" "}
                  education
                </p>
                <div className="absolute -bottom-2 left-0 w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
              <StatCard number="50K+" label="Students" color="blue" />
              <StatCard number="200+" label="Programs" color="emerald" />
              <StatCard number="1.5K+" label="Faculty" color="purple" />
              <StatCard number="25+" label="Years" color="cyan" />
            </div>

            {/* CTA Button */}
            <button className="group relative mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <span className="relative z-10 flex items-center gap-3">
                Explore Programs
                <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/30 to-purple-400/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
          </div>

          {/* Right Column - Interactive Slider */}
          <div className="relative">
            {/* Slider Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/50 to-slate-900/50">
              {/* Main Image */}
              <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
                {sliderImages.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                    {/* Slide Content */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 p-8 transition-all duration-700 ${
                        index === currentSlide
                          ? "translate-y-0 opacity-100"
                          : "translate-y-10 opacity-0"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-cyan-300 text-sm font-semibold">
                          FEATURED
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {slide.title}
                      </h3>
                      <p className="text-gray-300">{slide.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                {sliderImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "w-8 bg-gradient-to-r from-cyan-500 to-blue-500"
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() =>
                  setCurrentSlide(
                    (prev) =>
                      (prev - 1 + sliderImages.length) % sliderImages.length
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 hover:scale-110 border border-white/20"
              >
                <FaArrowRight className="rotate-180" />
              </button>
              <button
                onClick={() =>
                  setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 hover:scale-110 border border-white/20"
              >
                <FaArrowRight />
              </button>
            </div>

            {/* Floating Feature Cards */}
            <div className="absolute -bottom-6 -left-6 z-20">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-4 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500 hover:shadow-blue-500/30">
                <div className="flex items-center gap-3">
                  <FaAward className="text-2xl text-yellow-300" />
                  <div>
                    <div className="font-bold">NAAC B++</div>
                    <div className="text-xs text-blue-200">Accredited</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 z-20">
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white p-4 rounded-2xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-all duration-500 hover:shadow-emerald-500/30">
                <div className="flex items-center gap-3">
                  <FaBrain className="text-2xl text-cyan-300" />
                  <div>
                    <div className="font-bold">Top 5%</div>
                    <div className="text-xs text-emerald-200">
                      Research Output
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Feature Cards */}
        <div className="mt-24 grid md:grid-cols-3 gap-6 relative z-10">
          <FeatureCard
            icon={<FaStar className="text-3xl" />}
            title="Top Rated Courses"
            description="Cutting-edge curriculum designed by industry experts and academic leaders"
            color="amber"
            gradient="from-amber-500/20 via-amber-600/10 to-transparent"
            border="border-amber-500/30"
            buttonText="View Courses"
          />
          <FeatureCard
            icon={<FaBook className="text-3xl" />}
            title="Digital Library"
            description="Access 1M+ resources, journals, and research papers in our virtual library"
            color="blue"
            gradient="from-blue-500/20 via-blue-600/10 to-transparent"
            border="border-blue-500/30"
            buttonText="Explore Library"
          />
          <FeatureCard
            icon={<FaGraduationCap className="text-3xl" />}
            title="Expert Training"
            description="Learn from accomplished faculty with real-world healthcare experience"
            color="purple"
            gradient="from-purple-500/20 via-purple-600/10 to-transparent"
            border="border-purple-500/30"
            buttonText="Meet Faculty"
          />
        </div>
      </div>
    </section>
  );
}

function StatCard({ number, label, color }) {
  const colorMap = {
    blue: "text-blue-400",
    emerald: "text-emerald-400",
    purple: "text-purple-400",
    cyan: "text-cyan-400",
  };

  return (
    <div className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group">
      <div
        className={`text-3xl font-bold ${colorMap[color]} group-hover:scale-110 transition-transform duration-300`}
      >
        {number}
      </div>
      <div className="text-gray-400 text-sm mt-2">{label}</div>
      <div
        className={`w-8 h-1 mx-auto mt-3 bg-gradient-to-r ${colorMap[color]} to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      ></div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  color,
  gradient,
  border,
  buttonText,
}) {
  const colorMap = {
    amber: "text-amber-400",
    blue: "text-blue-400",
    purple: "text-purple-400",
  };

  return (
    <div
      className={`relative p-6 rounded-3xl bg-gradient-to-br ${gradient} backdrop-blur-sm border ${border} group hover:scale-[1.02] transition-all duration-500 overflow-hidden`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -inset-1 bg-gradient-to-r from-white/5 to-transparent blur-xl"></div>
      </div>

      {/* Icon */}
      <div
        className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br ${border} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
      >
        <div className={colorMap[color]}>{icon}</div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 mb-6 leading-relaxed">{description}</p>

        {/* Button */}
        <button
          className={`flex items-center gap-2 text-sm font-semibold ${colorMap[color]} hover:gap-3 transition-all duration-300 group/btn`}
        >
          {buttonText}
          <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" />
        </button>
      </div>

      {/* Decorative Element */}
      <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
}
