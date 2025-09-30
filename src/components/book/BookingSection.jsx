import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../utility/Button";

//  Mapping of dot colors used as section indicators.
const colorDotMap = {
  red: "bg-red-500",
  yellow: "bg-yellow-500",
  gray: "bg-gray-500",
  green: "bg-green-500",
  blue: "bg-blue-500",
  pink: "bg-pink-500",
};

/**
 * BookingSection Component
 *
 * Reusable section to display a group of booking items (e.g. webinars, sessions).
 * Handles dynamic routing based on category.
 */

const BookingSection = ({ title, color, items, category }) => {
  // Early return if no data available — prevents empty headings
  if (!items || items.length === 0) return null;
  // Resolve the appropriate dot color or fallback to gray
  const dotColorClass = colorDotMap[color] || "bg-gray-500";
  // Normalize category slug for safe routing
  const normalizedCategory = category?.toLowerCase().replace(/\s+/g, "-");
  // console.log("SLUG:", normalizedCategory);

  return (
    <div className="mb-14">
      {/* Section Heading with animated colored dot */}
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800">
        <span
          className={`inline-block size-5 rounded-full ${dotColorClass} animate-pulse`}
        />
        {title}
      </h3>

      {/* Grid of booking cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => {
          const id = item.id || item._id;
          if (!id) return null;

          // Routing logic based on category
          const path =
            category === "webinar"
              ? `/webinar/${id}`
              : category === "internship-session"
              ? `/internship-session/${id}`
              : `/book/${category}/${id}`;

          return (
            <div
              key={i}
              className="relative group rounded-xl p-[3px] codedrift-gradient codedrift-gradient-animate hover:scale-105 transition-transform duration-300"
            >
              <Button
                as="link"
                to={path}
                className="block bg-white rounded-[inherit] p-5 h-full shadow-sm group-hover:shadow-lg transition-all duration-300"
              >
                <h4 className="font-bold text-gray-800 mb-1">{item.title}</h4>
                <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {item.description}
                </p>
                <span className="flex items-center text-sm text-codedrift-pink mt-3 font-medium">
                  View Details <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingSection;
