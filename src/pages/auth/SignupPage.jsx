// import React from "react";
// import { UserPlus, FileText, CheckCircle2, Goal, GraduationCap, Briefcase } from "lucide-react";
// import { Button } from "../../components/utility/Button";

// const SignupPage = () => {
//     return (
//         <section className="py-10 bg-white">
//             <div className="container">
//                 <div className="grid md:grid-cols-3 gap-10 items-start">
//                     {/* ✅ Left Panel with Heading & Perks */}
//                     <div className="md:col-span-1 space-y-6">   
//                         {/* Icons */}
//                         <div className="flex gap-4 items-center justify-center sm:justify-start">
//                             <UserPlus className="w-8 h-8 text-codedrift-pink" />
//                             <FileText className="w-8 h-8 text-codedrift-blue" />
//                             <CheckCircle2 className="w-8 h-8 text-codedrift-indigo" />
//                         </div>

//                         {/* Main Heading */}
//                         <h2 className="text-2xl md:text-3xl text-center sm:text-start font-extrabold text-gray-800 leading-tight">
//                             Candidate Registration
//                         </h2>

//                         {/* Description */}
//                         <p className="text-gray-600 text-center sm:text-start text-sm md:text-base leading-relaxed">
//                             Register now with{" "}
//                             <span className="text-codedrift-pink font-semibold">Code Drift Academy</span> and
//                             kickstart your journey in tech. Fill in your details to book your seat.
//                         </p>

//                         {/* Perks List */}
//                         <div className="pt-4 border-t border-gray-200">
//                             <h3 className="text-2xl md:text-4xl text-center sm:text-start font-semibold text-codedrift-indigo mb-2">Why Register?</h3>
//                             <ul className="pl-3 md:pl-0 mt-3 md:mt-6 text-sm text-gray-700 flex flex-col gap-3">
//                                 <li className="flex items-center gap-2">
//                                     <Goal className="w-4 h-4 text-codedrift-pink" />
//                                     Structured curriculum with practical learning
//                                 </li>
//                                 <li className="flex items-center gap-2">
//                                     <GraduationCap className="w-4 h-4 text-codedrift-indigo" />
//                                     Live mentor support & doubt solving
//                                 </li>
//                                 <li className="flex items-center gap-2">
//                                     <Briefcase className="w-4 h-4 text-codedrift-blue" />
//                                     Placement preparation & resume building
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>

//                     {/* ✅ Right Panel - Registration Form */}
//                     <div className="md:col-span-2 bg-gradient-to-br from-[#ee4f7e0a] to-[#4cb7e50a] p-6 md:p-8 rounded-2xl shadow-lg backdrop-blur-sm border border-[#ffffff88]">
//                         <form className="space-y-6">
//                             {/* Full Name */}
//                             <div className="grid md:grid-cols-3 gap-4">
//                                 {["First", "Middle", "Last"].map((label, i) => (
//                                     <div key={i}>
//                                         <label className="block text-gray-700 text-sm mb-1">
//                                             {label} Name {label !== "Middle" && <span className="text-red-500">*</span>}
//                                         </label>
//                                         <input
//                                             type="text"
//                                             placeholder={`Enter ${label.toLowerCase()} name`}
//                                             className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink focus:border-codedrift-pink outline-none transition-all"
//                                             required={label !== "Middle"}
//                                         />
//                                     </div>
//                                 ))}
//                             </div>

//                             {/* Contact Info */}
//                             <div className="grid md:grid-cols-2 gap-4">
//                                 {[
//                                     { label: "Phone", type: "tel", placeholder: "Enter phone number" },
//                                     { label: "Email", type: "email", placeholder: "Enter email address" }
//                                 ].map((field, i) => (
//                                     <div key={i}>
//                                         <label className="block text-gray-700 text-sm mb-1">
//                                             {field.label} <span className="text-red-500">*</span>
//                                         </label>
//                                         <input
//                                             type={field.type}
//                                             placeholder={field.placeholder}
//                                             className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink focus:border-codedrift-pink outline-none transition-all"
//                                             required
//                                         />
//                                     </div>
//                                 ))}
//                             </div>

