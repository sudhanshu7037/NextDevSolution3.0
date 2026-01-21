import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CustomCursor from './CustomCursor';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <CustomCursor />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/917033313450"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
          alt="WhatsApp" 
          className="w-8 h-8"
        />
      </a>
    </div>
  );
};

export default Layout;
