import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Code, Search, Globe, Share2, Layout, Video, CheckCircle, Monitor, TrendingUp } from 'lucide-react';

const iconsMap = {
  'web-development': <Globe size={48} className="text-[#17a2a2]" />,
  'app-development': <Code size={48} className="text-[#17a2a2]" />,
  'software': <Monitor size={48} className="text-[#17a2a2]" />,
  'digital-marketing': <TrendingUp size={48} className="text-[#17a2a2]" />,
  'seo': <Search size={48} className="text-[#17a2a2]" />,
  'branding-digital': <Globe size={48} className="text-[#17a2a2]" />,
  'graphics': <Video size={48} className="text-[#17a2a2]" />,
};

const ServiceDetail = () => {
  const { category } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const API = import.meta.env.VITE_API_URL || '';
        const { data } = await axios.get(`${API}/api/content`);
        const pageContent = data.find(item => item.page === category && item.section === 'main');
        if (pageContent) {
          setService(pageContent.data);
        }
      } catch (err) {
        console.error('Error fetching service content', err);
      }
    };
    fetchContent();
  }, [category]);

  if (!service) return <div className="pt-40 text-center">Loading...</div>;

  return (
    <div className="pt-32 pb-20 bg-white">
      <Helmet>
        <title>{service.title} - NEXTDEVSOLUTION</title>
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <div className="mb-6 p-4 bg-[#e8f4f4] rounded-2xl w-fit">
              {iconsMap[category] || iconsMap['web-development']}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">{service.title}</h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {service.fullDescription || service.content}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(service.features || []).map((feature) => (
                <div key={feature} className="flex items-center space-x-3">
                  <CheckCircle className="text-[#17a2a2]" size={20} />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img 
              src={service.image} 
              alt={service.title} 
              className="rounded-3xl shadow-2xl w-full h-auto object-cover"
              onError={(e) => { e.target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='; }}
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[#17a2a2] rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Ready to start your project?</h2>
          <p className="text-xl mb-8 opacity-90">Let's build something amazing together. Our experts are ready to help you.</p>
          <Link to="/contact" className="bg-white text-[#17a2a2] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors">
            Get A Free Consultation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
