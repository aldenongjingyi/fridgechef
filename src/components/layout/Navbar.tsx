'use client';

import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Menu, X, ChefHat, User, LogOut } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/stores/auth';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut, setAuthModal } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <ChefHat className="w-8 h-8 text-brand-orange" />
            <span className="text-xl font-bold font-heading">
              <span className="gradient-brand-text">FridgeChef</span>
              <span className="text-brand-orange ml-1 text-sm font-normal">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link href="/#recipes" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Recipes
            </Link>
            {user ? (
              <div className="flex items-center gap-3">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">
                    <User className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => setAuthModal('login')}>
                  Log In
                </Button>
                <Button variant="primary" size="sm" onClick={() => setAuthModal('signup')}>
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <div className="px-4 py-4 space-y-3">
            <Link href="/#how-it-works" className="block text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>
              How It Works
            </Link>
            <Link href="/#recipes" className="block text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>
              Recipes
            </Link>
            {user ? (
              <>
                <Link href="/dashboard" className="block" onClick={() => setMobileOpen(false)}>
                  <Button variant="secondary" size="sm" className="w-full">Dashboard</Button>
                </Link>
                <Button variant="ghost" size="sm" className="w-full" onClick={() => { signOut(); setMobileOpen(false); }}>
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="secondary" size="sm" className="w-full" onClick={() => { setAuthModal('login'); setMobileOpen(false); }}>
                  Log In
                </Button>
                <Button variant="primary" size="sm" className="w-full" onClick={() => { setAuthModal('signup'); setMobileOpen(false); }}>
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
