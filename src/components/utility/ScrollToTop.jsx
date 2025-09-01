// import { ArrowUp, Phone } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const ScrollToTop = () => {
//     const { pathname } = useLocation();
//     const [showButton, setShowButton] = useState(false);

//     // Scroll to top on route change
//     useEffect(() => {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     }, [pathname]);

//     // Show scroll-to-top button when user scrolls down
//     useEffect(() => {
//         const onScroll = () => {
//             setShowButton(window.scrollY > 300);
//         };
//         window.addEventListener('scroll', onScroll);
//         return () => window.removeEventListener('scroll', onScroll);
//     }, []);

//     // ⛔ Don't force hide the button on click
//     const handleClick = () => {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     };

//     return (
//         <div className="fixed bottom-8 right-5 z-[1000] flex flex-col items-end gap-4">
//             <Link
//                 to="/contact"
//                 title="Contact Us"
//                 className="p-3 rounded-full bg-codedrift-pink text-white shadow-lg hover:bg-codedrift-indigo-dark hover:scale-105 transition-all duration-300 ease-in-out"
//             >
//                 <Phone className="w-5 h-5" />
//             </Link>


//             <button
//                 onClick={handleClick}
//                 title="Back to Top"
//                 className={`transition-all duration-300 transform cursor-pointer ${showButton
//                     ? 'opacity-100 scale-100'
//                     : 'opacity-0 scale-90'
//                     } bg-white text-codedrift-indigo border border-gray-600 p-3 rounded-full shadow-lg animate-pulse`}
//             >
//                 <ArrowUp className="size-5" />
//             </button>

//         </div>
//     );
// };

// export default ScrollToTop;



// import { ArrowUp, Phone } from 'lucide-react';
// import { FaWhatsapp, FaFacebook, FaInstagram, FaLinkedin, FaPhone } from 'react-icons/fa';
// import { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const ScrollToTop = () => {
//   const { pathname } = useLocation();
//   const [showButton, setShowButton] = useState(false);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }, [pathname]);

//   useEffect(() => {
//     const onScroll = () => {
//       setShowButton(window.scrollY > 300);
//     };
//     window.addEventListener('scroll', onScroll);
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   const handleClick = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <div className="fixed bottom-8 right-5 z-[1000] flex flex-col items-end gap-3">

//       {/* WhatsApp */}
//      <a
//   href="https://wa.me/91XXXXXXXXXX"
//   target="_blank"
//   rel="noopener noreferrer"
//   title="WhatsApp"
//   className="p-3 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 hover:scale-105 transition-all duration-300"
// >
//   <FaWhatsapp className="w-5 h-5" />
// </a>


//       {/* LinkedIn */}
//      <a
//   href="https://in.linkedin.com/company/codedrift"
//   target="_blank"
//   rel="noopener noreferrer"
//   title="LinkedIn"
//   className="p-3 rounded-full bg-[#0077b5] text-white shadow-lg hover:bg-[#005582] hover:scale-105 transition-all duration-300"
// >
//   <FaLinkedin className="w-5 h-5" />
// </a>


//       {/* Facebook */}
//       <a
//         href="https://www.facebook.com/codedrift.co/"
//         target="_blank"
//         rel="noopener noreferrer"
//         title="Facebook"
//         className="p-3 rounded-full bg-[#1877F2] text-white shadow-lg hover:bg-[#145dbf] hover:scale-105 transition-all duration-300"
//       >
//         <FaFacebook className="w-5 h-5" />
//       </a>

//       {/* Instagram */}
//       <a
//         href="https://www.instagram.com/codedrift.co/"
//         target="_blank"
//         rel="noopener noreferrer"
//         title="Instagram"
//         className="p-3 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white shadow-lg hover:scale-105 transition-all duration-300"
//       >
//         <FaInstagram className="w-5 h-5" />
//       </a>

//       {/* Phone */}
//       <Link
//         to="/contact"
//         title="Contact Us"
//         className="p-3 rounded-full bg-codedrift-pink text-white shadow-lg hover:bg-codedrift-indigo-dark hover:scale-105 transition-all duration-300"
//       >
//         <FaPhone className="w-5 h-5" />
//       </Link>

//       {/* Scroll to Top */}
//       <button
//         onClick={handleClick}
//         title="Back to Top"
//         className={`transition-all duration-300 transform cursor-pointer ${showButton
//           ? 'opacity-100 scale-100'
//           : 'opacity-0 scale-90'
//           } bg-white text-codedrift-indigo border border-gray-600 p-3 rounded-full shadow-lg animate-pulse`}
//       >
//         <ArrowUp className="size-5" />
//       </button>
//     </div>
//   );
// };

// export default ScrollToTop;

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaYoutube
} from 'react-icons/fa';
import { ArrowUp, ChevronUp, ChevronDown } from 'lucide-react';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleIcons = () => setIsOpen(prev => !prev);

  return (
    <div className="fixed bottom-5 right-5 z-[1000] flex flex-col items-end gap-3">

     

      {/* Social Icons */}
      <div
        className={`flex flex-col items-end gap-3 transition-all duration-500 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
      >
        {/* WhatsApp */}
        <a
          href="https://wa.me/91XXXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          title="WhatsApp"
          className="p-3 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 hover:scale-105 transition-all duration-300"
        >
          <FaWhatsapp className="w-5 h-5" />
        </a>

        {/* LinkedIn */}
        <a
          href="https://in.linkedin.com/company/codedrift"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
          className="p-3 rounded-full bg-[#0077b5] text-white shadow-lg hover:bg-[#005582] hover:scale-105 transition-all duration-300"
        >
          <FaLinkedin className="w-5 h-5" />
        </a>

         {/* Youtube */}
        <a
          href="https://www.youtube.com/@CodeDriftAcademy"
          target="_blank"
          rel="noopener noreferrer"
          title="Youtube"
          className="p-3 rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 hover:scale-105 transition-all duration-300"
        >
          <FaYoutube className="w-5 h-5" />
        </a>


        {/* Facebook */}
        <a
          href="https://www.facebook.com/codedrift.co/"
          target="_blank"
          rel="noopener noreferrer"
          title="Facebook"
          className="p-3 rounded-full bg-[#1877F2] text-white shadow-lg hover:bg-[#145dbf] hover:scale-105 transition-all duration-300"
        >
          <FaFacebook className="w-5 h-5" />
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/codedrift.co/"
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram"
          className="p-3 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white shadow-lg hover:scale-105 transition-all duration-300"
        >
          <FaInstagram className="w-5 h-5" />
        </a>

        {/* Phone */}
        <Link
          to="/contact"
          title="Contact Us"
          className="p-3 rounded-full bg-codedrift-pink text-white shadow-lg hover:bg-codedrift-indigo-dark hover:scale-105 transition-all duration-300"
        >
          <FaPhone className="w-5 h-5" />
        </Link>
      </div>

      {/* Toggle Button - Always at Bottom */}
      <button
        onClick={toggleIcons}
        title={isOpen ? 'Hide Social Icons' : 'Show Social Icons'}
        className="p-3 rounded-full bg-white text-gray-800 shadow-xl hover:scale-110 transition-all duration-300"
      >
        {isOpen ? (
          <ChevronDown className="w-5 h-5 rotate-180 transition-transform duration-300" />
        ) : (
          <ChevronUp className="w-5 h-5 transition-transform duration-300" />
        )}
      </button>

       {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={handleScrollTop}
          title="Back to Top"
          className="bg-white text-codedrift-indigo border border-gray-600 p-3 rounded-full shadow-lg animate-pulse hover:scale-105 transition-all duration-300"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
