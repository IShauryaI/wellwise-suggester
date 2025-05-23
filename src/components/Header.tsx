import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Smile } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Updated navigation items without Contact Us link
  const navItems = [
    { name: "Home", path: "/" },
    { name: "For PharmaRep", path: "/pharma-rep" },
    { name: "About Us", path: "/about-us" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 shadow-sm backdrop-blur-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-primary">
            <Heart className="h-7 w-7" strokeWidth={2.5} />
            <span className="text-xl font-bold">WellBeing</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path}
                    className={`text-sm font-medium transition-all duration-200 hover:text-primary 
                      ${location.pathname === item.path ? "text-primary" : "text-dark/80"}`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Welcome Message with Violet Emoji */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2 border rounded-full px-3 py-1.5">
              <span className="text-sm font-medium text-dark/80">
                Welcome <Smile className="inline h-4 w-4 text-violet-500" />
              </span>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-dark" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-slate-200 animate-fade-in">
            <ul className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path}
                    className={`block text-sm font-medium transition-all duration-200 hover:text-primary 
                      ${location.pathname === item.path ? "text-primary" : "text-dark/80"}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2 flex justify-center">
                {/* Welcome Message with Violet Emoji in Mobile Menu */}
                <div className="flex items-center space-x-2 border rounded-full px-3 py-1.5">
                  <span className="text-sm font-medium text-dark/80">
                    Welcome <Smile className="inline h-4 w-4 text-violet-500" />
                  </span>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
