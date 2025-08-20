// import React from "react";
// import { useParams } from "react-router-dom";
// import BookingSection from "../../components/book/BookingSection";

// // dummyData defined here
// const dummyData = {
//     ongoing: [
//         {
//             id: 1,
//             title: "Full Stack Hackathon",
//             description: "Build MERN apps in 24 hours with mentorship and prizes.",
//             date: "Today, 10 AM – 6 PM",
//         },
//         {
//             id: 2,
//             title: "Live React.js Debugging Session",
//             description: "Watch experts debug real-world React issues live.",
//             date: "Today, 5 PM – 6 PM",
//         },
//     ],
//     upcoming: [
//         {
//             id: 3,
//             title: "AI Webinar 2025",
//             description: "Dive into GenAI, ML, and how they're changing careers.",
//             date: "Aug 5, 7 PM – 9 PM",
//         },
//         {
//             id: 4,
//             title: "Frontend Workshop",
//             description: "Master Tailwind, React hooks, and animation libraries.",
//             date: "Aug 10, 2 PM – 5 PM",
//         },
//         {
//             id: 5,
//             title: "Internship Kickoff Session",
//             description: "Get onboarded for our 6-week intensive MERN internship.",
//             date: "Aug 15, 11 AM – 12 PM",
//         },
//     ],
//     past: [
//         {
//             id: 6,
//             title: "DevOps Hands-on Bootcamp",
//             description: "Built CI/CD pipelines using GitHub Actions & Docker.",
//             date: "July 5, 2025",
//         },
//         {
//             id: 7,
//             title: "Spring Boot Crash Course",
//             description: "Covered core concepts of Java Spring in 3 hours.",
//             date: "June 22, 2025",
//         },
//     ],
// };

// const BookListingPage = () => {
//     const { categorySlug } = useParams();

//     return (
//         <>
//             <section className="py-20 min-h-dvh bg-[#f9fafb]">

//                 {/* Giant faint background text */}
//                 <div
//                     className="pointer-events-none select-none fixed top-32 left-1/2 -translate-x-1/2 z-0
//                         text-[7rem] sm:text-[12rem] md:text-[18rem] lg:text-[22rem]
//                         font-extrabold bg-gradient-to-r from-[#ee4f7e33] to-[#4cb7e533]
//                         bg-clip-text text-transparent opacity-60 leading-none whitespace-nowrap
//                         flex flex-col sm:flex-row gap-0 sm:gap-2 items-center justify-center"
//                 >
//                     {"events".split("").map((char, i) => (
//                         <span key={i}>{char}</span>
//                     ))}
//                 </div>

//                 <div className="container">
//                     <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
//                         <span className="inline-block codedrift-gradient px-6 py-3 rounded-full text-white shadow-sm">
//                             {categorySlug?.charAt(0).toUpperCase() + categorySlug?.slice(1)} Listings
//                         </span>
//                     </h2>

//                     <div className="px-4 md:px-0">
//                         <BookingSection title="Ongoing" color="red" items={dummyData.ongoing} />
//                         <BookingSection title="Upcoming" color="yellow" items={dummyData.upcoming} />
//                         <BookingSection title="Past" color="gray" items={dummyData.past} />
//                     </div>
//                 </div>
//             </section>
//         </>
//     );
// };

// export default BookListingPage;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import BookingSection from "../../components/book/BookingSection";
// import axios from "axios";
// import { api } from "../../apiUtils/instance";

