
import { HelpCircle, Clipboard, UserCheck, BarChart3 } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: <HelpCircle className="w-8 h-8" />,
      title: "AI-Powered Recommendations",
      description: "Our website uses AI to analyze your symptoms and provides accurate treatment suggestions based on the latest medical research and data. Get personalized recommendations tailored specifically to your needs.",
    },
    {
      icon: <Clipboard className="w-8 h-8" />,
      title: "Community Reviews",
      description: "Access thousands of authentic user reviews to make informed healthcare decisions. Our platform collects detailed feedback on medications, skincare products, and supplements, helping you learn from others' experiences.",
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Personalized Care",
      description: "Get customized healthcare solutions tailored to your unique needs and preferences. Our system continuously learns from your feedback to improve future recommendations, creating a truly personalized health experience.",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Analytics",
      description: "Our platform uses sophisticated analytics to help you understand the effectiveness of different healthcare products. Track your progress, monitor improvements, and make data-driven decisions about your health.",
    }
  ];

  return (
    <section className="py-20 bg-primary-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="px-3 py-1 text-xs font-medium text-primary bg-white rounded-full mb-4 inline-block">
            Our Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark">
            Discover how we can help you
          </h2>
          <p className="text-gray max-w-2xl mx-auto">
            Make informed healthcare decisions with our cutting-edge features and personalized recommendations
          </p>
        </div>
        
        <div className="space-y-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card flex flex-col md:flex-row gap-6 p-8 items-start hover-lift-effect overflow-hidden"
            >
              <div className="feature-icon shrink-0">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-dark">
                  {feature.title}
                </h3>
                <p className="text-gray mb-4">
                  {feature.description}
                </p>
              </div>
              
              {/* Decorative shapes */}
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-primary-light/30 rounded-full blur-xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
