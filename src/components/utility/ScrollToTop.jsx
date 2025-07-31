import { ArrowUp, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    const [showButton, setShowButton] = useState(false);

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pathname]);

    // Show scroll-to-top button when user scrolls down
    useEffect(() => {
        const onScroll = () => {
            setShowButton(window.scrollY > 300);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // ⛔ Don't force hide the button on click
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="fixed bottom-8 right-5 z-[1000] flex flex-col items-end gap-4">
            <Link
                to="/contact"
                title="Contact Us"
                className="p-3 rounded-full bg-codedrift-pink text-white shadow-lg hover:bg-codedrift-indigo-dark hover:scale-105 transition-all duration-300 ease-in-out"
            >
                <Phone className="w-5 h-5" />
            </Link>


            <button
                onClick={handleClick}
                title="Back to Top"
                className={`transition-all duration-300 transform cursor-pointer ${showButton
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-90'
                    } bg-white text-codedrift-indigo border border-gray-600 p-3 rounded-full shadow-lg animate-pulse`}
            >
                <ArrowUp className="size-5" />
            </button>

        </div>
    );
};

export default ScrollToTop;
