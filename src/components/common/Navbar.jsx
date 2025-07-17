import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
    { name: 'Home', to: '/' },
    { name: 'Courses', to: '/courses' },
    { name: 'About Us', to: '/about' },
    { name: 'Contact', to: '/contact' },
    { name: 'Register', to: '/register' },
    { name: 'Book a Demo', to: '/demo' },
    { name: 'Feedback', to: '/feedback' },
];

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-[500] backdrop-blur-md border-b border-white/30 shadow-md bg-[linear-gradient(to_right,rgba(255,255,255,0.6),rgba(99,102,241,0.15))]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between py-2 items-center">
                    {/* Logo or Brand */}
                    <p className="text-xl font-bold text-primary">
                        <span className="text-red-500">Code</span>
                        <span className="text-sky-500">Drift</span>
                    </p>

                    {/* Navigation Links */}
                    <div className="flex justify-end items-center gap-4">
                        {links.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-2xl  ${
                                        isActive
                                            ? 'text-indigo-500 bg-white/60 border border-indigo-500 backdrop-blur-md shadow-[0_4px_12px_rgba(99,102,241,0.2)]'
                                            : 'text-gray-500 border border-gray-100'
                                    }`
                                }>
                                {link.name}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
