import React from 'react';
import { 
  Scale, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle, 
  HelpCircle, 
  User, 
  Building, 
  PhoneCall 
} from 'lucide-react';
import { ComparisonItem } from '../types';

interface ComparisonSectionProps {
  onOpenConsultation: () => void;
}

const COMPARISON_DATA: ComparisonItem[] = [
  {
    category: '설립',
    soleProprietor: '상대적으로 간단',
    corporation: '법인등기 절차 필요',
  },
  {
    category: '사업주체',
    soleProprietor: '개인',
    corporation: '독립된 법인',
  },
  {
    category: '공동사업',
    soleProprietor: '공동사업 구조 검토 필요',
    corporation: '주주 및 지분구조 설계 가능',
  },
  {
    category: '투자',
    soleProprietor: '투자 구조에 제약이 있을 수 있음',
    corporation: '지분을 활용한 투자 구조 설계 가능',
  },
  {
    category: '대외거래',
    soleProprietor: '개인사업자 명의',
    corporation: '법인 명의',
  },
  {
    category: '기업 성장제도',
    soleProprietor: '사업 및 제도별 적용 여부 확인',
    corporation: '다양한 기업지원제도 검토 가능',
  },
];

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({
  onOpenConsultation,
}) => {
  return (
    <section
      id="comparison-section"
      className="py-16 sm:py-24 bg-[#F0F4F9] border-b border-slate-200/80 transition-colors"
      aria-label="개인사업자 vs 법인 비교"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white text-[#2563EB] border border-blue-200/80 mb-3.5 shadow-2xs">
            <Scale className="w-3.5 h-3.5" />
            <span>SOLE PROPRIETOR VS CORPORATION</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#0B1F3A] tracking-tight leading-tight">
            개인사업자와 법인, <br className="hidden sm:inline" />
            무엇이 다를까요?
          </h2>

          <p className="mt-3.5 text-base sm:text-[17px] text-slate-600 font-normal leading-relaxed">
            무조건 법인이 좋은 것은 아닙니다. <br className="hidden sm:inline" />
            현재 사업규모와 향후 계획에 맞는 형태를 선택하는 것이 중요합니다.
          </p>
        </div>

        {/* Comparison Table / Box (Desktop & Tablet) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/40 overflow-hidden mb-8">
          
          {/* Header Row */}
          <div className="grid grid-cols-12 bg-slate-50/90 border-b border-slate-200 text-sm sm:text-base font-bold text-[#0B1F3A]">
            <div className="col-span-4 sm:col-span-3 py-4 sm:py-5 px-4 sm:px-6 flex items-center justify-center sm:justify-start text-slate-500 font-semibold text-xs sm:text-sm">
              비교 항목
            </div>
            
            <div className="col-span-4 sm:col-span-4 py-4 sm:py-5 px-3 sm:px-6 flex items-center justify-center sm:justify-start gap-2 bg-slate-100/60 border-l border-slate-200 text-slate-700">
              <User className="w-4 h-4 text-slate-500 hidden sm:inline" />
              <span>개인사업자</span>
            </div>

            <div className="col-span-4 sm:col-span-5 py-4 sm:py-5 px-3 sm:px-6 flex items-center justify-center sm:justify-start gap-2 bg-blue-50/70 border-l border-blue-100 text-[#0B1F3A]">
              <Building className="w-4 h-4 text-[#2563EB] hidden sm:inline shrink-0" />
              <span className="text-[#2563EB] text-center sm:text-left leading-snug">
                법인
                <br />
                <span className="font-semibold text-[11px] sm:text-sm">(주식회사 등)</span>
              </span>
              <span className="hidden lg:inline text-[11px] font-semibold text-white bg-[#2563EB] px-2 py-0.5 rounded-full shrink-0">
                성장 지향
              </span>
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-100">
            {COMPARISON_DATA.map((item, index) => (
              <div
                key={item.category}
                id={`comparison-row-${index}`}
                className="grid grid-cols-12 hover:bg-slate-50/50 transition-colors text-xs sm:text-[15px]"
              >
                {/* Category Name */}
                <div className="col-span-4 sm:col-span-3 py-4 sm:py-4.5 px-3 sm:px-6 font-bold text-[#0B1F3A] flex items-center bg-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mr-2 hidden sm:inline-block" />
                  {item.category}
                </div>

                {/* Sole Proprietor Value */}
                <div className="col-span-4 sm:col-span-4 py-4 sm:py-4.5 px-3 sm:px-6 text-slate-600 font-medium flex items-center border-l border-slate-100 bg-slate-50/20">
                  {item.soleProprietor}
                </div>

                {/* Corporation Value */}
                <div className="col-span-4 sm:col-span-5 py-4 sm:py-4.5 px-3 sm:px-6 font-semibold text-[#0B1F3A] flex items-center border-l border-slate-100 bg-blue-50/20">
                  <span className="text-[#2563EB] mr-1.5 hidden sm:inline">✔</span>
                  {item.corporation}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Important Notice Box as requested:
            "법인이 항상 유리한 것은 아닙니다."
            현재 매출, 사업형태, 주주구성, 향후 투자계획 등을 함께 확인한 후 결정하는 것이 좋습니다. */}
        <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-8 shadow-2xs">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 shrink-0 mt-0.5 sm:mt-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-amber-950 tracking-tight">
                "법인이 항상 유리한 것은 아닙니다."
              </h3>
              <p className="text-xs sm:text-sm text-amber-900/90 font-medium mt-1 leading-relaxed">
                현재 매출, 사업형태, 주주구성, 향후 투자계획 등을 함께 확인한 후 결정하는 것이 좋습니다.
              </p>
            </div>
          </div>

          <div className="w-full sm:w-auto shrink-0">
            {/* CTA Button: [법인설립 상담받기] */}
            <button
              type="button"
              id="comparison-cta-consultation"
              onClick={onOpenConsultation}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]/40"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              <span>법인설립 상담받기</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
