import { useEffect, useState } from "react";
import { getAllMentors } from "../../components/home/mentorApi";
import Mentor from "../../components/mentors/Mentor";
import { Button } from "../../components/utility/Button";
import { DIR } from "../../config";

/**
 * MentorsPage Component
 *
 * Displays a list of mentors fetched from the backend.
 */

const MentorsPage = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  //  Fetch mentor data from API on component mount
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const data = await getAllMentors();
        setMentors(data);
      } catch (err) {
        console.error("Failed to fetch mentors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="container">
        {/* Page Heading */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 inline-block relative">
            Our Mentors
            <span className="absolute left-1/2 -bottom-2 w-2/3 h-1 bg-codedrift-gradient rounded-full transform -translate-x-1/2"></span>
          </h2>
        </div>

        {/* Loading State */}
        {loading ? (
          <p className="text-center text-gray-500 mt-10">Loading mentors...</p>
        ) : (
          <div className="mt-4 md:mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentors.map((mentor, i) => (
              <Mentor
                key={mentor._id || i}
                mentor={{
                  name: mentor.fullName,
                  title: mentor.highestQualification,
                  bio: mentor.summary,
                  img: `${DIR.TRAINER_PROFILE_PHOTO}${
                    mentor.profilePhotoTrainer || "default-avatar.png"
                  }`,
                  id: mentor._id,
                }}
              />
            ))}
          </div>
        )}

        {/* Placeholder for Pagination or Show More */}
        <div className="mt-4 md:mt-12 text-center">
          <Button size="md" className="gap-2">
            Show More ...
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MentorsPage;
