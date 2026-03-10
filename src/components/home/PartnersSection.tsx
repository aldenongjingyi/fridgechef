'use client';

import { motion } from 'framer-motion';
import { MEAL_KIT_PARTNERS, SUPERMARKET_PARTNERS } from '@/lib/constants';

export default function PartnersSection() {
  return (
    <section id="partners" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-heading">
            Our <span className="gradient-brand-text">Partners</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Order ingredients or meal kits from top UK brands
          </p>
        </motion.div>

        {/* Meal Kit Partners */}
        <div className="mb-10">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider text-center mb-6">
            Meal Kit Partners
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {MEAL_KIT_PARTNERS.map((partner, idx) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-xl p-6 text-center border border-border hover:shadow-md transition-shadow"
              >
                <span className="text-4xl block mb-2">{partner.logo}</span>
                <h4 className="font-semibold text-sm">{partner.name}</h4>
                <p className="text-xs text-brand-orange font-medium mt-1">{partner.discount}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Supermarket Partners */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider text-center mb-6">
            Supermarket Partners
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SUPERMARKET_PARTNERS.map((partner, idx) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-xl p-6 text-center border border-border hover:shadow-md transition-shadow"
              >
                <span className="text-4xl block mb-2">{partner.logo}</span>
                <h4 className="font-semibold text-sm">{partner.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{partner.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
