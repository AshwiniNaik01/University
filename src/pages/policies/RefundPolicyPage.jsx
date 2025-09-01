import React from "react";

const RefundPolicyPage = () => {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Refund Policy
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg">
          At <span className="text-codedrift-pink font-semibold">Code Drift Academy</span>,  
          we strive to provide the best learning experience for all our students.  
          Please review our refund policy below.
        </p>
      </section>

      {/* Refund Policy Content */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto space-y-8 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              1. No Refunds After Enrollment
            </h2>
            <p>
              Once you have enrolled in a course and the payment has been processed, we are unable to provide any refunds.  
              We recommend reviewing the course details, syllabus, and prerequisites before making a purchase to ensure the course meets your expectations.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              2. Course Availability and Content
            </h2>
            <p>
              We ensure that all course content is delivered as advertised. In case of any technical issues,  
              our support team will be available to assist you. However, no refunds will be issued for course content  
              delivery delays or issues unless specified otherwise in certain cases.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              3. Account Termination
            </h2>
            <p>
              If your account is terminated due to violation of our Terms and Conditions or engaging in prohibited activities,  
              no refund will be provided for the course fees.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              4. Course Cancellations
            </h2>
            <p>
              In rare cases where Code Drift Academy is unable to offer a course as planned (e.g., due to unforeseen circumstances),  
              we may offer a transfer to another course or a credit towards future courses, but no cash refunds will be issued.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              5. Contact Support
            </h2>
            <p>
              If you have any concerns or issues regarding our courses, please contact our support team at:  
              <span className="block mt-1 text-codedrift-pink font-semibold">
                admin@codedrift.co
              </span>
              We are here to assist you and ensure you have the best learning experience possible.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              6. Policy Updates
            </h2>
            <p>
              Code Drift Academy reserves the right to update or modify this Refund Policy at any time.  
              Any changes will be posted on this page, and we encourage you to review the policy periodically.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RefundPolicyPage;
