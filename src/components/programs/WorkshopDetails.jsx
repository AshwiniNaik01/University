// import React from "react";

// const WorkshopDetails = ({ data }) => {
//   if (!data) {
//     return <p className="text-gray-600">No workshop details available.</p>;
//   }

//   return (
//     <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">
//         Workshop Registration Details
//       </h2>

//       <div className="space-y-3">
//         <p>
//           <span className="font-semibold">Full Name:</span> {data.fullName}
//         </p>
//         <p>
//           <span className="font-semibold">Mobile No:</span> {data.mobileNo}
//         </p>
//         <p>
//           <span className="font-semibold">Email:</span> {data.email}
//         </p>
//         <p>
//           <span className="font-semibold">Date of Birth:</span>{" "}
//           {new Date(data.dob).toLocaleDateString()}
//         </p>
//         <p>
//           <span className="font-semibold">College:</span> {data.collegeName}
//         </p>
//         <p>
//           <span className="font-semibold">Program:</span> {data.selectedProgram}
//         </p>
//         <p>
//           <span className="font-semibold">Payment Status:</span>{" "}
//           <span
//             className={`px-2 py-1 rounded text-white ${
//               data.paymentStatus === "PAID" ? "bg-green-500" : "bg-red-500"
//             }`}
//           >
//             {data.paymentStatus}
//           </span>
//         </p>
//         <p>
//           <span className="font-semibold">Transaction ID:</span>{" "}
//           {data.transactionId}
//         </p>
//         <p>
//           <span className="font-semibold">Status:</span> {data.status}
//         </p>
//         <p>
//           <span className="font-semibold">Registered At:</span>{" "}
//           {new Date(data.registeredAt).toLocaleString()}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default WorkshopDetails;



// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { fetchWorkshopById } from "./events";
// import { motion } from "framer-motion";
// // import { fetchWorkshopById } from "../../apiUtils/workshops"; // adjust path

// const WorkshopDetails = () => {
//   const { eventId } = useParams(); // /book/workshop/:eventId
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//     const navigate = useNavigate();

//   useEffect(() => {
//     const loadWorkshop = async () => {
//       try {
//         const res = await fetchWorkshopById(eventId);
//         if (res.success && res.data) {
//           setData(res.data);
//         } else {
//           setError("Workshop not found");
//         }
//       } catch (err) {
//         console.error("Failed to fetch workshop:", err);
//         setError("Failed to load workshop details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadWorkshop();
//   }, [eventId]);

//   if (loading) {
//     return <p className="text-gray-600 text-center">Loading workshop...</p>;
//   }

//   if (error) {
//     return <p className="text-red-500 text-center">{error}</p>;
//   }

//   if (!data) {
//     return <p className="text-gray-600">No workshop details available.</p>;
//   }


//   return (
//     <div
//       className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
//       style={{
//         backgroundImage:
//           "url('https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')", // Workshop/teamwork vibe
//       }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/50 bg-opacity-60 backdrop-blur-sm"></div>

//       {/* Card */}
//       <motion.div
//         initial={{ y: 40, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         className="relative z-10 max-w-3xl w-full bg-white/10 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/20"
//       >
//         {/* Title */}
//         <h2 className="text-3xl font-extrabold text-white text-center mb-8 tracking-wide">
//           🎓 Workshop Registration Details
//         </h2>

//         {/* Details Grid */}
//         <div className="grid md:grid-cols-2 gap-6 text-white">
//           <p>
//             <span className="font-semibold text-blue-300">Full Name:</span>{" "}
//             {data.fullName}
//           </p>
//           <p>
//             <span className="font-semibold text-blue-300">Mobile No:</span>{" "}
//             {data.mobileNo}
//           </p>
//           <p>
//             <span className="font-semibold text-blue-300">Email:</span>{" "}
//             {data.email}
//           </p>
//           <p>
//             <span className="font-semibold text-blue-300">Date of Birth:</span>{" "}
//             {new Date(data.dob).toLocaleDateString()}
//           </p>
//           <p>
//             <span className="font-semibold text-blue-300">College:</span>{" "}
//             {data.collegeName}
//           </p>
//           <p>
//             <span className="font-semibold text-blue-300">Program:</span>{" "}
//             {data.selectedProgram}
//           </p>

