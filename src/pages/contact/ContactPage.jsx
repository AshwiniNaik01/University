import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { Button } from "../../components/utility/Button";
const ContactPage = () => {
    return (
        <footer className="py-16 px-4 bg-white">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">

                {/* Contact Information (Left on Large, Bottom on Small) */}
                <div className="order-2 md:order-1">
                    <h2 className="text-3xl font-bold text-codedrift-indigo mb-4">
                        Let’s Connect
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        Fill out the form, and we’ll get back to you shortly.
                        Our team is here to help you with any questions you may have.
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

                {/* Contact Form (Right on Large, Top on Small) */}
                <div className="bg-gradient-to-r from-[#ee4f7e]/10 to-[#4cb7e5]/10 p-8 rounded-2xl shadow-md order-1 md:order-2">
                    <form className="space-y-5">
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Phone</label>
                            <input
                                type="tel"
                                placeholder="Enter your phone number"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Message</label>
                            <textarea
                                rows="4"
                                placeholder="Write your message..."
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-codedrift-pink outline-none"
                            ></textarea>
                        </div>

                        <Button size="md" type="submit" className="w-full" variant="pink">
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </footer>
    );
};

export default ContactPage;
