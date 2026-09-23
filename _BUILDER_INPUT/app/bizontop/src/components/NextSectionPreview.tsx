import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ArrowRight, 
  PhoneCall, 
  CheckCircle, 
  ShieldAlert, 
  Calculator, 
  FileSearch 
} from 'lucide-react';

interface NextSectionPreviewProps {
  onOpenDiagnosis: () => void;
  onOpenConsultation: () => void;
}

export const NextSectionPreview: React.FC<NextSectionPreviewProps> = ({
  onOpenDiagnosis,
  onOpenConsultation,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const keyQuestions = [
    {
      q: '자본금은 얼마로 시작하는 것이 가장 유리할까요?',
      a: '상법상 100원부터 가능하지만, 일반적인 업종은 100만원~1,000만원 내외를 권장합니다. 추후 법인계좌 개설, 사업자등록, 정책자금 및 보증 신청 시 공신력과 업종별 법정 기준(예: 건설업, 여행업 등)을 함께 고려하여 비즈온탑에서 맞춤 자본금을 조언해 드립니다.',
      tag: '자본금 설정'
    },
    {
      q: '창업중소기업 세액감면(최대 100%)을 받을 수 있나요?',
      a: '만 34세 이하 청년 창업자이거나 수도권 과밀억제권역 외 지역에서 특정 감면 대상 업종(IT, 제조업, 연구개발 등)으로 최초 창업하는 경우, 최대 5년간 법인세 50%~100% 감면 혜택을 받을 수 있습니다. 설립 전 업종코드와 본점 소재지를 사전 검토하는 것이 필수적입니다.',
      tag: '절세 혜택'
    },
    {
      q: '주주와 대표이사는 반드시 나누어야 하나요?',
      a: '1인 단독 법인도 가능하지만, 등기 시 주식이 없는 임원(감사 또는 이사 1인)이 조사보고자로 참여해야 공증 비용 수수료(수십만 원 상당)를 절약할 수 있습니다. 비즈온탑이 가장 간소하고 안전한 지분 구조를 직접 세팅해 드립니다.',
      tag: '주주·임원 구성'
    }
  ];

  return (
    <section
      id="next-section"
      className="py-14 sm:py-20 bg-[#F7F9FC]"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#2563EB] mb-2">
              <HelpCircle className="w-4 h-4" />
              <span>초보 대표님이 가장 많이 궁금해하는 질문</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B1F3A] tracking-tight">
              법인설립 전, 이것만 확인해도 수백만 원을 아낍니다.
            </h2>
          </div>
          <p className="text-sm text-slate-500 font-medium max-w-md">
            사전 검토 없이 등기부터 진행하면 정관 변경, 증자, 세무 과태료 등 불필요한 비용이 발생합니다.
          </p>
        </div>

        {/* 3 Core Questions Accordion */}
        <div className="grid grid-cols-1 gap-3.5 mb-12">
          {keyQuestions.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors focus:outline-hidden"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="w-7 h-7 rounded-lg bg-blue-50 text-[#2563EB] font-bold text-xs flex items-center justify-center shrink-0">
                      Q{idx + 1}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-[#0B1F3A]">
                      {item.q}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {item.tag}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#2563EB]' : ''
                      }`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-slate-600 font-medium text-sm sm:text-[15px] leading-relaxed border-t border-slate-100 bg-slate-50/40">
                    <p className="p-4 bg-white rounded-lg border border-slate-200/80">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Unified Bottom Conversion Banner with the Two Core CTAs */}
        <div className="bg-gradient-to-r from-[#0B1F3A] to-[#13335f] text-white rounded-2xl p-7 sm:p-10 shadow-xl relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-blue-200 border border-white/10 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F4A62A]" />
                설립 전 3분 필수 체크
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-tight text-white">
                내 사업에 딱 맞는 법인설립 조건, <br className="hidden sm:inline" />
                지금 바로 확인해보세요.
              </h3>
              <p className="mt-2 text-slate-300 text-sm sm:text-base font-normal">
                상호 등록 가능 여부부터 예상 설립 기간, 절세 혜택까지 한눈에 진단해 드립니다.
              </p>
            </div>

            {/* Unified 2 CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
              {/* CTA 1: 3분 법인설립 진단하기 */}
              <button
                type="button"
                id="preview-cta-diagnosis"
                onClick={onOpenDiagnosis}
                className="inline-flex items-center justify-center gap-2 bg-[#F4A62A] hover:bg-[#e0941f] text-[#0B1F3A] font-bold text-sm sm:text-base px-5 py-3.5 rounded-xl shadow-md transition-colors duration-150 focus:outline-hidden"
              >
                <span>3분 법인설립 진단하기</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* CTA 2: 무료상담 신청하기 */}
              <button
                type="button"
                id="preview-cta-consultation"
                onClick={onOpenConsultation}
                className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/20 font-bold text-sm sm:text-base px-5 py-3.5 rounded-xl transition-colors duration-150 focus:outline-hidden"
              >
                <PhoneCall className="w-4 h-4 text-blue-300" />
                <span>무료상담 신청하기</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
