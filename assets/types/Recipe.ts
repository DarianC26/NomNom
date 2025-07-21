export interface Recipe {
  id: string;
  title: string;
  description?: string;
  image: string;
  time: string;
  rating: number;
  reviews?: number;
}

// You can add more recipe-related types here as needed
export interface RecipeIngredient {
  id: string;
  name: string;
  amount: string;
  unit: string;
}

export interface RecipeStep {
  id: string;
  stepNumber: number;
  instruction: string;
}