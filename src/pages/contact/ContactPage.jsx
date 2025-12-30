import { useFormik } from "formik";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import FloatingTechLogos from "../../components/decor/FloatingTechLogos";
import { Button } from "../../components/utility/Button";
import { sendContactMessage } from "./contactApi";

// ✅ Yup validation schema for form fields
const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .matches(
      /^[A-Za-z\s'-]+$/,
      "Name cannot contain numbers or special characters except spaces, apostrophes, and hyphens"
    )
    .required("Name is required"),

  email: Yup.string()
    .required("Email is required")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please enter a valid email address"
    ),
  phone: Yup.string()
    .required("Phone is required")
    .matches(
      /^[789]\d{9}$/,
      "Phone must be 10 digits and start with 7, 8, or 9"
    )
    .matches(/^[0-9]{10}$/, "Phone must be exactly 10 digits")
    .test(
      "not-repetitive",
      "Phone number cannot be repetitive digits or common invalid numbers",
      (value) => {
        if (!value) return false;
        if (/^(\d)\1{9}$/.test(value)) return false;
        const invalids = [
          "1234567890",
          "0987654321",
          "1111111111",
          "2222222222",
        ];
        if (invalids.includes(value)) return false;
        return true;
      }
    ),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
});

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [mapLoading, setMapLoading] = useState(true);

  // ✅ Formik handles form state, validation, and submission
  const formik = useFormik({
    initialValues: { name: "", email: "", phone: "", message: "" },
    validationSchema,
    validateOnBlur: true, // validate when leaving a field
    validateOnChange: true, //  validate only on blur, not on each keystroke
    onSubmit: async (values, { resetForm, setErrors }) => {
      setLoading(true);
      try {
        const result = await sendContactMessage(values);

        if (result?.success === false && result?.errors) {
          setErrors(result.errors);
        } else {
          toast.success(result?.message || "Message sent successfully!");
          resetForm();
        }
      } catch (err) {
        toast.error(err?.message || "Failed to send message");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      {/* ✅ Contact Section / Footer */}
      <footer className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-start">
          {/* ✅ Learning Institute Contact Info and Description */}
          <div className="order-2 md:order-1 space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-codedrift-indigo mb-4 tracking-wide">
                Administration & Contact
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Sant Gadge Baba Amravati University – Administrative Contacts
              </p>

              {/* Contact Details */}
              <div className="space-y-4 text-gray-600">
                {/* Location */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-codedrift-pink flex-shrink-0 mt-1" />
                    <div>
                      <strong className="block text-gray-800 mb-1">
                        University Address:
                      </strong>
                      <address className="not-italic text-gray-700 leading-relaxed">
                        Sant Gadge Baba Amravati University <br />
                        Amravati, Maharashtra – 444602
                      </address>
                    </div>
                  </div>
                </div>

                <p className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-codedrift-indigo flex-shrink-0" />
                  <span>
                    <strong>University Phone:</strong> 91-0721-2662358
                  </span>
                </p>

                <p className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-codedrift-blue flex-shrink-0" />
                  <span>
                    <strong>Email:</strong> reg@sgbau.ac.in
                  </span>
                </p>

                {/* Working Hours */}
                <p className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-codedrift-pink flex-shrink-0" />
                  <span>
                    <strong>Working Hours:</strong> Mon – Sat, 9AM – 6PM
                  </span>
                </p>

                <a
                  href="https://maps.app.goo.gl/r6KxMDfapqhGRbwn9"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open in Google Maps"
                  className="block mt-4 rounded-lg overflow-hidden shadow-lg cursor-pointer relative"
                >
                  <div className="rounded-lg p-[3px] border-2 border-blue-500 shadow-lg cursor-pointer relative">
                    {/* Loading spinner placeholder */}
                    {mapLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                        <div
                          className="
        w-12 h-12
        border-4 border-t-transparent
        rounded-full
        animate-spin
        border-blue-500
        border-r-pink-500
        border-b-purple-500
        border-l-indigo-500
        drop-shadow-lg
      "
                          style={{ animationDuration: "1.2s" }}
                        ></div>
                      </div>
                    )}

                    <iframe
                      title="Office Location"
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d29811.09763993472!2d77.804813!3d20.93696!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd6a477f4c8ee7f%3A0x373b8b1119db0445!2sSant%20Gadge%20Baba%20Amravati%20University!5e0!3m2!1sen!2sin!4v1766824570326!5m2!1sen!2sin"
                      width="100%"
                      height="200"
                      className="rounded-md"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      onLoad={() => setMapLoading(false)}
                    ></iframe>
                  </div>
                </a>
              </div>
            </div>

            {/* Future Scope: Social Media Links  */}
            {/* <div>
            <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
            <div className="flex gap-4 text-white">
              <a
                href="https://www.linkedin.com/company/codedrift"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-[#0077b5] hover:bg-[#005582] transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/codedrift"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-[#1877f2] hover:bg-[#0e58d7] transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/yourwhatsappnumber"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-[#25d366] hover:bg-[#1da851] transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/codedrift"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-[#e1306c] hover:bg-[#a22651] transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div> */}
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-r from-[#ee4f7e]/10 to-[#4cb7e5]/10 p-8 rounded-2xl shadow-md order-1 md:order-2">
            <form
              className="space-y-5"
              onSubmit={formik.handleSubmit}
              noValidate
            >
              {/* Name */}
              <div>
                <label
                  className="block text-gray-700 text-sm mb-1"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={
                    formik.touched.name && formik.errors.name ? "true" : "false"
                  }
                  aria-describedby="name-error"
                />
                {formik.touched.name && formik.errors.name && (
                  <p id="name-error" className="text-red-500 text-sm mt-1">
                    {formik.errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  className="block text-gray-700 text-sm mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={
                    formik.touched.email && formik.errors.email
                      ? "true"
                      : "false"
                  }
                  aria-describedby="email-error"
                />
                {formik.touched.email && formik.errors.email && (
                  <p id="email-error" className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  className="block text-gray-700 text-sm mb-1"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={
                    formik.touched.phone && formik.errors.phone
                      ? "true"
                      : "false"
                  }
                  aria-describedby="phone-error"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p id="phone-error" className="text-red-500 text-sm mt-1">
                    {formik.errors.phone}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  className="block text-gray-700 text-sm mb-1"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Write your message..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={
                    formik.touched.message && formik.errors.message
                      ? "true"
                      : "false"
                  }
                  aria-describedby="message-error"
                />
                {formik.touched.message && formik.errors.message && (
                  <p id="message-error" className="text-red-500 text-sm mt-1">
                    {formik.errors.message}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <Button
                size="md"
                type="submit"
                className="w-full"
                variant="indigo"
                disabled={loading}
              >
                {loading ? "Sending..." : "Submit"}
              </Button>
            </form>
          </div>
        </div>

        {/* {/* About CodeDrift: learning insitu description */}
        <div className="max-w-8xl mx-auto mt-25 text-center text-gray-600 px-6">
          <div className="relative">
            {" "}
            {/* ✅ add relative here */}
            <FloatingTechLogos />
            <h3 className="text-3xl font-semibold mb-3 text-codedrift-indigo">
              About the University
            </h3>
            <span className="absolute left-1/2 -bottom-2 w-2/3 h-1 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-full transform -translate-x-1/2"></span>
          </div>
          <p className="max-w-4xl text-lg mx-auto leading-relaxed mt-6">
            Sant Gadge Baba Amravati University is a leading public university
            committed to excellence in higher education, research, and community
            engagement.
          </p>
        </div>
      </footer>

      {/* Toast container for this page only */}
      <ToastContainer position="top-right" autoClose={3000} />
      {/* </div> */}
    </>
  );
};

export default ContactPage;
