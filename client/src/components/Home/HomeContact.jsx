import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Mail, Phone, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

const HomeContact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const API = import.meta.env.VITE_API_URL || '';

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
    <section className="py-20 bg-white" id="home-contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[#17a2a2] font-semibold uppercase tracking-wider text-sm">Welcome to Our IT Solution Company</span>
          <h2 className="text-4xl font-bold mt-2 text-gray-900">Building Scalable Software Solutions for Modern Businesses</h2>
        </div>

        <div className="flex flex-col lg:flex-row shadow-2xl rounded-3xl overflow-hidden min-h-[600px]">
          {/* Left Column: Contact Info */}
          <div className="lg:w-5/12 bg-[#1a1a1a] text-white p-10 flex flex-col justify-center">
            <h3 className="text-3xl font-bold mb-6 text-[#17a2a2]">Contact Info</h3>
            <p className="text-gray-400 mb-10 leading-relaxed text-lg">
              We're here to help! If you have any questions or would like to discuss how our IT solutions, SEO, and digital marketing services can drive growth for your business,
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-[#17a2a2]/20 p-3 rounded-xl mr-4">
                  <MapPin className="text-[#17a2a2]" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-300 uppercase text-xs tracking-widest mb-1">Our Location</h4>
                  <p className="text-white font-medium"> The Iconic Corenthum Noida Sector 62</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-[#17a2a2]/20 p-3 rounded-xl mr-4">
                  <Phone className="text-[#17a2a2]" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-300 uppercase text-xs tracking-widest mb-1">Phone Number</h4>
                  <p className="text-white font-medium">+91 9389586136 / +91 9389586136</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-[#17a2a2]/20 p-3 rounded-xl mr-4">
                  <Mail className="text-[#17a2a2]" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-300 uppercase text-xs tracking-widest mb-1">Email Address</h4>
                  <p className="text-white font-medium">info@nextdevsolution.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:w-7/12 bg-white p-10 md:p-16 flex flex-col justify-center">
            <h3 className="text-3xl font-bold mb-2 text-gray-900 text-center lg:text-left">Get In Touch</h3>
            <p className="text-gray-500 mb-8 text-center lg:text-left">
              Drop us a line and we'll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    {...register('name', { required: true })}
                    placeholder="Name"
                    className="w-full px-5 py-4 bg-[#f5f5f5] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#17a2a2] focus:border-transparent outline-none transition-all"
                  />
                  {errors.name && <span className="text-red-500 text-xs mt-1">Name is required</span>}
                </div>
                <div>
                  <input
                    {...register('phone', { required: true })}
                    placeholder="Phone Number"
                    className="w-full px-5 py-4 bg-[#f5f5f5] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#17a2a2] focus:border-transparent outline-none transition-all"
                  />
                  {errors.phone && <span className="text-red-500 text-xs mt-1">Phone is required</span>}
                </div>
              </div>

              <div>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-5 py-4 bg-[#f5f5f5] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#17a2a2] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <select
                  {...register('service')}
                  className="w-full px-5 py-4 bg-[#f5f5f5] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#17a2a2] focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select Service</option>
                  <option value="Branding Solution">Branding Solution</option>
                  <option value="Website Development">Website Development</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Search Engine Optimization">Search Engine Optimization</option>
                  <option value="Social Media Marketing">Social Media Marketing</option>
                  <option value="Pay Per Click">Pay Per Click</option>
                  <option value="Content Optimization">Content Optimization</option>
                </select>
              </div>

              <div>
                <textarea
                  {...register('message')}
                  rows="4"
                  placeholder="Your Message"
                  className="w-full px-5 py-4 bg-[#f5f5f5] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#17a2a2] focus:border-transparent outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={submitting}
                className={`w-full py-5 rounded-2xl bg-[#17a2a2] text-white font-bold text-lg hover:bg-[#1f8a8a] transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-[#17a2a2]/20 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {submitting ? 'Sending...' : 'Free Consultation'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContact;
