import React from "react";
import { Linkedin, Twitter, Github, Mail } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* About / Branding */}
                    <div>
                        <h2 className="text-white font-bold text-lg mb-3">JobPortal</h2>
                        <p className="text-gray-400 text-sm">
                            Find your dream job with JobPortal. We connect talented professionals with the best companies worldwide.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-3">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Jobs</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Companies</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact / Social */}
                    <div>
                        <h3 className="text-white font-semibold mb-3">Contact Us</h3>
                        <p className="text-gray-400 text-sm mb-3">Email: support@jobportal.com</p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-white transition-colors"><Linkedin /></a>
                            <a href="#" className="hover:text-white transition-colors"><Twitter /></a>
                            <a href="#" className="hover:text-white transition-colors"><Github /></a>
                            <a href="#" className="hover:text-white transition-colors"><Mail /></a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <hr className="border-gray-700 my-6" />

               
                <p className="text-center text-gray-500 text-sm">
                     JobBoard. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
