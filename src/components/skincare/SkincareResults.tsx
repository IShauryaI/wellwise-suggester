
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SkincareRoutine } from "@/types/skincare";
import { ChevronRight, Sun, Moon, CalendarDays, Apple, Sparkles } from "lucide-react";

interface SkincareResultsProps {
  routine: SkincareRoutine;
}

export function SkincareResults({ routine }: SkincareResultsProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-dark">Your Personalized Skincare Routine</h2>
        <p className="text-gray max-w-2xl mx-auto">
          Based on your skin profile, we've created a custom routine to address your specific needs and concerns.
        </p>
      </div>
      
      {/* Morning Routine */}
      <Card>
        <CardHeader className="bg-primary-light rounded-t-lg">
          <div className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl">Morning Routine</CardTitle>
          </div>
          <CardDescription>Follow these steps every morning for best results</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {routine.morningRoutine.map((product, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-4 md:items-start border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                <div className="w-full md:w-1/4 shrink-0">
                  <div className="aspect-square rounded-lg overflow-hidden bg-slate-100">
                    <img 
                      src={product.imageUrl} 
                      alt={product.step} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=300';
                      }}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-primary text-white text-xs font-medium rounded-full w-6 h-6 flex items-center justify-center">
                      {index + 1}
                    </span>
                    <h3 className="font-semibold text-dark">{product.step}</h3>
                  </div>
                  <h4 className="text-primary font-medium mb-2">{product.recommendation}</h4>
                  <p className="text-gray text-sm mb-3">{product.description}</p>
                  <div className="bg-slate-50 p-3 rounded-md">
                    <span className="text-xs text-slate-500 block mb-1">Suggested Product:</span>
                    <span className="text-sm font-medium">{product.productSuggestion}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Evening Routine */}
      <Card>
        <CardHeader className="bg-primary-light rounded-t-lg">
          <div className="flex items-center gap-2">
            <Moon className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl">Evening Routine</CardTitle>
          </div>
          <CardDescription>Follow these steps every evening before bed</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {routine.eveningRoutine.map((product, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-4 md:items-start border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                <div className="w-full md:w-1/4 shrink-0">
                  <div className="aspect-square rounded-lg overflow-hidden bg-slate-100">
                    <img 
                      src={product.imageUrl} 
                      alt={product.step}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=300';
                      }}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-primary text-white text-xs font-medium rounded-full w-6 h-6 flex items-center justify-center">
                      {index + 1}
                    </span>
                    <h3 className="font-semibold text-dark">{product.step}</h3>
                  </div>
                  <h4 className="text-primary font-medium mb-2">{product.recommendation}</h4>
                  <p className="text-gray text-sm mb-3">{product.description}</p>
                  <div className="bg-slate-50 p-3 rounded-md">
                    <span className="text-xs text-slate-500 block mb-1">Suggested Product:</span>
                    <span className="text-sm font-medium">{product.productSuggestion}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Weekly Treatments */}
      <Card>
        <CardHeader className="bg-primary-light rounded-t-lg">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl">Weekly Treatments</CardTitle>
          </div>
          <CardDescription>Additional treatments to enhance your skincare routine</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {routine.weeklyTreatments.map((treatment, index) => (
              <div key={index} className="bg-slate-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-semibold text-dark">{treatment.name}</h3>
                      <span className="bg-primary-light text-primary text-xs px-2 py-0.5 rounded-full">
                        {treatment.frequency}
                      </span>
                    </div>
                    <p className="text-gray text-sm mb-2">{treatment.description}</p>
                    <div className="text-sm">
                      <span className="font-medium">Try:</span> {treatment.productSuggestion}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Additional Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nutrition Tips */}
        <Card>
          <CardHeader className="bg-secondary-light rounded-t-lg">
            <div className="flex items-center gap-2">
              <Apple className="h-5 w-5 text-secondary" />
              <CardTitle className="text-xl">Nutrition for Healthy Skin</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              {routine.nutritionTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  <span className="text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        {/* Skincare Tips */}
        <Card>
          <CardHeader className="bg-primary-light rounded-t-lg">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl">Skincare Tips</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              {routine.skincareTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-center pt-8">
        <p className="text-gray italic mb-4">
          Note: These recommendations are based on the information you provided and are intended as general guidance. 
          Individual results may vary, and it's always best to consult with a dermatologist for personalized advice.
        </p>
      </div>
    </div>
  );
}
