
import { useState } from "react";
import { Star, ThumbsUp, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Sample data for demonstration
const reviews = [
  {
    id: "1",
    reviewer: "Sarah J.",
    age: 45,
    date: "March 15, 2025",
    medicineName: "Metformin 500mg",
    condition: "Type 2 Diabetes",
    duration: "6 months",
    text: "I've been taking Metformin for about 6 months now for my Type 2 Diabetes. It has helped control my blood sugar levels effectively, though it took about 2-3 weeks to see significant improvements.",
    sideEffects: "The first two weeks were challenging due to some digestive issues, but those subsided after my body adjusted to the medication.",
    ratings: {
      effectiveness: 4,
      sideEffects: 3,
      easeOfUse: 5,
      satisfaction: 4
    },
    wouldRecommend: "Yes",
    helpfulCount: 24
  },
  {
    id: "4",
    reviewer: "David L.",
    age: 52,
    date: "March 12, 2025",
    medicineName: "Metformin 500mg",
    condition: "Type 2 Diabetes",
    duration: "3 months",
    text: "This medication has been a game changer for my diabetes management.",
    sideEffects: "I experienced some stomach upset for the first few days, but that went away quickly. My A1C has dropped significantly in just 3 months.",
    ratings: {
      effectiveness: 5,
      sideEffects: 4,
      easeOfUse: 5,
      satisfaction: 5
    },
    wouldRecommend: "Yes",
    helpfulCount: 16
  },
  {
    id: "2",
    reviewer: "Michael T.",
    age: 61,
    date: "March 10, 2025",
    medicineName: "Lisinopril 10mg",
    condition: "Hypertension",
    duration: "3 months",
    text: "I started taking Lisinopril about 3 months ago for high blood pressure. It's been quite effective at bringing my numbers down from 150/95 to around 125/80 consistently.",
    sideEffects: "The medication works well, but I did experience a persistent dry cough which is apparently a common side effect.",
    ratings: {
      effectiveness: 5,
      sideEffects: 2,
      easeOfUse: 5,
      satisfaction: 3
    },
    wouldRecommend: "Maybe",
    helpfulCount: 18
  },
  {
    id: "5",
    reviewer: "Jennifer K.",
    age: 57,
    date: "March 8, 2025",
    medicineName: "Lisinopril 10mg",
    condition: "Hypertension",
    duration: "2 months",
    text: "Lisinopril worked well for my blood pressure.",
    sideEffects: "The cough was unbearable. Had to switch to another medication after 2 months. Would only recommend if other options don't work for you.",
    ratings: {
      effectiveness: 4,
      sideEffects: 1,
      easeOfUse: 5,
      satisfaction: 2
    },
    wouldRecommend: "No",
    helpfulCount: 22
  },
  {
    id: "3",
    reviewer: "Taylor W.",
    age: 38,
    date: "March 5, 2025",
    medicineName: "Cetirizine 10mg",
    condition: "Seasonal Allergies",
    duration: "Over 3 years",
    text: "I've been using Cetirizine for my seasonal allergies for years now, and it consistently provides relief from my symptoms.",
    sideEffects: "Unlike some other antihistamines I've tried, this one doesn't make me feel drowsy, which is a huge plus since I take it daily during allergy season.",
    ratings: {
      effectiveness: 5,
      sideEffects: 5,
      easeOfUse: 5,
      satisfaction: 5
    },
    wouldRecommend: "Yes",
    helpfulCount: 31
  },
  {
    id: "6",
    reviewer: "Robert P.",
    age: 64,
    date: "March 2, 2025",
    medicineName: "Atorvastatin 20mg",
    condition: "High Cholesterol",
    duration: "About 1 year",
    text: "Been taking Atorvastatin for about a year now. My cholesterol levels have improved dramatically.",
    sideEffects: "I did have some muscle pain in the beginning but it went away after a few weeks. Overall very satisfied with this medication.",
    ratings: {
      effectiveness: 5,
      sideEffects: 3,
      easeOfUse: 5,
      satisfaction: 4
    },
    wouldRecommend: "Yes",
    helpfulCount: 19
  }
];

// Generate a list of unique medicines from the reviews
const getMedicinesList = () => {
  const medicinesMap = new Map();
  
  reviews.forEach(review => {
    if (!medicinesMap.has(review.medicineName)) {
      // Count reviews and calculate average rating for each medicine
      const medicineReviews = reviews.filter(r => r.medicineName === review.medicineName);
      const avgRating = medicineReviews.reduce((sum, r) => sum + r.ratings.satisfaction, 0) / medicineReviews.length;
      const reviewCount = medicineReviews.length;
      
      medicinesMap.set(review.medicineName, {
        name: review.medicineName,
        reviewCount,
        averageRating: avgRating.toFixed(1),
        primaryCondition: review.condition
      });
    }
  });
  
  return Array.from(medicinesMap.values());
};

const PharmaRepDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  
  const medicines = getMedicinesList();
  
  const renderReadOnlyStars = (count) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= count ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.primaryCondition.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredReviews = selectedMedicine
    ? reviews.filter(review => review.medicineName === selectedMedicine)
    : [];
    
  const handleMedicineClick = (medicineName) => {
    setSelectedMedicine(medicineName);
  };
  
  const handleBackToList = () => {
    setSelectedMedicine(null);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-primary">Pharmaceutical Insights Dashboard</h1>
      </div>

      {!selectedMedicine ? (
        <>
          {/* Dashboard Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="hover-lift-effect bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
              <CardHeader className="pb-2">
                <CardTitle>Total Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">{reviews.length}</p>
                <p className="text-sm text-gray-500 mt-1">+12% from last month</p>
              </CardContent>
            </Card>
            
            <Card className="hover-lift-effect bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
              <CardHeader className="pb-2">
                <CardTitle>Average Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">
                  {(reviews.reduce((sum, review) => sum + review.ratings.satisfaction, 0) / reviews.length).toFixed(1)}/5
                </p>
                <p className="text-sm text-gray-500 mt-1">Based on all reviews</p>
              </CardContent>
            </Card>
            
            <Card className="hover-lift-effect bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
              <CardHeader className="pb-2">
                <CardTitle>Medications Reviewed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">{medicines.length}</p>
                <p className="text-sm text-gray-500 mt-1">Unique medications</p>
              </CardContent>
            </Card>
          </div>

          {/* Medicines List */}
          <Card className="shadow-md">
            <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-2 bg-slate-50 dark:bg-slate-800 border-b">
              <div>
                <CardTitle>Reviewed Medications</CardTitle>
                <CardDescription>Click on a medication to view patient reviews</CardDescription>
              </div>
              <div className="mt-4 sm:mt-0 w-full sm:w-auto">
                <div className="flex gap-2">
                  <div className="relative w-full sm:w-64">
                    <Input
                      type="text"
                      placeholder="Search by medicine or condition..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-8"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>A list of reviewed medications</TableCaption>
                <TableHeader>
                  <TableRow className="bg-slate-50 dark:bg-slate-800">
                    <TableHead>Medication</TableHead>
                    <TableHead>Primary Condition</TableHead>
                    <TableHead>Reviews</TableHead>
                    <TableHead>Avg. Rating</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMedicines.map((medicine) => (
                    <TableRow key={medicine.name} className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <TableCell className="font-medium">{medicine.name}</TableCell>
                      <TableCell>{medicine.primaryCondition}</TableCell>
                      <TableCell>{medicine.reviewCount}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {medicine.averageRating}
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleMedicineClick(medicine.name)}
                          className="hover:bg-primary hover:text-white transition-colors"
                        >
                          View Reviews
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      ) : (
        /* Reviews for selected medicine */
        <Card className="shadow-md">
          <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-2 bg-slate-50 dark:bg-slate-800 border-b">
            <div>
              <div className="flex items-center mb-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleBackToList} 
                  className="mr-2 p-0 h-8 w-8 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <CardTitle>{selectedMedicine} Reviews</CardTitle>
              </div>
              <CardDescription>Patient feedback and experiences</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Card className="bg-gradient-to-r from-primary-light to-white dark:from-primary-dark/30 dark:to-slate-800 shadow-sm">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Reviews</h3>
                      <p className="text-2xl font-bold">{filteredReviews.length}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Average Rating</h3>
                      <div className="flex items-center gap-2">
                        <p className="text-2xl font-bold">
                          {(filteredReviews.reduce((sum, review) => sum + review.ratings.satisfaction, 0) / filteredReviews.length).toFixed(1)}
                        </p>
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Reviews - Modified to hide names and show only required info */}
            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <Card key={review.id} className="hover-lift-effect overflow-hidden border border-slate-200 dark:border-slate-700">
                  <CardHeader className="pb-2 bg-slate-50 dark:bg-slate-800 border-b">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">Review from {review.date}</CardTitle>
                      </div>
                      <div className="flex items-center">
                        {renderReadOnlyStars(review.ratings.satisfaction)}
                        <span className="ml-2 text-sm font-medium">
                          {review.ratings.satisfaction}/5
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-sm leading-relaxed">{review.text}</p>
                    
                    <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-md border-l-4 border-red-500">
                      <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Side Effects:</h4>
                      <p className="text-sm font-medium text-[#ea384c] dark:text-red-400">{review.sideEffects}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 pt-4 border-t">
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-md">
                        <h4 className="text-xs text-gray-500 mb-1">Effectiveness</h4>
                        {renderReadOnlyStars(review.ratings.effectiveness)}
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-md">
                        <h4 className="text-xs text-gray-500 mb-1">Side Effects</h4>
                        {renderReadOnlyStars(review.ratings.sideEffects)}
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-md">
                        <h4 className="text-xs text-gray-500 mb-1">Ease of Use</h4>
                        {renderReadOnlyStars(review.ratings.easeOfUse)}
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-md">
                        <h4 className="text-xs text-gray-500 mb-1">Overall</h4>
                        {renderReadOnlyStars(review.ratings.satisfaction)}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-slate-50 dark:bg-slate-800/30 px-6 py-3 flex flex-wrap gap-4 text-sm">
                    <div className="px-3 py-1 bg-white dark:bg-slate-700 rounded-full shadow-sm">
                      <span className="font-semibold">Age:</span> {review.age}
                    </div>
                    <div className="px-3 py-1 bg-white dark:bg-slate-700 rounded-full shadow-sm">
                      <span className="font-semibold">Condition:</span> {review.condition}
                    </div>
                    <div className="px-3 py-1 bg-white dark:bg-slate-700 rounded-full shadow-sm">
                      <span className="font-semibold">Duration:</span> {review.duration || "Not specified"}
                    </div>
                    <div className="px-3 py-1 bg-white dark:bg-slate-700 rounded-full shadow-sm">
                      <span className="font-semibold">Would Recommend:</span> {review.wouldRecommend}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PharmaRepDashboard;
