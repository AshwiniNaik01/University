import React from "react";
import { motion } from "framer-motion";
import { Quote, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import Image from "../utility/Image";

const Testimonial = ({ testimonial }) => {
    return (
        <motion.div
            className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-md border border-gray-100 relative flex flex-col items-center text-center hover:shadow-lg transition-all"
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
            {/* Quote Icon */}
            <Quote className="absolute top-4 left-4 text-gray-200 w-6 h-6 rotate-12" />

            {/* User Avatar + LinkedIn */}
            <div className="relative">
                <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 object-cover rounded-full border-4 border-codedrift-indigo shadow-md -mt-12 mb-4"
                />

                {testimonial.linkedin && (
                    <a
                        href={testimonial.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-full shadow border border-gray-200 hover:bg-blue-600 hover:text-white transition"
                        title="LinkedIn Profile"
                    >
                        <Linkedin size={14} />
                    </a>
                )}
            </div>

            {/* Quote Text */}
            <p className="text-gray-700 text-sm italic mb-3 leading-relaxed max-w-xs">
                “{testimonial.quote}”
            </p>

            {/* Name and Role */}
            <div className="mb-1">
                <p className="font-semibold text-gray-800">— {testimonial.name}</p>
                {testimonial.role && (
                    <p className="text-xs text-gray-500 mt-0.5">{testimonial.role}</p>
                )}
            </div>

            {/* Course Info */}
            {testimonial.course && testimonial.courseId && (
                <Link
                    to={`/courses/${testimonial.courseId}`}
                    className="text-sm text-codedrift-pink font-medium hover:underline"
                >
                    {testimonial.course}
                </Link>
            )}
        </motion.div>
    );
};

export default Testimonial;
