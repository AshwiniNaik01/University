// import React from "react";
// import { GraduationCap, BookOpen, FlaskConical, Scale, Briefcase } from "lucide-react";

// const CourseSection = ({ title, icon: Icon, items }) => (
//   <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
//     <div className="flex items-center gap-3 mb-4">
//       <Icon className="w-7 h-7 text-codedrift-pink" />
//       <h3 className="text-xl font-bold text-codedrift-indigo">{title}</h3>
//     </div>
//     <ul className="list-disc list-inside space-y-2 text-gray-700">
//       {items.map((item, index) => (
//         <li key={index}>{item}</li>
//       ))}
//     </ul>
//   </div>
// );

// const HeroTechNontech = () => {
//   return (
//     <section className="bg-gradient-to-br from-[#fdfbfb] to-[#f0f4f8] py-16">
//       <div className="container mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-extrabold text-codedrift-indigo mb-4">
//             Academic Programs Offered
//           </h2>
//           <p className="text-gray-600 max-w-3xl mx-auto">
//             Explore a wide range of Technical and Non-Technical programs offered
//             through affiliated colleges under university regulations.
//           </p>
//         </div>

//         {/* UG Programs */}
//         <div className="mb-12">
//           <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
//             <GraduationCap className="text-codedrift-blue" />
//             Undergraduate (UG) Programs
//           </h3>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             <CourseSection
//               title="Arts & Humanities"
//               icon={BookOpen}
//               items={[
//                 "B.A. – Marathi, English, History",
//                 "Political Science, Sociology",
//                 "Economics, Psychology",
//               ]}
//             />

//             <CourseSection
//               title="Science"
//               icon={FlaskConical}
//               items={[
//                 "B.Sc. – Physics, Chemistry",
//                 "Biology, Mathematics",
//                 "Computer Science",
//               ]}
//             />

//             <CourseSection
//               title="Commerce & Management"
//               icon={Briefcase}
//               items={[
//                 "B.Com. – Commerce",
//                 "BBA – Business Administration",
//               ]}
//             />

//             <CourseSection
//               title="Engineering & Technology"
//               icon={GraduationCap}
//               items={[
//                 "B.Tech / BE – Engineering",
//                 "BCA – Computer Applications",
//               ]}
//             />

//             <CourseSection
//               title="Professional Courses"
//               icon={Scale}
//               items={[
//                 "B.Pharm – Pharmacy",
//                 "B.Ed – Education",
//                 "LL.B – Law",
//                 "BMLT – Medical Lab Technology",
//               ]}
//             />
//           </div>
//         </div>

//         {/* PG Programs */}
//         <div className="mb-12">
//           <h3 className="text-2xl font-bold mb-6">
//             🎓 Postgraduate (PG) Programs
//           </h3>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             <CourseSection
//               title="Master of Arts (M.A.)"
//               icon={BookOpen}
//               items={[
//                 "Economics, Sociology, History",
//                 "Marathi, Psychology",
//                 "Ambedkar Thought, Lifelong Learning",
//               ]}
//             />

//             <CourseSection
//               title="Master of Science (M.Sc.)"
//               icon={FlaskConical}
//               items={[
//                 "Computer Science, Biotechnology",
//                 "Physics, Chemistry, Zoology",
//                 "Food Science & Nutrition",
//               ]}
//             />

//             <CourseSection
//               title="Management & Commerce"
//               icon={Briefcase}
//               items={[
//                 "MBA – Finance, Marketing, HR",
//                 "Operations Management",
//                 "M.Com – Commerce",
//               ]}
//             />

//             <CourseSection
//               title="Technology & Education"
//               icon={GraduationCap}
//               items={[
//                 "MCA – Computer Applications",
//                 "M.Tech – Technology Specializations",
//                 "M.Ed – Education",
//               ]}
//             />

//             <CourseSection
//               title="Law"
//               icon={Scale}
//               items={[
//                 "LL.M – Master of Law",
//               ]}
//             />
//           </div>
//         </div>

//         {/* Diploma & PhD */}
//         <div className="grid md:grid-cols-2 gap-6">
//           <CourseSection
//             title="Diploma & Certificate Courses"
//             icon={BookOpen}
//             items={[
//               "PG Diploma – Counseling & Psychotherapy",
//               "Yoga Therapy",
//               "Naturopathy & Yogic Science",
//               "GST, Retail Sales Associate",
//             ]}
//           />

//           <CourseSection
//             title="Doctoral (Ph.D.) Programs"
//             icon={GraduationCap}
//             items={[
//               "Economics, Physics, Zoology",
//               "Computer Science, Geology",
//               "Education, Commerce",
//               "Admission via NET / SET / University PAT",
//             ]}
//           />
//         </div>

