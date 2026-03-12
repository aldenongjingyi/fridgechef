'use client';

import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-gradient-to-r from-brand-orange to-brand-red text-white hover:from-brand-orange-dark hover:to-brand-red-dark hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0': variant === 'primary',
            'bg-white text-foreground border border-border hover:bg-muted': variant === 'secondary',
            'bg-transparent text-foreground hover:bg-muted': variant === 'ghost',
            'border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white': variant === 'outline',
            'bg-red-500 text-white hover:bg-red-600': variant === 'danger',
          },
          {
            'text-sm px-3 py-1.5 gap-1.5': size === 'sm',
            'text-sm px-5 py-2.5 gap-2': size === 'md',
            'text-base px-8 py-3.5 gap-2.5': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
