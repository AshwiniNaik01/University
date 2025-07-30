import { testimonials as testimonialsDummyData } from '../../data/testimonials';
import Testimonial from '../../components/common/Testimonial';
import Image from '../../components/utility/Image';
import { useState } from 'react';
import { Button } from '../../components/utility/Button';

const TestimonialsPage = () => {

    const [testimonials, setTestimonails] = useState(testimonialsDummyData)

    const handleLoadMoreTestimonials = (e) => {
        e.preventDefault()

        // code to do

        // setting dummy data
        setTestimonails([...testimonials, ...testimonialsDummyData])
    }

    return (
        <section className="relative py-16 bg-[#f9fafb] overflow-hidden">
            {/* Background Image Layer */}
            {/* Background Image Layer */}
            <div
                className="absolute inset-0 z-0 bg-fixed bg-cover bg-center opacity-30"
                style={{
                    backgroundImage:
                        "url('https://t3.ftcdn.net/jpg/05/52/64/84/360_F_552648480_ixeelxn2RPidJO1m0m6DI13aWvPZiliB.jpg')",
                }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-[#eef1f5]"></div>

            {/* Foreground Content */}
            <div className="relative container z-10">
                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2 relative inline-block">
                        All Testimonials
                        <span className="absolute left-1/2 -bottom-1 w-2/3 h-1 bg-codedrift-gradient rounded-full transform -translate-x-1/2"></span>
                    </h2>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        See what our learners say about their experience with Code Drift Academy.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {testimonials.map((testimonial, index) => (
                        <li key={index}>
                            <Testimonial testimonial={testimonial} />
                        </li>
                    ))}
                </ul>

                <div className="mt-12 text-center">
                    <Button variant='gradient' onClick={handleLoadMoreTestimonials}>
                        Load More Testimonials
                    </Button>
                </div>

            </div>
        </section>
    );
};

export default TestimonialsPage;
