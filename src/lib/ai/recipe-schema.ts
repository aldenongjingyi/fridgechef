import { z } from 'zod';

export const RecipeIngredientItemSchema = z.object({
  name: z.string().describe('Ingredient name'),
  amount: z.string().describe('Amount needed, e.g. "200" or "2-3"'),
  unit: z.string().describe('Unit of measurement, e.g. "g", "ml", "tbsp", "pieces"'),
  notes: z.string().optional().describe('Optional preparation notes, e.g. "finely diced"'),
});

export const RecipeIngredientCategorySchema = z.object({
  category: z.string().describe('Category name, e.g. "Protein", "Vegetables", "Sauce", "Seasoning"'),
  items: z.array(RecipeIngredientItemSchema),
});

export const RecipeInstructionSchema = z.object({
  step: z.number().describe('Step number starting from 1'),
  title: z.string().describe('Short title for the step, 2-5 words, starting with an action verb'),
  description: z.string().describe('Detailed instruction for this step. Bold important action words by wrapping them in **double asterisks**.'),
  time_minutes: z.number().nullable().describe('Estimated time in minutes for this step, or null if negligible'),
  tip: z.string().optional().describe('Optional pro tip for this step'),
});

export const RecipeOutputSchema = z.object({
  title: z.string().describe('Creative, appetising recipe title'),
  description: z.string().describe('2-3 sentence description of the dish, mentioning key flavours and textures'),
  servings: z.number().describe('Number of servings'),
  prep_time: z.number().describe('Preparation time in minutes'),
  cook_time: z.number().describe('Cooking time in minutes'),
  total_time: z.number().describe('Total time in minutes (prep + cook)'),
  calories_per_serving: z.number().nullable().describe('Estimated calories per serving, or null if unsure'),
  skill_level: z.string().describe('beginner, intermediate, or advanced'),
  ingredients: z.array(RecipeIngredientCategorySchema).describe('Ingredients organised by category'),
  instructions: z.array(RecipeInstructionSchema).describe('Step-by-step cooking instructions'),
  chef_tips: z.array(z.string()).describe('3-5 professional chef tips for this recipe'),
  dietary_tags: z.array(z.string()).describe('Applicable dietary tags: vegetarian, vegan, gluten-free, dairy-free, keto, paleo, halal, kosher, nut-free'),
  allergen_warnings: z.array(z.string()).describe('List of common allergens present: gluten, dairy, nuts, eggs, soy, shellfish, fish, sesame'),
  image_emoji: z.string().describe('A single food emoji that best represents this dish'),
});

export type RecipeOutput = z.infer<typeof RecipeOutputSchema>;
