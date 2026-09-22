import React from 'react';
import { 
  Calendar, 
  ListChecks, 
  Calculator, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Info,
  Building
} from 'lucide-react';

interface GuideSectionProps {
  onOpenConsultation: () => void;
}

export const GuideSection: React.FC<GuideSectionProps> = ({ onOpenConsultation }) => {
  const checklistItems = [
    { name: '상호', desc: '관할 등기소 내 중복 여부 확인' },
    { name: '본점 주소', desc: '사업자등록 가능 임대차계약' },
    { name: '자본금', desc: '100원 이상 (1,000~3,000만 원 권장)' },
    { name: '주주', desc: '자본금을 출자한 주식 소유자' },
    { name: '임원', desc: '이사/감사 (지분 없는 임원 1인 권장)' },
    { name: '사업목적', desc: '현재 및 향후 영위할 구체적 업종' },
  ];

  return (
    <section
      id="support"
      className="w-full bg-white py-16 sm:py-20 lg:py-24 border-b border-slate-200/80 scroll-mt-20"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div
            id="guide-eyebrow"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[12px] sm:text-[13px] font-semibold tracking-wider mb-3.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span>STARTUP GUIDE</span>
          </div>
          <h2
            id="guide-main-title"
            className="text-[28px] sm:text-[36px] md:text-[40px] font-black text-[#0B1F3A] tracking-tight leading-[1.25] mb-4"
          >
            법인설립,
            <br />
            무엇을 준비해야 할까요?
          </h2>
          <p
            id="guide-description"
            className="text-[15px] sm:text-[16.5px] text-slate-600 leading-relaxed max-w-2xl mx-auto"
          >
            복잡해 보이는 법인설립 절차도 필수 준비사항과 프로세스를 미리 확인하면
            불필요한 시행착오와 추가 비용을 방지할 수 있습니다.
          </p>
        </div>

        {/* 3 Large Guide Cards Grid */}
        <div
          id="guide-cards-grid"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 mb-12"
        >
          {/* CARD 1: 예상 소요기간 */}
          <div
            id="guide-card-duration"
            className="bg-[#F7F9FC] rounded-2xl p-7 sm:p-8 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              {/* Header Icon & Title */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/80 flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="text-[12px] font-bold text-blue-600 bg-white border border-slate-200 px-3 py-1 rounded-full">
                  STEP 01
                </span>
              </div>

              <h3 className="text-[20px] sm:text-[22px] font-bold text-[#0B1F3A] mb-3">
                예상 소요기간
              </h3>

              <p className="text-[15px] text-slate-700 leading-relaxed mb-6 font-medium">
                법인 구조 및 서류 준비 후 법인등기 절차가 진행됩니다.
              </p>

              {/* Visual Flow Indicator */}
              <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200/70 mb-6">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="font-semibold text-slate-700">1. 서류 및 정관 준비</span>
                  <span className="text-blue-600 font-bold">1~2일</span>
                </div>
                <div className="h-px bg-slate-100" />
                <div className="flex items-center justify-between text-[13px]">
                  <span className="font-semibold text-slate-700">2. 등기소 전자등기 심사</span>
                  <span className="text-blue-600 font-bold">2~3일</span>
                </div>
                <div className="h-px bg-slate-100" />
                <div className="flex items-center justify-between text-[13px]">
                  <span className="font-semibold text-slate-700">3. 사업자등록증 발급</span>
                  <span className="text-blue-600 font-bold">당일~1일</span>
                </div>
              </div>
            </div>

            {/* Bottom Sub-caption */}
            <div className="pt-4 border-t border-slate-200/80 flex items-start gap-2 text-[12.5px] text-slate-500">
              <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>
                상황, 관할기관 및 서류 준비상태에 따라 기간이 달라질 수 있습니다.
              </span>
            </div>
          </div>

          {/* CARD 2: 기본 준비사항 */}
          <div
            id="guide-card-checklist"
            className="bg-[#F7F9FC] rounded-2xl p-7 sm:p-8 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              {/* Header Icon & Title */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200/80 flex items-center justify-center">
                  <ListChecks className="w-6 h-6" />
                </div>
                <span className="text-[12px] font-bold text-indigo-600 bg-white border border-slate-200 px-3 py-1 rounded-full">
                  STEP 02
                </span>
              </div>

              <h3 className="text-[20px] sm:text-[22px] font-bold text-[#0B1F3A] mb-3">
                기본 준비사항
              </h3>

              <p className="text-[15px] text-slate-700 leading-relaxed mb-5 font-medium">
                설립 전 아래 6가지 기본 정보가 확정되어야 등기가 가능합니다.
              </p>

              {/* 6 Checklist items */}
              <div className="space-y-2 bg-white p-4 rounded-xl border border-slate-200/70 mb-6">
                {checklistItems.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between py-1 text-[13px]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="font-bold text-[#0B1F3A]">{item.name}</span>
                    </div>
                    <span className="text-[12px] text-slate-500 font-medium">
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Sub-caption */}
            <div className="pt-4 border-t border-slate-200/80 flex items-start gap-2 text-[12.5px] text-slate-500">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>
                상호 중복 및 사업목적 구성은 비즈온탑에서 사전 무료 검토를 지원합니다.
              </span>
            </div>
          </div>

          {/* CARD 3: 설립비용 */}
          <div
            id="guide-card-cost"
            className="bg-[#F7F9FC] rounded-2xl p-7 sm:p-8 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              {/* Header Icon & Title */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/80 flex items-center justify-center">
                  <Calculator className="w-6 h-6" />
                </div>
                <span className="text-[12px] font-bold text-amber-700 bg-white border border-slate-200 px-3 py-1 rounded-full">
                  STEP 03
                </span>
              </div>

              <h3 className="text-[20px] sm:text-[22px] font-bold text-[#0B1F3A] mb-3">
                설립비용
              </h3>

              <p className="text-[15px] text-slate-700 leading-relaxed mb-5 font-medium">
                자본금, 본점 소재지, 설립 구조 등에 따라 등록면허세 등 관련 비용이 달라질 수 있습니다.
              </p>

              {/* Key Cost Variables Informational Box */}
              <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200/70 mb-6 text-[13px]">
                <div className="flex items-start gap-2 text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <div>
                    <span className="font-bold text-[#0B1F3A]">공과금(등록면허세/교육세):</span>
                    <p className="text-[12px] text-slate-500 mt-0.5">
                      자본금 규모 및 과밀억제권역 해당 여부(중과세/감면)에 따라 차등 산정
                    </p>
                  </div>
                </div>
                <div className="h-px bg-slate-100" />
                <div className="flex items-start gap-2 text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <div>
                    <span className="font-bold text-[#0B1F3A]">등기 수수료 & 부대비용:</span>
                    <p className="text-[12px] text-slate-500 mt-0.5">
                      전자등기 여부, 인감증명 및 법인도장 제작 등 실비
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button in Card 3 */}
            <div className="pt-4 border-t border-slate-200/80">
              <button
                id="guide-cost-cta-btn"
                type="button"
                onClick={onOpenConsultation}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-[14.5px] font-bold text-white bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 shadow-xs transition-all cursor-pointer"
              >
                <span>무료상담 신청하기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
