import React from 'react';
import { 
  ShoppingBag, 
  Users2, 
  Rocket, 
  ArrowRight, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface CasesSectionProps {
  onOpenConsultation: (category: string) => void;
}

interface CaseItem {
  id: string;
  badge: string;
  targetCategory: string;
  title: string;
  situation: string;
  concerns: string[];
  processFlow: string[];
  icon: React.ElementType;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
}

export const CasesSection: React.FC<CasesSectionProps> = ({ onOpenConsultation }) => {
  const cases: CaseItem[] = [
    {
      id: 'case-01',
      badge: 'CASE 01',
      targetCategory: '온라인 쇼핑몰 운영기업',
      title: '개인사업자 → 법인전환',
      situation: '사업규모가 증가하면서 법인전환을 검토',
      concerns: ['법인전환 시점', '주주구성', '향후 기업운영'],
      processFlow: [
        '현황검토',
        '법인구조 검토',
        '법인설립',
        '후속 기업지원 상담',
      ],
      icon: ShoppingBag,
      accentColor: '#2563EB',
      badgeBg: 'bg-blue-50',
      badgeText: 'text-blue-700',
    },
    {
      id: 'case-02',
      badge: 'CASE 02',
      targetCategory: '3인 공동창업',
      title: '공동창업 법인설립',
      situation: '3명의 창업자가 신규 사업을 공동으로 준비',
      concerns: ['대표자', '주주', '임원', '지분구조'],
      processFlow: [
        '사업구조 확인',
        '지분 및 임원 구성 검토',
        '법인설립',
      ],
      icon: Users2,
      accentColor: '#4F46E5',
      badgeBg: 'bg-indigo-50',
      badgeText: 'text-indigo-700',
    },
    {
      id: 'case-03',
      badge: 'CASE 03',
      targetCategory: '스타트업',
      title: '투자유치 준비 법인',
      situation: '서비스 출시와 향후 투자유치를 준비',
      concerns: ['초기 주주구조', '자본금', '향후 투자구조'],
      processFlow: [
        '설립목적 확인',
        '법인구조 검토',
        '법인설립',
        '기업성장 상담',
      ],
      icon: Rocket,
      accentColor: '#0284C7',
      badgeBg: 'bg-sky-50',
      badgeText: 'text-sky-700',
    },
  ];

  return (
    <section
      id="cases"
      className="w-full bg-white py-18 sm:py-24 lg:py-28 border-b border-slate-200/80 scroll-mt-20"
    >
      <div className="w-full max-w-[1560px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-14 sm:mb-18">
          <div
            id="cases-eyebrow"
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[12.5px] sm:text-[13.5px] font-semibold tracking-wider mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>CONSULTING CASES</span>
          </div>
          <h2
            id="cases-main-title"
            className="text-[32px] sm:text-[42px] md:text-[46px] font-black text-[#0B1F3A] tracking-tight leading-[1.2] mb-5"
          >
            기업마다 상황이 다르기 때문에
            <br />
            진행 방법도 달라집니다.
          </h2>
          <p
            id="cases-description"
            className="text-[16px] sm:text-[18px] text-slate-600 leading-relaxed max-w-3xl mx-auto"
          >
            사업형태와 향후 계획에 맞춰 법인설립 및 기업 성장 방향을 함께 검토합니다.
            <br className="hidden sm:inline" />
            실제 상담 유형별 표준 진행 프로세스를 확인해보세요.
          </p>
        </div>

        {/* 3 Cases Grid */}
        <div
          id="cases-cards-grid"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 mb-12"
        >
          {cases.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                id={item.id}
                className="bg-[#F8FAFC] rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Case Badge & Category */}
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className={`text-[12px] font-extrabold px-3 py-1 rounded-full border border-slate-200/80 ${item.badgeBg} ${item.badgeText}`}
                    >
                      {item.badge}
                    </span>
                    <span className="text-[13px] font-bold text-slate-500">
                      {item.targetCategory}
                    </span>
                  </div>

                  {/* Header Title with Icon */}
                  <div className="flex items-start gap-3.5 mb-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs"
                      style={{ backgroundColor: item.accentColor }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-[20px] sm:text-[22px] font-black text-[#0B1F3A] tracking-tight leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-[13px] text-slate-500 font-medium mt-0.5">
                        상담 유형 예시
                      </p>
                    </div>
                  </div>

                  {/* Situation Card Block */}
                  <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/70 mb-5">
                    <span className="text-[11.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      상황
                    </span>
                    <p className="text-[14.5px] text-slate-800 font-medium leading-relaxed">
                      {item.situation}
                    </p>
                  </div>

                  {/* Key Concerns */}
                  <div className="mb-6">
                    <span className="text-[12px] font-bold text-slate-500 tracking-wider block mb-2.5">
                      주요 고민사항
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.concerns.map((concern) => (
                        <span
                          key={concern}
                          className="text-[12.5px] font-semibold text-slate-700 bg-white border border-slate-200/90 px-3 py-1 rounded-lg"
                        >
                          #{concern}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Progress Flow */}
                  <div className="mb-6">
                    <span className="text-[12px] font-bold text-slate-500 tracking-wider block mb-2.5">
                      진행 프로세스
                    </span>
                    <div className="space-y-1.5">
                      {item.processFlow.map((step, idx) => (
                        <div
                          key={step}
                          className="flex items-center gap-2 text-[13px] text-slate-700 bg-white/70 py-1.5 px-3 rounded-lg border border-slate-200/60"
                        >
                          <span
                            className="w-5 h-5 rounded-full text-white text-[11px] font-bold flex items-center justify-center shrink-0"
                            style={{ backgroundColor: item.accentColor }}
                          >
                            {idx + 1}
                          </span>
                          <span className="font-medium text-slate-800">{step}</span>
                          {idx < item.processFlow.length - 1 && (
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 ml-auto" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 border-t border-slate-200/80">
                  <button
                    type="button"
                    onClick={() => onOpenConsultation(item.title)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-[14px] font-bold text-slate-700 bg-white hover:bg-blue-50 hover:text-blue-700 border border-slate-200/80 hover:border-blue-200 transition-colors cursor-pointer"
                  >
                    <span>무료상담 신청하기</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notice Info */}
        <div className="text-center text-[12.5px] text-slate-500 max-w-xl mx-auto">
          * 위 사례는 비즈온탑에서 가장 빈번하게 진행되는 법인설립 및 구조 설계 대표 상담 유형 예시입니다.
        </div>
      </div>
    </section>
  );
};
