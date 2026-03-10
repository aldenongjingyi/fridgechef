'use client';

import { useState } from 'react';
import type { Recipe } from '@/types';
import Button from '@/components/ui/Button';
import StarRating from '@/components/ui/StarRating';
import { useAuthStore } from '@/stores/auth';
import { useToast } from '@/components/ui/Toast';
import MealKitModal from './MealKitModal';
import SupermarketModal from './SupermarketModal';
import ShareModal from './ShareModal';
import AskAiChefModal from './AskAiChefModal';
import {
  Bookmark, BookmarkCheck, ShoppingCart, Store,
  Share2, MessageCircle, Printer, Download,
} from 'lucide-react';

interface RecipeActionsProps {
  recipe: Recipe;
  isSaved: boolean;
  setIsSaved: (saved: boolean) => void;
  userRating: number | null;
  setUserRating: (rating: number | null) => void;
}

export default function RecipeActions({ recipe, isSaved, setIsSaved, userRating, setUserRating }: RecipeActionsProps) {
  const { user, setAuthModal } = useAuthStore();
  const { addToast } = useToast();
  const [mealKitOpen, setMealKitOpen] = useState(false);
  const [supermarketOpen, setSupermarketOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [savingState, setSavingState] = useState(false);

  const handleSave = async () => {
    if (!user) {
      setAuthModal('login');
      return;
    }
    setSavingState(true);
    try {
      const res = await fetch('/api/recipes/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipe_id: recipe.id, action: isSaved ? 'unsave' : 'save' }),
      });
      if (res.ok) {
        setIsSaved(!isSaved);
        addToast(isSaved ? 'Recipe removed from saved' : 'Recipe saved!', 'success');
      }
    } catch {
      addToast('Failed to save recipe', 'error');
    }
    setSavingState(false);
  };

  const handleRate = async (rating: number) => {
    if (!user) {
      setAuthModal('login');
      return;
    }
    try {
      const res = await fetch('/api/recipes/rate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipe_id: recipe.id, rating }),
      });
      if (res.ok) {
        setUserRating(rating);
        addToast(`Rated ${rating} stars!`, 'success');
      }
    } catch {
      addToast('Failed to rate recipe', 'error');
    }
  };

  const handlePrint = () => window.print();

  return (
    <>
      <div className="mt-8 space-y-6">
        {/* Rating */}
        <div className="bg-white rounded-2xl border border-border p-6 text-center">
          <h3 className="font-bold font-heading mb-2">Rate This Recipe</h3>
          <p className="text-sm text-muted-foreground mb-3">
            {userRating ? `You rated this ${userRating} stars` : 'Be the first to rate!'}
          </p>
          <StarRating
            rating={userRating ?? 0}
            interactive
            onRate={handleRate}
            size="lg"
            className="justify-center"
          />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Button variant="outline" onClick={handleSave} isLoading={savingState} className="gap-2">
            {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            {isSaved ? 'Saved' : 'Save'}
          </Button>
          <Button variant="outline" onClick={() => setMealKitOpen(true)} className="gap-2">
            <ShoppingCart className="w-4 h-4" />
            Meal Kits
          </Button>
          <Button variant="outline" onClick={() => setSupermarketOpen(true)} className="gap-2">
            <Store className="w-4 h-4" />
            Shop
          </Button>
          <Button variant="outline" onClick={() => setShareOpen(true)} className="gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Button variant="secondary" onClick={() => setChatOpen(true)} className="gap-2">
            <MessageCircle className="w-4 h-4" />
            Ask AI Chef
          </Button>
          <Button variant="secondary" onClick={handlePrint} className="gap-2">
            <Printer className="w-4 h-4" />
            Print
          </Button>
          <Button variant="secondary" className="gap-2 sm:col-span-1 col-span-2">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Modals */}
      <MealKitModal isOpen={mealKitOpen} onClose={() => setMealKitOpen(false)} recipe={recipe} />
      <SupermarketModal isOpen={supermarketOpen} onClose={() => setSupermarketOpen(false)} recipe={recipe} />
      <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} recipe={recipe} />
      <AskAiChefModal isOpen={chatOpen} onClose={() => setChatOpen(false)} recipe={recipe} />
    </>
  );
}