//                             {/* Date of Birth & College */}
//                             <div className="grid md:grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-gray-700 text-sm mb-1">
//                                         Birth Date <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                         type="date"
//                                         className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-700 text-sm mb-1">
//                                         College Name <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                         type="text"
//                                         placeholder="Enter college name"
//                                         className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
//                                         required
//                                     />
//                                 </div>
//                             </div>

//                             {/* Course Selection */}
//                             <div>
//                                 <label className="block text-gray-700 text-sm mb-1">ITR Program</label>
//                                 <select className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none transition-all">
//                                     <option>
//                                         Full Stack Web Development - 02 June 2025 (90 Days)
//                                     </option>
//                                     <option>
//                                         Full Stack Mobile Development - 02 June 2025 (90 Days)
//                                     </option>
//                                 </select>
//                             </div>

//                             {/* Buttons */}
//                             <div className="flex flex-col md:flex-row gap-4 pt-2">
//                                 <Button type="submit" size="md" variant="pink" className="w-full shadow-md">
//                                     Submit
//                                 </Button>
//                                 <Button type="reset" size="md" variant="outline" className="w-full shadow-md">
//                                     Reset
//                                 </Button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default SignupPage;



// import React, { useState } from "react";
// import {
//   UserPlus,
//   FileText,
//   CheckCircle2,
//   Goal,
//   GraduationCap,
//   Briefcase,
// } from "lucide-react";
// import { Button } from "../../components/utility/Button";
// import { registerCandidate } from "./studentRegisterApi";
// import { toast } from "react-toastify";
// import * as Yup from "yup";
// // import { registerCandidate } from "../../api/studentApi";

// // ✅ Validation schema
// const signupSchema = Yup.object().shape({
//   firstName: Yup.string()
//     .min(2, "First name must be at least 2 characters")
//     .required("First name is required"),
//   middleName: Yup.string().nullable(),
//   lastName: Yup.string()
//     .min(2, "Last name must be at least 2 characters")
//     .required("Last name is required"),
//   mobileNo: Yup.string()
//     .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
//     .required("Mobile number is required"),
//   email: Yup.string().email("Invalid email address").required("Email is required"),
//   dob: Yup.date()
//     .max(new Date(), "Date of birth cannot be in the future")
//     .required("Date of birth is required"),
//   collegeName: Yup.string().required("College name is required"),
//   selectedProgram: Yup.string().required("Program selection is required"),
// });

// const SignupPage = () => {
//   const [formState, setFormState] = useState({
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     mobileNo: "",
//     email: "",
//     dob: "",
//     collegeName: "",
//     selectedProgram: "Full Stack Web Development - 02 June 2025 (90 Days)",
//   });

//   const handleChange = (e) => {
//     setFormState({ ...formState, [e.target.name]: e.target.value });
//   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const fullName = [formState.firstName, formState.middleName, formState.lastName]
// //       .filter(Boolean)
// //       .join(" ");

// //     const payload = {
// //       fullName,
// //       email: formState.email,
// //       mobileNo: formState.mobileNo,
// //       dob: formState.dob,
// //       collegeName: formState.collegeName,
// //       selectedProgram: formState.selectedProgram,
// //     };

// //     try {
// //       const res = await registerCandidate(payload);
// //       alert(res.message);
// //       setFormState({
// //         firstName: "",
// //         middleName: "",
// //         lastName: "",
// //         mobileNo: "",
// //         email: "",
// //         dob: "",
// //         collegeName: "",
// //         selectedProgram: "Full Stack Web Development - 02 June 2025 (90 Days)",
// //       });
// //     } catch (err) {
// //       alert(err.message || "Registration failed.");
// //     }
// //   };

// // const handleSubmit = async (e) => {
// //   e.preventDefault();

