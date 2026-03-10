'use client';

import { motion } from 'framer-motion';
import { SAMPLE_RECIPES } from '@/lib/constants';
import { Clock, Users } from 'lucide-react';
import StarRating from '@/components/ui/StarRating';
import Badge from '@/components/ui/Badge';

export default function SampleRecipes() {
  return (
    <section id="recipes" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-heading">
            Sample <span className="gradient-brand-text">Recipes</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Here&apos;s a taste of what our AI chef can create
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_RECIPES.map((recipe, idx) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 group"
            >
              {/* Card header with emoji */}
              <div className="h-40 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
                  {recipe.image_emoji}
                </span>
              </div>

              {/* Card body */}
              <div className="p-5 space-y-3">
                <h3 className="font-bold font-heading text-lg leading-tight">{recipe.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{recipe.description}</p>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {recipe.cooking_time} min
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {recipe.servings} servings
                  </span>
                </div>

                {recipe.dietary_tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {recipe.dietary_tags.map((tag) => (
                      <Badge key={tag} variant="success">{tag}</Badge>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-1">
                  <StarRating rating={Math.round(recipe.average_rating)} size="sm" />
                  <span className="text-xs text-muted-foreground">
                    {recipe.average_rating} ({recipe.rating_count})
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
