import { Route, Routes } from "react-router-dom";

// Components & Pages
import RootLayout from "../layouts/RootLayout";
import SignupPage from "../pages/auth/SignupPage";
import BookDemoPage from "../pages/contact/BookDemoPage";
import BookListingPage from "../pages/contact/BookListingPage";
import ContactPage from "../pages/contact/ContactPage";
import FeedbackPage from "../pages/contact/FeedbackPage";
import CoursePage from "../pages/courses/CoursePage";
import CoursesPage from "../pages/courses/CoursesPage";
import AboutPage from "../pages/general/AboutPage";
import HomePage from "../pages/general/HomePage";
import PrivacyPolicyPage from "../pages/policies/PrivacyPolicyPage";
import RefundPolicyPage from "../pages/policies/RefundPolicyPage";
import TermsConditionsPage from "../pages/policies/TermsConditionsPage";
// import BookDetailsPage from '../pages/contact/BookDetailsPage';
import EventDetailsPage from "../components/programs/EventDetailsPage";
import InternshipDetailsPage from "../components/programs/InternshipDetailsPage";
import WebinarDetailsPage from "../components/programs/WebinarDetailsPage";
import WorkshopDetails from "../components/programs/WorkshopDetails";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import MentorPage from "../pages/mentors/MentorPage";
import MentorsPage from "../pages/mentors/MentorsPage";
import TestimonialsPage from "../pages/testimonials/TestimonialsPage";
// import EventDetailsPage from '../pages/contact/EventDetailsPage';
// import WebinarDetailsPage from '../pages/contact/WebinarDetailsPage';

const AppRouters = () => (
  <Routes>
    <Route element={<RootLayout />}>
      <Route path="/" element={<HomePage />} />

      {/* Course Section */}
      <Route path="/courses">
        <Route path="" element={<CoursesPage />} />
        <Route path="c/:courseId" element={<CoursePage />} />
      </Route>

      <Route path="/about" element={<AboutPage />} />

      <Route path="/contact" element={<ContactPage />} />

      {/* Book session section */}
      <Route path="/book">
        <Route index element={<BookDemoPage />} /> {/* or BookCategoryPage */}
        <Route path=":categorySlug" element={<BookListingPage />} />
        {/* <Route path=':categorySlug/:itemId' element={<BookDetailsPage />} /> */}
        <Route path=":categorySlug/:eventId" element={<EventDetailsPage />} />
        <Route path="workshop/:eventId" element={<WorkshopDetails />} />
      </Route>
      <Route path="/webinar/:webinarId" element={<WebinarDetailsPage />} />
      <Route
        path="/internship-session/:sessionId"
        element={<InternshipDetailsPage />}
      />

      {/* <Route path="/internship/:sessionId" element={<InternshipDetailsPage />} /> */}

      {/* Authentication pages */}
      <Route path="/auth">
        <Route path="register" element={<SignupPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      <Route path="/feedback" element={<FeedbackPage />} />

      {/* Mentor section */}
      <Route path="/mentors">
        <Route path="" element={<MentorsPage />} />
        <Route path="m/:mentorId" element={<MentorPage />} />
      </Route>

      {/* Policies */}
      <Route path="/policies">
        <Route path="terms-conditions" element={<TermsConditionsPage />} />
        <Route path="refund" element={<RefundPolicyPage />} />
        <Route path="privacy" element={<PrivacyPolicyPage />} />
      </Route>

      {/* Testimonial (feedback) section */}
      <Route path="/testimonials">
        <Route path="" element={<TestimonialsPage />} />
      </Route>

      {/* <Route path='/*' element={<PageNotFound />} /> */}
    </Route>
  </Routes>
);

export default AppRouters;
