import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import { DIR } from "../../config";
import Mentor from "../mentors/Mentor";
import { Button } from "../utility/Button";
import { getAllMentors } from "./mentorApi";

/**
 * Mentors Component
 * 
 * Fetches and displays a list of mentors in a grid layout.
 ===================================================================
 * Provides a call-to-action button to navigate to the full mentors page.
 */

export default function Mentors() {
  const [mentorsList, setMentorsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Effect used to fetch mentors data once on component mount
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        const data = await getAllMentors();
        setMentorsList(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  return (
    <section className="relative py-20 bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] overflow-hidden">
      {/* Decorative blurred shapes for visual interest */}
      <div className="absolute top-0 right-10 w-72 h-72 bg-codedrift-indigo opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-codedrift-pink opacity-10 rounded-full blur-3xl"></div>

      <div className="container">
        <div className="relative z-10 text-center">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 inline-block relative">
            Meet Your Mentors
            <span className="absolute left-1/2 -bottom-2 w-2/3 h-1 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-full transform -translate-x-1/2"></span>
          </h2>

          {/* Subheading / description */}
          <p className="text-gray-600 mb-16 max-w-2xl mx-auto">
            Learn from experienced professionals who bring real-world expertise
            into every session.
          </p>

          {/* Mentor Grid */}
          {loading ? (
            <p className="text-gray-500">Loading mentors...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {/* Only display top 3 mentors for preview */}
              {mentorsList.slice(0, 3).map((mentor) => (
                <Mentor
                  key={mentor._id}
                  mentor={{
                    img: `${DIR.TRAINER_PROFILE_PHOTO}${
                      mentor.profilePhotoTrainer || "default-avatar.png"
                    }`,
                    name: mentor.fullName,
                    title: mentor.highestQualification,
                    bio: mentor.summary,
                    linkedin: mentor.linkedin || "#",
                    id: mentor._id,
                    link: `mentors/m/${mentor._id}`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Show Experts Button */}
          <div className="mt-12 text-center">
            <Button
              as="link"
              to="/mentors"
              variant="indigo"
              size="md"
              className="gap-2"
            >
              <Users className="w-5 h-5" />
              Show Experts
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
