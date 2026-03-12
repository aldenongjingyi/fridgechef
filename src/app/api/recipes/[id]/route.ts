import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: recipe, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !recipe) {
    return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
  }

  // Check if current user has saved this recipe
  const { data: { user } } = await supabase.auth.getUser();
  let isSaved = false;
  let userRating = null;

  if (user) {
    const { data: saved } = await supabase
      .from('saved_recipes')
      .select('id')
      .eq('user_id', user.id)
      .eq('recipe_id', id)
      .single();
    isSaved = !!saved;

    const { data: rating } = await supabase
      .from('ratings')
      .select('rating')
      .eq('user_id', user.id)
      .eq('recipe_id', id)
      .single();
    userRating = rating?.rating ?? null;
  }

  return NextResponse.json({ recipe, isSaved, userRating });
}
