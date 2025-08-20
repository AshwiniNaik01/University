// import { MapPin, Mail, Phone, Clock } from "lucide-react";
// import { Button } from "../../components/utility/Button";
// const ContactPage = () => {
//     return (
//         <footer className="py-16 px-4 bg-white">
//             <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">

//                 {/* Contact Information (Left on Large, Bottom on Small) */}
//                 <div className="order-2 md:order-1">
//                     <h2 className="text-3xl font-bold text-codedrift-indigo mb-4">
//                         Let’s Connect
//                     </h2>
//                     <p className="text-gray-700 leading-relaxed mb-6">
//                         Fill out the form, and we’ll get back to you shortly.
//                         Our team is here to help you with any questions you may have.
//                     </p>

//                     <div className="space-y-4 text-gray-600">
//                         <p className="flex items-start gap-3">
//                             <MapPin className="w-5 h-5 text-codedrift-pink flex-shrink-0" />
//                             <span>
//                                 <strong>Locate Us:</strong>
//                                 <br />
//                                 Office No 10, Ramrajya 1, Near Bhonsala Military School,
//                                 College Road, Nashik - 422005
//                             </span>
//                         </p>
//                         <p className="flex items-center gap-3">
//                             <Mail className="w-5 h-5 text-codedrift-blue flex-shrink-0" />
//                             <span>
//                                 <strong>Email:</strong> admin@codedrift.co
//                             </span>
//                         </p>
//                         <p className="flex items-start gap-3">
//                             <Phone className="w-5 h-5 text-codedrift-indigo flex-shrink-0" />
//                             <span>
//                                 <strong>Phone:</strong>
//                                 <br />+91 8430101013 <br />+91 7591010101 <br />+91 8378010108
//                             </span>
//                         </p>
//                         <p className="flex items-center gap-3">
//                             <Clock className="w-5 h-5 text-codedrift-pink flex-shrink-0" />
//                             <span>
//                                 <strong>Working Hours:</strong> Mon – Sat, 9AM – 6PM
//                             </span>
//                         </p>
//                     </div>
//                 </div>

//                 {/* Contact Form (Right on Large, Top on Small) */}
//                 <div className="bg-gradient-to-r from-[#ee4f7e]/10 to-[#4cb7e5]/10 p-8 rounded-2xl shadow-md order-1 md:order-2">
//                     <form className="space-y-5">
//                         <div>
//                             <label className="block text-gray-700 text-sm mb-1">Name</label>
//                             <input
//                                 type="text"
//                                 placeholder="Enter your name"
//                                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 text-sm mb-1">Email</label>
//                             <input
//                                 type="email"
//                                 placeholder="Enter your email"
//                                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 text-sm mb-1">Phone</label>
//                             <input
//                                 type="tel"
//                                 placeholder="Enter your phone number"
//                                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 text-sm mb-1">Message</label>
//                             <textarea
//                                 rows="4"
//                                 placeholder="Write your message..."
//                                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
//                             ></textarea>
//                         </div>

//                         <Button size="md" type="submit" className="w-full" variant="pink">
//                             Submit
//                         </Button>
//                     </form>
//                 </div>
//             </div>
//         </footer>
//     );
// };

// export default ContactPage;



// import { useState } from "react";
// import { MapPin, Mail, Phone, Clock } from "lucide-react";
// import { Button } from "../../components/utility/Button";
// import { sendContactMessage } from "./contactApi";
// import { toast } from "react-toastify";
// // import { sendContactMessage } from "../../api/contactApi";

// const ContactPage = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setLoading(true);

//   //   try {
//   //     const result = await sendContactMessage(form);
//   //     alert(result?.message || "Message sent successfully!");
//   //     setForm({ name: "", email: "", phone: "", message: "" });
//   //   } catch (err) {
//   //     alert(err?.message || "Failed to send message");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);

