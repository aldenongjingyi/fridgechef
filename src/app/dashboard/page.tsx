import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import WelcomeHeader from '@/components/dashboard/WelcomeHeader';
import SavedRecipesGrid from '@/components/dashboard/SavedRecipesGrid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard — Cheffy',
  description: 'View and manage your saved recipes',
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/?auth=login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: savedRecipes } = await supabase
    .from('saved_recipes')
    .select('*, recipe:recipes(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const { count: generatedCount } = await supabase
    .from('recipes')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id);

  return (
    <div className="min-h-screen bg-muted pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WelcomeHeader
          name={profile?.full_name || user.email?.split('@')[0] || 'Chef'}
          savedCount={savedRecipes?.length ?? 0}
          generatedCount={generatedCount ?? 0}
        />
        <SavedRecipesGrid recipes={savedRecipes ?? []} />
      </div>
    </div>
  );
}
