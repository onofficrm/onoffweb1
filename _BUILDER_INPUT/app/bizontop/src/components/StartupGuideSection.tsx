import React from 'react';
import { 
  Calendar, 
  ListChecks, 
  Calculator, 
  Clock, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  Coins, 
  PhoneCall, 
  Info 
} from 'lucide-react';

interface StartupGuideSectionProps {
  onOpenConsultation: () => void;
  onOpenDiagnosis: () => void;
}

export const StartupGuideSection: React.FC<StartupGuideSectionProps> = ({
  onOpenConsultation,
  onOpenDiagnosis,
}) => {
  const preparationChecklist = [
    { name: '상호', desc: '관할 등기소 내 동일 상호 중복 여부 확인' },
    { name: '본점 주소', desc: '자가 또는 법인 명의 임대차계약서' },
    { name: '자본금', desc: '상법상 100원 이상 (업종별 인허가 기준 고려)' },
    { name: '주주', desc: '자본금을 출자하고 주식을 소유할 구성원' },
    { name: '임원', desc: '대표이사 및 조사보고자(주식 없는 임원 1인)' },
    { name: '사업목적', desc: '현재 영위 및 향후 계획 중인 사업 내용' },
  ];

  return (
    <section
      id="startup-guide-section"
      className="py-16 sm:py-24 bg-white border-b border-slate-100"
      aria-label="법인설립 기간 준비사항 비용 가이드"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 text-[#2563EB] border border-blue-100 mb-3.5">
            <Info className="w-3.5 h-3.5" />
            <span>STARTUP GUIDE</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#0B1F3A] tracking-tight leading-tight">
            법인설립, <br className="hidden sm:inline" />
            무엇을 준비해야 할까요?
          </h2>

          <p className="mt-3.5 text-base sm:text-[17px] text-slate-600 font-normal leading-relaxed">
            복잡해 보이는 법인설립도 기간, 준비서류, 비용 3가지만 명확히 알면
            어려움 없이 시작할 수 있습니다.
          </p>
        </div>

        {/* 3 Large Cards Grid (Mobile stacked, 3 columns on tablet/desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          
          {/* CARD 1: 예상 소요기간 */}
          <div
            id="guide-card-timeline"
            className="bg-[#F7F9FC] rounded-2xl p-7 border border-slate-200/90 hover:border-blue-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Icon & Eyebrow */}
              <div className="w-13 h-13 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#2563EB] shadow-2xs mb-5">
                <Calendar className="w-7 h-7" />
              </div>

              <span className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
                TIMELINE
              </span>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-black text-[#0B1F3A] mt-1 mb-3.5 tracking-tight">
                예상 소요기간
              </h3>

              {/* Content */}
              <p className="text-sm sm:text-[15px] text-slate-700 font-medium leading-relaxed">
                법인 구조 및 서류 준비 후 <br />
                <strong>법인등기 절차</strong>가 진행됩니다.
              </p>

              {/* Informative process illustration */}
              <div className="mt-5 p-3.5 bg-white rounded-xl border border-slate-200/80 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600">서류 및 정관 준비</span>
                  <span className="text-slate-500 font-medium">영업일 기준 1일</span>
                </div>
                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                  <div className="bg-[#2563EB] w-1/3 h-full" />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600">등기소 심사 및 완료</span>
                  <span className="text-[#2563EB] font-bold">평균 3~4영업일</span>
                </div>
                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                  <div className="bg-[#2563EB] w-full h-full" />
                </div>
              </div>
            </div>

            {/* Small Bottom Explanation */}
            <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500 leading-relaxed font-normal">
              상황, 관할기관 및 서류 준비상태에 따라 기간이 달라질 수 있습니다.
            </div>
          </div>

          {/* CARD 2: 기본 준비사항 */}
          <div
            id="guide-card-checklist"
            className="bg-[#F7F9FC] rounded-2xl p-7 border border-slate-200/90 hover:border-blue-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Icon & Eyebrow */}
              <div className="w-13 h-13 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#2563EB] shadow-2xs mb-5">
                <ListChecks className="w-7 h-7" />
              </div>

              <span className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
                CHECKLIST
              </span>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-black text-[#0B1F3A] mt-1 mb-3.5 tracking-tight">
                기본 준비사항
              </h3>

              {/* Checklist 6 Items */}
              <div className="space-y-2">
                {preparationChecklist.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-2.5 p-2 bg-white rounded-lg border border-slate-200/70"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <span className="text-xs sm:text-[13px] font-bold text-[#0B1F3A] shrink-0 w-16">
                      {item.name}
                    </span>
                    <span className="text-[11px] sm:text-xs text-slate-500 truncate font-medium">
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Small Bottom Explanation */}
            <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500 leading-relaxed font-normal">
              비즈온탑 전담 매니저가 6가지 준비사항을 하나씩 체크해 드립니다.
            </div>
          </div>

          {/* CARD 3: 설립비용 */}
          <div
            id="guide-card-cost"
            className="bg-[#F7F9FC] rounded-2xl p-7 border border-slate-200/90 hover:border-blue-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Icon & Eyebrow */}
              <div className="w-13 h-13 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#2563EB] shadow-2xs mb-5">
                <Calculator className="w-7 h-7" />
              </div>

              <span className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
                COST & TAXES
              </span>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-black text-[#0B1F3A] mt-1 mb-3.5 tracking-tight">
                설립비용
              </h3>

              {/* Content */}
              <p className="text-sm sm:text-[15px] text-slate-700 font-medium leading-relaxed">
                자본금, 본점 소재지, <br />
                설립 구조 등에 따라 <br />
                <strong>등록면허세 등 관련 비용</strong>이 달라질 수 있습니다.
              </p>

              {/* Transparent Cost Factors */}
              <div className="mt-4 p-3.5 bg-white rounded-xl border border-slate-200/80 space-y-2 text-xs text-slate-600 font-medium">
                <div className="flex justify-between items-center py-0.5">
                  <span>· 등록면허세 및 지방교육세</span>
                  <span className="font-semibold text-slate-700">본점 소재지별 상이</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span>· 과밀억제권역 여부</span>
                  <span className="font-semibold text-slate-700">3배 중과세 검토</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span>· 법원 증지대 및 대법원 수수료</span>
                  <span className="font-semibold text-slate-700">전자등기 시 절감</span>
                </div>
              </div>
            </div>

            {/* CTA in Card 3: [내 법인 예상비용 상담하기] */}
            <div className="mt-6 pt-4 border-t border-slate-200">
              <button
                type="button"
                id="guide-card-cost-cta"
                onClick={onOpenConsultation}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white font-bold text-sm sm:text-[15px] py-3.5 px-4 rounded-xl shadow-xs hover:shadow-md transition-all duration-200 focus:outline-hidden"
              >
                <PhoneCall className="w-4 h-4 text-white" />
                <span>내 법인 예상비용 상담하기</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