// //   const fullName = [formState.firstName, formState.middleName, formState.lastName]
// //     .filter(Boolean)
// //     .join(" ");

// //   const payload = {
// //     fullName,
// //     email: formState.email,
// //     mobileNo: formState.mobileNo,
// //     dob: formState.dob,
// //     collegeName: formState.collegeName,
// //     selectedProgram: formState.selectedProgram,
// //   };

// //   try {
// //     const res = await registerCandidate(payload);
// //     toast.success(res.message || "Registration successful!");
// //     setFormState({
// //       firstName: "",
// //       middleName: "",
// //       lastName: "",
// //       mobileNo: "",
// //       email: "",
// //       dob: "",
// //       collegeName: "",
// //       selectedProgram: "Full Stack Web Development - 02 June 2025 (90 Days)",
// //     });
// //   } catch (err) {
// //     toast.error(err.message || "Registration failed.");
// //   }
// // };


//  const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // ✅ Validate form data
//       await signupSchema.validate(formState, { abortEarly: false });

//       const fullName = [formState.firstName, formState.middleName, formState.lastName]
//         .filter(Boolean)
//         .join(" ");

//       const payload = {
//         fullName,
//         email: formState.email,
//         mobileNo: formState.mobileNo,
//         dob: formState.dob,
//         collegeName: formState.collegeName,
//         selectedProgram: formState.selectedProgram,
//       };

//       const res = await registerCandidate(payload);
//       toast.success(res.message || "Registration successful!");

//       setFormState({
//         firstName: "",
//         middleName: "",
//         lastName: "",
//         mobileNo: "",
//         email: "",
//         dob: "",
//         collegeName: "",
//         selectedProgram: "Full Stack Web Development - 02 June 2025 (90 Days)",
//       });
//     } catch (err) {
//       if (err.inner) {
//         // ✅ Show all Yup validation errors
//         err.inner.forEach((error) => toast.error(error.message));
//       } else {
//         toast.error(err.message || "Registration failed.");
//       }
//     }
//   };


//   return (
//     <section className="py-10 bg-white">
//       <div className="container">
//         <div className="grid md:grid-cols-3 gap-10 items-start">
//           {/* Left Panel */}
//           <div className="md:col-span-1 space-y-6">
//             <div className="flex gap-4 items-center justify-center sm:justify-start">
//               <UserPlus className="w-8 h-8 text-codedrift-pink" />
//               <FileText className="w-8 h-8 text-codedrift-blue" />
//               <CheckCircle2 className="w-8 h-8 text-codedrift-indigo" />
//             </div>

//             <h2 className="text-2xl md:text-3xl text-center sm:text-start font-extrabold text-gray-800 leading-tight">
//               Candidate Registration
//             </h2>

//             <p className="text-gray-600 text-center sm:text-start text-sm md:text-base leading-relaxed">
//               Register now with{" "}
//               <span className="text-codedrift-pink font-semibold">
//                 Code Drift Academy
//               </span>{" "}
//               and kickstart your journey in tech.
//             </p>

//             <div className="pt-4 border-t border-gray-200">
//               <h3 className="text-2xl md:text-4xl text-center sm:text-start font-semibold text-codedrift-indigo mb-2">
//                 Why Register?
//               </h3>
//               <ul className="pl-3 md:pl-0 mt-3 md:mt-6 text-sm text-gray-700 flex flex-col gap-3">
//                 <li className="flex items-center gap-2">
//                   <Goal className="w-4 h-4 text-codedrift-pink" />
//                   Structured curriculum with practical learning
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <GraduationCap className="w-4 h-4 text-codedrift-indigo" />
//                   Live mentor support & doubt solving
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <Briefcase className="w-4 h-4 text-codedrift-blue" />
//                   Placement preparation & resume building
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* Right Panel */}
//           <div className="md:col-span-2 bg-gradient-to-br from-[#ee4f7e0a] to-[#4cb7e50a] p-6 md:p-8 rounded-2xl shadow-lg backdrop-blur-sm border border-[#ffffff88]">
//             <form className="space-y-6" onSubmit={handleSubmit}>
//               {/* Name Fields */}
//               <div className="grid md:grid-cols-3 gap-4">
//                 {["First", "Middle", "Last"].map((label, i) => (
//                   <div key={i}>
//                     <label className="block text-gray-700 text-sm mb-1">
//                       {label} Name{" "}
//                       {label !== "Middle" && (
//                         <span className="text-red-500">*</span>
//                       )}
//                     </label>
//                     <input
//                       name={`${label.toLowerCase()}Name`}
//                       type="text"
//                       value={formState[`${label.toLowerCase()}Name`] || ""}
//                       onChange={handleChange}
//                       placeholder={`Enter ${label.toLowerCase()} name`}
//                       className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
//                       required={label !== "Middle"}
//                     />
//                   </div>
//                 ))}
//               </div>

