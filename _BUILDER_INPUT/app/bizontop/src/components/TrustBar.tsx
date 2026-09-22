import React from 'react';
import { Building, RefreshCw, Award, Coins, ChevronRight } from 'lucide-react';

interface TrustBarProps {
  onSelectItem?: (item: string) => void;
  onOpenConsultation: () => void;
}

export const TrustBar: React.FC<TrustBarProps> = ({ onOpenConsultation }) => {
  const trustItems = [
    {
      id: 'incorporation-consulting',
      title: '법인설립 상담',
      desc: '상호·주주·정관 1:1 맞춤 설계',
      detail: '초보 대표님도 서류 준비부터 등기까지 막힘없이',
      badge: '원스톱',
      icon: Building,
      iconColor: 'text-blue-600 bg-blue-50',
    },
    {
      id: 'conversion-consulting',
      title: '법인전환 컨설팅',
      desc: '개인사업자 종합소득세 절감',
      detail: '성실신고 대상 기업의 안전한 포괄양수도 전환',
      badge: '절세 최적화',
      icon: RefreshCw,
      iconColor: 'text-indigo-600 bg-indigo-50',
    },
    {
      id: 'certification-consulting',
      title: '기업인증',
      desc: '벤처기업 · 연구소 · 이노비즈',
      detail: '세제 감면 및 정부 R&D 가점 사전 준비',
      badge: '세제 혜택',
      icon: Award,
      iconColor: 'text-amber-600 bg-amber-50',
    },
    {
      id: 'policy-funding-consulting',
      title: '정책자금 컨설팅',
      desc: '중기부 · 신보 · 기보 맞춤 매칭',
      detail: '설립 직후 초기 운전자금 및 시설자금 솔루션',
      badge: '자금 확보',
      icon: Coins,
      iconColor: 'text-emerald-600 bg-emerald-50',
    },
  ];

  return (
    <section
      id="trust-bar-section"
      className="w-full bg-white border-y border-slate-200/80 py-9 sm:py-12 shadow-xs"
    >
      <div className="w-full max-w-[1560px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Trust Bar Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-7 bg-[#2563EB] rounded-full" />
            <h3
              id="trust-bar-title"
              className="text-[19px] sm:text-[22px] font-bold text-[#0B1F3A] tracking-tight"
            >
              법인설립부터 기업성장까지 한 번에
            </h3>
          </div>
          <span className="text-[14px] text-slate-500 font-medium hidden sm:inline-block">
            분야별 공인 전문가 그룹이 설립부터 사후 관리까지 밀착 지원합니다
          </span>
        </div>

        {/* 4 Trust Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 xl:gap-8">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={onOpenConsultation}
                className="group relative p-6 sm:p-7 rounded-2xl bg-[#F8FAFC] hover:bg-blue-50/70 border border-slate-200/90 hover:border-blue-300 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.iconColor} group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[12px] font-bold text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-full group-hover:border-blue-200 group-hover:text-blue-700 transition-colors">
                      {item.badge}
                    </span>
                  </div>

                  <h4 className="text-[18px] font-bold text-[#0B1F3A] group-hover:text-blue-600 transition-colors mb-1.5 flex items-center justify-between">
                    <span>{item.title}</span>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                  </h4>
                  <p className="text-[14.5px] font-bold text-slate-700 mb-1.5">
                    {item.desc}
                  </p>
                  <p className="text-[13px] text-slate-500 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
