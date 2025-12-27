import React from "react";
import { Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import Image from "../utility/Image";
import { Link } from "react-router-dom";

/**
 * Mentor Component
 *
 * Displays individual mentor details including profile image, name, title, bio,
 * and LinkedIn link with hover animations.
 */

const Mentor = ({ mentor }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md hover:shadow-2xl transition-all relative overflow-hidden group"
      whileHover={{
        scale: 1.05,
        rotate: [-1, 1, 0],
        boxShadow: [
          "0 15px 30px rgba(238,79,126,0.2)",
          "0 18px 36px rgba(76,183,229,0.2)",
          "0 20px 40px rgba(57,73,171,0.2)",
        ],
        transition: { duration: 0.4 },
      }}
    >
      {/* Top gradient bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900" />

      {/* Mentor Profile Image */}
      <div className="relative w-24 h-24 mx-auto mb-4">
        <Image
          src={mentor.img}
          alt={mentor.name}
          className="w-full h-full object-cover rounded-full border-4 border-codedrift-indigo shadow-md group-hover:scale-105 transition-transform duration-300"
        />

        {/* LinkedIn Icon Link */}
        <a
          href={mentor.linkedin}
          target="_blank"
          rel="noreferrer"
          className="cursor-pointer absolute -bottom-3 right-1 bg-white rounded-full p-1.5 shadow-md border border-gray-200 hover:bg-[#0077b5] hover:text-white transition-all"
          title="LinkedIn Profile"
        >
          <Linkedin size={16} />
        </a>
      </div>

      {/* Mentor Name - links to detailed mentor page */}
      <Link
        to={`/mentors/m/${mentor.id}`}
        className="block text-center text-lg font-bold text-gray-800 group-hover:text-gradient-to-r from-blue-900 via-blue-800 to-blue-900 transition-colors duration-200"
      >
        {mentor.name}
      </Link>

      {/* Mentor Title */}
      <p className="text-center text-sm text-gray-500 mt-1">{mentor.title}</p>

      {/* Mentor Bio - limited to 3 lines with line*/}
      <p className="text-gray-600 text-sm mt-4 text-center line-clamp-3">
        {mentor.bio}
      </p>
    </motion.div>
  );
};

export default Mentor;
