import React from 'react';
import { 
  Building2, 
  ArrowLeftRight, 
  Award, 
  Compass, 
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers,
  ShieldCheck,
  BarChart3
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

interface ServiceItem {
  id: string;
  badge: string;
  badgeEn: string;
  tagline: string;
  desc: string;
  features: string[];
  ctaText: string;
  consultationCategory: string;
  highlight?: boolean;
  accentColor: string;
  bgGradient: string;
  illustrationType: 'incorporation' | 'conversion' | 'support' | 'consulting';
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const services: ServiceItem[] = [
    {
      id: 'incorporation',
      badge: 'SERVICE 01',
      badgeEn: '법인설립',
      tagline: '사업에 맞는 법인 구조 설계',
      desc: '법인을 단순히 설립하는 데 그치지 않고 사업형태와 향후 계획을 고려해 기본 구조를 함께 검토합니다.',
      features: [
        '신규 법인설립',
        '1인 법인',
        '공동창업 법인',
        '주주 및 임원구조',
        '사업목적 구성',
      ],
      ctaText: '자세히 보기',
      consultationCategory: '법인설립',
      highlight: true,
      accentColor: '#2563EB',
      bgGradient: 'from-blue-600/10 via-indigo-600/5 to-transparent',
      illustrationType: 'incorporation',
    },
    {
      id: 'conversion',
      badge: 'SERVICE 02',
      badgeEn: '법인전환',
      tagline: '개인사업자의 법인전환',
      desc: '사업규모 증가에 따라 법인전환을 고려하는 경우 현재 사업상황을 검토하고 적절한 전환 방향을 상담합니다.',
      features: [
        '법인전환 상담',
        '기존 사업현황 검토',
        '전환 방식 검토',
      ],
      ctaText: '자세히 보기',
      consultationCategory: '법인전환',
      accentColor: '#0284C7',
      bgGradient: 'from-sky-600/10 via-blue-600/5 to-transparent',
      illustrationType: 'conversion',
    },
    {
      id: 'support',
      badge: 'SERVICE 03',
      badgeEn: '기업지원',
      tagline: '정책자금 · 기업인증',
      desc: '기업의 업력, 업종, 재무상황 등을 확인하여 활용 가능한 기업지원제도를 검토합니다.',
      features: [
        '정책자금',
        '벤처기업확인',
        '기업부설연구소',
        '연구개발전담부서',
        '이노비즈',
        '메인비즈',
      ],
      ctaText: '자세히 보기',
      consultationCategory: '정책자금/기업인증',
      accentColor: '#4F46E5',
      bgGradient: 'from-indigo-600/10 via-purple-600/5 to-transparent',
      illustrationType: 'support',
    },
    {
      id: 'consulting',
      badge: 'SERVICE 04',
      badgeEn: '경영컨설팅',
      tagline: '기업 성장 단계별 컨설팅',
      desc: '법인설립 이후 기업이 성장하면서 필요한 다양한 경영 이슈를 함께 검토합니다.',
      features: [
        '기업 성장전략',
        '재무구조',
        '조직 및 운영',
        '기업인증 연계',
      ],
      ctaText: '자세히 보기',
      consultationCategory: '경영컨설팅',
      accentColor: '#0D9488',
      bgGradient: 'from-teal-600/10 via-emerald-600/5 to-transparent',
      illustrationType: 'consulting',
    },
  ];

  // Visual Graphic/Illustration renderer for each card
  const renderIllustration = (type: ServiceItem['illustrationType']) => {
    switch (type) {
      case 'incorporation':
        return (
          <div className="relative w-full h-32 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50/60 border border-blue-100/80 p-3.5 flex items-center justify-between overflow-hidden">
            <div className="space-y-2 z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span className="text-[12px] font-bold text-blue-900">맞춤 정관 & 주주명부</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-[12px] font-semibold text-slate-700">과밀억제권역 감면 검토</span>
              </div>
              <div className="inline-block text-[11px] font-medium text-blue-700 bg-white/90 border border-blue-200 px-2 py-0.5 rounded-md">
                전자등기 심사 패스트트랙
              </div>
            </div>
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
              <Building2 className="w-8 h-8" />
              <Sparkles className="w-4 h-4 text-amber-300 absolute -top-1 -right-1" />
            </div>
          </div>
        );
      case 'conversion':
        return (
          <div className="relative w-full h-32 rounded-xl bg-gradient-to-br from-sky-50 to-blue-50/60 border border-sky-100/80 p-3.5 flex items-center justify-between overflow-hidden">
            <div className="space-y-2 z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-600" />
                <span className="text-[12px] font-bold text-sky-950">개인 vs 법인 소득세율 비교</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span className="text-[12px] font-semibold text-slate-700">포괄양수도 & 현물출자</span>
              </div>
              <div className="inline-block text-[11px] font-medium text-sky-700 bg-white/90 border border-sky-200 px-2 py-0.5 rounded-md">
                영업권 평가 & 세부담 최소화
              </div>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-600 to-blue-600 text-white flex items-center justify-center shadow-md shadow-sky-500/20 shrink-0">
              <ArrowLeftRight className="w-8 h-8" />
            </div>
          </div>
        );
      case 'support':
        return (
          <div className="relative w-full h-32 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50/60 border border-indigo-100/80 p-3.5 flex items-center justify-between overflow-hidden">
            <div className="space-y-2 z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                <span className="text-[12px] font-bold text-indigo-950">중기부 · 기보 · 신보 자금</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <span className="text-[12px] font-semibold text-slate-700">벤처기업 · 연구소 설립</span>
              </div>
              <div className="inline-block text-[11px] font-medium text-indigo-700 bg-white/90 border border-indigo-200 px-2 py-0.5 rounded-md">
                법인세 50% 감면 혜택 연계
              </div>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20 shrink-0">
              <Award className="w-8 h-8" />
            </div>
          </div>
        );
      case 'consulting':
        return (
          <div className="relative w-full h-32 rounded-xl bg-gradient-to-br from-teal-50 to-emerald-50/60 border border-teal-100/80 p-3.5 flex items-center justify-between overflow-hidden">
            <div className="space-y-2 z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-600" />
                <span className="text-[12px] font-bold text-teal-950">단계별 기업 성장 로드맵</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                <span className="text-[12px] font-semibold text-slate-700">재무비율 개선 & 조직 관리</span>
              </div>
              <div className="inline-block text-[11px] font-medium text-teal-700 bg-white/90 border border-teal-200 px-2 py-0.5 rounded-md">
                1:1 전담 경영 어드바이저
              </div>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-600 text-white flex items-center justify-center shadow-md shadow-teal-500/20 shrink-0">
              <Compass className="w-8 h-8" />
            </div>
          </div>
        );
    }
  };

  return (
    <section
      id="services"
      className="w-full bg-white py-16 sm:py-20 lg:py-24 border-b border-slate-200/80 scroll-mt-20"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div
            id="services-eyebrow"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[12px] sm:text-[13px] font-semibold tracking-wider mb-3.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span>BUSINESS SERVICES</span>
          </div>
          <h2
            id="services-main-title"
            className="text-[28px] sm:text-[36px] md:text-[40px] font-black text-[#0B1F3A] tracking-tight leading-[1.25] mb-4"
          >
            법인설립부터
            <br />
            기업의 성장까지 함께합니다.
          </h2>
          <p
            id="services-description"
            className="text-[15px] sm:text-[16.5px] text-slate-600 leading-relaxed max-w-2xl mx-auto"
          >
            단순 법인등기 대행에 머무르지 않고, 개인사업자 전환부터 정책자금,
            <br className="hidden sm:inline" />
            각종 기업인증 및 경영 전략까지 원스톱으로 지원합니다.
          </p>
        </div>

        {/* 4 Cards Layout: Desktop 2x2, Tablet 2x2, Mobile 1 col */}
        <div
          id="services-cards-grid"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 lg:gap-8"
        >
          {services.map((item, idx) => (
            <div
              key={item.id}
              id={`service-card-${item.id}`}
              className={`relative rounded-3xl p-6 sm:p-8 border transition-all duration-300 flex flex-col justify-between ${
                item.highlight
                  ? 'bg-gradient-to-b from-white via-blue-50/20 to-white border-blue-500/80 shadow-md shadow-blue-500/5 ring-1 ring-blue-500/20 hover:-translate-y-1'
                  : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-md hover:-translate-y-1'
              }`}
            >
              <div>
                {/* Top Badge & Priority Hierarchy */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[12px] font-extrabold px-3 py-1 rounded-full ${
                        item.highlight
                          ? 'bg-[#2563EB] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                    <span className="text-[13px] font-bold text-slate-500">
                      {item.badgeEn}
                    </span>
                  </div>

                  {item.highlight && (
                    <span className="text-[11px] font-bold text-blue-700 bg-blue-100/80 px-2.5 py-0.5 rounded-full">
                      핵심 서비스
                    </span>
                  )}
                </div>

                {/* Big Title */}
                <h3 className="text-[22px] sm:text-[24px] font-black text-[#0B1F3A] tracking-tight mb-2.5">
                  {item.tagline}
                </h3>

                {/* Description */}
                <p className="text-[14.5px] text-slate-600 leading-relaxed mb-6">
                  {item.desc}
                </p>

                {/* Card Illustration / Visual Area */}
                <div className="mb-6">
                  {renderIllustration(item.illustrationType)}
                </div>

                {/* Service Items List */}
                <div className="mb-6">
                  <span className="text-[12px] font-bold text-slate-400 tracking-wider uppercase block mb-3">
                    주요 제공 서비스
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {item.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-[13.5px] text-slate-700 font-medium"
                      >
                        <CheckCircle2
                          className="w-4 h-4 shrink-0"
                          style={{ color: item.accentColor }}
                        />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA Button */}
              <div className="pt-5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onSelectService(item.consultationCategory)}
                  className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl text-[14.5px] font-bold transition-all cursor-pointer ${
                    item.highlight
                      ? 'bg-[#2563EB] text-white hover:bg-blue-700 shadow-sm hover:shadow-md'
                      : 'bg-slate-50 text-slate-800 hover:bg-blue-50 hover:text-blue-700 border border-slate-200/80 hover:border-blue-200'
                  }`}
                >
                  <span>{item.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
