import { ChefHat } from 'lucide-react';

interface ChefTipsProps {
  tips: string[];
}

export default function ChefTips({ tips }: ChefTipsProps) {
  return (
    <div className="mt-8 bg-gradient-to-br from-brand-orange/5 to-brand-red/5 rounded-2xl border border-brand-orange/20 p-6">
      <div className="flex items-center gap-2 mb-4">
        <ChefHat className="w-5 h-5 text-brand-orange" />
        <h2 className="text-lg font-bold font-heading">Chef&apos;s Tips</h2>
      </div>
      <ul className="space-y-3">
        {tips.map((tip, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm">
            <span className="text-brand-orange font-bold mt-0.5">#{idx + 1}</span>
            <span className="text-muted-foreground">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
