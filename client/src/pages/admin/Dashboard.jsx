import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { LayoutDashboard, FileText, Settings, Users, LogOut, MessageSquare, Menu, X } from 'lucide-react';
import ManageContent from './ManageContent';
import ManageContacts from './ManageContacts';
import ManageBlogs from './ManageBlogs';
import SettingsPage from './Settings';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [stats, setStats] = useState({ services: 0, contacts: 0 });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const NavLink = ({ to, icon: Icon, children }) => (
    <Link
      to={to}
      onClick={() => setSidebarOpen(false)}
      className={`flex items-center p-3 rounded-lg transition-colors ${
        isActive(to)
          ? 'bg-[#17a2a2] text-white'
          : 'hover:bg-[#17a2a2] hover:text-white text-gray-300'
      }`}
    >
      <Icon className="mr-3" size={20} /> {children}
    </Link>
  );

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-[#1a1a1a] text-white flex flex-col transform transition-transform duration-300 z-50 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 md:p-6 text-xl md:text-2xl font-bold border-b border-gray-800 flex justify-between items-center">
          <span>Admin Panel</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-300"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
          <NavLink to="/admin/dashboard" icon={LayoutDashboard}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/content" icon={FileText}>
            Manage Content
          </NavLink>
          <NavLink to="/admin/blogs" icon={FileText}>
            News & Blogs
          </NavLink>
          <NavLink to="/admin/contacts" icon={MessageSquare}>
            Submissions
          </NavLink>
          <NavLink to="/admin/settings" icon={Settings}>
            Settings
          </NavLink>
        </nav>
        <button
          onClick={handleLogout}
          className="p-4 md:p-6 flex items-center hover:text-red-400 border-t border-gray-800 transition-colors"
        >
          <LogOut className="mr-3" size={20} /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow overflow-auto">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700 hover:text-[#17a2a2]"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
          <div className="w-6" />
        </div>

        {/* Content Area */}
        <div className="p-4 md:p-8">
          <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-8 gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
            <div className="text-sm md:text-base text-gray-600">Welcome, Administrator</div>
          </header>

          <Routes>
            <Route
              path="/"
              element={
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border-l-4 border-[#17a2a2]">
                    <h3 className="text-gray-500 text-xs md:text-sm font-medium mb-2">Total Services</h3>
                    <p className="text-2xl md:text-3xl font-bold">12</p>
                  </div>
                  <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
                    <h3 className="text-gray-500 text-xs md:text-sm font-medium mb-2">Contact Inquiries</h3>
                    <p className="text-2xl md:text-3xl font-bold">45</p>
                  </div>
                  <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
                    <h3 className="text-gray-500 text-xs md:text-sm font-medium mb-2">Active Products</h3>
                    <p className="text-2xl md:text-3xl font-bold">6</p>
                  </div>
                </div>
              }
            />
            <Route path="content" element={<ManageContent />} />
            <Route path="blogs" element={<ManageBlogs />} />
            <Route path="contacts" element={<ManageContacts />} />
            <Route path="settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
