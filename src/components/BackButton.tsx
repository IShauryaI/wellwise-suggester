
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Function to get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    
    switch (path) {
      case '/medicine-suggestions':
        return 'Medicine Suggestions';
      case '/medicine-review':
        return 'Medicine Review';
      case '/skincare-recommendations':
        return 'Skincare Recommendations';
      case '/vitamin-supplements':
        return 'Personalized Vitamin & Supplement Plan';
      case '/pharma-rep':
        return 'For Pharmaceutical Representatives';
      default:
        return '';
    }
  };

  return (
    <div className="flex items-center ml-4 mt-24 mb-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors"
        aria-label="Go back to previous page"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back</span>
      </button>
      <h1 className="text-2xl md:text-3xl font-bold ml-6 text-dark">
        {getPageTitle()}
      </h1>
    </div>
  );
}
