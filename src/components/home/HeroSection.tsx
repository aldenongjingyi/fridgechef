'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import HeroCarousel from './HeroCarousel';
import FloatingBadges from './FloatingBadges';
import { Sparkles, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const scrollToGenerator = () => {
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-red-50" />

      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-brand-orange/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange/10 rounded-full text-brand-orange text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              AI-Powered Recipe Generation
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading leading-tight">
              Turn Your{' '}
              <span className="gradient-brand-text">Ingredients</span>{' '}
              Into Delicious Meals
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg">
              Simply tell us what&apos;s in your fridge, and our AI chef will create a
              personalised recipe in seconds. Reduce waste, save money, and discover
              amazing new dishes.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="primary" size="lg" onClick={scrollToGenerator}>
                <Sparkles className="w-5 h-5" />
                Generate a Recipe
              </Button>
              <Button variant="secondary" size="lg" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
                How It Works
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">✅ Free to use</span>
              <span className="flex items-center gap-1.5">✅ No sign-up required</span>
              <span className="flex items-center gap-1.5">✅ UK focused</span>
            </div>
          </motion.div>

          {/* Right column - Carousel + floating badges */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <HeroCarousel />
            <FloatingBadges />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  );
}
