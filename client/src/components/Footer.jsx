import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-[#17a2a2]">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/career" className="text-gray-400 hover:text-white transition-colors">Career</Link></li>
              <li><Link to="/blogs" className="text-gray-400 hover:text-white transition-colors">Blogs</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 2: Policies */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-[#17a2a2]">Policies</h3>
            <ul className="space-y-4">
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/refund-policy" className="text-gray-400 hover:text-white transition-colors">Refund Policy</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-[#17a2a2]">L E T ' S T A L K</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-[#17a2a2] shrink-0" />
                <span>The Iconic Corenthum Noida Sector 62</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-[#17a2a2] shrink-0" />
                <span>+91 9389586136</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-[#17a2a2] shrink-0" />
                <span>info@nextdevsolution.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-[#17a2a2]">Follow Us</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-[#17a2a2] transition-colors"><Facebook size={20} /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-[#17a2a2] transition-colors"><Instagram size={20} /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-[#17a2a2] transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-[#17a2a2] transition-colors"><Twitter size={20} /></a>
            </div>
            <p className="text-sm text-gray-400">
              Join our WhatsApp Channel for latest updates.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© Copyright 2025 NEXTDEVSOLUTION. All rights reserved. Developed by Sudhanshu Tomar</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="hover:text-white">Terms</Link>
            <Link to="/privacy" className="hover:text-white">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
