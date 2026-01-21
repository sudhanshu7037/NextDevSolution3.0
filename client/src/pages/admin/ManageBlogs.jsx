import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit3, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    author: '',
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    image: '',
    excerpt: '',
    content: ''
  });

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/blogs`);
      setBlogs(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleImageUpload = async (file) => {
    if (!file) return;
    const loadingToast = toast.loading('Uploading image...');
    const uploadData = new FormData();
    uploadData.append('image', file);
    try {
      const token = localStorage.getItem('adminToken');
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/content/upload`, uploadData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}` 
        }
      });
      setFormData({ ...formData, image: `${import.meta.env.VITE_API_URL}${data.url}?t=${Date.now()}` });
      toast.success('Image uploaded successfully', { id: loadingToast });
    } catch (err) {
      toast.error('Error uploading image', { id: loadingToast });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Saving blog...');
    try {
      const token = localStorage.getItem('adminToken');
      if (formData._id) {
        await axios.put(`${import.meta.env.VITE_API_URL}/blogs/${formData._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/blogs`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setIsEditing(false);
      setFormData({ title: '', category: '', author: '', date: '', image: '', excerpt: '', content: '' });
      fetchBlogs();
      toast.success('Blog saved successfully', { id: loadingToast });
    } catch (err) {
      toast.error('Error saving blog', { id: loadingToast });
    }
  };

  const deleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${import.meta.env.VITE_API_URL}/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBlogs();
      toast.success('Blog deleted');
    } catch (err) {
      toast.error('Error deleting blog');
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-black text-gray-900">Manage Blogs</h2>
          <p className="text-gray-500 text-sm">Create and edit news or blog posts</p>
        </div>
        <button 
          onClick={() => {
            setIsEditing(true);
            setFormData({ title: '', category: '', author: 'Admin', date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }), image: '', excerpt: '', content: '' });
          }}
          className="btn-primary flex items-center px-6 py-3"
        >
          <Plus className="mr-2" size={20} /> Add New Post
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-6 max-w-4xl border-t pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 uppercase">Title</label>
              <input
                type="text"
                className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#17a2a2]"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 uppercase">Category</label>
              <input
                type="text"
                className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#17a2a2]"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 uppercase">Author</label>
              <input
                type="text"
                className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#17a2a2]"
                value={formData.author}
                onChange={(e) => setFormData({...formData, author: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 uppercase">Date</label>
              <input
                type="text"
                className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#17a2a2]"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700 uppercase">Featured Image</label>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                className="flex-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#17a2a2]"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                placeholder="Image URL or Upload"
              />
              <label className="cursor-pointer bg-teal-50 text-[#17a2a2] px-6 py-3 rounded-xl hover:bg-teal-100 transition-colors font-bold">
                <ImageIcon size={20} className="inline mr-2" /> Upload
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e.target.files[0])} />
              </label>
            </div>
            {formData.image && <img src={formData.image} alt="Preview" className="h-32 w-full object-cover rounded-xl mt-4" />}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700 uppercase">Excerpt (Short Description)</label>
            <textarea
              className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#17a2a2]"
              value={formData.excerpt}
              onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
              rows="2"
              required
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700 uppercase">Blog Content</label>
            <textarea
              className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#17a2a2]"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              rows="8"
              required
            ></textarea>
          </div>

          <div className="flex space-x-4 pt-6">
            <button type="submit" className="btn-primary px-12 py-3 shadow-lg shadow-teal-100">
              Save Post
            </button>
            <button 
              type="button" 
              onClick={() => setIsEditing(false)}
              className="px-8 py-3 font-bold text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white border rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="relative h-48">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-[#17a2a2] text-white text-[10px] font-black uppercase px-3 py-1 rounded-full">
                  {blog.category}
                </div>
              </div>
              <div className="p-6 flex-grow">
                <h3 className="font-black text-lg mb-2 line-clamp-2">{blog.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-3 mb-4">{blog.excerpt}</p>
                <div className="flex justify-between items-center border-t pt-4 mt-auto">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => { setFormData(blog); setIsEditing(true); }}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button 
                      onClick={() => deleteBlog(blog._id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <span className="text-xs text-gray-400 font-bold uppercase">{blog.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageBlogs;
