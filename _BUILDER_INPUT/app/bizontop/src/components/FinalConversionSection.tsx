import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface FinalConversionSectionProps {
  onOpenDiagnosis: () => void;
  onOpenConsultation: () => void;
}

export const FinalConversionSection: React.FC<FinalConversionSectionProps> = ({
  onOpenDiagnosis,
  onOpenConsultation,
}) => {
  return (
    <section
      id="final-conversion"
      className="relative w-full bg-gradient-to-b from-[#0B1F3A] via-[#091A33] to-[#061224] text-white py-20 sm:py-24 lg:py-28 overflow-hidden border-t border-slate-850"
    >
      {/* Subtle Ambient Radial Lighting */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" 
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1360px] 2xl:max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12 text-center">
        {/* Subtle Pill Tag */}
        <div
          id="final-cta-tag"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[12.5px] sm:text-[13px] font-semibold mb-6 shadow-xs backdrop-blur-xs"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span>FREE CORPORATE ADVISORY</span>
        </div>

        {/* Big Heading */}
        <h2
          id="final-cta-heading"
          className="text-[36px] sm:text-[46px] md:text-[52px] font-black tracking-tight leading-[1.2] text-white mb-6"
        >
          아직 법인설립을
          <br />
          결정하지 못하셨나요?
        </h2>

        {/* Body Text */}
        <div className="text-[17px] sm:text-[19px] text-slate-300 leading-relaxed max-w-2xl mx-auto mb-6 space-y-1.5">
          <p className="font-semibold text-white text-[19px] sm:text-[21px]">괜찮습니다.</p>
          <p>
            현재 사업상황을 알려주시면
            <br className="sm:hidden" />
            {' '}법인설립이 필요한지부터 함께 확인해드립니다.
          </p>
        </div>

        {/* Highlight Emphasized Line */}
        <p
          id="final-cta-highlight"
          className="text-[16px] sm:text-[17.5px] font-bold text-blue-300 mb-9 sm:mb-11"
        >
          3분이면 기본 상담 신청이 완료됩니다.
        </p>

        {/* Unified 2 CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-md mx-auto mb-8">
          {/* Primary CTA */}
          <button
            id="final-primary-diagnosis-btn"
            type="button"
            onClick={onOpenDiagnosis}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[54px] px-8 py-4 rounded-xl text-[16px] font-bold text-white bg-[#2563EB] hover:bg-blue-600 active:bg-blue-700 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all cursor-pointer focus:outline-hidden focus:ring-4 focus:ring-blue-400/30"
          >
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            <span>3분 법인설립 진단하기</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>

          {/* Secondary CTA */}
          <button
            id="final-secondary-consultation-btn"
            type="button"
            onClick={onOpenConsultation}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[54px] px-7 py-4 rounded-xl text-[16px] font-bold text-white bg-white/10 hover:bg-white/15 active:bg-white/20 border border-white/20 hover:border-white/30 transition-all cursor-pointer focus:outline-hidden focus:ring-4 focus:ring-white/20"
          >
            <span>무료상담 신청하기</span>
          </button>
        </div>

        {/* Bottom Small Notice */}
        <div className="pt-2 flex items-center justify-center gap-2 text-[12.5px] sm:text-[13.5px] text-slate-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
          <span>법인설립 · 법인전환 · 정책자금 · 기업인증 상담</span>
        </div>
      </div>
    </section>
  );
};
