import React, { useState } from 'react';
import { ArrowRight, Check, HelpCircle, Sparkles } from 'lucide-react';
import { SituationCardItem } from '../types';

interface SituationCardsSectionProps {
  onSelectSituation: (situationTitle: string) => void;
}

const SITUATIONS: SituationCardItem[] = [
  {
    id: 'sit-01',
    number: '01',
    title: '처음 사업을 시작합니다',
    description: '개인사업자로 시작해야 할지,\n법인으로 시작해야 할지 고민하고 있어요.',
    tag: '신규 창업'
  },
  {
    id: 'sit-02',
    number: '02',
    title: '개인사업자를 운영 중입니다',
    description: '사업 규모가 커지면서\n법인전환 시점을 고민하고 있어요.',
    tag: '법인 전환'
  },
  {
    id: 'sit-03',
    number: '03',
    title: '공동창업을 준비합니다',
    description: '대표자와 주주,\n지분을 어떻게 정해야 할지 모르겠어요.',
    tag: '지분 설계'
  },
  {
    id: 'sit-04',
    number: '04',
    title: '투자유치를 준비합니다',
    description: '향후 투자를 고려해\n법인설립과 지분 구조를 준비하려고 합니다.',
    tag: '투자 대비'
  },
  {
    id: 'sit-05',
    number: '05',
    title: '정책자금이 필요합니다',
    description: '법인설립 이후 활용할 수 있는\n기업지원제도가 궁금합니다.',
    tag: '자금 연계'
  },
  {
    id: 'sit-06',
    number: '06',
    title: '이미 법인을 운영하고 있습니다',
    description: '벤처기업, 연구소, 기업인증,\n정책자금 등을 준비하고 싶습니다.',
    tag: '기업 성장'
  }
];

export const SituationCardsSection: React.FC<SituationCardsSectionProps> = ({
  onSelectSituation,
}) => {
  const [selectedId, setSelectedId] = useState<string>('sit-01');

  const selectedSituation = SITUATIONS.find((s) => s.id === selectedId) || SITUATIONS[0];

  const handleCardClick = (item: SituationCardItem) => {
    setSelectedId(item.id);
  };

  const handleCtaClick = () => {
    onSelectSituation(selectedSituation.title);
  };

  return (
    <section
      id="situation-section"
      className="py-16 sm:py-20 bg-white border-b border-slate-100"
      aria-label="상황별 법인설립 고민 확인"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 text-[#2563EB] border border-blue-100 mb-3.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>IS THIS YOUR SITUATION?</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#0B1F3A] tracking-tight leading-tight">
            혹시 이런 고민 때문에 <br className="hidden sm:inline" />
            법인설립을 알아보고 계신가요?
          </h2>

          <p className="mt-3.5 text-base sm:text-[17px] text-slate-600 font-normal leading-relaxed">
            사업을 처음 시작하는 경우부터 개인사업자의 법인전환, 공동창업, 투자유치까지
            현재 상황에 따라 준비해야 할 내용이 달라집니다.
          </p>
        </div>

        {/* 6 Situation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SITUATIONS.map((item) => {
            const isSelected = selectedId === item.id;

            return (
              <div
                key={item.id}
                id={`situation-card-${item.number}`}
                onClick={() => handleCardClick(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(item);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-pressed={isSelected}
                aria-label={`${item.number}번: ${item.title}`}
                className={`relative bg-[#F7F9FC] p-6 sm:p-7 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between select-none hover:-translate-y-1 hover:shadow-md ${
                  isSelected
                    ? 'border-[#2563EB] bg-white ring-2 ring-[#2563EB]/20 shadow-md -translate-y-0.5'
                    : 'border-slate-200 hover:border-[#2563EB] hover:bg-white'
                }`}
              >
                <div>
                  {/* Top: Number Badge and Category Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-md transition-colors ${
                        isSelected
                          ? 'bg-[#2563EB] text-white'
                          : 'bg-white text-slate-500 border border-slate-200'
                      }`}
                    >
                      {item.number}
                    </span>

                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100/80 px-2 py-0.5 rounded-sm">
                      {item.tag}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3 className="text-lg sm:text-[19px] font-bold text-[#0B1F3A] mb-2.5 tracking-tight">
                    {item.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-sm sm:text-[15px] text-slate-600 font-normal leading-relaxed whitespace-pre-line">
                    {item.description}
                  </p>
                </div>

                {/* Bottom hint of selectability */}
                <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold">
                  <span
                    className={`transition-colors ${
                      isSelected ? 'text-[#2563EB]' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  >
                    {isSelected ? '선택된 상황입니다' : '클릭하여 선택'}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#2563EB] text-white shadow-2xs'
                        : 'border border-slate-300 text-transparent'
                    }`}
                  >
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Single Unified CTA under all 6 cards */}
        <div className="mt-10 sm:mt-12 text-center">
          <button
            type="button"
            id="situation-unified-cta"
            onClick={handleCtaClick}
            className="inline-flex items-center justify-center gap-2.5 bg-[#0B1F3A] hover:bg-[#142d50] active:bg-[#071426] text-white font-bold text-base sm:text-[17px] px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 group focus:outline-hidden focus:ring-2 focus:ring-[#0B1F3A]/40"
          >
            <span>내 상황에 맞는 방법 확인하기</span>
            <ArrowRight className="w-4 h-4 text-[#F4A62A] group-hover:translate-x-1.5 transition-transform duration-200" />
          </button>
          
          <p className="mt-3 text-xs sm:text-sm text-slate-500 font-medium">
            현재 선택: <strong className="text-[#2563EB]">[{selectedSituation.title}]</strong>에 맞춘 최적의 가이드를 제공합니다.
          </p>
        </div>

      </div>
    </section>
  );
};
