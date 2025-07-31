import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Award, Star, ArrowLeft, CheckCircle2, PlayCircle, ChevronDown, ChevronUp, BookOpen, User, GraduationCap } from "lucide-react";
import { courseList } from "../../data/coursesList";
import { Accordion, AccordionItem } from "../../components/utility/Accordion";
import Image from "../../components/utility/Image";
import { Button } from "../../components/utility/Button";
import { Modal } from "../../components/utility/Modal";
import EnrollStrip from "../../components/courses/EnrollStrip";
import { useInView } from 'react-intersection-observer'

const EnrollFormModal = ({ open, setOpen, course }) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        // TODO: form submission logic
        alert('Enrolled successfully!')
        setOpen(false)
    }

    return (
        <>
            <Modal isOpen={open} onClose={() => setOpen(false)} variant="lg" scrollableBody={true}>
                <Modal.Header>Enroll for {course?.title || 'Selected Course'}</Modal.Header>

                <Modal.Body>
                    <form onSubmit={handleSubmit} className="space-y-6">
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

                        {/* Mobile & Email */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 text-sm mb-1">
                                    Mobile <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    placeholder="Enter mobile number"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm mb-1">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter email address"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* College Name */}
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

                        {/* Submit Button */}
                        <div className="pt-2">
                            <Button type="submit" variant="pink" size="md" className="w-full shadow-md">
                                Enroll
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

// ✅ Hero background images (replace with real assets)
const courseHeroImages = {
    1: "https://cdn.pixabay.com/photo/2015/06/24/15/45/code-820275_1280.jpg",
    2: "https://cdn.pixabay.com/photo/2017/06/08/19/09/programming-2389236_1280.jpg",
    3: "https://cdn.pixabay.com/photo/2020/06/23/20/43/programming-5336392_1280.jpg",
    4: "https://cdn.pixabay.com/photo/2017/08/30/01/05/python-2697880_1280.jpg",
    5: "https://cdn.pixabay.com/photo/2017/05/11/08/36/dot-net-2300420_1280.jpg",
    6: "https://cdn.pixabay.com/photo/2015/09/05/22/46/php-925468_1280.jpg",
};

// ✅ Dummy Mentor Image (replace with real later)
const mentorImage =
    "https://randomuser.me/api/portraits/men/32.jpg";

const CoursePage = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);

    const [showEnrollStrip, setShowEnrollStrip] = useState(false)

    let introRef = useRef(null)

    const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false)

    useEffect(() => {
        if (courseId) {
            const filteredCourse = courseList.find(
                (c) => c.id === parseInt(courseId)
            );
            setCourse(filteredCourse || null);
        }
    }, [courseId]);

    // Inside your component:
    const { ref: observeIntroRef, inView } = useInView({
        threshold: 0.6,
        rootMargin: '0px',
        skip: typeof window === 'undefined', // prevent issues on SSR
    })

    // Sync observer to your existing ref
    useEffect(() => {
        if (introRef.current) {
            observeIntroRef(introRef.current)
        }
    }, [introRef.current])

    // Watch inView change
    useEffect(() => {
        setShowEnrollStrip(!inView)
    }, [inView])


    if (!course) {
        return (
            <div className="container text-center py-20">
                <h2 className="text-2xl font-bold text-gray-700">Course not found</h2>
                <Link
                    to="/courses"
                    className="mt-4 inline-block bg-codedrift-pink text-white px-6 py-3 rounded-full shadow-md hover:bg-codedrift-indigo-dark transition"
                >
                    <ArrowLeft className="inline w-4 h-4 mr-2" /> Back to All Courses
                </Link>
            </div>
        );
    }


    function handleEnrollCourse() {
        setIsEnrollModalOpen(true)
    }


    return (
        <>

            <div className="relative min-h-dvh bg-gray-50">
                {/* ✅ Subtle Animated Background Pattern */}
                <div
                    className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] animate-pulse"
                    style={{ backgroundSize: "300px 300px" }}
                ></div>

                <div className="relative z-10">
                    {/* ✅ HERO SECTION */}
                    <section id='course-intro-section' ref={introRef} className="relative h-fit py-4 md:h-[65vh] flex flex-col items-center justify-center text-center rounded-b-[3rem] shadow-2xl overflow-hidden bg-gradient-to-br from-[#f43f5e] via-[#6366f1] to-[#4cb7e5] text-white">
                        {/* ✅ Optional Pattern Overlay */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
                        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

                        {/* ✅ Content */}
                        <div className="relative z-10 max-w-3xl mx-auto px-6">
                            <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg tracking-tight">
                                {course.name}
                            </h1>
                            <p className="mt-4 text-gray-100 max-w-xl mx-auto text-lg leading-relaxed drop-shadow">
                                {course.description}
                            </p>

                            {/* Mentor */}
                            <div className="flex items-center justify-center gap-3 mt-6">
                                <Image
                                    src={mentorImage}
                                    alt="Mentor"
                                    className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                                />
                                <Link to={`/mentors/m/${1}`} className="text-sm text-gray-100">
                                    Taught by <span className="font-semibold">John Doe</span>, Ex-Google Engineer
                                </Link>
                            </div>

                            {/* Course Stats */}
                            <div className="flex flex-wrap justify-center gap-4 mt-6">
                                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur-md shadow-md">
                                    <Calendar className="w-5 h-5 text-white" />
                                    <span className="text-sm font-medium">{course.duration}</span>
                                </div>

                                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur-md shadow-md">
                                    <Award className="w-5 h-5 text-white" />
                                    <span className="text-sm font-medium">Certificate Included</span>
                                </div>

                                <div className="flex items-center gap-1 bg-white/10 px-3 py-2 rounded-full backdrop-blur-md shadow-md">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    ))}
                                    <span className="text-sm font-medium ml-1">(4.9/5)</span>
                                </div>

                                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur-md shadow-md">
                                    <User className="w-5 h-5 text-white" />
                                    <span className="text-sm font-medium">1,200+ Enrolled</span>
                                </div>
                            </div>

                            <div className="mt-4">
                                <Button onClick={() => setIsEnrollModalOpen(true)} size="md" variant="gradient">Enroll Now</Button>
                            </div>
                        </div>
                    </section>



                    {/* ✅ What You’ll Learn */}
                    <section className="max-w-4xl mx-auto px-6 mt-12">
                        <h2 className="text-2xl font-bold text-codedrift-indigo mb-4 text-center">
                            What You’ll Learn
                        </h2>
                        <ul className="grid md:grid-cols-2 gap-3">
                            {[
                                "Build & deploy full-stack MERN apps",
                                "Master MongoDB, Express, React, Node.js",
                                "Crack coding interviews with DSA",
                                "Work on real-world portfolio projects",
                            ].map((item, i) => (
                                <li
                                    key={i}
                                    className="flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-3 rounded-lg shadow hover:shadow-md transition"
                                >
                                    <CheckCircle2 className="w-5 h-5 text-codedrift-blue" />
                                    <span className="text-sm text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* ✅ Glassmorphic Course Details */}
                    <div className="container mt-12">
                        <article
                            className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-xl p-8 md:p-12 leading-relaxed
                        prose max-w-none prose-p:leading-relaxed prose-li:leading-relaxed
                        prose-headings:text-codedrift-indigo prose-strong:text-gray-900 hover:shadow-2xl hover:scale-[1.01] transition-all duration-500"
                            dangerouslySetInnerHTML={{ __html: course.course_info_html }}
                        />
                    </div>

                    {/* ✅ Placeholder for Future Accordion */}
                    {/* 👉 We will add "Course Curriculum Accordion" here later */}
                    <div className="container mt-16">
                        <div className="text-center mb-8">
                            <h2 className="relative inline-block text-2xl md:text-3xl font-bold text-codedrift-indigo">
                                Course Curriculum
                                <span className="absolute left-1/2 -bottom-1 w-2/3 h-1 bg-gradient-to-r from-[#ee4f7e] to-[#4cb7e5] rounded-full transform -translate-x-1/2"></span>
                            </h2>
                        </div>

                        <Accordion allowMultiple={false}>
                            {/* ✅ Module 1 */}
                            <AccordionItem
                                header={
                                    <div className="w-full flex flex-col gap-2 md:flex-row md:items-center justify-between bg-[#fdf4f8] px-4 py-3 rounded-xl">
                                        <div className="flex items-center gap-2">
                                            <BookOpen className="w-5 h-5 text-codedrift-pink" />
                                            <span className="text-sm sm:text-base font-semibold text-codedrift-indigo">
                                                Module 1: JavaScript Basics
                                            </span>
                                        </div>
                                        <span className="w-fit text-xs sm:text-sm text-gray-600 bg-white border border-gray-300 px-2 py-0.5 rounded-full">
                                            3 Lectures • 42 min
                                        </span>
                                    </div>
                                }
                                expandIcon={<ChevronDown className="w-4 h-4 text-codedrift-blue" />}
                                collapseIcon={<ChevronUp className="w-4 h-4 text-codedrift-pink" />}
                            >
                                <ul className="space-y-3 mt-2">
                                    {[
                                        { type: "video", title: "Variables & Data Types", duration: "14:30" },
                                        { type: "video", title: "Functions & Loops", duration: "16:45" },
                                        { type: "video", title: "ES6+ Features", duration: "10:45" },
                                    ].map((item, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center justify-between bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition"
                                        >
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <PlayCircle className="w-4 h-4 text-codedrift-indigo" />
                                                <span className="text-sm">{item.title}</span>
                                            </div>
                                            <span className="text-xs text-gray-500">{item.duration}</span>
                                        </li>
                                    ))}
                                </ul>
                            </AccordionItem>

                            {/* ✅ Module 2 */}
                            <AccordionItem
                                header={
                                    <div className="w-full flex flex-col gap-2 md:flex-row md:items-center justify-between bg-[#f0f9ff] px-4 py-3 rounded-xl">
                                        <div className="flex items-center gap-2">
                                            <BookOpen className="w-5 h-5 text-codedrift-blue" />
                                            <span className="text-sm sm:text-base font-semibold text-codedrift-indigo">
                                                Module 2: React Fundamentals
                                            </span>
                                        </div>
                                        <span className="w-fit text-xs sm:text-sm text-gray-600 bg-white border border-gray-300 px-2 py-0.5 rounded-full">
                                            1 Article • 5 min
                                        </span>
                                    </div>
                                }
                                expandIcon={<ChevronDown className="w-4 h-4 text-codedrift-blue" />}
                                collapseIcon={<ChevronUp className="w-4 h-4 text-codedrift-pink" />}
                            >
                                <div className="bg-white px-4 py-3 rounded-lg text-sm text-gray-700 shadow-sm">
                                    📄 Learn components, props, state management, and build your first React app.
                                </div>
                            </AccordionItem>
                        </Accordion>
                    </div>


                    {/* ✅ CTA */}
                    <div className="mt-16 text-center pb-20">
                        <Button
                            as="link"
                            to="/courses#courses-list"
                        >
                            <ArrowLeft className="size-4" />
                            <span className="ml-2">
                                Explore Courses
                            </span>
                        </Button>
                    </div>
                </div>

                {!inView && <EnrollStrip handleEnrollCourse={handleEnrollCourse} course={course} />}

                <EnrollFormModal open={isEnrollModalOpen} setOpen={setIsEnrollModalOpen} course={course} />


            </div>

        </>
    );
};

export default CoursePage;
