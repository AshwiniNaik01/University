// // src/pages/WebinarDetailsPage.jsx
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { fetchWebinarById } from "./events";
// // import { fetchWebinarById } from "../../api/webinars";

// const WebinarDetailsPage = () => {
//   const { webinarId } = useParams();
//   const [webinar, setWebinar] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadWebinar = async () => {
//       try {
//         setLoading(true);
//         const res = await fetchWebinarById(webinarId);
//         if (res.success) {
//           setWebinar(res.data);
//         } else {
//           setError(res.message || "Failed to fetch webinar.");
//         }
//       } catch (err) {
//         console.error(err);
//         setError("An error occurred. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadWebinar();
//   }, [webinarId]);

//   if (loading) return <p className="text-center">Loading webinar details...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;
//   if (!webinar) return <p className="text-center">No webinar found.</p>;

//   return (
//     <section className="max-w-3xl mx-auto py-12">
//       <h1 className="text-4xl font-bold mb-4">{webinar.title}</h1>
//       <p className="text-gray-700 mb-4">{webinar.description}</p>
//       <div className="space-y-3 text-gray-600">
//         <p><strong>Date:</strong> {new Date(webinar.date).toLocaleDateString()}</p>
//         <p><strong>Time:</strong> {webinar.startTime} – {webinar.endTime}</p>
//         <p><strong>Speaker:</strong> {webinar.speakerName}</p>
//         <p><strong>Platform:</strong> {webinar.platform}</p>
//         {webinar.meetingLink && (
//           <p>
//             <a href={webinar.meetingLink} target="_blank" rel="noopener noreferrer"
//                className="text-blue-600 hover:underline">
//               Join Meeting
//             </a>
//           </p>
//         )}
//         {webinar.registrationRequired && (
//           <p className="text-red-600 font-semibold">
//             Registration Required
//           </p>
//         )}
//         <p><strong>Tags:</strong> {webinar.tags.join(", ")}</p>
//       </div>
//     </section>
//   );
// };

// export default WebinarDetailsPage;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchWebinarById } from "./events"; // Adjust path as needed
import { DIR } from "../../config";

