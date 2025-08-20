import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../../apiUtils/instance";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaClock,
  FaMapMarkerAlt,
  FaGlobe,
  FaUsers,
  FaCertificate,
  FaExternalLinkAlt,
  FaRegCopy,
  FaImages,
  FaTimes,
  FaRegClock,
  FaInfoCircle,
  FaUserTie,
  FaCheckCircle,
  FaUserFriends,
  FaTags,
  FaCalendarAlt,
  FaChevronDown,
  FaTag,
  FaMicrophone,
  FaTicketAlt,
  FaShareAlt,
  FaVideo,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaUserPlus,
} from "react-icons/fa";
import { DIR } from "../../config";

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);

  const socialIconsMap = {
    facebook: FaFacebookF,
    instagram: FaInstagram,
    twitter: FaTwitter,
    linkedin: FaLinkedinIn,
  };

  // const EventDetailsPage = ({ event }) => {
  const formatDate = (d) =>
    new Date(d).toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/event/${eventId}`);
        setEvent(res.data.data);
      } catch (err) {
        setError("Oops! Couldn't load the event.");
      } finally {
        setLoading(false);
      }
    };
    fetchEventDetails();
  }, [eventId]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading...
      </div>
    );

  if (error || !event)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error || "Event not found"}
      </div>
    );

  // Format dates
  

  console.log(
    "Banner Image URL:",
    event?.bannerImage ? DIR.EVENT_BANNER + event.bannerImage : "Default banner"
  );
  console.log(
    "Gallery Image URLs:",
    event?.gallery?.map((img) => DIR.EVENT_GALLERY_IMAGE + img)
  );

  return (
    // <div className="min-h-screen bg-gray-50 text-white font-sans">
    <div className="relative min-h-screen bg-gradient-to-br from-slate-100 via-slate-300 to-gray-700 text-white font-sans animate-gradient-x bg-[length:200%_200%] overflow-hidden">
  {/* Background blobs */}
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
    <div className="absolute top-[200px] right-[-100px] w-[300px] h-[300px] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
  </div>
      {/* Hero */}
      {/* <section
        className="relative h-[420px] bg-cover bg-center flex flex-col justify-center items-center text-center px-6"
        style={{
            backgroundImage: `url(${event.bannerImage ? DIR.EVENT_BANNER + event.bannerImage : "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80"})`,
        //   backgroundImage: `url(${event.bannerImage || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80"})`,
        }}
      > */}

      {/* <section
        className="relative min-h-[320px] md:min-h-[420px] bg-cover bg-center py-16 flex flex-col justify-center items-center text-center px-6"
        style={{
          backgroundImage: `url(${
            event.bannerImage
              ? DIR.EVENT_BANNER + event.bannerImage
              : "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80"
          })`,
        }}
      >
        <div className="absolute inset-0 bg-black/50 bg-opacity-70"></div>

        <h1 className="relative text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient-x max-w-4xl">
          {event.title}
        </h1>

        <p className="relative mt-3 max-w-3xl text-lg md:text-xl opacity-80">
          {event.description}
        </p>

        {/* Social Links */}
        {/* <div className="relative flex justify-center space-x-6 mt-6 text-white/90">
          {Object.entries(event.socialLinks || {}).map(([key, url]) => {
            const Icon = socialIconsMap[key];
            if (!Icon) return null;
            return (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition-colors text-2xl"
                aria-label={key}
              >
                <Icon />
              </a>
            );
          })}
        </div> */}

        {/* <Link
          to="/book/event"
          className="relative mt-10 inline-block bg-pink-600 hover:bg-pink-700 transition rounded-full px-10 py-4 font-bold text-white shadow-lg shadow-pink-800/40"
        >
          Back to Events
        </Link>
      </section> */} 

       <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center px-6 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${
            event.bannerImage
              ? DIR.EVENT_BANNER + event.bannerImage
              : "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          })`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-6xl w-full p-12 mx-auto text-center">
        {/* Event Badge */}
        <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-white text-sm font-medium mb-6">
          <FaCalendarAlt className="mr-2" />
          {event.mode} Event
        </div>

        {/* Event Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          {event.title}
        </h1>

        {/* Event Description */}
        <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <div className="flex items-center text-white/90">
            <FaClock className="mr-2" />
            <span>{formatDate(event.startDate)} • {event.startTime}</span>
          </div>
          <div className="flex items-center text-white/90">
            <FaMapMarkerAlt className="mr-2" />
            <span>{event.location}</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          {event.registrationLink && (
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white text-gray-900 rounded-full font-medium shadow-lg hover:bg-gray-100 transition"
            >
              Register Now
            </a>
          )}
          <Link
            to="/events"
            className="px-8 py-3 bg-transparent rounded-full font-medium text-white border border-white hover:bg-white/10 transition"
          >
            Browse Events
          </Link>
        </div>
      </div>
    </section>


      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-10 md:flex md:space-x-12 items-start">
        {/* Event Info */}
        <section className="bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-700 flex-1">
          <h2 className="text-3xl font-semibold mb-6 tracking-wide">
            {/* <FaInfoCircle className="text-pink-500" /> */}
            Event Details
          </h2>
          <div className="space-y-5 text-gray-300">
            <div className="flex items-center space-x-3">
              <FaClock className="text-pink-500" />
              <span>
                {formatDate(event.startDate)} - {formatDate(event.endDate)} |{" "}
                {event.startTime} - {event.endTime}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-pink-500" />
              <span>{event.location}</span>
            </div>

            <div className="flex items-center space-x-3">
              <FaGlobe className="text-pink-500" />
              <span>{event.mode}</span>
            </div>

            <div className="flex items-center space-x-3">
              <FaUsers className="text-pink-500" />
              <span>
                {event.registeredCount} / {event.maxParticipants} Participants
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <FaCertificate className="text-pink-500" />
              <span>
                Certificate:{" "}
                {event.certificateAvailable ? "Available" : "Not Available"}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <FaUserTie className="text-pink-500 mt-1" />
              <span>Organizer: {event.organizer}</span>
            </div>

            <div className="flex items-center space-x-3">
              <FaCheckCircle className="text-pink-500 mt-1" />
              <span>
                Status:{" "}
                <span
                  className={`font-semibold ${
                    event.status === "Active"
                      ? "text-green-400"
                      : event.status === "Past"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }`}
                >
                  {event.status}
                </span>
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <FaUserFriends className="text-pink-500 mt-1" />
              <span>Speakers: {event.speakers.join(", ")}</span>
            </div>

            <div className="flex items-center space-x-3">
              <FaTags className="text-pink-500 mt-1" />
              <span>
                Price:{" "}
                {event.isFree ? (
                  <span className="text-green-400 font-semibold">Free</span>
                ) : (
                  `₹${event.price}`
                )}
              </span>
            </div>

            {/* <p>
              <strong>Organizer:</strong> {event.organizer}
            </p> */}

            {/* <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  event.status === "Active"
                    ? "text-green-400"
                    : event.status === "Past"
                    ? "text-red-400"
                    : "text-yellow-400"
                }`}
              >
                {event.status}
              </span>
            </p> */}

            {event.meetingLink && (
              <p>
                <strong>Meeting Link:</strong>{" "}
                <a
                  href={event.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[#53b8ec] hover:text-[#e9577c]"
                >
                  Join Meeting
                </a>
              </p>
            )}
            {event.registrationLink && (
              <p>
                <strong>Registration:</strong>{" "}
                <a
                  href={event.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[#53b8ec] hover:text-[#e9577c]"
                >
                  Register Now
                </a>
              </p>
            )}
            {event.feedbackFormLink && event.feedbackFormLink !== "true" && (
              <p>
                <strong>Feedback:</strong>{" "}
                <a
                  href={event.feedbackFormLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[#53b8ec] hover:text-[#e9577c]"
                >
                  Provide Feedback
                </a>
              </p>
            )}
            {/* {event.tags?.length > 0 && (
              <div>
                <strong>Tags:</strong>
                <div className="mt-2 flex flex-wrap gap-2">
                  {event.tags.map((tag, i) => (
                    <span key={i} className="bg-[#485dac] px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )} */}

            {/* <p>
              <strong>Speakers:</strong> {event.speakers.join(", ")}
            </p> */}

            {/* <p>
              <strong>Price:</strong>{" "}
              {event.isFree ? (
                <span className="text-green-400 font-semibold">Free</span>
              ) : (
                `₹${event.price}`
              )}
            </p> */}
          </div>

          {event.registrationLink && (
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 block text-center bg-pink-600 hover:bg-pink-700 rounded-full py-4 font-semibold transition shadow-lg shadow-pink-800/40"
            >
              Register Now
            </a>
          )}
        </section>

        {/* Agenda + Gallery */}
        <section className="space-y-10 flex-1">
          {/* Agenda Timeline */}
          {/* <div className="bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700">
            <h2 className="text-3xl font-semibold mb-6 tracking-wide">
              Agenda
            </h2>
            <ol className="relative border-l border-pink-500 ml-4 space-y-6">
              {event.agenda.map(({ _id, time, activity }) => (
                <li key={_id} className="mb-6 ml-6">
                  <span className="absolute -left-6 flex items-center justify-center w-10 h-10 bg-pink-600 rounded-full text-white font-bold">
                    {time}
                  </span>
                  <p className="text-lg font-semibold">{activity}</p>
                </li>
              ))}
            </ol>
          </div> */}

          <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl p-8 shadow-2xl border border-gray-700">
            <h2 className="text-3xl font-bold mb-8 tracking-wide text-pink-400 flex items-center gap-3">
              <FaRegClock className="text-pink-500 text-3xl" />
              Event Agenda
            </h2>

            <ol className="relative border-l-4 border-pink-500/40 ml-4 space-y-12">
              {event.agenda.map(({ _id, time, activity }, index) => (
                <li key={_id} className="relative pl-10 group">
                  {/* Circle Dot */}
                  <div className="absolute -left-[30px] top-1.5 w-6 h-6 bg-pink-600 rounded-full shadow-lg border-4 border-gray-900 z-10" />

                  {/* Content */}
                  <div className="bg-gray-800 rounded-xl p-5 shadow-md border border-gray-700 transition-all duration-300 group-hover:shadow-pink-500/20 group-hover:border-pink-500/40">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-pink-400 font-semibold tracking-wide">
                        {time}
                      </span>
                      <span className="text-sm text-gray-400">
                        Session {index + 1}
                      </span>
                    </div>
                    <p className="text-lg font-medium text-gray-100">
                      {activity}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Gallery Carousel */}
          {event.gallery?.length > 0 && (
            <div className="bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700">
              <h2 className="text-3xl font-semibold mb-6 tracking-wide">
                Gallery
              </h2>
              <div className="flex space-x-6 overflow-x-auto scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-gray-700">
                {event.gallery.map((img, idx) => (
                  <img
                    key={idx}
                    src={`${DIR.EVENT_GALLERY_IMAGE}${img}`}
                    // src={img}
                    alt={`Gallery image ${idx + 1}`}
                    className="rounded-lg max-h-48 object-cover cursor-pointer hover:scale-105 transition-transform"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sponsors */}
          {/* {event.sponsors?.length > 0 && (
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 text-center">
              <h3 className="text-2xl font-semibold mb-4 tracking-wide">
                Sponsors
              </h3>
              <div className="flex justify-center space-x-8">
                {event.sponsors.map((sponsor, i) => (
                  <span
                    key={i}
                    className="bg-pink-600 text-gray-900 px-4 py-2 rounded-full font-bold uppercase tracking-widest cursor-default select-none"
                  >
                    {sponsor}
                  </span>
                ))}
              </div>
            </div>
          )} */}

          {/* {event.sponsors?.length > 0 && (
            <div className="bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-700 text-center max-w-4xl mx-auto">
              <h3 className="text-3xl font-extrabold mb-6 tracking-wide text-pink-500 uppercase">
                Sponsored by
              </h3>
              <div className="flex flex-wrap justify-center items-center gap-8">
                {event.sponsors.map((sponsor, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center space-y-2 w-32 transition-transform hover:scale-110 hover:shadow-lg cursor-pointer"
                    title={sponsor.name || sponsor}
                  >
                    {/* If you have logo URLs, replace the <div> below with <img> */}
                    {/* {sponsor.logo ? (
                      <img
                        src={sponsor.logo}
                        alt={`${sponsor.name || sponsor} logo`}
                        className="h-16 object-contain"
                      />
                    ) : (
                      <div className="flex justify-center items-center bg-pink-600 rounded-full w-16 h-16 text-white text-2xl font-bold uppercase shadow-md">
                        {/* Show first letter or icon fallback */}
                        {/* {sponsor.name
                          ? sponsor.name.charAt(0)
                          : sponsor.charAt(0)}
                      </div>
                    )}
                    <span className="text-gray-300 font-semibold tracking-wide text-sm select-none">
                      {sponsor.name || sponsor}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )} */} 

          {/* Resources */}
          {/* {event.resources?.length > 0 && (
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
              <h3 className="text-2xl font-semibold mb-4 tracking-wide">
                Resources
              </h3>
              <ul className="list-disc list-inside space-y-2 text-pink-400 hover:text-pink-600">
                {event.resources.map((url, idx) => (
                  <li key={idx}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )} */}

          {/* {event.resources?.length > 0 && (
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
              <h3 className="text-2xl font-semibold mb-4 tracking-wide text-pink-400">
                Resources
              </h3>
              <ul className="space-y-3">
                {event.resources.map((url, idx) => (
                  <li
                    key={idx}
                    className="flex items-center space-x-3 text-pink-300 hover:text-pink-600 transition-colors"
                  >
                    <FaExternalLinkAlt className="text-lg" />
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline truncate max-w-xs"
                      title={url}
                    >
                      {url.length > 40 ? url.slice(0, 40) + "..." : url}
                    </a>
                    <button
                      onClick={() => navigator.clipboard.writeText(url)}
                      className="ml-auto text-pink-400 hover:text-pink-700 transition"
                      aria-label="Copy link"
                    >
                      <FaRegCopy />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )} */}
        </section>
      </main>

      {/* Sponsors & Resources Section */}
{(event.sponsors?.length > 0 || event.resources?.length > 0) && (
  <section className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Sponsors */}
{event.sponsors?.length > 0 && (
  <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl p-8 shadow-xl border border-gray-700">
    <h3 className="text-2xl font-bold mb-6 text-center text-pink-500 uppercase tracking-widest">
      Our Sponsors
    </h3>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {event.sponsors.map((sponsor, i) => (
        <div
          key={i}
          className="flex items-center space-x-3 bg-gray-800 rounded-lg p-3 shadow border border-gray-700 hover:shadow-pink-500/30 transition-transform hover:scale-[1.02] cursor-pointer"
          title={sponsor.name || sponsor}
        >
          {/* Logo or Fallback */}
          {sponsor.logo ? (
            <img
              src={sponsor.logo}
              alt={`${sponsor.name || sponsor} logo`}
              className="h-10 w-10 object-contain bg-white rounded-full p-1"
            />
          ) : (
            <div className="h-10 w-10 flex items-center justify-center bg-pink-600 rounded-full text-white text-base font-bold">
              {sponsor.name ? sponsor.name.charAt(0) : sponsor.charAt(0)}
            </div>
          )}

          {/* Sponsor Name */}
          <div className="text-left">
            <p className="text-sm text-gray-200 font-semibold truncate max-w-[100px]">
              {sponsor.name || sponsor}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
)}



    {/* Resources */}
    {event.resources?.length > 0 && (
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
        <h3 className="text-2xl font-semibold mb-4 tracking-wide text-pink-400">
          Resources
        </h3>
        <ul className="space-y-3">
          {event.resources.map((url, idx) => (
            <li
              key={idx}
              className="flex items-center space-x-3 text-pink-300 hover:text-pink-600 transition-colors"
            >
              <FaExternalLinkAlt className="text-lg" />
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline truncate max-w-xs"
                title={url}
              >
                {url.length > 40 ? url.slice(0, 40) + "..." : url}
              </a>
              <button
                onClick={() => navigator.clipboard.writeText(url)}
                className="ml-auto text-pink-400 hover:text-pink-700 transition"
                aria-label="Copy link"
              >
                <FaRegCopy />
              </button>
            </li>
          ))}
        </ul>
      </div>
    )}
  </section>
)}


      <style>
        {`
          @keyframes gradient-x {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 8s ease infinite;
          }
          /* Scrollbar styles */
          .scrollbar-thin::-webkit-scrollbar {
            height: 6px;
          }
          .scrollbar-thin::-webkit-scrollbar-track {
            background: transparent;
          }
          .scrollbar-thin::-webkit-scrollbar-thumb {
            background-color: #db2777; /* pink-600 */
            border-radius: 9999px;
          }
        `}
      </style>
    </div>
  );


// return (
//   <div className="min-h-screen bg-[#f8f9ff] text-gray-900 font-sans overflow-x-hidden">
//     {/* Animated Background Particles */}
//     <div className="fixed inset-0 overflow-hidden z-0">
//       {[...Array(30)].map((_, i) => (
//         <div 
//           key={i}
//           className="absolute rounded-full bg-gradient-to-r from-indigo-300/20 to-pink-300/20"
//           style={{
//             width: `${Math.random() * 300 + 50}px`,
//             height: `${Math.random() * 300 + 50}px`,
//             top: `${Math.random() * 100}%`,
//             left: `${Math.random() * 100}%`,
//             filter: 'blur(60px)',
//             animation: `float ${Math.random() * 20 + 10}s infinite ease-in-out`,
//             animationDelay: `${Math.random() * 5}s`
//           }}
//         ></div>
//       ))}
//     </div>

//     {/* Hero Section with Glass Morphism */}
//     {/* <section className="relative h-screen min-h-[800px] flex items-center justify-center px-6 z-10">
//       <div className="absolute inset-0 overflow-hidden">
//         <div 
//           className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
//           style={{
//             backgroundImage: `url(${
//               event.bannerImage
//                 ? DIR.EVENT_BANNER + event.bannerImage
//                 : "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
//             })`,
//             backgroundAttachment: 'fixed'
//           }}
//         >
//           <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 via-indigo-900/70 to-transparent"></div>
//         </div>
//       </div>

//       <div className="relative max-w-6xl w-full mx-auto text-center">
//         {/* Floating Event Badge */}
//         {/* <motion.div 
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2, duration: 0.8 }}
//           className="inline-flex items-center px-5 py-2 bg-white/20 backdrop-blur-lg rounded-full border border-white/30 shadow-lg mb-8"
//         >
//           <FaCalendarAlt className="mr-2 text-white" />
//           <span className="text-white font-medium uppercase tracking-wider">{event.mode} Event</span>
//         </motion.div> */}

//         {/* Animated Gradient Title */}
//         {/* <motion.h1 
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8"
//         >
//           <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-200 to-white animate-gradient-x">
//             {event.title}
//           </span>
//         </motion.h1> */}

//         {/* Event Details Glass Card */}
//         {/* <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4, duration: 0.8 }}
//           className="inline-flex bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg mb-12"
//         >
//           <div className="flex flex-wrap justify-center gap-6 text-white">
//             <div className="flex items-center">
//               <FaClock className="text-pink-200 mr-2" />
//               <span>{formatDate(event.startDate)} • {event.startTime}</span>
//             </div>
//             <div className="flex items-center">
//               <FaMapMarkerAlt className="text-pink-200 mr-2" />
//               <span>{event.location}</span>
//             </div>
//           </div>
//         </motion.div> */}

//         {/* 3D Animated Buttons */}
//         {/* <motion.div 
//           className="flex flex-wrap justify-center gap-6"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.6, duration: 0.8 }}
//         >
//           {event.registrationLink && (
//             <motion.a
//               href={event.registrationLink}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="px-10 py-4 bg-gradient-to-br from-pink-500 to-indigo-600 rounded-xl font-bold text-white shadow-xl hover:shadow-pink-500/40 transition-all duration-300 hover:-translate-y-1"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <span className="relative z-10 flex items-center gap-2">
//                 <FaTicketAlt /> Register Now
//               </span>
//             </motion.a>
//           )}
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Link
//               to="/events"
//               className="px-10 py-4 bg-transparent rounded-xl font-bold text-white border-2 border-white hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
//             >
//               <FaCalendarAlt /> Browse Events
//             </Link>
//           </motion.div>
//         </motion.div> */}

//         {/* Scroll Indicator */}
//         {/* <motion.div
//           className="absolute bottom-10 left-1/2 -translate-x-1/2"
//           animate={{ y: [0, 15, 0] }}
//           transition={{ repeat: Infinity, duration: 2 }}
//         >
//           <FaChevronDown className="text-2xl text-white opacity-70" />
//         </motion.div>
//       </div>
//     </section> */} 

//      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center px-6 overflow-hidden">
//       {/* Background Image */}
//       <div 
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{
//           backgroundImage: `url(${
//             event.bannerImage
//               ? DIR.EVENT_BANNER + event.bannerImage
//               : "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
//           })`
//         }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent"></div>
//       </div>

//       {/* Content */}
//       <div className="relative max-w-6xl w-full mx-auto text-center">
//         {/* Event Badge */}
//         <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-white text-sm font-medium mb-6">
//           <FaCalendarAlt className="mr-2" />
//           {event.mode} Event
//         </div>

//         {/* Event Title */}
//         <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
//           {event.title}
//         </h1>

//         {/* Event Description */}
//         <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
//           {event.description}
//         </p>

//         {/* Event Details */}
//         <div className="flex flex-wrap justify-center gap-4 mb-10">
//           <div className="flex items-center text-white/90">
//             <FaClock className="mr-2" />
//             <span>{formatDate(event.startDate)} • {event.startTime}</span>
//           </div>
//           <div className="flex items-center text-white/90">
//             <FaMapMarkerAlt className="mr-2" />
//             <span>{event.location}</span>
//           </div>
//         </div>

//         {/* CTA Buttons */}
//         <div className="flex flex-wrap justify-center gap-4">
//           {event.registrationLink && (
//             <a
//               href={event.registrationLink}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="px-8 py-3 bg-white text-gray-900 rounded-full font-medium shadow-lg hover:bg-gray-100 transition"
//             >
//               Register Now
//             </a>
//           )}
//           <Link
//             to="/events"
//             className="px-8 py-3 bg-transparent rounded-full font-medium text-white border border-white hover:bg-white/10 transition"
//           >
//             Browse Events
//           </Link>
//         </div>
//       </div>
//     </section>


//     {/* Main Content */}
//     <div className="relative max-w-7xl mx-auto px-6 py-20 z-10">
//       {/* Floating 3D Card Sections */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
//         {/* About Section */}
//         <motion.div 
//           className="lg:col-span-2 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//         >
//           <div className="p-10">
//             <div className="flex items-center gap-4 mb-8">
//               <div className="p-4 bg-gradient-to-br from-indigo-100 to-pink-100 rounded-xl shadow-inner">
//                 <FaInfoCircle className="text-2xl text-indigo-600" />
//               </div>
//               <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">
//                 About The Event
//               </h2>
//             </div>
//             <p className="text-lg text-gray-700 leading-relaxed">
//               {event.description || "No description provided."}
//             </p>
//           </div>
//         </motion.div>

//         {/* Quick Stats */}
//         <motion.div 
//           className="bg-gradient-to-br from-indigo-500 to-pink-500 rounded-3xl shadow-2xl overflow-hidden"
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           viewport={{ once: true }}
//         >
//           <div className="p-8 h-full flex flex-col">
//             <h3 className="text-2xl font-bold text-white mb-6">Event At a Glance</h3>
            
//             <div className="grid grid-cols-2 gap-4 mb-6">
//               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
//                 <div className="text-white/80 text-sm mb-1">Participants</div>
//                 <div className="text-2xl font-bold text-white">
//                   {event.registeredCount}/{event.maxParticipants}
//                 </div>
//               </div>
//               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
//                 <div className="text-white/80 text-sm mb-1">Certification</div>
//                 <div className="text-2xl font-bold text-white">
//                   {event.certificateAvailable ? 'Yes' : 'No'}
//                 </div>
//               </div>
//               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
//                 <div className="text-white/80 text-sm mb-1">Price</div>
//                 <div className="text-2xl font-bold text-white">
//                   {event.isFree ? 'Free' : `₹${event.price}`}
//                 </div>
//               </div>
//               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
//                 <div className="text-white/80 text-sm mb-1">Status</div>
//                 <div className={`text-2xl font-bold ${
//                   event.status === 'Active' ? 'text-emerald-300' : 
//                   event.status === 'Past' ? 'text-red-300' : 'text-amber-300'
//                 }`}>
//                   {event.status}
//                 </div>
//               </div>
//             </div>

//             {event.registrationLink && (
//               <a
//                 href={event.registrationLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="mt-auto w-full text-center bg-white text-indigo-600 py-3 rounded-lg font-bold shadow-lg hover:shadow-white/30 transition-all hover:scale-[1.02]"
//               >
//                 Secure Your Spot
//               </a>
//             )}
//           </div>
//         </motion.div>
//       </div>

//       {/* Agenda Timeline */}
//       <motion.div 
//         className="mb-20"
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//         viewport={{ once: true }}
//       >
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">
//             Event Agenda
//           </h2>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Here's what you can expect during the event
//           </p>
//         </div>

//         <div className="relative">
//           {/* Timeline Bar */}
//           <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-300 to-pink-300 rounded-full"></div>
          
//           <div className="space-y-10 pl-16">
//             {event.agenda.map((item, index) => (
//               <motion.div 
//                 key={item._id} 
//                 className="relative group"
//                 initial={{ opacity: 0, x: -20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//               >
//                 {/* Timeline Dot */}
//                 <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-4 border-white">
//                   {index + 1}
//                 </div>

//                 <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 group-hover:border-indigo-300 transition-all duration-300 hover:shadow-2xl">
//                   <div className="flex justify-between items-center mb-4">
//                     <span className="text-indigo-600 font-bold">{item.time}</span>
//                     <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//                       Session {index + 1}
//                     </span>
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-800 mb-2">{item.activity}</h3>
//                   <p className="text-gray-600">Detailed description of this session...</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.div>

//       {/* Speakers Section */}
//       {event.speakers?.length > 0 && (
//         <motion.div 
//           className="mb-20"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//         >
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">
//               Featured Speakers
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Learn from industry experts and thought leaders
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {event.speakers.map((speaker, index) => (
//               <motion.div
//                 key={index}
//                 className="relative group"
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//               >
//                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-2xl shadow-lg transform group-hover:-rotate-1 transition duration-300"></div>
//                 <div className="relative bg-white rounded-2xl p-6 shadow-md border border-gray-100 transform group-hover:-translate-y-2 transition duration-300 h-full">
//                   <div className="relative mx-auto -mt-14 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
//                     <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-pink-100 flex items-center justify-center text-indigo-600 text-3xl font-bold">
//                       {speaker.charAt(0)}
//                     </div>
//                   </div>
//                   <div className="text-center mt-4">
//                     <h3 className="text-xl font-bold text-gray-800">{speaker}</h3>
//                     <p className="text-indigo-600 font-medium">Speaker</p>
//                     <p className="text-gray-500 mt-3">Expert in their field with years of experience...</p>
//                     <div className="mt-4 flex justify-center gap-3">
//                       <a href="#" className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition">
//                         <FaTwitter />
//                       </a>
//                       <a href="#" className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition">
//                         <FaLinkedin />
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       )}

//       {/* Gallery Section */}
//       {event.gallery?.length > 0 && (
//         <motion.div 
//           className="mb-20"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//         >
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">
//               Event Gallery
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Visual memories from our previous events
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {event.gallery.map((img, idx) => (
//               <motion.div
//                 key={idx}
//                 className="group relative overflow-hidden rounded-2xl shadow-lg"
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5, delay: idx * 0.1 }}
//                 viewport={{ once: true }}
//               >
//                 <img
//                   src={`${DIR.EVENT_GALLERY_IMAGE}${img}`}
//                   alt={`Event gallery ${idx + 1}`}
//                   className="w-full h-80 object-cover group-hover:scale-105 transition duration-500"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-6">
//                   <div>
//                     <h3 className="text-white font-bold text-xl">Memory #{idx + 1}</h3>
//                     <p className="text-white/80">From our previous event</p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       )}

//       {/* Sponsors Section */}
//       {event.sponsors?.length > 0 && (
//         <motion.div 
//           className="mb-20"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//         >
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">
//               Our Sponsors
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               We appreciate the support of these amazing organizations
//             </p>
//           </div>

//           <div className="bg-gradient-to-br from-indigo-50 to-pink-50 rounded-3xl p-12 border border-indigo-100">
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
//               {event.sponsors.map((sponsor, i) => (
//                 <motion.div
//                   key={i}
//                   className="bg-white rounded-xl p-6 flex items-center justify-center h-32 shadow-sm hover:shadow-lg transition-all border border-gray-100 hover:border-indigo-300"
//                   whileHover={{ y: -5 }}
//                 >
//                   {sponsor.logo ? (
//                     <img
//                       src={sponsor.logo}
//                       alt={sponsor.name || sponsor}
//                       className="max-h-16 max-w-full object-contain"
//                     />
//                   ) : (
//                     <span className="text-xl font-bold text-center text-gray-700">
//                       {sponsor.name || sponsor}
//                     </span>
//                   )}
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* Final CTA */}
//       <motion.div 
//         className="relative rounded-3xl overflow-hidden"
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//         viewport={{ once: true }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-pink-500 opacity-90"></div>
//         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        
//         <div className="relative z-10 p-16 text-center">
//           <h2 className="text-4xl font-bold text-white mb-6">Ready to Join This Amazing Event?</h2>
//           <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
//             Don't miss this opportunity to learn, network, and grow with industry leaders.
//           </p>
//           <div className="flex flex-wrap justify-center gap-6">
//             {event.registrationLink && (
//               <motion.a
//                 href={event.registrationLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="px-12 py-5 bg-white text-indigo-600 rounded-xl font-bold shadow-xl hover:shadow-white/40 transition-all duration-300 hover:-translate-y-1 text-lg"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <span className="relative z-10 flex items-center gap-3">
//                   <FaTicketAlt size={20} /> Register Now
//                 </span>
//               </motion.a>
//             )}
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Link
//                 to="/contact"
//                 className="px-12 py-5 bg-transparent rounded-xl font-bold text-white border-2 border-white hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 text-lg flex items-center gap-3"
//               >
//                 <FaEnvelope size={18} /> Contact Organizers
//               </Link>
//             </motion.div>
//           </div>
//         </div>
//       </motion.div>
//     </div>

//     {/* Footer */}
//     <footer className="relative bg-gray-900 text-white py-16 z-10">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
//           <div>
//             <h3 className="text-xl font-bold mb-6">Event Name</h3>
//             <p className="text-gray-400">
//               Creating unforgettable experiences through innovative events and conferences.
//             </p>
//           </div>
//           <div>
//             <h3 className="text-xl font-bold mb-6">Quick Links</h3>
//             <ul className="space-y-3">
//               <li><a href="#" className="text-gray-400 hover:text-white transition">Home</a></li>
//               <li><a href="#" className="text-gray-400 hover:text-white transition">Events</a></li>
//               <li><a href="#" className="text-gray-400 hover:text-white transition">Speakers</a></li>
//               <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-xl font-bold mb-6">Contact</h3>
//             <ul className="space-y-3 text-gray-400">
//               <li className="flex items-center gap-2"><FaMapMarkerAlt /> 123 Event St, City</li>
//               <li className="flex items-center gap-2"><FaPhone /> (123) 456-7890</li>
//               <li className="flex items-center gap-2"><FaEnvelope /> info@eventname.com</li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-xl font-bold mb-6">Follow Us</h3>
//             <div className="flex gap-4">
//               <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition">
//                 <FaFacebook />
//               </a>
//               <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition">
//                 <FaTwitter />
//               </a>
//               <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition">
//                 <FaInstagram />
//               </a>
//               <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition">
//                 <FaLinkedin />
//               </a>
//             </div>
//           </div>
//         </div>
//         <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
//           <p>© {new Date().getFullYear()} Event Name. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>

//     {/* Custom Animations */}
//     <style jsx global>{`
//       @keyframes float {
//         0%, 100% { transform: translateY(0) translateX(0); }
//         50% { transform: translateY(-20px) translateX(10px); }
//       }
//       @keyframes gradient-x {
//         0% { background-position: 0% 50%; }
//         50% { background-position: 100% 50%; }
//         100% { background-position: 0% 50%; }
//       }
//       .animate-gradient-x {
//         background-size: 200% 200%;
//         animation: gradient-x 8s ease infinite;
//       }
//     `}</style>
//   </div>
// );


};

export default EventDetailsPage;

// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { api } from "../../apiUtils/instance";
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaTwitter,
//   FaLinkedinIn,
//   FaClock,
//   FaMapMarkerAlt,
//   FaGlobe,
//   FaUsers,
//   FaCertificate,
// } from "react-icons/fa";
// import { DIR } from "../../config";

// const EventDetailsPage = () => {
//   const { eventId } = useParams();
//   const [event, setEvent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const socialIconsMap = {
//     facebook: FaFacebookF,
//     instagram: FaInstagram,
//     twitter: FaTwitter,
//     linkedin: FaLinkedinIn,
//   };

//   const formatDate = (d) =>
//     new Date(d).toLocaleDateString(undefined, {
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//     });

//   useEffect(() => {
//     const fetchEventDetails = async () => {
//       try {
//         setLoading(true);
//         const res = await api.get(`/event/${eventId}`);
//         setEvent(res.data.data);
//       } catch {
//         setError("Unable to load event.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEventDetails();
//   }, [eventId]);

//   if (loading)
//     return <div className="flex justify-center items-center min-h-screen text-gray-400">Loading...</div>;
//   if (error || !event)
//     return <div className="flex justify-center items-center min-h-screen text-red-500">{error || "No event found."}</div>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#53b8ec] via-[#485dac] to-[#e9577c] text-white font-sans">
//       {/* Hero */}
//       <section
//         className="relative h-[420px] bg-cover bg-center flex flex-col justify-center items-center text-center px-6"
//         style={{
//           backgroundImage: `url(${event.bannerImage ? DIR.EVENT_BANNER + event.bannerImage : ""})`,
//         }}>
//         <div className="absolute inset-0 bg-black bg-opacity-50"></div>
//         <h1 className="relative text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-[#53b8ec] via-[#485dac] to-[#e9577c] bg-clip-text text-transparent animate-gradient-x max-w-4xl">
//           {event.title}
//         </h1>
//         <p className="relative mt-3 max-w-3xl text-lg md:text-xl opacity-90">{event.description}</p>
//         <div className="relative flex justify-center space-x-6 mt-6 text-black">
//           {Object.entries(event.socialLinks || {}).map(([key, url]) => {
//             const Icon = socialIconsMap[key];
//             if (!Icon) return null;
//             return (
//               <a
//                 key={key}
//                 href={url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:text-[#e9577c] transition-colors text-2xl"
//               >
//                 <Icon />
//               </a>
//             );
//           })}
//         </div>
//         <Link
//           to="/book/event"
//           className="relative mt-8 inline-block bg-[#e9577c] hover:bg-[#d04d71] transition rounded-full px-10 py-4 font-bold text-white shadow-lg">
//           Back to Events
//         </Link>
//       </section>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
//         {/* Event Info */}
//         <section className="bg-white bg-opacity-10 rounded-xl p-8 shadow-lg border border-white/20">
//           <h2 className="text-3xl font-semibold mb-6 text-[#e9577c]">Event Details</h2>
//           <div className="space-y-4 text-white/90">
//             <div className="flex items-center gap-2">
//               <FaClock className="text-[#53b8ec]" />
//               <span>
//                 {formatDate(event.startDate)} — {formatDate(event.endDate)} | {event.startTime}–{event.endTime}
//               </span>
//             </div>
//             <div className="flex items-center gap-2">
//               <FaMapMarkerAlt className="text-[#53b8ec]" />
//               <span>{event.location}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <FaGlobe className="text-[#53b8ec]" />
//               <span>{event.mode}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <FaUsers className="text-[#53b8ec]" />
//               <span>
//                 {event.registeredCount}/{event.maxParticipants} Participants
//               </span>
//             </div>
//             <div className="flex items-center gap-2">
//               <FaCertificate className="text-[#53b8ec]" />
//               <span>Certificate: {event.certificateAvailable ? "Available" : "None"}</span>
//             </div>
//             <p>
//               <strong>Organizer:</strong> {event.organizer}
//             </p>
//             <p>
//               <strong>Status:</strong> {event.status}
//             </p>
//             {event.meetingLink && (
//               <p>
//                 <strong>Meeting Link:</strong>{" "}
//                 <a href={event.meetingLink} target="_blank" rel="noopener noreferrer" className="underline text-[#53b8ec] hover:text-[#e9577c]">
//                   Join Meeting
//                 </a>
//               </p>
//             )}
//             {event.registrationLink && (
//               <p>
//                 <strong>Registration:</strong>{" "}
//                 <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" className="underline text-[#53b8ec] hover:text-[#e9577c]">
//                   Register Now
//                 </a>
//               </p>
//             )}
//             {event.feedbackFormLink && event.feedbackFormLink !== "true" && (
//               <p>
//                 <strong>Feedback:</strong>{" "}
//                 <a href={event.feedbackFormLink} target="_blank" rel="noopener noreferrer" className="underline text-[#53b8ec] hover:text-[#e9577c]">
//                   Provide Feedback
//                 </a>
//               </p>
//             )}
//             {event.tags?.length > 0 && (
//               <div>
//                 <strong>Tags:</strong>
//                 <div className="mt-2 flex flex-wrap gap-2">
//                   {event.tags.map((tag, i) => (
//                     <span key={i} className="bg-[#485dac] px-3 py-1 rounded-full text-sm">
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </section>

//         {/* Agenda & Gallery */}
//         <section className="md:col-span-2 space-y-10">
//           <div className="bg-white bg-opacity-10 rounded-xl p-8 shadow-lg border border-white/20">
//             <h2 className="text-3xl font-semibold mb-6 text-[#e9577c]">Agenda</h2>
//             <ol className="relative border-l-2 border-[#e9577c] pl-4 space-y-6">
//               {event.agenda.map(({ _id, time, activity }) => (
//                 <li key={_id} className="relative pl-4">
//                   <span className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 bg-[#e9577c] rounded-full text-white text-sm">
//                     {time}
//                   </span>
//                   <p className="ml-10 text-lg">{activity}</p>
//                 </li>
//               ))}
//             </ol>
//           </div>

//           {event.gallery?.length > 0 && (
//             <div className="bg-white bg-opacity-10 rounded-xl p-8 shadow-lg border border-white/20">
//               <h2 className="text-3xl font-semibold mb-6 text-[#e9577c]">Gallery</h2>
//               <div className="flex overflow-x-auto gap-4 scrollbar-thumb-[#53b8ec] scrollbar-track-transparent scrollbar-thin p-2">
//                 {event.gallery.map((img, idx) => (
//                   <img
//                     key={idx}
//                     src={`${DIR.EVENT_GALLERY_IMAGE}${img}`}
//                     alt={`Gallery ${idx + 1}`}
//                     className="max-h-48 rounded-lg object-cover hover:scale-105 transform transition"
//                   />
//                 ))}
//               </div>
//             </div>
//           )}

//           {event.sponsors?.length > 0 && (
//             <div className="bg-white bg-opacity-10 rounded-xl p-6 shadow-lg border border-white/20 text-center">
//               <h3 className="text-2xl font-semibold mb-4 text-[#e9577c]">Sponsors</h3>
//               <div className="flex justify-center flex-wrap gap-4">
//                 {event.sponsors.map((sponsor, idx) => (
//                   <span key={idx} className="bg-[#53b8ec] px-4 py-2 rounded-full text-[#485dac] font-bold">
//                     {sponsor}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}

//           {event.resources?.length > 0 && (
//             <div className="bg-white bg-opacity-10 rounded-xl p-6 shadow-lg border border-white/20">
//               <h3 className="text-2xl font-semibold mb-4 text-[#e9577c]">Resources</h3>
//               <ul className="list-disc list-inside space-y-2 text-[#53b8ec] hover:text-[#e9577c]">
//                 {event.resources.map((url, idx) => (
//                   <li key={idx}>
//                     <a href={url} target="_blank" rel="noopener noreferrer" className="underline">
//                       {url}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </section>
//       </main>

//       <style>
//         {`
//           @keyframes gradient-x {
//             0% { background-position: 0% 50%; }
//             50% { background-position: 100% 50%; }
//             100% { background-position: 0% 50%; }
//           }
//           .animate-gradient-x {
//             background-size: 200% 200%;
//             animation: gradient-x 8s ease infinite;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default EventDetailsPage;
