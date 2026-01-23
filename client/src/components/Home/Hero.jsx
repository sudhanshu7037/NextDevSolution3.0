import React from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";


const Hero = ({ data }) => {
  const API = import.meta.env.VITE_API_URL || '';
  const title = data?.title || "WE REINVENTED FOR YOU";
  const subtitle = data?.subtitle || "Our team provides customized digital solutions aligned with your business requirements, delivering secure, scalable, and high-performance results. From startups to enterprises, we convert ideas into successful digital platforms.";

  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 mt-24 md:mt-0">
              {title.split('REINVENTED').length > 1 ? (
                <>
                  {title.split('REINVENTED')[0]} 
                  <span className="text-[#17a2a2]">TRANSFORMED</span> 
                  {title.split('REINVENTED')[1]}
                </>
              ) : title}
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              {subtitle}
            </p>
            <div className="flex space-x-4">
              <Link to="/contact" className="btn-primary flex items-center">
  Explore <span className="ml-2">→</span>
</Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                src={data?.image || `${API}/uploads/hero.jpg`} 
                alt="Digital Solutions" 
                className="w-full h-auto"
                onError={(e) => { e.target.src = `${API}/uploads/hero.jpg`; }}
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#17a2a2] opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-[#17a2a2] opacity-5 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </div>
      
      {/* Background Animation placeholder */}
      <div className="absolute inset-0 z-0 opacity-30">
        {/* You could add a canvas animation here like on the original site */}
      </div>
    </section>
  );
};

export default Hero;
