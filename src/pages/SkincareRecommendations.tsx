
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SkincareForm } from "@/components/skincare/SkincareForm";
import { SkincareResults } from "@/components/skincare/SkincareResults";
import { Skin, SkincareRoutine, InitialFormState } from "@/types/skincare";
import { useToast } from "@/hooks/use-toast";

export default function SkincareRecommendations() {
  const [routine, setRoutine] = useState<SkincareRoutine | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateRoutine = (skinData: Skin) => {
    setIsLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Generate personalized routine based on skin data
      const newRoutine = createPersonalizedRoutine(skinData);
      setRoutine(newRoutine);
      setIsLoading(false);
      
      toast({
        title: "Skincare Routine Generated",
        description: "Your personalized skincare routine is ready!",
      });
      
      // Scroll to results
      document.getElementById('skincare-results')?.scrollIntoView({
        behavior: "smooth"
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="py-1 px-3 text-xs font-medium text-primary bg-primary-light rounded-full mb-4 inline-block">
              Personalized Skin Care
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-dark">
              Your Perfect Skincare Routine
            </h1>
            <p className="text-gray max-w-2xl mx-auto">
              Answer a few questions about your skin and we'll create a personalized skincare routine with product recommendations just for you.
            </p>
          </div>
          
          {/* Skincare Form */}
          <section className="mb-16" id="skincare-form">
            <SkincareForm onSubmit={generateRoutine} isLoading={isLoading} />
          </section>
          
          {/* Results Section (shows only after form submission) */}
          {routine && (
            <section id="skincare-results" className="pt-8">
              <SkincareResults routine={routine} />
            </section>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

// Helper function to generate a personalized routine based on skin data
function createPersonalizedRoutine(skinData: Skin): SkincareRoutine {
  const routine: SkincareRoutine = {
    morningRoutine: [],
    eveningRoutine: [],
    weeklyTreatments: [],
    nutritionTips: [],
    skincareTips: []
  };
  
  // Morning routine
  if (skinData.type === 'dry' || skinData.type === 'combination') {
    routine.morningRoutine.push({
      step: "Cleanser",
      recommendation: "Gentle Hydrating Cleanser",
      description: "Use a non-foaming, hydrating cleanser to wash your face without stripping natural oils.",
      productSuggestion: skinData.type === 'dry' ? "CeraVe Hydrating Facial Cleanser" : "La Roche-Posay Toleriane Hydrating Gentle Cleanser",
      imageUrl: "https://images.unsplash.com/photo-1619265023979-30743502cca7?q=80&w=300"
    });
  } else {
    routine.morningRoutine.push({
      step: "Cleanser",
      recommendation: "Gentle Foaming Cleanser",
      description: "Use a gentle foaming cleanser to remove excess oil without over-drying.",
      productSuggestion: skinData.type === 'oily' ? "CeraVe Foaming Facial Cleanser" : "Neutrogena Ultra Gentle Daily Cleanser",
      imageUrl: "https://images.unsplash.com/photo-1619265023979-30743502cca7?q=80&w=300"
    });
  }
  
  // Add toner based on skin type
  if (skinData.type === 'oily' || skinData.concerns.includes('acne')) {
    routine.morningRoutine.push({
      step: "Toner",
      recommendation: "Balancing Toner with BHA",
      description: "Use a toner with salicylic acid to control oil and prevent breakouts.",
      productSuggestion: "Paula's Choice 2% BHA Liquid Exfoliant",
      imageUrl: "https://images.unsplash.com/photo-1616258734575-33a35c4f5c2e?q=80&w=300"
    });
  } else {
    routine.morningRoutine.push({
      step: "Toner",
      recommendation: "Hydrating Toner",
      description: "Apply a hydrating, alcohol-free toner to balance your skin's pH.",
      productSuggestion: skinData.type === 'dry' ? "Laneige Cream Skin Toner & Moisturizer" : "Klairs Supple Preparation Unscented Toner",
      imageUrl: "https://images.unsplash.com/photo-1616258734575-33a35c4f5c2e?q=80&w=300"
    });
  }
  
  // Add serum based on primary concern
  if (skinData.concerns.includes('aging')) {
    routine.morningRoutine.push({
      step: "Serum",
      recommendation: "Vitamin C Serum",
      description: "Apply an antioxidant-rich vitamin C serum to protect against environmental damage and brighten skin.",
      productSuggestion: "Timeless 20% Vitamin C + E Ferulic Acid Serum",
      imageUrl: "https://images.unsplash.com/photo-1556229167-7f9e31427c32?q=80&w=300"
    });
  } else if (skinData.concerns.includes('acne')) {
    routine.morningRoutine.push({
      step: "Serum",
      recommendation: "Niacinamide Serum",
      description: "Apply a niacinamide serum to reduce inflammation, oil production, and balance skin.",
      productSuggestion: "The Ordinary Niacinamide 10% + Zinc 1%",
      imageUrl: "https://images.unsplash.com/photo-1556229167-7f9e31427c32?q=80&w=300"
    });
  } else if (skinData.concerns.includes('hyperpigmentation')) {
    routine.morningRoutine.push({
      step: "Serum",
      recommendation: "Brightening Serum",
      description: "Apply a brightening serum with ingredients like vitamin C, niacinamide, or alpha arbutin.",
      productSuggestion: "Good Molecules Discoloration Correcting Serum",
      imageUrl: "https://images.unsplash.com/photo-1556229167-7f9e31427c32?q=80&w=300"
    });
  } else {
    routine.morningRoutine.push({
      step: "Serum",
      recommendation: "Hydrating Serum",
      description: "Apply a hydrating serum with hyaluronic acid to plump and hydrate skin.",
      productSuggestion: "The Ordinary Hyaluronic Acid 2% + B5",
      imageUrl: "https://images.unsplash.com/photo-1556229167-7f9e31427c32?q=80&w=300"
    });
  }
  
  // Add moisturizer based on skin type
  if (skinData.type === 'dry') {
    routine.morningRoutine.push({
      step: "Moisturizer",
      recommendation: "Rich Cream Moisturizer",
      description: "Apply a rich, creamy moisturizer to deeply hydrate dry skin.",
      productSuggestion: "La Roche-Posay Lipikar Balm AP+",
      imageUrl: "https://images.unsplash.com/photo-1611069648094-a61e64f38d51?q=80&w=300"
    });
  } else if (skinData.type === 'oily') {
    routine.morningRoutine.push({
      step: "Moisturizer",
      recommendation: "Oil-Free Gel Moisturizer",
      description: "Apply a lightweight, oil-free gel moisturizer that won't clog pores.",
      productSuggestion: "Neutrogena Hydro Boost Water Gel",
      imageUrl: "https://images.unsplash.com/photo-1611069648094-a61e64f38d51?q=80&w=300"
    });
  } else {
    routine.morningRoutine.push({
      step: "Moisturizer",
      recommendation: "Balanced Lotion Moisturizer",
      description: "Apply a balanced lotion that hydrates without feeling heavy.",
      productSuggestion: "CeraVe Daily Moisturizing Lotion",
      imageUrl: "https://images.unsplash.com/photo-1611069648094-a61e64f38d51?q=80&w=300"
    });
  }
  
  // Sunscreen for everyone!
  routine.morningRoutine.push({
    step: "Sunscreen",
    recommendation: skinData.type === 'oily' ? "Lightweight Sunscreen SPF 50+" : "Hydrating Sunscreen SPF 50+",
    description: "Apply a broad-spectrum sunscreen as the final step of your morning routine.",
    productSuggestion: skinData.type === 'oily' ? "Supergoop! Unseen Sunscreen SPF 40" : "La Roche-Posay Anthelios Melt-in Milk SPF 100",
    imageUrl: "https://images.unsplash.com/photo-1556227834-09f1de7a7d14?q=80&w=300"
  });
  
  // Evening routine - always start with cleansing
  routine.eveningRoutine.push({
    step: "Double Cleanse",
    recommendation: "Oil Cleanser + Water-Based Cleanser",
    description: "First remove makeup and sunscreen with an oil cleanser, then follow with your regular cleanser.",
    productSuggestion: "DHC Deep Cleansing Oil + Your Morning Cleanser",
    imageUrl: "https://images.unsplash.com/photo-1619265023979-30743502cca7?q=80&w=300"
  });
  
  // Evening treatments based on concerns
  if (skinData.concerns.includes('aging')) {
    routine.eveningRoutine.push({
      step: "Treatment",
      recommendation: "Retinol Serum",
      description: "Apply a retinol serum to promote cell turnover and reduce fine lines. Start with a low concentration.",
      productSuggestion: "The Ordinary Retinol 0.5% in Squalane",
      imageUrl: "https://images.unsplash.com/photo-1556229167-7f9e31427c32?q=80&w=300"
    });
  } else if (skinData.concerns.includes('acne')) {
    routine.eveningRoutine.push({
      step: "Treatment",
      recommendation: "BHA/Benzoyl Peroxide Treatment",
      description: "Apply a targeted treatment with salicylic acid or benzoyl peroxide to treat and prevent breakouts.",
      productSuggestion: "Paula's Choice 2% BHA Liquid Exfoliant",
      imageUrl: "https://images.unsplash.com/photo-1556229167-7f9e31427c32?q=80&w=300"
    });
  } else if (skinData.concerns.includes('hyperpigmentation')) {
    routine.eveningRoutine.push({
      step: "Treatment",
      recommendation: "Alpha Hydroxy Acid Treatment",
      description: "Apply a gentle exfoliating treatment with glycolic or lactic acid to brighten and even skin tone.",
      productSuggestion: "The Ordinary Lactic Acid 5% + HA",
      imageUrl: "https://images.unsplash.com/photo-1556229167-7f9e31427c32?q=80&w=300"
    });
  }
  
  // Night moisturizer for everyone
  if (skinData.type === 'dry') {
    routine.eveningRoutine.push({
      step: "Night Cream",
      recommendation: "Rich Reparative Cream",
      description: "Apply a rich night cream to deeply nourish and repair skin overnight.",
      productSuggestion: "CeraVe Skin Renewing Night Cream",
      imageUrl: "https://images.unsplash.com/photo-1611069648094-a61e64f38d51?q=80&w=300"
    });
  } else if (skinData.type === 'oily') {
    routine.eveningRoutine.push({
      step: "Night Cream",
      recommendation: "Lightweight Night Gel",
      description: "Apply a non-comedogenic night gel that hydrates without clogging pores.",
      productSuggestion: "Neutrogena Hydro Boost Gel Cream",
      imageUrl: "https://images.unsplash.com/photo-1611069648094-a61e64f38d51?q=80&w=300"
    });
  } else {
    routine.eveningRoutine.push({
      step: "Night Cream",
      recommendation: "Balanced Night Moisturizer",
      description: "Apply a balanced night moisturizer to repair and hydrate skin.",
      productSuggestion: "Cerave PM Facial Moisturizing Lotion",
      imageUrl: "https://images.unsplash.com/photo-1611069648094-a61e64f38d51?q=80&w=300"
    });
  }
  
  // Weekly treatments based on skin type
  if (skinData.type === 'dry') {
    routine.weeklyTreatments.push({
      name: "Hydrating Mask",
      frequency: "1-2 times per week",
      description: "Use a hydrating mask to deeply moisturize and replenish dry skin.",
      productSuggestion: "Summer Fridays Jet Lag Mask"
    });
  } else if (skinData.type === 'oily' || skinData.concerns.includes('acne')) {
    routine.weeklyTreatments.push({
      name: "Clay Mask",
      frequency: "1-2 times per week",
      description: "Use a clay mask to absorb excess oil and purify pores.",
      productSuggestion: "Aztec Secret Indian Healing Clay"
    });
  }
  
  // Add exfoliation for everyone
  routine.weeklyTreatments.push({
    name: "Gentle Exfoliation",
    frequency: "1-2 times per week",
    description: skinData.sensitive ? "Use a gentle enzyme exfoliator to remove dead skin cells without irritation." : "Use a chemical exfoliant appropriate for your skin type to remove dead skin cells and brighten complexion.",
    productSuggestion: skinData.sensitive ? "Dermalogica Daily Microfoliant" : "The Ordinary AHA 30% + BHA 2% Peeling Solution"
  });
  
  // Nutrition tips
  routine.nutritionTips = [
    "Drink plenty of water (aim for 8 glasses daily) to keep skin hydrated from within.",
    "Consume foods rich in omega-3 fatty acids like salmon, walnuts, and flaxseeds for skin barrier support.",
    "Eat antioxidant-rich foods like berries, dark leafy greens, and colorful vegetables to fight free radicals.",
    "Include zinc-rich foods like oysters, pumpkin seeds, and legumes to support skin healing.",
    "Limit sugar and dairy intake, which can trigger inflammation and breakouts in some people."
  ];
  
  // General skincare tips
  routine.skincareTips = [
    "Always remove makeup before bed to prevent clogged pores and breakouts.",
    "Change your pillowcase at least once a week to prevent bacteria buildup.",
    "Avoid touching your face throughout the day to prevent transferring bacteria.",
    "Apply products in order from thinnest to thickest consistency for best absorption.",
    "Wait about 30 seconds between applying different products to allow them to absorb."
  ];
  
  // Add specific tips based on concerns
  if (skinData.concerns.includes('aging')) {
    routine.skincareTips.push("Sleep on your back to prevent sleep lines from becoming permanent wrinkles.");
    routine.skincareTips.push("Use gentle, upward motions when applying products to avoid pulling on skin.");
  }
  
  if (skinData.sensitive) {
    routine.skincareTips.push("Patch test new products on your inner arm for 24 hours before applying to your face.");
    routine.skincareTips.push("Look for products labeled 'fragrance-free' rather than 'unscented' to avoid irritants.");
  }
  
  return routine;
}
