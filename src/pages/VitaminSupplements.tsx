
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackButton } from "@/components/BackButton";
import { VitaminForm } from "@/components/vitamins/VitaminForm";
import { VitaminResults } from "@/components/vitamins/VitaminResults";
import { VitaminProfile, VitaminRecommendations } from "@/types/vitamins";
import { useToast } from "@/components/ui/use-toast";

// Mock data generator function for demo purposes
const generateMockRecommendations = (profile: VitaminProfile): VitaminRecommendations => {
  console.log("Generating recommendations based on profile:", profile);
  
  // Base recommendations that everyone gets
  const baseRecommendations: VitaminRecommendations = {
    dailySupplements: [
      {
        name: "High-Quality Multivitamin",
        description: "A comprehensive multivitamin that provides essential nutrients to fill gaps in your diet.",
        dosage: "1 tablet daily with food",
        benefits: [
          "Fills nutritional gaps in diet",
          "Supports overall health and wellbeing",
          "Provides essential vitamins and minerals"
        ],
        imageUrl: "/placeholder.svg"
      },
      {
        name: "Vitamin D3",
        description: "Essential for immune function, bone health, and mood regulation.",
        dosage: "2000 IU daily with a meal containing fat",
        benefits: [
          "Supports bone and dental health",
          "Boosts immune system function",
          "Improves mood and mental wellbeing"
        ],
        imageUrl: "/placeholder.svg"
      }
    ],
    situationalSupplements: [],
    foodSources: [
      {
        name: "Rich in Vitamin D",
        foods: ["Fatty fish", "Egg yolks", "Mushrooms", "Fortified foods"]
      },
      {
        name: "Rich in Antioxidants",
        foods: ["Berries", "Dark chocolate", "Pecans", "Artichokes", "Kale"]
      }
    ],
    lifestyleTips: [
      {
        title: "Stay Hydrated",
        description: "Drink at least 8 glasses of water daily to help your body absorb and utilize supplements effectively."
      },
      {
        title: "Take With Food",
        description: "Most supplements are best absorbed when taken with food, especially fat-soluble vitamins (A, D, E, K)."
      },
      {
        title: "Consistent Timing",
        description: "Take your supplements at the same time each day to establish a routine and maximize benefits."
      }
    ],
    warnings: [
      "Supplements are not replacements for a balanced diet and healthy lifestyle.",
      "Store all supplements away from children and in a cool, dry place."
    ]
  };
  
  // Add goal-specific supplements
  if (profile.healthGoals.includes('energy')) {
    baseRecommendations.dailySupplements.push({
      name: "Vitamin B Complex",
      description: "B vitamins play a vital role in energy production and brain function.",
      dosage: "1 capsule daily with breakfast",
      benefits: [
        "Supports energy production",
        "Reduces fatigue",
        "Supports nervous system health"
      ],
      imageUrl: "/placeholder.svg"
    });
  }
  
  if (profile.healthGoals.includes('immunity')) {
    baseRecommendations.dailySupplements.push({
      name: "Vitamin C",
      description: "A powerful antioxidant that supports immune function and collagen production.",
      dosage: "500-1000mg daily, divided doses",
      benefits: [
        "Strengthens immune system",
        "Aids in collagen production",
        "Provides antioxidant protection"
      ],
      imageUrl: "/placeholder.svg"
    });
    
    baseRecommendations.situationalSupplements.push({
      name: "Zinc",
      description: "An essential mineral that plays a crucial role in immune function.",
      dosage: "15-30mg daily when feeling run down",
      benefits: [
        "Supports immune cell function",
        "May reduce duration of colds",
        "Supports wound healing"
      ],
      imageUrl: "/placeholder.svg"
    });
  }
  
  if (profile.healthGoals.includes('sleep')) {
    baseRecommendations.situationalSupplements.push({
      name: "Magnesium Glycinate",
      description: "A highly absorbable form of magnesium that promotes relaxation and sleep quality.",
      dosage: "300-400mg before bedtime",
      benefits: [
        "Promotes relaxation and calmness",
        "Improves sleep quality",
        "Supports muscle recovery"
      ],
      imageUrl: "/placeholder.svg"
    });
    
    baseRecommendations.lifestyleTips.push({
      title: "Evening Routine",
      description: "Take magnesium 1-2 hours before bed as part of a relaxing evening routine that includes dimming lights and avoiding screens."
    });
  }
  
  if (profile.healthGoals.includes('stress')) {
    baseRecommendations.dailySupplements.push({
      name: "Ashwagandha",
      description: "An adaptogenic herb that helps the body manage stress and promotes calmness.",
      dosage: "300-500mg daily",
      benefits: [
        "Reduces stress and anxiety",
        "Balances cortisol levels",
        "Promotes mental clarity"
      ],
      imageUrl: "/placeholder.svg"
    });
  }
  
  if (profile.healthGoals.includes('joints')) {
    baseRecommendations.dailySupplements.push({
      name: "Omega-3 Fish Oil",
      description: "Essential fatty acids that support heart, brain, and joint health.",
      dosage: "1000-2000mg daily with food",
      benefits: [
        "Reduces joint inflammation",
        "Supports heart health",
        "Promotes brain function"
      ],
      imageUrl: "/placeholder.svg"
    });
    
    if (profile.activityLevel === 'active' || profile.activityLevel === 'very-active') {
      baseRecommendations.situationalSupplements.push({
        name: "Glucosamine & Chondroitin",
        description: "Compounds that support joint structure and function, especially for active individuals.",
        dosage: "1500mg glucosamine / 1200mg chondroitin daily",
        benefits: [
          "Supports joint mobility",
          "Helps maintain cartilage health",
          "May reduce joint discomfort with activity"
        ],
        imageUrl: "/placeholder.svg"
      });
    }
  }
  
  // Diet-specific recommendations
  if (profile.dietary === 'vegan' || profile.dietary === 'vegetarian') {
    baseRecommendations.dailySupplements.push({
      name: "Vitamin B12",
      description: "Essential for nerve function and red blood cell formation, often lacking in plant-based diets.",
      dosage: "1000mcg daily or 2000mcg weekly",
      benefits: [
        "Prevents B12 deficiency",
        "Supports energy production",
        "Maintains nerve health"
      ],
      imageUrl: "/placeholder.svg"
    });
    
    baseRecommendations.foodSources.push({
      name: "Plant-Based Protein Sources",
      foods: ["Lentils", "Chickpeas", "Tofu", "Tempeh", "Quinoa", "Hemp seeds"]
    });
    
    baseRecommendations.warnings.push(
      "Plant-based diets require careful planning to ensure adequate intake of certain nutrients like B12, iron, zinc, and omega-3s."
    );
  }
  
  return baseRecommendations;
};

