// CampusHighlights.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBook, FaFlask, FaStethoscope, FaLaptop, FaHeartbeat, FaTrophy, FaArrowRight } from "react-icons/fa";

const MotionLink = motion(Link);
export default function CampusHighlights() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
            Campus <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              Highlights
            </span>
          </h2>
          <p className="text-blue-100 text-lg max-w-3xl mx-auto">
            Experience our vibrant campus life and world-class facilities
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-5">
            {[
              { img: "https://images.unsplash.com/photo-1568667256549-094345857637?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D", title: "Central Library" },
              { img: "https://www.shikshahub.com/uploads/courses/1728724563.jpg", title: "Research Labs" },
              { img: "https://media.istockphoto.com/id/1164736873/photo/silhouette-action-sport-outdoors-of-a-group-of-kids-having-fun-playing-soccer-football-for.jpg?s=612x612&w=0&k=20&c=nTeHF_1btt_PCZ6M5EvcD0vb_thUF6AaMDqNleWo-e4=", title: "Sports Complex" },
              { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2axY_sHhQi5_C2nAhXtWwhyeHlVkA_98j1A&s  ", title: "Student Hostels" }
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative rounded-lg overflow-hidden shadow-2xl h-64"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-bold text-lg tracking-wide">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Facilities List */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white font-serif underline">
              World-Class Facilities
            </h3>

            <div className="space-y-4">
              {/* <FacilityItem icon={<FaBook />} text="500,000+ Books & Journals" /> */}
              <FacilityItem icon={<FaFlask />} text="Advanced Research Laboratories" />
              <FacilityItem icon={<FaStethoscope />} text="Medical Simulation Center" />
              <FacilityItem icon={<FaLaptop />} text="High-Speed Smart Campus Wi-Fi" />
              <FacilityItem icon={<FaHeartbeat />} text="Health & Wellness Center" />
              <FacilityItem icon={<FaTrophy />} text="Olympic-Size Sports Facilities" />
            </div>

          
          </div>
        </div>
      </div>
    </section>
  );
}

function FacilityItem({ icon, text }) {
  return (
    <div className="group flex items-center gap-4 p-4 rounded-2xl 
      bg-white/10 backdrop-blur-md border border-white/20
      hover:bg-white/20 transition-all duration-300">

      <div className="w-12 h-12 rounded-xl 
        bg-gradient-to-br from-blue-400 to-blue-600 
        flex items-center justify-center shadow-lg">
        <div className="text-white text-lg">{icon}</div>
      </div>

      <span className="text-blue-100 font-medium group-hover:text-white transition-colors">
        {text}
      </span>
    </div>
  );
}
