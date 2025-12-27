// import { BookOpen, Rocket, Users } from "lucide-react";
// import React from "react";

// const values = [
//   {
//     title: "Experiential Learning",
//     desc: "We emphasize experiential learning through structured practical assignments, applied projects, and real-world problem-solving to reinforce academic concepts.",
//     icon: <BookOpen className="w-7 h-7 text-yellow-700" />,
//   },
//   {
//     title: "Faculty & Industry Experts",
//     desc: "Our programs are led by experienced faculty members and industry professionals who bring academic rigor and practical insights into the classroom.",
//     icon: <Users className="w-7 h-7 text-codedrift-blue" />,
//   },
//   {
//     title: "Industry-Aligned Curriculum",
//     desc: "The curriculum is carefully designed to cover foundational principles through advanced topics, and is regularly updated to align with current industry standards.",
//     icon: <BookOpen className="w-7 h-7 text-codedrift-indigo" />,
//   },
//   {
//     title: "Flexible Learning Pathways",
//     desc: "We offer multiple learning modes, including in-person instruction, live online sessions, and self-paced learning, to support diverse academic needs.",
//     icon: <Rocket className="w-7 h-7 text-yellow-700" />,
//   },
// ];


// const Values = () => {
//   return (
//     <section className="py-20 bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] relative overflow-hidden">
//       {/* Decorative Background */}
//       <div className="absolute top-0 left-0 w-60 h-60 bg-codedrift-pink/10 rounded-full blur-3xl"></div>
//       <div className="absolute bottom-0 right-0 w-80 h-80 bg-codedrift-blue/10 rounded-full blur-3xl"></div>

//       <div className="container relative z-10 text-center">
//         <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-900  bg-clip-text text-transparent mb-14">
//       Academic Values & Learning Philosophy
//         </h2>

//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {values.map((val, i) => (
//             <div
//               key={i}
//               className="relative rounded-2xl p-[2px] bg-gradient-to-r from-blue-900 via-blue-500 to-blue-900 codedrift-gradient-animate 
//                          shadow-lg hover:shadow-xl transition transform hover:-translate-y-2"
//             >
//               {/* Inner Frosted Glass Content */}
//               {/* <div className="bg-white/90  backdrop-blur-md rounded-2xl p-6 h-full flex flex-col i"> */}
//               <div
//                   className="relative bg-white/85 backdrop-blur-xl rounded-2xl p-6 h-full flex flex-col items-center
// ring-1 ring-white/40 overflow-hidden"
//                 >
//                 {/* Icon Circle */}
//                 <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/60 mb-4 shadow-inner">
//                   {val.icon}
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                   {val.title}
//                 </h3>
//                 <p className="text-gray-600 text-sm leading-relaxed">
//                   {val.desc}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Values;


import { BookOpen, Rocket, Users, Target, GraduationCap, Globe, Award, BarChart } from "lucide-react";
import React from "react";

const values = [
  {
    title: "Academic Rigor & Excellence",
    desc: "We maintain the highest standards of academic excellence through rigorous curriculum design, comprehensive assessment methods, and continuous program evaluation.",
    icon: <GraduationCap className="w-8 h-8 text-white" />,
    color: "from-blue-600 to-blue-800",
    stats: "4.5/5 Student Satisfaction"
  },
  {
    title: "Faculty Excellence & Mentorship",
    desc: "Our distinguished faculty members, holding advanced degrees and industry experience, provide personalized mentorship and guide students through their academic journey.",
    icon: <Users className="w-8 h-8 text-white" />,
    color: "from-purple-600 to-purple-800",
    stats: "15:1 Student-Faculty Ratio"
  },
  {
    title: "Research & Innovation",
    desc: "We foster a culture of inquiry and innovation through funded research projects, academic publications, and collaborations with industry and research institutions.",
    icon: <BookOpen className="w-8 h-8 text-white" />,
    color: "from-amber-600 to-amber-800",
    stats: "200+ Research Papers"
  },
  {
    title: "Holistic Student Development",
    desc: "Beyond academics, we focus on developing leadership skills, ethical values, and social responsibility through extracurricular activities and community engagement.",
    icon: <Globe className="w-8 h-8 text-white" />,
    color: "from-emerald-600 to-emerald-800",
    stats: "100+ Student Clubs"
  },
  {
    title: "Industry-Academia Collaboration",
    desc: "Strategic partnerships with leading corporations ensure curriculum relevance, internship opportunities, and successful career placements for our graduates.",
    icon: <Target className="w-8 h-8 text-white" />,
    color: "from-red-600 to-red-800",
    stats: "95% Placement Rate"
  },
  {
    title: "Global Perspective",
    desc: "We prepare students for global careers through international exchange programs, cross-cultural learning opportunities, and curriculum with international standards.",
    icon: <Rocket className="w-8 h-8 text-white" />,
    color: "from-indigo-600 to-indigo-800",
    stats: "30+ Partner Universities"
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
            Our educational philosophy is built upon core values that guide every aspect of 
            academic life, ensuring a transformative learning experience for all students.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {values.map((val, i) => (
            <div
              key={i}
              className="group relative"
            >
              {/* Card with Hover Effect */}
              <div className="relative h-full bg-white rounded-2xl p-8 border border-gray-100 shadow-lg 
                transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-100">
                
                {/* Number Badge */}
                <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-r from-gray-800 to-gray-900 
                  rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {i + 1}
                </div>
                
                {/* Icon Circle with Gradient */}
                <div className={`relative mb-8 p-6 bg-gradient-to-r ${val.color} rounded-2xl 
                  w-20 h-20 flex items-center justify-center shadow-lg group-hover:scale-110 
                  transition-transform duration-500`}>
                  {val.icon}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl"></div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                  {val.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {val.desc}
                </p>

                {/* Stats Bar */}
                <div className="pt-6 border-t border-gray-100">
                  <p className="text-sm font-semibold text-gray-700 mb-2">{val.stats}</p>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className={`bg-gradient-to-r ${val.color} h-2 rounded-full transition-all duration-700 
                      group-hover:w-full`} style={{ width: '85%' }}></div>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent 
                  group-hover:border-blue-200/50 transition-all duration-500 pointer-events-none"></div>
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

        {/* University Seal */}
        {/* <div className="mt-20 max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 via-white to-purple-50 rounded-2xl p-8 border border-gray-100 shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Award className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 
                  rounded-full flex items-center justify-center">
                  <BarChart className="w-5 h-5 text-white" />
                </div>
              </div>
              {/* <div>
                <h4 className="text-2xl font-bold text-gray-900 mb-3">Institutional Excellence</h4>
                <p className="text-gray-700 leading-relaxed">
                  Our commitment to these core values has consistently earned us top rankings 
                  in national academic assessments and recognition for educational innovation.
                </p>
                <div className="flex items-center gap-6 mt-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-800">Top 10</p>
                    <p className="text-sm text-gray-600">National Ranking</p>
                  </div>
                  <div className="h-8 w-px bg-gray-300"></div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-800">B++</p>
                    <p className="text-sm text-gray-600">Quality Rating</p>
                  </div>
                </div>
              </div> */}
            {/* </div>
          </div>
        </div> */} 
      </div>
    </section>
  );
};

export default Values;