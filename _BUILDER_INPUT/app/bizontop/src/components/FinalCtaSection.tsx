import React from 'react';
import { ArrowRight, PhoneCall, Sparkles, ShieldCheck } from 'lucide-react';

interface FinalCtaSectionProps {
  onOpenDiagnosis: () => void;
  onOpenConsultation: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  onOpenDiagnosis,
  onOpenConsultation,
}) => {
  return (
    <section
      id="final-cta-section"
      className="relative py-20 sm:py-28 bg-gradient-to-b from-[#071426] via-[#0B1F3A] to-[#08172c] text-white overflow-hidden"
      aria-label="최종 상담 및 진단 신청"
    >
      {/* Decorative ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-blue-600/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute -bottom-10 right-10 w-80 h-80 bg-blue-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-500/15 text-blue-300 border border-blue-400/30 mb-6 backdrop-blur-xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>BIZONTOP CONSULTING</span>
        </div>

        {/* Large Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-white tracking-tight leading-tight sm:leading-snug max-w-3xl mx-auto mb-6">
          아직 법인설립을 <br className="sm:hidden" />
          결정하지 못하셨나요?
        </h2>

        {/* Body Description */}
        <div className="max-w-2xl mx-auto mb-8 space-y-2">
          <p className="text-lg sm:text-xl font-bold text-blue-100">
            괜찮습니다.
          </p>
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            현재 사업상황을 알려주시면 <br className="sm:hidden" />
            법인설립이 필요한지부터 함께 확인해드립니다.
          </p>
        </div>

        {/* Emphasized Benefit Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-900/50 border border-blue-700/60 text-blue-200 text-sm font-semibold mb-10 shadow-inner">
          <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
          <span>3분이면 기본 상담 신청이 완료됩니다.</span>
        </div>

        {/* Action Buttons (Dual CTA) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto mb-10">
          {/* Primary CTA */}
          <button
            type="button"
            id="final-cta-diagnosis-btn"
            onClick={onOpenDiagnosis}
            className="w-full sm:w-auto flex-1 min-h-[52px] inline-flex items-center justify-center gap-2.5 bg-[#2563EB] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white font-bold text-base px-8 py-3.5 rounded-xl shadow-lg shadow-blue-900/40 hover:shadow-blue-700/50 transition-all duration-200 group focus:outline-hidden focus:ring-2 focus:ring-blue-400"
          >
            <span>3분 법인설립 진단하기</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary CTA */}
          <button
            type="button"
            id="final-cta-consultation-btn"
            onClick={onOpenConsultation}
            className="w-full sm:w-auto flex-1 min-h-[52px] inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 active:bg-white/25 text-white font-bold text-base px-7 py-3.5 rounded-xl border border-white/25 backdrop-blur-xs transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-white/40"
          >
            <PhoneCall className="w-4 h-4 text-blue-300" />
            <span>전문가 무료상담</span>
          </button>
        </div>

        {/* Bottom Small Text */}
        <p className="text-xs sm:text-sm text-slate-400 font-medium tracking-wide">
          법인설립 · 법인전환 · 정책자금 · 기업인증 상담
        </p>

      </div>
    </section>
  );
};
