'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/stores/auth';
import { ChefHat, Mail, Lock } from 'lucide-react';
import GoogleAuthButton from './GoogleAuthButton';

interface LoginFormProps {
  onSwitch: () => void;
}

export default function LoginForm({ onSwitch }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAuthModal } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setAuthModal(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <ChefHat className="w-12 h-12 text-brand-orange mx-auto mb-3" />
        <h2 className="text-2xl font-bold font-heading">Welcome Back</h2>
        <p className="text-sm text-muted-foreground mt-1">Sign in to save and manage your recipes</p>
      </div>

      <GoogleAuthButton />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-2 bg-white text-muted-foreground">or continue with email</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            required
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10"
            required
          />
        </div>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={loading}>
          Sign In
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <button onClick={onSwitch} className="text-brand-orange font-medium hover:underline">
          Sign up
        </button>
      </p>
    </div>
  );
}
