
import { useState, useEffect } from "react";
import { CustomButton } from "./ui/CustomButton";
import { Heart } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 shadow-sm backdrop-blur-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <Heart className="h-7 w-7" strokeWidth={2.5} />
            <span className="text-xl font-bold">WellBeing</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {["Home", "For Individuals", "PharmaRep", "About Us", "Contact"].map((item, index) => (
                <li key={index}>
                  <a 
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                    className={`text-sm font-medium transition-all duration-200 hover:text-primary 
                      ${index === 0 ? "text-primary" : "text-dark/80"}`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <CustomButton variant="outline" size="sm">
              Login
            </CustomButton>
            <CustomButton variant="primary" size="sm">
              Sign Up
            </CustomButton>
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
              {["Home", "For Individuals", "PharmaRep", "About Us", "Contact"].map((item, index) => (
                <li key={index}>
                  <a 
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                    className={`block text-sm font-medium transition-all duration-200 hover:text-primary 
                      ${index === 0 ? "text-primary" : "text-dark/80"}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
              <li className="pt-2 flex flex-col gap-3">
                <CustomButton variant="outline" size="sm">
                  Login
                </CustomButton>
                <CustomButton variant="primary" size="sm">
                  Sign Up
                </CustomButton>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
