import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // ✅ For mobile menu
import { codedriftLogoImage } from "../../access-assets/images";
import Image from "../utility/Image";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../utility/Button";
import LoginFormModal from "../auth/LoginFormModal";

const links = [
  { name: "Home", to: "/" },
  { name: "Courses", to: "/courses" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" },
  // { name: "Register", to: "/auth/register" },
  { name: "SkillUp Center", to: "/book" },
  // { name: "Feedback", to: "/feedback" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // This is used for stopping scrolling of the background, when the sidebar is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleOpenLoginModal = () => {
    if (isMenuOpen) setIsMenuOpen(!isMenuOpen);
    setIsLoginModalOpen(true);
  };

  return (
    <>
      <nav className="sticky top-0 z-[500] backdrop-blur-md bg-white/70 shadow-md border-b border-gray-200">
        {/* ✅ Animated Gradient Top Bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#ee4f7e] via-[#4cb7e5] to-[#ee4f7e] animate-gradient-x"></div>

        <div className="container">
          <div className="flex justify-between py-3 items-center">
            {/* ✅ Brand Logo & Name */}
            <Link to={"/"} className="flex items-center gap-2">
              <Image
                src={codedriftLogoImage}
                alt="Code Drift Logo"
                className="size-12 md:size-10 rounded-full shadow"
              />
              <p className="hidden md:inline text-2xl font-extrabold">
                <span className="text-codedrift-pink mr-2">Code</span>
                <span className="text-codedrift-blue">Drift</span>
              </p>
            </Link>

            {/* ✅ Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-0.5 xl:gap-3">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-500 
                                        ${
                                          isActive
                                            ? "text-white shadow-md bg-gradient-to-r from-[#ee4f7e] via-[#4cb7e5] to-[#ee4f7e] animate-gradient-x"
                                            : "text-gray-600 hover:text-codedrift-indigo hover:bg-codedrift-blue/10"
                                        }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <div className="flex items-center gap-6">
                <Button
                  onClick={handleOpenLoginModal}
                  variant="indigo"
                  size="md"
                  className="px-4 py-2"
                >
                  Login
                </Button>

                <Button
                  as="link"
                  to="/auth/register"
                  variant="pink"
                  size="md"
                  className="px-4 py-2"
                >
                  Register
                </Button>
              </div>
            </div>

            {/* ✅ Mobile Right Side (Courses + Hamburger) */}
            <div className="lg:hidden flex items-center gap-3">
              <NavLink
                to="/courses"
                className="px-4 py-2 rounded-full text-sm font-medium bg-codedrift-pink text-white hover:bg-codedrift-indigo-dark transition"
              >
                Courses
              </NavLink>

              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                <Menu className="w-6 h-6 text-codedrift-indigo" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ✅ Mobile Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* 🔳 Dark Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black backdrop-blur-sm z-[998]"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* 🪟 Sidebar */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 160, damping: 22 }}
              className="fixed top-0 right-0 w-64 h-full bg-white/70 backdrop-blur-lg z-[999] shadow-xl"
            >
              {/* ❌ Close Button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/60 hover:bg-white transition z-[100]"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>

              {/* 🖼️ Watermark Logo */}
              <div className="absolute inset-0 flex justify-center items-center opacity-10">
                <img
                  src={codedriftLogoImage}
                  alt="Logo"
                  className="w-32 h-32"
                />
              </div>

              {/* 📜 Mobile Menu Links */}
              <div className="relative z-10 overflow-y-auto h-full flex flex-col pt-16 pl-4 pr-8 gap-4">
                {links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? "text-white bg-gradient-to-r from-[#ee4f7e] to-[#4cb7e5]"
                          : "text-gray-700 hover:text-codedrift-indigo hover:bg-gray-100"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}

                <Button
                  onClick={handleOpenLoginModal}
                  variant="indigo"
                  size="md"
                  className="px-8 py-2 w-fit"
                >
                  Login
                </Button>

                <Button
                  as="link"
                  to="register"
                  variant="blue"
                  size="md"
                  className="px-8 py-2 w-fit"
                >
                  Register
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <LoginFormModal open={isLoginModalOpen} setOpen={setIsLoginModalOpen} />
    </>
  );
};

export default Navbar;
