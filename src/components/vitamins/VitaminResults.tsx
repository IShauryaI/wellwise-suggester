
import { SupplementRecommendation, VitaminRecommendations } from "@/types/vitamins";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pill, AlertCircle, ArrowRight } from "lucide-react";

interface VitaminResultsProps {
  results: VitaminRecommendations;
}

function SupplementCard({ supplement }: { supplement: SupplementRecommendation }) {
  return (
    <Card className="mb-6 overflow-hidden h-full">
      <div className="relative h-[200px] overflow-hidden bg-secondary/5">
        <img 
          src={supplement.imageUrl || '/placeholder.svg'} 
          alt={supplement.name}
          className="object-cover w-full h-full"
        />
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl text-primary-dark">{supplement.name}</CardTitle>
        <div className="flex items-center text-gray/90 text-sm">
          <Pill className="w-4 h-4 mr-1" />
          <span>{supplement.dosage}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-gray/80">{supplement.description}</p>
        <div>
          <h4 className="text-sm font-semibold mb-2">Key Benefits:</h4>
          <ul className="list-disc pl-5 text-sm text-gray/90 space-y-1">
            {supplement.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export function VitaminResults({ results }: VitaminResultsProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 bg-white rounded-lg shadow-sm">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center bg-secondary-light text-secondary rounded-full px-3 py-1 text-sm font-medium mb-4">
          Your Personalized Plan
        </div>
        <h2 className="text-3xl font-bold text-dark mb-3">Your Supplement Recommendations</h2>
        <p className="text-gray max-w-3xl mx-auto">
          Based on your health profile and goals, we've created a personalized supplement plan to help you optimize your health and wellness.
        </p>
      </div>

      <Tabs defaultValue="daily" className="w-full mb-10">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="daily">Daily Essentials</TabsTrigger>
          <TabsTrigger value="situational">Situational Support</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.dailySupplements.map((supplement, index) => (
              <SupplementCard key={index} supplement={supplement} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="situational">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.situationalSupplements.length > 0 ? (
              results.situationalSupplements.map((supplement, index) => (
                <SupplementCard key={index} supplement={supplement} />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray/80">No situational supplements are recommended for your profile at this time.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Food Sources</CardTitle>
            <CardDescription>
              Nutrient-rich foods that support your supplement plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            {results.foodSources.map((source, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <h3 className="font-medium text-dark mb-2">{source.name}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {source.foods.map((food, foodIndex) => (
                    <div key={foodIndex} className="flex items-center">
                      <ArrowRight className="w-3 h-3 mr-2 text-secondary" />
                      <span className="text-sm text-gray/90">{food}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Lifestyle Recommendations</CardTitle>
            <CardDescription>
              Habits that enhance the effectiveness of your supplements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.lifestyleTips.map((tip, index) => (
                <div key={index} className="pb-4 border-b border-gray/10 last:border-0 last:pb-0">
                  <h3 className="font-medium text-dark mb-1">{tip.title}</h3>
                  <p className="text-sm text-gray/80">{tip.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {results.warnings.length > 0 && (
        <Card className="mb-8 border-red-200 bg-red-50">
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <CardTitle className="text-xl text-red-600">Important Considerations</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {results.warnings.map((warning, index) => (
                <li key={index} className="text-red-700">{warning}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <div className="text-center mt-10">
        <p className="text-sm text-gray/70 max-w-2xl mx-auto mb-4">
          Remember: These recommendations are general suggestions based on your profile. Always consult with a healthcare professional before starting any new supplement regimen, especially if you have health conditions or are taking medications.
        </p>
      </div>
    </div>
  );
}
