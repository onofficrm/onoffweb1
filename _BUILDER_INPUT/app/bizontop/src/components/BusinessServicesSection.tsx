import React, { useState } from 'react';
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  X,
} from 'lucide-react';

interface BusinessServicesSectionProps {
  onOpenConsultation: (category: string) => void;
}

interface ServiceDetailBlock {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

interface ServiceItem {
  id: string;
  serviceNo: string;
  categoryName: string;
  badgeText?: string;
  bigTitle: string;
  description: string;
  services: string[];
  ctaText: string;
  importanceWeight: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
  illustrationType: 'incorporation' | 'conversion' | 'support' | 'consulting';
  summaryPoints: string[];
  sections: ServiceDetailBlock[];
  note?: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'srv-01',
    serviceNo: '01',
    categoryName: '법인설립',
    badgeText: '비즈온탑 메인 서비스',
    bigTitle: '사업에 맞는 법인 구조 설계',
    description:
      '법인을 단순히 설립하는 데 그치지 않고 사업형태와 향후 계획을 고려해 기본 구조를 함께 검토합니다.',
    services: ['신규 법인설립', '1인 법인', '공동창업 법인', '주주 및 임원구조', '사업목적 구성'],
    ctaText: '자세히 보기',
    importanceWeight: 'primary',
    illustrationType: 'incorporation',
    summaryPoints: [
      '상호·자본금·주주·임원·사업목적을 사업 계획에 맞춰 설계',
      '1인 법인·공동창업·가족법인 등 형태별 리스크를 미리 점검',
      '설립 등기 이후 사업자등록·세무·인증 준비까지 이어서 안내',
    ],
    sections: [
      {
        heading: '이런 분들께 맞습니다',
        paragraphs: [
          '처음 법인을 만드는 예비창업자, 공동창업으로 지분·역할을 나눠야 하는 팀, 이미 개인사업을 하다가 법인이 필요해진 대표님께 적합합니다.',
        ],
        bullets: [
          '빠른 설립보다 “나중에 고치기 어려운 구조”를 먼저 잡고 싶을 때',
          '투자·정책자금·벤처인증을 염두에 두고 설립하고 싶을 때',
          '가족·지인 명의 주주 구성이 고민될 때',
        ],
      },
      {
        heading: '비즈온탑에서 함께하는 내용',
        paragraphs: [
          '전자등기 대행만 하는 것이 아니라, 사업 모델과 성장 시나리오를 듣고 자본금·지분율·정관 특약·사업목적 문구를 실무 기준으로 정리합니다.',
        ],
        bullets: [
          '상호 중복·유사상호 사전 검토',
          '자본금·주주·등기임원 구성안 작성',
          '정관·주주간계약에 넣을 핵심 조항 제안',
          '등기 일정·필요 서류·비용(등록면허세 등) 안내',
          '설립 후 사업자등록·4대보험·세무기장 연결',
        ],
      },
      {
        heading: '진행 흐름',
        paragraphs: [
          '상담 → 구조 제안 → 서류·전자서명 준비 → 등기 접수 → 설립 완료 보고 → 후속 준비(사업자·인증·자금) 순으로 진행합니다. 업종·지역에 따라 인허가·중과세 여부를 함께 확인합니다.',
        ],
      },
    ],
    note: '업종 인허가·과밀억제권역 중과 여부는 개별 조건에 따라 달라질 수 있습니다.',
  },
  {
    id: 'srv-02',
    serviceNo: '02',
    categoryName: '법인전환',
    badgeText: '개인사업자 절세 솔루션',
    bigTitle: '개인사업자의 법인전환',
    description:
      '사업규모 증가에 따라 법인전환을 고려하는 경우 현재 사업상황을 검토하고 적절한 전환 방향을 상담합니다.',
    services: ['법인전환 상담', '기존 사업현황 검토', '전환 방식 검토'],
    ctaText: '자세히 보기',
    importanceWeight: 'secondary',
    illustrationType: 'conversion',
    summaryPoints: [
      '개인 종합소득세 vs 법인 세율·인출 구조를 숫자로 비교',
      '포괄양수도·현물출자 등 전환 방식별 일정·세금 이슈 정리',
      '거래처·인허가·고용 승계까지 포함한 실무 체크리스트 제공',
    ],
    sections: [
      {
        heading: '언제 전환을 검토할까요?',
        paragraphs: [
          '순이익이 커져 종합소득세 부담이 늘거나, 대외 신인도·입찰·투자·정책자금 때문에 법인 형태가 필요할 때 전환을 검토합니다.',
          '“세금만 줄이면 된다”보다, 대표 급여·배당·4대보험·자산 이전 비용까지 포함한 총비용으로 보는 것이 중요합니다.',
        ],
        bullets: [
          '연 순이익이 높아져 세 부담이 체감될 때',
          '거래처·금융기관에서 법인 거래를 요구할 때',
          '공동경영·지분 정리·승계를 준비할 때',
        ],
      },
      {
        heading: '상담에서 다루는 범위',
        paragraphs: [
          '현재 매출·이익·자산·부채·인허가·계약을 파악한 뒤, 전환 방식과 예상 일정·세무 포인트를 정리합니다.',
        ],
        bullets: [
          '개인사업 현황·재무 흐름 점검',
          '전환 방식(포괄양수도 등) 비교',
          '재고·매출채권·고정자산 이전 이슈',
          '부가세·양도·취득 관련 주의사항 안내',
          '전환 후 급여·배당·세무기장 운영안',
        ],
      },
      {
        heading: '전환 후 바로 이어갈 일',
        paragraphs: [
          '법인 설립·전환이 끝나면 카드·PG·계약 명의 변경, 고용·4대보험, 사업자등록 정비를 순서대로 도와 영업 공백을 줄입니다.',
        ],
      },
    ],
    note: '세율·감면 요건은 과세연도와 업종에 따라 달라질 수 있어, 최종 판단 전 맞춤 진단이 필요합니다.',
  },
  {
    id: 'srv-03',
    serviceNo: '03',
    categoryName: '기업지원',
    badgeText: '자금 & 인증 연계',
    bigTitle: '정책자금 · 기업인증',
    description:
      '기업의 업력, 업종, 재무상황 등을 확인하여 활용 가능한 기업지원제도를 검토합니다.',
    services: ['정책자금', '벤처기업확인', '기업부설연구소', '연구개발전담부서', '이노비즈', '메인비즈'],
    ctaText: '자세히 보기',
    importanceWeight: 'tertiary',
    illustrationType: 'support',
    summaryPoints: [
      '업력·업종·재무 기준으로 “신청 가능한” 제도와 시기를 선별',
      '벤처·연구소·이노비즈 등 인증을 자금·세제와 연결',
      '서류·요건을 한꺼번에 설계해 중복 준비 시간을 줄임',
    ],
    sections: [
      {
        heading: '지원하는 영역',
        paragraphs: [
          '정책자금·보증, 벤처기업확인, 기업부설연구소·연구전담부서, 이노비즈·메인비즈 등 성장 초기에 자주 쓰는 제도를 중심으로 검토합니다.',
        ],
        bullets: [
          '정책자금·기술보증 연계 가능성',
          '벤처확인 유형·요건 매칭',
          '연구소·전담부서 인정 준비',
          '이노비즈·메인비즈 등 기업인증',
          '세제·입지·조달 혜택과의 연결',
        ],
      },
      {
        heading: '어떻게 진행하나요?',
        paragraphs: [
          '기업 현황을 듣고 당장 가능한 제도와 6~12개월 내 준비할 제도를 나눕니다. 인증만 받고 끝나는 것이 아니라, 이후 자금·세제 활용까지 로드맵으로 제시합니다.',
        ],
        bullets: [
          '현황 진단(업력·업종·재무·인력·IP)',
          '신청 가능 제도 우선순위 정리',
          '필요 서류·조직·일정 체크리스트',
          '신청·보완·사후관리 포인트 안내',
        ],
      },
      {
        heading: '기대 효과',
        paragraphs: [
          '초기 법인이 자금·신용·대외 신뢰도를 빠르게 확보하고, R&D·투자 유치의 기반을 만드는 데 목적이 있습니다.',
        ],
      },
    ],
    note: '공고·심의 기준은 수시로 바뀝니다. 신청 시점의 최신 요건을 기준으로 안내합니다.',
  },
  {
    id: 'srv-04',
    serviceNo: '04',
    categoryName: '경영컨설팅',
    badgeText: '지속 성장 파트너',
    bigTitle: '기업 성장 단계별 컨설팅',
    description:
      '법인설립 이후 기업이 성장하면서 필요한 다양한 경영 이슈를 함께 검토합니다.',
    services: ['기업 성장전략', '재무구조', '조직 및 운영', '기업인증 연계'],
    ctaText: '자세히 보기',
    importanceWeight: 'quaternary',
    illustrationType: 'consulting',
    summaryPoints: [
      '설립 이후 단계(생존→성장→확장)에 맞는 우선순위를 정리',
      '재무·조직·인증·자금을 한 판에서 연결해 의사결정 지원',
      '단기 이슈 해결과 중기 로드맵을 함께 설계',
    ],
    sections: [
      {
        heading: '다루는 주제',
        paragraphs: [
          '설립 직후 운영 안정화부터, 매출 확대·인력 채용·지분 재편·인증·자금 조달까지 성장 단계별로 이슈를 나눕니다.',
        ],
        bullets: [
          '성장 전략·사업 우선순위',
          '재무구조·현금흐름·원가 점검',
          '조직·역할·급여·성과 체계',
          '기업인증·정책자금과의 연계',
          '동업·투자·승계 관련 의사결정 지원',
        ],
      },
      {
        heading: '컨설팅 방식',
        paragraphs: [
          '일회성 강의가 아니라, 현재 숫자와 목표를 기준으로 실행 가능한 다음 액션을 정리합니다. 필요 시 법인설립·전환·인증 팀과 연결되어 실행까지 이어집니다.',
        ],
        bullets: [
          '현황 인터뷰·자료 점검',
          '이슈 우선순위 맵',
          '90일·1년 실행 로드맵',
          '인증·자금·세무 실행 부서와 연계',
        ],
      },
      {
        heading: '이런 상황에 추천합니다',
        paragraphs: [
          '법인은 만들었는데 다음 할 일이 막막할 때, 매출은 늘었는데 구조가 따라가지 못할 때, 인증·자금·조직 이슈가 한꺼번에 겹칠 때 도움이 됩니다.',
        ],
      },
    ],
    note: '업종·규모에 따라 권고안이 달라질 수 있으며, 법률·세무 최종 판단은 관련 전문가와 함께 확인합니다.',
  },
];

