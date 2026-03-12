import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="text-center space-y-6 px-4">
        <div className="text-8xl">🍳</div>
        <h1 className="text-4xl font-bold font-heading">404</h1>
        <p className="text-lg text-muted-foreground max-w-md">
          Oops! This recipe seems to have gone missing from the kitchen.
        </p>
        <Link href="/">
          <Button variant="primary" size="lg">
            <Home className="w-5 h-5" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
