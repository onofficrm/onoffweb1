import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  if (totalPages <= 1) return null;

  const pages: number[] = [];
  const maxButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let endPage = startPage + maxButtons - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav className={`flex items-center justify-center gap-1 ${className}`} aria-label="페이지 이동">
      <button
        type="button"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="p-2 text-slate-500 hover:text-[#102B50] hover:bg-slate-100 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed"
        aria-label="첫 페이지"
      >
        <ChevronsLeft className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 text-slate-500 hover:text-[#102B50] hover:bg-slate-100 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed"
        aria-label="이전 페이지"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((p) => {
        const isCurrent = p === currentPage;
        return (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={`min-w-9 h-9 px-3 flex items-center justify-center text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              isCurrent
                ? 'bg-[#102B50] text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
            aria-current={isCurrent ? 'page' : undefined}
          >
            {p}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 text-slate-500 hover:text-[#102B50] hover:bg-slate-100 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed"
        aria-label="다음 페이지"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="p-2 text-slate-500 hover:text-[#102B50] hover:bg-slate-100 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed"
        aria-label="마지막 페이지"
      >
        <ChevronsRight className="w-4 h-4" />
      </button>
    </nav>
  );
};
