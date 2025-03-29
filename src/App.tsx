
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MedicineSuggestions from "./pages/MedicineSuggestions";
import MedicineReview from "./pages/MedicineReview";
import SkincareRecommendations from "./pages/SkincareRecommendations";
import VitaminSupplements from "./pages/VitaminSupplements";
import PharmaRep from "./pages/PharmaRep";
import PharmaRepLogin from "./pages/PharmaRepLogin";
import PharmaRepSignup from "./pages/PharmaRepSignup";
import PharmaRepDashboard from "./pages/PharmaRepDashboard";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { BackButton } from "./components/BackButton";
import { AdditionalInfo } from "./components/AdditionalInfo";

const queryClient = new QueryClient();

// Layout component that wraps all pages with common elements
const PageLayout = ({
  children,
  showBackButton = true,
  showAdditionalInfo = true
}) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow pt-16 pb-16">
      {showBackButton && <BackButton />}
      {children}
      {showAdditionalInfo && (
        <div className="container mx-auto px-4">
          <AdditionalInfo />
        </div>
      )}
    </main>
    <Footer />
  </div>
);

// Layout for authentication pages without header, footer, or back button
const AuthLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    {children}
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout showBackButton={false}><Index /></PageLayout>} />
          <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
          <Route path="/signup" element={<AuthLayout><Signup /></AuthLayout>} />
          <Route path="/pharma-rep-login" element={<AuthLayout><PharmaRepLogin /></AuthLayout>} />
          <Route path="/pharma-rep-signup" element={<AuthLayout><PharmaRepSignup /></AuthLayout>} />
          <Route path="/pharma-rep-dashboard" element={<PageLayout showBackButton={false}>
                <PharmaRepDashboard />
              </PageLayout>} />
          <Route path="/medicine-suggestions" element={<PageLayout>
                <MedicineSuggestions />
              </PageLayout>} />
          <Route path="/medicine-review" element={<PageLayout>
                <MedicineReview />
              </PageLayout>} />
          <Route path="/skincare-recommendations" element={<PageLayout>
                <SkincareRecommendations />
              </PageLayout>} />
          <Route path="/vitamin-supplements" element={<PageLayout>
                <VitaminSupplements />
              </PageLayout>} />
          <Route path="/pharma-rep" element={<PageLayout>
                <PharmaRep />
              </PageLayout>} />
          <Route path="/about-us" element={<PageLayout showBackButton={false} showAdditionalInfo={false}>
                <AboutUs />
              </PageLayout>} />
          <Route path="*" element={<PageLayout>
                <NotFound />
              </PageLayout>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
