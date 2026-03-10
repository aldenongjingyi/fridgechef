'use client';

import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import { useState } from 'react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function StarRating({
  rating,
  maxRating = 5,
  interactive = false,
  onRate,
  size = 'md',
  className,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {Array.from({ length: maxRating }).map((_, i) => {
        const filled = i < (hoverRating || rating);
        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onRate?.(i + 1)}
            onMouseEnter={() => interactive && setHoverRating(i + 1)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            className={cn(
              'transition-colors',
              interactive && 'cursor-pointer hover:scale-110 transition-transform'
            )}
          >
            <Star
              className={cn(
                sizeClasses[size],
                filled
                  ? 'fill-amber-400 text-amber-400'
                  : 'fill-none text-gray-300'
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