//               {/* Contact Info */}
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-gray-700 text-sm mb-1">
//                     Phone <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="tel"
//                     name="mobileNo"
//                     value={formState.mobileNo}
//                     onChange={handleChange}
//                     placeholder="Enter phone number"
//                     className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 text-sm mb-1">
//                     Email <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formState.email}
//                     onChange={handleChange}
//                     placeholder="Enter email address"
//                     className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* DOB & College */}
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-gray-700 text-sm mb-1">
//                     Birth Date <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="date"
//                     name="dob"
//                     value={formState.dob}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 text-sm mb-1">
//                     College Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="collegeName"
//                     value={formState.collegeName}
//                     onChange={handleChange}
//                     placeholder="Enter college name"
//                     className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* ITR Program Selection */}
//               {/* <div>
//                 <label className="block text-gray-700 text-sm mb-1">
//                   ITR Program
//                 </label>
//                 <select
//                   name="selectedProgram"
//                   value={formState.selectedProgram}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
//                 >
//                   <option>
//                     Full Stack Web Development - 02 June 2025 (90 Days)
//                   </option>
//                   <option>
//                     Full Stack Mobile Development - 02 June 2025 (90 Days)
//                   </option>
//                 </select>
//               </div> */}

//               {/* Buttons */}
//               <div className="flex flex-col md:flex-row gap-4 pt-2">
//                 <Button type="submit" size="md" variant="pink" className="w-full shadow-md">
//                   Submit
//                 </Button>
//                 <Button
//                   type="reset"
//                   size="md"
//                   variant="outline"
//                   className="w-full shadow-md"
//                   onClick={() =>
//                     setFormState({
//                       firstName: "",
//                       middleName: "",
//                       lastName: "",
//                       mobileNo: "",
//                       email: "",
//                       dob: "",
//                       collegeName: "",
//                       selectedProgram:
//                         "Full Stack Web Development - 02 June 2025 (90 Days)",
//                     })
//                   }
//                 >
//                   Reset
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SignupPage;



// import React, { useState } from "react";
// import {
//   UserPlus,
//   FileText,
//   CheckCircle2,
//   Goal,
//   GraduationCap,
//   Briefcase,
// } from "lucide-react";
// import { Button } from "../../components/utility/Button";
// import { registerCandidate } from "./studentRegisterApi";
// import { toast } from "react-toastify";
// import * as Yup from "yup";

// // ✅ Validation schema
// // const signupSchema = Yup.object().shape({
// //   firstName: Yup.string()
// //     .min(2, "First name must be at least 2 characters")
// //     .required("First name is required"),
// //   middleName: Yup.string().nullable(),
// //   lastName: Yup.string()
// //     .min(2, "Last name must be at least 2 characters")
// //     .required("Last name is required"),
// //   mobileNo: Yup.string()
// //     .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
// //     .required("Mobile number is required"),
// //   email: Yup.string().email("Invalid email address").required("Email is required"),
// //   dob: Yup.date()
// //     .max(new Date(), "Date of birth cannot be in the future")
// //     .required("Date of birth is required"),
// //   collegeName: Yup.string().required("College name is required"),
// //   selectedProgram: Yup.string().required("Program selection is required"),
// // });

