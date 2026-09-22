import React from 'react';
import { AlertCircle, CheckCircle2, Info, X, XCircle } from 'lucide-react';

export interface AlertProps {
  type?: 'success' | 'info' | 'warning' | 'error';
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  message,
  onClose,
  className = '',
}) => {
  const configs = {
    success: {
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />,
    },
    info: {
      bg: 'bg-blue-50 border-blue-200 text-blue-900',
      icon: <Info className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />,
    },
    warning: {
      bg: 'bg-amber-50 border-amber-200 text-amber-900',
      icon: <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />,
    },
    error: {
      bg: 'bg-red-50 border-red-200 text-red-900',
      icon: <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />,
    },
  };

  const current = configs[type];

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-xl border ${current.bg} ${className}`}
      role="alert"
    >
      {current.icon}
      <div className="flex-1 text-sm">
        {title && <h5 className="font-bold mb-0.5">{title}</h5>}
        <p className="leading-relaxed">{message}</p>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
          aria-label="닫기"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
