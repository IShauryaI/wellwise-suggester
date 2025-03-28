
import { CustomButton } from "@/components/ui/CustomButton";

const PharmaRep = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-dark">
          For Pharmaceutical Representatives and Medical Professionals
        </h1>
        <p className="text-gray-600 mb-8">
          Welcome to our dedicated portal for pharmaceutical representatives and healthcare providers. 
          Access specialized tools and resources designed to support your professional needs.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CustomButton variant="outline" size="lg">
            Login
          </CustomButton>
          <CustomButton variant="primary" size="lg">
            Sign Up
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default PharmaRep;
