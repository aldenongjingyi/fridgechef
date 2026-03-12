import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const { recipe_id, rating } = await request.json();

  if (!recipe_id || !rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Valid recipe_id and rating (1-5) are required' }, { status: 400 });
  }

  const { error } = await supabase
    .from('ratings')
    .upsert(
      { user_id: user.id, recipe_id, rating },
      { onConflict: 'user_id,recipe_id' }
    );

  if (error) {
    return NextResponse.json({ error: 'Failed to rate recipe' }, { status: 500 });
  }

  const { data: recipe } = await supabase
    .from('recipes')
    .select('average_rating, rating_count')
    .eq('id', recipe_id)
    .single();

  return NextResponse.json({
    average_rating: recipe?.average_rating ?? 0,
    rating_count: recipe?.rating_count ?? 0,
  });
}
