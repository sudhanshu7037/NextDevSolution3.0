import React from 'react';
import { motion } from 'framer-motion';
import { Code, Search, Globe, Share2, Layout, Video, Monitor, TrendingUp } from 'lucide-react';

const OurServices = ({ data }) => {
  const servicesList = data?.list || [
    {
      title: "Web Development",
      description: "Create stunning, high-performance websites that represent your brand and engage your audience.",
      icon: <Globe className="w-8 h-8 text-[#17a2a2]" />,
      link: "/services/web-development"
    },
    {
      title: "App Development",
      description: "Build powerful mobile applications for iOS and Android that deliver exceptional user experiences.",
      icon: <Code className="w-8 h-8 text-[#17a2a2]" />,
      link: "/services/app-development"
    },
    {
      title: "Search Engine Optimization",
      description: "Elevate your online presence and dominate search rankings with our expert SEO services.",
      icon: <Search className="w-8 h-8 text-[#17a2a2]" />,
      link: "/services/seo"
    },
    {
      title: "Custom Software Development",
      description: "Build robust, scalable, and custom software solutions tailored to your unique business needs.",
      icon: <Monitor className="w-8 h-8 text-[#17a2a2]" />,
      link: "/services/software"
    },
    {
      title: "Digital Marketing",
      description: "Drive growth and engagement with our comprehensive digital marketing strategies.",
      icon: <TrendingUp className="w-8 h-8 text-[#17a2a2]" />,
      link: "/services/digital-marketing"
    },
    {
      title: "Graphics & Video Editing",
      description: "Graphics and video editing involve creation and enhancement of visual content.",
      icon: <Video className="w-8 h-8 text-[#17a2a2]" />,
      link: "/services/graphics"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#17a2a2] font-semibold tracking-wider uppercase text-sm">Our Services</span>
          <h2 className="text-4xl font-bold mt-2 text-gray-900">{data?.title || "Our Services"}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <motion.div
              key={service.title}
              whileHover={{ y: -10 }}
              className="p-8 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-6 p-3 bg-[#e8f4f4] rounded-lg w-fit">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              <a href={service.link} className="text-[#17a2a2] font-semibold flex items-center hover:underline">
                Read More <span className="ml-2">→</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
