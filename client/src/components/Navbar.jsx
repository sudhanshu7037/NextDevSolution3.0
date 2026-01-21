import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'Company', 
      path: '/about',
      submenu: [
        { name: 'About Us', path: '/about' },
        { name: 'Career', path: '/career' },
      ]
    },
    { 
      name: 'Services', 
      path: '/services',
      submenu: [
        { name: 'Web Development', path: '/services/web-development' },
        { name: 'App Development', path: '/services/app-development' },
        { name: 'Custom Software Development', path: '/services/software' },
        { name: 'Digital Marketing', path: '/services/digital-marketing' },
        { name: 'Search Engine Optimization', path: '/services/seo' },
        { name: 'Graphics & Video Editing', path: '/services/graphics' },
      ]
    },
    { name: 'News & Blogs', path: '/blogs' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-[#17a2a2]">
              NEXTDEVSOLUTION
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  <Link
                    to={link.path}
                    className={`flex items-center text-sm font-medium transition-colors hover:text-[#17a2a2] ${isScrolled ? 'text-gray-700' : 'text-gray-900'}`}
                  >
                    {link.name}
                    {link.submenu && <ChevronDown className="ml-1 w-4 h-4" />}
                  </Link>
                  {link.submenu && (
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#17a2a2]"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link to="/contact" className="btn-primary">
                Let's Connect
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-[#17a2a2] focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-xl absolute w-full left-0 top-[64px] z-50 border-t border-gray-100 h-screen overflow-y-auto pb-20">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <div key={link.name} className="border-b border-gray-50 last:border-0 pb-2">
                <div className="flex justify-between items-center">
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="block py-3 text-lg font-semibold text-gray-800 hover:text-[#17a2a2]"
                  >
                    {link.name}
                  </Link>
                  {link.submenu && (
                    <button 
                      onClick={() => setActiveMobileSubmenu(activeMobileSubmenu === link.name ? null : link.name)}
                      className="p-2 text-gray-500"
                    >
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${activeMobileSubmenu === link.name ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>
                
                {link.submenu && activeMobileSubmenu === link.name && (
                  <div className="bg-gray-50 rounded-lg mt-1 py-2 space-y-1">
                    {link.submenu.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        onClick={() => setIsOpen(false)}
                        className="block px-6 py-2.5 text-gray-600 hover:text-[#17a2a2] hover:bg-gray-100 rounded-md transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-6">
              <Link to="/contact" onClick={() => setIsOpen(false)} className="btn-primary w-full block text-center py-4 text-lg">
                Let's Connect
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
