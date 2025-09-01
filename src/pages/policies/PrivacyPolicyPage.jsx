import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Privacy Policy
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg">
          At <span className="text-codedrift-pink font-semibold">Code Drift</span>,  
          we are committed to protecting your privacy. This policy explains how we collect, use,  
          and safeguard your information when you use our services.
        </p>
      </section>

      {/* Policy Content */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto space-y-8 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              Information We Collect
            </h2>
            <p>
              We may collect personal information you provide directly, such as your name, email address,  
              and phone number. We may also collect information about your usage of our services  
              and interactions with us.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and improve our services.</li>
              <li>Respond to inquiries and provide customer support.</li>
              <li>Send updates, promotions, and other service-related information.</li>
              <li>Analyze usage trends to enhance user experience.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              How We Share Your Information
            </h2>
            <p>
              We do not sell, trade, or transfer your personal information to outside parties, except:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Service providers who help us operate our website and services.</li>
              <li>Regulatory authorities or legal entities if required by law.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              Data Security
            </h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal  
              information from unauthorized access, disclosure, alteration, or destruction.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              Your Rights
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access, update, or delete your personal information.</li>
              <li>Opt-out of receiving marketing communications.</li>
              <li>Request a copy of your information in a portable format.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted here,  
              and we encourage you to review this policy periodically.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              Contact Us
            </h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or our data practices,  
              please contact us at:  
              <span className="block mt-1 text-codedrift-pink font-semibold">
                admin@codedrift.co
              </span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
