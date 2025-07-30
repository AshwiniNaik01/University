import React, { useState, useLayoutEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';
import FullScreenLogoLoader from '../components/loaders/FullScreenLogoLoader';
import ScrollToTop from '../components/utility/ScrollToTop';


const RootLayout = () => {
    const [loading, setLoading] = useState(true);

    useLayoutEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1300); // Same duration as loader
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        // return <FullScreenLogoLoader />; // Show loader until loading is false
    }

    return (
        <>
            <ScrollToTop />
            <Navbar />
            <main className="min-h-dvh">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default RootLayout;