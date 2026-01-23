import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';
import axios from 'axios';

const Career = () => {
  const [content, setContent] = useState(null);

  const API = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await axios.get(`${API}/api/content`);
        const pageContent = data.find(item => item.page === 'career' && item.section === 'main');
        if (pageContent) {
          setContent(pageContent.data);
        }
      } catch (err) {
        console.error('Error fetching career content', err);
      }
    };
    fetchContent();
  }, []);

  if (!content) return <div className="pt-40 text-center text-gray-400 font-bold">Loading...</div>;

  return (
    <div className="pt-32 pb-20 bg-white">
      <Helmet>
        <title>Careers - Join Our Team | NEXTDEVSOLUTION</title>
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <span className="text-[#17a2a2] font-black uppercase tracking-widest text-sm">Join Us</span>
        <h1 className="text-4xl md:text-6xl font-black mt-4 mb-6">{content.title}</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          {content.subtitle}
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {content.jobs.map((job, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bg-white border border-gray-100 p-8 rounded-3xl hover:border-teal-100 hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300 flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <div className="flex-grow text-center md:text-left">
              <h3 className="text-2xl font-black text-gray-900 group-hover:text-[#17a2a2] transition-colors mb-2">
                {job.title}
              </h3>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-500 text-sm font-medium uppercase tracking-wider">
                <span className="flex items-center"><MapPin size={16} className="mr-1 text-[#17a2a2]" /> {job.location}</span>
                <span className="flex items-center"><Clock size={16} className="mr-1 text-[#17a2a2]" /> {job.type}</span>
              </div>
            </div>
            <button className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold group-hover:bg-[#17a2a2] transition-colors flex items-center">
              Apply Now <ArrowRight size={18} className="ml-2" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Career;
