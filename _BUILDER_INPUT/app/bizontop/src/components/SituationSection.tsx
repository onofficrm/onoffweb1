import React, { useState } from 'react';
import { 
  Rocket, 
  TrendingUp, 
  Users2, 
  CircleDollarSign, 
  Coins, 
  Building, 
  ArrowRight,
  Check
} from 'lucide-react';

interface SituationSectionProps {
  onSelectSituation: (situationTitle: string) => void;
}

interface Situation {
  id: string;
  number: string;
  title: string;
  description: string;
  subHighlight: string;
  icon: React.ElementType;
}

export const SituationSection: React.FC<SituationSectionProps> = ({ onSelectSituation }) => {
  const [selectedId, setSelectedId] = useState<string>('01');

  const situations: Situation[] = [
    {
      id: '01',
      number: '01',
      title: '처음 사업을 시작합니다',
      description: '개인사업자로 시작해야 할지, 법인으로 시작해야 할지 고민하고 있어요.',
      subHighlight: '창업 형태 및 절세 비교',
      icon: Rocket,
    },
    {
      id: '02',
      number: '02',
      title: '개인사업자를 운영 중입니다',
      description: '사업 규모가 커지면서 법인전환 시점을 고민하고 있어요.',
      subHighlight: '소득세 절감 & 법인전환 검토',
      icon: TrendingUp,
    },
    {
      id: '03',
      number: '03',
      title: '공동창업을 준비합니다',
      description: '대표자와 주주, 지분을 어떻게 정해야 할지 모르겠어요.',
      subHighlight: '주주 구성 및 정관 특약 설계',
      icon: Users2,
    },
    {
      id: '04',
      number: '04',
      title: '투자유치를 준비합니다',
      description: '향후 투자를 고려해 법인설립과 지분 구조를 준비하려고 합니다.',
      subHighlight: '신주발행 및 스톡옵션 사전 고려',
      icon: CircleDollarSign,
    },
    {
      id: '05',
      number: '05',
      title: '정책자금이 필요합니다',
      description: '법인설립 이후 활용할 수 있는 기업지원제도가 궁금합니다.',
      subHighlight: '창업 초기 정책자금 & R&D 매칭',
      icon: Coins,
    },
    {
      id: '06',
      number: '06',
      title: '이미 법인을 운영하고 있습니다',
      description: '벤처기업, 연구소, 기업인증, 정책자금 등을 준비하고 싶습니다.',
      subHighlight: '기업인증 및 성장 스케일업',
      icon: Building,
    },
  ];

  const currentSelected = situations.find((s) => s.id === selectedId) || situations[0];

  return (
    <section
      id="incorporation"
      className="w-full bg-white py-16 sm:py-20 lg:py-24 border-b border-slate-200/80 scroll-mt-20"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div
            id="situation-eyebrow"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[12px] sm:text-[13px] font-semibold tracking-wider mb-3.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span>IS THIS YOUR SITUATION?</span>
          </div>
          <h2
            id="situation-main-title"
            className="text-[28px] sm:text-[36px] md:text-[40px] font-black text-[#0B1F3A] tracking-tight leading-[1.25] mb-4"
          >
            혹시 이런 고민 때문에
            <br />
            법인설립을 알아보고 계신가요?
          </h2>
          <p
            id="situation-description"
            className="text-[15px] sm:text-[16.5px] text-slate-600 leading-relaxed max-w-2xl mx-auto"
          >
            사업을 처음 시작하는 경우부터 개인사업자의 법인전환, 공동창업, 투자유치까지
            <br className="hidden sm:inline" />
            현재 상황에 따라 준비해야 할 내용이 달라집니다.
          </p>
        </div>

        {/* 6 Situation Cards Grid */}
        <div
          id="situation-cards-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-12"
        >
          {situations.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedId === item.id;

            return (
              <div
                key={item.id}
                id={`situation-card-${item.id}`}
                onClick={() => setSelectedId(item.id)}
                className={`group relative p-6 sm:p-7 rounded-2xl cursor-pointer transition-all duration-300 border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-50/50 border-blue-500 shadow-md shadow-blue-500/10 -translate-y-1 ring-1 ring-blue-500/30'
                    : 'bg-white hover:bg-slate-50/70 border-slate-200/90 hover:border-blue-400 hover:-translate-y-1 hover:shadow-md'
                }`}
              >
                <div>
                  {/* Top: Step Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className={`text-[13px] font-extrabold tracking-wider px-2.5 py-1 rounded-md transition-colors ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-700'
                      }`}
                    >
                      {item.number}
                    </span>
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-[#F7F9FC] text-slate-600 border border-slate-200/80 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-200'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Card Title */}
                  <h3
                    className={`text-[18px] sm:text-[19px] font-bold tracking-tight mb-2.5 transition-colors ${
                      isSelected ? 'text-[#0B1F3A]' : 'text-slate-800 group-hover:text-[#0B1F3A]'
                    }`}
                  >
                    {item.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-[14px] text-slate-600 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Subtag / Selection Indicator */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[12px] font-medium text-slate-500 group-hover:text-blue-600 transition-colors">
                    #{item.subHighlight}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-transparent group-hover:text-slate-400'
                    }`}
                  >
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Single Unified CTA for Section 1 */}
        <div className="flex flex-col items-center justify-center text-center">
          <button
            id="situation-unified-cta"
            type="button"
            onClick={() => onSelectSituation(currentSelected.title)}
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-[16px] font-bold text-white bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all cursor-pointer focus:outline-hidden focus:ring-4 focus:ring-blue-500/20"
          >
            <span>내 상황에 맞는 방법 확인하기</span>
            <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="mt-3 text-[13px] text-slate-500">
            현재 선택된 상황: <strong className="text-[#0B1F3A] font-semibold">{currentSelected.title}</strong> — 맞춤 진단 및 상담으로 연결됩니다.
          </p>
        </div>
      </div>
    </section>
  );
};
