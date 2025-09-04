import { Brain, CircuitBoard, Code, Cpu, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import { codingIllustrationImage } from '../../access-assets/images';
import MissionsVision from '../../components/about/MissionsVision';
import Values from '../../components/about/Values';
import { Button } from '../../components/utility/Button';
import Image from '../../components/utility/Image';

const AboutPage = () => {
    return (
        <div className="overflow-x-hidden">
            {/* ✅ Hero Section */}
            <section className="relative min-h-dvh flex items-center overflow-hidden bg-gradient-to-br from-[#fdfbfb] via-[#f7f9fc] to-[#f0f4f8] text-gray-800 py-16 px-4 sm:px-6 lg:px-8">
                {/* Background Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.06] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat"
                    style={{ backgroundSize: '300px 300px' }}></div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#ee4f7e0d] via-[#4cb7e50d] to-transparent"></div>

                {/* Main Content */}
                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-codedrift-indigo">
                        About <span className="text-codedrift-pink">Code Drift</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
                        Empowering developers through immersive, project-based learning. Master 🔥{' '}
                        <span className="text-codedrift-blue font-semibold">MERN</span>,
                        <span className="text-codedrift-blue font-semibold"> Java FSD</span>, and
                        <span className="text-codedrift-blue font-semibold"> Python</span> with
                        hands-on guidance from industry experts.
                    </p>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
                        <div className="p-6 bg-white/70 backdrop-blur-lg rounded-xl shadow hover:shadow-lg transition">
                            <h3 className="text-codedrift-pink text-lg font-semibold mb-2">
                                💡 Hands-On Projects
                            </h3>
                            <p className="text-gray-700 text-sm">
                                Learn by building real-world apps & simulations.
                            </p>
                        </div>
                        <div className="p-6 bg-white/70 backdrop-blur-lg rounded-xl shadow hover:shadow-lg transition">
                            <h3 className="text-codedrift-blue text-lg font-semibold mb-2">
                                🎯 Expert Mentors
                            </h3>
                            <p className="text-gray-700 text-sm">
                                Learn directly from seasoned software professionals.
                            </p>
                        </div>
                        <div className="p-6 bg-white/70 backdrop-blur-lg rounded-xl shadow hover:shadow-lg transition">
                            <h3 className="text-codedrift-indigo text-lg font-semibold mb-2">
                                🌐 Flexible Learning
                            </h3>
                            <p className="text-gray-700 text-sm">
                                Join live online, self-paced, or classroom sessions.
                            </p>
                        </div>
                    </div>

                    <Button as="link" to="/courses" variant="gradient">
                        Explore Our Courses
                    </Button>
                </div>

                {/* Floating Icons */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <Code className="hidden md:block absolute top-10 left-1/4 w-16 h-16 text-codedrift-pink/20 animate-pulse" />
                    <Cpu className="absolute bottom-10 right-1/3 w-20 h-20 text-codedrift-blue/20 animate-ping" />
                    <Database className="absolute top-1/2 left-10 w-14 h-14 text-codedrift-indigo/20 animate-bounce" />
                    <CircuitBoard className="absolute bottom-20 left-1/3 w-16 h-16 text-codedrift-blue/15 animate-pulse" />
                    <Brain className="absolute top-1/2 right-10 w-16 h-16 text-codedrift-pink/15 animate-bounce" />
                </div>
            </section>

            {/* ✅ Mission & Vision */}
            <MissionsVision />

            {/* ✅ Core Values */}
            <Values />

            {/* ✅ Final CTA */}
            <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center text-center overflow-hidden px-4 sm:px-6 lg:px-8">
                {/* Background */}
                <div className="absolute inset-0">
                    <Image
                        src={codingIllustrationImage}
                        alt="Learning and Mentorship"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-gray-900/30"></div>
                </div>

                {/* CTA Content */}
                <div className="max-w-4xl mx-auto relative z-10 text-white">
                    <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                        Learn & Grow With Us
                    </h2>
                    <p className="text-gray-200 max-w-2xl mx-auto mb-8 leading-relaxed text-base sm:text-lg md:text-xl">
                        Take the next step in your career, whether you're a beginner or looking to
                        advance your skills. Learn industry-relevant tech with expert mentorship and
                        hands-on projects.
                    </p>

                    <Link
                        to="/courses"
                        className="inline-block bg-codedrift-pink text-white font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-md hover:bg-codedrift-indigo-dark transition">
                        Explore Your Courses
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
