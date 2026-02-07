import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, ArrowRight, Tag } from 'lucide-react';
import axios from 'axios';

const categories = ["All", "Technology", "Marketing", "Design", "SEO", "Security", "Video"];

const Blogs = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const API = import.meta.env.VITE_API_URL || '';
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(`${API}/api/blogs`);
        setBlogPosts(data);
      } catch (err) {
        console.error('Error fetching blogs', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <Helmet>
        <title>News & Blogs - NEXTDEVSOLUTION Insights</title>
        <meta name="description" content="Stay updated with the latest trends in technology, digital marketing, and software development from the NEXTDEVSOLUTION team." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#17a2a2] font-semibold tracking-wider uppercase text-sm"
          >
            Our Journal
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mt-2 text-gray-900"
          >
            Latest News & Insights
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 mt-4 max-w-2xl mx-auto"
          >
            Explore our latest articles, guides, and updates on technology and digital strategy.
          </motion.p>
        </div>

        {/* Filter & Search Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat 
                    ? 'bg-[#17a2a2] text-white shadow-lg' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-[#17a2a2] focus:border-transparent outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-400 font-bold">Loading insights...</p>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { 
                      e.target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='; 
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#17a2a2] text-white text-xs font-bold px-3 py-1 rounded-full uppercase flex items-center gap-1">
                      <Tag size={12} />
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} className="text-[#17a2a2]" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={14} className="text-[#17a2a2]" />
                      {post.author}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-[#17a2a2] transition-colors leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <Link to={`/blogs/${post._id}`} className="text-[#17a2a2] font-bold text-sm flex items-center group/btn">
                    READ MORE 
                    <ArrowRight size={16} className="ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-400">No articles found matching your criteria.</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
