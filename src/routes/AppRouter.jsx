import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Components & Pages
import HomePage from '../pages/general/HomePage';
import RootLayout from '../layouts/RootLayout';
import CoursesPage from '../pages/courses/CoursesPage';
import AboutPage from '../pages/general/AboutPage';
import ContactPage from '../pages/contact/ContactPage';
import BookDemoPage from '../pages/contact/BookDemoPage';
import CandidateCourseRegistrationPage from '../pages/courses/CandidateCourseRegistrationPage';
import FeedbackPage from '../pages/contact/FeedbackPage';

const AppRouters = () => (
    <Routes>
        {/* Dashboard route inside Layout */}
        <Route element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/about" element={<AboutPage />} />

            <Route path="/contact" element={<ContactPage />} />

            <Route path="/demo" element={<BookDemoPage />} />

            <Route path="/register" element={<CandidateCourseRegistrationPage />} />

            <Route path="/feedback" element={<FeedbackPage />} />
        </Route>
    </Routes>
);

export default AppRouters;
