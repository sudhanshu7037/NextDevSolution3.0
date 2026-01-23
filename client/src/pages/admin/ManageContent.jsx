import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || '';

const ManageContent = () => {
  const [content, setContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [selectedPage, setSelectedPage] = useState('all');
  const [editSection, setEditSection] = useState(null);
  const [formData, setFormData] = useState({});

  const fetchContent = async () => {
    try {
      const API = import.meta.env.VITE_API_URL || '';
      const { data } = await axios.get(`${API}/api/content`);
      setContent(data);
      setFilteredContent(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  useEffect(() => {
    if (selectedPage === 'all') {
      setFilteredContent(content);
    } else {
      setFilteredContent(content.filter(item => item.page === selectedPage));
    }
  }, [selectedPage, content]);

  const handleEdit = (item) => {
    setEditSection({ page: item.page, section: item.section });
    setFormData(JSON.parse(JSON.stringify(item.data))); // Deep copy
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post(`${API}/api/content`, 
        { page: editSection.page, section: editSection.section, data: formData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditSection(null);
      fetchContent();
      toast.success('Content updated successfully');
    } catch (err) {
      toast.error('Error updating content');
    }
  };

  const handleImageUpload = async (key, file, parentKey = null, index = null) => {
    if (!file) return;
    
    const loadingToast = toast.loading('Uploading image...');
    const uploadData = new FormData();
    uploadData.append('image', file);
    try {
      const token = localStorage.getItem('adminToken');
      const { data } = await axios.post(`${API}/api/content/upload`, uploadData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}` 
        }
      });
     const imageUrl = `${API}${data.url}?t=${Date.now()}`;

      
      let newFormData = JSON.parse(JSON.stringify(formData));
      if (index !== null && parentKey) {
        newFormData[parentKey][index][key] = imageUrl;
      } else if (parentKey) {
        newFormData[parentKey][key] = imageUrl;
      } else {
        newFormData[key] = imageUrl;
      }
      
      setFormData(newFormData);
      toast.success('Image uploaded successfully', { id: loadingToast });
    } catch (err) {
      toast.error('Error uploading image', { id: loadingToast });
    }
  };

  const renderField = (key, value, parentKey = null, index = null) => {
    const fieldId = parentKey ? (index !== null ? `${parentKey}_${index}_${key}` : `${parentKey}_${key}`) : key;
    const isImage = key.toLowerCase().includes('image') || key.toLowerCase().includes('logo');

    if (isImage) {
      return (
        <div key={fieldId} className="space-y-2 border-l-2 border-teal-100 pl-4 py-1">
          <label className="block text-xs font-bold text-gray-500 uppercase">{key}</label>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              className="flex-1 px-4 py-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-[#17a2a2]"
              value={value}
              onChange={(e) => {
                let newFormData = JSON.parse(JSON.stringify(formData));
                if (index !== null && parentKey) newFormData[parentKey][index][key] = e.target.value;
                else if (parentKey) newFormData[parentKey][key] = e.target.value;
                else newFormData[key] = e.target.value;
                setFormData(newFormData);
              }}
            />
            <label className="cursor-pointer bg-[#17a2a2] text-white px-4 py-2 rounded-lg hover:bg-[#1f8a8a] transition-colors text-sm font-bold">
              Upload
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={(e) => handleImageUpload(key, e.target.files[0], parentKey, index)}
              />
            </label>
          </div>
          {value && (
            <img src={value} alt="Preview" className="h-16 w-auto rounded-lg border object-contain bg-gray-50" />
          )}
        </div>
      );
    }

    if (typeof value === 'string') {
      return (
        <div key={fieldId} className="space-y-1">
          <label className="block text-xs font-bold text-gray-500 uppercase">{key}</label>
          <textarea
            className="w-full px-4 py-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-[#17a2a2]"
            value={value}
            onChange={(e) => {
              let newFormData = JSON.parse(JSON.stringify(formData));
              if (index !== null && parentKey) newFormData[parentKey][index][key] = e.target.value;
              else if (parentKey) newFormData[parentKey][key] = e.target.value;
              else newFormData[key] = e.target.value;
              setFormData(newFormData);
            }}
            rows={value.length > 50 ? 3 : 1}
          />
        </div>
      );
    }

    if (Array.isArray(value)) {
      return (
        <div key={fieldId} className="space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <label className="block text-xs font-black text-[#17a2a2] uppercase tracking-widest">{key} (List)</label>
          {value.map((item, i) => (
            <div key={i} className="space-y-2 p-3 bg-white rounded-lg border border-gray-200 shadow-sm relative group">
               <span className="absolute -top-2 -left-2 w-6 h-6 bg-[#17a2a2] text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                {i + 1}
               </span>
               {typeof item === 'string' ? (
                 <textarea
                   className="w-full px-4 py-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-[#17a2a2]"
                   value={item}
                   onChange={(e) => {
                     let newFormData = JSON.parse(JSON.stringify(formData));
                     newFormData[key][i] = e.target.value;
                     setFormData(newFormData);
                   }}
                 />
               ) : (
                 Object.keys(item).map(subKey => renderField(subKey, item[subKey], key, i))
               )}
            </div>
          ))}
        </div>
      );
    }

    if (typeof value === 'object' && value !== null) {
      return (
        <div key={fieldId} className="space-y-4 p-4 bg-teal-50/30 rounded-xl border border-teal-100">
          <label className="block text-xs font-black text-[#17a2a2] uppercase tracking-widest">{key}</label>
          {Object.keys(value).map(subKey => renderField(subKey, value[subKey], key))}
        </div>
      );
    }

    return null;
  };

  const pages = ['all', ...new Set(content.map(item => item.page))];

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900">Manage Content</h2>
          <p className="text-gray-500 text-sm">Update text, lists, and images across the site</p>
        </div>
        {!editSection && (
          <div className="flex items-center space-x-3 bg-gray-100 p-1.5 rounded-xl">
            {pages.map(p => (
              <button
                key={p}
                onClick={() => setSelectedPage(p)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  selectedPage === p ? 'bg-white text-[#17a2a2] shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {p.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {editSection ? (
        <form onSubmit={handleSave} className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between border-b pb-6">
            <div>
              <span className="text-[10px] font-black text-white bg-[#17a2a2] px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">
                {editSection.page}
              </span>
              <h3 className="text-2xl font-black text-gray-900 uppercase">
                {editSection.section.replace('_', ' ')}
              </h3>
            </div>
            <div className="flex space-x-3">
              <button 
                type="button" 
                onClick={() => setEditSection(null)}
                className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary px-10">
                Save Changes
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {Object.keys(formData).map((key) => renderField(key, formData[key]))}
          </div>

          <div className="pt-10 border-t flex justify-end space-x-4">
            <button 
              type="button" 
              onClick={() => setEditSection(null)}
              className="px-8 py-3 font-bold text-gray-500 hover:text-gray-700"
            >
              Back to List
            </button>
            <button type="submit" className="btn-primary px-12 py-3 shadow-lg shadow-teal-100">
              Apply All Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((item) => (
            <div key={item._id} className="group bg-white border border-gray-100 p-6 rounded-2xl hover:border-teal-200 hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-black text-[#17a2a2] bg-teal-50 px-3 py-1 rounded-full uppercase tracking-tighter">
                    {item.page}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></div>
                </div>
                <h4 className="font-black text-lg uppercase text-gray-800 mb-2 truncate group-hover:text-[#17a2a2] transition-colors">
                  {item.section.replace('_', ' ')}
                </h4>
                <div className="text-xs text-gray-400 font-mono bg-gray-50 p-3 rounded-lg overflow-hidden h-20">
                  {JSON.stringify(item.data, null, 2)}
                </div>
              </div>
              <button 
                onClick={() => handleEdit(item)}
                className="mt-6 w-full py-3 rounded-xl border-2 border-teal-50 text-[#17a2a2] font-black text-sm hover:bg-[#17a2a2] hover:text-white hover:border-[#17a2a2] transition-all duration-300 uppercase tracking-widest"
              >
                Edit Content
              </button>
            </div>
          ))}
          {filteredContent.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <p className="text-gray-400 font-bold">No content found for this category.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageContent;
