import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    title: "Get In Touch",
    subtitle: "We're here to help! If you have any questions, feel free to contact us.",
    address: "The Iconic Corenthum Noida Sector 62",
    email: "info@nextdevsolution.com",
    phone: "+91 9389586136"
  });

  const API = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await axios.get(`${API}/api/content`);
        const info = data.find(item => item.page === 'contact' && item.section === 'info');
        if (info) setContactInfo(info.data);
      } catch (err) {
        console.error('Error fetching contact info', err);
      }
    };
    fetchContent();
  }, []);

  const onSubmit = async (data) => {
    setSubmitting(true);
    const loadingToast = toast.loading('Sending message...');
    try {
      await axios.post(`${API}/api/contact`, data);
      toast.success('Thank you for contacting us! We will get back to you soon.', { id: loadingToast });
      reset();
    } catch (err) {
      toast.error('Error sending message. Please try again.', { id: loadingToast });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">{contactInfo.title}</h1>
          <p className="text-gray-600">{contactInfo.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-[#e8f4f4] p-3 rounded-lg mr-4">
                  <MapPin className="text-[#17a2a2]" />
                </div>
                <div>
                  <h3 className="font-bold">Our Location</h3>
                  <p className="text-gray-600">{contactInfo.address}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-[#e8f4f4] p-3 rounded-lg mr-4">
                  <Phone className="text-[#17a2a2]" />
                </div>
                <div>
                  <h3 className="font-bold">Phone Number</h3>
                  <p className="text-gray-600">{contactInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-[#e8f4f4] p-3 rounded-lg mr-4">
                  <Mail className="text-[#17a2a2]" />
                </div>
                <div>
                  <h3 className="font-bold">Email Address</h3>
                  <p className="text-gray-600">{contactInfo.email}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h3 className="font-bold mb-4">Find Us on Map</h3>
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                Map Placeholder
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold mb-8">Send Us a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  {...register('name', { required: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17a2a2] focus:border-transparent outline-none"
                />
                {errors.name && <span className="text-red-500 text-xs">Name is required</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  {...register('phone', { required: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17a2a2] focus:border-transparent outline-none"
                />
                {errors.phone && <span className="text-red-500 text-xs">Phone is required</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17a2a2] focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Service</label>
                <select
                  {...register('service')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17a2a2] focus:border-transparent outline-none"
                >
                  <option value="">Select Service</option>
                  <option value="branding">Custom Software Development</option>
                  <option value="development">Website Development</option>
                  <option value="graphic">Graphic Design</option>
                  <option value="seo">SEO</option>
                  <option value="seo">Digital Marketing</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  {...register('message')}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17a2a2] focus:border-transparent outline-none"
                ></textarea>
              </div>
              <button type="submit" disabled={submitting} className={`w-full btn-primary py-3 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {submitting ? 'Sending...' : 'Free Consultation'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
