import React from 'react';
import { 
  Building2, 
  ArrowLeftRight, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Briefcase, 
  Sparkles, 
  ShieldCheck 
} from 'lucide-react';

interface BusinessServicesSectionProps {
  onOpenConsultation: (category: string) => void;
}

interface ServiceItem {
  id: string;
  serviceNo: string;
  categoryName: string;
  badgeText?: string;
  bigTitle: string;
  description: string;
  services: string[];
  ctaText: string;
  importanceWeight: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
  illustrationType: 'incorporation' | 'conversion' | 'support' | 'consulting';
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'srv-01',
    serviceNo: '01',
    categoryName: '법인설립',
    badgeText: '비즈온탑 메인 서비스',
    bigTitle: '사업에 맞는 법인 구조 설계',
    description: '법인을 단순히 설립하는 데 그치지 않고 사업형태와 향후 계획을 고려해 기본 구조를 함께 검토합니다.',
    services: ['신규 법인설립', '1인 법인', '공동창업 법인', '주주 및 임원구조', '사업목적 구성'],
    ctaText: '자세히 보기',
    importanceWeight: 'primary',
    illustrationType: 'incorporation',
  },
  {
    id: 'srv-02',
    serviceNo: '02',
    categoryName: '법인전환',
    badgeText: '개인사업자 절세 솔루션',
    bigTitle: '개인사업자의 법인전환',
    description: '사업규모 증가에 따라 법인전환을 고려하는 경우 현재 사업상황을 검토하고 적절한 전환 방향을 상담합니다.',
    services: ['법인전환 상담', '기존 사업현황 검토', '전환 방식 검토'],
    ctaText: '자세히 보기',
    importanceWeight: 'secondary',
    illustrationType: 'conversion',
  },
  {
    id: 'srv-03',
    serviceNo: '03',
    categoryName: '기업지원',
    badgeText: '자금 & 인증 연계',
    bigTitle: '정책자금 · 기업인증',
    description: '기업의 업력, 업종, 재무상황 등을 확인하여 활용 가능한 기업지원제도를 검토합니다.',
    services: ['정책자금', '벤처기업확인', '기업부설연구소', '연구개발전담부서', '이노비즈', '메인비즈'],
    ctaText: '자세히 보기',
    importanceWeight: 'tertiary',
    illustrationType: 'support',
  },
  {
    id: 'srv-04',
    serviceNo: '04',
    categoryName: '경영컨설팅',
    badgeText: '지속 성장 파트너',
    bigTitle: '기업 성장 단계별 컨설팅',
    description: '법인설립 이후 기업이 성장하면서 필요한 다양한 경영 이슈를 함께 검토합니다.',
    services: ['기업 성장전략', '재무구조', '조직 및 운영', '기업인증 연계'],
    ctaText: '자세히 보기',
    importanceWeight: 'quaternary',
    illustrationType: 'consulting',
  },
];

