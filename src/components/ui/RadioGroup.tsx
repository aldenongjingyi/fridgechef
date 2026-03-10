'use client';

import { cn } from '@/lib/utils';

interface RadioOption {
  value: string | number;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  label?: string;
  options: RadioOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  className?: string;
}

export default function RadioGroup({ label, options, value, onChange, className }: RadioGroupProps) {
  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">{label}</label>
      )}
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              'flex flex-col items-center px-4 py-2.5 rounded-xl border-2 transition-all duration-200 text-sm',
              value === option.value
                ? 'border-brand-orange bg-brand-orange/5 text-brand-orange'
                : 'border-border hover:border-brand-orange/30 text-muted-foreground'
            )}
          >
            <span className="font-medium">{option.label}</span>
            {option.description && (
              <span className="text-xs mt-0.5 opacity-70">{option.description}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
