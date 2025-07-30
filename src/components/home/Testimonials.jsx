import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { testimonials } from "../../data/testimonials";
import Testimonial from "../common/Testimonial";
import { Button } from "../utility/Button";

const Testimonials = () => {


    return (
        <>
            <section className="relative py-20 bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] overflow-hidden">
                <div className="container">
                    {/* Background Brand Shapes */}
                    <div className="absolute top-0 left-0 w-72 h-72 bg-codedrift-pink opacity-10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-72 h-72 bg-codedrift-blue opacity-10 rounded-full blur-3xl"></div>

                    <div className="relative text-center z-10">
                        {/* Heading with Gradient Underline */}
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 relative inline-block">
                            What Our Students Say
                            <span className="absolute left-1/2 -bottom-2 w-2/3 h-1 bg-codedrift-gradient rounded-full transform -translate-x-1/2"></span>
                        </h2>
                        <p className="text-gray-600 mb-16 max-w-2xl mx-auto">
                            Real experiences from students who’ve upskilled with Code Drift.
                        </p>

                        {/* Testimonial Cards */}
                        {/* Testimonial Cards */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {testimonials.slice(0, 6).map((t, i) => (
                                <Testimonial key={i} testimonial={t} />
                            ))}
                        </div>

                        {/* Show More Button */}
                        <div className="mt-12">
                            <Button
                                as="link"
                                to="/testimonials"
                                className="inline-block px-6 py-3 bg-codedrift-gradient text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                Show More Testimonials →
                            </Button>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default Testimonials;
