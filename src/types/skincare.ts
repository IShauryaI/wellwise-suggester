
export type SkinType = 'dry' | 'oily' | 'combination' | 'normal';
export type SkinConcern = 'acne' | 'aging' | 'hyperpigmentation' | 'sensitivity' | 'dullness' | 'redness';
export type ClimateType = 'dry' | 'humid' | 'temperate' | 'cold';

export interface Skin {
  type: SkinType;
  concerns: SkinConcern[];
  sensitive: boolean;
  age: string;
  climate: ClimateType;
  currentProducts: string;
}

export interface RoutineProduct {
  step: string;
  recommendation: string;
  description: string;
  productSuggestion: string;
  imageUrl: string;
}

export interface WeeklyTreatment {
  name: string;
  frequency: string;
  description: string;
  productSuggestion: string;
}

export interface SkincareRoutine {
  morningRoutine: RoutineProduct[];
  eveningRoutine: RoutineProduct[];
  weeklyTreatments: WeeklyTreatment[];
  nutritionTips: string[];
  skincareTips: string[];
}

export const InitialFormState: Skin = {
  type: 'normal',
  concerns: [],
  sensitive: false,
  age: '25-34',
  climate: 'temperate',
  currentProducts: ''
};
