import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  PhoneCall, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  MessageCircleQuestion, 
  Clock 
} from 'lucide-react';
import { FaqItem } from '../types';

interface FaqSectionProps {
  onOpenConsultation: () => void;
  onOpenDiagnosis: () => void;
}

const FAQS: FaqItem[] = [
  {
    id: 'faq-01',
    category: '설립절차',
    question: '법인설립은 보통 얼마나 걸리나요?',
    answer: '기본 서류 준비 및 정관 작성이 완료된 후, 관할 등기소에 법인설립 등기 신청 시 영업일 기준 보통 3~5일 정도 소요됩니다. 다만 관할 등기소의 사정이나 서류 보완 여부, 사업자등록 인허가 업종 해당 여부에 따라 일부 일정이 달라질 수 있습니다.',
  },
  {
    id: 'faq-02',
    category: '자본금',
    question: '자본금은 얼마로 해야 하나요?',
    answer: '상법상 최저자본금 규정이 폐지되어 원칙적으로 100원 이상이면 법인 설립이 가능합니다. 그러나 특정 인허가 업종(건설, 여행업, 금융 등)은 법정 최저자본금 기준이 있으며, 법인통장 개설 및 대외 신인도, 초기 운영자금을 고려해 통상 1백만 원~5천만 원 선에서 사업 계획에 맞춰 결정하는 것을 권장합니다.',
  },
  {
    id: 'faq-03',
    category: '주주·임원',
    question: '1인 법인도 설립할 수 있나요?',
    answer: '네, 1인이 100% 주주이자 대표이사가 되어 1인 법인을 설립할 수 있습니다. 다만, 법인설립 등기 시 상법상 \'지분이 없는 임원(감사 또는 이사)\' 1인이 조사보고자로 참여해야 등기 절차가 원활히 진행되므로, 설립 시점에만 일시적으로 지분 없는 임원을 두는 방식을 주로 활용합니다.',
  },
  {
    id: 'faq-04',
    category: '본점주소',
    question: '집 주소로 법인을 설립할 수 있나요?',
    answer: '전자상거래(온라인 쇼핑몰), 소프트웨어 개발, 경영컨설팅 등 별도 물리적 설비가 필요 없는 업종은 자택 주소지로도 법인설립 및 사업자등록이 가능한 경우가 많습니다. 단, 제조업, 건설업, 요식업 등 현장 인허가가 필수인 업종은 불가능할 수 있으므로 사전 관할 세무서 및 인허가 기준 검토가 필요합니다.',
  },
  {
    id: 'faq-05',
    category: '주주·임원',
    question: '대표자와 주주가 달라도 되나요?',
    answer: '네, 가능합니다. 주주는 회사의 자본을 출자하여 소유권을 가지는 자이고, 대표이사는 회사의 경영을 총괄하는 자입니다. 따라서 소유와 경영을 분리하여 주주가 아닌 전문 경영인을 대표이사로 선임하거나, 주주가 대표이사를 겸임하는 형태 모두 가능합니다.',
  },
  {
    id: 'faq-06',
    category: '지분설계',
    question: '공동창업 시 지분은 어떻게 정하나요?',
    answer: '공동창업 시 50:50 분할은 주요 경영 의사결정 시 교착상태(Deadlock)에 빠질 위험이 있습니다. 통상 핵심 리더가 67% 이상의 특별결의 의결권을 확보하거나, 최소 51% 이상의 과반수 지분을 확보하는 구조를 권장하며, 역할과 기여도, 향후 스톡옵션 및 투자 풀을 종합적으로 검토해야 합니다.',
  },
  {
    id: 'faq-07',
    category: '법인전환',
    question: '개인사업자를 유지하면서 법인을 만들 수 있나요?',
    answer: '네, 법적으로 개인사업자와 법인은 별개의 인격체이므로 개인사업자를 유지하면서 새로운 법인을 설립하여 병행 운영할 수 있습니다. 단, 동일 업종에서 거래를 분산할 경우 특수관계인 간 부당행위계산부인 등 세무상 이슈가 발생할 수 있으므로 사전 세무 검토가 필수적입니다.',
  },
  {
    id: 'faq-08',
    category: '법인전환',
    question: '개인사업자를 법인으로 전환할 수 있나요?',
    answer: '네, 가능합니다. 개인사업자의 규모가 커져 종합소득세 부담이 높아지거나 대외 신용도 확보가 필요할 때 포괄양수도, 세감면 포괄양수도, 현물출자 등의 방식을 통해 법인으로 전환할 수 있습니다. 각 방식에 따라 세금 감면 요건과 비용이 다르므로 현재 재무상태 분석이 선행되어야 합니다.',
  },
  {
    id: 'faq-09',
    category: '사업시작',
    question: '법인설립 후 사업자등록은 어떻게 하나요?',
    answer: '법인 등기부등본 및 법인인감증명서가 발급되면, 본점 임대차계약서(법인 명의)와 정관, 주주명부 등을 지참하여 관할 세무서에 방문하거나 국세청 홈택스를 통해 사업자등록을 신청합니다. 인허가 대상 업종의 경우 해당 인허가증을 함께 제출해야 합니다.',
  },
  {
    id: 'faq-10',
    category: '세무·회계',
    question: '법인설립 후 세무기장이 필요한가요?',
    answer: '법인은 세법상 복식부기 의무자이므로 모든 자금의 흐름을 장부로 기록해야 합니다. 또한 법인세 신고, 부가가치세 신고, 원천세 신고 등 정기적인 세무 신고 의무가 발생하므로 전문 세무사 또는 회계법인을 통한 세무기장 관리가 권장됩니다.',
  },
  {
    id: 'faq-11',
    category: '기업지원',
    question: '법인을 설립하면 정책자금을 받을 수 있나요?',
    answer: '법인설립 자체만으로 정책자금이 무조건 지원되는 것은 아닙니다. 다만, 법인은 중소벤처기업진흥공단, 신용보증기금, 기술보증기금 등 주요 정책기관의 융자 및 보증 프로그램 검토 시 개인사업자 대비 상대적으로 명확한 재무제표와 성장 계획을 바탕으로 평가를 진행할 수 있는 장점이 있습니다.',
  },
  {
    id: 'faq-12',
    category: '기업인증',
    question: '법인설립 후 기업인증을 받을 수 있나요?',
    answer: '네, 설립 초기 단계에서도 벤처기업확인(혁신성장유형 등)이나 기업부설연구소/연구개발전담부서 인증을 추진할 수 있습니다. 초기 인증을 획득하면 취득세·재산세 감면 및 법인세 세액공제, 정책자금 신청 시 가점 등 다양한 연계 혜택을 검토할 수 있습니다.',
  },
];

