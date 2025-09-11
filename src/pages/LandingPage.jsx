import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaRobot, 
  FaCode, 
  FaCalendarAlt, 
  FaShieldAlt, 
  FaChevronDown,
  FaStar,
  FaQuoteLeft,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { MdAssignment, MdSecurity, MdSpeed, MdGroup } from 'react-icons/md';
import ThreeBackground from '../components/common/ThreeBackground';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const features = [
    {
      icon: <MdAssignment className="text-4xl text-sky-600" />,
      title: "Aptitude Test",
      description: "Comprehensive aptitude testing with intelligent question generation"
    },
    {
      icon: <FaCode className="text-4xl text-sky-600" />,
      title: "Integrated Code Editor",
      description: "Built-in code editor with syntax highlighting and real-time compilation"
    },
    {
      icon: <FaCalendarAlt className="text-4xl text-sky-600" />,
      title: "Interview Scheduling",
      description: "Smart scheduling system with automated reminders and calendar integration"
    },
    {
      icon: <FaRobot className="text-4xl text-sky-600" />,
      title: "AI Interview",
      description: "Advanced AI-powered interview system with real-time analysis and feedback"
    }
  ];

  const benefits = [
    {
      icon: <MdSecurity className="text-3xl text-white" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee"
    },
    {
      icon: <MdSpeed className="text-3xl text-white" />,
      title: "Real-time Monitoring",
      description: "Advanced proctoring with live monitoring and instant alerts"
    },
    {
      icon: <MdGroup className="text-3xl text-white" />,
      title: "Scalable Solution",
      description: "Support thousands of concurrent users with seamless performance"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "HR Director at TechCorp",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b578?w=150&h=150&fit=crop&crop=face",
      text: "ProctorAI has revolutionized our hiring process. The AI interview feature saves us hours of screening time.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "CTO at StartupXYZ",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      text: "The integrated code editor is fantastic. Candidates can showcase their skills in a real coding environment.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Lead Recruiter at GlobalTech",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: "Interview scheduling has never been easier. The automated system handles everything seamlessly.",
      rating: 5
    }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-lg border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-sky-500 to-sky-600 p-2 rounded-lg">
                <FaShieldAlt className="text-white text-2xl" />
              </div>
              <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-sky-500 to-sky-600 bg-clip-text text-transparent">
                ProctorAI
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className={`text-gray-700 hover:text-sky-600 transition-colors font-medium relative pb-1 ${
                  activeSection === 'home' 
                    ? 'text-sky-600 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-sky-600 after:rounded-full' 
                    : ''
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className={`text-gray-700 hover:text-sky-600 transition-colors font-medium relative pb-1 ${
                  activeSection === 'about' 
                    ? 'text-sky-600 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-sky-600 after:rounded-full' 
                    : ''
                }`}
              >
                About Us
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className={`text-gray-700 hover:text-sky-600 transition-colors font-medium relative pb-1 ${
                  activeSection === 'features' 
                    ? 'text-sky-600 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-sky-600 after:rounded-full' 
                    : ''
                }`}
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className={`text-gray-700 hover:text-sky-600 transition-colors font-medium relative pb-1 ${
                  activeSection === 'testimonials' 
                    ? 'text-sky-600 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-sky-600 after:rounded-full' 
                    : ''
                }`}
              >
                Testimonials
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className={`text-gray-700 hover:text-sky-600 transition-colors font-medium relative pb-1 ${
                  activeSection === 'contact' 
                    ? 'text-sky-600 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-sky-600 after:rounded-full' 
                    : ''
                }`}
              >
                Contact Us
              </button>
              
              {/* Auth Buttons */}
              <div className="flex items-center space-x-4 ml-8">
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-sky-600 hover:text-sky-700 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
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
              <button 
                onClick={() => scrollToSection('home')}
                className={`block w-full text-left px-3 py-2 transition-colors font-medium rounded-lg ${
                  activeSection === 'home' 
                    ? 'text-sky-600 bg-sky-50 border-l-4 border-sky-600' 
                    : 'text-gray-700 hover:text-sky-600'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className={`block w-full text-left px-3 py-2 transition-colors font-medium rounded-lg ${
                  activeSection === 'about' 
                    ? 'text-sky-600 bg-sky-50 border-l-4 border-sky-600' 
                    : 'text-gray-700 hover:text-sky-600'
                }`}
              >
                About Us
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className={`block w-full text-left px-3 py-2 transition-colors font-medium rounded-lg ${
                  activeSection === 'features' 
                    ? 'text-sky-600 bg-sky-50 border-l-4 border-sky-600' 
                    : 'text-gray-700 hover:text-sky-600'
                }`}
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className={`block w-full text-left px-3 py-2 transition-colors font-medium rounded-lg ${
                  activeSection === 'testimonials' 
                    ? 'text-sky-600 bg-sky-50 border-l-4 border-sky-600' 
                    : 'text-gray-700 hover:text-sky-600'
                }`}
              >
                Testimonials
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className={`block w-full text-left px-3 py-2 transition-colors font-medium rounded-lg ${
                  activeSection === 'contact' 
                    ? 'text-sky-600 bg-sky-50 border-l-4 border-sky-600' 
                    : 'text-gray-700 hover:text-sky-600'
                }`}
              >
                Contact Us
              </button>
              
              {/* Mobile Auth Buttons */}
              <div className="px-3 py-2 space-y-2">
                <Link 
                  to="/login" 
                  className="block w-full text-center px-4 py-2 text-sky-600 hover:text-sky-700 font-medium transition-colors border border-sky-600 rounded-lg"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="block w-full text-center px-4 py-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-lg hover:from-sky-600 hover:to-sky-700 transition-all duration-300 font-medium"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-sky-50">
        {/* Three.js Background */}
        <div className="absolute inset-0 opacity-30">
          <ThreeBackground />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Next-Gen
              <span className="block bg-gradient-to-r from-sky-500 to-sky-600 bg-clip-text text-transparent">
                Online Proctoring
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
              Revolutionize your hiring process with AI-powered interviews, aptitude tests, 
              integrated coding environments, and intelligent scheduling.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link 
                to="/signup" 
                className="px-8 py-4 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-xl hover:from-sky-600 hover:to-sky-700 transition-all duration-300 font-semibold text-lg transform hover:scale-105"
              >
                Get Started Free
              </Link>
              <button 
                onClick={() => scrollToSection('features')}
                className="px-8 py-4 border-2 border-sky-500 text-sky-600 rounded-xl hover:bg-sky-50 transition-all duration-300 font-semibold text-lg"
              >
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="text-4xl font-bold text-sky-600 mb-2">10,000+</div>
                <div className="text-gray-600">Interviews Conducted</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-sky-600 mb-2">500+</div>
                <div className="text-gray-600">Companies Trust Us</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-sky-600 mb-2">99.9%</div>
                <div className="text-gray-600">Uptime Guarantee</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <FaChevronDown className="text-2xl text-sky-600" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-sky-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About ProctorAI
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We're revolutionizing the way organizations conduct interviews and assessments. 
                Our AI-powered platform combines cutting-edge technology with human insight to 
                create the most comprehensive online proctoring solution available.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Founded by a team of experts in AI, cybersecurity, and talent acquisition, 
                ProctorAI is trusted by leading companies worldwide to streamline their 
                hiring processes while maintaining the highest standards of integrity.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-gradient-to-br from-sky-500 to-sky-600 p-6 rounded-xl text-white">
                    <div className="mb-4">
                      {benefit.icon}
                    </div>
                    <h4 className="font-bold mb-2">{benefit.title}</h4>
                    <p className="text-sm opacity-90">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-sky-100 to-sky-200 rounded-2xl p-8 transform rotate-3">
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=400&fit=crop" 
                  alt="Team collaboration" 
                  className="rounded-xl shadow-lg transform -rotate-3"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to conduct seamless, secure, and intelligent online assessments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-sky-200 group">
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted by leading companies worldwide for secure and efficient online assessments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-lg" />
                  ))}
                </div>
                
                <div className="mb-6">
                  <FaQuoteLeft className="text-sky-500 text-2xl mb-4" />
                  <p className="text-gray-600 italic">{testimonial.text}</p>
                </div>
                
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-sky-900 to-sky-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Get In Touch
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Ready to transform your hiring process? Contact us today for a demo or consultation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <FaPhone className="text-2xl mr-4 text-sky-300" />
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="opacity-90">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <FaEnvelope className="text-2xl mr-4 text-sky-300" />
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="opacity-90">contact@proctorai.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-2xl mr-4 text-sky-300" />
                  <div>
                    <h4 className="font-semibold">Address</h4>
                    <p className="opacity-90">123 Tech Street, Silicon Valley, CA 94025</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-2xl hover:text-sky-300 transition-colors">
                    <FaLinkedin />
                  </a>
                  <a href="#" className="text-2xl hover:text-sky-300 transition-colors">
                    <FaTwitter />
                  </a>
                  <a href="#" className="text-2xl hover:text-sky-300 transition-colors">
                    <FaFacebook />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:border-sky-300 placeholder-white/70 text-white"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:border-sky-300 placeholder-white/70 text-white"
                  />
                </div>
                
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:border-sky-300 placeholder-white/70 text-white"
                />
                
                <textarea
                  rows={4}
                  placeholder="Your Message"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:border-sky-300 placeholder-white/70 text-white resize-none"
                ></textarea>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-sky-600 hover:to-sky-700 transition-all duration-300 transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-sky-500 to-sky-600 p-2 rounded-lg">
                <FaShieldAlt className="text-white text-2xl" />
              </div>
              <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-sky-500 to-sky-600 bg-clip-text text-transparent">
                ProctorAI
              </span>
            </div>
            
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Empowering organizations with intelligent online proctoring solutions 
              for secure, efficient, and scalable assessments.
            </p>
            
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400">
                © 2025 ProctorAI. All rights reserved. | Privacy Policy | Terms of Service
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
