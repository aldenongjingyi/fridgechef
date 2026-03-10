import type { Recipe } from '@/types';
import StarRating from '@/components/ui/StarRating';

interface RecipeHeaderProps {
  recipe: Recipe;
}

export default function RecipeHeader({ recipe }: RecipeHeaderProps) {
  return (
    <div className="bg-white rounded-2xl border border-border p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <div className="text-5xl sm:text-6xl">{recipe.image_emoji}</div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold font-heading leading-tight">
            {recipe.title}
          </h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            {recipe.description}
          </p>
          <div className="flex items-center gap-3 mt-3">
            <StarRating rating={Math.round(recipe.average_rating)} size="sm" />
            <span className="text-sm text-muted-foreground">
              {recipe.rating_count > 0
                ? `${recipe.average_rating.toFixed(1)} (${recipe.rating_count} ${recipe.rating_count === 1 ? 'rating' : 'ratings'})`
                : 'No ratings yet'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
