'use client';

import { motion } from 'framer-motion';

const BADGES = [
  { emoji: '🥕', label: 'Carrots', top: '5%', left: '-5%', delay: 0 },
  { emoji: '🧄', label: 'Garlic', top: '15%', right: '-8%', delay: 0.5 },
  { emoji: '🍋', label: 'Lemon', bottom: '20%', left: '-10%', delay: 1 },
  { emoji: '🌿', label: 'Herbs', bottom: '10%', right: '-5%', delay: 1.5 },
  { emoji: '🧅', label: 'Onion', top: '45%', left: '-12%', delay: 0.8 },
];

export default function FloatingBadges() {
  return (
    <>
      {BADGES.map((badge) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + badge.delay, type: 'spring' }}
          className="absolute hidden lg:flex"
          style={{
            top: badge.top,
            left: badge.left,
            right: badge.right,
            bottom: badge.bottom,
          }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: badge.delay }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full shadow-lg border border-border text-sm font-medium"
          >
            <span>{badge.emoji}</span>
            <span className="text-xs">{badge.label}</span>
          </motion.div>
        </motion.div>
      ))}
    </>
  );
}
