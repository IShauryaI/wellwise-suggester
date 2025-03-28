
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Skin, InitialFormState, SkinConcern } from "@/types/skincare";
import { CheckCircle, Loader } from "lucide-react";

// Create schema for form validation
const formSchema = z.object({
  type: z.enum(["dry", "oily", "combination", "normal"]),
  concerns: z.array(z.enum(["acne", "aging", "hyperpigmentation", "sensitivity", "dullness", "redness"])),
  sensitive: z.boolean(),
  age: z.string(),
  climate: z.enum(["dry", "humid", "temperate", "cold"]),
  currentProducts: z.string().optional()
});

interface SkincareFormProps {
  onSubmit: (data: Skin) => void;
  isLoading: boolean;
}

export function SkincareForm({ onSubmit, isLoading }: SkincareFormProps) {
  const [selectedConcerns, setSelectedConcerns] = useState<SkinConcern[]>([]);
  const [isSensitive, setIsSensitive] = useState(false);
  
  const form = useForm<Skin>({
    resolver: zodResolver(formSchema),
    defaultValues: InitialFormState
  });
  
  const handleSubmit = (data: Skin) => {
    // Update with selected concerns and sensitivity
    const submitData = {
      ...data,
      concerns: selectedConcerns,
      sensitive: isSensitive
    };
    onSubmit(submitData);
  };
  
  const toggleConcern = (concern: SkinConcern) => {
    if (selectedConcerns.includes(concern)) {
      setSelectedConcerns(selectedConcerns.filter(c => c !== concern));
    } else {
      setSelectedConcerns([...selectedConcerns, concern]);
    }
  };
  
  const toggleSensitivity = () => {
    setIsSensitive(!isSensitive);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Create Your Skincare Routine</CardTitle>
        <CardDescription>
          Tell us about your skin to get personalized product recommendations and a daily skincare routine.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Skin Type */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skin Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your skin type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="dry">Dry</SelectItem>
                        <SelectItem value="oily">Oily</SelectItem>
                        <SelectItem value="combination">Combination</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the option that best describes your skin's natural state.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Age Range */}
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age Range</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your age range" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="under-18">Under 18</SelectItem>
                        <SelectItem value="18-24">18-24</SelectItem>
                        <SelectItem value="25-34">25-34</SelectItem>
                        <SelectItem value="35-44">35-44</SelectItem>
                        <SelectItem value="45-54">45-54</SelectItem>
                        <SelectItem value="55+">55+</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Different age groups have different skincare needs.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Climate */}
            <FormField
              control={form.control}
              name="climate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Climate Where You Live</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your climate" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="dry">Dry</SelectItem>
                      <SelectItem value="humid">Humid</SelectItem>
                      <SelectItem value="temperate">Temperate</SelectItem>
                      <SelectItem value="cold">Cold</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Your environment affects your skin's needs.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Skin Concerns */}
            <div>
              <FormLabel>Skin Concerns (Select All That Apply)</FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {[
                  { id: 'acne', label: 'Acne & Breakouts' },
                  { id: 'aging', label: 'Aging & Fine Lines' },
                  { id: 'hyperpigmentation', label: 'Hyperpigmentation & Dark Spots' },
                  { id: 'sensitivity', label: 'Sensitivity & Redness' },
                  { id: 'dullness', label: 'Dullness & Uneven Texture' },
                  { id: 'redness', label: 'Redness & Inflammation' }
                ].map((concern) => (
                  <button
                    key={concern.id}
                    type="button"
                    className={`relative p-3 rounded-lg border ${
                      selectedConcerns.includes(concern.id as SkinConcern)
                        ? 'border-primary bg-primary-light text-primary'
                        : 'border-gray-200 hover:border-primary/50'
                    } transition-colors text-left`}
                    onClick={() => toggleConcern(concern.id as SkinConcern)}
                  >
                    {selectedConcerns.includes(concern.id as SkinConcern) && (
                      <CheckCircle className="absolute top-2 right-2 h-4 w-4 text-primary" />
                    )}
                    <span className="text-sm font-medium">{concern.label}</span>
                  </button>
                ))}
              </div>
              <FormDescription className="mt-2">
                Select any skin concerns you'd like your routine to address.
              </FormDescription>
            </div>
            
            {/* Sensitive Skin */}
            <div>
              <button
                type="button"
                className={`relative p-3 rounded-lg border w-full ${
                  isSensitive
                    ? 'border-primary bg-primary-light text-primary'
                    : 'border-gray-200 hover:border-primary/50'
                } transition-colors text-left`}
                onClick={toggleSensitivity}
              >
                {isSensitive && (
                  <CheckCircle className="absolute top-3 right-3 h-5 w-5 text-primary" />
                )}
                <span className="text-sm font-medium">I have sensitive skin that gets irritated easily</span>
              </button>
              <FormDescription className="mt-2">
                Check this if your skin reacts easily to new products or ingredients.
              </FormDescription>
            </div>
            
            {/* Current Products */}
            <FormField
              control={form.control}
              name="currentProducts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Skincare Products (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List any skincare products you're currently using..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This helps us understand what's working (or not working) for you.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Creating Your Routine...
                </>
              ) : (
                'Generate My Skincare Routine'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
