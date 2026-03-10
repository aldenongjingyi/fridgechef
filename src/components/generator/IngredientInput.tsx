'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { INGREDIENTS_LIST } from '@/lib/constants';
import { Plus, X, Search } from 'lucide-react';

interface IngredientInputProps {
  ingredients: string[];
  onAdd: (ingredient: string) => void;
  onRemove: (index: number) => void;
}

export default function IngredientInput({ ingredients, onAdd, onRemove }: IngredientInputProps) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const filteredIngredients = query.length > 0
    ? INGREDIENTS_LIST.filter(
        (item) =>
          item.toLowerCase().includes(query.toLowerCase()) &&
          !ingredients.includes(item)
      ).slice(0, 8)
    : [];

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (ingredient: string) => {
    onAdd(ingredient);
    setQuery('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filteredIngredients.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredIngredients[selectedIndex]) {
        handleSelect(filteredIngredients[selectedIndex]);
      } else if (query.trim()) {
        handleSelect(query.trim());
      }
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-foreground">
        Your Ingredients <span className="text-muted-foreground">({ingredients.length}/10)</span>
      </label>

      {/* Selected ingredients */}
      {ingredients.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {ingredients.map((ingredient, index) => (
            <span
              key={ingredient}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-medium"
            >
              {ingredient}
              <button
                onClick={() => onRemove(index)}
                className="p-0.5 hover:bg-brand-orange/20 rounded-full transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input with autocomplete */}
      {ingredients.length < 10 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            placeholder={ingredients.length === 0 ? 'Type an ingredient, e.g. "Chicken Breast"' : 'Add another ingredient...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-white text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
          />

          {/* Suggestions dropdown */}
          {showSuggestions && filteredIngredients.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute z-20 top-full mt-1 w-full bg-white border border-border rounded-xl shadow-lg overflow-hidden"
            >
              {filteredIngredients.map((ingredient, index) => (
                <button
                  key={ingredient}
                  onClick={() => handleSelect(ingredient)}
                  className={cn(
                    'w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2',
                    index === selectedIndex
                      ? 'bg-brand-orange/10 text-brand-orange'
                      : 'hover:bg-muted text-foreground'
                  )}
                >
                  <Plus className="w-4 h-4 opacity-50" />
                  {ingredient}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
