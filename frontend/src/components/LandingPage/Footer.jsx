import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <p className="text-sm">© 2024 RentalSphere. All rights reserved.</p>
                <ul className="flex space-x-4">
                    <li><a href="#" className="hover:text-gray-400">About Us</a></li>
                    <li><a href="#" className="hover:text-gray-400">Services</a></li>
                    <li><a href="#" className="hover:text-gray-400">Contact</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;