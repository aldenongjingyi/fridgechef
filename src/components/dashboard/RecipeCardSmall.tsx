import type { Recipe } from '@/types';
import { formatTime, formatDate } from '@/lib/utils';
import StarRating from '@/components/ui/StarRating';
import Badge from '@/components/ui/Badge';
import { Clock, Users } from 'lucide-react';
import Link from 'next/link';

interface RecipeCardSmallProps {
  recipe: Recipe;
  savedAt: string;
}

export default function RecipeCardSmall({ recipe, savedAt }: RecipeCardSmallProps) {
  return (
    <Link href={`/recipe/${recipe.id}`}>
      <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-md transition-all hover:-translate-y-0.5 group h-full">
        {/* Emoji header */}
        <div className="h-28 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
          <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
            {recipe.image_emoji}
          </span>
        </div>

        <div className="p-4 space-y-2">
          <h3 className="font-bold text-sm font-heading leading-tight line-clamp-2">
            {recipe.title}
          </h3>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatTime(recipe.total_time)}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {recipe.servings}
            </span>
          </div>

          {recipe.dietary_tags?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {recipe.dietary_tags.slice(0, 2).map((tag: string) => (
                <Badge key={tag} variant="success">{tag}</Badge>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <StarRating rating={Math.round(recipe.average_rating)} size="sm" />
            <span className="text-xs text-muted-foreground">
              Saved {formatDate(savedAt)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
