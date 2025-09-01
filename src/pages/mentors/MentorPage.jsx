import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Linkedin, Mail, Phone, Star } from "lucide-react";
import Image from "../../components/utility/Image";
import { api } from "../../apiUtils/instance";
import { DIR } from "../../config";
import { MentorSkeleton } from "./MentorSkeleton";

const MentorPage = () => {
    const { mentorId } = useParams();
    const [mentor, setMentor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

  useEffect(() => {
        const fetchMentor = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/trainer/${mentorId}`);
                const data = res.data.data;

                const mappedMentor = {
                    id: data._id,
                    name: data.fullName,
                    title: data.title,
                    photo: `${DIR.TRAINER_PROFILE_PHOTO}${data.profilePhotoTrainer}`,
                    linkedin: data.linkedinProfile?.trim() || "#",
                    email: data.email,
                    phone: data.mobileNo,
                    rating: 4.9,
                    reviews: 352,
                    summary: data.summary,
                    certifications: data.certifications || [],
                    achievements: data.achievements || [],
                    courses: data.courses.map((c) => c.title) || [],
                    testimonials: []
                };

                setMentor(mappedMentor);
                setError("");
            } catch (err) {
                console.error(err);
                setError("Failed to fetch mentor data.");
            } finally {
                setLoading(false);
            }
        };

        if (mentorId) {
            fetchMentor();
        }
    }, [mentorId]);


 return (
    <section className="py-20 bg-gradient-to-b from-[#f9fafb] to-[#eef1f5]">
      <div className="container max-w-6xl mx-auto px-4">
        {loading ? (
          <MentorSkeleton />
        ) : mentor ? (
          <>
            <div className="bg-white shadow-2xl rounded-3xl p-10 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
              <div className="text-center md:text-left flex flex-col items-center md:items-start">
                <Image
                  src={mentor.photo}
                  alt={mentor.name}
                  className="rounded-3xl border-4 border-codedrift-indigo w-44 h-44 object-cover mb-4 shadow-md"
                  width={176}
                  height={176}
                />
                <h2 className="text-3xl font-bold text-gray-800">{mentor.name}</h2>
                <p className="text-base text-gray-500 mt-1">{mentor.title}</p>

                <div className="flex gap-3 mt-4">
                  <a
                    href={mentor.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full bg-gradient-to-tr from-[#4cb7e5] to-[#ee4f7e] text-white hover:scale-110 transition"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href={`mailto:${mentor.email}`}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                  >
                    <Mail size={18} />
                  </a>
                  <a
                    href={`tel:${mentor.phone}`}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                  >
                    <Phone size={18} />
                  </a>
                </div>
              </div>

              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-[#ee4f7e] to-[#4cb7e5] text-transparent bg-clip-text mb-2">
                    Professional Summary
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{mentor.summary}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Certifications</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                      {mentor.certifications.map((cert, i) => (
                        <li key={i}>{cert}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Achievements</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                      {mentor.achievements.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center gap-1 pt-2">
                  {Array(Math.floor(mentor.rating))
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="text-yellow-500 drop-shadow-glow" size={20} />
                    ))}
                  <span className="ml-2 text-sm text-gray-500">
                    {mentor.rating}/5.0 Rating ({mentor.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Courses */}
            <div className="mt-20">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Courses at Code Drift</h3>
              {mentor.courses.length > 0 ? (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {mentor.courses.map((course, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition border-l-4 border-codedrift-pink"
                    >
                      <h4 className="font-semibold text-gray-800">{course}</h4>
                      <p className="text-xs text-gray-500 mt-1">Currently mentoring 50+ students</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No courses available yet.</p>
              )}
            </div>

            {/* Testimonials */}
            {mentor.testimonials.length > 0 && (
              <div className="mt-20">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Student Testimonials</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {mentor.testimonials.map((t, i) => (
                    <div
                      key={i}
                      className="bg-white p-6 rounded-xl border-l-4 border-codedrift-blue shadow-md"
                    >
                      <p className="text-gray-600 text-sm italic mb-3">“{t.message}”</p>
                      <p className="text-sm text-gray-800 font-semibold">
                        — {t.name}, {t.company}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500">Mentor not found.</p>
        )}
      </div>
    </section>
  );
};

export default MentorPage;
