'use client';

import { motion } from 'framer-motion';
import { Star, Users, ChefHat, Leaf } from 'lucide-react';
import StarRating from '@/components/ui/StarRating';

const REVIEWS = [
  {
    name: 'Sarah M.',
    location: 'London',
    text: 'Absolutely brilliant! I had random veg in my fridge and Cheffy made the most amazing stir-fry recipe. My family loved it.',
    rating: 5,
  },
  {
    name: 'James K.',
    location: 'Manchester',
    text: 'As a uni student, this is a lifesaver. No more wasting food or eating the same boring meals every week.',
    rating: 5,
  },
  {
    name: 'Priya S.',
    location: 'Birmingham',
    text: 'The dietary filters are spot on. Being vegetarian, I always struggled for ideas. Now I get creative recipes in seconds.',
    rating: 4,
  },
];

const STATS = [
  { icon: ChefHat, value: '10,000+', label: 'Recipes Generated' },
  { icon: Users, value: '5,000+', label: 'Happy Cooks' },
  { icon: Star, value: '4.8', label: 'Average Rating' },
  { icon: Leaf, value: '2 tonnes', label: 'Food Waste Saved' },
];

export default function SocialProofSection() {
  return (
    <section className="py-20 bg-white section-angle-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <stat.icon className="w-8 h-8 text-brand-orange mx-auto mb-2" />
              <p className="text-2xl sm:text-3xl font-heading gradient-brand-text">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground mt-1 opacity-50">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-heading">
            What Our <span className="gradient-brand-text">Users Say</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gradient-to-br from-muted to-white rounded-2xl p-6 space-y-3 shadow-inner"
            >
              <StarRating rating={review.rating} size="sm" />
              <p className="text-sm text-muted-foreground leading-relaxed opacity-70">&ldquo;{review.text}&rdquo;</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center text-white text-xs font-bold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{review.name}</p>
                  <p className="text-xs text-muted-foreground opacity-40">{review.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
