import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
        <h2 className="text-3xl font-bold text-white">
          S<span className="text-yellow-300">hop</span>
        </h2>
          <p className="mt-3 text-sm text-gray-400">
            Your one-stop online shop for everything.  
            Quality products, secure payment & fast delivery.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 mt-4">
            <FaFacebookF className="h-6 w-6 cursor-pointer hover:text-white" />
            <FaInstagram className="h-6 w-6 cursor-pointer hover:text-white" />
            <FaTwitter className="h-6 w-6 cursor-pointer hover:text-white" />
            <FaYoutube className="h-6 w-6 cursor-pointer hover:text-white" />
          </div>
        </div>

        {/* SHOP LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Men</li>
            <li className="hover:text-white cursor-pointer">Women</li>
            <li className="hover:text-white cursor-pointer">Electronics</li>
            <li className="hover:text-white cursor-pointer">Jewellery</li>
          </ul>
        </div>

        {/* SUPPORT LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Contact Us</li>
            <li className="hover:text-white cursor-pointer">FAQ</li>
            <li className="hover:text-white cursor-pointer">Shipping</li>
            <li className="hover:text-white cursor-pointer">Returns</li>
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact Info
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Email: pratikvardekar@gmail.com</li>
            <li>Phone: +91 8010840157</li>
            <li>Address: Mumbai, India</li>
          </ul>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} MyStore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
