'use client';

import Modal from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import type { Recipe } from '@/types';
import { MEAL_KIT_PARTNERS } from '@/lib/constants';
import { generateAffiliateLink } from '@/lib/affiliate';
import { ExternalLink } from 'lucide-react';

interface MealKitModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe;
}

export default function MealKitModal({ isOpen, onClose, recipe }: MealKitModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Order a Meal Kit" size="md">
      <p className="text-sm text-muted-foreground mb-4">
        Get fresh ingredients and recipes delivered to your door
      </p>
      <div className="space-y-3">
        {MEAL_KIT_PARTNERS.map((partner) => (
          <a
            key={partner.name}
            href={generateAffiliateLink({
              partner: partner.name,
              baseUrl: partner.url,
              recipeId: recipe.id,
              recipeName: recipe.title,
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-brand-orange/30 hover:bg-muted/50 transition-all group"
          >
            <span className="text-3xl">{partner.logo}</span>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm">{partner.name}</h4>
              <p className="text-xs text-muted-foreground">{partner.description}</p>
              <p className="text-xs font-medium text-brand-orange mt-1">{partner.discount}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-brand-orange transition-colors shrink-0" />
          </a>
        ))}
      </div>
    </Modal>
  );
}
