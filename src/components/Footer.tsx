
import { Heart } from "lucide-react";

export function Footer() {
  const footerLinks = [
    {
      title: "WellBeing",
      links: [
        { name: "About Us", href: "#" },
        { name: "Our Team", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact Us", href: "#" },
      ]
    },
    {
      title: "Services",
      links: [
        { name: "Medicine Recommendations", href: "#" },
        { name: "Medicine Reviews", href: "#" },
        { name: "Skincare Recommendations", href: "#" },
        { name: "Vitamin & Supplements", href: "#" },
      ]
    },
    {
      title: "For Businesses",
      links: [
        { name: "Business Solutions", href: "#" },
        { name: "Analytics", href: "#" },
        { name: "Partnerships", href: "#" },
        { name: "API Access", href: "#" },
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Cookie Policy", href: "#" },
      ]
    }
  ];

  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerLinks.map((column, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-semibold relative pb-3 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-primary">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href}
                      className="text-slate-300 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="pt-8 border-t border-slate-700/50 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">WellBeing</span>
          </div>
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} WellBeing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
