
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MedicineSuggestions from "./pages/MedicineSuggestions";
import MedicineReview from "./pages/MedicineReview";
import SkincareRecommendations from "./pages/SkincareRecommendations";
import VitaminSupplements from "./pages/VitaminSupplements";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/medicine-suggestions" element={<MedicineSuggestions />} />
          <Route path="/medicine-review" element={<MedicineReview />} />
          <Route path="/skincare-recommendations" element={<SkincareRecommendations />} />
          <Route path="/vitamin-supplements" element={<VitaminSupplements />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
