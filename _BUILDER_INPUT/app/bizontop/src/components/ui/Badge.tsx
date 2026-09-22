import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'sub' | 'accent' | 'success' | 'warning' | 'neutral' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold',
  };

  const variantClasses = {
    primary: 'bg-[#102B50] text-white',
    sub: 'bg-blue-50 text-[#2563EB] border border-blue-100',
    accent: 'bg-[#D5A64B]/15 text-[#8F6A1E] border border-[#D5A64B]/30',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
    outline: 'border border-slate-300 text-slate-700 bg-transparent',
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-md tracking-tight select-none whitespace-nowrap ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