// const signupSchema = Yup.object().shape({
// firstName: Yup.string()
//   .trim()
//   .matches(/^[A-Za-z\s'-]+$/, "First name can only contain letters, spaces, apostrophes, and hyphens")
//   .min(2, "First name must be at least 2 characters")
//   .max(50, "First name cannot exceed 50 characters")
//   .required("First name is required"),

// middleName: Yup.string()
//   .trim()
//   .nullable()
//   .matches(/^[A-Za-z\s'-]*$/, "Middle name can only contain letters, spaces, apostrophes, and hyphens")
//   .max(50, "Middle name cannot exceed 50 characters"),

// lastName: Yup.string()
//   .trim()
//   .matches(/^[A-Za-z\s'-]+$/, "Last name can only contain letters, spaces, apostrophes, and hyphens")
//   .min(2, "Last name must be at least 2 characters")
//   .max(50, "Last name cannot exceed 50 characters")
//   .required("Last name is required"),


//   mobileNo: Yup.string()
//     .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number")
//     .required("Mobile number is required"),

//   email: Yup.string()
//     .trim()
//     .email("Please enter a valid email address")
//     .required("Email is required"),

//   dob: Yup.date()
//     .max(new Date(), "Date of birth cannot be in the future")
//     .required("Date of birth is required"),

//   collegeName: Yup.string()
//     .trim()
//     .min(2, "College name must be at least 2 characters")
//     .max(100, "College name cannot exceed 100 characters")
//     .required("College name is required"),

//   selectedProgram: Yup.string()
//     .trim()
//     .required("Program selection is required"),
// });


// const SignupPage = () => {
//   const [formState, setFormState] = useState({
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     mobileNo: "",
//     email: "",
//     dob: "",
//     collegeName: "",
//     selectedProgram: "Full Stack Web Development - 02 June 2025 (90 Days)",
//   });

//   const [errors, setErrors] = useState({}); // ✅ store field errors here

//   const handleChange = (e) => {
//     setFormState({ ...formState, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // ✅ Validate form data
//       await signupSchema.validate(formState, { abortEarly: false });
//       setErrors({}); // clear errors if valid

//       const fullName = [formState.firstName, formState.middleName, formState.lastName]
//         .filter(Boolean)
//         .join(" ");

//       const payload = {
//         fullName,
//         email: formState.email,
//         mobileNo: formState.mobileNo,
//         dob: formState.dob,
//         collegeName: formState.collegeName,
//         selectedProgram: formState.selectedProgram,
//       };

//       const res = await registerCandidate(payload);
//       toast.success(res.message || "Registration successful!");

//       // ✅ reset form
//       setFormState({
//         firstName: "",
//         middleName: "",
//         lastName: "",
//         mobileNo: "",
//         email: "",
//         dob: "",
//         collegeName: "",
//         selectedProgram: "Full Stack Web Development - 02 June 2025 (90 Days)",
//       });
//     } catch (err) {
//       if (err.inner) {
//         // ✅ Collect field errors
//         const formErrors = {};
//         err.inner.forEach((error) => {
//           formErrors[error.path] = error.message;
//         });
//         setErrors(formErrors);
//       } else {
//         toast.error(err.message || "Registration failed.");
//       }
//     }
//   };

//   return (
//     <section className="py-10 bg-white">
//       <div className="container">
//         <div className="grid md:grid-cols-3 gap-10 items-start">
//           {/* Left Panel */}
//           <div className="md:col-span-1 space-y-6">
//             <div className="flex gap-4 items-center justify-center sm:justify-start">
//                <UserPlus className="w-8 h-8 text-codedrift-pink" />
//                <FileText className="w-8 h-8 text-codedrift-blue" />
//                <CheckCircle2 className="w-8 h-8 text-codedrift-indigo" />
//              </div>

//              <h2 className="text-2xl md:text-3xl text-center sm:text-start font-extrabold text-gray-800 leading-tight">
//                Candidate Registration
//              </h2>

