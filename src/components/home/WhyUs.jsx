import React from "react";

const WhyUs = () => {
  return (
    <section className="features-section bg-gray-50 py-20">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Why Choose{" "}
          <span className="text-codedrift-pink">CodeDrift Academy?</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-codedrift-pink hover:shadow-[0_0_15px_#ef5b87] transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Project-Based Learning
            </h3>
            <p className="text-gray-600">
              Work on real-world projects from day one and build a job-ready
              portfolio.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-codedrift-blue hover:shadow-[0_0_15px_#51c2f1] transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Industry-Ready Curriculum
            </h3>
            <p className="text-gray-600">
              Courses crafted with inputs from industry experts to match current
              tech demands.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-codedrift-indigo hover:shadow-[0_0_15px_#3f51b5] transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Expert Trainers
            </h3>
            <p className="text-gray-600">
              Learn from professionals with years of teaching and corporate
              experience.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-codedrift-pink hover:shadow-[0_0_15px_#ef5b87] transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Internship & Placement Support
            </h3>
            <p className="text-gray-600">
              Get guidance, mock interviews, and access to internship & job
              opportunities.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-codedrift-blue hover:shadow-[0_0_15px_#51c2f1] transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Flexible Learning
            </h3>
            <p className="text-gray-600">
              Choose from online/offline, weekend, or weekday batches that suit
              your schedule.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-codedrift-indigo hover:shadow-[0_0_15px_#3f51b5] transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Community & Hackathons
            </h3>
            <p className="text-gray-600">
              Be a part of our vibrant tech community with regular coding
              contests & events.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
