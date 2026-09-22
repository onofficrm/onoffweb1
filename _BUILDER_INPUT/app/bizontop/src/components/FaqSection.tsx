import React, { useState } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  Search, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';

interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string[];
  tip?: string;
}

interface FaqSectionProps {
  onOpenConsultation?: (category: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenConsultation }) => {
  // Allow multiple items or single item open
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const faqData: FaqItem[] = [
    {
      id: 'faq-1',
      category: '기간/일정',
      question: '법인설립은 보통 얼마나 걸리나요?',
      answer: [
        '필요 서류(주주 및 임원 서류, 법인인감, 잔고증명서 등)가 모두 구비된 시점 기준으로 전자등기는 통상 영업일 3~5일, 서면등기는 5~7일 정도 소요됩니다.',
        '등기 완료 후 관할 세무서에 사업자등록을 신청하며, 특별한 인허가 업종이 아니라면 접수 후 1~3일 이내에 사업자등록증이 발급됩니다.'
      ],
      tip: '비즈온탑에서는 상호 중복 검토부터 정관 작성, 전자등기 신청을 원스톱으로 지원하여 불필요한 지연을 최소화합니다.'
    },
    {
      id: 'faq-2',
      category: '자본금',
      question: '자본금은 얼마로 해야 하나요?',
      answer: [
        '현행 상법상 원칙적으로 자본금 100원 이상이면 자유롭게 법인설립이 가능합니다.',
        '다만, 실제 사업 운영을 고려할 때 법인 통장 개설, 초기 사무실 임대차, 거래처 신뢰도, 그리고 사업자등록 심사 통과를 위해 통상 100만 원~1,000만 원 선으로 시작하는 경우가 많습니다.',
        '건설업, 여행업, 의약품 도매, 인력파견 등 법정 최소 자본금 기준이 정해진 특수 인허가 업종은 반드시 해당 법정 자본금을 충족해야 합니다.'
      ],
      tip: '희망하시는 업종의 법정 요건과 향후 정부지원금 요건을 종합적으로 고려하여 적정 자본금을 가이드해드립니다.'
    },
    {
      id: 'faq-3',
      category: '주주/임원',
      question: '1인 법인도 설립할 수 있나요?',
      answer: [
        '네, 1인이 주주이자 대표이사가 되는 1인 주식회사 설립이 가능합니다.',
        '다만, 상법 제298조에 따라 설립 시 정관과 출자 과정을 검사하는 \'주식 없는 조사보고자(주식을 보유하지 않은 사내이사 또는 감사)\'가 1인 필요합니다.',
        '따라서 설립 시점에만 주식이 없는 지인 또는 가족 1명을 일시적으로 감사/이사로 등재한 후, 등기 완료 직후 사임 절차를 밟는 방식으로 1인 지배 구조를 완성할 수 있습니다.'
      ],
      tip: '조사보고자 선임 절차와 설립 후 임원 정리 방법까지 안전하게 안내해드립니다.'
    },
    {
      id: 'faq-4',
      category: '주소지',
      question: '집 주소로 법인을 설립할 수 있나요?',
      answer: [
        '업종의 성격에 따라 가능 여부가 달라집니다.',
        '소프트웨어 개발, 전자상거래(통신판매), 1인 창작, 컨설팅 등 주거지에서도 업무 수행이 가능하다고 인정되는 비제조·비인허가 업종은 자택 주소지로 사업자등록이 가능할 수 있습니다.',
        '하지만 제조, 음식점, 학원, 여행업 등 전용 사업장이 필수적인 업종은 주택 주소지 등록이 거절되므로 상가 또는 공유오피스(비상주오피스) 임대차계약이 필요합니다.'
      ],
      tip: '관할 세무서의 업종별 사업자등록 실무 기준에 맞춰 자택 등록 가능 여부를 사전 검토해드립니다.'
    },
    {
      id: 'faq-5',
      category: '주주/임원',
      question: '대표자와 주주가 달라도 되나요?',
      answer: [
        '네, 주식회사 제도의 본질은 소유와 경영의 분리이므로 주주(주식을 소유한 사람)와 대표이사(경영을 책임지는 사람)는 완전히 달라도 무방합니다.',
        '자본만 출자하고 경영은 전문경영인에게 위임하거나, 반대로 대표자는 지분 없이 월급을 받는 등기이사로 취임할 수도 있습니다.',
        '다만 소규모 초기 기업의 경우 의사결정 신속성과 책임소재, 세무상 배당 및 급여 처리를 고려해 대표자가 최대주주를 겸하는 구조가 일반적입니다.'
      ]
    },
    {
      id: 'faq-6',
      category: '공동창업',
      question: '공동창업 시 지분은 어떻게 정하나요?',
      answer: [
        '단순 50:50 분할은 경영상 중대한 의사결정(주주총회 특별결의 등) 시 교착상태(Deadlock)에 빠질 위험이 있어 실무상 권장되지 않습니다.',
        '통상 실질적인 사업 리더에게 과반(51% 이상) 또는 특별결의 방어가 가능한 지분(67% 이상)을 배분하거나, 지분 회수 조건(Vesting), 동업계약서(주주간 계약서)를 함께 작성하여 향후 분쟁을 사전에 예방해야 합니다.'
      ],
      tip: '비즈온탑에서는 동업자 간 역할과 자본 기여도에 맞춘 최적의 지분율과 동업계약 특약 설계를 지원합니다.'
    },
    {
      id: 'faq-7',
      category: '개인/법인',
      question: '개인사업자를 유지하면서 법인을 만들 수 있나요?',
      answer: [
        '네, 법적으로 완전히 가능합니다. 개인사업자와 법인은 별개의 인격체(자연인 vs 법인)이므로 동일인이 개인사업자를 계속 유지하면서 신규 법인을 설립하여 대표이사로 취임할 수 있습니다.',
        '다만, 기존 개인사업체와 신규 법인 간에 동일한 업종으로 부당한 거래를 하거나 매출을 인위적으로 분산하는 행위는 국세청 세무조사 시 특수관계인 부당행위계산부인 등의 세무 리스크가 발생할 수 있습니다.'
      ],
      tip: '개인과 법인의 업종 분리 및 거래 투명성 유지 방안을 세무 전문가와 사전 상의하시는 것이 안전합니다.'
    },
    {
      id: 'faq-8',
      category: '법인전환',
      question: '개인사업자를 법인으로 전환할 수 있나요?',
      answer: [
        '네, 개인사업자의 사업 규모 확장이나 소득세 부담 완화를 위해 법인전환이 가능합니다.',
        '전환 방법은 크게 ① 신규 법인 설립 후 기존 사업 폐업, ② 일반 사업양수도, ③ 조세특례제한법에 따른 세감면 포괄양수도, ④ 현물출자 방식 등이 있습니다.',
        '사업용 부동산이나 고가 자산, 영업권 보유 여부에 따라 취득세 감면이나 양도소득세 이월과세 적용 여부가 달라지므로 세밀한 세무 시뮬레이션이 필수적입니다.'
      ]
    },
    {
      id: 'faq-9',
      category: '사업자등록',
      question: '법인설립 후 사업자등록은 어떻게 하나요?',
      answer: [
        '법인 등기부등본이 나오면, 법인 명의의 임대차계약서, 정관 사본, 주주명부, (인허가 업종인 경우) 인허가증을 구비하여 관할 세무서 또는 홈택스를 통해 사업자등록을 신청합니다.',
        '신청 후 통상 1~3영업일 내에 법인 사업자등록증이 발급되며, 이후 법인 통장 개설 및 전자세금계산서용 인증서를 발급받아 영업을 시작합니다.'
      ]
    },
    {
      id: 'faq-10',
      category: '세무/기장',
      question: '법인설립 후 세무기장이 필요한가요?',
      answer: [
        '네, 법인은 현행 세법상 예외 없이 \'복식부기 의무자\'에 해당합니다.',
        '개인사업자 초기와 달리 간편장부 작성이 허용되지 않으며, 모든 매출·매입 거래와 통장 입출금 내역을 복식부기 원리에 따라 회계 처리하고 법인세를 신고해야 합니다.',
        '따라서 법인설립 직후 전문 세무대리인(세무사·회계사)을 선임하여 매월 기장 관리를 진행하는 것이 가산세 예방과 재무제표 신뢰도 확보에 필수적입니다.'
      ]
    },
    {
      id: 'faq-11',
      category: '정책자금',
      question: '법인을 설립하면 정책자금을 받을 수 있나요?',
      answer: [
        '법인을 설립한다고 해서 정부 정책자금이 자동으로 보장되거나 무조건 승인되는 것은 아닙니다.',
        '다만 중소벤처기업진흥공단, 기술보증기금, 신용보증기금 등에서는 창업 3년 또는 7년 이내의 유망 창업기업을 위한 다양한 저금리 융자 및 보증 프로그램을 운영하고 있습니다.',
        '기업의 기술력, 사업계획서, 대표자의 전문성, 신용도 및 재무 상태 등을 종합 평가하여 선정되므로, 설립 초기부터 정관 목적과 재무구조를 체계적으로 관리해야 승인 가능성을 높일 수 있습니다.'
      ]
    },
    {
      id: 'faq-12',
      category: '기업인증',
      question: '법인설립 후 기업인증을 받을 수 있나요?',
      answer: [
        '네, 업종과 사업 계획에 따라 벤처기업확인, 기업부설연구소, 연구개발전담부서 등의 기업인증을 신청할 수 있습니다.',
        '특히 벤처기업확인은 창업 3년 이내 기업 대상 세제 혜택이 크며, 연구소나 전담부서는 1~3인 이상의 연구 전담 인력과 독립 공간 요건을 충족하면 설립 초기에도 등록이 가능합니다.',
        '인증별로 법정 요건(인력, 공간, 기자재, 기술성 평가 등)이 명확히 규정되어 있으므로 사전 요건 충족 여부를 확인 후 전략적으로 추진하는 것이 좋습니다.'
      ]
    }
  ];

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenAll = () => {
    setOpenIds(faqData.map(f => f.id));
  };

  const handleCloseAll = () => {
    setOpenIds([]);
  };

  const filteredFaq = searchKeyword.trim() === ''
    ? faqData
    : faqData.filter(item => 
        item.question.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.answer.some(a => a.toLowerCase().includes(searchKeyword.toLowerCase())) ||
        item.category.toLowerCase().includes(searchKeyword.toLowerCase())
      );

  return (
    <section
      id="faq"
      className="w-full bg-white py-16 sm:py-20 lg:py-24 border-b border-slate-200/80 scroll-mt-20"
    >
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div
            id="faq-eyebrow"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[12px] sm:text-[13px] font-semibold tracking-wider mb-3.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span>FAQ</span>
          </div>

          <h2
            id="faq-main-title"
            className="text-[28px] sm:text-[36px] md:text-[40px] font-black text-[#0B1F3A] tracking-tight leading-[1.25] mb-4"
          >
            법인설립,
            <br />
            많이 궁금해하시는 질문입니다.
          </h2>

          <p
            id="faq-description"
            className="text-[15px] sm:text-[16.5px] text-slate-600 leading-relaxed max-w-xl mx-auto"
          >
            예비 대표님들이 가장 많이 문의하시는 핵심 질문들을 엄선하여 알기 쉽게 정리해드렸습니다.
          </p>
        </div>

        {/* Search & Bulk Control Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="질문 또는 키워드 검색..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-[13.5px] outline-hidden focus:border-blue-600 focus:bg-white transition-all"
            />
          </div>

          {/* Expand/Collapse All Buttons */}
          <div className="flex items-center gap-2 self-end sm:self-auto text-[12.5px] text-slate-500 font-medium">
            <button
              type="button"
              onClick={handleOpenAll}
              className="px-2.5 py-1 rounded-md hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer"
            >
              전체 펼치기
            </button>
            <span>|</span>
            <button
              type="button"
              onClick={handleCloseAll}
              className="px-2.5 py-1 rounded-md hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer"
            >
              전체 접기
            </button>
          </div>
        </div>

        {/* Accordion List */}
        <div id="faq-accordion-list" className="space-y-3.5 mb-10">
          {filteredFaq.length > 0 ? (
            filteredFaq.map((item) => {
              const isOpen = openIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  id={item.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-white border-blue-300 shadow-xs ring-1 ring-blue-500/10'
                      : 'bg-white border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-3.5">
                      <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-700 text-[12px] font-black flex items-center justify-center shrink-0 mt-0.5 border border-blue-200">
                        Q
                      </span>
                      <div>
                        <span className="text-[11.5px] font-bold text-blue-600 block mb-1">
                          {item.category}
                        </span>
                        <h3 className="text-[16px] sm:text-[17px] font-bold text-[#0B1F3A] leading-snug">
                          {item.question}
                        </h3>
                      </div>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-slate-100 text-slate-500 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-blue-50 text-blue-600' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Accordion Body */}
                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-slate-100">
                      <div className="pl-9 space-y-2.5 text-[14px] sm:text-[14.5px] text-slate-600 leading-relaxed pt-4">
                        {item.answer.map((paragraph, pIdx) => (
                          <p key={pIdx}>{paragraph}</p>
                        ))}

                        {item.tip && (
                          <div className="mt-4 p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 text-blue-900 text-[13px] flex items-start gap-2">
                            <span className="font-bold text-blue-700 shrink-0">TIP</span>
                            <span>{item.tip}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <p className="text-slate-500 text-[14px]">
                '{searchKeyword}'에 대한 검색 결과가 없습니다.
              </p>
              <button
                type="button"
                onClick={() => setSearchKeyword('')}
                className="mt-2 text-blue-600 text-[13px] font-bold underline"
              >
                검색어 초기화
              </button>
            </div>
          )}
        </div>

        {/* Disclaimer Notice */}
        <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-slate-200/80 mb-10 flex items-start gap-3 text-slate-500 text-[12.5px] sm:text-[13px] leading-relaxed">
          <AlertCircle className="w-4.5 h-4.5 text-slate-400 shrink-0 mt-0.5" />
          <div>
            위 FAQ 내용은 일반적인 법인설립 및 기업운영 절차에 대한 정보 제공 목적으로 작성되었습니다.
            개별 기업의 업종 인허가 요건, 주주 구성 및 세법상 세부 규정은 관할 행정기관 및 전문가(법무사, 세무사)의 구체적인 사실관계 확인에 따라 달라질 수 있습니다.
          </div>
        </div>

        {/* Still have questions CTA */}
        <div className="text-center bg-blue-50/50 rounded-2xl p-6 sm:p-8 border border-blue-100">
          <h4 className="text-[17px] font-bold text-[#0B1F3A] mb-1.5">
            더 궁금한 점이 있으신가요?
          </h4>
          <p className="text-[13.5px] text-slate-600 mb-4">
            전문 컨설턴트가 대표님의 사업 형태에 맞춘 1:1 맞춤 답변을 드립니다.
          </p>
          <button
            type="button"
            onClick={() => onOpenConsultation && onOpenConsultation('FAQ 추가상담')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[14px] font-bold text-white bg-[#2563EB] hover:bg-blue-700 transition-colors cursor-pointer shadow-xs"
          >
            <span>무료상담 신청하기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
