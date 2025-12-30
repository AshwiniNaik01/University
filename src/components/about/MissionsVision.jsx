import { motion } from "framer-motion";
import {
  Award,
  Globe,
  GraduationCap,
  Rocket,
  Shield,
  Target
} from "lucide-react";

const slideFromRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const MissionsVision = () => (
  <section className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
    {/* Academic Background Elements */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-purple-100/20"></div>

    {/* University Crest Pattern */}
    <div className="absolute inset-0 opacity-5">
      <div className="grid grid-cols-10 grid-rows-10 h-full">
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className="flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-gray-400" />
          </div>
        ))}
      </div>
    </div>

    {/* Decorative Elements */}
    <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
    <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full blur-3xl"></div>

    {/* Section Heading */}
    <div className="container text-center mb-16 relative z-10">
      <div className="inline-flex items-center gap-3 mb-6">
        <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
        <span className="text-sm font-semibold tracking-wider text-blue-700 uppercase">
          Academic Philosophy
        </span>
        <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
      </div>

      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-800 via-purple-800 to-blue-800 bg-clip-text text-transparent leading-tight mb-6">
        Our Academic Mission & Vision
      </h2>
      <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
        At{" "}
        <span className="font-bold text-blue-800">
          University Academic Programs
        </span>
        , we foster intellectual growth through rigorous scholarship, innovative
        teaching, and a commitment to academic excellence that prepares students
        for leadership roles.
      </p>
    </div>

    {/* Cards Grid */}
    <div className="container relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 px-4 max-w-6xl mx-auto">
        {/* Mission Card */}
        <motion.div
          className="relative group"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideFromRight}
        >
          {/* Card Border with Animation */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>

          {/* Main Card */}
          <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 h-full border border-gray-100 shadow-xl">
            {/* Icon with Academic Seal */}
            <div className="relative mb-8">
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full blur-xl opacity-30"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                <Award className="w-4 h-4 text-white" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="text-blue-700">Academic Mission</span>
            </h3>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="flex items-start gap-3">
                <span className="inline-flex w-6 h-6 bg-blue-100 text-blue-700 rounded-full items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </span>
                <span>
                  To provide{" "}
                  <strong className="text-blue-800">
                    comprehensive academic programs
                  </strong>{" "}
                  that combine theoretical foundations with practical
                  application across disciplines.
                </span>
              </p>

              <p className="flex items-start gap-3">
                <span className="inline-flex w-6 h-6 bg-blue-100 text-blue-700 rounded-full items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </span>
                <span>
                  Foster{" "}
                  <strong className="text-blue-800">critical thinking</strong>{" "}
                  and{" "}
                  <strong className="text-blue-800">
                    research capabilities
                  </strong>
                  through mentorship from distinguished faculty members.
                </span>
              </p>

              <p className="flex items-start gap-3">
                <span className="inline-flex w-6 h-6 bg-blue-100 text-blue-700 rounded-full items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </span>
                <span>
                  Create an inclusive learning environment that promotes{" "}
                  <strong className="text-blue-800">academic excellence</strong>
                  ,
                  <strong className="text-blue-800"> ethical leadership</strong>
                  , and{" "}
                  <strong className="text-blue-800">lifelong learning</strong>.
                </span>
              </p>
            </div>

            {/* Stats Bar */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-800">15,000+</p>
                  <p className="text-sm text-gray-600">Alumni Network</p>
                </div>
                <div className="h-8 w-px bg-gray-200"></div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-800">95%</p>
                  <p className="text-sm text-gray-600">Placement Rate</p>
                </div>
                <div className="h-8 w-px bg-gray-200"></div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-700">50+</p>
                  <p className="text-sm text-gray-600">Academic Programs</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Vision Card */}
        <motion.div
          className="relative group"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideFromLeft}
        >
          {/* Card Border with Animation */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>

          {/* Main Card */}
          <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 h-full border border-gray-100 shadow-xl">
            {/* Icon with Academic Seal */}
            <div className="relative mb-8">
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full blur-xl opacity-30"></div>
              <div className="relative bg-gradient-to-br from-purple-600 to-purple-800 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="text-purple-700">Academic Vision</span>
            </h3>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="flex items-start gap-3">
                <span className="inline-flex w-6 h-6 bg-purple-100 text-purple-700 rounded-full items-center justify-center flex-shrink-0 mt-1">
                  ★
                </span>
                <span>
                  To be recognized as a{" "}
                  <strong className="text-purple-800">
                    premier institution
                  </strong>{" "}
                  for academic innovation and excellence that transforms
                  students into global leaders.
                </span>
              </p>

              <p className="flex items-start gap-3">
                <span className="inline-flex w-6 h-6 bg-purple-100 text-purple-700 rounded-full items-center justify-center flex-shrink-0 mt-1">
                  ★
                </span>
                <span>
                  Pioneer{" "}
                  <strong className="text-purple-800">
                    interdisciplinary research
                  </strong>{" "}
                  and
                  <strong className="text-purple-800">
                    {" "}
                    collaborative learning
                  </strong>{" "}
                  that addresses complex global challenges.
                </span>
              </p>

              <p className="flex items-start gap-3">
                <span className="inline-flex w-6 h-6 bg-purple-100 text-purple-700 rounded-full items-center justify-center flex-shrink-0 mt-1">
                  ★
                </span>
                <span>
                  Cultivate an academic community that values{" "}
                  <strong className="text-purple-800">diversity</strong>,
                  <strong className="text-purple-800"> integrity</strong>, and{" "}
                  <strong className="text-purple-800">
                    social responsibility
                  </strong>
                  in all scholarly endeavors.
                </span>
              </p>
            </div>

            {/* Future Goals */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <h4 className="font-semibold text-gray-800 mb-4">
                Strategic Goals 2025-2030
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Research Publications
                  </span>
                  <span className="font-bold text-purple-700">2,500+</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-700 h-2 rounded-full w-3/4"></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    International Collaborations
                  </span>
                  <span className="font-bold text-blue-700">100+</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-700 h-2 rounded-full w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Accreditation Banner */}
      <div className="mt-20 max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900">
                  Accredited Excellence
                </h4>
                <p className="text-gray-600">
                  Recognized by National Accreditation Council
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-800">B++</p>
                <p className="text-sm text-gray-600">NAAC Grade</p>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-800">50+</p>
                <p className="text-sm text-gray-600">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default MissionsVision;
