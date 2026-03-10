import type { RecipeInstruction } from '@/types';
import { cn } from '@/lib/utils';
import { Clock, Lightbulb } from 'lucide-react';

interface InstructionStepsProps {
  instructions: RecipeInstruction[];
}

export default function InstructionSteps({ instructions }: InstructionStepsProps) {
  return (
    <div className="bg-white rounded-2xl border border-border p-6">
      <h2 className="text-lg font-bold font-heading mb-6">Instructions</h2>
      <div className="space-y-0">
        {instructions.map((step, idx) => (
          <div key={step.step} className="relative flex gap-4">
            {/* Timeline connector */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center text-white text-sm font-bold shrink-0">
                {step.step}
              </div>
              {idx < instructions.length - 1 && (
                <div className="w-0.5 flex-1 bg-gradient-to-b from-brand-orange/30 to-transparent min-h-[20px]" />
              )}
            </div>

            {/* Content */}
            <div className="pb-8 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-sm">{step.title}</h3>
                {step.time_minutes && (
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    <Clock className="w-3 h-3" />
                    {step.time_minutes} min
                  </span>
                )}
              </div>
              <p
                className="text-sm text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: step.description.replace(
                    /\*\*(.*?)\*\*/g,
                    '<strong class="text-foreground">$1</strong>'
                  ),
                }}
              />
              {step.tip && (
                <div className="mt-2 flex items-start gap-2 p-2.5 bg-amber-50 rounded-lg text-xs text-amber-800">
                  <Lightbulb className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  {step.tip}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
