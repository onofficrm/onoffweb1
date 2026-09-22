import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'underline' | 'pills' | 'enclosed';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'underline',
  className = '',
}) => {
  if (variant === 'pills') {
    return (
      <div className={`flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-xl ${className}`}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer select-none ${
                isActive
                  ? 'bg-[#102B50] text-white shadow-sm'
                  : 'text-slate-600 hover:text-[#102B50] hover:bg-white/60'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === 'enclosed') {
    return (
      <div className={`flex border-b border-slate-200 gap-1 ${className}`}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-t-lg transition-colors cursor-pointer border-t border-l border-r -mb-[1px] ${
                isActive
                  ? 'bg-white border-slate-200 text-[#102B50]'
                  : 'bg-slate-50 border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // default 'underline'
  return (
    <div className={`flex border-b border-slate-200 overflow-x-auto scrollbar-none ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-all border-b-2 whitespace-nowrap cursor-pointer select-none ${
              isActive
                ? 'border-[#2563EB] text-[#2563EB]'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
