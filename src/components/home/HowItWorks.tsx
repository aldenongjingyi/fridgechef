'use client';

import { motion } from 'framer-motion';
import { Search, Sparkles, UtensilsCrossed, ChevronRight } from 'lucide-react';

const STEPS = [
  {
    icon: Search,
    number: '01',
    title: 'Add Your Ingredients',
    description: 'Tell us what you have in your fridge, cupboard, or pantry. Just type and select.',
    color: 'bg-orange-100 text-brand-orange',
  },
  {
    icon: Sparkles,
    number: '02',
    title: 'AI Creates Your Recipe',
    description: 'Our AI chef analyses your ingredients and generates a personalised, step-by-step recipe.',
    color: 'bg-red-100 text-brand-red',
  },
  {
    icon: UtensilsCrossed,
    number: '03',
    title: 'Cook & Enjoy',
    description: 'Follow the clear instructions, check off ingredients, and enjoy your delicious homemade meal.',
    color: 'bg-amber-100 text-amber-600',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-heading">
            How It <span className="gradient-brand-text">Works</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto opacity-70">
            Three simple steps to transform your ingredients into delicious meals
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Chevron connectors between steps (hidden on mobile) */}
          <div className="hidden md:flex absolute top-10 left-1/3 -translate-x-1/2 items-center justify-center text-brand-orange/30">
            <ChevronRight className="w-8 h-8" />
          </div>
          <div className="hidden md:flex absolute top-10 left-2/3 -translate-x-1/2 items-center justify-center text-brand-orange/30">
            <ChevronRight className="w-8 h-8" />
          </div>

          {STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="text-center space-y-4"
            >
              <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mx-auto`}>
                <step.icon className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold text-brand-orange uppercase tracking-widest opacity-50">
                Step {step.number}
              </span>
              <h3 className="text-xl font-bold font-heading">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto opacity-70">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
