import React from 'react';
import { 
  Building2, 
  ArrowLeftRight, 
  Award, 
  Landmark, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronRight 
} from 'lucide-react';
import { TrustItem } from '../types';

interface TrustBarProps {
  onSelectItem?: (category: string) => void;
}

const TRUST_ITEMS: TrustItem[] = [
  {
    id: 'incorporation',
    title: '법인설립 상담',
    description: '최적 주주지분 & 정관 특약 설계',
    badge: '원스톱 전자등기',
    iconName: 'Building2'
  },
  {
    id: 'conversion',
    title: '법인전환 컨설팅',
    description: '개인사업자 절세 & 포괄양수도',
    badge: '소득세 절감 진단',
    iconName: 'ArrowLeftRight'
  },
  {
    id: 'certification',
    title: '기업인증',
    description: '벤처·이노비즈·메인비즈 확인',
    badge: '세제감면 혜택',
    iconName: 'Award'
  },
  {
    id: 'funding',
    title: '정책자금 컨설팅',
    description: '초기 창업지원금 & 보증재단 연계',
    badge: '맞춤 공고 매칭',
    iconName: 'Landmark'
  }
];

export const TrustBar: React.FC<TrustBarProps> = ({ onSelectItem }) => {
  const renderIcon = (name: string) => {
    const className = "w-6 h-6 text-[#2563EB]";
    switch (name) {
      case 'Building2':
        return <Building2 className={className} />;
      case 'ArrowLeftRight':
        return <ArrowLeftRight className={className} />;
      case 'Award':
        return <Award className={className} />;
      case 'Landmark':
        return <Landmark className={className} />;
      default:
        return <Building2 className={className} />;
    }
  };

  return (
    <section
      id="trust-section"
      className="w-full bg-white border-y border-slate-200/90 py-8 sm:py-10"
      aria-label="핵심 서비스 및 신뢰 영역"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-7">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-1.5">
            <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
            <span>ONE-STOP CORPORATE SERVICES</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight">
            법인설립부터 기업성장까지 한 번에
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            설립 등기에서 끝나지 않고, 설립 이후 기업이 필요로 하는 실질적인 성장을 지원합니다.
          </p>
        </div>

        {/* 4 Trust Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.id}
              id={`trust-item-${item.id}`}
              onClick={() => onSelectItem && onSelectItem(item.title)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectItem && onSelectItem(item.title);
                }
              }}
              tabIndex={0}
              role="button"
              className="group relative bg-[#F7F9FC] hover:bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]/40"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-blue-50 border border-slate-200 group-hover:border-blue-200 flex items-center justify-center transition-colors shadow-2xs">
                    {renderIcon(item.iconName)}
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white text-slate-600 border border-slate-200 group-hover:border-blue-200 group-hover:text-[#2563EB] transition-colors">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base sm:text-[17px] font-bold text-[#0B1F3A] group-hover:text-[#2563EB] transition-colors flex items-center justify-between">
                  <span>{item.title}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition-all" />
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 leading-snug">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between text-[12px] font-semibold text-slate-600 group-hover:text-[#2563EB]">
                <span>자세히 알아보기</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-[#2563EB]" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
