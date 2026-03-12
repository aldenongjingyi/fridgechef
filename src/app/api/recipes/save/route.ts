import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const { recipe_id, action } = await request.json();

  if (!recipe_id) {
    return NextResponse.json({ error: 'recipe_id is required' }, { status: 400 });
  }

  if (action === 'unsave') {
    const { error } = await supabase
      .from('saved_recipes')
      .delete()
      .eq('user_id', user.id)
      .eq('recipe_id', recipe_id);

    if (error) {
      return NextResponse.json({ error: 'Failed to unsave recipe' }, { status: 500 });
    }
    return NextResponse.json({ saved: false });
  }

  const { error } = await supabase
    .from('saved_recipes')
    .insert({ user_id: user.id, recipe_id });

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ saved: true });
    }
    return NextResponse.json({ error: 'Failed to save recipe' }, { status: 500 });
  }

  return NextResponse.json({ saved: true });
}
