import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Target, Eye, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

const About = () => {
  const [content, setContent] = useState({});

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/content`);
        const aboutContent = {};
        data.filter(item => item.page === 'about').forEach(item => {
          aboutContent[item.section] = item.data;
        });
        setContent(aboutContent);
      } catch (err) {
        console.error('Error fetching about content', err);
      }
    };
    fetchContent();
  }, []);

  const main = content.main || {
    title: 'Empowering Excellence: Our IT Solutions Story',
    subtitle: 'At NEXTDEVSOLUTION, we believe in providing scalable infrastructure tailored to businesses of all sizes.',
    content: 'We are a team of passionate developers, designers, and marketers committed to delivering excellence.',
    points: ["Custom-coded websites", "Impactful branding", "Scalable IT infrastructure"],
    image: 'https://www.NEXTDEVSOLUTION.com/img/about.jpg'
  };

  const visionMission = content.vision_mission || {
    vision: { title: 'Our Vision', text: 'Making every dream visible to the world.' },
    mission: { title: 'Our Mission', text: 'To deliver cutting-edge solutions.' }
  };

  return (
    <div className="pt-32 pb-20 bg-white">
      <Helmet>
        <title>About Us - NEXTDEVSOLUTION | Leading IT & Digital Marketing Agency</title>
        <meta name="description" content="Learn about NEXTDEVSOLUTION's mission to empower businesses with innovative IT solutions and digital marketing strategies." />
      </Helmet>

      {/* Main About Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#17a2a2] font-semibold uppercase tracking-wider text-sm">About Us</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6 text-gray-900 leading-tight">
              {main.title.split(':')[0]}: <br />
              <span className="text-[#17a2a2]">{main.title.split(':')[1]}</span>
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed text-lg">
              {main.subtitle}
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {main.content}
            </p>
            
            <div className="space-y-4">
              {main.points.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-[#17a2a2]" size={20} />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-[#17a2a2] rounded-3xl opacity-10 transform -rotate-3"></div>
            <img 
              src={main.image} 
              alt="About NEXTDEVSOLUTION" 
              className="relative z-10 rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              onError={(e) => { e.target.src = `${import.meta.env.VITE_API_URL}/uploads/about.jpg`; }}
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#17a2a2] rounded-full opacity-20 blur-3xl"></div>
          </motion.div>
        </div>
      </div>

      {/* Vision & Mission Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Vision */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 group"
            >
              <div className="w-16 h-16 bg-[#e8f4f4] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#17a2a2] transition-colors">
                <Eye className="text-[#17a2a2] group-hover:text-white transition-colors" size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">{visionMission.vision.title}</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {visionMission.vision.text}
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 group"
            >
              <div className="w-16 h-16 bg-[#e8f4f4] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#17a2a2] transition-colors">
                <Target className="text-[#17a2a2] group-hover:text-white transition-colors" size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">{visionMission.mission.title}</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {visionMission.mission.text}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
