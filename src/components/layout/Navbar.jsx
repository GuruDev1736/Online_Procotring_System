import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaShieldAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { ROUTES } from '../../constants';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: 'Home', action: () => scrollToSection('home') },
    { label: 'About Us', action: () => scrollToSection('about') },
    { label: 'Features', action: () => scrollToSection('features') },
    { label: 'Testimonials', action: () => scrollToSection('testimonials') },
    { label: 'Contact Us', action: () => scrollToSection('contact') }
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-lg border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center">
            <div className="bg-gradient-to-r from-sky-500 to-sky-600 p-2 rounded-lg">
              <FaShieldAlt className="text-white text-2xl" />
            </div>
            <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-sky-500 to-sky-600 bg-clip-text text-transparent">
              ProctorAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <button 
                key={index}
                onClick={item.action}
                className="text-gray-700 hover:text-sky-600 transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-4 ml-8">
              <Link 
                to={ROUTES.LOGIN}
                className="px-4 py-2 text-sky-600 hover:text-sky-700 font-medium transition-colors"
              >
                Login
              </Link>
              <Link 
                to={ROUTES.SIGNUP}
                className="px-6 py-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-lg hover:from-sky-600 hover:to-sky-700 transition-all duration-300 font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-sky-600 transition-colors"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item, index) => (
              <button 
                key={index}
                onClick={item.action}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-sky-600 transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile Auth Buttons */}
            <div className="px-3 py-2 space-y-2">
              <Link 
                to={ROUTES.LOGIN}
                className="block w-full text-center px-4 py-2 text-sky-600 hover:text-sky-700 font-medium transition-colors border border-sky-600 rounded-lg"
              >
                Login
              </Link>
              <Link 
                to={ROUTES.SIGNUP}
                className="block w-full text-center px-4 py-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-lg hover:from-sky-600 hover:to-sky-700 transition-all duration-300 font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
