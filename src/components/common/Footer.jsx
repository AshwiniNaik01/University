import React from "react";
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import Image from "../utility/Image";
import { codedriftLogoImage, sgbauLogoImage } from "../../access-assets/images";
import {
  FaFacebook,
  FaYoutube,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] py-12 md:py-24 overflow-hidden border-t border-gray-200">
      {/* Decorative Backgrounds */}
      <Image
        src={sgbauLogoImage}
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
        {/* Academic Programs */}
<div>
  <h3 className="text-xl font-semibold text-gray-800 mb-4 tracking-wide">
    Academic Programs
  </h3>
  <ul className="space-y-2 text-gray-600 text-sm">
    <li>
      <Link to="/courses" className="hover:text-codedrift-indigo transition-all">
        Medical Programs
      </Link>
    </li>
    <li>
      <Link to="/courses" className="hover:text-codedrift-indigo transition-all">
        Engineering & Technology
      </Link>
    </li>
    <li>
      <Link to="/courses" className="hover:text-codedrift-indigo transition-all">
        Arts & Science
      </Link>
    </li>
    <li>
      <Link to="/courses" className="hover:text-codedrift-indigo transition-all">
        Management Studies
      </Link>
    </li>
    <li>
      <Link to="/courses" className="hover:text-codedrift-indigo transition-all">
        Research (Ph.D.)
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
              src={sgbauLogoImage}
              alt="Sant Gadge Baba Amravati University"
              className="w-32 mb-4"
            />
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs text-center md:text-left">
              <strong className="text-gray-800 font-medium">Sant Gadge Baba Amravati University</strong>
              <br />
             A premier institution dedicated to academic excellence, research advancement, and holistic student development.
            </p>
          </div>
        </div>

        {/* Address Section outside grid */}
        {/* <div className="max-w-full bg-opacity-70 backdrop-blur-md flex flex-col items-center md:items-start text-gray-600 text-base space-y-4">
          <h4 className="text-md font-bold text-codedrift-pink mb-2 border-b-2 border-codedrift-pink w-full max-w-xs text-center md:text-left">
            Our Location
          </h4>
          <p className="font-semibold text-md text-center md:text-left">
            Office No 10, Ramrajya 1, Near Bhonsala Military School, College
            Road, Nashik - 422005
          </p>
          <a
            href="https://maps.app.goo.gl/r6KxMDfapqhGRbwn9"
            target="_blank"
            rel="noopener noreferrer"
            title="Open in Google Maps"
            className="flex items-center gap-3 text-white bg-codedrift-pink hover:bg-codedrift-blue transition-colors duration-300 font-semibold rounded-md px-4 py-2 shadow-md hover:shadow-lg"
          >
            <FaMapMarkerAlt size={22} className="animate-pulse" />
            <span>View on Google Maps</span>
          </a>
        </div> */}
<div className="max-w-full bg-opacity-70 backdrop-blur-md flex flex-col items-center md:items-start text-gray-600 text-base space-y-4">
  <h4 className="text-md font-bold text-codedrift-indigo mb-2 border-b-2 border-codedrift-indigo w-full max-w-xs text-center md:text-left">
    Our Location
  </h4>

  <p className="font-semibold text-md text-center md:text-left">
    Sant Gadge Baba Amravati University, <br />
    Camp Area, Amravati, Maharashtra – 444602
  </p>

  {/* Google Map Embed */}
  {/* <div className="w-full max-w-md h-[220px] rounded-md overflow-hidden border border-gray-300 shadow-sm">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d29811.09763993472!2d77.804813!3d20.93696!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd6a477f4c8ee7f%3A0x373b8b1119db0445!2sSant%20Gadge%20Baba%20Amravati%20University!5e0!3m2!1sen!2sin!4v1766746794814!5m2!1sen!2sin"
      className="w-full h-full border-0"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Sant Gadge Baba Amravati University Map"
    />
  </div> */}

  <a
    href="https://maps.app.goo.gl/eR8J2EyxpUarXvBN8"
    target="_blank"
    rel="noopener noreferrer"
    title="Open in Google Maps"
    className="flex items-center gap-3 text-white bg-codedrift-indigo hover:bg-indigo-700 transition-colors duration-300 font-semibold rounded-md px-4 py-2 shadow-md hover:shadow-lg"
  >
    <FaMapMarkerAlt size={22} className="animate-pulse" />
    <span>View on Google Maps</span>
  </a>
</div>
          


        {/* Divider */}
        <div className="my-10 border-t border-gray-300"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          {/* Social Media */}
          <div className="flex gap-4">
            {[
              {
                href: "https://wa.me/918430101013",
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
                href: "tel:+918430101013",
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
            <span className="font-medium text-gray-700">Sant Gadge Baba Amravati University</span>. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
