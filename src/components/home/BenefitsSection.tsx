'use client';

import { motion } from 'framer-motion';
import { Leaf, PiggyBank, BookOpen, Lightbulb } from 'lucide-react';

const BENEFITS = [
  {
    icon: Leaf,
    title: 'Reduce Food Waste',
    description: 'Use up ingredients before they expire. Our AI helps you make the most of what you already have.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: PiggyBank,
    title: 'Save Money',
    description: 'Stop buying ingredients you don\'t need. Cook with what\'s available and cut your food bill.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: BookOpen,
    title: 'Learn Techniques',
    description: 'Each recipe includes professional tips and techniques to improve your cooking skills.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Lightbulb,
    title: 'Discover New Ideas',
    description: 'Break out of your recipe rut. AI generates creative combinations you\'d never think of.',
    gradient: 'from-amber-500 to-orange-500',
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-heading">
            Why Use <span className="gradient-brand-text">FridgeChef AI</span>?
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            More than just recipes — it&apos;s a smarter way to cook
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((benefit, idx) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-4`}>
                <benefit.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold font-heading mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
