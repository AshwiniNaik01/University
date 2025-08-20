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
