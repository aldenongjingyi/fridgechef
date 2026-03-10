'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { GenerateRecipeInput } from '@/types';

interface UseRecipeGeneratorReturn {
  ingredients: string[];
  dietaryPreference: string;
  cuisineType: string;
  cookingTime: number;
  skillLevel: string;
  isGenerating: boolean;
  error: string | null;
  addIngredient: (ingredient: string) => void;
  removeIngredient: (index: number) => void;
  setDietaryPreference: (value: string) => void;
  setCuisineType: (value: string) => void;
  setCookingTime: (value: number) => void;
  setSkillLevel: (value: string) => void;
  generate: () => Promise<void>;
  canGenerate: boolean;
}

export function useRecipeGenerator(): UseRecipeGeneratorReturn {
  const router = useRouter();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [dietaryPreference, setDietaryPreference] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [cookingTime, setCookingTime] = useState(30);
  const [skillLevel, setSkillLevel] = useState('beginner');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addIngredient = (ingredient: string) => {
    if (ingredients.length >= 10) return;
    if (ingredients.includes(ingredient)) return;
    setIngredients((prev) => [...prev, ingredient]);
    setError(null);
  };

  const removeIngredient = (index: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const canGenerate = ingredients.length >= 1 && ingredients.length <= 10;

  const generate = async () => {
    if (!canGenerate) {
      setError('Please add at least one ingredient');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const input: GenerateRecipeInput = {
        ingredients,
        dietary_preference: dietaryPreference || undefined,
        cuisine_type: cuisineType || undefined,
        cooking_time: cookingTime,
        skill_level: skillLevel,
      };

      const res = await fetch('/api/recipes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to generate recipe');
      }

      const data = await res.json();
      router.push(`/recipe/${data.recipe.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setIsGenerating(false);
    }
  };

  return {
    ingredients,
    dietaryPreference,
    cuisineType,
    cookingTime,
    skillLevel,
    isGenerating,
    error,
    addIngredient,
    removeIngredient,
    setDietaryPreference,
    setCuisineType,
    setCookingTime,
    setSkillLevel,
    generate,
    canGenerate,
  };
}
