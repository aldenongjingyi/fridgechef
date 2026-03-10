'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FOOD_IMAGES = [
  { emoji: '🍝', title: 'Creamy Garlic Pasta', bg: 'from-amber-100 to-orange-100' },
  { emoji: '🍛', title: 'Thai Green Curry', bg: 'from-green-100 to-emerald-100' },
  { emoji: '🥗', title: 'Mediterranean Bowl', bg: 'from-teal-100 to-cyan-100' },
  { emoji: '🍔', title: 'Classic Beef Burger', bg: 'from-red-100 to-orange-100' },
  { emoji: '🍜', title: 'Japanese Ramen', bg: 'from-yellow-100 to-amber-100' },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % FOOD_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 bg-gradient-to-br ${FOOD_IMAGES[current].bg} flex flex-col items-center justify-center`}
          >
            <span className="text-8xl sm:text-9xl">{FOOD_IMAGES[current].emoji}</span>
            <p className="mt-4 text-lg font-semibold text-foreground/80 font-heading">
              {FOOD_IMAGES[current].title}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots indicator */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {FOOD_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === current ? 'bg-brand-orange w-6' : 'bg-brand-orange/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
