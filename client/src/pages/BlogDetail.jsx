import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Calendar, User, Tag, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import axios from 'axios';

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`${API}/api/blogs/${id}`);
        setPost(data);
      } catch (err) {
        console.error('Error fetching blog detail', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <div className="pt-40 text-center text-gray-400 font-bold">Loading insight...</div>;
  if (!post) return <div className="pt-40 text-center text-gray-400 font-bold">Insight not found.</div>;

  return (
    <div className="pt-32 pb-20 bg-white">
      <Helmet>
        <title>{post.title} - NEXTDEVSOLUTION Blog</title>
        <meta name="description" content={post.title} />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs / Back */}
        <Link to="/blogs" className="flex items-center text-[#17a2a2] font-semibold mb-8 hover:gap-2 transition-all">
          <ArrowLeft size={20} className="mr-2" />
          Back to Blog
        </Link>

        {/* Post Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-[#17a2a2]/10 text-[#17a2a2] text-sm font-bold px-4 py-1 rounded-full uppercase">
              {post.category}
            </span>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar size={16} />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <User size={16} />
                {post.author}
              </span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-8">
            {post.title}
          </h1>
        </div>

        {/* Featured Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl overflow-hidden shadow-2xl mb-12"
        >
          <img src={post.image} alt={post.title} className="w-full h-auto object-cover" 
            onError={(e) => { 
              e.target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='; 
            }}/>
        </motion.div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/3">
            <div 
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-2">
              {['AI', 'Technology', 'Development', 'Innovation'].map(tag => (
                <span key={tag} className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm hover:bg-gray-100 cursor-pointer transition-colors">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-40 space-y-10">
              {/* Share */}
              <div>
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Share2 size={18} className="text-[#17a2a2]" />
                  Share This
                </h4>
                <div className="flex gap-3">
                  <button className="p-3 bg-gray-50 rounded-xl hover:bg-[#17a2a2] hover:text-white transition-all text-gray-500">
                    <Facebook size={20} />
                  </button>
                  <button className="p-3 bg-gray-50 rounded-xl hover:bg-[#17a2a2] hover:text-white transition-all text-gray-500">
                    <Twitter size={20} />
                  </button>
                  <button className="p-3 bg-gray-50 rounded-xl hover:bg-[#17a2a2] hover:text-white transition-all text-gray-500">
                    <Linkedin size={20} />
                  </button>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-[#17a2a2] rounded-3xl p-8 text-white shadow-xl shadow-teal-100">
                <h4 className="font-bold mb-2">Join Our Newsletter</h4>
                <p className="text-sm opacity-80 mb-4">Stay updated with the latest insights.</p>
                <input 
                  type="email" 
                  placeholder="Email..." 
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:bg-white/20 mb-3" 
                />
                <button className="w-full py-3 bg-white text-[#17a2a2] font-bold rounded-xl hover:bg-gray-100 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
