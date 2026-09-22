import React, { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  id,
  required,
  ...props
}) => {
  const inputId = id || (label ? `input-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);

  return (
    <div className="w-full text-left">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-[#172033] mb-1.5">
          {label} {required && <span className="text-red-500 font-semibold">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          required={required}
          className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-[#172033] placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] disabled:bg-slate-50 disabled:text-slate-500 ${
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-[#CBD5E1]'
          } ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''} ${className}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3.5 text-slate-400 pointer-events-none flex items-center">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      {helperText && !error && <p className="mt-1 text-xs text-slate-500">{helperText}</p>}
    </div>
  );
};

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  className = '',
  id,
  required,
  ...props
}) => {
  const textareaId = id || (label ? `textarea-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);

  return (
    <div className="w-full text-left">
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-[#172033] mb-1.5">
          {label} {required && <span className="text-red-500 font-semibold">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        required={required}
        className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-[#172033] placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] disabled:bg-slate-50 ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-[#CBD5E1]'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      {helperText && !error && <p className="mt-1 text-xs text-slate-500">{helperText}</p>}
    </div>
  );
};

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { label: string; value: string | number }[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  className = '',
  id,
  required,
  ...props
}) => {
  const selectId = id || (label ? `select-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);

  return (
    <div className="w-full text-left">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-[#172033] mb-1.5">
          {label} {required && <span className="text-red-500 font-semibold">*</span>}
        </label>
      )}
      <select
        id={selectId}
        required={required}
        className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-[#172033] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] disabled:bg-slate-50 ${
          error ? 'border-red-500 focus:border-red-500' : 'border-[#CBD5E1]'
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};
