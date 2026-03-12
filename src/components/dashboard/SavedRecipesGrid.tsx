'use client';

import { useState, useMemo } from 'react';
import type { SavedRecipe } from '@/types';
import RecipeCardSmall from './RecipeCardSmall';
import Dropdown from '@/components/ui/dropdown';
import { Search, BookmarkX } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface SavedRecipesGridProps {
  recipes: SavedRecipe[];
}

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'time', label: 'Quickest' },
];

const FILTER_OPTIONS = [
  { value: '', label: 'All Recipes' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'gluten-free', label: 'Gluten-Free' },
  { value: 'dairy-free', label: 'Dairy-Free' },
];

export default function SavedRecipesGrid({ recipes }: SavedRecipesGridProps) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [filter, setFilter] = useState('');

  const filteredRecipes = useMemo(() => {
    let result = [...recipes];

    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((r) =>
        r.recipe.title.toLowerCase().includes(q) ||
        r.recipe.description.toLowerCase().includes(q)
      );
    }

    // Filter by dietary tag
    if (filter) {
      result = result.filter((r) =>
        r.recipe.dietary_tags?.includes(filter)
      );
    }

    // Sort
    switch (sort) {
      case 'oldest':
        result.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case 'rating':
        result.sort((a, b) => (b.recipe.average_rating ?? 0) - (a.recipe.average_rating ?? 0));
        break;
      case 'time':
        result.sort((a, b) => (a.recipe.total_time ?? 0) - (b.recipe.total_time ?? 0));
        break;
      default: // newest
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return result;
  }, [recipes, search, sort, filter]);

  if (recipes.length === 0) {
    return (
      <div className="text-center py-16">
        <BookmarkX className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-bold font-heading mb-2">No Saved Recipes Yet</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Generate a recipe and save it to see it here
        </p>
        <Link href="/#generator">
          <Button variant="primary">Generate Your First Recipe</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search saved recipes..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
          />
        </div>
        <Dropdown
          options={FILTER_OPTIONS}
          value={filter}
          onChange={setFilter}
          className="sm:w-48"
        />
        <Dropdown
          options={SORT_OPTIONS}
          value={sort}
          onChange={setSort}
          className="sm:w-48"
        />
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-4">
        {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'}
      </p>

      {/* Grid */}
      {filteredRecipes.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRecipes.map((saved) => (
            <RecipeCardSmall key={saved.id} recipe={saved.recipe} savedAt={saved.created_at} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No recipes match your search</p>
        </div>
      )}
    </div>
  );
}
