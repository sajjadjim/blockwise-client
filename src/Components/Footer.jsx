
import { Link } from "react-router";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-[#f1f5f9] text-gray-700 border-t border-gray-200  px-14 lg:px-16 py-12 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-90 mb-6 ">

        {/* Branding */}
        <div className="">
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="logo" className="w-10 h-10" />
            <span className="text-xl font-bold">BloCKWise</span>
          </div>
          <p className="text-sm">
            Smart and secure building management system for modern apartments.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-base font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="text-gray-500 mt-1" />
              <span>123 Block Street, City, BD</span>
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-gray-500" />
              +880 1234 567 890
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-gray-500" />
              support@blockwise.com
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-base font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-lg ">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-600">
              <FaFacebookF />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-500">
              <FaLinkedinIn />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-gray-800">
              <FaGithub />
            </a>
            <a href="mailto:support@blockwise.com" className="hover:text-red-500">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 py-4 border-t border-gray-300">
        © {new Date().getFullYear()} BloCKWise. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;


