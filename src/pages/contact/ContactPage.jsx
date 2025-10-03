import { useState } from "react";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { Button } from "../../components/utility/Button";
import { sendContactMessage } from "./contactApi";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaLinkedin,
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
  FaMapPin,
} from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          {/* ✅ Learning Institute Contact Info and Description */}
          <div className="order-2 md:order-1 space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-codedrift-indigo mb-4">
                Let’s Connect
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Fill out the form, and we’ll get back to you shortly.
              </p>

              {/* Contact Details */}
              <div className="space-y-4 text-gray-600">
                {/* Location */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-codedrift-pink flex-shrink-0 mt-1" />
                    <div>
                      <strong className="block text-gray-800 mb-1">
                        Locate Us:
                      </strong>
                      <address className="not-italic text-gray-700 leading-relaxed">
                        Office No 10, Ramrajya 1, Near Bhonsala Military School,
                        <br />
                        College Road, Nashik - 422005
                      </address>
                    </div>
                  </div>
                  <a
                    href="https://maps.app.goo.gl/r6KxMDfapqhGRbwn9"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open in Google Maps"
                    className="inline-flex items-center gap-2 text-codedrift-pink hover:text-codedrift-blue transition-colors font-semibold"
                  >
                    <FaMapPin size={18} className="animate-ping" />
                    View on Google Maps
                  </a>
                </div>

                {/* Email */}
                <p className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-codedrift-blue flex-shrink-0" />
                  <span>
                    <strong>Email:</strong> admin@codedrift.co
                  </span>
                </p>

                {/* Phone Numbers */}
                <p className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-codedrift-indigo flex-shrink-0" />
                  <span>
                    <strong>Phone:</strong>
                    <br />
                    +91 8430101013 <br />
                    {/* +91 7591010101 <br /> */}
                    +91 8378010108
                  </span>
                </p>

                {/* Working Hours */}
                <p className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-codedrift-pink flex-shrink-0" />
                  <span>
                    <strong>Working Hours:</strong> Mon – Sat, 9AM – 6PM
                  </span>
                </p>
              </div>
            </div>

            {/* {/* About CodeDrift: learning insitu description */}
            <div className="text-gray-700">
              <h3 className="text-xl font-semibold mb-2">About CodeDrift</h3>
              <p>
                CodeDrift is committed to providing quality training and
                innovative tech solutions. We empower learners and organizations
                with the latest skills and technology.
              </p>
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
                variant="pink"
                disabled={loading}
              >
                {loading ? "Sending..." : "Submit"}
              </Button>
            </form>
          </div>
        </div>
      </footer>

      {/* Toast container for this page only */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default ContactPage;
