import React from 'react';
import { ArrowRight, CheckCircle, Clock, ShieldCheck, Sparkles, PhoneCall } from 'lucide-react';
import { InteractiveProcessCard } from './InteractiveProcessCard';

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
      className="relative pt-8 pb-14 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24 bg-gradient-to-b from-white via-[#F7F9FC] to-[#F7F9FC] overflow-hidden"
    >
      {/* Background subtle ambient geometry */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[550px] pointer-events-none -z-10">
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute top-40 right-10 w-[420px] h-[420px] bg-slate-200/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Small Eyebrow: CORPORATE STARTUP CONSULTING | 법인설립 전문 컨설팅 */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-[13px] font-bold tracking-wide uppercase bg-blue-50 text-[#2563EB] border border-blue-200/70 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                CORPORATE STARTUP CONSULTING
                <span className="text-slate-300 font-light">|</span>
                <span className="text-[#0B1F3A] font-semibold">법인설립 전문 컨설팅</span>
              </span>
            </div>

            {/* Main Title: 법인설립, 어렵게 시작하지 마세요. */}
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#0B1F3A] tracking-tight leading-[1.25] sm:leading-[1.2]">
              법인설립, <br className="hidden sm:inline" />
              <span className="text-[#0B1F3A]">어렵게 시작하지 마세요.</span>
            </h1>

            {/* Highlight Sentence: 사업에 맞는 법인 구조부터 설립 이후 기업 성장까지 함께합니다. */}
            <p className="mt-4 sm:mt-5 text-lg sm:text-xl font-bold text-[#2563EB] tracking-tight">
              사업에 맞는 법인 구조부터 설립 이후 기업 성장까지 함께합니다.
            </p>

            {/* Description Paragraph */}
            <p className="mt-3.5 sm:mt-4 text-base sm:text-[17px] text-slate-600 font-normal leading-relaxed max-w-[620px]">
              상호, 자본금, 주주, 임원, 사업목적 등 법인설립에 필요한 준비사항을 알기 쉽게 안내하고,
              설립 이후 필요한 정책자금과 기업인증까지 함께 검토합니다.
            </p>

            {/* Key Value Micro-pills for First-time Founders */}
            <div className="mt-5 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-[13px] text-slate-600 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#2563EB]" />
                <span>복잡한 법무용어 쉬운 해설</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#2563EB]" />
                <span>비대면 100% 전자등기 가능</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#F4A62A]" />
                <span>창업세액감면(최대 100%) 사전 검토</span>
              </div>
            </div>

            {/* CTA Buttons: Primary & Secondary */}
            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
              {/* Primary CTA: [3분 법인설립 진단하기] */}
              <button
                type="button"
                id="hero-cta-diagnosis"
                onClick={onOpenDiagnosis}
                className="group relative inline-flex items-center justify-center gap-2.5 bg-[#0B1F3A] hover:bg-[#142d50] active:bg-[#071426] text-white font-bold text-base sm:text-[16px] px-6 py-3.5 sm:py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-[#0B1F3A]/40"
              >
                <span>3분 법인설립 진단하기</span>
                <ArrowRight className="w-4 h-4 text-[#F4A62A] group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary CTA: [전문가 무료상담] */}
              <button
                type="button"
                id="hero-cta-consultation"
                onClick={onOpenConsultation}
                className="inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white font-bold text-base sm:text-[16px] px-6 py-3.5 sm:py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]/40"
              >
                <PhoneCall className="w-4 h-4 text-white" />
                <span>전문가 무료상담</span>
              </button>
            </div>

            {/* Subtext beneath buttons */}
            <p className="mt-3 text-xs sm:text-[13px] text-slate-500 font-medium tracking-tight">
              법인설립 준비서류 · 예상기간 · 절차 · 설립 이후 준비사항 안내
            </p>
          </div>

          {/* Right Column: Hero Visual - Interactive 5-Step Process Card */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <InteractiveProcessCard />
          </div>

        </div>
      </div>
    </section>
  );
};