//              <p className="text-gray-600 text-center sm:text-start text-sm md:text-base leading-relaxed">
//                Register now with{" "}
//                <span className="text-codedrift-pink font-semibold">
//                  Code Drift
//                </span>{" "}
//                and kickstart your journey in tech.
//              </p>

//              <div className="pt-4 border-t border-gray-200">
//                <h3 className="text-2xl md:text-4xl text-center sm:text-start font-semibold text-codedrift-indigo mb-2">
//                  Why Register?
//                </h3>
//                <ul className="pl-3 md:pl-0 mt-3 md:mt-6 text-sm text-gray-700 flex flex-col gap-3">
//                  <li className="flex items-center gap-2">
//                    <Goal className="w-4 h-4 text-codedrift-pink" />
//                    Structured curriculum with practical learning
//                  </li>
//                  <li className="flex items-center gap-2">
//                    <GraduationCap className="w-4 h-4 text-codedrift-indigo" />
//                    Live mentor support & doubt solving
//                  </li>
//                  <li className="flex items-center gap-2">
//                    <Briefcase className="w-4 h-4 text-codedrift-blue" />
//                    Placement preparation & resume building
//                  </li>
//                </ul>
//              </div>
//           </div>

//           {/* Right Panel */}
//           <div className="md:col-span-2 bg-gradient-to-br from-[#ee4f7e0a] to-[#4cb7e50a] p-6 md:p-8 rounded-2xl shadow-lg backdrop-blur-sm border border-[#ffffff88]">
//             <form className="space-y-6" onSubmit={handleSubmit}>
//               {/* Name Fields */}
//               <div className="grid md:grid-cols-3 gap-4">
//                 {["First", "Middle", "Last"].map((label, i) => {
//                   const name = `${label.toLowerCase()}Name`;
//                   return (
//                     <div key={i}>
//                       <label className="block text-gray-700 text-sm mb-1">
//                         {label} Name{" "}
//                         {label !== "Middle" && (
//                           <span className="text-red-500">*</span>
//                         )}
//                       </label>
//                       <input
//                         name={name}
//                         type="text"
//                         value={formState[name] || ""}
//                         onChange={handleChange}
//                         placeholder={`Enter ${label.toLowerCase()} name`}
//                         className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
//                       />
//                       {errors[name] && (
//                         <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* Contact Info */}
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-gray-700 text-sm mb-1">
//                     Phone <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="tel"
//                     name="mobileNo"
//                     value={formState.mobileNo}
//                     onChange={handleChange}
//                     placeholder="Enter phone number"
//                     className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
//                   />
//                   {errors.mobileNo && (
//                     <p className="text-red-500 text-sm mt-1">{errors.mobileNo}</p>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 text-sm mb-1">
//                     Email <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formState.email}
//                     onChange={handleChange}
//                     placeholder="Enter email address"
//                     className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
//                   />
//                   {errors.email && (
//                     <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//                   )}
//                 </div>
//               </div>

//               {/* DOB & College */}
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-gray-700 text-sm mb-1">
//                     Birth Date <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="date"
//                     name="dob"
//                     value={formState.dob}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
//                   />
//                   {errors.dob && (
//                     <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 text-sm mb-1">
//                     College Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="collegeName"
//                     value={formState.collegeName}
//                     onChange={handleChange}
//                     placeholder="Enter college name"
//                     className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
//                   />
//                   {errors.collegeName && (
//                     <p className="text-red-500 text-sm mt-1">{errors.collegeName}</p>
//                   )}
//                 </div>
//               </div>

//               {/* Buttons */}
//               <div className="flex flex-col md:flex-row gap-4 pt-2">
//                 <Button type="submit" size="md" variant="pink" className="w-full shadow-md">
//                   Submit
//                 </Button>
//                 <Button
//                   type="reset"
//                   size="md"
//                   variant="outline"
//                   className="w-full shadow-md"
//                   onClick={() =>
//                     setFormState({
//                       firstName: "",
//                       middleName: "",
//                       lastName: "",
//                       mobileNo: "",
//                       email: "",
//                       dob: "",
//                       collegeName: "",
//                       selectedProgram:
//                         "Full Stack Web Development - 02 June 2025 (90 Days)",
//                     })
//                   }
//                 >
//                   Reset
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SignupPage;



