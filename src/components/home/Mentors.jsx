import { useState, useEffect } from "react";
import { getAllMentors } from "./mentorApi";
import Mentor from "../mentors/Mentor";
import { DIR } from "../../config";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import { Button } from "../utility/Button";

/**
 * Mentors Component
 * 
 * Fetches and displays a list of mentors in a grid layout.
 ===================================================================
 * Provides a call-to-action button to navigate to the full mentors page.
 */

export default function Mentors() {
  const [mentorsList, setMentorsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Effect used to fetch mentors data once on component mount
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        const data = await getAllMentors();
        setMentorsList(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  return (
    <section className="relative py-20 bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] overflow-hidden">
      {/* Decorative blurred shapes for visual interest */}
      <div className="absolute top-0 right-10 w-72 h-72 bg-codedrift-indigo opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-codedrift-pink opacity-10 rounded-full blur-3xl"></div>

      <div className="container">
        <div className="relative z-10 text-center">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 inline-block relative">
            Meet Your Mentors
            <span className="absolute left-1/2 -bottom-2 w-2/3 h-1 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-full transform -translate-x-1/2"></span>
          </h2>

          {/* Subheading / description */}
          <p className="text-gray-600 mb-16 max-w-2xl mx-auto">
            Learn from experienced professionals who bring real-world expertise
            into every session.
          </p>

          {/* Mentor Grid */}
          {loading ? (
            <p className="text-gray-500">Loading mentors...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {/* Only display top 3 mentors for preview */}
              {mentorsList.slice(0, 3).map((mentor) => (
                <Mentor
                  key={mentor._id}
                  mentor={{
                    img: `${DIR.TRAINER_PROFILE_PHOTO}${
                      mentor.profilePhotoTrainer || "default-avatar.png"
                    }`,
                    name: mentor.fullName,
                    title: mentor.highestQualification,
                    bio: mentor.summary,
                    linkedin: mentor.linkedin || "#",
                    id: mentor._id,
                    link: `mentors/m/${mentor._id}`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Show Experts Button */}
          <div className="mt-12 text-center">
            <Button
              as="link"
              to="/mentors"
              variant="indigo"
              size="md"
              className="gap-2"
            >
              <Users className="w-5 h-5" />
              Show Experts
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}



// // MentorsSection.jsx
// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { FaLinkedin, FaUserGraduate, FaBriefcase } from "react-icons/fa";
// // import { getAllMentors } from "../../api/mentorApi";
// import { getAllMentors } from "./mentorApi";
// import { DIR } from "../../config";

// const MotionDiv = motion.div;

// export default function Mentors() {
//   const [mentors, setMentors] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMentors = async () => {
//       try {
//         const data = await getAllMentors();
//         setMentors(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMentors();
//   }, []);

//   return (
//     <section className="py-20 bg-gradient-to-br from-white to-blue-50">
//       <div className="max-w-7xl mx-auto px-4 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
//             Meet Our <span className="text-blue-600">Faculty</span>
//           </h2>
//           <p className="text-gray-600 text-lg max-w-3xl mx-auto">
//             Learn from experienced professors and industry experts
//           </p>
//         </div>

//         {loading ? (
//           <div className="text-center py-10">
//             <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           </div>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {mentors.slice(0, 3).map((mentor, i) => (
//               <MotionDiv
//                 key={i}
//                 whileHover={{ y: -10 }}
//                 className="bg-white rounded-2xl border-2 border-blue-100 p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
//               >
//                 <div className="flex flex-col items-center text-center">
//                   <img
//                     src={`${DIR.TRAINER_PROFILE_PHOTO}${mentor.profilePhotoTrainer || "default-avatar.png"}`}
//                     alt={mentor.fullName}
//                     className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 mb-4"
//                   />
//                   <h3 className="text-xl font-bold text-gray-800 mb-1">
//                     {mentor.fullName}
//                   </h3>
//                   <p className="text-blue-600 mb-3">{mentor.highestQualification}</p>
//                   <div className="flex items-center gap-4 mb-4">
//                     <div className="flex items-center gap-1 text-sm text-gray-600">
//                       <FaUserGraduate /> Professor
//                     </div>
//                     {mentor.linkedin && (
//                       <a
//                         href={mentor.linkedin}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-600 hover:text-blue-800"
//                       >
//                         <FaLinkedin />
//                       </a>
//                     )}
//                   </div>
//                   <p className="text-gray-600 text-sm line-clamp-3 mb-4">
//                     {mentor.summary || "Expert faculty member at SGBAU"}
//                   </p>
//                   <button className="px-4 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-200 transition-colors duration-300">
//                     View Profile
//                   </button>
//                 </div>
//               </MotionDiv>
//             ))}
//           </div>
//         )}

//         <div className="text-center mt-12">
//           <MotionDiv
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
//           >
//             <FaBriefcase /> View All Faculty
//           </MotionDiv>
//         </div>
//       </div>
//     </section>
//   );
// }