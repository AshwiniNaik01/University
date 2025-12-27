import React from "react";
import { Link } from "react-router-dom";
import Image from "../../components/utility/Image";

const PageNotFound = () => {
  return (
    <section className="min-h-dvh flex items-center justify-center bg-gradient-to-br from-[#fdfbfb] to-[#eef1f5] p-6">
      <div className="text-center max-w-md">
        {/* Illustration */}
        <Image
          src="https://via.placeholder.com/400x300.png?text=404+Error+Illustration"
          alt="404 Error"
          className="w-80 mx-auto mb-8 hidden"
        />

        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-2">Oops! Page not found.</p>
        <p className="text-gray-600 mb-6">
          The page you're looking for might have been moved or does not exist.
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-3 bg-codedrift-gradient text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
        >
          Return to Home
        </Link>
      </div>
    </section>
  );
};

export default PageNotFound;
