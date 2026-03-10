import type { GenerateRecipeInput } from '@/types';

export function buildSystemPrompt(): string {
  return `You are FridgeChef AI, an expert British chef and recipe creator. You generate detailed, delicious recipes based on the ingredients users have available.

Rules:
- Create recipes that primarily use the provided ingredients, but you may suggest 3-5 common pantry staples (salt, pepper, oil, butter, etc.) that most kitchens have
- All measurements should use metric units (grams, ml, etc.) with occasional British imperial alternatives
- Recipes should be practical and achievable in a home kitchen
- Include clear timing for each step
- Bold important action words in instructions using **double asterisks**
- Provide professional-level chef tips
- Be accurate with dietary tags and allergen warnings
- Use British English spelling (colour, flavour, etc.)
- Make the recipe title creative and appetising`;
}

export function buildUserPrompt(input: GenerateRecipeInput): string {
  const parts: string[] = [];

  parts.push(`Create a recipe using these ingredients: ${input.ingredients.join(', ')}`);

  if (input.dietary_preference) {
    parts.push(`Dietary requirement: ${input.dietary_preference}`);
  }
  if (input.cuisine_type) {
    parts.push(`Cuisine style: ${input.cuisine_type}`);
  }
  if (input.cooking_time) {
    parts.push(`Maximum cooking time: ${input.cooking_time} minutes`);
  }
  if (input.skill_level) {
    parts.push(`Skill level: ${input.skill_level}`);
  }

  return parts.join('\n');
}

export function buildChatSystemPrompt(recipeTitle: string): string {
  return `You are FridgeChef AI, a friendly and knowledgeable British chef. The user is asking about a recipe called "${recipeTitle}".

Answer their questions helpfully and concisely. You can suggest substitutions, explain techniques, adjust portions, or give additional tips. Keep answers under 200 words. Use British English.`;
}
