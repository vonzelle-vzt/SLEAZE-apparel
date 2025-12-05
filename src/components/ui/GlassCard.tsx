import { ReactNode } from 'react';

type GlassVariant = 'default' | 'light' | 'red';

interface GlassCardProps {
  children: ReactNode;
  variant?: GlassVariant;
  className?: string;
}

const variants: Record<GlassVariant, string> = {
  default: 'glass',
  light: 'glass-light',
  red: 'glass-red',
};

export function GlassCard({ children, variant = 'default', className = '' }: GlassCardProps) {
  return (
    <div className={`${variants[variant]} rounded-lg p-6 ${className}`}>
      {children}
    </div>
  );
}

