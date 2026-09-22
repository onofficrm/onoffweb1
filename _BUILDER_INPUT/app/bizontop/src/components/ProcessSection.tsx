import React, { useState } from 'react';
import { 
  SearchCheck, 
  Workflow, 
  Stamp, 
  BriefcaseBusiness, 
  TrendingUp, 
  ArrowRight,
  PhoneCall,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface ProcessSectionProps {
  onOpenConsultation: () => void;
}

interface StepData {
  step: string;
  number: string;
  title: string;
  desc: string;
  keywords: string[];
  icon: React.ElementType;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenConsultation }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps: StepData[] = [
    {
      step: 'STEP 01',
      number: '01',
      title: '현재 상황 진단',
      desc: '사업내용과 현재 상황, 법인을 설립하려는 목적을 먼저 확인합니다.',
      keywords: ['사업형태', '예상매출', '설립목적'],
      icon: SearchCheck,
    },
    {
      step: 'STEP 02',
      number: '02',
      title: '법인 구조 설계',
      desc: '법인 운영에 필요한 기본 구조를 정리합니다.',
      keywords: ['상호', '자본금', '주주', '임원', '지분', '사업목적'],
      icon: Workflow,
    },
    {
      step: 'STEP 03',
      number: '03',
      title: '법인설립 진행',
      desc: '필요한 서류와 절차를 확인하고 법인설립을 진행합니다.',
      keywords: ['서류준비', '법인등기'],
      icon: Stamp,
    },
    {
      step: 'STEP 04',
      number: '04',
      title: '사업 시작 준비',
      desc: '법인설립 이후 사업자등록 등 사업운영에 필요한 사항을 안내합니다.',
      keywords: ['사업자등록', '세무', '노무'],
      icon: BriefcaseBusiness,
    },
    {
      step: 'STEP 05',
      number: '05',
      title: '기업 성장 지원',
      desc: '필요한 기업은 정책자금, 기업인증, 연구소, 벤처기업 등 추가적인 기업 성장제도를 검토합니다.',
      keywords: ['정책자금', '기업인증', '기업부설연구소', '벤처기업'],
      icon: TrendingUp,
    },
  ];

  return (
    <section
      id="how-it-works"
      className="w-full bg-[#F7F9FC] py-16 sm:py-20 lg:py-24 border-b border-slate-200/80 scroll-mt-20"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div
            id="process-eyebrow"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[12px] sm:text-[13px] font-semibold tracking-wider mb-3.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span>HOW IT WORKS</span>
          </div>
          <h2
            id="process-main-title"
            className="text-[28px] sm:text-[36px] md:text-[40px] font-black text-[#0B1F3A] tracking-tight leading-[1.25] mb-4"
          >
            복잡한 법인설립,
            <br />
            5단계로 쉽게 진행합니다.
          </h2>
          <p
            id="process-description"
            className="text-[15px] sm:text-[16.5px] text-slate-600 leading-relaxed max-w-2xl mx-auto"
          >
            처음 법인을 만드는 분도 현재 어느 단계인지 쉽게 알 수 있도록
            <br className="hidden sm:inline" />
            법인설립 과정을 체계적으로 안내합니다.
          </p>
        </div>

        {/* Desktop / Large Screen: Horizontal Connected Step Flow */}
        <div className="hidden lg:block mb-14">
          {/* Top Progress Track */}
          <div className="relative mb-6">
            <div className="absolute top-1/2 left-0 w-full h-[3px] bg-slate-200 -translate-y-1/2 z-0" />
            <div
              className="absolute top-1/2 left-0 h-[3px] bg-blue-600 -translate-y-1/2 transition-all duration-300 z-0"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            />

            <div className="relative z-10 flex justify-between">
              {steps.map((item, idx) => {
                const isCurrent = activeStep === idx;
                const isPassed = activeStep >= idx;
                const Icon = item.icon;

                return (
                  <button
                    key={item.number}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className="group flex flex-col items-center focus:outline-hidden"
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-[18px] transition-all duration-200 ${
                        isCurrent
                          ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-500/30 ring-4 ring-blue-100 scale-110'
                          : isPassed
                          ? 'bg-[#0B1F3A] text-white'
                          : 'bg-white text-slate-400 border-2 border-slate-200 group-hover:border-blue-300'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`mt-2 text-[12px] font-bold tracking-wider ${
                        isCurrent ? 'text-blue-600' : 'text-slate-500'
                      }`}
                    >
                      {item.step}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5 Cards Grid in Desktop */}
          <div className="grid grid-cols-5 gap-4">
            {steps.map((item, idx) => {
              const isSelected = activeStep === idx;

              return (
                <div
                  key={item.number}
                  onClick={() => setActiveStep(idx)}
                  className={`p-5 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col justify-between border ${
                    isSelected
                      ? 'bg-white border-blue-500 shadow-md ring-1 ring-blue-500/20 -translate-y-1'
                      : 'bg-white/80 hover:bg-white border-slate-200/90 hover:border-blue-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[28px] font-black tracking-tight text-[#0B1F3A]/20">
                        {item.number}
                      </span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                      )}
                    </div>

                    <h3 className="text-[17px] font-bold text-[#0B1F3A] mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-slate-600 leading-relaxed mb-4 min-h-[48px]">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {item.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile / Tablet: Vertical Timeline Flow */}
        <div className="lg:hidden relative pl-6 sm:pl-8 space-y-6 mb-12">
          {/* Vertical Progress Line */}
          <div className="absolute top-4 left-3.5 sm:left-4.5 bottom-6 w-[2px] bg-slate-200 -translate-x-1/2" />

          {steps.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = activeStep === idx;

            return (
              <div
                key={item.number}
                onClick={() => setActiveStep(idx)}
                className="relative cursor-pointer"
              >
                {/* Timeline Node */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-4 w-7 h-7 rounded-full flex items-center justify-center -translate-x-1/2 transition-colors ${
                    isSelected
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-xs'
                      : 'bg-white text-slate-400 border-2 border-slate-300'
                  }`}
                >
                  <span className="text-[11px] font-bold">{item.number}</span>
                </div>

                {/* Card Content */}
                <div
                  className={`p-5 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-white border-blue-500 shadow-md ring-1 ring-blue-500/20'
                      : 'bg-white border-slate-200/90'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px] font-bold text-blue-600 tracking-wider">
                      {item.step}
                    </span>
                    <Icon className="w-4 h-4 text-slate-400" />
                  </div>

                  <h3 className="text-[17px] font-bold text-[#0B1F3A] mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-[13.5px] text-slate-600 leading-relaxed mb-3">
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-slate-100">
                    {item.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="text-[11.5px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
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

        {/* CTA Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 text-center">
          <button
            id="process-cta-btn"
            type="button"
            onClick={onOpenConsultation}
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-[16px] font-bold text-white bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all cursor-pointer focus:ring-4 focus:ring-blue-500/20"
          >
            <PhoneCall className="w-4.5 h-4.5" />
            <span>무료상담 신청하기</span>
            <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
