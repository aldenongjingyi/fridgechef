'use client';

import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface DropdownProps {
  label?: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function Dropdown({
  label,
  options,
  value,
  onChange,
  className,
}: DropdownProps) {
  return (
    <div className={cn('w-full', className)}>
      {label && <Label className="mb-1.5 block">{label}</Label>}
      <Select value={value} onValueChange={(val) => { if (val !== null) onChange(val); }}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
