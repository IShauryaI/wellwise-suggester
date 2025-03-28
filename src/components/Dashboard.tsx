
import { CustomButton } from "./ui/CustomButton";
import { Pill, UserRound, Sparkles, Beaker, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();
  
  const dashboardItems = [
    {
      icon: <Pill className="w-8 h-8"/>,
      title: "Medicine Suggestions",
      description: "Get personalized medication suggestions based on your symptoms, backed by AI-powered analysis.",
      cta: "Get Started",
      action: () => navigate('/medicine-suggestions')
    },
    {
      icon: <MessageSquare className="w-8 h-8"/>,
      title: "Medicine Review",
      description: "Share your experiences with medications and help others make informed decisions about their treatment.",
      cta: "Write a Review",
      action: () => navigate('/medicine-review')
    },
    {
      icon: <UserRound className="w-8 h-8"/>,
      title: "For PharmaRep",
      description: "Share your experiences with medications and learn from others to make better treatment decisions.",
      cta: "View Reviews",
      action: () => console.log("PharmaRep clicked")
    },
    {
      icon: <Sparkles className="w-8 h-8"/>,
      title: "Skincare Recommendations",
      description: "Discover the perfect skincare routine tailored to your skin type and concerns.",
      cta: "Get Personalized Plan",
      action: () => document.getElementById('skincare-input')?.scrollIntoView({ behavior: "smooth" })
    },
    {
      icon: <Beaker className="w-8 h-8"/>,
      title: "Vitamin & Supplement Suggestions",
      description: "Get personalized vitamin and supplement recommendations based on your lifestyle and health goals.",
      cta: "Find Your Supplements",
      action: () => document.getElementById('vitamin-input')?.scrollIntoView({ behavior: "smooth" })
    }
  ];

  return (
    <section id="dashboard" className="py-20 bg-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-14">
          <span className="px-3 py-1 text-xs font-medium text-primary bg-primary-light rounded-full mb-4 inline-block">
            Dashboard
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark">
            Access personalized health recommendations
          </h2>
          <p className="text-gray max-w-2xl mx-auto">
            All your personalized health solutions in one place, powered by advanced AI technology
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {dashboardItems.map((item, index) => (
            <div 
              key={index}
              className="hover-lift-effect bg-white rounded-lg p-6 text-center"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="feature-icon mx-auto">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-dark">
                {item.title}
              </h3>
              <p className="text-gray mb-6 text-sm">
                {item.description}
              </p>
              <CustomButton 
                variant="outline"
                onClick={item.action}
              >
                {item.cta}
              </CustomButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
