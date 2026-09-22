import React from 'react';
import { Sparkles, ArrowRight, PhoneCall, ShieldCheck, Check } from 'lucide-react';
import { IncorporationStepsCard } from './IncorporationStepsCard.tsx';

interface HeroSectionProps {
  onOpenDiagnosis: () => void;
  onOpenConsultation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenDiagnosis,
  onOpenConsultation,
}) => {
  return (
    <section
      id="hero-section"
      className="relative w-full pt-10 sm:pt-16 md:pt-20 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-b from-[#F7F9FC] via-[#F1F5F9] to-white"
    >
      {/* Subtle Background Accent Lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-20 left-10 w-[500px] h-[500px] bg-indigo-50/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-[1560px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Small Eyebrow */}
            <div
              id="hero-eyebrow"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-[12.5px] sm:text-[13.5px] font-semibold tracking-wider mb-5"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>CORPORATE STARTUP CONSULTING</span>
              <span className="text-blue-300 font-light">|</span>
              <span className="text-blue-800 font-bold">법인설립 전문 컨설팅</span>
            </div>

            {/* Main Headline */}
            <h1
              id="hero-main-title"
              className="text-[38px] sm:text-[48px] md:text-[54px] lg:text-[56px] xl:text-[62px] font-black text-[#0B1F3A] leading-[1.15] tracking-tight mb-5"
            >
              법인설립,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B1F3A] via-[#2563EB] to-[#1D4ED8]">
                어렵게 시작하지 마세요.
              </span>
            </h1>

            {/* Emphasis Sentence */}
            <p
              id="hero-emphasis"
              className="text-[20px] sm:text-[23px] md:text-[25px] font-bold text-slate-800 leading-snug mb-4"
            >
              사업에 맞는 법인 구조부터
              <br className="hidden sm:inline" /> 설립 이후{' '}
              <span className="text-[#2563EB] relative inline-block">
                기업 성장까지
                <span className="absolute bottom-0.5 left-0 w-full h-[8px] bg-blue-100/80 -z-10 rounded-sm" />
              </span>{' '}
              함께합니다.
            </p>

            {/* Description */}
            <p
              id="hero-description"
              className="text-[16px] sm:text-[17.5px] text-slate-600 leading-relaxed max-w-[720px] mb-8"
            >
              상호, 자본금, 주주, 임원, 사업목적 등 법인설립에 필요한 준비사항을
              알기 쉽게 안내하고, 설립 이후 필요한 정책자금과 기업인증까지 함께
              검토합니다.
            </p>

            {/* Quick Benefits Bullet Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-[680px] mb-9 text-[14px] sm:text-[14.5px] text-slate-700 font-medium">
              <div className="flex items-center gap-2.5 bg-white/90 backdrop-blur-xs px-3.5 py-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>전자등기 원스톱으로 방문 없이 완료</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/90 backdrop-blur-xs px-3.5 py-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>초기 지분구조 & 정관 특약 1:1 맞춤 검토</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/90 backdrop-blur-xs px-3.5 py-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>설립 후 첫 정책자금 매칭 로드맵 제공</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/90 backdrop-blur-xs px-3.5 py-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>과밀억제권역 등록면허세 감면 사전 진단</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              {/* Primary CTA */}
              <button
                id="hero-primary-cta"
                type="button"
                onClick={onOpenDiagnosis}
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4.5 rounded-xl text-[16.5px] font-bold text-white bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transition-all cursor-pointer focus:outline-hidden focus:ring-4 focus:ring-blue-500/20"
              >
                <Sparkles className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
                <span>3분 법인설립 진단하기</span>
                <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary CTA */}
              <button
                id="hero-secondary-cta"
                type="button"
                onClick={onOpenConsultation}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4.5 rounded-xl text-[16.5px] font-semibold text-[#0B1F3A] bg-white hover:bg-slate-50 border border-slate-300/90 hover:border-slate-400 active:bg-slate-100 shadow-xs hover:shadow-sm transition-all cursor-pointer focus:outline-hidden focus:ring-4 focus:ring-slate-200"
              >
                <PhoneCall className="w-4.5 h-4.5 text-blue-600" />
                <span>무료상담 신청하기</span>
              </button>
            </div>

            {/* Sub-caption below buttons */}
            <div
              id="hero-subcaption"
              className="mt-4.5 flex items-center gap-2 text-[13.5px] text-slate-500 font-medium"
            >
              <ShieldCheck className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
              <span>법인설립 준비서류 · 예상기간 · 절차 · 설립 이후 준비사항 맞춤 안내</span>
            </div>
          </div>

          {/* Right Column: Interactive Step Visual */}
          <div className="lg:col-span-5 w-full">
            <IncorporationStepsCard />
          </div>
        </div>
      </div>
    </section>
  );
};
