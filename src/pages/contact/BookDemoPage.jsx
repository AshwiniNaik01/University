// import React from "react";
// import { useNavigate } from "react-router-dom";
// import {
//     CalendarDays,
//     Mic,
//     Hammer,
//     GraduationCap,
// } from "lucide-react";

// const categories = [
//     {
//         name: "Event",
//         icon: <CalendarDays className="w-6 h-6" />,
//         desc: "Hackathons, Tech Talks, Seminars, Fests",
//     },
//     {
//         name: "Webinar",
//         icon: <Mic className="w-6 h-6" />,
//         desc: "Live Online Sessions with Experts",
//     },
//     {
//         name: "Workshop",
//         icon: <Hammer className="w-6 h-6" />,
//         desc: "Hands-on Sessions & Tools Practice",
//     },
//     {
//         name: "Internship Session",
//         icon: <GraduationCap className="w-6 h-6" />,
//         desc: "Pre-Internship Orientation & Guidance",
//     },
// ];

// const BookDemoPage = () => {
//     const navigate = useNavigate();

//     const handleSelect = (category) => {
//         navigate(`/book/${category.toLowerCase().replace(/\s+/g, "-")}`);
//     };

//     return (
//         <section className="min-h-dvh py-24 bg-gradient-to-br from-[#f0f3f8] via-[#f7f8fa] to-[#e9eff5]">
//             <div className="container text-center">
//                 <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-800 mb-4">
//                     Book A <span className="text-codedrift-pink">Session</span>
//                 </h1>
//                 <p className="text-gray-600 max-w-xl mx-auto text-lg mb-16">
//                     Choose the type of session you'd like to attend — whether it's a webinar, event, or internship guidance. Get inspired, upskill, and connect with our team.
//                 </p>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
//                     {categories.map((category, i) => (
//                         <button
//                             key={i}
//                             onClick={() => handleSelect(category.name)}
//                             className="group relative p-6 bg-white/40 backdrop-blur-md rounded-2xl border border-white shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-all hover:shadow-xl hover:scale-[1.04] text-left"
//                         >
//                             {/* Vibrant Icon Badge */}
//                             <div className="w-14 h-14 mb-4 mx-auto rounded-full flex items-center justify-center bg-gradient-to-br from-[#ee4f7e] to-[#4cb7e5] text-white shadow-lg group-hover:scale-110 transition">
//                                 {category.icon}
//                             </div>

//                             {/* Title & Description */}
//                             <div className="text-center">
//                                 <h3 className="text-lg font-semibold text-gray-800 group-hover:text-codedrift-indigo transition">
//                                     {category.name}
//                                 </h3>
//                                 <p className="text-sm text-gray-600 mt-1">{category.desc}</p>
//                             </div>

//                             {/* Glow Hover Ring */}
//                             <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-codedrift-pink transition-all duration-300 pointer-events-none"></div>
//                         </button>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default BookDemoPage;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
    CalendarDays,
    Mic,
    Hammer,
    GraduationCap,
} from "lucide-react";
import { api } from "../../apiUtils/instance";
import { getSessionCategories } from "../../components/programs/events";

// Map icons based on type or name
const iconMap = {
    "event": <CalendarDays className="w-6 h-6" />,
    "webinar": <Mic className="w-6 h-6" />,
    "workshop": <Hammer className="w-6 h-6" />,
    "internship-session": <GraduationCap className="w-6 h-6" />,
};

const BookDemoPage = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);


 useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getSessionCategories();
                if (data.success && Array.isArray(data.data)) {
                    setCategories(data.data);
                } else {
                    console.error("Failed to load session categories:", data.message);
                }
            } catch (error) {
                console.error("Error fetching session categories:", error);
            } finally {
                setLoading(false); // ✅ Stop loading
            }
        };

        fetchCategories();
    }, []);

      const handleSelect = (slug) => {
        navigate(`/book/${slug}`);
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
                {loading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="p-6 bg-white/40 backdrop-blur-md rounded-2xl border border-white shadow animate-pulse"
                        >
                            <div className="w-14 h-14 mb-4 mx-auto rounded-full bg-gray-300" />
                            <div className="h-4 w-2/3 bg-gray-300 rounded mx-auto mb-2" />
                            <div className="h-3 w-4/5 bg-gray-200 rounded mx-auto" />
                        </div>
                    ))
                ) : (
                    categories.map((category) => (
                        <button
                            key={category._id}
                            onClick={() => handleSelect(category.slug)}
                            className="group relative p-6 bg-white/40 backdrop-blur-md rounded-2xl border border-white shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-all hover:shadow-xl hover:scale-[1.04] text-left"
                        >
                            <div className="w-14 h-14 mb-4 mx-auto rounded-full flex items-center justify-center bg-gradient-to-br from-[#ee4f7e] to-[#4cb7e5] text-white shadow-lg group-hover:scale-110 transition">
                                {iconMap[category.type.toLowerCase()] || <Hammer className="w-6 h-6" />}
                            </div>

                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-codedrift-indigo transition">
                                    {category.name}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">{category.desc}</p>
                            </div>

                            <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-codedrift-pink transition-all duration-300 pointer-events-none"></div>
                        </button>
                    ))
                )}
            </div>
        </div>
    </section>
);
};

export default BookDemoPage;
