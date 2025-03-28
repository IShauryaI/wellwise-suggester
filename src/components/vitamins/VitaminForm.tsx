
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AgeRange, ActivityLevel, DietaryPreference, HealthGoal, VitaminProfile, InitialVitaminFormState } from "@/types/vitamins";
import { useState } from "react";

const healthGoalOptions: { id: HealthGoal; label: string }[] = [
  { id: 'energy', label: 'Increase Energy Levels' },
  { id: 'immunity', label: 'Boost Immune System' },
  { id: 'sleep', label: 'Improve Sleep Quality' },
  { id: 'stress', label: 'Reduce Stress & Anxiety' },
  { id: 'digestion', label: 'Improve Digestive Health' },
  { id: 'joints', label: 'Support Joint Health' },
  { id: 'heart', label: 'Promote Heart Health' },
  { id: 'brain', label: 'Enhance Brain Function' },
  { id: 'fitness', label: 'Support Fitness Goals' },
  { id: 'weight', label: 'Assist Weight Management' },
];

const formSchema = z.object({
  age: z.string(),
  gender: z.enum(['male', 'female', 'other']),
  dietary: z.string(),
  healthGoals: z.array(z.string()).min(1, {
    message: "Please select at least one health goal.",
  }),
  activityLevel: z.string(),
  existingConditions: z.string().optional(),
  currentSupplements: z.string().optional(),
});

interface VitaminFormProps {
  onSubmit: (data: VitaminProfile) => void;
}

export function VitaminForm({ onSubmit }: VitaminFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: InitialVitaminFormState,
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const formData: VitaminProfile = {
        ...values,
        healthGoals: values.healthGoals as HealthGoal[],
        dietary: values.dietary as DietaryPreference,
        age: values.age as AgeRange,
        activityLevel: values.activityLevel as ActivityLevel,
      };
      onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 bg-white rounded-lg shadow-sm">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-dark mb-3">Personalized Vitamin & Supplement Recommendations</h2>
        <p className="text-gray mb-4">
          Fill out this form to receive customized supplement recommendations based on your unique health profile and goals.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age Range</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your age range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="under-18">Under 18</SelectItem>
                      <SelectItem value="18-30">18-30</SelectItem>
                      <SelectItem value="31-45">31-45</SelectItem>
                      <SelectItem value="46-60">46-60</SelectItem>
                      <SelectItem value="over-60">Over 60</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="dietary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dietary Preference</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your dietary preference" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="omnivore">Omnivore (I eat everything)</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="pescatarian">Pescatarian</SelectItem>
                    <SelectItem value="keto">Keto</SelectItem>
                    <SelectItem value="paleo">Paleo</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  This helps us recommend supplements that align with your diet.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="activityLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Activity Level</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your activity level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (Little to no exercise)</SelectItem>
                    <SelectItem value="light">Light (Light exercise 1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (Moderate exercise 3-5 days/week)</SelectItem>
                    <SelectItem value="active">Active (Hard exercise 6-7 days/week)</SelectItem>
                    <SelectItem value="very-active">Very Active (Intense exercise daily or twice daily)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="healthGoals"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Health Goals</FormLabel>
                  <FormDescription>
                    Select all that apply to you
                  </FormDescription>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {healthGoalOptions.map((option) => (
                    <FormField
                      key={option.id}
                      control={form.control}
                      name="healthGoals"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={option.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(option.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, option.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== option.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {option.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="existingConditions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Existing Health Conditions (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="List any health conditions, allergies, or medications you're currently taking..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This information helps us avoid recommending supplements that may interact with your conditions or medications.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currentSupplements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Supplements (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="List any vitamins or supplements you're currently taking..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This helps us avoid redundancy in your supplement regimen.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center pt-2">
            <Button 
              type="submit" 
              size="lg" 
              disabled={isSubmitting}
              className="bg-primary text-white hover:bg-primary-dark"
            >
              {isSubmitting ? "Analyzing..." : "Get My Personalized Plan"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
