import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchWorkshopById } from "./events";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserGraduate,
  FaTools,
  FaClipboardList,
  FaChalkboardTeacher,
  FaCheckCircle,
  FaEnvelope,
  FaPhoneAlt,
  FaBook,
  FaGraduationCap,
  FaArrowLeft,
  FaUserTie,
} from "react-icons/fa";

// WorkshopDetails component fetches and displays information about a single workshop event.

const WorkshopDetails = () => {
  const { eventId } = useParams(); // Extract the eventId from route params
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //  Fetch workshop details by eventId.
  useEffect(() => {
    const loadWorkshop = async () => {
      try {
        const res = await fetchWorkshopById(eventId);
        if (res.success && res.data) {
          setData(res.data);
        } else {
          setError("Workshop not found");
        }
      } catch (err) {
        console.error("Failed to fetch workshop:", err);
        setError("Failed to load workshop details");
      } finally {
        setLoading(false);
      }
    };
    loadWorkshop();
  }, [eventId]);

  // Render loading indicator while fetching data
  if (loading)
    return (
      <p className="text-gray-600 text-center mt-20">Loading workshop...</p>
    );

  // Show error message if fetch failed or workshop doesn't exist
  if (error) return <p className="text-red-500 text-center mt-20">{error}</p>;

  // Defensive fallback if data is null or undefined
  if (!data)
    return (
      <p className="text-gray-600 text-center mt-20">
        No workshop details available.
      </p>
    );

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 flex items-center justify-center p-6 relative overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-900 to-pink-900 backdrop-blur-md opacity-90"></div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/20"
          style={{
            width: `${Math.random() * 10 + 6}px`,
            height: `${Math.random() * 10 + 6}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${
              Math.random() * 15 + 10
            }s ease-in-out infinite alternate`,
            animationDelay: `${Math.random() * 5}s`,
            filter: "blur(1px)",
          }}
        ></div>
      ))}

      {/* Main container with animation */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 text-white z-10"
      >
        {/* Left info panel:  Workshop core info and registration */}
        <motion.section
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="lg:col-span-5 bg-white/20 backdrop-blur-3xl border border-white/30 rounded-3xl p-12 shadow-3xl relative overflow-hidden flex flex-col"
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-300/20 via-indigo-300/20 to-blue-300/20 -z-10 rounded-3xl"></div>

          {/* Corner accents */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-pink-400/30 to-transparent rounded-bl-4xl"></div>
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-gradient-to-tr from-blue-400/30 to-transparent rounded-tr-4xl"></div>

          <div className="relative z-10 flex flex-col h-full">
            <h1 className="text-5xl font-extrabold leading-tight mb-8 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent drop-shadow-[0_3px_10px_rgba(0,0,0,0.7)]">
              {data.title}
            </h1>
            <p className="mb-12 text-purple-100 font-medium text-lg leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
              {data.description}
            </p>

            {/* Key details about the workshop */}
            <ul className="space-y-8 flex-grow overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-transparent">
              <InfoItem
                icon={<FaCalendarAlt className="text-pink-500" />}
                label="Start Date"
                value={new Date(data.startDate).toLocaleDateString()}
              />
              <InfoItem
                icon={<FaCalendarAlt className="text-pink-400" />}
                label="End Date"
                value={new Date(data.endDate).toLocaleDateString()}
              />
              <InfoItem
                icon={<FaClipboardList className="text-blue-400" />}
                label="Duration"
                value={data.duration}
              />
              <InfoItem
                icon={<FaMapMarkerAlt className="text-blue-400" />}
                label="Location"
                value={data.location}
              />
              <InfoItem
                icon={<FaCheckCircle className="text-green-400" />}
                label="Certification"
                value={data.certification ? "Provided" : "Not Provided"}
                valueClass={
                  data.certification
                    ? "text-green-300 font-semibold"
                    : "text-red-300 font-semibold"
                }
              />
            </ul>

            {/* Registration button  */}
            <motion.a
              href={data.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-12 inline-block text-center bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 py-4 rounded-3xl font-bold text-lg tracking-wide shadow-3xl hover:shadow-4xl transition-transform duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Register Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
            </motion.a>
          </div>
        </motion.section>

        {/* Right panel: Detailed workshop info such as prerequisites, topics, instructors, contact */}
        <motion.section
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="lg:col-span-7 bg-white/20 backdrop-blur-3xl border border-white/30 rounded-3xl p-12 shadow-3xl  max-h-[152vh] relative overflow-hidden flex flex-col"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Hide default scrollbar on webkit browsers */}
          <style>
            {`
      ::-webkit-scrollbar {
        display: none;
      }
    `}
          </style>

          {/* Gradient overlay - classy and soft */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-300/20 via-indigo-300/20 to-blue-300/20 -z-10 rounded-3xl"></div>

          {/* Corner accents */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-pink-400/30 to-transparent rounded-bl-4xl"></div>
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-gradient-to-tr from-blue-400/30 to-transparent rounded-tr-4xl"></div>

          {/* Scrollable content area for detailed info */}
          <div className="relative z-10 flex flex-col h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-transparent max-h-[140vh]">
            <DetailSection
              title="Prerequisites"
              items={data.prerequisites}
              icon={<FaBook className="text-purple-400" />}
            />
            <DetailSection
              title="Topics Covered"
              items={data.topics}
              icon={<FaGraduationCap className="text-indigo-400" />}
            />
            <DetailSection
              title="Instructors"
              items={
                Array.isArray(data.instructors)
                  ? data.instructors.map((i) => i.name)
                  : []
              }
              icon={<FaUserTie className="text-pink-400" />}
            />

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-14 border-t border-white/30 pt-8"
            >
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
                Contact Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-colors duration-300 cursor-pointer">
                  <div className="p-3 bg-purple-700/30 rounded-full">
                    <FaEnvelope className="text-xl text-purple-300" />
                  </div>
                  <div>
                    <p className="text-sm text-purple-200">Email</p>
                    <a
                      href={`mailto:${data.contact.email}`}
                      className="text-white font-semibold hover:text-purple-400 transition-colors"
                    >
                      {data.contact.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-colors duration-300 cursor-pointer">
                  <div className="p-3 bg-blue-700/30 rounded-full">
                    <FaPhoneAlt className="text-xl text-blue-300" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">Phone</p>
                    <span className="text-white font-semibold">
                      {data.contact.phone}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Back Button to return on previous page */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-10 text-center"
            >
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 bg-indigo-700 hover:bg-indigo-800 transition-all duration-300 text-white font-semibold rounded-3xl px-8 py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <FaArrowLeft className="text-sm" />
                Back to Workshops
              </button>
            </motion.div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

/**
 * InfoItem displays an icon, label and corresponding value.
 * Used to show key workshop details like dates, location, etc.
 */

const InfoItem = ({ icon, label, value, valueClass }) => (
  <motion.li
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className="flex items-center gap-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group"
  >
    <div className="p-2  bg-gradient-to-br from-gray-600/20 to-gray-600/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <div>
      <p className="text-md font-bold text-gray-800 opacity-80">{label}</p>
      <p className={`text-lg font-semibold ${valueClass || "text-white"}`}>
        {value}
      </p>
    </div>
  </motion.li>
);

/**
 * DetailSection displays a titled section with an icon and a list of items.
 * Useful for sections like prerequisites, topics, instructors.
 */
const DetailSection = ({ title, items = [], icon }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="mb-10"
  >
    <div className="flex items-center gap-3 mb-6 pb-3 border-b border-white/20">
      <div className="p-2 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-lg">
        {icon}
      </div>
      <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
        {title}
      </h3>
    </div>
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <motion.li
          key={idx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="flex items-center gap-3 p-3 bg-white/25 rounded-lg hover:bg-white/10 transition-all duration-300 group"
        >
          <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
          <span className="text-purple-100 group-hover:text-white transition-colors">
            {item}
          </span>
        </motion.li>
      ))}
    </ul>
  </motion.section>
);

export default WorkshopDetails;
