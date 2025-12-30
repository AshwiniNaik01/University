// AdmissionsSection.jsx
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const MotionLink = motion(Link);

export default function AdmissionsSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Admissions <span className="text-yellow-300">2025</span> Open
          </h2>
          <p className="text-blue-200 text-lg max-w-3xl mx-auto">
            Start your academic journey at SGBAU. Applications now open for all
            programs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <AdmissionCard
            title="Undergraduate Programs"
            deadline="June 30, 2025"
            exams={["NEET", "JEE", "CET", "University Entrance"]}
            color="yellow"
          />
          <AdmissionCard
            title="Postgraduate Programs"
            deadline="July 15, 2025"
            exams={["GATE", "NET", "University PG Entrance"]}
            color="emerald"
          />
          <AdmissionCard
            title="Ph.D. Programs"
            deadline="Rolling Admissions"
            exams={["UGC NET", "CSIR NET", "University Entrance"]}
            color="purple"
          />
        </div>

        <div className="text-center mt-12">
          <MotionLink
            to="/admissions"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            Apply Now <FaArrowRight />
          </MotionLink>
        </div>
      </div>
    </section>
  );
}

function AdmissionCard({ title, deadline, exams, color }) {
  const colorMap = {
    yellow: "bg-gradient-to-br from-yellow-400 to-yellow-500",
    emerald: "bg-gradient-to-br from-emerald-400 to-emerald-500",
    purple: "bg-gradient-to-br from-purple-400 to-purple-500",
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="mb-6">
        <div className="text-blue-200 text-sm mb-2">Application Deadline</div>
        <div className="text-2xl font-bold text-yellow-300">{deadline}</div>
      </div>
      <div>
        <div className="text-blue-200 text-sm mb-3">Eligibility Exams</div>
        <div className="space-y-2">
          {exams.map((exam, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-white/90">{exam}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-white/20">
        <div
          className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${colorMap[color]} text-white`}
        >
          Apply Now
        </div>
      </div>
    </div>
  );
}
