import { motion } from "framer-motion";
import { Target, Rocket } from "lucide-react";

const slideFromRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const MissionsVision = () => (
  <section className="relative py-24 bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] overflow-hidden">
    {/* Decorative Background */}
    <div className="absolute top-0 left-0 w-72 h-72 bg-codedrift-pink/10 rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-codedrift-blue/10 rounded-full blur-3xl"></div>

    {/* Section Heading */}
    <div className="container text-center mb-16 relative z-10">
      <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#ee4f7e] to-[#4cb7e5] bg-clip-text text-transparent leading-snug">
        Mission & Vision
      </h2>
      <p className="text-gray-700 mt-4 max-w-2xl mx-auto">
        At <span className="text-codedrift-pink font-semibold">Code Drift</span>
        , we empower individuals through expert-led, hands-on training to excel
        in the tech industry.
      </p>
    </div>

    {/* Cards Grid */}
    <div className="container">
      <div className="relative grid md:grid-cols-2 gap-10 px-4 z-10">
        {/* Mission Card */}
        <motion.div
          className="relative rounded-2xl p-[2px] codedrift-gradient codedrift-gradient-animate shadow-lg hover:shadow-2xl transition overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideFromRight}
        >
          {/* ✅ Frosted Overlay Layer (same for both cards) */}
          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-2xl z-[1]"></div>

          {/* ✅ Inner Glass Card (Tailwind-only, consistent for both) */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 h-full relative z-[2]">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-codedrift-pink/10 mr-3">
                <Target className="w-6 h-6 text-codedrift-pink" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-3">
              We provide{" "}
              <span className="font-semibold text-codedrift-indigo">
                hands-on learning
              </span>
              ,{" "}
              <span className="font-semibold text-codedrift-indigo">
                flexible options
              </span>
              , and{" "}
              <span className="font-semibold text-codedrift-indigo">
                expert instruction
              </span>{" "}
              in MERN, Java FSD, Python, and more.
            </p>
            <p className="text-gray-600">
              Whether you’re starting or advancing your career, we help you gain
              practical experience to thrive in today’s tech landscape.
            </p>
          </div>
        </motion.div>

        {/* Vision Card */}
        <motion.div
          className="relative rounded-2xl p-[2px] codedrift-gradient codedrift-gradient-animate shadow-lg hover:shadow-2xl transition overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideFromLeft}
        >
          {/* ✅ Frosted Overlay Layer (same for both cards) */}
          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-2xl z-[1]"></div>

          {/* ✅ Inner Glass Card (Tailwind-only, consistent for both) */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 h-full relative z-[2]">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-codedrift-blue/10 mr-3">
                <Rocket className="w-6 h-6 text-codedrift-blue" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-3">
              We aim to make{" "}
              <span className="font-semibold text-codedrift-indigo">
                quality software education
              </span>{" "}
              accessible to all, building a diverse and inclusive tech
              community.
            </p>
            <p className="text-gray-600">
              Staying updated with the latest industry trends, we prepare future
              innovators to build impactful, future-ready solutions.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default MissionsVision;