//           {/* Payment Status */}
//           <p>
//             <span className="font-semibold text-blue-300">Payment Status:</span>{" "}
//             <span
//               className={`px-3 py-1 rounded-full text-white font-bold shadow-md ${
//                 data.paymentStatus === "PAID"
//                   ? "bg-green-500 animate-pulse"
//                   : "bg-red-500"
//               }`}
//             >
//               {data.paymentStatus}
//             </span>
//           </p>

//           <p>
//             <span className="font-semibold text-blue-300">Transaction ID:</span>{" "}
//             {data.transactionId}
//           </p>
//           <p>
//             <span className="font-semibold text-blue-300">Status:</span>{" "}
//             <span
//               className={`px-3 py-1 rounded-full font-semibold ${
//                 data.status === "CONFIRMED"
//                   ? "bg-green-400/80 text-black"
//                   : "bg-yellow-400/80 text-black"
//               }`}
//             >
//               {data.status}
//             </span>
//           </p>
//           <p>
//             <span className="font-semibold text-blue-300">Registered At:</span>{" "}
//             {new Date(data.registeredAt).toLocaleString()}
//           </p>
//         </div>

//         {/* Footer / CTA */}
//         <div className="text-center mt-10">
//       <button
//         onClick={() => navigate(-1)} // 👈 Go back to previous page
//         className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white font-bold shadow-lg hover:scale-105 transition-transform"
//       >
//         Back to Workshops
//       </button>
//     </div>
//       </motion.div>
//     </div>
//   );
// };

// export default WorkshopDetails;

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { fetchWorkshopById } from "./events";
// import { motion } from "framer-motion";
// import { FaCalendarAlt, FaMapMarkerAlt, FaUserGraduate, FaTools, FaClipboardList, FaChalkboardTeacher, FaCheckCircle, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

// const WorkshopDetails = () => {
//   const { eventId } = useParams();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadWorkshop = async () => {
//       try {
//         const res = await fetchWorkshopById(eventId);
//         if (res.success && res.data) {
//           setData(res.data);
//         } else {
//           setError("Workshop not found");
//         }
//       } catch (err) {
//         console.error("Failed to fetch workshop:", err);
//         setError("Failed to load workshop details");
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadWorkshop();
//   }, [eventId]);

//   if (loading) return <p className="text-gray-600 text-center mt-20">Loading workshop...</p>;
//   if (error) return <p className="text-red-500 text-center mt-20">{error}</p>;
//   if (!data) return <p className="text-gray-600 text-center mt-20">No workshop details available.</p>;

//   return (
//     <div
//       className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 flex items-center justify-center p-6"
//       style={{
//         backgroundImage: `url('https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

//       {/* Card */}
//       <motion.div
//         initial={{ y: 60, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         className="relative z-10 max-w-6xl w-full bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-white/30"
//       >
//         {/* Left Column */}
//         <div className="md:w-1/3 bg-gradient-to-b from-indigo-800 to-purple-900 p-8 flex flex-col justify-between">
//           <div>
//             <h1 className="text-3xl font-extrabold text-white mb-4 tracking-tight">{data.title}</h1>
//             <p className="text-indigo-200 mb-6 leading-relaxed">{data.description}</p>

//             <div className="space-y-3 text-indigo-300">
//               <div className="flex items-center gap-3">
//                 <FaCalendarAlt className="text-xl" />
//                 <div>
//                   <p className="text-sm">Start Date</p>
//                   <p className="font-semibold">{new Date(data.startDate).toLocaleDateString()}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <FaCalendarAlt className="text-xl" />
//                 <div>
//                   <p className="text-sm">End Date</p>
//                   <p className="font-semibold">{new Date(data.endDate).toLocaleDateString()}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <FaClipboardList className="text-xl" />
//                 <p className="font-semibold">{data.duration}</p>
//               </div>
//               <div className="flex items-center gap-3">
//                 <FaMapMarkerAlt className="text-xl" />
//                 <p className="font-semibold">{data.location}</p>
//               </div>
//               <div className="flex items-center gap-3">
//                 <FaCheckCircle className={`text-xl ${data.certification ? "text-green-400" : "text-red-400"}`} />
//                 <p className="font-semibold">{data.certification ? "Certification Provided" : "No Certification"}</p>
//               </div>
//             </div>
//           </div>

