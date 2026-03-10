export interface Recipe {
  id: string;
  user_id: string | null;
  title: string;
  description: string;
  ingredients_input: string[];
  dietary_preference: string | null;
  cuisine_type: string | null;
  cooking_time: number;
  skill_level: string;
  servings: number;
  prep_time: number;
  cook_time: number;
  total_time: number;
  calories_per_serving: number | null;
  ingredients: RecipeIngredient[];
  instructions: RecipeInstruction[];
  chef_tips: string[];
  dietary_tags: string[];
  allergen_warnings: string[];
  image_emoji: string;
  average_rating: number;
  rating_count: number;
  created_at: string;
}

export interface RecipeIngredient {
  category: string;
  items: {
    name: string;
    amount: string;
    unit: string;
    notes?: string;
  }[];
}

export interface RecipeInstruction {
  step: number;
  title: string;
  description: string;
  time_minutes: number | null;
  tip?: string;
}

export interface SavedRecipe {
  id: string;
  user_id: string;
  recipe_id: string;
  created_at: string;
  recipe: Recipe;
}

export interface Rating {
  id: string;
  user_id: string;
  recipe_id: string;
  rating: number;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  recipes_generated: number;
  created_at: string;
}

export interface GenerateRecipeInput {
  ingredients: string[];
  dietary_preference?: string;
  cuisine_type?: string;
  cooking_time?: number;
  skill_level?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
