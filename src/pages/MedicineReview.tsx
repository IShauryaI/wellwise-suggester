
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const MedicineReview = () => {
  const navigate = useNavigate();
  const [medicineName, setMedicineName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!medicineName.trim()) {
      toast.error("Please enter a medicine name");
      return;
    }
    
    if (!review.trim()) {
      toast.error("Please enter your review");
      return;
    }
    
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Your review has been submitted successfully!");
      setMedicineName("");
      setReview("");
      setRating(0);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <button 
              onClick={() => navigate("/")} 
              className="text-primary hover:underline flex items-center"
            >
              &larr; Back to Home
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-2 text-primary">Medicine Review</h1>
            <p className="text-gray-600 mb-6">
              Share your experience with a medication to help others make informed decisions.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="medicine-name">Medicine Name</Label>
                <Input
                  id="medicine-name"
                  placeholder="Enter medicine name"
                  value={medicineName}
                  onChange={(e) => setMedicineName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Rating</Label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="focus:outline-none"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= (hover || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="review">Your Review</Label>
                <Textarea
                  id="review"
                  placeholder="Share your experience with this medication..."
                  rows={6}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="resize-none"
                />
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MedicineReview;
