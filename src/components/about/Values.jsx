import {
  BookOpen,
  Globe,
  GraduationCap,
  Rocket,
  Target,
  Users,
} from "lucide-react";

const values = [
  {
    title: "Academic Rigor & Excellence",
    desc: "We maintain the highest standards of academic excellence through rigorous curriculum design, comprehensive assessment methods, and continuous program evaluation.",
    icon: <GraduationCap className="w-8 h-8 text-white" />,
    color: "from-blue-600 to-blue-800",
    stats: "4.5/5 Student Satisfaction",
  },
  {
    title: "Faculty Excellence & Mentorship",
    desc: "Our distinguished faculty members, holding advanced degrees and industry experience, provide personalized mentorship and guide students through their academic journey.",
    icon: <Users className="w-8 h-8 text-white" />,
    color: "from-purple-600 to-purple-800",
    stats: "15:1 Student-Faculty Ratio",
  },
  {
    title: "Research & Innovation",
    desc: "We foster a culture of inquiry and innovation through funded research projects, academic publications, and collaborations with industry and research institutions.",
    icon: <BookOpen className="w-8 h-8 text-white" />,
    color: "from-amber-600 to-amber-800",
    stats: "200+ Research Papers",
  },
  {
    title: "Holistic Student Development",
    desc: "Beyond academics, we focus on developing leadership skills, ethical values, and social responsibility through extracurricular activities and community engagement.",
    icon: <Globe className="w-8 h-8 text-white" />,
    color: "from-emerald-600 to-emerald-800",
    stats: "100+ Student Clubs",
  },
  {
    title: "Industry-Academia Collaboration",
    desc: "Strategic partnerships with leading corporations ensure curriculum relevance, internship opportunities, and successful career placements for our graduates.",
    icon: <Target className="w-8 h-8 text-white" />,
    color: "from-red-600 to-red-800",
    stats: "95% Placement Rate",
  },
  {
    title: "Global Perspective",
    desc: "We prepare students for global careers through international exchange programs, cross-cultural learning opportunities, and curriculum with international standards.",
    icon: <Rocket className="w-8 h-8 text-white" />,
    color: "from-indigo-600 to-indigo-800",
    stats: "30+ Partner Universities",
  },
];

const Values = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-5"></div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-full blur-3xl"></div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            <span className="text-sm font-semibold tracking-wider text-blue-700 uppercase">
              Core Principles
            </span>
            <div className="w-12 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent leading-tight mb-6">
            Academic Values & Educational Philosophy
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
            Our educational philosophy is built upon core values that guide
            every aspect of academic life, ensuring a transformative learning
            experience for all students.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {values.map((val, i) => (
            <div key={i} className="group relative">
              {/* Card with Hover Effect */}
              <div
                className="relative h-full bg-white rounded-2xl p-8 border border-gray-100 shadow-lg 
                transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-100"
              >
                {/* Number Badge */}
                <div
                  className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-r from-gray-800 to-gray-900 
                  rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                >
                  {i + 1}
                </div>

                {/* Icon Circle with Gradient */}
                <div
                  className={`relative mb-8 p-6 bg-gradient-to-r ${val.color} rounded-2xl 
                  w-20 h-20 flex items-center justify-center shadow-lg group-hover:scale-110 
                  transition-transform duration-500`}
                >
                  {val.icon}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl"></div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                  {val.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{val.desc}</p>

                {/* Stats Bar */}
                <div className="pt-6 border-t border-gray-100">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    {val.stats}
                  </p>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className={`bg-gradient-to-r ${val.color} h-2 rounded-full transition-all duration-700 
                      group-hover:w-full`}
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div
                  className="absolute inset-0 rounded-2xl border-2 border-transparent 
                  group-hover:border-blue-200/50 transition-all duration-500 pointer-events-none"
                ></div>
              </div>

              {/* Connecting Lines for Grid */}
              {i < values.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-blue-200 to-purple-200"></div>
              )}
              {i < values.length - 3 && (
                <div className="hidden lg:block absolute -bottom-4 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-blue-200 to-purple-200"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
