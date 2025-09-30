import React from "react";
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import Image from "../utility/Image";
import { codedriftLogoImage } from "../../access-assets/images";
import {
  FaFacebook,
  FaYoutube,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
  FaPhone,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] py-12 md:py-24 overflow-hidden border-t border-gray-200">
      {/* Decorative Backgrounds */}
      <Image
        src={codedriftLogoImage}
        alt="Code Drift Logo Background"
        className="absolute opacity-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[28rem]"
      />
      <div className="absolute top-0 left-0 w-72 h-72 bg-codedrift-pink opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-codedrift-blue opacity-10 rounded-full blur-3xl"></div>

      <div className="container relative z-10">
        {/* Grid Section */}
        <div className="grid md:grid-cols-4 gap-12 text-center md:text-left">
          {/* Company */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 tracking-wide">
              Company
            </h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>
                <Link
                  to="/about"
                  className="hover:text-codedrift-pink transition-all"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-codedrift-pink transition-all"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/register"
                  className="hover:text-codedrift-pink transition-all"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses & Services */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 tracking-wide">
              Courses & Services
            </h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>
                <Link
                  to="/courses"
                  className="hover:text-codedrift-pink transition-all"
                >
                  MERN Stack JavaScript
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="hover:text-codedrift-pink transition-all"
                >
                  Python Full Stack
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="hover:text-codedrift-pink transition-all"
                >
                  Explore All
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 tracking-wide">
              Policies
            </h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              {/* <li>
                <Link
                  to="/policies/terms-conditions"
                  className="hover:text-codedrift-pink transition-all"
                >
                  Terms & Conditions
                </Link>
              </li> */}
              <li>
                <Link
                  to="/policies/refund"
                  className="hover:text-codedrift-pink transition-all"
                >
                  Policy and Refund Guidelines
                </Link>
              </li>
              <li>
                {/* <Link
                  to="/policies/privacy"
                  className="hover:text-codedrift-pink transition-all"
                >
                  Privacy Policy
                </Link> */}
              </li>
            </ul>
          </div>

          {/* Branding Section */}
          <div className="flex flex-col items-center md:items-start">
            <Image
              src={codedriftLogoImage}
              alt="Code Drift Logo"
              className="w-32 mb-4"
            />
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs text-center md:text-left">
              <strong className="text-gray-800 font-medium">Code Drift</strong>
              <br />
              Your ultimate resource for coding and programming knowledge.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-gray-300"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          {/* Social Media */}
          <div className="flex gap-4">
            {[
              {
                href: "https://wa.me/91XXXXXXXXXX",
                icon: <FaWhatsapp size={18} />,
              },
              {
                href: "https://www.linkedin.com/company/codedrift/",
                icon: <FaLinkedinIn size={18} />,
              },
              {
                href: "https://www.youtube.com/@CodeDriftAcademy",
                icon: <FaYoutube size={18} />,
              },
              {
                href: "https://www.facebook.com/codedrift.co/",
                icon: <FaFacebook size={18} />,
              },
              {
                href: "https://www.instagram.com/codedrift.co/",
                icon: <FaInstagram size={18} />,
              },
              {
                internal: true,
                to: "/contact",
                icon: <FaPhone size={18} />,
              },
            ].map((social, i) =>
              social.internal ? (
                <Link
                  key={i}
                  to={social.to}
                  title="Contact Us"
                  className="p-2 rounded-full bg-white shadow-md transition-all duration-300 hover:scale-110 
                   hover:text-white hover:bg-[linear-gradient(135deg,#ee4f7e_0%,#4cb7e5_100%)]"
                >
                  {social.icon}
                </Link>
              ) : (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.href}
                  className="p-2 rounded-full bg-white shadow-md transition-all duration-300 hover:scale-110 
                   hover:text-white hover:bg-[linear-gradient(135deg,#ee4f7e_0%,#4cb7e5_100%)]"
                >
                  {social.icon}
                </a>
              )
            )}
          </div>

          {/* Copyright */}
          <p className="text-gray-500">
            © {new Date().getFullYear()}{" "}
            <span className="font-medium text-gray-700">Code Drift</span>. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
