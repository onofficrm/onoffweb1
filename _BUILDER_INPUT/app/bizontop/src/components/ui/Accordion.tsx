import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItemProps {
  id: string | number;
  title: string;
  badge?: string;
  children: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemProps[];
  allowMultiple?: boolean;
  defaultOpenIds?: (string | number)[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenIds = [],
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<(string | number)[]>(defaultOpenIds);

  const toggleItem = (id: string | number) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div
            key={item.id}
            className={`border rounded-xl bg-white overflow-hidden transition-colors ${
              isOpen ? 'border-[#2563EB]/40 shadow-xs' : 'border-slate-200'
            }`}
          >
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-slate-50 cursor-pointer"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3 pr-4">
                {item.badge && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-[#102B50]">
                    {item.badge}
                  </span>
                )}
                <span className="font-semibold text-sm sm:text-base text-[#172033]">
                  {item.title}
                </span>
              </div>
              <div
                className={`text-slate-400 transform transition-transform duration-200 shrink-0 ${
                  isOpen ? 'rotate-180 text-[#2563EB]' : ''
                }`}
              >
                <ChevronDown className="w-5 h-5" />
              </div>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-sm text-slate-600 border-t border-slate-100 bg-[#FAFBFD] leading-relaxed">
                {item.children}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
