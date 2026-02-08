import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Waves, ChevronDown, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Models", path: "/models" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white backdrop-blur-xl shadow-lg border-b border-gray-200/50"
            : "bg-white/80 backdrop-blur-md border-b border-gray-200/30"
        }`}
        style={{ fontFamily: "Montserrat"}}
      >

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo with Enhanced Animation */}
            <Link
              to="/"
              className="flex items-center gap-3 group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl blur-md opacity-0 group-hover:opacity-75 transition-opacity duration-500"></div>
                
                {/* Logo Container */}
                <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Waves className="w-7 h-7 text-white animate-pulse" />
                  
                  {/* Sparkle Effect */}
                  <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" />
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  Oceanum
                </span>
                <span className="text-xs text-gray-500 -mt-1 font-medium tracking-wider">
                  AI LIBRARY
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-5 py-2.5 rounded-xl transition-all duration-300 group ${
                    isActive(link.path)
                      ? "text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:text-black"
                      : "text-gray-700 hover:text-black font-medium"
                  }`}
                  style={{
                    animation: `fade-slide-down 0.4s ease-out ${index * 0.1}s backwards`,
                  }}
                >
                  {/* Active Indicator */}
                  {isActive(link.path) && (
                    <>
                      {/* <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-full"></div> */}
                    </>
                  )}

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 via-blue-50 to-purple-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <span className="relative z-10">{link.name}</span>

                  {/* Hover Underline */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-full group-hover:w-1/2 transition-all duration-300"></div>
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
             
              {/* Primary Button */}
              <button
                onClick={() => navigate("/about")}
                className="relative px-6 py-2.5 rounded-xl text-white font-semibold overflow-hidden group shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 group-hover:scale-110 transition-transform duration-500"></div>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-500"></div>

                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                </span>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors duration-300 group"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`w-6 h-6 text-gray-700 absolute inset-0 transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "opacity-0 rotate-90"
                      : "opacity-100 rotate-0"
                  }`}
                />
                <X
                  className={`w-6 h-6 text-gray-700 absolute inset-0 transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "opacity-100 rotate-0"
                      : "opacity-0 -rotate-90"
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
              isMobileMenuOpen
                ? "max-h-[500px] opacity-100 pb-6"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-2 pt-4">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`relative px-5 py-4 rounded-xl transition-all duration-300 group overflow-hidden ${
                    isActive(link.path)
                      ? "bg-gradient-to-r from-cyan-50 via-blue-50 to-purple-50 text-blue-600 font-semibold shadow-md"
                      : "text-gray-700 hover:bg-gray-50 font-medium"
                  }`}
                  style={{
                    animation: `slide-in-mobile 0.4s ease-out ${index * 0.1}s backwards`,
                  }}
                >
                  {isActive(link.path) && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyan-500 via-blue-600 to-purple-600 rounded-r-full"></div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 via-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <span className="relative z-10 flex items-center justify-between">
                    {link.name}
                    {isActive(link.path) && (
                      <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full animate-pulse"></div>
                    )}
                  </span>
                </Link>
              ))}

              {/* Mobile CTA Buttons */}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-200">

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate("/about");
                  }}
                  className="relative px-5 py-4 rounded-xl text-white font-semibold overflow-hidden group shadow-lg"
                  style={{
                    animation: `slide-in-mobile 0.4s ease-out 0.4s backwards`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Get Started
                    <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content jump */}
      <div className="h-20"></div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fade-slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-mobile {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}