import React from "react";
import {
  UserPlus,
  FileText,
  CheckCircle2,
  Goal,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { Button } from "../../components/utility/Button";
import { registerCandidate } from "./studentRegisterApi";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const signupSchema = Yup.object().shape({
firstName: Yup.string()
  .trim()
  .matches(/^[A-Za-z\s'-]+$/, "First name can only contain letters, spaces, apostrophes, and hyphens")
  .min(2, "First name must be at least 2 characters")
  .max(50, "First name cannot exceed 50 characters")
  .required("First name is required"),

middleName: Yup.string()
  .trim()
  .nullable()
  .matches(/^[A-Za-z\s'-]*$/, "Middle name can only contain letters, spaces, apostrophes, and hyphens")
  .max(50, "Middle name cannot exceed 50 characters"),

lastName: Yup.string()
  .trim()
  .matches(/^[A-Za-z\s'-]+$/, "Last name can only contain letters, spaces, apostrophes, and hyphens")
  .min(2, "Last name must be at least 2 characters")
  .max(50, "Last name cannot exceed 50 characters")
  .required("Last name is required"),


mobileNo: Yup.string()
    .required("Phone is required")
     .matches(/^[789]\d{9}$/, "Phone must be 10 digits and start with 7, 8, or 9")
    .matches(/^[0-9]{10}$/, "Phone must be exactly 10 digits")
    .test(
      "not-repetitive",
      "Phone number cannot be repetitive digits or common invalid numbers",
      (value) => {
        if (!value) return false;
        if (/^(\d)\1{9}$/.test(value)) return false;
        const invalids = ["1234567890", "0987654321", "1111111111", "2222222222"];
        if (invalids.includes(value)) return false;
        return true;
      }
    ),

  email: Yup.string()
    .required("Email is required")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please enter a valid email address"
    ),

dob: Yup.date()
  .required("Date of birth is required")
  .test(
    "not-today-or-future",
    "Date of birth cannot be today or in the future",
    function (value) {
      if (!value) return false;
      const today = new Date();
      const inputDate = new Date(value);

      // Remove time component for comparison
      today.setHours(0, 0, 0, 0);
      inputDate.setHours(0, 0, 0, 0);

      return inputDate < today; // must be before today
    }
  ),

  collegeName: Yup.string()
    .trim()
    .min(1, "College name must be at least 2 characters")
    .max(100, "College name cannot exceed 100 characters")
    .required("College name is required"),

  selectedProgram: Yup.string().trim().required("Program selection is required"),
});

const initialValues = {
  firstName: "",
  middleName: "",
  lastName: "",
  mobileNo: "",
  email: "",
  dob: "",
  collegeName: "",
  selectedProgram: "Full Stack Web Development - 02 June 2025 (90 Days)",
};

const SignupPage = () => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const fullName = [values.firstName, values.middleName, values.lastName]
        .filter(Boolean)
        .join(" ");

      const payload = {
        fullName,
        email: values.email,
        mobileNo: values.mobileNo,
        dob: values.dob,
        collegeName: values.collegeName,
        selectedProgram: values.selectedProgram,
      };

      const res = await registerCandidate(payload);
      toast.success(res.message || "Registration successful!");
      resetForm();
    } catch (error) {
      toast.error(error.message || "Registration failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-10 bg-white">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          {/* Left Panel */}
          <div className="md:col-span-1 space-y-6">
            <div className="flex gap-4 items-center justify-center sm:justify-start">
              <UserPlus className="w-8 h-8 text-codedrift-pink" />
              <FileText className="w-8 h-8 text-codedrift-blue" />
              <CheckCircle2 className="w-8 h-8 text-codedrift-indigo" />
            </div>

            <h2 className="text-2xl md:text-3xl text-center sm:text-start font-extrabold text-gray-800 leading-tight">
              Candidate Registration
            </h2>

            <p className="text-gray-600 text-center sm:text-start text-sm md:text-base leading-relaxed">
              Register now with{" "}
              <span className="text-codedrift-pink font-semibold">Code Drift</span>{" "}
              and kickstart your journey in tech.
            </p>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-2xl md:text-4xl text-center sm:text-start font-semibold text-codedrift-indigo mb-2">
                Why Register?
              </h3>
              <ul className="pl-3 md:pl-0 mt-3 md:mt-6 text-sm text-gray-700 flex flex-col gap-3">
                <li className="flex items-center gap-2">
                  <Goal className="w-4 h-4 text-codedrift-pink" />
                  Structured curriculum with practical learning
                </li>
                <li className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-codedrift-indigo" />
                  Live mentor support & doubt solving
                </li>
                <li className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-codedrift-blue" />
                  Placement preparation & resume building
                </li>
              </ul>
            </div>
          </div>

          {/* Right Panel */}
          <div className="md:col-span-2 bg-gradient-to-br from-[#ee4f7e0a] to-[#4cb7e50a] p-6 md:p-8 rounded-2xl shadow-lg backdrop-blur-sm border border-[#ffffff88]">
            <Formik
              initialValues={initialValues}
              validationSchema={signupSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, handleReset }) => (
                <Form className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid md:grid-cols-3 gap-4">
                    {["First", "Middle", "Last"].map((label, i) => {
                      const name = `${label.toLowerCase()}Name`;
                      return (
                        <div key={i}>
                          <label className="block text-gray-700 text-sm mb-1" htmlFor={name}>
                            {label} Name{" "}
                            {label !== "Middle" && (
                              <span className="text-red-500">*</span>
                            )}
                          </label>
                          <Field
                            id={name}
                            name={name}
                            type="text"
                            placeholder={`Enter ${label.toLowerCase()} name`}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
                          />
                          <ErrorMessage
                            name={name}
                            component="p"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* Contact Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm mb-1" htmlFor="mobileNo">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <Field
                        id="mobileNo"
                        name="mobileNo"
                        type="tel"
                        placeholder="Enter phone number"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
                      />
                      <ErrorMessage
                        name="mobileNo"
                        component="p"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm mb-1" htmlFor="email">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter email address"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
                      />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>

                  {/* DOB & College */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm mb-1" htmlFor="dob">
                        Birth Date <span className="text-red-500">*</span>
                      </label>
                      <Field
                        id="dob"
                        name="dob"
                        type="date"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
                      />
                      <ErrorMessage
                        name="dob"
                        component="p"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm mb-1" htmlFor="collegeName">
                        College Name <span className="text-red-500">*</span>
                      </label>
                      <Field
                        id="collegeName"
                        name="collegeName"
                        type="text"
                        placeholder="Enter college name"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
                      />
                      <ErrorMessage
                        name="collegeName"
                        component="p"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>

                  {/* Program Selection */}
                  <div>
                    <label className="block text-gray-700 text-sm mb-1" htmlFor="selectedProgram">
                      Select Program <span className="text-red-500">*</span>
                    </label>
                    <Field
                      as="select"
                      id="selectedProgram"
                      name="selectedProgram"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
                    >
                     <option>
                     Full Stack Web Development - 02 June 2025 (90 Days)
                   </option>
                   <option>
                     Full Stack Mobile Development - 02 June 2025 (90 Days)
                   </option>
                    </Field>
                    <ErrorMessage
                      name="selectedProgram"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col md:flex-row gap-4 pt-2">
                    <Button
                      type="submit"
                      size="md"
                      variant="pink"
                      className="w-full shadow-md"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                    <Button
                      type="button"
                      size="md"
                      variant="outline"
                      className="w-full shadow-md"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