export const BusinessServicesSection: React.FC<BusinessServicesSectionProps> = ({
  onOpenConsultation,
}) => {
  // Render bespoke modern SVG illustrations for each service
  const renderIllustration = (type: string, isPrimary: boolean) => {
    switch (type) {
      case 'incorporation':
        return (
          <div className="w-full h-32 sm:h-36 rounded-xl bg-gradient-to-br from-blue-500/10 via-blue-600/5 to-slate-100 flex items-center justify-center p-3 relative overflow-hidden border border-blue-100/80">
            <svg viewBox="0 0 280 120" className="w-full h-full" fill="none">
              {/* Foundation base */}
              <rect x="20" y="86" width="240" height="12" rx="4" fill="#0B1F3A" fillOpacity="0.8" />
              {/* Pillars */}
              <rect x="44" y="44" width="22" height="42" rx="3" fill="#2563EB" />
              <rect x="94" y="44" width="22" height="42" rx="3" fill="#3B82F6" />
              <rect x="164" y="44" width="22" height="42" rx="3" fill="#3B82F6" />
              <rect x="214" y="44" width="22" height="42" rx="3" fill="#2563EB" />
              {/* Pediment roof */}
              <path d="M20 44L140 14L260 44H20Z" fill="#0B1F3A" />
              {/* Core emblem */}
              <circle cx="140" cy="56" r="18" fill="#F4A62A" fillOpacity="0.9" />
              <path d="M134 56L138 60L146 52" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              {/* Sub grid lines */}
              <line x1="20" y1="104" x2="260" y2="104" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />
            </svg>
            <div className="absolute top-2 right-2.5 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
              FOUNDATION
            </div>
          </div>
        );
      case 'conversion':
        return (
          <div className="w-full h-32 sm:h-36 rounded-xl bg-gradient-to-br from-slate-100 via-blue-50/40 to-slate-50 flex items-center justify-center p-3 relative overflow-hidden border border-slate-200">
            <svg viewBox="0 0 280 120" className="w-full h-full" fill="none">
              {/* Left: Sole proprietor card */}
              <rect x="25" y="32" width="75" height="58" rx="8" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
              <rect x="35" y="44" width="40" height="6" rx="2" fill="#64748B" />
              <rect x="35" y="56" width="55" height="4" rx="2" fill="#CBD5E1" />
              <rect x="35" y="66" width="30" height="4" rx="2" fill="#E2E8F0" />
              {/* Transition arrow loop */}
              <path d="M115 60H165" stroke="#2563EB" strokeWidth="3" strokeDasharray="5 3" />
              <path d="M158 52L168 60L158 68" fill="#2563EB" />
              {/* Right: Scaled Corporate structure */}
              <rect x="180" y="22" width="80" height="78" rx="8" fill="#0B1F3A" />
              <rect x="192" y="36" width="50" height="6" rx="2" fill="#60A5FA" />
              <rect x="192" y="48" width="56" height="4" rx="2" fill="#93C5FD" />
              <rect x="192" y="58" width="42" height="4" rx="2" fill="#BFDBFE" />
              <circle cx="240" cy="78" r="10" fill="#F4A62A" />
              <path d="M237 78L239 80L243 76" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <div className="absolute top-2 right-2.5 bg-slate-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              SCALING UP
            </div>
          </div>
        );
      case 'support':
        return (
          <div className="w-full h-32 sm:h-36 rounded-xl bg-gradient-to-br from-amber-50/60 via-blue-50/30 to-slate-50 flex items-center justify-center p-3 relative overflow-hidden border border-slate-200">
            <svg viewBox="0 0 280 120" className="w-full h-full" fill="none">
              {/* Certificate badge ribbon */}
              <rect x="40" y="24" width="80" height="72" rx="8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
              <circle cx="80" cy="50" r="16" fill="#F4A62A" fillOpacity="0.2" stroke="#F4A62A" strokeWidth="2" />
              <path d="M75 50L78 53L85 46" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
              <rect x="52" y="74" width="56" height="4" rx="2" fill="#94A3B8" />
              <rect x="60" y="82" width="40" height="4" rx="2" fill="#CBD5E1" />
              {/* Fund coins stack */}
              <ellipse cx="190" cy="74" rx="26" ry="8" fill="#2563EB" />
              <ellipse cx="190" cy="64" rx="26" ry="8" fill="#3B82F6" />
              <ellipse cx="190" cy="54" rx="26" ry="8" fill="#60A5FA" />
              <ellipse cx="190" cy="44" rx="26" ry="8" fill="#93C5FD" />
              <ellipse cx="190" cy="34" rx="26" ry="8" fill="#F4A62A" />
              {/* Trend arrow */}
              <path d="M135 78L155 45L170 52L220 25" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="absolute top-2 right-2.5 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              CERTIFIED & FUNDED
            </div>
          </div>
        );
      case 'consulting':
        return (
          <div className="w-full h-32 sm:h-36 rounded-xl bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50/40 flex items-center justify-center p-3 relative overflow-hidden border border-slate-200">
            <svg viewBox="0 0 280 120" className="w-full h-full" fill="none">
              {/* Dashboard chart bars */}
              <rect x="35" y="65" width="22" height="35" rx="3" fill="#94A3B8" />
              <rect x="65" y="48" width="22" height="52" rx="3" fill="#64748B" />
              <rect x="95" y="32" width="22" height="68" rx="3" fill="#2563EB" />
              <rect x="125" y="20" width="22" height="80" rx="3" fill="#0B1F3A" />
              {/* Strategy curve */}
              <path d="M40 70C80 50 110 35 180 18" stroke="#F4A62A" strokeWidth="3" strokeLinecap="round" />
              <circle cx="180" cy="18" r="5" fill="#F4A62A" />
              {/* Network nodes */}
              <circle cx="210" cy="45" r="9" fill="#2563EB" />
              <circle cx="245" cy="32" r="7" fill="#60A5FA" />
              <circle cx="235" cy="75" r="8" fill="#0B1F3A" />
              <line x1="210" y1="45" x2="245" y2="32" stroke="#CBD5E1" strokeWidth="2" />
              <line x1="210" y1="45" x2="235" y2="75" stroke="#CBD5E1" strokeWidth="2" />
            </svg>
            <div className="absolute top-2 right-2.5 bg-slate-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              GROWTH ROADMAP
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="business-services-section"
      className="py-16 sm:py-24 bg-[#F7F9FC] border-b border-slate-200/80"
      aria-label="비즈온탑 4대 핵심 서비스"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white text-[#2563EB] border border-blue-200 mb-3.5 shadow-2xs">
            <Briefcase className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>BUSINESS SERVICES</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#0B1F3A] tracking-tight leading-tight">
            법인설립부터 <br className="hidden sm:inline" />
            기업의 성장까지 함께합니다.
          </h2>

          <p className="mt-3.5 text-base sm:text-[17px] text-slate-600 font-normal leading-relaxed">
            단순 대행이 아닌, 창업 초기 구조 설계부터 성장 단계별 인증과 자금까지 <br className="hidden sm:inline" />
            기업에 필요한 4가지 핵심 영역을 원스톱으로 지원합니다.
          </p>
        </div>

        {/* 4 Premium Consulting Cards in 2x2 Grid (1 col on Mobile, 2 cols on Tablet & Desktop)
            Visual hierarchy enforced: 법인설립 > 법인전환 > 기업지원 > 경영컨설팅 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {SERVICES_DATA.map((srv) => {
            const isPrimary = srv.importanceWeight === 'primary';
            const isSecondary = srv.importanceWeight === 'secondary';

            return (
              <div
                key={srv.id}
                id={`service-card-${srv.serviceNo}`}
                className={`rounded-2xl transition-all duration-200 flex flex-col justify-between overflow-hidden ${
                  isPrimary
                    ? 'bg-white border-2 border-[#2563EB] shadow-xl shadow-blue-900/8 ring-4 ring-blue-500/10'
                    : isSecondary
                    ? 'bg-white border border-slate-300 hover:border-blue-400 shadow-md hover:shadow-lg'
                    : 'bg-white/95 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Card Top: Illustration & Badge */}
                <div className="p-6 sm:p-7 pb-4">
                  {/* Category Header */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                          isPrimary
                            ? 'bg-[#2563EB] text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        SERVICE {srv.serviceNo}
                      </span>
                      <span className="text-sm font-bold text-[#0B1F3A]">
                        {srv.categoryName}
                      </span>
                    </div>

                    {srv.badgeText && (
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          isPrimary
                            ? 'bg-blue-50 text-[#2563EB] border border-blue-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {srv.badgeText}
                      </span>
                    )}
                  </div>

                  {/* Bespoke Illustration Container */}
                  <div className="mb-5">
                    {renderIllustration(srv.illustrationType, isPrimary)}
                  </div>

                  {/* Big Title */}
                  <h3 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight mb-2.5">
                    {srv.bigTitle}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 font-medium leading-relaxed mb-5">
                    {srv.description}
                  </p>

                  {/* Sub-services Pills / List */}
                  <div className="pt-4 border-t border-slate-100">
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                      주요 지원 항목
                    </span>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {srv.services.map((item) => (
                        <span
                          key={item}
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border ${
                            isPrimary
                              ? 'bg-blue-50/70 border-blue-200/80 text-[#0B1F3A]'
                              : 'bg-slate-50 border-slate-200/80 text-slate-700'
                          }`}
                        >
                          <CheckCircle2 className={`w-3.5 h-3.5 ${isPrimary ? 'text-[#2563EB]' : 'text-slate-400'}`} />
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div className="p-6 sm:p-7 pt-4 bg-slate-50/60 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onOpenConsultation(`${srv.categoryName} 상담`)}
                    id={`service-cta-${srv.serviceNo}`}
                    className={`w-full inline-flex items-center justify-center gap-2 font-bold text-sm sm:text-[15px] py-3.5 px-4 rounded-xl transition-all duration-200 focus:outline-hidden ${
                      isPrimary
                        ? 'bg-[#2563EB] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white shadow-md hover:shadow-lg'
                        : 'bg-white hover:bg-slate-100 active:bg-slate-200 text-[#0B1F3A] border border-slate-200 shadow-2xs'
                    }`}
                  >
                    <span>{srv.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
