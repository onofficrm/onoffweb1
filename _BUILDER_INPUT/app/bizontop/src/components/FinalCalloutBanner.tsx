import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  FileSpreadsheet, 
  Building2, 
  Coins,
  ShieldCheck 
} from 'lucide-react';

interface FinalCalloutBannerProps {
  onOpenDiagnosis: () => void;
  onOpenConsultation: () => void;
}

export const FinalCalloutBanner: React.FC<FinalCalloutBannerProps> = ({
  onOpenDiagnosis,
  onOpenConsultation,
}) => {
  const reasons = [
    {
      number: '01',
      title: '단순 서류 대행이 아닌 자본·지분 설계',
      description: '창업자 간 지분 배분, 임원 구성, 정관 특약까지 초기부터 분쟁과 세무 리스크를 원천 차단합니다.',
      icon: FileSpreadsheet,
    },
    {
      number: '02',
      title: '과밀억제권역 등록세 감면 사전 진단',
      description: '설립 지역과 본점 주소지에 따른 3배 중과세를 피하고, 초기 설립 비용을 합법적으로 절감해 드립니다.',
      icon: Building2,
    },
    {
      number: '03',
      title: '설립 직후 초기 정책자금 & 인증 원스톱 연계',
      description: '법인 설립 후 3년 이내 창업 초기 기업만 받을 수 있는 정책자금 및 기업인증 로드맵을 함께 설계합니다.',
      icon: Coins,
    },
  ];

  return (
    <section id="final-cta" className="w-full bg-[#F7F9FC] py-16 sm:py-20 border-b border-slate-200/80">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Why BizOnTop 3 Pillars */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-[12px] sm:text-[13px] font-bold text-blue-600 bg-blue-50 border border-blue-200/80 px-3 py-1 rounded-full inline-block mb-3">
            BIZ ON TOP ADVANTAGE
          </span>
          <h2 className="text-[26px] sm:text-[34px] font-black text-[#0B1F3A] tracking-tight leading-tight mb-3">
            왜 첫 법인설립은 비즈온탑일까요?
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-600">
            단순히 서류만 접수하는 대행사와 다릅니다. 설립 이후 지속 가능한 성장을 위한 첫 단추를 제대로 끼워드립니다.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {reasons.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.number}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[13px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                      POINT {item.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-[18px] font-bold text-[#0B1F3A] mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[14px] text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="relative rounded-3xl bg-[#0B1F3A] text-white p-8 sm:p-12 overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[12px] font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>지금 시작하면 설립 구조 및 사후 성장 로드맵 무료 사전 검토</span>
            </div>
            <h3 className="text-[24px] sm:text-[32px] font-black tracking-tight mb-3">
              복잡한 법인설립, 비즈온탑과 함께
              <br />
              가장 쉽고 안전하게 시작하세요.
            </h3>
            <p className="text-[14px] sm:text-[15.5px] text-slate-300 leading-relaxed mb-8">
              사업 목적에 최적화된 정관부터 설립 이후 정부 지원제도까지,
              전문 컨설턴트가 1:1로 함께 고민하고 해결해 드립니다.
            </p>

            {/* Unified 2 CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                type="button"
                onClick={onOpenDiagnosis}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[15px] font-bold text-white bg-[#2563EB] hover:bg-blue-700 transition-all shadow-md shadow-blue-500/25 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>3분 법인설립 무료진단</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onOpenConsultation}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[15px] font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer"
              >
                <span>무료상담 신청하기</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
