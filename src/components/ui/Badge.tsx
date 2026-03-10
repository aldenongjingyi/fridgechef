import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'brand';
  className?: string;
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        {
          'bg-muted text-muted-foreground': variant === 'default',
          'bg-green-100 text-green-800': variant === 'success',
          'bg-amber-100 text-amber-800': variant === 'warning',
          'bg-brand-orange/10 text-brand-orange': variant === 'brand',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
