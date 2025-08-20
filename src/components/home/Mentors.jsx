import { useState, useEffect } from "react";
import { getAllMentors } from "./mentorApi";
import Mentor from "../mentors/Mentor";
import { DIR } from "../../config";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import { Button } from "../utility/Button"; // ✅ Adjust path if needed

export default function Mentors() {
  const [mentorsList, setMentorsList] = useState([]);
  const [loading, setLoading] = useState(true);

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
      {/* Decorative blurred shapes */}
      <div className="absolute top-0 right-10 w-72 h-72 bg-codedrift-indigo opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-codedrift-pink opacity-10 rounded-full blur-3xl"></div>

      <div className="container">
        <div className="relative z-10 text-center">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 inline-block relative">
            Meet Your Mentors
            <span className="absolute left-1/2 -bottom-2 w-2/3 h-1 bg-codedrift-gradient rounded-full transform -translate-x-1/2"></span>
          </h2>

          {/* Subheading */}
          <p className="text-gray-600 mb-16 max-w-2xl mx-auto">
            Learn from experienced professionals who bring real-world expertise
            into every session.
          </p>

          {/* Mentor Grid */}
          {loading ? (
            <p className="text-gray-500">Loading mentors...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {mentorsList.slice(0, 3).map((mentor) => (
                <Link to={`mentors/m/${mentor._id}`} key={mentor._id}>
                  <Mentor
                    mentor={{
                      img: `${DIR.TRAINER_PROFILE_PHOTO}${
                        mentor.profilePhotoTrainer || "default-avatar.png"
                      }`,
                      name: mentor.fullName,
                      title: mentor.highestQualification,
                      bio: mentor.summary,
                      linkedin: mentor.linkedin || "#",
                      id: mentor._id,
                    }}
                  />
                </Link>
              ))}
            </div>
          )}

          {/* Show Experts Button */}
          <div className="mt-12 text-center">
            {/* <Button as={Link} to="/mentors" variant="indigo" size="md" className="gap-2">
              <Users className="w-5 h-5" />
              Show Experts
            </Button> */}

            {/* <Link to="/mentors" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition">
  <Users className="w-5 h-5" />
  Show Experts
</Link> */}

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
