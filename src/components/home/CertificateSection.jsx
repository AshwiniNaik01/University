// CertificateSection.jsx
import { motion } from "framer-motion";

const MotionDiv = motion.div;

export default function CertificateSection() {
  return (
    <section className="py-2 bg-white">
      <div className="max-w-8xl mx-auto px-4 lg:px-8">
        {/* <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            University <span className="text-blue-600">Certification</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Recognized certification upon successful completion of programs
          </p>
        </div> */}

        <MotionDiv
          whileHover={{ scale: 1.02 }}
          className="max-w-8xl mx-auto bg-white overflow-hidden"
        >
          <img
            src="https://eprabodhini.lms.muhs.ac.in/static/media/certificateMUHS.45150de5.png"
            alt="University Certificate"
            className="w-full h-auto"
          />
          {/* <div className="p-6 bg-gradient-to-r from-blue-50 to-white">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  SGBAU University Certificate
                </h3>
                <p className="text-gray-600">
                  UGC recognized certificate with digital verification
                </p>
              </div>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300">
                  View Sample
                </button>
                <button className="px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all duration-300">
                  Verify Certificate
                </button>
              </div>
            </div>
          </div> */}
        </MotionDiv>
      </div>
    </section>
  );
}