import React from 'react';
import { motion } from 'framer-motion';

const OurTechnologies = ({ data }) => {
  const techsList = data?.list || [];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#17a2a2] font-semibold tracking-wider uppercase text-sm">Our Technologies</span>
          <h2 className="text-4xl font-bold mt-2 text-gray-900">{data?.title || "Technologies We Work On"}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {techsList.map((tech) => (
            <motion.div
              key={tech.name}
              whileHover={{ y: -5, scale: 1.05 }}
              className="p-6 border border-gray-100 rounded-xl flex flex-col items-center justify-center bg-white shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-16 h-16 mb-4 flex items-center justify-center transition-transform duration-300 group-hover:rotate-6">
                <img 
                  src={tech.logo} 
                  alt={tech.name} 
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/64?text=' + tech.name.substring(0, 2); }}
                />
              </div>
              <span className="text-sm font-semibold text-gray-700">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTechnologies;
