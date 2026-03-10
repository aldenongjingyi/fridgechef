'use client';

import { useState } from 'react';
import type { RecipeIngredient } from '@/types';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface IngredientListProps {
  ingredients: RecipeIngredient[];
}

export default function IngredientList({ ingredients }: IngredientListProps) {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-border p-6 sticky top-24">
      <h2 className="text-lg font-bold font-heading mb-4">Ingredients</h2>
      <div className="space-y-5">
        {ingredients.map((category) => (
          <div key={category.category}>
            <h3 className="text-xs font-semibold text-brand-orange uppercase tracking-wider mb-2">
              {category.category}
            </h3>
            <ul className="space-y-2">
              {category.items.map((item, idx) => {
                const id = `${category.category}-${idx}`;
                const isChecked = checked.has(id);
                return (
                  <li key={id}>
                    <button
                      onClick={() => toggle(id)}
                      className="flex items-start gap-2 w-full text-left group"
                    >
                      <span
                        className={cn(
                          'w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors',
                          isChecked
                            ? 'bg-brand-orange border-brand-orange text-white'
                            : 'border-border group-hover:border-brand-orange/50'
                        )}
                      >
                        {isChecked && <Check className="w-3 h-3" />}
                      </span>
                      <span className={cn('text-sm', isChecked && 'line-through text-muted-foreground')}>
                        <strong>{item.amount}{item.unit}</strong> {item.name}
                        {item.notes && <span className="text-muted-foreground"> ({item.notes})</span>}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
