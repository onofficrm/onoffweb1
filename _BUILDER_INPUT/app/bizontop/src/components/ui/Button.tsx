import React, { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'sub' | 'accent' | 'outline' | 'ghost' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer select-none rounded-lg disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap';

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5 font-semibold',
  };

  const variantClasses = {
    // Primary #102B50
    primary: 'bg-[#102B50] hover:bg-[#0B1E38] text-white shadow-sm hover:shadow focus:ring-[#102B50]/40',
    // Sub #2563EB
    sub: 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-sm hover:shadow focus:ring-[#2563EB]/40',
    // Accent #D5A64B
    accent: 'bg-[#D5A64B] hover:bg-[#C29338] text-[#102B50] font-semibold shadow-sm hover:shadow focus:ring-[#D5A64B]/50',
    // Outline
    outline: 'border border-[#CBD5E1] hover:border-[#102B50] text-[#102B50] bg-white hover:bg-[#F8FAFC] focus:ring-[#102B50]/20',
    // Ghost
    ghost: 'text-[#4B5563] hover:text-[#102B50] hover:bg-slate-100 focus:ring-slate-300',
    // Secondary soft
    secondary: 'bg-slate-100 hover:bg-slate-200 text-[#172033] focus:ring-slate-400',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </button>
  );
};
