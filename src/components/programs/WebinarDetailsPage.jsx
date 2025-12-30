import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DIR } from "../../config";
import { fetchWebinarById } from "./events";

/**
 * WebinarDetailsPage Component
 * ---------------------------
 * Fetches and displays detailed information about a specific webinar,
 * including countdown timers, speaker info, event details, and access codes.
 */

const WebinarDetailsPage = () => {
  const { webinarId } = useParams(); // Extract webinarId param from URL
  const [webinar, setWebinar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPasscode, setShowPasscode] = useState(false);
  const [now, setNow] = useState(Date.now());

  // Update clock every second for countdown. This drives the live countdown display.
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // Calculate webinar start time and remaining time until start (in ms)
  let startTimestamp = 0;
  let remaining = 0;

  if (webinar?.date) {
    startTimestamp = new Date(webinar.date).getTime();
    remaining = startTimestamp - now;
  }

  //  Formats a countdown duration (milliseconds) into "HH:MM:SS"
  const formatCountdown = (ms) => {
    if (ms <= 0) return "00:00:00";
    const totalSec = Math.floor(ms / 1000);
    const hrs = String(Math.floor(totalSec / 3600)).padStart(2, "0");
    const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
    const secs = String(totalSec % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  // Fetch webinar details on mount or when webinarId changes
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

  // Render loading, error, or empty states early
  if (loading)
    return (
      <p className="text-center py-12 text-gray-500">
        Loading webinar details...
      </p>
    );
  if (error) return <p className="text-center py-12 text-red-500">{error}</p>;
  if (!webinar) return <p className="text-center py-12">No webinar found.</p>;

  return (
    <section className="relative z-0 min-h-screen bg-gradient-to-br from-[#1e293b] via-[#2d3748] to-[#475569]  text-white font-sans overflow-hidden py-16 px-4">
      {/* Background Effects */}
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

        {/* Webinar Status Badge */}
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

        {webinar.status !== "completed" && (
          <div className="text-center mb-12">
            {webinar.status === "upcoming" ? (
              // ✅ Upcoming Webinar (Countdown)
              <div className="inline-flex items-center bg-gray-700/50 border border-gray-600/30 px-6 py-3 rounded-full">
                <span className="text-amber-400 text-sm mr-2">🕒</span>
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
                  <span className="text-gray-300 text-sm w-5 h-5 mr-2 flex items-center justify-center">
                    📹
                  </span>
                  Join Webinar Now
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            ) : (
              // ✅ Past Webinar (Ended message)
              <div className="inline-flex items-center bg-gradient-to-r from-slate-700/50 to-slate-800/50 border border-gray-600/30 px-6 py-3 rounded-full text-gray-300 shadow-md">
                <span className="text-indigo-400 text-sm mr-2">⏰</span>
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
                  <span className="text-sm w-4 h-4 mr-1 inline-flex items-center justify-center">
                    📅
                  </span>
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
                  <span className="text-sm w-4 h-4 mr-1 inline-flex items-center justify-center">
                    🎓
                  </span>
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
                    <span className="text-sm w-4 h-4 mr-1 inline-flex items-center justify-center">
                      🔗
                    </span>
                    Access Webinar Link
                  </a>
                )}
              </div>

              {webinar.meetingId && (
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                    <span className="text-sm w-4 h-4 mr-1 inline-flex items-center justify-center">
                      🎫
                    </span>
                    Meeting ID
                  </div>
                  <p className="font-mono text-white">{webinar.meetingId}</p>
                </div>
              )}

              {webinar.maxParticipants && (
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                    <span className="text-sm w-4 h-4 mr-1 inline-flex items-center justify-center">
                      👥
                    </span>
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
                  <span className="text-emerald-400 text-lg mr-2 inline-flex items-center justify-center">
                    🔒
                  </span>
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