// const BookListingPage = () => {
//     const { categorySlug } = useParams();
//     const [eventData, setEventData] = useState({
//         ongoing: [],
//         upcoming: [],
//         past: [],
//     });
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchEvents = async () => {
//             try {
//                 setLoading(true);
//                 if (categorySlug === "event") {
//                     const res = await api.get(`/event`);
//                     const allEvents = res.data.data;

//                     // Categorize by status
//                     const categorized = {
//                         ongoing: [],
//                         upcoming: [],
//                         past: [],
//                     };

//                     const today = new Date();

//                     allEvents.forEach((event) => {
//                         const start = new Date(event.startDate);
//                         const end = new Date(event.endDate);

//                         const item = {
//                             id: event._id,
//                             title: event.title,
//                             description: event.description,
//                             date: `${start.toDateString()} – ${end.toDateString()}`,
//                         };

//                         if (event.status === "Ongoing") categorized.ongoing.push(item);
//                         else if (event.status === "Upcoming") categorized.upcoming.push(item);
//                         else categorized.past.push(item); // assuming any other status is past
//                     });

//                     setEventData(categorized);
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch events", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchEvents();
//     }, [categorySlug]);

//     return (
//         <section className="py-20 min-h-dvh bg-[#f9fafb]">
//             <div
//                 className="pointer-events-none select-none fixed top-32 left-1/2 -translate-x-1/2 z-0
//                 text-[7rem] sm:text-[12rem] md:text-[18rem] lg:text-[22rem]
//                 font-extrabold bg-gradient-to-r from-[#ee4f7e33] to-[#4cb7e533]
//                 bg-clip-text text-transparent opacity-60 leading-none whitespace-nowrap"
//             >
//                 {categorySlug?.split("").map((char, i) => (
//                     <span key={i}>{char}</span>
//                 ))}
//             </div>

//             <div className="container">
//                 <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
//                     <span className="inline-block codedrift-gradient px-6 py-3 rounded-full text-white shadow-sm">
//                         {categorySlug?.charAt(0).toUpperCase() + categorySlug?.slice(1)} Listings
//                     </span>
//                 </h2>

//                 {loading ? (
//                     <p className="text-center text-gray-500 text-lg">Loading events...</p>
//                 ) : (
//                     <div className="px-4 md:px-0">
//                         <BookingSection title="Ongoing" color="red" items={eventData.ongoing} />
//                         <BookingSection title="Upcoming" color="yellow" items={eventData.upcoming} />
//                         <BookingSection title="Past" color="gray" items={eventData.past} />
//                     </div>
//                 )}
//             </div>
//         </section>
//     );
// };

// export default BookListingPage;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import BookingSection from "../../components/book/BookingSection";
// import { fetchCategorizedEvents } from "./events";
// // import { fetchCategorizedEvents } from "../../api/events";

// const BookListingPage = () => {
//   const { categorySlug } = useParams();
//   const [eventData, setEventData] = useState({
//     ongoing: [],
//     upcoming: [],
//     past: [],
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadEvents = async () => {
//       try {
//         setLoading(true);
//         if (categorySlug === "event") {
//           const categorized = await fetchCategorizedEvents();
//           setEventData(categorized);
//         }
//       } catch (error) {
//         console.error("Failed to load events", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadEvents();
//   }, [categorySlug]);

//   return (
//     <section className="py-20 min-h-dvh bg-[#f9fafb]">
//       {/* Giant faint text */}
//       <div
//         className="pointer-events-none select-none fixed top-32 left-1/2 -translate-x-1/2 z-0
//         text-[7rem] sm:text-[12rem] md:text-[18rem] lg:text-[22rem]
//         font-extrabold bg-gradient-to-r from-[#ee4f7e33] to-[#4cb7e533]
//         bg-clip-text text-transparent opacity-60 leading-none whitespace-nowrap"
//       >
//         {categorySlug?.split("").map((char, i) => (
//           <span key={i}>{char}</span>
//         ))}
//       </div>

//       <div className="container">
//         <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
//           <span className="inline-block codedrift-gradient px-6 py-3 rounded-full text-white shadow-sm">
//             {categorySlug?.charAt(0).toUpperCase() + categorySlug?.slice(1)} Listings
//           </span>
//         </h2>

//         {loading ? (
//           <p className="text-center text-gray-500 text-lg">Loading events...</p>
//         ) : (
//           <div className="px-4 md:px-0">
//             <BookingSection title="Ongoing" color="red" items={eventData.ongoing} />
//             <BookingSection title="Upcoming" color="yellow" items={eventData.upcoming} />
//             <BookingSection title="Past" color="gray" items={eventData.past} />
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default BookListingPage;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import BookingSection from "../../components/book/BookingSection";
// import { fetchCategorizedEvents, fetchWebinars } from "../../components/programs/events";
// // import { fetchCategorizedEvents, fetchWebinars } from "./events";
// // import { fetchWebinars } from "../../api/webinars"; // new import

// const BookListingPage = () => {
//   const { categorySlug } = useParams();
//   const [eventData, setEventData] = useState({
//     ongoing: [],
//     upcoming: [],
//     past: [],
//   });
//   const [loading, setLoading] = useState(true);

//   //   useEffect(() => {
//   //     const loadItems = async () => {
//   //       setLoading(true);
//   //       try {
//   //         if (categorySlug === "event") {
//   //           const categorized = await fetchCategorizedEvents();
//   //           setEventData(categorized);
//   //         } else if (categorySlug === "webinar") {
//   //           const { data } = await fetchWebinars();
//   //           setEventData({ ongoing: data, upcoming: [], past: [] });
//   //         }
//   //       } catch (error) {
//   //         console.error("Failed to load data", error);
//   //       } finally {
//   //         setLoading(false);
//   //       }
//   //     };

//   //     loadItems();
//   //   }, [categorySlug]);

//   useEffect(() => {
//     const loadItems = async () => {
//       setLoading(true);
//       try {
//         if (categorySlug === "event") {
//           const categorized = await fetchCategorizedEvents();
//           setEventData(categorized);
//         } else if (categorySlug === "webinar") {
//           const response = await fetchWebinars();

//           if (response.success) {
//             const webinars = response.data;

//             const categorized = {
//               ongoing: webinars.filter((item) => item.status === "ongoing"),
//               upcoming: webinars.filter((item) => item.status === "upcoming"),
//               past: webinars.filter((item) => item.status === "past"),
//             };

//             console.log(categorized, "*********");

//             setEventData(categorized);
//           }
//         }
//       } catch (error) {
//         console.error("Failed to load data", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadItems();
//   }, [categorySlug]);

//   return (
//     <section className="py-20 min-h-dvh bg-[#f9fafb]">
//       {/* Background giant text */}
//       {/* ...existing layout... */}
//       <div className="container">
//         <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
//           <span className="inline-block codedrift-gradient px-6 py-3 rounded-full text-white shadow-sm">
//             {categorySlug?.charAt(0).toUpperCase() + categorySlug?.slice(1)}{" "}
//             Listings
//           </span>
//         </h2>

//         {loading ? (
//           <p className="text-center text-gray-500 text-lg">
//             Loading {categorySlug}...
//           </p>
//         ) : (
//           <div className="px-4 md:px-0">
//           <BookingSection
//   title="Ongoing"
//   color="red"
//   items={eventData.ongoing}
//   category={categorySlug} // ✅ pass the categorySlug
// />

// {["event", "webinar"].includes(categorySlug) && (
//   <>
//     <BookingSection
//       title="Upcoming"
//       color="yellow"
//       items={eventData.upcoming}
//       category={categorySlug}
//     />
//     <BookingSection
//       title="Past"
//       color="gray"
//       items={eventData.past}
//       category={categorySlug}
//     />
//   </>
// )}

//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default BookListingPage;



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingSection from "../../components/book/BookingSection";
import { fetchCategorizedEvents, fetchInternshipSessions, fetchWebinars, fetchWorkshops } from "../../components/programs/events";
// import { fetchWorkshops } from "../../services/workshopService"; // ✅ new import

const BookListingPage = () => {
  const { categorySlug } = useParams();
  const [eventData, setEventData] = useState({
    ongoing: [],
    upcoming: [],
    past: [],
  });
  const [loading, setLoading] = useState(true);
useEffect(() => {
  const loadItems = async () => {
    setLoading(true);
    try {
      if (categorySlug === "event") {
        const categorized = await fetchCategorizedEvents();
        setEventData(categorized);

      } else if (categorySlug === "webinar") {
        const response = await fetchWebinars();

        if (response.success) {
          const webinars = response.data;
          const categorized = {
            ongoing: webinars.filter((item) => item.status === "ongoing"),
            upcoming: webinars.filter((item) => item.status === "upcoming"),
            past: webinars.filter((item) => item.status === "past"),
          };
          setEventData(categorized);
        }

      } else if (categorySlug === "workshop") {
  const response = await fetchWorkshops();

  if (response.success) {
    const workshops = response.data;  // ✅ this is already an array

    const categorized = {
      ongoing: workshops.filter((item) => item.status?.toLowerCase() === "ongoing"),
      upcoming: workshops.filter((item) => item.status?.toLowerCase() === "upcoming"),
      past: workshops.filter((item) => item.status?.toLowerCase() === "past"),
    };

    setEventData(categorized);
  }
} else if (categorySlug === "internship-session") {
 const response = await fetchInternshipSessions();

  if (response.success) {
    const sessions = response.data;

    const categorized = {
      ongoing: sessions.filter((item) => item.status?.toLowerCase() === "ongoing"),
      upcoming: sessions.filter((item) => item.status?.toLowerCase() === "upcoming"),
      past: sessions.filter((item) => item.status?.toLowerCase() === "past"),
    };

    setEventData(categorized);
  }
}

    } catch (error) {
      console.error("Failed to load data", error);
    } finally {
      setLoading(false);
    }
  };

  loadItems();
}, [categorySlug]);

  return (
    <section className="py-20 min-h-dvh bg-[#f9fafb]">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
          <span className="inline-block codedrift-gradient px-6 py-3 rounded-full text-white shadow-sm">
            {categorySlug?.charAt(0).toUpperCase() + categorySlug?.slice(1)} Listings
          </span>
        </h2>

        {loading ? (
          <p className="text-center text-gray-500 text-lg">
            Loading {categorySlug}...
          </p>
        ) : (
          <div className="px-4 md:px-0">
            <BookingSection
              title="Ongoing"
              color="red"
              items={eventData.ongoing}
              category={categorySlug}
            />

            {["event", "webinar", "workshop", "internship-session"].includes(categorySlug) && (
              <>
                <BookingSection
                  title="Upcoming"
                  color="yellow"
                  items={eventData.upcoming}
                  category={categorySlug}
                />
                <BookingSection
                  title="Past"
                  color="gray"
                  items={eventData.past}
                  category={categorySlug}
                />
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default BookListingPage;
