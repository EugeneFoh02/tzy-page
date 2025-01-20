import React from "react";
import { Facebook, Instagram, MessageSquare, MapPin } from "lucide-react"; // Import icons from lucide-react

const Footer = () => {
  return (
    <footer className=" border border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="px-10 pb-10 pt-6 flex flex-col space-y-4">
        <div className="flex justify-end">
          <div className="text-slate-600">
            <p className="mt-2">
              T. Z.Y Sport Arena @ ACS Badminton Court, 121, Jalan Lahat, 30200
              Ipoh, Perak
            </p>
          </div>
        </div>

        {/* Second Row: Social Media and Waze Icons */}
        <div className="flex justify-end space-x-6 items-center">
          {/* Social media icons */}
          <a
            href="https://www.facebook.com/tzy.acs.badminton" // Replace with your actual link
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-blue-500 transition-colors"
          >
            <Facebook size={24} />
          </a>
          <a
            href="https://www.instagram.com/tzy_acs_badminton?igsh=czQ1dDRvMWlkMmJj" // Replace with your actual link
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-pink-500 transition-colors"
          >
            <Instagram size={24} />
          </a>
          <a
            href="https://wa.me/60109833810" // Replace with your WhatsApp link
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-green-500 transition-colors"
          >
            <MessageSquare size={24} />
          </a>
          {/* Waze Icon */}
          <a
            href="https://waze.com/ul/hw0zf5gwtg" // Replace with actual Waze link
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-blue-500 transition-colors"
          >
            <MapPin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
