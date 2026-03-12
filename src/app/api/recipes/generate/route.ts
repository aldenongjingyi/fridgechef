import { NextRequest, NextResponse } from 'next/server';
import { getGeminiClient } from '@/lib/ai/claude';
import { RecipeOutputSchema } from '@/lib/ai/recipe-schema';
import { buildSystemPrompt, buildUserPrompt } from '@/lib/ai/recipe-prompt';
import { rateLimit } from '@/lib/rate-limit';
import { createClient } from '@/lib/supabase/server';
import type { GenerateRecipeInput } from '@/types';

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? '127.0.0.1';
  const { success, remaining } = rateLimit(ip);

  if (!success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      { status: 429, headers: { 'X-RateLimit-Remaining': '0' } }
    );
  }

  try {
    const body: GenerateRecipeInput = await request.json();

    // Validate input
    if (!body.ingredients || body.ingredients.length === 0) {
      return NextResponse.json({ error: 'At least one ingredient is required' }, { status: 400 });
    }
    if (body.ingredients.length > 10) {
      return NextResponse.json({ error: 'Maximum 10 ingredients allowed' }, { status: 400 });
    }

    const genAI = getGeminiClient();
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash-lite',
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    const prompt = `${buildSystemPrompt()}\n\n${buildUserPrompt(body)}`;
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Parse the JSON response
    let recipeData;
    try {
      const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
      const jsonStr = jsonMatch ? jsonMatch[1].trim() : text.trim();
      recipeData = RecipeOutputSchema.parse(JSON.parse(jsonStr));
    } catch {
      try {
        recipeData = RecipeOutputSchema.parse(JSON.parse(text));
      } catch {
        return NextResponse.json({ error: 'Failed to parse recipe output' }, { status: 500 });
      }
    }

    // Get current user (optional - anonymous generation allowed)
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Store in database
    const { data: recipe, error: dbError } = await supabase
      .from('recipes')
      .insert({
        user_id: user?.id ?? null,
        title: recipeData.title,
        description: recipeData.description,
        ingredients_input: body.ingredients,
        dietary_preference: body.dietary_preference ?? null,
        cuisine_type: body.cuisine_type ?? null,
        cooking_time: recipeData.total_time,
        skill_level: recipeData.skill_level,
        servings: recipeData.servings,
        prep_time: recipeData.prep_time,
        cook_time: recipeData.cook_time,
        total_time: recipeData.total_time,
        calories_per_serving: recipeData.calories_per_serving,
        ingredients: recipeData.ingredients,
        instructions: recipeData.instructions,
        chef_tips: recipeData.chef_tips,
        dietary_tags: recipeData.dietary_tags,
        allergen_warnings: recipeData.allergen_warnings,
        image_emoji: recipeData.image_emoji,
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ recipe: { ...recipeData, id: 'temp-' + Date.now() } }, {
        headers: { 'X-RateLimit-Remaining': remaining.toString() },
      });
    }

    // Increment user's recipe count if logged in
    if (user) {
      try { await supabase.rpc('increment_recipes_generated', { user_id: user.id }); } catch { /* ignore */ }
    }

    return NextResponse.json({ recipe }, {
      headers: { 'X-RateLimit-Remaining': remaining.toString() },
    });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json({ error: 'Failed to generate recipe. Please try again.' }, { status: 500 });
  }
}