//           {/* Register Button */}
//           <a
//             href={data.registrationLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="mt-10 block w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-center rounded-xl py-3 shadow-lg hover:scale-105 transition-transform"
//           >
//             Register Now
//           </a>
//         </div>

//         {/* Right Column */}
//         <div className="md:w-2/3 bg-white/90 text-gray-900 p-10 overflow-y-auto max-h-[90vh]">
//           {/* Sections */}
//           <Section title="Prerequisites">
//             <List items={data.prerequisites} />
//           </Section>

//           <Section title="Topics Covered">
//             <List items={data.topics} />
//           </Section>

//           <Section title="Tools Used">
//             <List items={data.tools} icon={<FaTools className="inline text-indigo-600 mr-2" />} />
//           </Section>

//           <Section title="Instructors">
//             <List items={data.instructors.map((i) => i.name)} icon={<FaChalkboardTeacher className="inline text-indigo-600 mr-2" />} />
//           </Section>

//           <Section title="Schedule">
//             <List items={data.schedule.map((s) => s.day)} icon={<FaUserGraduate className="inline text-indigo-600 mr-2" />} />
//           </Section>

//           {/* Contact */}
//           <div className="mt-10 border-t pt-6 flex flex-col gap-3 text-gray-700">
//             <h3 className="text-xl font-semibold mb-3 border-b border-indigo-600 pb-2">Contact Information</h3>
//             <p>
//               <FaEnvelope className="inline mr-2 text-indigo-600" />
//               <a href={`mailto:${data.contact.email}`} className="text-indigo-700 hover:underline">
//                 {data.contact.email}
//               </a>
//             </p>
//             <p>
//               <FaPhoneAlt className="inline mr-2 text-indigo-600" />
//               {data.contact.phone}
//             </p>
//           </div>

//           {/* Back Button */}
//           <div className="mt-12 text-center">
//             <button
//               onClick={() => navigate(-1)}
//               className="inline-block px-8 py-3 bg-indigo-700 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-800 transition"
//             >
//               ← Back to Workshops
//             </button>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // Helper Section Component
// const Section = ({ title, children }) => (
//   <section className="mb-8">
//     <h3 className="text-2xl font-bold text-indigo-700 mb-4 border-b border-indigo-600 pb-1">{title}</h3>
//     {children}
//   </section>
// );

// // Helper List Component
// const List = ({ items, icon }) => (
//   <ul className="list-disc list-inside space-y-1 text-gray-800">
//     {items.map((item, idx) => (
//       <li key={idx}>
//         {icon} {item}
//       </li>
//     ))}
//   </ul>
// );

// export default WorkshopDetails;



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

const WorkshopDetails = () => {
  const { eventId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  if (loading)
    return <p className="text-gray-600 text-center mt-20">Loading workshop...</p>;
  if (error)
    return <p className="text-red-500 text-center mt-20">{error}</p>;
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
          animation: `float ${Math.random() * 15 + 10}s ease-in-out infinite alternate`,
          animationDelay: `${Math.random() * 5}s`,
          filter: 'blur(1px)'
        }}
      ></div>
    ))}

    <motion.div
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 text-white z-10"
    >
      {/* Left info panel */}
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
              valueClass={data.certification ? "text-green-300 font-semibold" : "text-red-300 font-semibold"}
            />
          </ul>

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

      {/* Right detail panel */}
     <motion.section
  initial={{ x: 50, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ delay: 0.5, duration: 0.8 }}
  className="lg:col-span-7 bg-white/20 backdrop-blur-3xl border border-white/30 rounded-3xl p-12 shadow-3xl  max-h-[152vh] relative overflow-hidden flex flex-col"
style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
>
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

  {/* Content */}
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
      items={Array.isArray(data.instructors) ? data.instructors.map(i => i.name) : []}
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
            <span className="text-white font-semibold">{data.contact.phone}</span>
          </div>
        </div>
      </div>
    </motion.div>

    {/* Back Button */}
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
      <p className={`text-lg font-semibold ${valueClass || "text-white"}`}>{value}</p>
    </div>
  </motion.li>
);

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
          <span className="text-purple-100 group-hover:text-white transition-colors">{item}</span>
        </motion.li>
      ))}
    </ul>
  </motion.section>
);

export default WorkshopDetails;
