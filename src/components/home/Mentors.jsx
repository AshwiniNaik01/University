import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Image from "../utility/Image";
import { Linkedin } from "lucide-react";

const mentors = [
    {
        name: "Sujay Patil",
        title: "Senior Java Developer",
        bio: "8+ years in enterprise Java. Loves mentoring freshers & interns with real-world projects.",
        img: "https://codedrift.co/images/mentor-images/deepak-sir.png", // replace with stock image
    },
    {
        name: "Neha Deshmukh",
        title: "Full Stack Trainer (MERN)",
        bio: "Passionate about React, Node.js, and teaching students how to build production‑ready apps.",
        img: "https://codedrift.co/images/mentor-images/deepak-sir.png",
    },
    {
        name: "Ravi Kulkarni",
        title: "Python & Django Expert",
        bio: "Works in AI startups and mentors students in building scalable backend systems.",
        img: "https://codedrift.co/images/mentor-images/deepak-sir.png",
    },
];

const Mentors = () => (
    <section className="relative py-20 bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] overflow-hidden">
        {/* Decorative blurred shapes */}
        <div className="absolute top-0 right-10 w-72 h-72 bg-codedrift-indigo opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-codedrift-pink opacity-10 rounded-full blur-3xl"></div>

        <div className="container">
            <div className="relative z-10 text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 inline-block relative">
                    Meet Your Mentors
                    <span className="absolute left-1/2 -bottom-2 w-2/3 h-1 bg-codedrift-gradient rounded-full transform -translate-x-1/2"></span>
                </h2>
                <p className="text-gray-600 mb-16 max-w-2xl mx-auto">
                    Learn from experienced professionals who bring real-world expertise into every session.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {mentors.map((m, i) => (
                        <motion.div
                            key={i}
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
                            <div className="absolute top-0 left-0 w-full h-1 bg-codedrift-gradient" />

                            {/* Mentor Image */}
                            <div className="relative w-24 h-24 mx-auto mb-4">
                                <Image
                                    src={m.img}
                                    alt={m.name}
                                    className="w-full h-full object-cover rounded-full border-4 border-codedrift-indigo shadow-md group-hover:scale-105 transition-transform duration-300"
                                />

                                {/* LinkedIn Badge Icon */}
                                <a
                                    href={m.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="cursor-pointer absolute -bottom-3 right-1 bg-white rounded-full p-1.5 shadow-md border border-gray-200 hover:bg-[#0077b5] hover:text-white transition-all"
                                    title="LinkedIn Profile"
                                >
                                    <Linkedin size={16} />
                                </a>
                            </div>

                            {/* Mentor Info */}
                            <Link
                                to={`/mentors/m/${i}`}
                                className="block text-center text-lg font-bold text-gray-800 group-hover:text-codedrift-pink transition-colors duration-200"
                            >
                                {m.name}
                            </Link>

                            <p className="text-center text-sm text-gray-500 mt-1">{m.title}</p>

                            <p className="text-gray-600 text-sm mt-4 text-center line-clamp-3">{m.bio}</p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    </section>
);

export default Mentors;
