import { GraduationCap } from "lucide-react";
import { Button } from "../utility/Button";

const EnrollStrip = ({ course, handleEnrollCourse }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full z-[800]">
      {/* Gradient Background with faint overlay text */}
      <div className="absolute inset-0 z-[802] codedrift-gradient codedrift-gradient-animate overflow-hidden flex items-center justify-center">
        <h2 className="text-[10vw] sm:text-[7vw] lg:text-[5vw] font-extrabold uppercase text-white/10 tracking-widest whitespace-nowrap select-none pointer-events-none">
          Enroll Now
        </h2>
      </div>

      {/* Content Block on top of gradient */}
      <div className="relative z-[804] bg-white/80 backdrop-blur-sm border-t border-t-indigo-600/40 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] px-1 py-2 sm:px-6 sm:py-2.5">
        <div className="container">
          <div className="flex flex-row-reverse sm:flex-row items-center justify-center gap-1 md:gap-8 sm:gap-4 text-center sm:text-left">
            {/* Left: Course Info */}
            <p className="text-gray-800 text-sm sm:text-base flex items-center gap-0.5">
              <GraduationCap className="w-5 h-5 text-codedrift-indigo" />
              <span className="font-semibold">{course.name}</span>
              <span className="hidden sm:inline">–</span>
              <span className="text-codedrift-pink">
                ₹{course.price || 8000}
              </span>
            </p>

            {/* Right: Enroll Button */}
            <Button
              onClick={handleEnrollCourse}
              // className="relative bg-codedrift-pink hover:bg-codedrift-indigo-dark text-white font-semibold text-sm sm:text-base px-6 py-1 rounded-full shadow-md transition-all group"
            >
              Enroll
              <span className="hidden sm:inline">&nbsp;Now</span>
              {/* subtle glow ring */}
              <span className="absolute inset-0 rounded-full ring-2 ring-transparent group-hover:ring-codedrift-blue/30 transition duration-300"></span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollStrip;
