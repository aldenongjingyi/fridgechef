'use client';

import { useRecipeGenerator } from '@/hooks/useRecipeGenerator';
import IngredientInput from './IngredientInput';
import Dropdown from '@/components/ui/Dropdown';
import RadioGroup from '@/components/ui/RadioGroup';
import Button from '@/components/ui/Button';
import { DIETARY_OPTIONS, CUISINE_OPTIONS, COOKING_TIME_OPTIONS, SKILL_LEVEL_OPTIONS } from '@/lib/constants';
import { Sparkles, AlertCircle, ChefHat, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RecipeGenerator() {
  const {
    ingredients,
    dietaryPreference,
    cuisineType,
    cookingTime,
    skillLevel,
    isGenerating,
    error,
    addIngredient,
    removeIngredient,
    setDietaryPreference,
    setCuisineType,
    setCookingTime,
    setSkillLevel,
    generate,
    canGenerate,
  } = useRecipeGenerator();

  return (
    <div id="generator" className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl ring-1 ring-white/50 border border-border p-6 sm:p-8 space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 rounded-full text-brand-orange text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            AI-Powered
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading">
            What&apos;s in Your Fridge?
          </h2>
          <p className="text-muted-foreground text-sm opacity-70">
            Add your ingredients and let AI create the perfect recipe
          </p>
        </div>

        {/* Ingredients */}
        <IngredientInput
          ingredients={ingredients}
          onAdd={addIngredient}
          onRemove={removeIngredient}
        />

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Dropdown
            label="Dietary Preference"
            options={DIETARY_OPTIONS}
            value={dietaryPreference}
            onChange={setDietaryPreference}
          />
          <Dropdown
            label="Cuisine Type"
            options={CUISINE_OPTIONS}
            value={cuisineType}
            onChange={setCuisineType}
          />
        </div>

        <RadioGroup
          label="Cooking Time"
          options={COOKING_TIME_OPTIONS}
          value={cookingTime}
          onChange={(v) => setCookingTime(v as number)}
        />

        <RadioGroup
          label="Skill Level"
          options={SKILL_LEVEL_OPTIONS}
          value={skillLevel}
          onChange={(v) => setSkillLevel(v as string)}
        />

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-xl text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        {/* Generate Button */}
        <Button
          variant="primary"
          size="lg"
          className="w-full text-base"
          onClick={generate}
          disabled={!canGenerate}
          isLoading={isGenerating}
        >
          {isGenerating ? (
            <>
              <ChefHat className="w-5 h-5 animate-bounce" />
              Cooking Up Your Recipe...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Recipe
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>

        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-2"
          >
            <div className="flex justify-center gap-1">
              {['\u{1F955}', '\u{1F373}', '\u{1F9D1}\u200D\u{1F373}', '\u2728', '\u{1F37D}\uFE0F'].map((emoji, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 0.6, delay: i * 0.1, repeat: Infinity }}
                  className="text-2xl"
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground opacity-50">
              Our AI chef is creating something delicious...
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
