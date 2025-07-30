import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../utility/Button";


const colorDotMap = {
    red: "bg-red-500",
    yellow: "bg-yellow-500",
    gray: "bg-gray-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    pink: "bg-pink-500",
};

const BookingSection = ({ title, color, items }) => {
    if (!items || items.length === 0) return null;

    const categoryFromTitle = title.split(" ")[1]?.toLowerCase();
    const dotColorClass = colorDotMap[color] || "bg-gray-500";

    return (
        <div className="mb-14">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800">
                <span className={`inline-block size-5 rounded-full ${dotColorClass} animate-pulse`}></span>
                {title}
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item, i) => (
                    <div
                        key={i}
                        className="relative group rounded-xl p-[3px] codedrift-gradient codedrift-gradient-animate hover:scale-105 transition-transform duration-300"
                    >
                        <Button
                            as="link"
                            // to={`/book/${categoryFromTitle}/${item.id}`}
                            to={`/courses/c/${2}`}
                            className="block bg-white rounded-[inherit] p-5 h-full shadow-sm group-hover:shadow-lg transition-all duration-300"
                        >
                            <h4 className="font-bold text-gray-800 mb-1">{item.title}</h4>
                            <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                            <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                            <span className="flex items-center text-sm text-codedrift-pink mt-3 font-medium">
                                View Details <ArrowRight className="w-4 h-4 ml-1" />
                            </span>
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookingSection;
