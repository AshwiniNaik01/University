import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Image from "../utility/Image";
import { Linkedin, Users } from "lucide-react";
import { mentors } from "../../data/mentors";
import { Button } from "../utility/Button";
import Mentor from "../mentors/Mentor";


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
                    {mentors?.slice(0, 3).map((mentor, i) => (
                        <Mentor key={i} mentor={mentor} />
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Button as="link" to="/mentors" variant="indigo" size="md" className="gap-2">
                        <Users className="w-5 h-5" />
                        Show Experts
                    </Button>
                </div>

            </div>
        </div>
    </section>
);

export default Mentors;
