
import { CustomButton } from "./ui/CustomButton";
import { useState } from "react";

export function InputSection() {
  const [formState, setFormState] = useState({
    symptoms: "",
    skinType: "",
    skinConcerns: "",
    diet: "",
    healthGoals: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent, formType: string) => {
    e.preventDefault();
    console.log(`Submitted ${formType} form with data:`, formState);
    // Here you would normally process the form or navigate to results
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="space-y-12">
          {/* Medicine Recommendations Input */}
          <div id="medicine-input" className="input-container max-w-3xl mx-auto">
            <div className="mb-6">
              <span className="px-3 py-1 text-xs font-medium text-primary bg-primary-light rounded-full mb-2 inline-block">
                Step 1
              </span>
              <h3 className="text-2xl font-bold mb-2 text-dark">Medicine Recommendations</h3>
              <p className="text-gray">Enter your symptoms below to get personalized medication suggestions.</p>
            </div>
            
            <form onSubmit={(e) => handleSubmit(e, "medicine")}>
              <div className="mb-4">
                <label htmlFor="symptoms" className="block text-sm font-medium text-dark mb-2">
                  Describe your symptoms:
                </label>
                <textarea 
                  id="symptoms"
                  name="symptoms"
                  className="w-full px-4 py-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="e.g., Fever, headache, sore throat, etc."
                  rows={4}
                  value={formState.symptoms}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-end">
                <CustomButton variant="primary" type="submit">
                  Get Recommendations
                </CustomButton>
              </div>
            </form>
            <p className="text-sm text-gray/80 italic mt-4">
              Our AI will analyze your symptoms and provide tailored medication suggestions.
            </p>
          </div>

          {/* Skincare Recommendations Input */}
          <div id="skincare-input" className="input-container max-w-3xl mx-auto">
            <div className="mb-6">
              <span className="px-3 py-1 text-xs font-medium text-primary bg-primary-light rounded-full mb-2 inline-block">
                Step 2
              </span>
              <h3 className="text-2xl font-bold mb-2 text-dark">Skincare Recommendations</h3>
              <p className="text-gray">Tell us about your skin concerns to receive a personalized skincare routine.</p>
            </div>
            
            <form onSubmit={(e) => handleSubmit(e, "skincare")}>
              <div className="mb-4">
                <label htmlFor="skinType" className="block text-sm font-medium text-dark mb-2">
                  Select your skin type:
                </label>
                <select 
                  id="skinType"
                  name="skinType"
                  className="w-full px-4 py-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  value={formState.skinType}
                  onChange={handleInputChange}
                >
                  <option value="">Please select...</option>
                  <option value="dry">Dry</option>
                  <option value="oily">Oily</option>
                  <option value="combination">Combination</option>
                  <option value="normal">Normal</option>
                  <option value="sensitive">Sensitive</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="skinConcerns" className="block text-sm font-medium text-dark mb-2">
                  Describe your skin concerns:
                </label>
                <textarea 
                  id="skinConcerns"
                  name="skinConcerns"
                  className="w-full px-4 py-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="e.g., Acne, wrinkles, dark spots, dryness, etc."
                  rows={4}
                  value={formState.skinConcerns}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-end">
                <CustomButton variant="primary" type="submit">
                  Get Skincare Routine
                </CustomButton>
              </div>
            </form>
            <p className="text-sm text-gray/80 italic mt-4">
              Our AI will analyze your skin concerns and recommend products specifically for your needs.
            </p>
          </div>

          {/* Vitamin & Supplement Recommendations Input */}
          <div id="vitamin-input" className="input-container max-w-3xl mx-auto">
            <div className="mb-6">
              <span className="px-3 py-1 text-xs font-medium text-primary bg-primary-light rounded-full mb-2 inline-block">
                Step 3
              </span>
              <h3 className="text-2xl font-bold mb-2 text-dark">Vitamin & Supplement Recommendations</h3>
              <p className="text-gray">Share your lifestyle and health goals to get personalized vitamin and supplement suggestions.</p>
            </div>
            
            <form onSubmit={(e) => handleSubmit(e, "vitamin")}>
              <div className="mb-4">
                <label htmlFor="diet" className="block text-sm font-medium text-dark mb-2">
                  Select your diet:
                </label>
                <select 
                  id="diet"
                  name="diet"
                  className="w-full px-4 py-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  value={formState.diet}
                  onChange={handleInputChange}
                >
                  <option value="">Please select...</option>
                  <option value="omnivore">Omnivore</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="pescatarian">Pescatarian</option>
                  <option value="keto">Keto</option>
                  <option value="paleo">Paleo</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="healthGoals" className="block text-sm font-medium text-dark mb-2">
                  What are your health goals?
                </label>
                <textarea 
                  id="healthGoals"
                  name="healthGoals"
                  className="w-full px-4 py-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="e.g., Increase energy, improve sleep, strengthen immune system, etc."
                  rows={4}
                  value={formState.healthGoals}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-end">
                <CustomButton variant="primary" type="submit">
                  Get Supplement Plan
                </CustomButton>
              </div>
            </form>
            <p className="text-sm text-gray/80 italic mt-4">
              We'll create a personalized vitamin and supplement plan to help you achieve your health goals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
