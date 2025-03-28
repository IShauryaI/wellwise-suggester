
import { CustomButton } from "@/components/ui/CustomButton";

const PharmaRep = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
        <h1 className="text-3xl font-bold mb-2 text-primary">For Pharmaceutical Representatives</h1>
        <p className="text-gray-600 mb-6">
          Welcome to our dedicated portal for pharmaceutical representatives and healthcare providers. 
          Access specialized tools and resources designed to support your professional needs.
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto text-center">
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
