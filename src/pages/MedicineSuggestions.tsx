
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomButton } from "@/components/ui/CustomButton";
import { ArrowLeft, Pill } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MedicineSuggestions = () => {
  const [symptoms, setSymptoms] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      // Example AI-generated medicine suggestions
      const mockSuggestions = [
        "Ibuprofen - A nonsteroidal anti-inflammatory drug (NSAID) that can help relieve pain and reduce inflammation.",
        "Acetaminophen - An analgesic that can help with fever and pain relief without anti-inflammatory effects.",
        "Diphenhydramine - An antihistamine that might help with allergic reactions or sleep issues.",
      ];
      
      setResults(mockSuggestions);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center text-gray mb-6 hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </button>

          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary-light p-2 rounded-full">
                <Pill className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-dark">Medicine Suggestions</h1>
            </div>
            
            <p className="text-gray mb-8">
              Describe your symptoms in detail, and our AI will analyze them to provide personalized medication suggestions.
            </p>

            {results.length === 0 ? (
              <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="mb-6">
                  <label htmlFor="symptoms" className="block text-sm font-medium text-dark mb-2">
                    Describe your symptoms:
                  </label>
                  <textarea 
                    id="symptoms"
                    className="w-full px-4 py-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="e.g., Fever, headache, sore throat, etc."
                    rows={4}
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="additionalInfo" className="block text-sm font-medium text-dark mb-2">
                    Additional Information (optional):
                  </label>
                  <textarea 
                    id="additionalInfo"
                    className="w-full px-4 py-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="e.g., Allergies, current medications, medical history, etc."
                    rows={3}
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                  />
                </div>

                <div className="flex justify-end">
                  <CustomButton 
                    variant="primary" 
                    type="submit" 
                    isLoading={isLoading}
                  >
                    Get AI Suggestions
                  </CustomButton>
                </div>
              </form>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4 text-dark">
                  Suggested Medications:
                </h2>
                <div className="space-y-4">
                  {results.map((suggestion, index) => (
                    <div key={index} className="p-4 border border-primary-light rounded-md bg-primary-light/10">
                      <p className="text-dark">{suggestion}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <p className="text-sm text-gray/80 italic">
                    These suggestions are AI-generated and should not replace professional medical advice.
                  </p>
                  <CustomButton 
                    variant="outline" 
                    onClick={() => setResults([])}
                  >
                    Start New Search
                  </CustomButton>
                </div>
              </div>
            )}

            <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
              <h3 className="text-lg font-semibold mb-3 text-dark">
                Important Disclaimer
              </h3>
              <p className="text-gray text-sm">
                The information provided is for general informational purposes only and should 
                not be considered as medical advice. Always consult with a qualified healthcare 
                provider before starting any medication. Our AI suggestions are based on pattern 
                recognition and not a substitute for professional diagnosis.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MedicineSuggestions;