export default function VitaminSupplements() {
  const [profile, setProfile] = useState<VitaminProfile | null>(null);
  const [recommendations, setRecommendations] = useState<VitaminRecommendations | null>(null);
  const { toast } = useToast();
  
  const handleFormSubmit = (formData: VitaminProfile) => {
    setProfile(formData);
    
    // Simulate API call delay
    toast({
      title: "Analyzing your health profile...",
      description: "We're creating your personalized supplement plan.",
    });
    
    setTimeout(() => {
      const generatedRecommendations = generateMockRecommendations(formData);
      setRecommendations(generatedRecommendations);
      
      toast({
        title: "Your personalized plan is ready!",
        description: "Scroll down to see your supplement recommendations.",
      });
      
      // Scroll to results
      setTimeout(() => {
        const resultsElement = document.getElementById("vitamin-results");
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <BackButton />
      
      <main className="flex-grow pb-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-dark">
                Personalized Vitamin & Supplement Plan
              </h1>
              <p className="text-gray max-w-2xl mx-auto">
                Get a tailored supplement regimen based on your health goals, dietary preferences, and lifestyle factors.
              </p>
            </div>
            
            {!recommendations ? (
              <VitaminForm onSubmit={handleFormSubmit} />
            ) : (
              <div id="vitamin-results" className="scroll-mt-24">
                <VitaminResults results={recommendations} />
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
