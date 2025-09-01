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

      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center px-6 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${
              event.bannerImage
                ? DIR.EVENT_BANNER + event.bannerImage
                : "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            })`,
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
              <span>
                {formatDate(event.startDate)} • {event.startTime}
              </span>
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

         

          {/* Resources */}
      
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
                        {sponsor.name
                          ? sponsor.name.charAt(0)
                          : sponsor.charAt(0)}
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

};

export default EventDetailsPage;

