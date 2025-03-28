
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { 
  Star, 
  ThumbsUp
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type Rating = {
  effectiveness: number;
  sideEffects: number;
  easeOfUse: number;
  satisfaction: number;
};

type Review = {
  id: string;
  reviewer: string;
  date: string;
  medicineName: string;
  condition: string;
  text: string;
  ratings: Rating;
  wouldRecommend: string;
  helpfulCount: number;
};

const MedicineReview = () => {
  const navigate = useNavigate();
  const [medicineName, setMedicineName] = useState("");
  const [condition, setCondition] = useState("");
  const [ratings, setRatings] = useState<Rating>({
    effectiveness: 0,
    sideEffects: 0,
    easeOfUse: 0, 
    satisfaction: 0
  });
  const [sideEffectsText, setSideEffectsText] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [wouldRecommend, setWouldRecommend] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Sample reviews data
  const [reviews] = useState<Review[]>([
    {
      id: "1",
      reviewer: "Sarah J.",
      date: "March 15, 2025",
      medicineName: "Metformin 500mg",
      condition: "Type 2 Diabetes",
      text: "I've been taking Metformin for about 6 months now for my Type 2 Diabetes. It has helped control my blood sugar levels effectively, though it took about 2-3 weeks to see significant improvements. The first two weeks were challenging due to some digestive issues, but those subsided after my body adjusted to the medication.\n\nI take it with meals as recommended, which helps minimize the stomach discomfort. My latest A1C test showed improvement, dropping from 8.2 to 6.8, which my doctor is very pleased with.",
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
      id: "2",
      reviewer: "Michael T.",
      date: "March 10, 2025",
      medicineName: "Lisinopril 10mg",
      condition: "Hypertension",
      text: "I started taking Lisinopril about 3 months ago for high blood pressure. It's been quite effective at bringing my numbers down from 150/95 to around 125/80 consistently. The medication works well, but I did experience a persistent dry cough which is apparently a common side effect.\n\nI take it in the morning, and it's easy to remember as part of my daily routine. The cough can be annoying, especially at night, but for me the benefits of controlled blood pressure outweigh this side effect. I'm discussing with my doctor whether to try a different medication in the same class that might not cause the cough.",
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
      id: "3",
      reviewer: "Taylor W.",
      date: "March 5, 2025",
      medicineName: "Cetirizine 10mg",
      condition: "Seasonal Allergies",
      text: "I've been using Cetirizine for my seasonal allergies for years now, and it consistently provides relief from my symptoms. Unlike some other antihistamines I've tried, this one doesn't make me feel drowsy, which is a huge plus since I take it daily during allergy season.\n\nIt's effective at controlling my runny nose, itchy eyes, and sneezing. I typically take it in the morning, and it provides 24-hour relief as promised. No notable side effects for me, which is great. It's become my go-to allergy medication.",
      ratings: {
        effectiveness: 5,
        sideEffects: 5,
        easeOfUse: 5,
        satisfaction: 5
      },
      wouldRecommend: "Yes",
      helpfulCount: 31
    }
  ]);

  const handleSetRating = (type: keyof Rating, value: number) => {
    setRatings(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const renderStarRating = (type: keyof Rating, label: string) => {
    const currentRating = ratings[type];
    
    return (
      <div className="mb-4">
        <div className="flex items-start md:items-center flex-col md:flex-row mb-2">
          <span className="min-w-[120px] font-medium text-sm mb-1 md:mb-0">{label}:</span>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={`${type}-${star}`}
                type="button"
                className="focus:outline-none"
                onClick={() => handleSetRating(type, star)}
              >
                <Star
                  className={`h-6 w-6 ${
                    star <= currentRating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderReadOnlyStars = (count: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= count
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const handleMarkHelpful = (reviewId: string) => {
    // In a real app, we would update this on the server
    toast.success("Thank you for your feedback!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!medicineName.trim()) {
      toast.error("Please enter a medicine name");
      return;
    }
    
    if (!reviewText.trim()) {
      toast.error("Please enter your review");
      return;
    }
    
    if (ratings.satisfaction === 0) {
      toast.error("Please provide an overall satisfaction rating");
      return;
    }
    
    if (!wouldRecommend) {
      toast.error("Please indicate whether you would recommend this medicine");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Your review has been submitted successfully!");
      setMedicineName("");
      setCondition("");
      setRatings({
        effectiveness: 0,
        sideEffects: 0,
        easeOfUse: 0,
        satisfaction: 0
      });
      setSideEffectsText("");
      setReviewText("");
      setWouldRecommend("");
      setIsSubmitting(false);
      
      // Scroll to reviews section
      document.getElementById('reviews')?.scrollIntoView({ behavior: "smooth" });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/#dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Medicine Reviews</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          {/* Page Header */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
            <h1 className="text-3xl font-bold mb-2 text-primary">Medicine Reviews</h1>
            <p className="text-gray-600 mb-6">
              Share your experiences with medications and help others make informed decisions. Browse reviews from other users to learn about effectiveness, side effects, and overall satisfaction with various medications.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => document.getElementById('review-form')?.scrollIntoView({ behavior: "smooth" })}>
                Write a Review
              </Button>
              <Button variant="outline" onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: "smooth" })}>
                Read Reviews
              </Button>
            </div>
          </div>
          
          {/* Review Form */}
          <div id="review-form" className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Submit Your Review</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="medicine-name">Medicine Name</Label>
                <Input
                  id="medicine-name"
                  placeholder="Enter the name of the medication"
                  value={medicineName}
                  onChange={(e) => setMedicineName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="condition">What condition did you take this medication for?</Label>
                <Input
                  id="condition"
                  placeholder="E.g., Type 2 Diabetes, Hypertension, Allergies, etc."
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Please rate your experience:</Label>
                <div className="bg-slate-50 p-4 rounded-md">
                  {renderStarRating("effectiveness", "Effectiveness")}
                  {renderStarRating("sideEffects", "Side Effects")}
                  {renderStarRating("easeOfUse", "Ease of Use")}
                  {renderStarRating("satisfaction", "Overall Satisfaction")}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="side-effects-text">Did you experience any side effects? If yes, please describe them:</Label>
                <Textarea
                  id="side-effects-text"
                  placeholder="Describe any side effects you experienced..."
                  value={sideEffectsText}
                  onChange={(e) => setSideEffectsText(e.target.value)}
                  className="resize-none"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="review-text">Your Review</Label>
                <Textarea
                  id="review-text"
                  placeholder="Share your overall experience with this medication..."
                  rows={6}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="resize-none"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="would-recommend">Would you recommend this medication to others with your condition?</Label>
                <select 
                  id="would-recommend" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  value={wouldRecommend}
                  onChange={(e) => setWouldRecommend(e.target.value)}
                >
                  <option value="">Please select...</option>
                  <option value="Yes">Yes, I would recommend it</option>
                  <option value="Maybe">Maybe, it depends on the individual</option>
                  <option value="No">No, I would not recommend it</option>
                </select>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>
              </div>
            </form>
          </div>
          
          {/* Reviews List */}
          <div id="reviews" className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 border-b pb-4">Recent Reviews</h2>
            
            {reviews.map((review) => (
              <div key={review.id} className="border rounded-lg mb-6 overflow-hidden">
                <div className="flex justify-between items-center p-4 bg-slate-50 border-b">
                  <div className="font-semibold">{review.reviewer}</div>
                  <div className="text-gray-500 text-sm">{review.date}</div>
                </div>
                <div className="p-5">
                  <div className="text-primary-dark font-semibold text-lg mb-1">{review.medicineName}</div>
                  <div className="font-medium mb-4">Condition: {review.condition}</div>
                  
                  <div className="text-gray-600 mb-6 whitespace-pre-line">
                    {review.text}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                    <div className="bg-slate-50 p-3 rounded-md">
                      <div className="text-sm text-gray-500 mb-1">Effectiveness</div>
                      {renderReadOnlyStars(review.ratings.effectiveness)}
                    </div>
                    <div className="bg-slate-50 p-3 rounded-md">
                      <div className="text-sm text-gray-500 mb-1">Side Effects</div>
                      {renderReadOnlyStars(review.ratings.sideEffects)}
                    </div>
                    <div className="bg-slate-50 p-3 rounded-md">
                      <div className="text-sm text-gray-500 mb-1">Ease of Use</div>
                      {renderReadOnlyStars(review.ratings.easeOfUse)}
                    </div>
                    <div className="bg-slate-50 p-3 rounded-md">
                      <div className="text-sm text-gray-500 mb-1">Overall Satisfaction</div>
                      {renderReadOnlyStars(review.ratings.satisfaction)}
                    </div>
                  </div>
                </div>
                <div className="border-t p-4 flex justify-between items-center">
                  <div>Would recommend: <strong>{review.wouldRecommend}</strong></div>
                  <button 
                    onClick={() => handleMarkHelpful(review.id)}
                    className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors"
                  >
                    <ThumbsUp size={16} />
                    <span>Helpful ({review.helpfulCount})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MedicineReview;
