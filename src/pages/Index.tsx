
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Dashboard } from "@/components/Dashboard";
import { InputSection } from "@/components/InputSection";
import { Features } from "@/components/Features";

const Index = () => {
  // Add page load animations
  useEffect(() => {
    // Apply a class to the body when the page loads
    document.body.classList.add("page-loaded");
    
    // Smooth scroll functionality for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href')?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      });
    });
    
    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("page-loaded");
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Dashboard />
        <InputSection />
        <Features />
      </main>
    </div>
  );
};

export default Index;
