import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingSection from "../../components/book/BookingSection";
import {
  fetchCategorizedEvents,
  fetchInternshipSessions,
  fetchWebinars,
  fetchWorkshops,
} from "../../components/programs/events";

// 📄 BookListingPage: Dynamically fetches and displays categorized listings (ongoing, upcoming, past)
// for events, webinars, workshops, or internship sessions etc. based on the URL slug.

const BookListingPage = () => {
  const { categorySlug } = useParams(); // Get category from route params
  const [eventData, setEventData] = useState({
    ongoing: [],
    upcoming: [],
    past: [],
  });
  const [loading, setLoading] = useState(true);

  // Load data whenever categorySlug changes
  // Strategy Pattern: Instead of using if/else or switch, you store logic in an object and call it dynamically.
  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);

      // ✅ Strategy object: Maps each category to its data-fetching logic
      const strategies = {
        event: async () => {
          const categorized = await fetchCategorizedEvents();
          setEventData(categorized);
        },

        // Fetch webinars and categorize them by status
        webinar: async () => {
          const { success, data } = await fetchWebinars();
          if (success) {
            setEventData(categorizeByStatus(data));
          }
        },

        // Fetch workshops and categorize them by status
        workshop: async () => {
          const { success, data } = await fetchWorkshops();
          if (success) {
            setEventData(categorizeByStatus(data));
          }
        },

        // Fetch internship sessions and categorize them by status
        "internship-session": async () => {
          const { success, data } = await fetchInternshipSessions();
          if (success) {
            setEventData(categorizeByStatus(data));
          }
        },
      };

      try {
        // Dynamically call the handler based on categorySlug
        const handler = strategies[categorySlug];
        if (handler) await handler(); // Await the corresponding fetch function
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    };

    loadItems(); // Trigger fetch on mount or when categorySlug changes
  }, [categorySlug]);

  // Utility function to categorize
  const categorizeByStatus = (items) => ({
    ongoing: items.filter((item) => item.status?.toLowerCase() === "ongoing"),
    upcoming: items.filter((item) => item.status?.toLowerCase() === "upcoming"),
    past: items.filter((item) => item.status?.toLowerCase() === "past"),
  });

  return (
    <section className="py-20 min-h-dvh bg-[#f9fafb]">
      <div className="container">
        {/* 🔹 Page Header */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
          <span className="inline-block codedrift-gradient px-6 py-3 rounded-full text-white shadow-sm">
            {categorySlug?.charAt(0).toUpperCase() + categorySlug?.slice(1)}{" "}
            Listings
          </span>
        </h2>

        {/* Content Based on Loading State */}
        {loading ? (
          <p className="text-center text-gray-500 text-lg">
            Loading {categorySlug}...
          </p>
        ) : (
          <div className="px-4 md:px-0">
            {/*  Render Ongoing Section*/}
            <BookingSection
              title="Ongoing"
              color="red"
              items={eventData.ongoing}
              category={categorySlug}
            />

            {/* ✅ Render Upcoming & Past sections only for specific categories */}
            {["event", "webinar", "workshop", "internship-session"].includes(
              categorySlug
            ) && (
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
