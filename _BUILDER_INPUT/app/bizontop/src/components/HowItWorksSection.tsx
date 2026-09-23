import React, { useState } from 'react';
import { 
  CheckCircle, 
  ArrowRight, 
  PhoneCall, 
  Compass, 
  Layers, 
  FileText, 
  Rocket, 
  TrendingUp, 
  ChevronRight, 
  Sparkles 
} from 'lucide-react';

interface HowItWorksSectionProps {
  onOpenConsultation: () => void;
}

interface StepItem {
  step: string;
  title: string;
  description: string;
  keywords: string[];
  icon: React.ReactNode;
}

const STEPS: StepItem[] = [
  {
    step: '01',
    title: '현재 상황 진단',
    description: '사업내용과 현재 상황, 법인을 설립하려는 목적을 먼저 확인합니다.',
    keywords: ['사업형태', '예상매출', '설립목적'],
    icon: <Compass className="w-5 h-5 text-[#2563EB]" />,
  },
  {
    step: '02',
    title: '법인 구조 설계',
    description: '법인 운영에 필요한 기본 구조를 정리합니다.',
    keywords: ['상호', '자본금', '주주', '임원', '지분', '사업목적'],
    icon: <Layers className="w-5 h-5 text-[#2563EB]" />,
  },
  {
    step: '03',
    title: '법인설립 진행',
    description: '필요한 서류와 절차를 확인하고 법인설립을 진행합니다.',
    keywords: ['서류준비', '법인등기'],
    icon: <FileText className="w-5 h-5 text-[#2563EB]" />,
  },
  {
    step: '04',
    title: '사업 시작 준비',
    description: '법인설립 이후 사업자등록 등 사업운영에 필요한 사항을 안내합니다.',
    keywords: ['사업자등록', '세무', '노무'],
    icon: <Rocket className="w-5 h-5 text-[#2563EB]" />,
  },
  {
    step: '05',
    title: '기업 성장 지원',
    description: '필요한 기업은 정책자금, 기업인증, 연구소, 벤처기업 등 추가적인 기업 성장제도를 검토합니다.',
    keywords: ['정책자금', '기업인증', '기업부설연구소', '벤처기업'],
    icon: <TrendingUp className="w-5 h-5 text-[#2563EB]" />,
  },
];

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onOpenConsultation,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section
      id="how-it-works-section"
      className="py-16 sm:py-24 bg-white border-b border-slate-200/80"
      aria-label="비즈온탑 법인설립 5단계 진행 과정"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 text-[#2563EB] border border-blue-100 mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>HOW IT WORKS</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#0B1F3A] tracking-tight leading-tight">
            복잡한 법인설립, <br className="hidden sm:inline" />
            5단계로 쉽게 진행합니다.
          </h2>

          <p className="mt-3.5 text-base sm:text-[17px] text-slate-600 font-normal leading-relaxed">
            처음 법인을 만드는 분도 현재 어느 단계인지 쉽게 알 수 있도록 <br className="hidden sm:inline" />
            법인설립 과정을 체계적으로 안내합니다.
          </p>
        </div>

        {/* Desktop View: 가로형 Step Process with Progress Line */}
        <div className="hidden lg:block relative mb-12">
          {/* Background Connecting Line */}
          <div className="absolute top-10 left-[8%] right-[8%] h-[3px] bg-slate-200 -z-0">
            <div 
              className="h-full bg-[#2563EB] transition-all duration-300"
              style={{ width: `${(activeStep / (STEPS.length - 1)) * 100}%` }}
            />
          </div>

          {/* 5 Steps Grid */}
          <div className="grid grid-cols-5 gap-4 relative z-10">
            {STEPS.map((item, index) => {
              const isSelected = activeStep === index;
              const isPast = activeStep > index;

              return (
                <div
                  key={item.step}
                  id={`desktop-step-${item.step}`}
                  onClick={() => setActiveStep(index)}
                  className={`group bg-white rounded-2xl p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between select-none ${
                    isSelected
                      ? 'border-[#2563EB] ring-2 ring-blue-500/20 shadow-lg -translate-y-1'
                      : isPast
                      ? 'border-slate-300 hover:border-blue-400 bg-slate-50/40'
                      : 'border-slate-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* Top: Large Step Number Circle */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg transition-all ${
                          isSelected
                            ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/30'
                            : isPast
                            ? 'bg-blue-100 text-[#2563EB]'
                            : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-[#2563EB]'
                        }`}
                      >
                        {item.step}
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                        {item.icon}
                      </div>
                    </div>

                    <div className="text-[11px] font-bold tracking-wider text-[#2563EB] uppercase mb-1">
                      STEP {item.step}
                    </div>

                    {/* Step Title */}
                    <h3 className="text-lg font-bold text-[#0B1F3A] mb-2 tracking-tight">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal min-h-[48px]">
                      {item.description}
                    </p>
                  </div>

                  {/* Keywords Pills */}
                  <div className="mt-4 pt-3.5 border-t border-slate-100">
                    <div className="flex flex-wrap gap-1">
                      {item.keywords.map((kw) => (
                        <span
                          key={kw}
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                            isSelected
                              ? 'bg-blue-50 text-[#2563EB] border border-blue-200'
                              : 'bg-slate-100/80 text-slate-600'
                          }`}
                        >
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile & Tablet View: 세로 Timeline 형태 */}
        <div className="lg:hidden relative pl-6 sm:pl-8 space-y-6 mb-12">
          {/* Vertical Timeline Progress Bar */}
          <div className="absolute left-[19px] sm:left-[27px] top-4 bottom-4 w-[2px] bg-slate-200 -z-0" />

          {STEPS.map((item, index) => {
            const isSelected = activeStep === index;

            return (
              <div
                key={item.step}
                id={`mobile-step-${item.step}`}
                onClick={() => setActiveStep(index)}
                className={`relative bg-[#F7F9FC] rounded-2xl p-5 sm:p-6 border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#2563EB] bg-white ring-2 ring-blue-500/20 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Timeline node icon */}
                <div
                  className={`absolute -left-[30px] sm:-left-[38px] top-5 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 border-white shadow-xs ${
                    isSelected
                      ? 'bg-[#2563EB] text-white ring-4 ring-blue-100'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {item.step}
                </div>

                <div className="flex items-center justify-between mb-2">
                  <div className="inline-flex items-center gap-2">
                    <span className="text-xs font-bold text-[#2563EB] uppercase">
                      STEP {item.step}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#0B1F3A]">
                      {item.title}
                    </h3>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white border border-slate-200">
                    {item.icon}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-3">
                  {item.description}
                </p>

                {/* Keywords */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200/60">
                  {item.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Bottom CTA: [법인설립 상담 시작하기] */}
        <div className="text-center">
          <button
            type="button"
            id="how-it-works-cta"
            onClick={onOpenConsultation}
            className="inline-flex items-center justify-center gap-2.5 bg-[#2563EB] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white font-bold text-base sm:text-[17px] px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]/40 group"
          >
            <PhoneCall className="w-4 h-4 text-white" />
            <span>법인설립 상담 시작하기</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
          </button>
          
          <p className="mt-3 text-xs sm:text-sm text-slate-500 font-medium">
            비즈온탑 전담 매니저가 1단계부터 5단계까지 전 과정을 1:1로 밀착 가이드합니다.
          </p>
        </div>

      </div>
    </section>
  );
};
