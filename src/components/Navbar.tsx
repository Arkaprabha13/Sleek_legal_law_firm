
import React, { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setShowSearch(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-playfair font-bold">
            <span className="text-law-charcoal">Sleek</span>
            <span className="text-law-gold">Legal</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink to="/" isActive={location.pathname === "/"}>Home</NavLink>
          <NavLink to="/about" isActive={location.pathname === "/about"}>About</NavLink>
          <NavLink to="/practice-areas" isActive={location.pathname === "/practice-areas"}>Practice Areas</NavLink>
          <NavLink to="/attorneys" isActive={location.pathname === "/attorneys"}>Attorneys</NavLink>
          <NavLink to="/testimonials" isActive={location.pathname === "/testimonials"}>Testimonials</NavLink>
          <NavLink to="/blog" isActive={location.pathname.startsWith("/blog")}>Blog</NavLink>
          <NavLink to="/contact" isActive={location.pathname === "/contact"}>Contact</NavLink>
          
          <button 
            onClick={() => setShowSearch(!showSearch)}
            className="text-law-charcoal hover:text-law-gold transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          
          <Link 
            to="/contact" 
            className="btn btn-gold"
          >
            Free Consultation
          </Link>
        </div>

        {/* Mobile Navigation Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button 
            onClick={() => setShowSearch(!showSearch)}
            className="text-law-charcoal hover:text-law-gold transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          
          <button
            className="text-law-charcoal"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Search overlay */}
      {showSearch && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md p-4 animate-fade-in">
          <div className="container">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for practice areas, attorneys, blog posts..." 
                className="w-full p-3 pr-10 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-law-gold"
                autoFocus
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-md animate-fade-in">
          <div className="container py-4 flex flex-col space-y-4">
            <MobileNavLink to="/">Home</MobileNavLink>
            <MobileNavLink to="/about">About</MobileNavLink>
            <MobileNavLink to="/practice-areas">Practice Areas</MobileNavLink>
            <MobileNavLink to="/attorneys">Attorneys</MobileNavLink>
            <MobileNavLink to="/testimonials">Testimonials</MobileNavLink>
            <MobileNavLink to="/blog">Blog</MobileNavLink>
            <MobileNavLink to="/contact">Contact</MobileNavLink>
            <Link 
              to="/contact" 
              className="btn btn-gold text-center"
            >
              Free Consultation
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ 
  to, 
  children, 
  isActive 
}: { 
  to: string; 
  children: React.ReactNode;
  isActive?: boolean;
}) => (
  <Link
    to={to}
    className={`text-law-charcoal hover:text-law-gold transition-colors font-medium ${isActive ? 'text-law-gold' : ''}`}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ 
  to, 
  children, 
}: { 
  to: string; 
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    className="text-law-charcoal hover:text-law-gold transition-colors py-2 border-b border-gray-100 font-medium"
  >
    {children}
  </Link>
);

export default Navbar;
