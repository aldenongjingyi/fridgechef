import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import RecipeView from '@/components/recipe/RecipeView';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data: recipe } = await supabase.from('recipes').select('title, description').eq('id', id).single();

  if (!recipe) return { title: 'Recipe Not Found' };

  return {
    title: `${recipe.title} — Cheffy`,
    description: recipe.description,
  };
}

export default async function RecipePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: recipe, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !recipe) {
    notFound();
  }

  return <RecipeView recipe={recipe} />;
}
