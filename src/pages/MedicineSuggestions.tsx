
import { useState } from "react";
import { CustomButton } from "@/components/ui/CustomButton";
import { ArrowLeft, Pill, ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  description: string;
}

interface QuestionnaireData {
  symptoms: string;
  age: string;
  allergies: string;
  currentMedications: string;
  preExistingConditions: string;
  hereditaryConditions: string;
}

const MedicineSuggestions = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [recommendedMedicines, setRecommendedMedicines] = useState<Medicine[]>([]);
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData>({
    symptoms: "",
    age: "",
    allergies: "",
    currentMedications: "",
    preExistingConditions: "",
    hereditaryConditions: ""
  });
  const navigate = useNavigate();

  const questions = [
    {
      id: "symptoms",
      question: "What symptoms are you facing?",
      placeholder: "e.g., Fever, headache, sore throat, etc.",
      type: "textarea",
      required: true
    },
    {
      id: "age",
      question: "What is your age?",
      placeholder: "e.g., 35",
      type: "input",
      required: true
    },
    {
      id: "allergies",
      question: "Do you have any allergies?",
      placeholder: "e.g., Penicillin, peanuts, etc. (Enter 'None' if not applicable)",
      type: "textarea",
      required: true
    },
    {
      id: "currentMedications",
      question: "Are you currently taking any medications?",
      placeholder: "e.g., Lisinopril, Metformin, etc. (Enter 'None' if not applicable)",
      type: "textarea",
      required: true
    },
    {
      id: "preExistingConditions",
      question: "Do you have any pre-existing medical conditions?",
      placeholder: "e.g., Diabetes, hypertension, etc. (Enter 'None' if not applicable)",
      type: "textarea",
      required: true
    },
    {
      id: "hereditaryConditions",
      question: "Do you have any hereditary conditions in your family?",
      placeholder: "e.g., Heart disease, cancer, etc. (Enter 'None' if not applicable)",
      type: "textarea",
      required: false
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setQuestionnaireData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextStep = () => {
    const currentQuestion = questions[currentStep];
    if (currentQuestion.required && !questionnaireData[currentQuestion.id as keyof QuestionnaireData]) {
      toast.error(`Please answer the question before proceeding.`);
      return;
    }
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const symptomsArray = questionnaireData.symptoms.toLowerCase().split(/[,\s]+/).filter(s => s.length > 2);
      const detectedSymptoms = [];

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

      if (detectedSymptoms.length === 0) {
        detectedSymptoms.push("general discomfort");
      }
      setResults(detectedSymptoms);

      const medicineRecommendations: Medicine[] = [];
      
      const age = parseInt(questionnaireData.age);
      let paracetamolDosage = "500-1000 mg";
      let ibuprofenDosage = "200-400 mg";
      
      if (age < 12) {
        paracetamolDosage = "250-500 mg";
        ibuprofenDosage = "100-200 mg";
      } else if (age > 65) {
        paracetamolDosage = "500 mg";
        ibuprofenDosage = "200 mg";
      }
      
      const hasAllergyTo = (medication: string) => {
        return questionnaireData.allergies.toLowerCase().includes(medication.toLowerCase());
      };
      
      if (detectedSymptoms.includes("fever") || detectedSymptoms.includes("headache")) {
        if (!hasAllergyTo("paracetamol")) {
          medicineRecommendations.push({
            name: "Paracetamol",
            dosage: paracetamolDosage,
            frequency: "Every 4-6 hours as needed (max 4g per day)",
            description: "For relief of fever, headaches and general pain. Helps reduce body temperature and alleviate discomfort."
          });
        }
        
        if (!hasAllergyTo("ibuprofen") && !hasAllergyTo("nsaid")) {
          medicineRecommendations.push({
            name: "Ibuprofen",
            dosage: ibuprofenDosage,
            frequency: "Every 6-8 hours as needed with food",
            description: "Anti-inflammatory medication that reduces fever, pain, and inflammation. Effective for headaches and body aches."
          });
        }
      }
      
      if (detectedSymptoms.includes("sore throat") && !hasAllergyTo("benzocaine")) {
        medicineRecommendations.push({
          name: "Benzocaine Lozenges",
          dosage: "1 lozenge",
          frequency: "Every 2 hours as needed",
          description: "Contains a local anesthetic that numbs the throat, providing temporary relief from sore throat pain."
        });
      }
      
      if (detectedSymptoms.includes("coughing") && !hasAllergyTo("dextromethorphan")) {
        medicineRecommendations.push({
          name: "Dextromethorphan Syrup",
          dosage: "10-20 ml",
          frequency: "Every 4 hours as needed",
          description: "Cough suppressant that helps reduce the urge to cough. Best for dry, non-productive coughs."
        });
      }
      
      if (detectedSymptoms.includes("nasal congestion") && !hasAllergyTo("pseudoephedrine")) {
        medicineRecommendations.push({
          name: "Pseudoephedrine",
          dosage: "60 mg",
          frequency: "Every 4-6 hours (max 240mg daily)",
          description: "Decongestant that relieves nasal stuffiness and sinus pressure by shrinking blood vessels in the nasal passages."
        });
      }

      if (medicineRecommendations.length < 2) {
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

  const renderQuestionStep = () => {
    const currentQuestion = questions[currentStep];
    
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="mb-4 flex justify-between">
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {questions.length}
            </div>
            <div className="text-sm text-gray-500">
              {Math.round(((currentStep + 1) / questions.length) * 100)}% Complete
            </div>
          </div>
          
          <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
            <div 
              className="bg-primary h-2 rounded-full" 
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          
          <div className="mb-6">
            <Label htmlFor={currentQuestion.id} className="block text-lg font-medium text-dark mb-3">
              {currentQuestion.question}
            </Label>
            
            {currentQuestion.type === 'textarea' ? (
              <Textarea 
                id={currentQuestion.id}
                name={currentQuestion.id}
                className="w-full px-4 py-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder={currentQuestion.placeholder}
                rows={4}
                value={questionnaireData[currentQuestion.id as keyof QuestionnaireData]}
                onChange={handleInputChange}
                required={currentQuestion.required}
              />
            ) : (
              <Input
                id={currentQuestion.id}
                name={currentQuestion.id}
                className="w-full px-4 py-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder={currentQuestion.placeholder}
                value={questionnaireData[currentQuestion.id as keyof QuestionnaireData]}
                onChange={handleInputChange}
                required={currentQuestion.required}
              />
            )}
          </div>

          <div className="flex justify-between">
            <CustomButton 
              variant="primary" 
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              className="flex flex-col items-center gap-1"
            >
              <span>Previous</span>
              <ChevronLeft className="h-4 w-4" />
            </CustomButton>
            
            <CustomButton 
              variant="primary" 
              onClick={handleNextStep}
              isLoading={isLoading && currentStep === questions.length - 1}
            >
              {currentStep === questions.length - 1 ? 'Get AI Suggestions' : 'Next'}
              {currentStep < questions.length - 1 && <ChevronRight className="ml-2 h-4 w-4" />}
            </CustomButton>
          </div>
        </div>

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
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
        <h1 className="text-3xl font-bold mb-2 text-primary">Medicine Suggestions</h1>
        <p className="text-gray-600 mb-6">
          Answer a few questions about your health, and our AI will analyze them to provide personalized medication suggestions.
        </p>
      </div>
      
      {results.length === 0 ? (
        renderQuestionStep()
      ) : (
        <>
          <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <button onClick={() => {
              setResults([]);
              setRecommendedMedicines([]);
              setCurrentStep(0);
            }} className="flex items-center text-gray mb-6 hover:text-primary transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Health Questionnaire
            </button>

            <h1 className="text-3xl font-bold text-dark mb-4">
              Recommended Medications Based on Your Health Profile
            </h1>
            <p className="text-gray mb-6">
              Our AI has analyzed your health information and found the following recommended treatments. 
              Always consult with a healthcare professional before starting any new medication.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {results.map((symptom, index) => <div key={index} className="bg-primary-light text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {symptom.charAt(0).toUpperCase() + symptom.slice(1)}
                </div>)}
            </div>

            <CustomButton variant="outline" onClick={() => navigate('/')}>
              Back to Dashboard
            </CustomButton>
          </section>

          <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-dark mb-6 pb-4 border-b border-slate-200">
              AI Recommended Medicines
            </h2>
            <div className="space-y-6">
              {recommendedMedicines.map((medicine, index) => <div key={index} className="border border-slate-200 rounded-lg p-6 hover:border-primary transition-all">
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
                </div>)}
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-dark mb-6">
              Additional Information
            </h2>

            <div className="border-l-4 border-4 border-primary bg-primary-light/10 p-6 mb-6">
              <h3 className="text-xl font-semibold mb-2 text-dark">
                When to Seek Medical Help
              </h3>
              <p className="text-gray">
                This AI system provides general recommendations and is not a substitute for professional medical advice. Seek medical attention if you experience:
              </p>
              <ul className="list-disc pl-5 mt-2 text-gray">
                <li>Severe or worsening symptoms</li>
                <li>Allergic reactions (swelling, breathing issues, rash)</li>
                <li>High fever or persistent pain</li>
                <li>Chest pain, difficulty breathing, confusion, or fainting</li>
                <li>Severe medication side effects</li>
              </ul>
              <p className="text-gray mt-2 font-semibold">
                🚨 In emergencies, call 911 or visit the nearest hospital immediately.
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
  );
};

export default MedicineSuggestions;