//   try {
//     const result = await sendContactMessage(form);
//     toast.success(result?.message || "Message sent successfully!");
//     setForm({ name: "", email: "", phone: "", message: "" });
//   } catch (err) {
//     toast.error(err?.message || "Failed to send message");
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <footer className="py-16 px-4 bg-white">
//       <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        
//         {/* Contact Information */}
//         <div className="order-2 md:order-1">
//           <h2 className="text-3xl font-bold text-codedrift-indigo mb-4">
//             Let’s Connect
//           </h2>
//           <p className="text-gray-700 leading-relaxed mb-6">
//             Fill out the form, and we’ll get back to you shortly.
//           </p>
//           <div className="space-y-4 text-gray-600">
//             <p className="flex items-start gap-3">
//               <MapPin className="w-5 h-5 text-codedrift-pink flex-shrink-0" />
//               <span>
//                 <strong>Locate Us:</strong>
//                 <br />
//                 Office No 10, Ramrajya 1, Near Bhonsala Military School,
//                 College Road, Nashik - 422005
//               </span>
//             </p>
//             <p className="flex items-center gap-3">
//               <Mail className="w-5 h-5 text-codedrift-blue flex-shrink-0" />
//               <span>
//                 <strong>Email:</strong> admin@codedrift.co
//               </span>
//             </p>
//             <p className="flex items-start gap-3">
//               <Phone className="w-5 h-5 text-codedrift-indigo flex-shrink-0" />
//               <span>
//                 <strong>Phone:</strong>
//                 <br />+91 8430101013 <br />+91 7591010101 <br />+91 8378010108
//               </span>
//             </p>
//             <p className="flex items-center gap-3">
//               <Clock className="w-5 h-5 text-codedrift-pink flex-shrink-0" />
//               <span>
//                 <strong>Working Hours:</strong> Mon – Sat, 9AM – 6PM
//               </span>
//             </p>
//           </div>
//         </div>

//         {/* Contact Form */}
//         <div className="bg-gradient-to-r from-[#ee4f7e]/10 to-[#4cb7e5]/10 p-8 rounded-2xl shadow-md order-1 md:order-2">
//           <form className="space-y-5" onSubmit={handleSubmit}>
//             <div>
//               <label className="block text-gray-700 text-sm mb-1">Name</label>
//               <input
//                 name="name"
//                 value={form.name}
//                 onChange={handleChange}
//                 type="text"
//                 placeholder="Enter your name"
//                 required
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 text-sm mb-1">Email</label>
//               <input
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 type="email"
//                 placeholder="Enter your email"
//                 required
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 text-sm mb-1">Phone</label>
//               <input
//                 name="phone"
//                 value={form.phone}
//                 onChange={handleChange}
//                 type="tel"
//                 placeholder="Enter your phone number"
//                 required
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 text-sm mb-1">Message</label>
//               <textarea
//                 name="message"
//                 value={form.message}
//                 onChange={handleChange}
//                 rows="4"
//                 placeholder="Write your message..."
//                 required
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
//               ></textarea>
//             </div>
//             <Button size="md" type="submit" className="w-full" variant="pink" disabled={loading}>
//               {loading ? "Sending..." : "Submit"}
//             </Button>
//           </form>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default ContactPage;



import { useState } from "react";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { Button } from "../../components/utility/Button";
import { sendContactMessage } from "./contactApi";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

// ✅ Validation schema
const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
});

const ContactPage = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: { name: "", email: "", phone: "", message: "" },
    validationSchema,
    onSubmit: async (values, { resetForm, setErrors }) => {
      setLoading(true);
      try {
        const result = await sendContactMessage(values);

        if (result?.success === false && result?.errors) {
          // ✅ Backend field-level errors
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
    <footer className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Information */}
        <div className="order-2 md:order-1">
          <h2 className="text-3xl font-bold text-codedrift-indigo mb-4">
            Let’s Connect
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Fill out the form, and we’ll get back to you shortly.
          </p>
          <div className="space-y-4 text-gray-600">
            <p className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-codedrift-pink flex-shrink-0" />
              <span>
                <strong>Locate Us:</strong>
                <br />
                Office No 10, Ramrajya 1, Near Bhonsala Military School,
                College Road, Nashik - 422005
              </span>
            </p>
            <p className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-codedrift-blue flex-shrink-0" />
              <span>
                <strong>Email:</strong> admin@codedrift.co
              </span>
            </p>
            <p className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-codedrift-indigo flex-shrink-0" />
              <span>
                <strong>Phone:</strong>
                <br />+91 8430101013 <br />+91 7591010101 <br />+91 8378010108
              </span>
            </p>
            <p className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-codedrift-pink flex-shrink-0" />
              <span>
                <strong>Working Hours:</strong> Mon – Sat, 9AM – 6PM
              </span>
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gradient-to-r from-[#ee4f7e]/10 to-[#4cb7e5]/10 p-8 rounded-2xl shadow-md order-1 md:order-2">
          <form className="space-y-5" onSubmit={formik.handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-gray-700 text-sm mb-1">Name</label>
              <input
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm mb-1">Email</label>
              <input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 text-sm mb-1">Phone</label>
              <input
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="tel"
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-700 text-sm mb-1">Message</label>
              <textarea
                name="message"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows="4"
                placeholder="Write your message..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
              ></textarea>
              {formik.touched.message && formik.errors.message && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.message}</p>
              )}
            </div>

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
  );
};

export default ContactPage;
