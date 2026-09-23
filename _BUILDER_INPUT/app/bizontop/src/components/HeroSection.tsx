import React from 'react';
import { ArrowRight, CheckCircle2, PhoneCall } from 'lucide-react';
import { InteractiveProcessCard } from './InteractiveProcessCard';

interface HeroSectionProps {
  onOpenDiagnosis: () => void;
  onOpenConsultation: () => void;
}

const TRUST_ITEMS = [
  '쉬운 해설',
  '비대면 전자등기',
  '창업세액감면 검토',
];

const MOBILE_STEPS = ['준비', '구조', '등기', '사업자', '성장'];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenDiagnosis,
  onOpenConsultation,
}) => {
  return (
    <section
      id="hero-section"
      className="relative pt-10 pb-12 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24 overflow-hidden"
    >
      {/* Atmosphere */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(165deg,#FFFFFF_0%,#F4F8FF_42%,#EEF3FA_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.35] [background-image:radial-gradient(#94A3B8_0.7px,transparent_0.7px)] [background-size:18px_18px]" />
      <div className="absolute -top-24 left-[-10%] w-[55vw] max-w-[520px] h-[55vw] max-h-[520px] rounded-full bg-[#2563EB]/12 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-32 right-[-8%] w-[48vw] max-w-[460px] h-[48vw] max-h-[460px] rounded-full bg-[#0B1F3A]/10 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <p className="inline-flex items-center gap-2 self-start mb-5 sm:mb-6 text-[12px] sm:text-[13px] font-semibold tracking-[0.04em] text-[#2563EB]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              비즈온탑 · 법인설립 전문 컨설팅
            </p>

            <h1 className="text-[34px] sm:text-5xl lg:text-[52px] font-black text-[#0B1F3A] tracking-[-0.03em] leading-[1.18]">
              법인설립,
              <br />
              <span className="bg-gradient-to-r from-[#0B1F3A] via-[#1D4ED8] to-[#2563EB] bg-clip-text text-transparent">
                어렵게 시작하지 마세요.
              </span>
            </h1>

            <p className="mt-5 sm:mt-6 text-[17px] sm:text-xl font-bold text-[#0B1F3A]/85 tracking-tight leading-snug max-w-[34rem]">
              사업에 맞는 법인 구조부터
              <br className="sm:hidden" /> 설립 이후 성장까지 함께합니다.
            </p>

            <p className="mt-3.5 sm:mt-4 text-[14px] sm:text-[16px] text-slate-600 leading-relaxed max-w-[34rem]">
              상호·자본금·주주·임원 구성을 쉽게 안내하고,
              정책자금과 기업인증까지 이어서 검토합니다.
            </p>

            {/* Mobile visual anchor: compact 5-step strip */}
            <div className="mt-6 lg:hidden rounded-2xl border border-slate-200/90 bg-white/80 backdrop-blur-sm p-3.5 shadow-sm">
              <div className="flex items-center justify-between mb-2.5 px-0.5">
                <span className="text-[11px] font-bold text-[#0B1F3A]">설립 5단계</span>
                <span className="text-[10px] font-medium text-slate-500">평균 5~7일 흐름</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {MOBILE_STEPS.map((label, i) => (
                  <div key={label} className="flex flex-col items-center gap-1.5">
                    <span
                      className={`w-8 h-8 rounded-full text-[11px] font-black flex items-center justify-center ${
                        i === 0
                          ? 'bg-[#2563EB] text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-600">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust chips */}
            <div className="mt-5 sm:mt-6 flex flex-wrap gap-2">
              {TRUST_ITEMS.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/90 border border-slate-200 px-3 py-1.5 text-[12px] sm:text-[13px] font-semibold text-slate-700 shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                  {item}
                </span>
              ))}
            </div>

            {/* CTA: one primary + quieter secondary */}
            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                id="hero-cta-diagnosis"
                onClick={onOpenDiagnosis}
                className="group inline-flex items-center justify-center gap-2.5 min-h-[52px] bg-[#0B1F3A] hover:bg-[#142d50] active:bg-[#071426] text-white font-bold text-[15px] sm:text-base px-6 rounded-2xl shadow-[0_10px_28px_rgba(11,31,58,0.22)] transition-all focus:outline-hidden focus:ring-2 focus:ring-[#0B1F3A]/35"
              >
                <span>3분 법인설립 진단하기</span>
                <ArrowRight className="w-4 h-4 text-[#F4A62A] group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                id="hero-cta-consultation"
                onClick={onOpenConsultation}
                className="inline-flex items-center justify-center gap-2 min-h-[52px] bg-white/90 hover:bg-white text-[#0B1F3A] font-bold text-[15px] sm:text-base px-6 rounded-2xl border border-slate-200 shadow-xs transition-all focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]/25"
              >
                <PhoneCall className="w-4 h-4 text-[#2563EB]" />
                <span>전문가 무료상담</span>
              </button>
            </div>

            <p className="mt-3.5 text-[12px] sm:text-[13px] text-slate-500 font-medium">
              준비서류 · 기간 · 절차 · 설립 이후 안내까지
            </p>
          </div>

          {/* Desktop visual */}
          <div className="hidden lg:flex lg:col-span-5 w-full justify-center">
            <InteractiveProcessCard />
          </div>
        </div>
      </div>
    </section>
  );
};
