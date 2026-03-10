'use client';

import { useState, useEffect } from 'react';
import type { Recipe } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { formatTime } from '@/lib/utils';
import RecipeHeader from './RecipeHeader';
import IngredientList from './IngredientList';
import InstructionSteps from './InstructionSteps';
import ChefTips from './ChefTips';
import RecipeActions from './RecipeActions';
import Badge from '@/components/ui/Badge';
import { Clock, Users, Flame, BarChart3, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface RecipeViewProps {
  recipe: Recipe;
}

export default function RecipeView({ recipe }: RecipeViewProps) {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);

  useEffect(() => {
    if (user && recipe.id) {
      fetch(`/api/recipes/${recipe.id}`)
        .then((res) => res.json())
        .then((data) => {
          setIsSaved(data.isSaved ?? false);
          setUserRating(data.userRating ?? null);
        })
        .catch(() => {});
    }
  }, [user, recipe.id]);

  const stats = [
    { icon: Clock, label: 'Total Time', value: formatTime(recipe.total_time) },
    { icon: Users, label: 'Servings', value: `${recipe.servings}` },
    { icon: Flame, label: 'Calories', value: recipe.calories_per_serving ? `${recipe.calories_per_serving} kcal` : 'N/A' },
    { icon: BarChart3, label: 'Skill', value: recipe.skill_level.charAt(0).toUpperCase() + recipe.skill_level.slice(1) },
  ];

  return (
    <div className="min-h-screen bg-muted pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Generator
        </Link>

        {/* Recipe Header */}
        <RecipeHeader recipe={recipe} />

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-4 text-center border border-border">
              <stat.icon className="w-5 h-5 text-brand-orange mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-sm font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Dietary & Allergen badges */}
        {(recipe.dietary_tags?.length > 0 || recipe.allergen_warnings?.length > 0) && (
          <div className="flex flex-wrap gap-2 mt-4">
            {recipe.dietary_tags?.map((tag: string) => (
              <Badge key={tag} variant="success">{tag}</Badge>
            ))}
            {recipe.allergen_warnings?.map((allergen: string) => (
              <Badge key={allergen} variant="warning">Contains: {allergen}</Badge>
            ))}
          </div>
        )}

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Ingredients sidebar */}
          <div className="lg:col-span-1">
            <IngredientList ingredients={recipe.ingredients} />
          </div>

          {/* Instructions */}
          <div className="lg:col-span-2">
            <InstructionSteps instructions={recipe.instructions} />
          </div>
        </div>

        {/* Chef Tips */}
        {recipe.chef_tips?.length > 0 && (
          <ChefTips tips={recipe.chef_tips} />
        )}

        {/* Actions */}
        <RecipeActions
          recipe={recipe}
          isSaved={isSaved}
          setIsSaved={setIsSaved}
          userRating={userRating}
          setUserRating={setUserRating}
        />
      </div>
    </div>
  );
}