//         {/* Admission Info */}
//         <div className="mt-14 bg-white border border-gray-200 rounded-xl p-8">
//           <h3 className="text-2xl font-bold mb-4 text-codedrift-indigo">
//             🎓 Admission Process
//           </h3>
//           <ul className="space-y-2 text-gray-700">
//             <li>
//               <strong>UG Admissions:</strong> Merit-based or Entrance exams
//               (MHT-CET / JEE Main).
//             </li>
//             <li>
//               <strong>PG Admissions:</strong> Merit or entrance exams
//               (CAT / CMAT / MHT-CET).
//             </li>
//             <li>
//               <strong>Ph.D.:</strong> Master’s degree + Entrance test +
//               Interview/Research proposal.
//             </li>
//             <li>
//               Admissions are announced annually on the official university
//               website.
//             </li>
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroTechNontech;



import React from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import {
  GraduationCap,
  BookOpen,
  FlaskConical,
  Briefcase,
  Scale,
  CheckCircle2,
} from "lucide-react";
import { Button } from "../utility/Button";

const HeroTechNontech = () => {
  const ugCourses = `🎓 Undergraduate Programs

B.A. – Arts
• Marathi, English
• History, Political Science
• Sociology, Economics

B.Sc. – Science
• Physics, Chemistry
• Biology, Mathematics
• Computer Science

B.Com – Commerce
BBA – Business Administration

B.Tech / BE – Engineering
BCA – Computer Applications
B.Pharm – Pharmacy
B.Ed – Education
LL.B – Law
`;

  const pgCourses = `🎓 Postgraduate Programs

M.A. – Arts
• Economics, Sociology
• History, Marathi
• Psychology, Ambedkar Thought

M.Sc. – Science
• Computer Science
• Biotechnology
• Physics, Chemistry
• Zoology, Nutrition

M.Com – Commerce
MBA – Finance, Marketing, HR
MCA – Computer Applications
M.Tech – Technology
M.Ed – Education
LL.M – Law
`;

  const diplomaCourses = `🎓 Diploma & Certificate Courses

PG Diploma
• Counseling & Psychotherapy
• Yoga Therapy
• Naturopathy & Yogic Science

Certificate Courses
• GST
• Retail Sales Associate
• Communication Skills
`;

  const phdCourses = `🎓 Doctoral (Ph.D.) Programs

Ph.D. in:
• Economics
• Physics
• Zoology
• Computer Science
• Geology
• Education
• Commerce

Eligibility:
• Master’s Degree
• NET / SET / University PAT
`;

  return (
    <section className="relative h-lvh bg-gradient-to-br from-[#fdfbfb] via-[#f7f9fc] to-[#f0f4f8] text-gray-800 overflow-hidden">
      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden">
        <GraduationCap className="absolute top-6 left-6 text-codedrift-pink/20 animate-pulse" size={70} />
        <BookOpen className="absolute top-10 right-10 text-codedrift-blue/20 animate-pulse" size={60} />
        <FlaskConical className="absolute bottom-16 left-12 text-codedrift-indigo/20 animate-bounce" size={60} />
        <Briefcase className="absolute top-1/2 right-1/3 text-codedrift-pink/20 animate-spin-slow" size={70} />
      </div>

      {/* Background Blobs */}
      <div className="absolute top-[-120px] left-[-120px] w-[360px] h-[360px] bg-[#ee4f7e]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[380px] h-[380px] bg-[#4cb7e5]/10 rounded-full blur-3xl"></div>

      <div className="container h-lvh">
        <div className="relative h-full z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left Content */}
          <div className="md:w-1/2">
            <h1 className="text-center md:text-left text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-codedrift-indigo">
              Learn More. <br />
              <span className="bg-gradient-to-r from-[#ee4f7e] to-[#4cb7e5] bg-clip-text text-transparent">
                Grow Smarter.
              </span>
            </h1>

            <p className="text-center md:text-left font-semibold text-lg md:text-xl text-gray-600 mb-4">
              Explore Technical & Non-Technical degree programs designed to build
              knowledge, skills, and successful careers.
            </p>

            <ul className="text-gray-700 text-sm md:text-base mb-6 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-codedrift-pink" />
                Undergraduate, Postgraduate & Doctoral programs
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-codedrift-pink" />
                Technical & Non-Technical career paths
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-codedrift-pink" />
                University-approved & industry-relevant courses
              </li>
            </ul>

            <div className="flex justify-center md:justify-start gap-4">
              <Button as="link" variant="pink" to="/courses">
                View Courses
              </Button>
              {/* <Button as="link" variant="pink" to="/admissions">
                Admission Info
              </Button> */}
            </div>
          </div>

          {/* Right Typewriter Box */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="rounded-xl shadow-xl border border-gray-200 overflow-hidden w-full h-[22rem] md:h-[65vh] bg-white animate-[float_6s_ease-in-out_infinite]">
              <div className="h-2 bg-codedrift-gradient"></div>
              <div className="p-4 font-mono text-sm bg-[#1e1f29] text-white rounded-b-xl h-full">
                <pre className="overflow-y-auto h-full whitespace-pre-wrap">
                  <Typewriter
                    words={[
                      ugCourses,
                      pgCourses,
                      diplomaCourses,
                      phdCourses,
                    ]}
                    loop={true}
                    typeSpeed={30}
                    deleteSpeed={10}
                    delaySpeed={3000}
                  />
                </pre>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroTechNontech;
