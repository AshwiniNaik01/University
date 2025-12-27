import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../utility/Button";
import Testimonial from "../common/Testimonial";
import { fetchTestimonials } from "../../pages/testimonials/testimonials";

// Testimonial: This page shows the student feedback in the home page

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      const data = await fetchTestimonials();
      setTestimonials(data);
      setLoading(false);
    };

    loadTestimonials();
  }, []);

  return (
    <section className="relative py-20 bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] overflow-hidden">
      <div className="container">
        {/* Background shapes */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-codedrift-pink opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-codedrift-blue opacity-10 rounded-full blur-3xl"></div>

        <div className="relative text-center z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 relative inline-block">
            What Our Students Say
            <span className="absolute left-1/2 -bottom-2 w-2/3 h-1 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 *:rounded-full transform -translate-x-1/2"></span>
          </h2>
          <p className="text-gray-600 mb-16 max-w-2xl mx-auto">
            Real experiences from students who’ve upskilled with Code Drift.
          </p>

          {/* Testimonials */}
          {loading ? (
            <p className="text-gray-500">Loading testimonials...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {testimonials.slice(0, 6).map((t, i) => (
                <Testimonial key={i} testimonial={t} />
              ))}
            </div>
          )}

          {/* Show more Button */}
          <div className="mt-12">
            <Button
              as="link"
              to="/testimonials"
              className="inline-block px-6 py-3 bg-indigo-800 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              Show More Testimonials →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;


// TestimonialsSection.jsx
// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { FaQuoteLeft, FaStar } from "react-icons/fa";
// // import { fetchTestimonials } from "../../api/testimonialApi";
// import { fetchTestimonials } from "../../pages/testimonials/testimonials";

// const MotionDiv = motion.div;

// export default function Testimonials() {
//   const [testimonials, setTestimonials] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadTestimonials = async () => {
//       const data = await fetchTestimonials();
//       setTestimonials(data);
//       setLoading(false);
//     };
//     loadTestimonials();
//   }, []);

//   return (
//     <section className="py-20 bg-gradient-to-br from-white to-blue-50">
//       <div className="max-w-7xl mx-auto px-4 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
//             What Our <span className="text-blue-600">Students Say</span>
//           </h2>
//           <p className="text-gray-600 text-lg max-w-3xl mx-auto">
//             Real experiences from students who've transformed their careers at SGBAU
//           </p>
//         </div>

//         {loading ? (
//           <div className="text-center py-10">
//             <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           </div>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {testimonials.slice(0, 6).map((testimonial, i) => (
//               <MotionDiv
//                 key={i}
//                 whileHover={{ y: -10 }}
//                 className="bg-white rounded-2xl border-2 border-blue-100 p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
//               >
//                 <div className="flex items-center gap-2 mb-4">
//                   {[...Array(5)].map((_, idx) => (
//                     <FaStar key={idx} className="text-yellow-400" />
//                   ))}
//                 </div>
//                 <div className="mb-6">
//                   <FaQuoteLeft className="text-blue-200 text-2xl mb-4" />
//                   <p className="text-gray-700 italic line-clamp-4">
//                     "{testimonial.feedback || testimonial.review}"
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-4 pt-4 border-t border-blue-50">
//                   <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
//                     {testimonial.studentName?.charAt(0) || "S"}
//                   </div>
//                   <div>
//                     <h4 className="font-bold text-gray-800">
//                       {testimonial.studentName || "Student"}
//                     </h4>
//                     <p className="text-sm text-gray-600">
//                       {testimonial.program || "SGBAU Student"}
//                     </p>
//                   </div>
//                 </div>
//               </MotionDiv>
//             ))}
//           </div>
//         )}

//         <div className="text-center mt-12">
//           <MotionDiv
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
//           >
//             View More Testimonials →
//           </MotionDiv>
//         </div>
//       </div>
//     </section>
//   );
// }
