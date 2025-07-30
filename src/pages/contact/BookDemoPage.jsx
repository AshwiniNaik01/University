import React from "react";
import { useNavigate } from "react-router-dom";
import {
    CalendarDays,
    Mic,
    Hammer,
    GraduationCap,
} from "lucide-react";

const categories = [
    {
        name: "Event",
        icon: <CalendarDays className="w-6 h-6" />,
        desc: "Hackathons, Tech Talks, Seminars, Fests",
    },
    {
        name: "Webinar",
        icon: <Mic className="w-6 h-6" />,
        desc: "Live Online Sessions with Experts",
    },
    {
        name: "Workshop",
        icon: <Hammer className="w-6 h-6" />,
        desc: "Hands-on Sessions & Tools Practice",
    },
    {
        name: "Internship Session",
        icon: <GraduationCap className="w-6 h-6" />,
        desc: "Pre-Internship Orientation & Guidance",
    },
];

const BookDemoPage = () => {
    const navigate = useNavigate();

    const handleSelect = (category) => {
        navigate(`/book/${category.toLowerCase().replace(/\s+/g, "-")}`);
    };

    return (
        <section className="min-h-dvh py-24 bg-gradient-to-br from-[#f0f3f8] via-[#f7f8fa] to-[#e9eff5]">
            <div className="container text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-800 mb-4">
                    Book A <span className="text-codedrift-pink">Session</span>
                </h1>
                <p className="text-gray-600 max-w-xl mx-auto text-lg mb-16">
                    Choose the type of session you'd like to attend — whether it's a webinar, event, or internship guidance. Get inspired, upskill, and connect with our team.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {categories.map((category, i) => (
                        <button
                            key={i}
                            onClick={() => handleSelect(category.name)}
                            className="group relative p-6 bg-white/40 backdrop-blur-md rounded-2xl border border-white shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-all hover:shadow-xl hover:scale-[1.04] text-left"
                        >
                            {/* Vibrant Icon Badge */}
                            <div className="w-14 h-14 mb-4 mx-auto rounded-full flex items-center justify-center bg-gradient-to-br from-[#ee4f7e] to-[#4cb7e5] text-white shadow-lg group-hover:scale-110 transition">
                                {category.icon}
                            </div>

                            {/* Title & Description */}
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-codedrift-indigo transition">
                                    {category.name}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">{category.desc}</p>
                            </div>

                            {/* Glow Hover Ring */}
                            <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-codedrift-pink transition-all duration-300 pointer-events-none"></div>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BookDemoPage;
