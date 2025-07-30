import React from "react";
import { useParams } from "react-router-dom";
import BookingSection from "../../components/book/BookingSection";

// dummyData defined here
const dummyData = {
    ongoing: [
        {
            id: 1,
            title: "Full Stack Hackathon",
            description: "Build MERN apps in 24 hours with mentorship and prizes.",
            date: "Today, 10 AM – 6 PM",
        },
        {
            id: 2,
            title: "Live React.js Debugging Session",
            description: "Watch experts debug real-world React issues live.",
            date: "Today, 5 PM – 6 PM",
        },
    ],
    upcoming: [
        {
            id: 3,
            title: "AI Webinar 2025",
            description: "Dive into GenAI, ML, and how they're changing careers.",
            date: "Aug 5, 7 PM – 9 PM",
        },
        {
            id: 4,
            title: "Frontend Workshop",
            description: "Master Tailwind, React hooks, and animation libraries.",
            date: "Aug 10, 2 PM – 5 PM",
        },
        {
            id: 5,
            title: "Internship Kickoff Session",
            description: "Get onboarded for our 6-week intensive MERN internship.",
            date: "Aug 15, 11 AM – 12 PM",
        },
    ],
    past: [
        {
            id: 6,
            title: "DevOps Hands-on Bootcamp",
            description: "Built CI/CD pipelines using GitHub Actions & Docker.",
            date: "July 5, 2025",
        },
        {
            id: 7,
            title: "Spring Boot Crash Course",
            description: "Covered core concepts of Java Spring in 3 hours.",
            date: "June 22, 2025",
        },
    ],
};


const BookListingPage = () => {
    const { categorySlug } = useParams();

    return (
        <>
            <section className="py-20 min-h-dvh bg-[#f9fafb]">

                {/* Giant faint background text */}
                <div
                    className="pointer-events-none select-none fixed top-32 left-1/2 -translate-x-1/2 z-0
                        text-[7rem] sm:text-[12rem] md:text-[18rem] lg:text-[22rem]
                        font-extrabold bg-gradient-to-r from-[#ee4f7e33] to-[#4cb7e533]
                        bg-clip-text text-transparent opacity-60 leading-none whitespace-nowrap
                        flex flex-col sm:flex-row gap-0 sm:gap-2 items-center justify-center"
                >
                    {"events".split("").map((char, i) => (
                        <span key={i}>{char}</span>
                    ))}
                </div>


                <div className="container">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
                        <span className="inline-block codedrift-gradient px-6 py-3 rounded-full text-white shadow-sm">
                            {categorySlug?.charAt(0).toUpperCase() + categorySlug?.slice(1)} Listings
                        </span>
                    </h2>

                    <div className="px-4 md:px-0">
                        <BookingSection title="Ongoing" color="red" items={dummyData.ongoing} />
                        <BookingSection title="Upcoming" color="yellow" items={dummyData.upcoming} />
                        <BookingSection title="Past" color="gray" items={dummyData.past} />
                    </div>
                </div>
            </section>
        </>
    );
};

export default BookListingPage;
