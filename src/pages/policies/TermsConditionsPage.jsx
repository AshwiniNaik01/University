import React from "react";
import { Link } from "react-router-dom";

const TermsConditionsPage = () => {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Terms & Conditions
        </h1>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg">
          Welcome to <span className="text-codedrift-pink font-semibold">Code Drift</span>!  
          These Terms and Conditions govern the use of our services, including enrolling in and completing online courses.
        </p>
      </section>

      {/* Terms & Conditions Content */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto space-y-8 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              1. Introduction
            </h2>
            <p>
              The Terms and Conditions ("Agreement") govern the use of educational services provided by Code Drift 
              for online software courses. By enrolling in or using our services, applicants agree to comply with these terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              2. Acceptance of Terms
            </h2>
            <p>
              By using our services, including accessing our course materials and enrolling in courses, you agree to adhere 
              to these Terms and Conditions, our Privacy Policy, and any other applicable rules and regulations.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              3. Eligibility
            </h2>
            <p>
              Ready to dive into the world of programming? Here’s what you need:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>No prior experience required! Whether you’ve written zero lines of code or you're already a coding wizard, you’re welcome here!</li>
              <li>No age limits! Whether you’re 18 or 80, if you’re excited about programming, we want you on board!</li>
              <li>Just bring your curiosity and a passion for learning — no need for technical knowledge upfront.</li>
              <li>
                At Code Drift, we believe learning programming should be fun, creative, and all about the journey!
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              4. Course Enrollment
            </h2>
            <p>When enrolling in a course, applicants must:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Complete the registration process, including payment if applicable.</li>
              <li>Agree to the course schedule and any deadlines set by the class.</li>
              <li>Ensure they have access to necessary tools and technologies (e.g., internet access, a computer with required software, etc.).</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              5. Prohibited Activities
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Engaging in fraudulent or deceptive practices, such as sharing credentials or misrepresenting qualifications.</li>
              <li>Attempting to gain unauthorized access to course materials, assessments, or accounts.</li>
              <li>Sharing or distributing course materials without permission.</li>
              <li>Engaging in any activity that violates intellectual property laws or policies.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              6. Payment and Fees
            </h2>
            <p>
              Applicants are responsible for the payment of course fees. Payment details and pricing are outlined on the registration page.  
              Fees are non-refundable unless specified in the Refund Policy. Payment must be made before the course start unless 
              an installment plan is agreed upon.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              7. Course Materials
            </h2>
            <p>
              All provided materials, including video lectures, coding exercises, and documentation, are for personal educational use only 
              and may not be distributed or sold without our consent.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              8. Data Security and Privacy
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate information during registration and keep it up to date.</li>
              <li>Safeguard your login credentials to protect your account.</li>
              <li>Comply with all applicable data protection laws, including GDPR, where applicable.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              9. Refund Policy
            </h2>
            <p>
              If you are unsatisfied or unable to attend, you may be eligible for a refund according to our Refund Policy.  
              Please refer to the <Link to={'/policies/refund'} className="text-codedrift-pink font-semibold">Refund Policy page</Link> for details.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              10. Termination
            </h2>
            <p>
              Code Drift reserves the right to suspend or terminate your access if you violate these Terms, including engaging 
              in prohibited activities or failing to comply with payment requirements.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              11. Disclaimer of Liability
            </h2>
            <p>
              Code Drift does not guarantee employment or specific career outcomes. Success depends on individual efforts, 
              external factors, and industry conditions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              12. Changes to Terms and Conditions
            </h2>
            <p>
              We reserve the right to update or modify these Terms at any time. Continued use of our services after updates constitutes acceptance.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              13. Contact Information
            </h2>
            <p>
              For any questions, contact us at:  
              <span className="block mt-1 text-codedrift-pink font-semibold">
                admin@codedrift.co
              </span>
            </p>
          </div>

          <div className="pt-4 text-gray-700 italic">
            By enrolling in our courses or using our services, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsConditionsPage;
