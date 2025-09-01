import { BookOpen, Rocket, Users } from "lucide-react";
import React from "react";

const values = [
  {
    title: "Hands-On Learning",
    desc: "At Code Drift, we believe in learning by doing. Our courses offer hands-on experience through projects and real-world simulations.",
    icon: <BookOpen className="w-7 h-7 text-codedrift-pink" />,
  },
  {
    title: "Expert Mentors",
    desc: "Our instructors are seasoned software professionals, offering personalized attention and industry insights.",
    icon: <Users className="w-7 h-7 text-codedrift-blue" />,
  },
  {
    title: "Comprehensive Syllabus",
    desc: "Our curriculum covers essentials to advanced topics, constantly updated for industry relevance.",
    icon: <BookOpen className="w-7 h-7 text-codedrift-indigo" />,
  },
  {
    title: "Flexible Learning",
    desc: "Choose in-person, live online, or self-paced modules. Learn at your own pace, on your terms.",
    icon: <Rocket className="w-7 h-7 text-codedrift-pink" />,
  },
];

const Values = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-60 h-60 bg-codedrift-pink/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-codedrift-blue/10 rounded-full blur-3xl"></div>

      <div className="container relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#ee4f7e] to-[#4cb7e5] bg-clip-text text-transparent mb-14">
          Our Values
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((val, i) => (
            <div
              key={i}
              className="relative rounded-2xl p-[2px] codedrift-gradient codedrift-gradient-animate 
                         shadow-lg hover:shadow-xl transition transform hover:-translate-y-2"
            >
              {/* Inner Frosted Glass Content */}
              <div className="bg-white/90  backdrop-blur-md rounded-2xl p-6 h-full flex flex-col items-center">
                {/* Icon Circle */}
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/60 mb-4 shadow-inner">
                  {val.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {val.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {val.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
