
export type DietaryPreference = 'omnivore' | 'vegetarian' | 'vegan' | 'pescatarian' | 'keto' | 'paleo';
export type AgeRange = 'under-18' | '18-30' | '31-45' | '46-60' | 'over-60';
export type HealthGoal = 'energy' | 'immunity' | 'sleep' | 'stress' | 'digestion' | 'joints' | 'heart' | 'brain' | 'fitness' | 'weight';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';

export interface VitaminProfile {
  age: AgeRange;
  gender: 'male' | 'female' | 'other';
  dietary: DietaryPreference;
  healthGoals: HealthGoal[];
  activityLevel: ActivityLevel;
  existingConditions: string;
  currentSupplements: string;
}

export interface SupplementRecommendation {
  name: string;
  description: string;
  dosage: string;
  benefits: string[];
  imageUrl: string;
}

export interface LifestyleTip {
  title: string;
  description: string;
}

export interface VitaminRecommendations {
  dailySupplements: SupplementRecommendation[];
  situationalSupplements: SupplementRecommendation[];
  foodSources: {
    name: string;
    foods: string[];
  }[];
  lifestyleTips: LifestyleTip[];
  warnings: string[];
}

export const InitialVitaminFormState: VitaminProfile = {
  age: '31-45',
  gender: 'female',
  dietary: 'omnivore',
  healthGoals: [],
  activityLevel: 'moderate',
  existingConditions: '',
  currentSupplements: ''
};
