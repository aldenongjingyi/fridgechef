'use client';

import Button from '@/components/ui/Button';
import { Sparkles, BookmarkCheck, ChefHat } from 'lucide-react';
import Link from 'next/link';

interface WelcomeHeaderProps {
  name: string;
  savedCount: number;
  generatedCount: number;
}

export default function WelcomeHeader({ name, savedCount, generatedCount }: WelcomeHeaderProps) {
  return (
    <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading">
            Welcome back, <span className="gradient-brand-text">{name}</span>!
          </h1>
          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ChefHat className="w-4 h-4 text-brand-orange" />
              {generatedCount} recipes generated
            </span>
            <span className="flex items-center gap-1.5">
              <BookmarkCheck className="w-4 h-4 text-brand-orange" />
              {savedCount} saved
            </span>
          </div>
        </div>
        <Link href="/#generator">
          <Button variant="primary" size="lg">
            <Sparkles className="w-5 h-5" />
            Generate New Recipe
          </Button>
        </Link>
      </div>
    </div>
  );
}
