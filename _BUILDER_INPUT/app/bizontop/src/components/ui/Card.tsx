import React, { HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = false,
  padding = 'md',
  border = true,
  className = '',
  ...props
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverStyle = hoverEffect
    ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#2563EB]/40'
    : '';

  const borderStyle = border ? 'border border-[#E2E8F0]' : '';

  return (
    <div
      className={`bg-white rounded-xl shadow-sm ${borderStyle} ${paddingStyles[padding]} ${hoverStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
