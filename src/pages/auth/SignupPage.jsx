import React from "react";
import { UserPlus, FileText, CheckCircle2, Goal, GraduationCap, Briefcase } from "lucide-react";
import { Button } from "../../components/utility/Button";

const SignupPage = () => {
    return (
        <section className="py-10 bg-white">
            <div className="container">
                <div className="grid md:grid-cols-3 gap-10 items-start">
                    {/* ✅ Left Panel with Heading & Perks */}
                    <div className="md:col-span-1 space-y-6">
                        {/* Icons */}
                        <div className="flex gap-4 items-center justify-center sm:justify-start">
                            <UserPlus className="w-8 h-8 text-codedrift-pink" />
                            <FileText className="w-8 h-8 text-codedrift-blue" />
                            <CheckCircle2 className="w-8 h-8 text-codedrift-indigo" />
                        </div>

                        {/* Main Heading */}
                        <h2 className="text-2xl md:text-3xl text-center sm:text-start font-extrabold text-gray-800 leading-tight">
                            Candidate Registration
                        </h2>

                        {/* Description */}
                        <p className="text-gray-600 text-center sm:text-start text-sm md:text-base leading-relaxed">
                            Register now with{" "}
                            <span className="text-codedrift-pink font-semibold">Code Drift Academy</span> and
                            kickstart your journey in tech. Fill in your details to book your seat.
                        </p>

                        {/* Perks List */}
                        <div className="pt-4 border-t border-gray-200">
                            <h3 className="text-2xl md:text-4xl text-center sm:text-start font-semibold text-codedrift-indigo mb-2">Why Register?</h3>
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

                    {/* ✅ Right Panel - Registration Form */}
                    <div className="md:col-span-2 bg-gradient-to-br from-[#ee4f7e0a] to-[#4cb7e50a] p-6 md:p-8 rounded-2xl shadow-lg backdrop-blur-sm border border-[#ffffff88]">
                        <form className="space-y-6">
                            {/* Full Name */}
                            <div className="grid md:grid-cols-3 gap-4">
                                {["First", "Middle", "Last"].map((label, i) => (
                                    <div key={i}>
                                        <label className="block text-gray-700 text-sm mb-1">
                                            {label} Name {label !== "Middle" && <span className="text-red-500">*</span>}
                                        </label>
                                        <input
                                            type="text"
                                            placeholder={`Enter ${label.toLowerCase()} name`}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink focus:border-codedrift-pink outline-none transition-all"
                                            required={label !== "Middle"}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Contact Info */}
                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    { label: "Phone", type: "tel", placeholder: "Enter phone number" },
                                    { label: "Email", type: "email", placeholder: "Enter email address" }
                                ].map((field, i) => (
                                    <div key={i}>
                                        <label className="block text-gray-700 text-sm mb-1">
                                            {field.label} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink focus:border-codedrift-pink outline-none transition-all"
                                            required
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Date of Birth & College */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 text-sm mb-1">
                                        Birth Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm mb-1">
                                        College Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter college name"
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Course Selection */}
                            <div>
                                <label className="block text-gray-700 text-sm mb-1">ITR Program</label>
                                <select className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none transition-all">
                                    <option>
                                        Full Stack Web Development - 02 June 2025 (90 Days)
                                    </option>
                                    <option>
                                        Full Stack Mobile Development - 02 June 2025 (90 Days)
                                    </option>
                                </select>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col md:flex-row gap-4 pt-2">
                                <Button type="submit" size="md" variant="pink" className="w-full shadow-md">
                                    Submit
                                </Button>
                                <Button type="reset" size="md" variant="outline" className="w-full shadow-md">
                                    Reset
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignupPage;
