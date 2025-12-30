import { Star } from "lucide-react";
import { useState } from "react";

const FeedbackPage = () => {
  // Store ratings for each question
  const [ratings, setRatings] = useState({
    teaching: 0,
    presentations: 0,
    engagement: 0,
    pacing: 0,
    organization: 0,
  });

  const handleRating = (field, value) => {
    setRatings({ ...ratings, [field]: value });
  };

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="py-7 bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Feedback Form
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg">
          Help us improve! Please share your honest feedback and rate us from{" "}
          <span className="text-codedrift-pink font-semibold">1</span> (lowest)
          to <span className="text-codedrift-blue font-semibold">10</span>{" "}
          (highest).
        </p>
      </section>

      {/* Feedback Form */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-[#ee4f7e]/10 to-[#4cb7e5]/10 p-8 rounded-2xl shadow-md">
          <form className="space-y-6">
            {/* Name Fields */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 text-sm mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">
                  Middle Name
                </label>
                <input
                  type="text"
                  placeholder="Enter middle name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
                  required
                />
              </div>
            </div>

            {/* Contact Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
                  required
                />
              </div>
            </div>

            {/* College Name */}
            <div>
              <label className="block text-gray-700 text-sm mb-1">
                College Name
              </label>
              <input
                type="text"
                placeholder="Enter college name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
              />
            </div>

            {/* Ratings */}
            <div className="space-y-6">
              {[
                { field: "teaching", label: "Overall quality of the teaching" },
                {
                  field: "presentations",
                  label: "Effectiveness of presentations",
                },
                { field: "engagement", label: "Instructor engagement" },
                { field: "pacing", label: "Pacing of the training sessions" },
                {
                  field: "organization",
                  label: "Organization & structure of the training",
                },
              ].map((q) => (
                <div key={q.field}>
                  <p className="text-gray-700 text-sm mb-1">{q.label}</p>
                  <div className="flex gap-1">
                    {[...Array(10)].map((_, i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => handleRating(q.field, i + 1)}
                        className="focus:outline-none"
                      >
                        <Star
                          size={24}
                          className={`${
                            ratings[q.field] > i
                              ? "text-codedrift-pink fill-codedrift-pink"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="w-full bg-codedrift-pink text-white font-medium px-6 py-3 rounded-full shadow-md hover:bg-codedrift-indigo-dark transition"
              >
                Submit
              </button>
              <button
                type="reset"
                className="w-full bg-white text-codedrift-indigo border border-codedrift-indigo px-6 py-3 rounded-full hover:bg-codedrift-blue/10 transition"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default FeedbackPage;
