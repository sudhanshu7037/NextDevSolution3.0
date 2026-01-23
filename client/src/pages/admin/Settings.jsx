import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { User, Lock, Save, Eye, EyeOff, RefreshCw } from 'lucide-react';

const Settings = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newUsername: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [submitting, setSubmitting] = useState(false);
  const API = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const { data } = await axios.get(`${API}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCurrentUser(data);
      setLoading(false);
    } catch (err) {
      toast.error('Error fetching user data');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.currentPassword) {
      toast.error('Current password is required');
      return;
    }

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (!formData.newUsername && !formData.newPassword) {
      toast.error('Please provide new username or password to update');
      return;
    }

    setSubmitting(true);
    const loadingToast = toast.loading('Updating profile...');

    try {
      const token = localStorage.getItem('adminToken');
      const { data } = await axios.put(
        `${API}/api/auth/profile`,
        {
          currentPassword: formData.currentPassword,
          newUsername: formData.newUsername || undefined,
          newPassword: formData.newPassword || undefined
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update token if changed
      if (data.token) {
        localStorage.setItem('adminToken', data.token);
      }

      toast.success('Profile updated successfully', { id: loadingToast });
      
      // Refresh current user data
      fetchCurrentUser();
      
      // Clear form
      setFormData({
        currentPassword: '',
        newUsername: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error updating profile', { id: loadingToast });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-4 md:p-8 rounded-2xl shadow-sm min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin text-[#17a2a2] mx-auto mb-4" size={48} />
          <p className="text-gray-500 font-medium">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 md:p-8 rounded-2xl shadow-sm min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Current User Info Card */}
        <div className="mb-8 p-6 bg-gradient-to-r from-[#17a2a2] to-[#1f8a8a] rounded-2xl text-white shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <User size={32} className="text-white" />
            </div>
            <div>
              <p className="text-sm opacity-90">Logged in as</p>
              <h3 className="text-2xl font-bold">{currentUser?.username}</h3>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">Account Settings</h2>
          <p className="text-gray-500 text-sm md:text-base">Update your username and password</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Password */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">
              Current Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showPasswords.current ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-12 py-3 md:py-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#17a2a2] transition-all"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.current ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Update Credentials</h3>
            <p className="text-sm text-gray-500 mb-6">Leave fields empty if you don't want to change them</p>

            {/* New Username */}
            <div className="space-y-2 mb-6">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">
                New Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="newUsername"
                  value={formData.newUsername}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 md:py-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#17a2a2] transition-all"
                  placeholder="Enter new username"
                />
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2 mb-6">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPasswords.new ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 md:py-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#17a2a2] transition-all"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('new')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 md:py-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#17a2a2] transition-all"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t">
            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-4 rounded-xl bg-[#17a2a2] text-white font-bold text-sm md:text-base hover:bg-[#1f8a8a] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-teal-100 ${
                submitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Save size={20} />
              {submitting ? 'Updating...' : 'Save Changes'}
            </button>
          </div>
        </form>

        {/* Security Tips */}
        <div className="mt-10 p-6 bg-blue-50 rounded-xl border border-blue-100">
          <h4 className="font-bold text-blue-900 mb-3 text-sm md:text-base">Security Tips</h4>
          <ul className="space-y-2 text-xs md:text-sm text-blue-800">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Use a strong password with at least 8 characters</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Include uppercase, lowercase, numbers, and special characters</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Never share your admin credentials with anyone</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Update your password regularly for better security</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Settings;
