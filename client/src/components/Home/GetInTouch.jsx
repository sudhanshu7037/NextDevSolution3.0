import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const GetInTouch = () => {
  return (
    <div className="bg-white">
      {/* Section 1: LET'S WORK TOGETHER */}
      <section className="py-20 text-center border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <span className="text-[#17a2a2] font-semibold uppercase tracking-wider">LET'S WORK TOGETHER</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-10 text-gray-900">Transform Your Ideas into Scalable Digital Solutions</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12">
            <div className="flex items-center">
              <span className="text-lg text-gray-600 mr-2">Or call us now</span>
              <a href="tel:9389586136" className="text-2xl font-bold text-[#17a2a2] hover:underline">9389586136</a>
            </div>
            <a 
              href="https://whatsapp.com/channel/0029VbBk0un4inomReJ7oJ3a" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center px-6 py-3 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors group"
            >
              <MessageCircle className="text-[#25D366] mr-3 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <p className="text-xs text-gray-500 uppercase font-bold">Join our Whatsapp Channel</p>
                <p className="font-bold text-gray-800">Click Here To Join</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Section 2: Work With Us (Dark) */}
      <section className="py-20 bg-[#1a1a1a] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <p className="text-[#17a2a2] font-semibold uppercase mb-2">Work With Us</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-10">We would love to hear more about your project</h2>
          <Link 
            to="/contact" 
            className="inline-block bg-[#17a2a2] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#1f8a8a] transition-colors shadow-lg"
          >
            Get In Touch
          </Link>
        </div>
        {/* Subtle background pattern/glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#17a2a2] opacity-5 blur-[120px] rounded-full"></div>
      </section>

      {/* Section 3: Ready To Do This? */}
      <section className="py-32 bg-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-gray-500 font-bold uppercase mb-4 tracking-tighter">Ready To Do This?</p>
          <motion.h2 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="text-6xl md:text-8xl font-bold mb-12 text-gray-900 leading-none"
          >
            Let's Have a Coffee
          </motion.h2>
          
          <div className="flex flex-col items-center max-w-lg mx-auto">
            <Link 
              to="/contact" 
              className="flex items-center bg-[#17a2a2] text-white px-8 py-5 rounded-2xl font-bold text-xl hover:bg-[#1f8a8a] transition-all hover:scale-105"
            >
              Schedule An Appointment <ArrowRight className="ml-3" />
            </Link>
            
            <div className="w-full my-8 flex items-center justify-center">
              <div className="h-px bg-gray-200 flex-grow"></div>
              <span className="mx-4 font-bold text-gray-400">OR</span>
              <div className="h-px bg-gray-200 flex-grow"></div>
            </div>

            <div className="space-y-4">
              <a href="tel:+919389586136" className="flex items-center justify-center text-xl font-bold text-gray-800 hover:text-[#17a2a2] transition-colors">
                <Phone className="mr-3 text-[#17a2a2]" size={24} /> Call Us:- +919389586136
              </a>
              <a href="mailto:info@nextdevsolution.com" className="flex items-center justify-center text-xl font-bold text-gray-800 hover:text-[#17a2a2] transition-colors">
                <Mail className="mr-3 text-[#17a2a2]" size={24} /> Email Us:- info@nextdevsolution.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInTouch;
