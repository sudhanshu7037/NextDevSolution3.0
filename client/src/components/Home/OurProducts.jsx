import React from 'react';
import { motion } from 'framer-motion';

const OurProducts = ({ data }) => {
  const productsList = data?.list || [];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#17a2a2] font-semibold tracking-wider uppercase text-sm">Our Products</span>
          <h2 className="text-4xl font-bold mt-2 text-gray-900">{data?.title || "Elevating Tomorrow's IT Landscape"}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productsList.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-2xl shadow-lg h-64 group cursor-pointer"
            >
              {/* Product Background Image */}
              <img
                src={product.image}
                alt={product.fullName}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => { 
                  e.target.src = `${process.env.VITE_API_URL}/uploads/hero.jpg`; 
                }}
              />

              {/* Overlay with Text */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-sm m-4 rounded-xl border border-white/20 shadow-xl transition-all duration-300 group-hover:bg-[#17a2a2] group-hover:text-white">
                <h3 className="text-xl font-bold group-hover:text-white transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-white/90 transition-colors">
                  {product.fullName}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProducts;
