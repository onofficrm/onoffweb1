import React from 'react';
import { 
  Building2, 
  User, 
  AlertCircle, 
  PhoneCall, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface ComparisonSectionProps {
  onOpenConsultation: () => void;
}

interface ComparisonRow {
  category: string;
  categoryEn: string;
  soleProprietor: string;
  soleProprietorDetail: string;
  corporation: string;
  corporationDetail: string;
  highlightCorporate?: boolean;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ onOpenConsultation }) => {
  const comparisonData: ComparisonRow[] = [
    {
      category: '설립',
      categoryEn: 'Establishment',
      soleProprietor: '상대적으로 간단',
      soleProprietorDetail: '세무서 사업자등록만으로 즉시 개시 가능',
      corporation: '법인등기 절차 필요',
      corporationDetail: '정관 작성, 주주·임원 구성, 법원 등기소 등기 필수',
    },
    {
      category: '사업주체',
      categoryEn: 'Legal Entity',
      soleProprietor: '개인',
      soleProprietorDetail: '사업상 모든 채무와 법적 책임이 대표 개인에게 귀속',
      corporation: '독립된 법인',
      corporationDetail: '대표자와 분리된 별도 법인격 부여 (유한책임 원칙)',
      highlightCorporate: true,
    },
    {
      category: '공동사업',
      categoryEn: 'Co-Founding',
      soleProprietor: '공동사업 구조 검토 필요',
      soleProprietorDetail: '공동사업자 등록은 가능하나 지분 분쟁 및 양도 시 세무 복잡',
      corporation: '주주 및 지분구조 설계 가능',
      corporationDetail: '주식 비율에 따른 명확한 의결권 및 이익 배분 구조 확립',
      highlightCorporate: true,
    },
    {
      category: '투자',
      categoryEn: 'Investment',
      soleProprietor: '투자 구조에 제약이 있을 수 있음',
      soleProprietorDetail: '외부 엔젤/VC 지분 투자 유치가 사실상 불가능',
      corporation: '지분을 활용한 투자 구조 설계 가능',
      corporationDetail: '신주발행(RCPS, 보통주), 스톡옵션 등 다양한 투자 유치 가능',
      highlightCorporate: true,
    },
    {
      category: '대외거래',
      categoryEn: 'External Trust',
      soleProprietor: '개인사업자 명의',
      soleProprietorDetail: '대기업 납품, 공공기관 입찰 및 대규모 계약 시 신인도 제약',
      corporation: '법인 명의',
      corporationDetail: '독립 회계감사 및 법인 명의 계약으로 높은 공신력 확보',
      highlightCorporate: true,
    },
    {
      category: '기업 성장제도',
      categoryEn: 'Growth Programs',
      soleProprietor: '사업 및 제도별 적용 여부 확인',
      soleProprietorDetail: '일부 소상공인 정책자금 위주, R&D 및 대형 지원에 한계',
      corporation: '다양한 기업지원제도 검토 가능',
      corporationDetail: '벤처기업, 연구소 인증, 중기부 창업패키지, 기보·신보 대형자금',
      highlightCorporate: true,
    },
  ];

  return (
    <section
      id="conversion"
      className="w-full bg-[#F4F7FB] py-16 sm:py-20 lg:py-24 border-b border-slate-200/80 scroll-mt-20"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div
            id="comparison-eyebrow"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 text-[12px] sm:text-[13px] font-semibold tracking-wider mb-3.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span>SOLE PROPRIETOR VS CORPORATION</span>
          </div>
          <h2
            id="comparison-main-title"
            className="text-[28px] sm:text-[36px] md:text-[40px] font-black text-[#0B1F3A] tracking-tight leading-[1.25] mb-4"
          >
            개인사업자와 법인,
            <br />
            무엇이 다를까요?
          </h2>
          <p
            id="comparison-description"
            className="text-[15px] sm:text-[16.5px] text-slate-600 leading-relaxed max-w-2xl mx-auto"
          >
            무조건 법인이 좋은 것은 아닙니다.
            <br className="hidden sm:inline" />
            현재 사업규모와 향후 계획에 맞는 형태를 선택하는 것이 중요합니다.
          </p>
        </div>

        {/* Comparison Table / Card Container */}
        <div
          id="comparison-container"
          className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden mb-8"
        >
          {/* Table Header (Desktop) */}
          <div className="hidden md:grid grid-cols-12 bg-[#0B1F3A] text-white py-4 px-6 text-[14px] font-bold tracking-wide">
            <div className="col-span-2 text-slate-300">비교 항목</div>
            <div className="col-span-5 flex items-center gap-2 text-slate-200 border-l border-slate-700 pl-4">
              <User className="w-4 h-4 text-slate-400" />
              <span>개인사업자</span>
            </div>
            <div className="col-span-5 flex items-center gap-2 text-blue-300 border-l border-slate-700 pl-4">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span className="text-white">법인 (주식회사)</span>
              <span className="text-[11px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-semibold">
                기업성장 유리
              </span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-100">
            {comparisonData.map((row, idx) => (
              <div
                key={row.category}
                className={`grid grid-cols-1 md:grid-cols-12 p-4 sm:p-5 md:py-5 md:px-6 transition-colors ${
                  idx % 2 === 1 ? 'bg-[#FAFCFF]' : 'bg-white'
                } hover:bg-blue-50/30`}
              >
                {/* Category Column */}
                <div className="col-span-2 flex md:flex-col items-center md:items-start justify-between md:justify-center mb-2 md:mb-0">
                  <span className="text-[15px] font-bold text-[#0B1F3A]">
                    {row.category}
                  </span>
                  <span className="text-[11.5px] text-slate-400 md:mt-0.5">
                    {row.categoryEn}
                  </span>
                </div>

                {/* Sole Proprietor Column */}
                <div className="col-span-5 md:border-l md:border-slate-100 md:pl-5 pr-2 py-1.5 md:py-0 mb-3 md:mb-0 bg-slate-50/70 md:bg-transparent rounded-lg md:rounded-none p-3 md:p-0">
                  <div className="md:hidden text-[12px] font-semibold text-slate-500 mb-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    개인사업자
                  </div>
                  <div className="text-[15px] font-bold text-slate-700 mb-0.5">
                    {row.soleProprietor}
                  </div>
                  <div className="text-[12.5px] text-slate-500 leading-snug">
                    {row.soleProprietorDetail}
                  </div>
                </div>

                {/* Corporation Column */}
                <div className="col-span-5 md:border-l md:border-slate-100 md:pl-5 py-1.5 md:py-0 bg-blue-50/50 md:bg-transparent rounded-lg md:rounded-none p-3 md:p-0 border border-blue-100 md:border-0">
                  <div className="md:hidden text-[12px] font-semibold text-blue-700 mb-1 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
                    법인 (주식회사)
                  </div>
                  <div className="text-[15px] font-bold text-blue-950 flex items-center gap-1.5 mb-0.5">
                    <span>{row.corporation}</span>
                  </div>
                  <div className="text-[12.5px] text-slate-600 leading-snug">
                    {row.corporationDetail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Box */}
        <div
          id="comparison-important-box"
          className="bg-white rounded-2xl p-6 sm:p-7 border border-amber-200/90 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mb-10"
        >
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-amber-100/90 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-[16.5px] sm:text-[18px] font-bold text-[#0B1F3A] mb-1 flex items-center gap-2">
                <span>"법인이 항상 유리한 것은 아닙니다."</span>
              </h4>
              <p className="text-[14px] text-slate-600 leading-relaxed">
                현재 매출, 사업형태, 주주구성, 향후 투자계획 등을 함께 확인한 후 결정하는 것이 좋습니다.
                <br className="hidden sm:inline" />
                비즈온탑 전문 컨설턴트가 대표님의 현 사업 상황을 객관적으로 분석해 최적의 방향을 추천해 드립니다.
              </p>
            </div>
          </div>

          {/* Section 2 CTA */}
          <button
            id="comparison-cta-btn"
            type="button"
            onClick={onOpenConsultation}
            className="shrink-0 w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[15px] font-bold text-white bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 shadow-sm hover:shadow-md transition-all cursor-pointer focus:ring-4 focus:ring-blue-500/20"
          >
            <PhoneCall className="w-4 h-4" />
            <span>무료상담 신청하기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
