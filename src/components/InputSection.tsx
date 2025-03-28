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
    const {
      name,
      value
    } = e.target;
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
  return <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="space-y-12">
          {/* Medicine Recommendations Input */}
          

          {/* Skincare Recommendations Input */}
          

          {/* Vitamin & Supplement Recommendations Input */}
          
        </div>
      </div>
    </section>;
}