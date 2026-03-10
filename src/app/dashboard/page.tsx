'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import WelcomeHeader from '@/components/dashboard/WelcomeHeader';
import SavedRecipesGrid from '@/components/dashboard/SavedRecipesGrid';
import DashboardLoading from './loading';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [savedRecipes, setSavedRecipes] = useState<any[]>([]);
  const [generatedCount, setGeneratedCount] = useState(0);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/?auth=login');
      return;
    }

    if (!user) return;

    async function fetchData() {
      const supabase = createClient();

      const [profileRes, savedRes, countRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user!.id).single(),
        supabase
          .from('saved_recipes')
          .select('*, recipe:recipes(*)')
          .eq('user_id', user!.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('recipes')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user!.id),
      ]);

      setProfile(profileRes.data);
      setSavedRecipes(savedRes.data ?? []);
      setGeneratedCount(countRes.count ?? 0);
      setLoading(false);
    }

    fetchData();
  }, [user, authLoading, router]);

  if (authLoading || loading) return <DashboardLoading />;

  return (
    <div className="min-h-screen bg-muted pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WelcomeHeader
          name={profile?.full_name || user?.email?.split('@')[0] || 'Chef'}
          savedCount={savedRecipes.length}
          generatedCount={generatedCount}
        />
        <SavedRecipesGrid recipes={savedRecipes} />
      </div>
    </div>
  );
}
