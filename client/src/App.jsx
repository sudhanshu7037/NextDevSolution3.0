import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Contact from './pages/Contact';
import Career from './pages/Career';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import AdminDashboard from './pages/admin/Dashboard';
import Login from './pages/admin/Login';

function App() {
  return (
    <HelmetProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/services" element={<Layout><Services /></Layout>} />
          <Route path="/services/:category" element={<Layout><ServiceDetail /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/career" element={<Layout><Career /></Layout>} />
          <Route path="/blogs" element={<Layout><Blogs /></Layout>} />
          <Route path="/blogs/:id" element={<Layout><BlogDetail /></Layout>} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
