
import { CustomButton } from "./ui/CustomButton";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden hero-gradient">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <span className="px-3 py-1 text-xs font-medium text-primary bg-primary-light rounded-full mb-6 animate-fade-in">
            Your Personalized Healthcare Solution
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-dark mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Your Personalized Healthcare Companion
          </h1>
          
          <p className="text-lg text-gray mb-8 max-w-xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Get personalized medicine recommendations, explore skincare solutions, and discover supplements tailored to your unique needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <CustomButton variant="primary" size="lg" onClick={() => document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" })}>
              Individual Dashboard
            </CustomButton>
            <CustomButton variant="secondary" size="lg">
              Business Solutions
            </CustomButton>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>
    </section>
  );
}
