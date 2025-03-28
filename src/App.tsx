
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MedicineSuggestions from "./pages/MedicineSuggestions";
import MedicineReview from "./pages/MedicineReview";
import SkincareRecommendations from "./pages/SkincareRecommendations";
import VitaminSupplements from "./pages/VitaminSupplements";
import PharmaRep from "./pages/PharmaRep";
import NotFound from "./pages/NotFound";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { BackButton } from "./components/BackButton";

const queryClient = new QueryClient();

// Layout component that wraps all pages with common elements
const PageLayout = ({ children, showBackButton = true }) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    {showBackButton && <BackButton />}
    <div className="flex-grow pt-24">{children}</div>
    <Footer />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route 
          path="/medicine-suggestions" 
          element={
            <PageLayout>
              <MedicineSuggestions />
            </PageLayout>
          } 
        />
        <Route 
          path="/medicine-review" 
          element={
            <PageLayout>
              <MedicineReview />
            </PageLayout>
          } 
        />
        <Route 
          path="/skincare-recommendations" 
          element={
            <PageLayout>
              <SkincareRecommendations />
            </PageLayout>
          } 
        />
        <Route 
          path="/vitamin-supplements" 
          element={
            <PageLayout>
              <VitaminSupplements />
            </PageLayout>
          }
        />
        <Route 
          path="/pharma-rep" 
          element={
            <PageLayout>
              <PharmaRep />
            </PageLayout>
          }
        />
        <Route 
          path="*" 
          element={
            <PageLayout>
              <NotFound />
            </PageLayout>
          } 
        />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