const WebinarDetailsPage = () => {
  const { webinarId } = useParams();
  const [webinar, setWebinar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPasscode, setShowPasscode] = useState(false);
  const [now, setNow] = useState(Date.now());

  // Update clock every second for countdown
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  let startTimestamp = 0;
  let remaining = 0;

  if (webinar?.date) {
    startTimestamp = new Date(webinar.date).getTime();
    remaining = startTimestamp - now;
  }
  const formatCountdown = (ms) => {
    if (ms <= 0) return "00:00:00";
    const totalSec = Math.floor(ms / 1000);
    const hrs = String(Math.floor(totalSec / 3600)).padStart(2, "0");
    const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
    const secs = String(totalSec % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  useEffect(() => {
    const loadWebinar = async () => {
      try {
        setLoading(true);
        const res = await fetchWebinarById(webinarId);
        if (res.success) {
          setWebinar(res.data);
        } else {
          setError(res.message || "Failed to fetch webinar.");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadWebinar();
  }, [webinarId]);

  if (loading)
    return (
      <p className="text-center py-12 text-gray-500">
        Loading webinar details...
      </p>
    );
  if (error) return <p className="text-center py-12 text-red-500">{error}</p>;
  if (!webinar) return <p className="text-center py-12">No webinar found.</p>;

  //   return (
  //     <section className="max-w-5xl mx-auto py-16 px-4 md:px-6">
  //       <div className="bg-white rounded-xl shadow-md p-8 md:p-12">
  //         <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-800">{webinar.title}</h1>
  //         <p className="text-gray-600 text-lg mb-8">{webinar.description}</p>

  //         <div className="grid md:grid-cols-2 gap-10">
  //           {/* Speaker Section */}
  //           <div>
  //             <h2 className="text-xl font-semibold mb-4 text-gray-700">Speaker</h2>
  //             <div className="flex items-start gap-4">
  //               {/* {webinar.speakerPhoto ? (
  //                 <img
  //                   src={webinar.speakerPhoto}
  //                   alt={webinar.speakerName}
  //                   className="w-20 h-20 rounded-full object-cover"
  //                 />
  //               ) : (
  //                 <div className="w-20 h-20 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-2xl">
  //                   {webinar.speakerName?.charAt(0)}
  //                 </div>
  //               )} */}

  //               {webinar.speakerPhoto ? (
  //   <img
  //     src={`${DIR.WEBINAR_SPEAKER_PHOTO}${webinar.speakerPhoto}`}
  //     alt={webinar.speakerName}
  //     className="w-20 h-20 rounded-full object-cover"
  //   />
  // ) : (
  //   <div className="w-20 h-20 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-2xl">
  //     {webinar.speakerName?.charAt(0)}
  //   </div>
  // )}
  //               <div>
  //                 <p className="font-semibold text-gray-800">{webinar.speakerName}</p>
  //                 <p className="text-sm text-gray-600">{webinar.speakerBio}</p>
  //               </div>
  //             </div>
  //           </div>

  //           {/* Details Section */}
  //           <div>
  //             <h2 className="text-xl font-semibold mb-4 text-gray-700">Details</h2>
  //             <ul className="space-y-2 text-gray-700 text-sm">
  //               <li><strong>Date:</strong> {new Date(webinar.date).toLocaleDateString()}</li>
  //               <li><strong>Time:</strong> {webinar.startTime} – {webinar.endTime}</li>
  //               <li><strong>Platform:</strong> {webinar.platform}</li>
  //               {webinar.meetingLink && (
  //                 <li>
  //                   <strong>Meeting Link:</strong>{" "}
  //                   <a
  //                     href={webinar.meetingLink}
  //                     target="_blank"
  //                     rel="noopener noreferrer"
  //                     className="text-blue-600 hover:underline"
  //                   >
  //                     Join Webinar
  //                   </a>
  //                 </li>
  //               )}
  //               {webinar.meetingId && (
  //                 <li><strong>Meeting ID:</strong> {webinar.meetingId}</li>
  //               )}
  //               {webinar.passcode && (
  //                 <li><strong>Passcode:</strong> {webinar.passcode}</li>
  //               )}
  //               {webinar.maxParticipants && (
  //                 <li><strong>Max Participants:</strong> {webinar.maxParticipants}</li>
  //               )}
  //               <li>
  //                 <strong>Status:</strong>{" "}
  //                 <span className={`capitalize font-semibold ${webinar.status === "ongoing"
  //                     ? "text-green-600"
  //                     : webinar.status === "upcoming"
  //                       ? "text-yellow-600"
  //                       : "text-gray-500"
  //                   }`}>
  //                   {webinar.status}
  //                 </span>
  //               </li>
  //               {webinar.registrationRequired && (
  //                 <li className="text-red-600 font-semibold">
  //                   Registration Required
  //                 </li>
  //               )}
  //               <li><strong>Tags:</strong> {webinar.tags.join(", ")}</li>
  //             </ul>
  //           </div>
  //         </div>
  //       </div>
  //     </section>
  //   );

  //  return (
  //     <section className="max-w-6xl mx-auto py-16 px-4 md:px-6 bg-gradient-to-b from-pink-50 via-white to-white min-h-screen">
  //       <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-16 border border-pink-100">
  //         {/* Title & Description */}
  //         <h1 className="text-4xl font-extrabold mb-4 text-center text-codedrift-pink">{webinar.title}</h1>
  //         <p className="text-gray-600 text-lg mb-10 text-center max-w-3xl mx-auto">{webinar.description}</p>

  //         {/* Speaker & Details */}
  //         <div className="grid md:grid-cols-2 gap-12 items-start">
  //           {/* 🎙️ Speaker Section */}
  //           <div>
  //             <h2 className="text-2xl font-semibold mb-4 text-gray-800">🎙️ Speaker</h2>
  //             <div className="flex items-start gap-5">
  //               {webinar.speakerPhoto ? (
  //                 <img
  //                   src={`${DIR.WEBINAR_SPEAKER_PHOTO}${webinar.speakerPhoto}`}
  //                   alt={webinar.speakerName}
  //                   className="w-24 h-24 rounded-full object-cover shadow-md"
  //                 />
  //               ) : (
  //                 <div className="w-24 h-24 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-3xl shadow-md">
  //                   {webinar.speakerName?.charAt(0)}
  //                 </div>
  //               )}
  //               <div>
  //                 <p className="font-bold text-gray-900 text-lg">{webinar.speakerName}</p>
  //                 <p className="text-sm text-gray-600">{webinar.speakerBio}</p>
  //               </div>
  //             </div>
  //           </div>

  //           {/* 📝 Details Section */}
  //           <div>
  //             <h2 className="text-2xl font-semibold mb-4 text-gray-800">📝 Details</h2>
  //             <ul className="space-y-3 text-gray-700 text-sm leading-relaxed">
  //               <li><strong>Date:</strong> {new Date(webinar.date).toLocaleDateString()}</li>
  //               <li><strong>Time:</strong> {webinar.startTime} – {webinar.endTime}</li>
  //               <li><strong>Platform:</strong> {webinar.platform}</li>

  //               {webinar.meetingLink && (
  //                 <li>
  //                   <strong>Meeting Link:</strong>{" "}
  //                   <a
  //                     href={webinar.meetingLink}
  //                     target="_blank"
  //                     rel="noopener noreferrer"
  //                     className="text-blue-600 hover:underline"
  //                   >
  //                     Join Webinar
  //                   </a>
  //                 </li>
  //               )}

  //               {webinar.meetingId && (
  //                 <li><strong>Meeting ID:</strong> {webinar.meetingId}</li>
  //               )}

  //               {/* 🔒 Scratch Card Passcode */}
  //               {webinar.passcode && (
  //                 <li>
  //                   <strong>Passcode:</strong>
  //                   <div className="mt-2">
  //                     {!showPasscode ? (
  //                       <button
  //                         onClick={() => setShowPasscode(true)}
  //                         className="bg-gray-300 text-gray-600 px-4 py-2 rounded-md shadow-inner cursor-pointer hover:bg-gray-400 transition duration-200"
  //                       >
  //                         🎁 Click to Reveal
  //                       </button>
  //                     ) : (
  //                       <span className="ml-2 inline-block bg-green-100 text-green-700 px-3 py-1 rounded-md font-mono font-bold shadow">
  //                         {webinar.passcode}
  //                       </span>
  //                     )}
  //                   </div>
  //                 </li>
  //               )}

  //               {webinar.maxParticipants && (
  //                 <li><strong>Max Participants:</strong> {webinar.maxParticipants}</li>
  //               )}

  //               <li>
  //                 <strong>Status:</strong>{" "}
  //                 <span className={`capitalize font-semibold ${
  //                   webinar.status === "ongoing"
  //                     ? "text-green-600"
  //                     : webinar.status === "upcoming"
  //                     ? "text-yellow-600"
  //                     : "text-gray-500"
  //                 }`}>
  //                   {webinar.status}
  //                 </span>
  //               </li>

  //               {webinar.registrationRequired && (
  //                 <li className="text-red-600 font-semibold">
  //                   🚨 Registration Required
  //                 </li>
  //               )}

  //               <li><strong>Tags:</strong> {webinar.tags.join(", ")}</li>
  //             </ul>
  //           </div>
  //         </div>
  //       </div>
  //     </section>
  //   );

  return (
    <section className="relative z-0 min-h-screen bg-gradient-to-br from-[#1e293b] via-[#2d3748] to-[#475569]  text-white font-sans overflow-hidden py-16 px-4">
      {/* Cosmic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-300 rounded-full mix-blend-soft-light opacity-10 blur-3xl animate-[pulse_15s_infinite]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80  bg-yellow-300 rounded-full mix-blend-soft-light opacity-10 blur-3xl animate-[pulse_20s_infinite]"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-pink-400 rounded-full mix-blend-soft-light opacity-10 blur-3xl animate-[pulse_12s_infinite]"></div>

        {/* Grid Texture */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Main Card - Metallic Glass Effect */}
      <div className="relative mx-auto max-w-4xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-gray-600/30 rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] p-10 md:p-16 z-10 overflow-hidden">
        {/* Neon Accent Border */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0 border-2 border-transparent rounded-3xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(137,207,240,0.5), rgba(199,128,232,0.4))",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: "2px",
            }}
          ></div>
        </div>

        {/* Status Badge */}
        <div className="flex justify-center mb-8">
          <span
            className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${
              webinar.status === "ongoing"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : webinar.status === "upcoming"
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                : "bg-gray-600/20 text-gray-400 border border-gray-600/30"
            }`}
          >
            {webinar.status === "ongoing" ? (
              <>
                <span className="w-2 h-2 mr-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </>
            ) : null}
            {webinar.status === "ongoing"
              ? "Live Session"
              : webinar.status === "upcoming"
              ? "Coming Soon"
              : "Session Ended"}
          </span>
        </div>

        {/* Title & Description */}
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              {webinar.title}
            </span>
          </h1>
          <p className="text-gray-300/90 text-lg max-w-3xl mx-auto leading-relaxed">
            {webinar.description}
          </p>
        </div>

        {/* Countdown / Join Button */}
        {/* {webinar.status !== "completed" && (
      <div className="text-center mb-12">
        {webinar.status === "upcoming" ? (
          <div className="inline-flex items-center bg-gray-700/50 border border-gray-600/30 px-6 py-3 rounded-full">
            <svg className="w-5 h-5 mr-2 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="font-medium">
              Starts in: <span className="text-amber-300 font-bold">{formatCountdown(remaining)}</span>
            </span>
          </div>
        ) : (
          <button className="relative overflow-hidden group px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-emerald-500/30">
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              Join Webinar Now
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        )}
      </div>
    )} */}

        {webinar.status !== "completed" && (
          <div className="text-center mb-12">
            {webinar.status === "upcoming" ? (
              // ✅ Upcoming Webinar (Countdown)
              <div className="inline-flex items-center bg-gray-700/50 border border-gray-600/30 px-6 py-3 rounded-full">
                <svg
                  className="w-5 h-5 mr-2 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="font-medium">
                  Starts in:{" "}
                  <span className="text-amber-300 font-bold">
                    {formatCountdown(remaining)}
                  </span>
                </span>
              </div>
            ) : webinar.status === "ongoing" ? (
              // ✅ Live Webinar (Join button)
              <button className="relative overflow-hidden group px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-emerald-500/30">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    ></path>
                  </svg>
                  Join Webinar Now
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            ) : (
              // ✅ Past Webinar (Ended message)
              <div className="inline-flex items-center bg-gradient-to-r from-slate-700/50 to-slate-800/50 border border-gray-600/30 px-6 py-3 rounded-full text-gray-300 shadow-md">
                <svg
                  className="w-5 h-5 mr-2 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium">This webinar has ended</span>
              </div>
            )}
          </div>
        )}

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Speaker Card */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
              <h2 className="text-xl font-bold">Featured Presenter</h2>
            </div>

            <div className="flex items-center gap-5">
              {webinar.speakerPhoto ? (
                <div className="relative">
                  <img
                    src={`${DIR.WEBINAR_SPEAKER_PHOTO}${webinar.speakerPhoto}`}
                    alt={webinar.speakerName}
                    className="w-30 h-20 rounded-xl object-cover border-2 border-gray-600/50 shadow-md"
                  />
                  <div className="absolute inset-0 rounded-xl border-2 border-emerald-400/30 pointer-events-none"></div>
                </div>
              ) : (
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-3xl font-bold text-white">
                  {webinar.speakerName?.charAt(0)}
                </div>
              )}
              <div>
                <h3 className="text-lg font-bold text-white">
                  {webinar.speakerName}
                </h3>
                <p className="text-gray-300 text-sm mt-1">
                  {webinar.speakerBio}
                </p>
                <div className="mt-3 flex gap-2">
                  <span className="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-300 rounded-full">
                    Expert
                  </span>
                  <span className="text-xs px-2 py-1 bg-cyan-500/10 text-cyan-300 rounded-full">
                    Speaker
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Card */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
              <h2 className="text-xl font-bold">Event Details</h2>
            </div>

            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  Date & Time
                </div>
                <p className="text-white font-medium">
                  {new Date(webinar.date).toLocaleDateString(undefined, {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                  <br />
                  {webinar.startTime} – {webinar.endTime}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                  Platform & Access
                </div>
                <p className="text-white font-medium">{webinar.platform}</p>
                {webinar.meetingLink && (
                  <a
                    href={webinar.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      ></path>
                    </svg>
                    Access Webinar Link
                  </a>
                )}
              </div>

              {webinar.meetingId && (
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                      ></path>
                    </svg>
                    Meeting ID
                  </div>
                  <p className="font-mono text-white">{webinar.meetingId}</p>
                </div>
              )}

              {webinar.maxParticipants && (
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      ></path>
                    </svg>
                    Capacity
                  </div>
                  <p className="text-white font-medium">
                    {webinar.maxParticipants} attendees
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Passcode Section */}
        {webinar.passcode && (
          <div className="mt-10 text-center">
            {!showPasscode ? (
              <button
                onClick={() => setShowPasscode(true)}
                className="relative overflow-hidden group px-6 py-3 bg-gray-700/50 hover:bg-gray-700/70 border border-gray-600/50 rounded-full font-medium transition-all duration-300"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5 text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    ></path>
                  </svg>
                  Reveal Access Code
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            ) : (
              <div className="inline-block relative">
                <div className="px-6 py-3 bg-gray-800/70 border border-emerald-400/30 rounded-xl text-lg font-mono tracking-wider backdrop-blur-sm">
                  {webinar.passcode}
                </div>
                <div className="absolute inset-0 rounded-xl border border-emerald-400/20 pointer-events-none animate-pulse"></div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: `${Math.random() * 5 + 1}px`,
              height: `${Math.random() * 5 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 20 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default WebinarDetailsPage;
