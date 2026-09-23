import React from 'react';
import { 
  Building2, 
  Users2, 
  Rocket, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Workflow, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { ConsultingCaseItem } from '../types';

interface ConsultingCasesSectionProps {
  onOpenConsultation: (category: string) => void;
}

const CASES: ConsultingCaseItem[] = [
  {
    id: 'case-01',
    caseNo: '01',
    clientType: '온라인 쇼핑몰 운영기업',
    title: '개인사업자 → 법인전환',
    situation: '사업규모가 증가하면서 법인전환을 검토',
    concerns: ['법인전환 시점', '주주구성', '향후 기업운영'],
    processSteps: ['현황검토', '법인구조 검토', '법인설립', '후속 기업지원 상담'],
  },
  {
    id: 'case-02',
    caseNo: '02',
    clientType: '3인 공동창업',
    title: '공동창업 법인설립',
    situation: '3명의 창업자가 신규 사업을 공동으로 준비',
    concerns: ['대표자', '주주', '임원', '지분구조'],
    processSteps: ['사업구조 확인', '지분 및 임원 구성 검토', '법인설립'],
  },
  {
    id: 'case-03',
    caseNo: '03',
    clientType: '스타트업',
    title: '투자유치 준비 법인',
    situation: '서비스 출시와 향후 투자유치를 준비',
    concerns: ['초기 주주구조', '자본금', '향후 투자구조'],
    processSteps: ['설립목적 확인', '법인구조 검토', '법인설립', '기업성장 상담'],
  },
];

export const ConsultingCasesSection: React.FC<ConsultingCasesSectionProps> = ({
  onOpenConsultation,
}) => {
  const getCaseIcon = (clientType: string) => {
    switch (clientType) {
      case '온라인 쇼핑몰 운영기업':
        return <Building2 className="w-5 h-5 text-[#2563EB]" />;
      case '3인 공동창업':
        return <Users2 className="w-5 h-5 text-[#2563EB]" />;
      case '스타트업':
        return <Rocket className="w-5 h-5 text-[#2563EB]" />;
      default:
        return <Workflow className="w-5 h-5 text-[#2563EB]" />;
    }
  };

  return (
    <section
      id="consulting-cases-section"
      className="py-16 sm:py-24 bg-white border-b border-slate-200/80"
      aria-label="실제 컨설팅 진행 사례"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 text-[#2563EB] border border-blue-200 mb-3.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>CONSULTING CASES</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#0B1F3A] tracking-tight leading-tight">
            기업마다 상황이 다르기 때문에 <br className="hidden sm:inline" />
            진행 방법도 달라집니다.
          </h2>

          <p className="mt-3.5 text-base sm:text-[17px] text-slate-600 font-normal leading-relaxed">
            사업형태와 향후 계획에 맞춰 <br className="sm:hidden" />
            법인설립 및 기업 성장 방향을 함께 검토합니다.
          </p>
        </div>

        {/* 3 Case Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-10">
          {CASES.map((item) => (
            <div
              key={item.id}
              id={`case-card-${item.caseNo}`}
              className="bg-[#F7F9FC] rounded-2xl p-6 sm:p-7 border border-slate-200 hover:border-blue-300 hover:bg-white transition-all duration-200 flex flex-col justify-between hover:shadow-lg group"
            >
              <div>
                {/* Header: Case No & Client Type */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-black text-xs text-[#2563EB] shadow-2xs">
                      {item.caseNo}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700">
                      {item.clientType}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-slate-200">
                    {getCaseIcon(item.clientType)}
                  </div>
                </div>

                {/* Case Title */}
                <h3 className="text-xl font-black text-[#0B1F3A] tracking-tight mb-4 group-hover:text-[#2563EB] transition-colors">
                  {item.title}
                </h3>

                {/* Situation Block */}
                <div className="mb-5 pb-4 border-b border-slate-200/80">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                    <span>상황</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                    {item.situation}
                  </p>
                </div>

                {/* Key Concerns */}
                <div className="mb-5 pb-4 border-b border-slate-200/80">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    주요 고민
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.concerns.map((concern) => (
                      <span
                        key={concern}
                        className="text-xs font-bold px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700"
                      >
                        #{concern}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Process Steps Flow */}
                <div className="mb-6">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Workflow className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>진행 단계</span>
                  </div>
                  <div className="space-y-1.5">
                    {item.processSteps.map((step, sIdx) => (
                      <div key={step} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <span className="w-4 h-4 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center text-[10px] font-bold shrink-0">
                          {sIdx + 1}
                        </span>
                        <span className="text-slate-800">{step}</span>
                        {sIdx < item.processSteps.length - 1 && (
                          <ArrowRight className="w-3 h-3 text-slate-300 ml-auto shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenConsultation(`${item.title} 유사 사례 상담`)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-[#0B1F3A] hover:text-[#2563EB] font-bold text-xs sm:text-sm transition-all shadow-2xs"
                >
                  <span>이와 유사한 사례 상담하기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footnote & Policy Notice */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center max-w-3xl mx-auto flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
          <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
          <span>
            본 내용은 비즈온탑의 실제 상담 유형 및 프로세스를 바탕으로 구성된 상담 유형 예시이며, 고객사의 정보 보호를 위해 익명화 처리되었습니다.
          </span>
        </div>

      </div>
    </section>
  );
};
