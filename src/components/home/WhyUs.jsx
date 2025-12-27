// import React from "react";

// const WhyUs = () => {
//   return (
//     <section className="features-section bg-gray-50 py-20">
//       <div className="container">
//         <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
//           Why Choose <span className="text-codedrift-pink">CodeDrift ?</span>
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {/* Feature 1 */}
//           <div className="bg-white p-8 rounded-2xl shadow-xl border border-codedrift-pink hover:shadow-[0_0_15px_#ef5b87] transition">
//             <h3 className="text-xl font-semibold text-gray-800 mb-3">
//               Project-Based Learning
//             </h3>
//             <p className="text-gray-600">
//               Work on real-world projects from day one and build a job-ready
//               portfolio.
//             </p>
//           </div>

//           {/* Feature 2 */}
//           <div className="bg-white p-8 rounded-2xl shadow-xl border border-codedrift-blue hover:shadow-[0_0_15px_#51c2f1] transition">
//             <h3 className="text-xl font-semibold text-gray-800 mb-3">
//               Industry-Ready Curriculum
//             </h3>
//             <p className="text-gray-600">
//               Courses crafted with inputs from industry experts to match current
//               tech demands.
//             </p>
//           </div>

//           {/* Feature 3 */}
//           <div className="bg-white p-8 rounded-2xl shadow-xl border border-codedrift-indigo hover:shadow-[0_0_15px_#3f51b5] transition">
//             <h3 className="text-xl font-semibold text-gray-800 mb-3">
//               Expert Trainers
//             </h3>
//             <p className="text-gray-600">
//               Learn from professionals with years of teaching and corporate
//               experience.
//             </p>
//           </div>

//           {/* Feature 4 */}
//           <div className="bg-white p-8 rounded-2xl shadow-xl border border-codedrift-pink hover:shadow-[0_0_15px_#ef5b87] transition">
//             <h3 className="text-xl font-semibold text-gray-800 mb-3">
//               Internship & Placement Support
//             </h3>
//             <p className="text-gray-600">
//               Get guidance, mock interviews, and access to internship & job
//               opportunities.
//             </p>
//           </div>

//           {/* Feature 5 */}
//           <div className="bg-white p-8 rounded-2xl shadow-xl border border-codedrift-blue hover:shadow-[0_0_15px_#51c2f1] transition">
//             <h3 className="text-xl font-semibold text-gray-800 mb-3">
//               Flexible Learning
//             </h3>
//             <p className="text-gray-600">
//               Choose from online/offline, weekend, or weekday batches that suit
//               your schedule.
//             </p>
//           </div>

//           {/* Feature 6 */}
//           <div className="bg-white p-8 rounded-2xl shadow-xl border border-codedrift-indigo hover:shadow-[0_0_15px_#3f51b5] transition">
//             <h3 className="text-xl font-semibold text-gray-800 mb-3">
//               Community & Hackathons
//             </h3>
//             <p className="text-gray-600">
//               Be a part of our vibrant tech community with regular coding
//               contests & events.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyUs;



// WhyChooseSGBAU.jsx
import { motion } from "framer-motion";
import { FaAward, FaChalkboardTeacher, FaBuilding, FaHandshake, FaGlobe, FaRocket } from "react-icons/fa";

const MotionDiv = motion.div;

// export default function WhyUs() {
//   return (
//     <section className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">
//       <div className="max-w-7xl mx-auto px-4 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
//             Why Choose <span className="text-blue-600">SGBAU</span>?
//           </h2>
//           <p className="text-gray-600 text-lg max-w-3xl mx-auto">
//             Discover what makes us a preferred destination for higher education
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8">
//           <FeatureCard
//             icon={<FaAward />}
//             title="NAAC B++ Accredited"
//             description="Highest grade accreditation ensuring quality education standards"
//             color="yellow"
//           />
//           <FeatureCard
//             icon={<FaChalkboardTeacher />}
//             title="Expert Faculty"
//             description="800+ experienced professors and industry experts"
//             color="blue"
//           />
//           <FeatureCard
//             icon={<FaBuilding />}
//             title="Modern Infrastructure"
//             description="State-of-the-art labs, libraries, and sports facilities"
//             color="green"
//           />
//           <FeatureCard
//             icon={<FaHandshake />}
//             title="Industry Partnerships"
//             description="Strong collaborations with top companies and hospitals"
//             color="purple"
//           />
//           <FeatureCard
//             icon={<FaGlobe />}
//             title="Global Opportunities"
//             description="International exchange programs and collaborations"
//             color="red"
//           />
//           <FeatureCard
//             icon={<FaRocket />}
//             title="Placement Support"
//             description="Dedicated placement cell with 85% placement rate"
//             color="cyan"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

// function FeatureCard({ icon, title, description, color }) {
//   const colorMap = {
//     yellow: 'text-yellow-600 bg-yellow-50 border-yellow-200',
//     blue: 'text-blue-600 bg-blue-50 border-blue-200',
//     green: 'text-green-600 bg-green-50 border-green-200',
//     purple: 'text-purple-600 bg-purple-50 border-purple-200',
//     red: 'text-red-600 bg-red-50 border-red-200',
//     cyan: 'text-cyan-600 bg-cyan-50 border-cyan-200'
//   };

//   return (
//     <MotionDiv 
//       whileHover={{ scale: 1.05 }}
//       className={`rounded-2xl border-2 ${colorMap[color]} p-6 shadow-lg hover:shadow-xl transition-all duration-300`}
//     >
//       <div className="flex items-center gap-4 mb-4">
//         <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorMap[color].replace('50', '100')}`}>
//           <div className="text-xl">
//             {icon}
//           </div>
//         </div>
//         <h3 className="text-lg font-bold text-gray-800">{title}</h3>
//       </div>
//       <p className="text-gray-600">{description}</p>
//     </MotionDiv>
//   );
// }


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
        <h3 className="text-xl font-bold text-white mb-2">
          {title}
        </h3>
        <p className="text-blue-100 leading-relaxed">
          {description}
        </p>

        {/* Hover Glow */}
        <div
          className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 
          transition-opacity duration-500 bg-gradient-to-br ${gradientMap[color]}`}
        />
      </div>
    </MotionDiv>
  );
}