export const BusinessServicesSection: React.FC<BusinessServicesSectionProps> = ({
  onOpenConsultation,
}) => {
  const [selected, setSelected] = useState<ServiceItem | null>(null);

  const renderIllustration = (type: string) => {
    switch (type) {
      case 'incorporation':
        return (
          <div className="w-full h-32 sm:h-36 rounded-xl bg-gradient-to-br from-blue-500/10 via-blue-600/5 to-slate-100 flex items-center justify-center p-3 relative overflow-hidden border border-blue-100/80">
            <svg viewBox="0 0 280 120" className="w-full h-full" fill="none">
              <rect x="20" y="86" width="240" height="12" rx="4" fill="#0B1F3A" fillOpacity="0.8" />
              <rect x="44" y="44" width="22" height="42" rx="3" fill="#2563EB" />
              <rect x="94" y="44" width="22" height="42" rx="3" fill="#3B82F6" />
              <rect x="164" y="44" width="22" height="42" rx="3" fill="#3B82F6" />
              <rect x="214" y="44" width="22" height="42" rx="3" fill="#2563EB" />
              <path d="M20 44L140 14L260 44H20Z" fill="#0B1F3A" />
              <circle cx="140" cy="56" r="18" fill="#F4A62A" fillOpacity="0.9" />
              <path d="M134 56L138 60L146 52" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="20" y1="104" x2="260" y2="104" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />
            </svg>
            <div className="absolute top-2 right-2.5 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
              FOUNDATION
            </div>
          </div>
        );
      case 'conversion':
        return (
          <div className="w-full h-32 sm:h-36 rounded-xl bg-gradient-to-br from-slate-100 via-blue-50/40 to-slate-50 flex items-center justify-center p-3 relative overflow-hidden border border-slate-200">
            <svg viewBox="0 0 280 120" className="w-full h-full" fill="none">
              <rect x="25" y="32" width="75" height="58" rx="8" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
              <rect x="35" y="44" width="40" height="6" rx="2" fill="#64748B" />
              <rect x="35" y="56" width="55" height="4" rx="2" fill="#CBD5E1" />
              <rect x="35" y="66" width="30" height="4" rx="2" fill="#E2E8F0" />
              <path d="M115 60H165" stroke="#2563EB" strokeWidth="3" strokeDasharray="5 3" />
              <path d="M158 52L168 60L158 68" fill="#2563EB" />
              <rect x="180" y="22" width="80" height="78" rx="8" fill="#0B1F3A" />
              <rect x="192" y="36" width="50" height="6" rx="2" fill="#60A5FA" />
              <rect x="192" y="48" width="56" height="4" rx="2" fill="#93C5FD" />
              <rect x="192" y="58" width="42" height="4" rx="2" fill="#BFDBFE" />
              <circle cx="240" cy="78" r="10" fill="#F4A62A" />
              <path d="M237 78L239 80L243 76" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <div className="absolute top-2 right-2.5 bg-slate-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              SCALING UP
            </div>
          </div>
        );
      case 'support':
        return (
          <div className="w-full h-32 sm:h-36 rounded-xl bg-gradient-to-br from-amber-50/60 via-blue-50/30 to-slate-50 flex items-center justify-center p-3 relative overflow-hidden border border-slate-200">
            <svg viewBox="0 0 280 120" className="w-full h-full" fill="none">
              <rect x="40" y="24" width="80" height="72" rx="8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
              <circle cx="80" cy="50" r="16" fill="#F4A62A" fillOpacity="0.2" stroke="#F4A62A" strokeWidth="2" />
              <path d="M75 50L78 53L85 46" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
              <rect x="52" y="74" width="56" height="4" rx="2" fill="#94A3B8" />
              <rect x="60" y="82" width="40" height="4" rx="2" fill="#CBD5E1" />
              <ellipse cx="190" cy="74" rx="26" ry="8" fill="#2563EB" />
              <ellipse cx="190" cy="64" rx="26" ry="8" fill="#3B82F6" />
              <ellipse cx="190" cy="54" rx="26" ry="8" fill="#60A5FA" />
              <ellipse cx="190" cy="44" rx="26" ry="8" fill="#93C5FD" />
              <ellipse cx="190" cy="34" rx="26" ry="8" fill="#F4A62A" />
              <path d="M135 78L155 45L170 52L220 25" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="absolute top-2 right-2.5 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              CERTIFIED & FUNDED
            </div>
          </div>
        );
      case 'consulting':
        return (
          <div className="w-full h-32 sm:h-36 rounded-xl bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50/40 flex items-center justify-center p-3 relative overflow-hidden border border-slate-200">
            <svg viewBox="0 0 280 120" className="w-full h-full" fill="none">
              <rect x="35" y="65" width="22" height="35" rx="3" fill="#94A3B8" />
              <rect x="65" y="48" width="22" height="52" rx="3" fill="#64748B" />
              <rect x="95" y="32" width="22" height="68" rx="3" fill="#2563EB" />
              <rect x="125" y="20" width="22" height="80" rx="3" fill="#0B1F3A" />
              <path d="M40 70C80 50 110 35 180 18" stroke="#F4A62A" strokeWidth="3" strokeLinecap="round" />
              <circle cx="180" cy="18" r="5" fill="#F4A62A" />
              <circle cx="210" cy="45" r="9" fill="#2563EB" />
              <circle cx="245" cy="32" r="7" fill="#60A5FA" />
              <circle cx="235" cy="75" r="8" fill="#0B1F3A" />
              <line x1="210" y1="45" x2="245" y2="32" stroke="#CBD5E1" strokeWidth="2" />
              <line x1="210" y1="45" x2="235" y2="75" stroke="#CBD5E1" strokeWidth="2" />
            </svg>
            <div className="absolute top-2 right-2.5 bg-slate-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              GROWTH ROADMAP
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="business-services-section"
      className="py-16 sm:py-24 bg-[#F7F9FC] border-b border-slate-200/80"
      aria-label="비즈온탑 4대 핵심 서비스"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white text-[#2563EB] border border-blue-200 mb-3.5 shadow-2xs">
            <Briefcase className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>BUSINESS SERVICES</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#0B1F3A] tracking-tight leading-tight">
            법인설립부터 <br className="hidden sm:inline" />
            기업의 성장까지 함께합니다.
          </h2>

          <p className="mt-3.5 text-base sm:text-[17px] text-slate-600 font-normal leading-relaxed">
            단순 대행이 아닌, 창업 초기 구조 설계부터 성장 단계별 인증과 자금까지 <br className="hidden sm:inline" />
            기업에 필요한 4가지 핵심 영역을 원스톱으로 지원합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {SERVICES_DATA.map((srv) => {
            const isPrimary = srv.importanceWeight === 'primary';
            const isSecondary = srv.importanceWeight === 'secondary';

            return (
              <div
                key={srv.id}
                id={`service-card-${srv.serviceNo}`}
                className={`rounded-2xl transition-all duration-200 flex flex-col justify-between overflow-hidden ${
                  isPrimary
                    ? 'bg-white border-2 border-[#2563EB] shadow-xl shadow-blue-900/8 ring-4 ring-blue-500/10'
                    : isSecondary
                      ? 'bg-white border border-slate-300 hover:border-blue-400 shadow-md hover:shadow-lg'
                      : 'bg-white/95 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="p-6 sm:p-7 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-md shrink-0 ${
                          isPrimary ? 'bg-[#2563EB] text-white' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        SERVICE {srv.serviceNo}
                      </span>
                      <span className="text-sm font-bold text-[#0B1F3A] truncate">{srv.categoryName}</span>
                    </div>

                    {srv.badgeText && (
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full max-w-full ${
                          isPrimary
                            ? 'bg-blue-50 text-[#2563EB] border border-blue-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {srv.badgeText}
                      </span>
                    )}
                  </div>

                  <div className="mb-5">{renderIllustration(srv.illustrationType)}</div>

                  <h3 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight mb-2.5">
                    {srv.bigTitle}
                  </h3>

                  <p className="text-sm text-slate-600 font-medium leading-relaxed mb-5">
                    {srv.description}
                  </p>

                  <div className="pt-4 border-t border-slate-100">
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                      주요 지원 항목
                    </span>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {srv.services.map((item) => (
                        <span
                          key={item}
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border ${
                            isPrimary
                              ? 'bg-blue-50/70 border-blue-200/80 text-[#0B1F3A]'
                              : 'bg-slate-50 border-slate-200/80 text-slate-700'
                          }`}
                        >
                          <CheckCircle2
                            className={`w-3.5 h-3.5 ${isPrimary ? 'text-[#2563EB]' : 'text-slate-400'}`}
                          />
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-7 pt-4 bg-slate-50/60 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSelected(srv)}
                    id={`service-cta-${srv.serviceNo}`}
                    className={`w-full inline-flex items-center justify-center gap-2 font-bold text-sm sm:text-[15px] py-3.5 px-4 rounded-xl transition-all duration-200 focus:outline-hidden ${
                      isPrimary
                        ? 'bg-[#2563EB] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white shadow-md hover:shadow-lg'
                        : 'bg-white hover:bg-slate-100 active:bg-slate-200 text-[#0B1F3A] border border-slate-200 shadow-2xs'
                    }`}
                  >
                    <span>{srv.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[min(90vh,90dvh)] flex flex-col overscroll-contain"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="닫기"
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex-1 overflow-y-auto pr-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#2563EB] text-white">
                  SERVICE {selected.serviceNo}
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 text-[#2563EB] border border-blue-100">
                  {selected.categoryName}
                </span>
                {selected.badgeText && (
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {selected.badgeText}
                  </span>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight mb-3 pr-8">
                {selected.bigTitle}
              </h3>

              <p className="text-[15px] text-slate-800 font-medium leading-relaxed mb-5">
                {selected.description}
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 mb-5">
                <div className="font-bold text-[#0B1F3A] text-xs uppercase tracking-wider">
                  비즈온탑 서비스 요약
                </div>
                <ul className="text-xs sm:text-sm space-y-1.5 text-slate-600">
                  {selected.summaryPoints.map((point) => (
                    <li key={point} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-5">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  주요 지원 항목
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selected.services.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg border bg-blue-50/70 border-blue-200/80 text-[#0B1F3A]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-5 text-sm text-slate-700 leading-relaxed">
                {selected.sections.map((block) => (
                  <div key={block.heading} className="space-y-2.5">
                    <h4 className="text-base font-black text-[#0B1F3A] tracking-tight">
                      {block.heading}
                    </h4>
                    {block.paragraphs.map((p) => (
                      <p key={p.slice(0, 28)} className="text-sm text-slate-600 leading-relaxed">
                        {p}
                      </p>
                    ))}
                    {block.bullets && block.bullets.length > 0 && (
                      <ul className="space-y-1.5">
                        {block.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-sm text-slate-600">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                {selected.note && (
                  <p className="text-xs text-slate-500 leading-relaxed bg-amber-50 border border-amber-100 rounded-xl px-3.5 py-3">
                    {selected.note}
                  </p>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    const cat = selected.categoryName;
                    setSelected(null);
                    onOpenConsultation(`${cat} 상담`);
                  }}
                  className="flex-1 min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all"
                >
                  <span>이 서비스로 상담받기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="min-h-[48px] px-6 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
