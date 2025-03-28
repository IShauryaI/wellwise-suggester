
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomButton } from "@/components/ui/CustomButton";
import { ArrowLeft, Pill } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  description: string;
}

const MedicineSuggestions = () => {
  const [symptoms, setSymptoms] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [recommendedMedicines, setRecommendedMedicines] = useState<Medicine[]>([]);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!symptoms.trim()) {
      toast.error("Please enter your symptoms");
      setIsLoading(false);
      return;
    }

    // Simulate AI processing and get medicine recommendations
    setTimeout(() => {
      const symptomsArray = symptoms.toLowerCase().split(/[,\s]+/).filter(s => s.length > 2);
      const detectedSymptoms = [];

      // Detect symptoms from input
      if (symptomsArray.some(s => s.includes("fever") || s.includes("temperature") || s.includes("hot"))) {
        detectedSymptoms.push("fever");
      }
      if (symptomsArray.some(s => s.includes("head") || s.includes("migraine"))) {
        detectedSymptoms.push("headache");
      }
      if (symptomsArray.some(s => s.includes("throat") || s.includes("swallow"))) {
        detectedSymptoms.push("sore throat");
      }
      if (symptomsArray.some(s => s.includes("cough") || s.includes("throat") || s.includes("phlegm"))) {
        detectedSymptoms.push("coughing");
      }
      if (symptomsArray.some(s => s.includes("nose") || s.includes("nasal") || s.includes("congestion"))) {
        detectedSymptoms.push("nasal congestion");
      }

      // Ensure we have at least some default symptoms if none were detected
      if (detectedSymptoms.length === 0) {
        detectedSymptoms.push("general discomfort");
      }

      setResults(detectedSymptoms);

      // Generate medicine recommendations based on symptoms
      const medicineRecommendations: Medicine[] = [];

      if (detectedSymptoms.includes("fever") || detectedSymptoms.includes("headache")) {
        medicineRecommendations.push({
          name: "Paracetamol",
          dosage: "500-1000 mg",
          frequency: "Every 4-6 hours as needed (max 4g per day)",
          description: "For relief of fever, headaches and general pain. Helps reduce body temperature and alleviate discomfort."
        });
        
        medicineRecommendations.push({
          name: "Ibuprofen",
          dosage: "200-400 mg",
          frequency: "Every 6-8 hours as needed with food",
          description: "Anti-inflammatory medication that reduces fever, pain, and inflammation. Effective for headaches and body aches."
        });
      }

      if (detectedSymptoms.includes("sore throat")) {
        medicineRecommendations.push({
          name: "Benzocaine Lozenges",
          dosage: "1 lozenge",
          frequency: "Every 2 hours as needed",
          description: "Contains a local anesthetic that numbs the throat, providing temporary relief from sore throat pain."
        });
      }

      if (detectedSymptoms.includes("coughing")) {
        medicineRecommendations.push({
          name: "Dextromethorphan Syrup",
          dosage: "10-20 ml",
          frequency: "Every 4 hours as needed",
          description: "Cough suppressant that helps reduce the urge to cough. Best for dry, non-productive coughs."
        });
      }

      if (detectedSymptoms.includes("nasal congestion")) {
        medicineRecommendations.push({
          name: "Pseudoephedrine",
          dosage: "60 mg",
          frequency: "Every 4-6 hours (max 240mg daily)",
          description: "Decongestant that relieves nasal stuffiness and sinus pressure by shrinking blood vessels in the nasal passages."
        });
      }

      // Add a general recommendation if we don't have enough specific ones
      if (medicineRecommendations.length < 4) {
        medicineRecommendations.push({
          name: "Multivitamin Complex",
          dosage: "1 tablet",
          frequency: "Once daily with food",
          description: "Supports immune function and overall health during recovery with essential vitamins and minerals."
        });
      }

      setRecommendedMedicines(medicineRecommendations);
      setIsLoading(false);
    }, 2000);
  };

  const productCategories = [
    {
      title: "For Fever and Pain Relief",
      products: [
        {
          name: "Acetaminophen Extra Strength",
          price: "$8.99",
          description: "Effective pain reliever and fever reducer. Suitable for headaches, muscle aches, backache, and minor arthritis pain.",
          rating: 5,
          reviews: 425,
          image: "/api/placeholder/200/200"
        },
        {
          name: "Ibuprofen Tablets",
          price: "$7.49",
          description: "Non-steroidal anti-inflammatory drug (NSAID) that reduces fever and relieves pain or inflammation.",
          rating: 4,
          reviews: 312,
          image: "/api/placeholder/200/200"
        },
        {
          name: "Aspirin Tablets",
          price: "$6.99",
          description: "Pain reliever and fever reducer. Also has anti-inflammatory properties to reduce swelling and inflammation.",
          rating: 4,
          reviews: 289,
          image: "/api/placeholder/200/200"
        }
      ]
    },
    {
      title: "For Sore Throat Relief",
      products: [
        {
          name: "Menthol Throat Lozenges",
          price: "$5.99",
          description: "Soothes sore throat and provides temporary relief from throat irritation with cooling menthol.",
          rating: 5,
          reviews: 189,
          image: "/api/placeholder/200/200"
        },
        {
          name: "Honey Lemon Throat Spray",
          price: "$9.49",
          description: "Fast-acting spray coats the throat with soothing honey and lemon to provide immediate relief.",
          rating: 4,
          reviews: 142,
          image: "/api/placeholder/200/200"
        },
        {
          name: "Warm Salt Water Gargle Kit",
          price: "$4.99",
          description: "Traditional remedy for sore throat. Contains pharmaceutical-grade salt and measuring cup for proper mixing.",
          rating: 4,
          reviews: 98,
          image: "/api/placeholder/200/200"
        }
      ]
    },
    {
      title: "For Cough Relief",
      products: [
        {
          name: "Cough Syrup with Dextromethorphan",
          price: "$11.99",
          description: "Temporarily relieves cough due to minor throat and bronchial irritation associated with the common cold.",
          rating: 4,
          reviews: 205,
          image: "/api/placeholder/200/200"
        },
        {
          name: "Honey-Based Cough Drops",
          price: "$6.49",
          description: "Natural honey-based lozenges that soothe the throat and suppress coughing with natural ingredients.",
          rating: 5,
          reviews: 176,
          image: "/api/placeholder/200/200"
        },
        {
          name: "Chest Rub Ointment",
          price: "$8.99",
          description: "Medicated vapor rub that helps suppress coughs and relieve chest congestion when applied topically.",
          rating: 4,
          reviews: 132,
          image: "/api/placeholder/200/200"
        }
      ]
    }
  ];

  // Render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`${i < rating ? "text-amber-500" : "text-gray-300"}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm mb-6">
            <a href="/" className="text-gray hover:text-primary transition-colors">Home</a>
            <span className="mx-2 text-gray">/</span>
            <a href="/#dashboard" className="text-gray hover:text-primary transition-colors">Dashboard</a>
            <span className="mx-2 text-gray">/</span>
            <span className="text-dark font-medium">Medicine Recommendations</span>
          </div>

          {results.length === 0 ? (
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
          ) : (
            <>
              {/* Recommendation Hero */}
              <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <button 
                  onClick={() => {
                    setResults([]);
                    setRecommendedMedicines([]);
                  }} 
                  className="flex items-center text-gray mb-6 hover:text-primary transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Symptoms Form
                </button>

                <h1 className="text-3xl font-bold text-dark mb-4">
                  Recommended Medications Based on Your Symptoms
                </h1>
                <p className="text-gray mb-6">
                  Our AI has analyzed your symptoms and found the following recommended treatments. 
                  Always consult with a healthcare professional before starting any new medication.
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {results.map((symptom, index) => (
                    <div 
                      key={index} 
                      className="bg-primary-light text-primary px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {symptom.charAt(0).toUpperCase() + symptom.slice(1)}
                    </div>
                  ))}
                </div>

                <CustomButton 
                  variant="outline" 
                  onClick={() => navigate('/')}
                >
                  Back to Dashboard
                </CustomButton>
              </section>

              {/* AI Recommended Medicines */}
              <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-bold text-dark mb-6 pb-4 border-b border-slate-200">
                  AI Recommended Medicines
                </h2>
                <div className="space-y-6">
                  {recommendedMedicines.map((medicine, index) => (
                    <div key={index} className="border border-slate-200 rounded-lg p-6 hover:border-primary transition-all">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-semibold text-primary">{medicine.name}</h3>
                        <div className="bg-primary-light text-primary px-3 py-1 rounded-full text-sm font-medium">
                          Recommended
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Dosage</p>
                          <p className="font-medium">{medicine.dosage}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Frequency</p>
                          <p className="font-medium">{medicine.frequency}</p>
                        </div>
                      </div>
                      <p className="text-gray">{medicine.description}</p>
                      <div className="mt-4 flex justify-end">
                        <CustomButton variant="outline" size="sm">
                          Learn More
                        </CustomButton>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Product Categories */}
              {productCategories.map((category, categoryIndex) => (
                <section key={categoryIndex} className="bg-white rounded-lg shadow-sm p-6 mb-8">
                  <h2 className="text-2xl font-bold text-dark mb-6 pb-4 border-b border-slate-200">
                    {category.title}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.products.map((product, productIndex) => (
                      <Card key={productIndex} className="border border-slate-200 hover-lift-effect overflow-hidden">
                        <div className="h-48 bg-muted flex items-center justify-center">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="max-h-40 object-contain" 
                          />
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold mb-2 text-dark">{product.name}</h3>
                          <div className="text-primary font-bold text-lg mb-2">{product.price}</div>
                          <p className="text-gray text-sm mb-4 min-h-[80px]">{product.description}</p>
                          
                          <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2">
                              <div className="flex">{renderStars(product.rating)}</div>
                              <span className="text-gray text-sm">({product.reviews})</span>
                            </div>
                            <span className="text-secondary text-sm font-medium">In Stock</span>
                          </div>
                          
                          <div className="flex gap-2">
                            <CustomButton variant="primary" size="sm">
                              Buy Now
                            </CustomButton>
                            <CustomButton variant="outline" size="sm">
                              Learn More
                            </CustomButton>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              ))}

              {/* Additional Information */}
              <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-bold text-dark mb-6">
                  Additional Information
                </h2>

                <div className="border-l-4 border-primary bg-primary-light/10 p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-2 text-dark">
                    When to Seek Medical Help
                  </h3>
                  <p className="text-gray">
                    If symptoms persist beyond 3 days or worsen, consult a healthcare professional. 
                    Seek immediate medical attention if you experience difficulty breathing, severe pain, 
                    high fever (above 103°F/39.4°C), or sudden worsening of symptoms.
                  </p>
                </div>

                <div className="border-l-4 border-primary bg-primary-light/10 p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-2 text-dark">
                    Lifestyle Recommendations
                  </h3>
                  <p className="text-gray">
                    Rest as much as possible. Stay hydrated by drinking plenty of fluids, especially water, 
                    clear broths, and warm teas with honey. Use a humidifier or take a steamy shower to help 
                    ease congestion and coughing.
                  </p>
                </div>

                <div className="border-l-4 border-destructive bg-destructive/5 p-6">
                  <h3 className="text-xl font-semibold mb-2 text-destructive">
                    Important Disclaimer
                  </h3>
                  <p className="text-gray">
                    These recommendations are generated by an AI system based on the symptoms you provided and 
                    should not be considered medical advice. Always consult with a healthcare professional before 
                    starting any new medication or treatment regimen. If you have allergies, existing medical conditions, 
                    or are taking other medications, consult your doctor or pharmacist before using any of these products.
                  </p>
                </div>
              </section>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MedicineSuggestions;