export const FaqSection: React.FC<FaqSectionProps> = ({
  onOpenConsultation,
  onOpenDiagnosis,
}) => {
  // Support multiple open accordions or toggle
  const [openIds, setOpenIds] = useState<string[]>(['faq-01', 'faq-02']);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenAll = () => {
    if (openIds.length === FAQS.length) {
      setOpenIds([]);
    } else {
      setOpenIds(FAQS.map((f) => f.id));
    }
  };

  return (
    <section
      id="faq-section"
      className="py-16 sm:py-24 bg-[#F7F9FC] border-b border-slate-200/80"
      aria-label="자주 묻는 질문 FAQ"
    >
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white text-[#2563EB] border border-blue-200 mb-3.5 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>FAQ</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#0B1F3A] tracking-tight leading-tight">
            법인설립, <br className="hidden sm:inline" />
            많이 궁금해하시는 질문입니다.
          </h2>

          <p className="mt-3.5 text-base sm:text-[17px] text-slate-600 font-normal leading-relaxed">
            처음 법인을 설립하시는 분들이 가장 자주 묻는 핵심 질문을 모았습니다.
          </p>

          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={handleOpenAll}
              className="text-xs font-bold text-slate-500 hover:text-[#2563EB] transition-colors underline underline-offset-4"
            >
              {openIds.length === FAQS.length ? '전체 답변 접기' : '전체 답변 펼치기'}
            </button>
          </div>
        </div>

        {/* 12 Accordions List */}
        <div className="space-y-3.5 mb-14">
          {FAQS.map((faq, idx) => {
            const isOpen = openIds.includes(faq.id);

            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#2563EB]/60 ring-2 ring-blue-500/10 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full py-4.5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 focus:outline-hidden"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <span className="text-xs font-black text-[#2563EB] shrink-0 pt-0.5 sm:pt-0">
                      Q{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 shrink-0 hidden sm:inline-block">
                      {faq.category}
                    </span>
                    <span className="text-base sm:text-[17px] font-bold text-[#0B1F3A] leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-blue-50 text-[#2563EB] rotate-180' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-sm text-slate-600 font-normal leading-relaxed border-t border-slate-100/80 animate-in fade-in duration-150">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-slate-700">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Informative Guidance Box */}
        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 text-center max-w-2xl mx-auto">
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            ※ 위 안내는 일반적인 상법 및 세무 실무 기준을 설명한 것으로, 개별 기업의 업종, 정관 규정, 사업자등록 관할에 따라 세부 요건이 달라질 수 있습니다. 정확한 진단은 전담 매니저와의 상담을 통해 확인하실 수 있습니다.
          </p>
        </div>

      </div>
    </section>
  );
};
