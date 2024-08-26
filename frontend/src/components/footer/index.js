import React from 'react';
import fastX_logo from '../../assets/fastX-logo.png';

const Footer = () => {
    return (
        <footer className="bg-[#A40C0C] text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    {/* Company Info */}
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h2 className="text-2xl font-bold">FastX Delivery</h2>
                        <p className="mt-2 text-gray-400">Your Reliable Partner for Swift Deliveries</p>
                        <img
                            src={fastX_logo}
                            alt='fastX logoX'
                            className="w-32 h-auto md:w-40 md:h-auto  lg:h-auto"
                        />
                    </div>

                    {/* Navigation Links */}
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-xl font-semibold">Quick Links</h3>
                        <ul className="mt-4">
                            <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
                            <li><a href="/services" className="text-gray-400 hover:text-white">Services</a></li>
                            <li><a href="/contact" className="text-gray-400 hover:text-white">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Social Media & App Links */}
                    <div className="w-full md:w-1/3">
                        <h3 className="text-xl font-semibold">Stay Connected</h3>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="text-gray-400 hover:text-white">[Facebook Icon]</a>
                            <a href="#" className="text-gray-400 hover:text-white">[Twitter Icon]</a>
                            <a href="#" className="text-gray-400 hover:text-white">[Instagram Icon]</a>
                            <a href="#" className="text-gray-400 hover:text-white">[LinkedIn Icon]</a>
                        </div>

                        <h3 className="text-xl font-semibold mt-6">Download Our App</h3>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="text-gray-400 hover:text-white">[App Store Icon]</a>
                            <a href="#" className="text-gray-400 hover:text-white">[Google Play Icon]</a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-700 pt-4 text-center">
                    <p className="text-gray-400">&copy; 2024 FastX Delivery. All rights reserved.</p>
                    <p className="text-gray-400">
                        <a href="/privacy-policy" className="hover:text-white">Privacy Policy</a> |
                        <a href="/terms-of-service" className="hover:text-white ml-2">Terms of Service</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
