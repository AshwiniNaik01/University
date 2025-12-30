// CertificateSection.jsx
import { motion } from "framer-motion";

const MotionDiv = motion.div;

export default function CertificateSection() {
  return (
    <section className="py-2 bg-white">
      <div className="max-w-8xl mx-auto px-4 lg:px-8">
        <MotionDiv
          whileHover={{ scale: 1.02 }}
          className="max-w-8xl mx-auto bg-white overflow-hidden"
        >
          <img
            src="https://eprabodhini.lms.muhs.ac.in/static/media/certificateMUHS.45150de5.png"
            alt="University Certificate"
            className="w-full h-auto"
          />
        </MotionDiv>
      </div>
    </section>
  );
}
