import React from 'react';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <>
            {/* Hero Section */}
            <section className="bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center items-center min-h-[60vh]">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="w-full bg-white rounded-2xl p-6 sm:p-10 text-center relative overflow-hidden shadow-md">
                            <div className="absolute inset-x-0 top-1/2 h-1/2 border-t border-purple-200 shadow-[0_10px_30px_rgba(128,90,213,0.15)] z-[-1] rounded-b-2xl"></div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.7 }}
                                className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                                Master Programming with{' '}
                                <span className="text-purple-600">CodeDrift</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="text-xl text-gray-700 mb-2">
                                Bored of Theory? Let’s Code for Real
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                className="text-md text-gray-800 font-medium mb-8">
                                Kickstart Your Coding Journey – No Boring Lectures, Just Real
                                Practice!
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                                className="flex flex-col sm:flex-row justify-center gap-4">
                                <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition">
                                    Sign In
                                </button>
                                <button className="border border-purple-600 text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition">
                                    Explore Courses
                                </button>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;
