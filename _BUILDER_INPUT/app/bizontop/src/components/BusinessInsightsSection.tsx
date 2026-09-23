import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  X,
  CheckCircle2,
} from 'lucide-react';
import { BusinessInsightItem } from '../types';

interface BusinessInsightsSectionProps {
  onOpenConsultation: (category: string) => void;
}

const INSIGHTS_DATA: BusinessInsightItem[] = [
  {
    id: 'post-01',
    category: '법인설립',
    title: '2025년 신규 법인설립 자본금과 주주 구성 가이드',
    description:
      '100원 이상이면 자유롭게 설정 가능한 자본금, 실제 업종 인허가와 대외 신인도를 고려해 현명하게 결정하는 핵심 원칙을 정리했습니다.',
    date: '2025.02.18',
    readTime: '4분 읽기',
    summaryPoints: [
      '법정 최저 자본금보다 업종 인허가·거래처 신인도를 먼저 볼 것',
      '1인 법인 vs 공동창업 시 의결권·경영권 방어 지분율 설계',
      '설립 직후 정책자금·벤처인증까지 이어지는 준비 순서',
    ],
    sections: [
      {
        heading: '1. 자본금, 법적으로는 얼마부터 가능한가요?',
        paragraphs: [
          '주식회사는 원칙적으로 자본금 100원 이상이면 설립할 수 있습니다. 예전처럼 법률상 높은 최저자본금을 맞출 필요는 없습니다.',
          '다만 “가능한 금액”과 “실제로 유리한 금액”은 다릅니다. 은행 계좌 개설, 공공입찰, 프랜차이즈·인허가, 투자 유치 단계에서 자본금 규모를 보는 경우가 많기 때문입니다.',
        ],
        bullets: [
          '일반 서비스·컨설팅·IT 등: 실무상 1,000만~3,000만 원대를 많이 선택',
          '인허가·공제조합·보증이 필요한 업종: 고시·약관상 최소 자본금 확인 필수',
          '과밀억제권역(서울 등) 설립 시 등록면허세·중과 여부도 함께 검토',
        ],
      },
      {
        heading: '2. 주주·임원 구성은 어떻게 잡나요?',
        paragraphs: [
          '주주는 회사의 소유자이고, 등기이사는 경영·의사결정의 책임자입니다. 1인 법인이면 대표이사가 주주 겸 등기임원인 형태가 흔합니다.',
          '공동창업이라면 처음부터 “지분율 = 기여도 + 의사결정권”을 문서로 맞춰 두는 것이 중요합니다. 나중에 갈등이 나면 정관·주주간계약 없이 정리하기 어렵습니다.',
        ],
        bullets: [
          '경영권 방어: 보통 67% 이상(특별결의) 확보를 목표로 설계하는 경우가 많음',
          '투자 유치 예정: 초대 라운드를 고려해 초기 과도한 지분 희석을 피함',
          '가족·지인 명의 주주: 명의신탁 리스크·세무 이슈를 미리 점검',
        ],
      },
      {
        heading: '3. 설립 직후 바로 이어갈 준비',
        paragraphs: [
          '등기 완료 후 사업자등록, 4대보험, 세무기장 체계를 잡고, 필요한 경우 벤처확인·기업부설연구소·정책자금 요건을 미리 맞춰 두면 시간을 크게 아낄 수 있습니다.',
          '비즈온탑에서는 상호·자본금·주주·정관 특약부터 설립 이후 첫 지원제도까지 한 흐름으로 안내합니다.',
        ],
      },
    ],
    note: '업종·지역·자본금 규모에 따라 세금·인허가 요건이 달라질 수 있습니다. 실제 설립 전 맞춤 진단이 필요합니다.',
  },
  {
    id: 'post-02',
    category: '법인전환',
    title: '개인사업자 순이익 8천만 원 이상 시 법인전환이 유리한 이유',
    description:
      '종합소득세율 최고 45% 구간과 법인세 기본 세율 9~19% 구간의 구조적 차이 및 포괄양수도 전환 절차를 알기 쉽게 비교합니다.',
    date: '2025.02.10',
    readTime: '5분 읽기',
    summaryPoints: [
      '고소득 개인사업자는 종합소득세 누진 부담이 빠르게 커짐',
      '법인 세율 구조 + 적정 급여·배당 설계로 실효세율 조정이 가능',
      '포괄양수도·현물출자 등 전환 방식에 따라 세금·일정이 달라짐',
    ],
    sections: [
      {
        heading: '1. 왜 “순이익 8천만 원”을 기준으로 많이 말할까요?',
        paragraphs: [
          '개인사업자의 사업소득은 종합소득세로 과세되고, 소득이 커질수록 세율이 계단식으로 올라갑니다. 실무에서는 연 순이익이 대략 7~8천만 원을 넘어서면 법인 전환을 본격 비교하는 경우가 많습니다.',
          '법인으로 전환하면 회사 단계에서 법인세를 내고, 대표는 급여·상여·배당 등으로 자금을 가져가며 세 부담을 나눌 수 있습니다. “무조건 법인이 싸다”가 아니라, 인출 방식까지 포함한 실효세율을 비교해야 합니다.',
        ],
        bullets: [
          '개인: 소득↑ → 종합소득세·지방소득세 부담 급증',
          '법인: 과세표준 구간별 법인세 + 대표 근로소득·배당소득 설계',
          '4대보험·퇴직금·복리후생까지 포함한 총비용으로 판단',
        ],
      },
      {
        heading: '2. 법인전환의 대표 방식',
        paragraphs: [
          '사업 양수도(포괄양수도), 현물출자, 중소기업 조세특례를 활용한 전환 등 여러 경로가 있습니다. 업종, 부동산·재고 보유, 부채, 거래처 계약 승계 여부에 따라 적합한 방식이 달라집니다.',
          '전환 시점의 재고·매출채권·고정자산 평가, 부가가치세·양도소득세·취득세 이슈를 빠뜨리면 예상보다 세금이 커질 수 있습니다.',
        ],
        bullets: [
          '포괄양수도: 권리·의무를 한꺼번에 넘기는 실무형 전환',
          '현물출자: 개인 자산을 법인 자본으로 넣는 구조',
          '세액 감면·이월 요건은 해당 연도 조세특례 조건을 반드시 확인',
        ],
      },
      {
        heading: '3. 전환 전에 꼭 점검할 체크리스트',
        paragraphs: [
          '상호·업종 승계, 인허가 재신청, 고용승계, 카드·PG·계약 명의 변경, 개인 명의 자산의 법인 이전 일정을 미리 짜야 영업 공백을 줄일 수 있습니다.',
          '비즈온탑은 세무·법무 관점에서 “지금 전환이 이득인지”, “어떤 방식으로 가는지”를 숫자와 일정으로 정리해 드립니다.',
        ],
      },
    ],
    note: '세율·감면 요건은 과세연도와 개별 상황에 따라 달라집니다. 본 안내는 일반 정보이며, 최종 의사결정은 맞춤 상담을 권합니다.',
  },
  {
    id: 'post-03',
    category: '기업인증',
    title: '초기 법인을 위한 벤처인증과 기업부설연구소 혜택 총정리',
    description:
      '설립 3년 이내 기업이 벤처기업 및 연구전담부서를 확보했을 때 누릴 수 있는 4대 세제 혜택과 정부 보증 연계 포인트를 소개합니다.',
    date: '2025.01.28',
    readTime: '6분 읽기',
    summaryPoints: [
      '벤처확인은 세제·보증·입지·투자 유치에 동시에 도움이 됨',
      '기업부설연구소·전담부서는 R&D 세액공제의 실무 통로',
      '설립 초기에 요건을 맞춰 두면 이후 정책자금 준비가 수월',
    ],
    sections: [
      {
        heading: '1. 벤처기업 확인, 초기 법인에 왜 중요할까요?',
        paragraphs: [
          '벤처확인을 받으면 법인세·소득세 감면, 취득세 감면(요건 충족 시), 기술보증·정책자금 가점, 공공조달·연구소기업 연계 등에서 유리해질 수 있습니다.',
          '유형(벤처투자유형, 연구개발유형, 혁신성장유형 등)마다 요건이 다릅니다. 설립 직후라면 연구인력·지식재산·투자유치 계획 중 현실적인 트랙을 먼저 고르는 것이 핵심입니다.',
        ],
        bullets: [
          '확인 유효기간·갱신 주기를 일정에 넣어 관리',
          '대표·임원 지분, 업종 제한 여부를 사전 확인',
          '인증만 받고 후속 활용(보증·세제)을 놓치지 않기',
        ],
      },
      {
        heading: '2. 기업부설연구소·연구전담부서',
        paragraphs: [
          '연구전담조직을 인정받으면 연구·인력개발비 세액공제, 연구원 병역특례(요건 시), 정부 R&D 과제 참여 기반을 만들기 쉽습니다.',
          '공간·설비·연구인력 요건을 형식만 맞추면 사후 점검에서 문제가 될 수 있습니다. 실제 연구활동 증빙과 인건비 계정이 뒷받침되어야 합니다.',
        ],
        bullets: [
          '연구소 vs 전담부서: 규모·인력 기준이 다름',
          '설립 신고·변경 신고 시기를 놓치면 공제 타이밍이 밀림',
          '벤처 + 연구소 동시 준비 시 서류·일정을 한 번에 설계하는 편이 유리',
        ],
      },
      {
        heading: '3. 초기 3년, 추천 진행 순서',
        paragraphs: [
          '① 사업 모델·업종 확정 → ② 법인 구조·정관 정리 → ③ 연구조직·지식재산 기초 마련 → ④ 벤처확인 → ⑤ 정책자금·보증·세제 신청 순으로 가면 중복 서류를 줄일 수 있습니다.',
          '비즈온탑은 인증 자체보다 “인증 이후 실제로 쓸 혜택”까지 연결해 로드맵을 잡아 드립니다.',
        ],
      },
    ],
    note: '인증·세제 혜택은 고시와 심의 기준이 수시로 바뀝니다. 신청 전 최신 요건 확인이 필요합니다.',
  },
];

export const BusinessInsightsSection: React.FC<BusinessInsightsSectionProps> = ({
  onOpenConsultation,
}) => {
  const [selectedArticle, setSelectedArticle] = useState<BusinessInsightItem | null>(null);

  const renderThumbnail = (category: string) => {
    switch (category) {
      case '법인설립':
        return (
          <div className="w-full h-44 bg-gradient-to-br from-blue-900 to-[#0B1F3A] flex items-center justify-center p-4 relative overflow-hidden">
            <svg viewBox="0 0 200 110" className="w-full h-full" fill="none">
              <rect x="20" y="30" width="160" height="60" rx="8" fill="#1E3A8A" fillOpacity="0.4" stroke="#3B82F6" strokeWidth="1.5" />
              <rect x="35" y="45" width="60" height="8" rx="2" fill="#60A5FA" />
              <rect x="35" y="60" width="90" height="6" rx="2" fill="#93C5FD" fillOpacity="0.8" />
              <circle cx="150" cy="60" r="18" fill="#2563EB" />
              <path d="M144 60L148 64L156 56" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="absolute bottom-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600/80 text-white backdrop-blur-xs">
              GUIDE
            </span>
          </div>
        );
      case '법인전환':
        return (
          <div className="w-full h-44 bg-gradient-to-br from-slate-900 to-blue-950 flex items-center justify-center p-4 relative overflow-hidden">
            <svg viewBox="0 0 200 110" className="w-full h-full" fill="none">
              <path d="M30 80L80 55L120 65L170 30" stroke="#F4A62A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="170" cy="30" r="6" fill="#F4A62A" />
              <rect x="30" y="86" width="30" height="10" rx="2" fill="#64748B" />
              <rect x="75" y="65" width="30" height="31" rx="2" fill="#3B82F6" fillOpacity="0.6" />
              <rect x="120" y="45" width="30" height="51" rx="2" fill="#2563EB" fillOpacity="0.8" />
              <rect x="155" y="25" width="30" height="71" rx="2" fill="#1D4ED8" />
            </svg>
            <span className="absolute bottom-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-600/80 text-white backdrop-blur-xs">
              TAX & SCALE
            </span>
          </div>
        );
      case '기업인증':
        return (
          <div className="w-full h-44 bg-gradient-to-br from-[#0B1F3A] to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
            <svg viewBox="0 0 200 110" className="w-full h-full" fill="none">
              <rect x="40" y="20" width="120" height="70" rx="10" fill="#1E293B" stroke="#0EA5E9" strokeWidth="1.5" />
              <circle cx="75" cy="55" r="18" fill="#0284C7" fillOpacity="0.3" stroke="#38BDF8" strokeWidth="2" />
              <path d="M70 55L74 58L81 51" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="105" y="42" width="40" height="6" rx="2" fill="#CBD5E1" />
              <rect x="105" y="54" width="32" height="5" rx="2" fill="#64748B" />
              <rect x="105" y="64" width="24" height="4" rx="2" fill="#475569" />
            </svg>
            <span className="absolute bottom-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-600/80 text-white backdrop-blur-xs">
              VENTURE & R&D
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="business-insights-section"
      className="py-16 sm:py-24 bg-white border-b border-slate-200/80"
      aria-label="최신 기업정보 및 가이드"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 text-[#2563EB] border border-blue-200 mb-3.5 shadow-2xs">
            <BookOpen className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>BUSINESS INSIGHTS</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#0B1F3A] tracking-tight leading-tight">
            법인설립과 기업운영에 필요한 <br className="hidden sm:inline" />
            정보를 쉽게 알려드립니다.
          </h2>

          <p className="mt-3.5 text-base sm:text-[17px] text-slate-600 font-normal leading-relaxed">
            세법, 상법, 기업지원 정책 등 실무에서 바로 쓰이는 <br className="hidden sm:inline" />
            핵심 정보를 비즈온탑 전문가가 엄선하여 전해드립니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {INSIGHTS_DATA.map((article) => (
            <article
              key={article.id}
              id={`insight-card-${article.id}`}
              className="bg-[#F7F9FC] rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-blue-300 hover:shadow-lg transition-all duration-200 group"
            >
              <div>
                <div className="relative overflow-hidden">
                  {renderThumbnail(article.category)}
                  <span className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-md bg-white text-[#2563EB] shadow-xs">
                    {article.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-semibold mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-[#0B1F3A] tracking-tight mb-2.5 line-clamp-2 group-hover:text-[#2563EB] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed line-clamp-2">
                    {article.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => setSelectedArticle(article)}
                  className="w-full inline-flex items-center justify-between py-3 px-4 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 text-[#0B1F3A] group-hover:text-[#2563EB] font-bold text-xs sm:text-sm transition-all"
                >
                  <span>자세히 보기</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB] group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden max-h-[min(90vh,90dvh)] flex flex-col overscroll-contain"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedArticle(null)}
              aria-label="닫기"
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex-1 overflow-y-auto pr-1">
              <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 text-[#2563EB] border border-blue-100 mb-3">
                {selectedArticle.category}
              </span>

              <h3 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight mb-3 pr-8">
                {selectedArticle.title}
              </h3>

              <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mb-6 pb-4 border-b border-slate-100">
                <span>작성일: {selectedArticle.date}</span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
              </div>

              <div className="space-y-5 text-sm text-slate-700 leading-relaxed font-normal">
                <p className="text-[15px] text-slate-800 font-medium leading-relaxed">
                  {selectedArticle.description}
                </p>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-[#0B1F3A] text-xs uppercase tracking-wider">
                    비즈온탑 전문가 가이드 요약
                  </div>
                  <ul className="text-xs sm:text-sm space-y-1.5 text-slate-600">
                    {selectedArticle.summaryPoints.map((point) => (
                      <li key={point} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedArticle.sections.map((block) => (
                  <div key={block.heading} className="space-y-2.5 pt-1">
                    <h4 className="text-base font-black text-[#0B1F3A] tracking-tight">
                      {block.heading}
                    </h4>
                    {block.paragraphs.map((p) => (
                      <p key={p.slice(0, 24)} className="text-sm text-slate-600 leading-relaxed">
                        {p}
                      </p>
                    ))}
                    {block.bullets && block.bullets.length > 0 && (
                      <ul className="space-y-1.5 pl-0.5">
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

                {selectedArticle.note && (
                  <p className="text-xs text-slate-500 leading-relaxed bg-amber-50 border border-amber-100 rounded-xl px-3.5 py-3">
                    {selectedArticle.note}
                  </p>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    const cat = selectedArticle.category;
                    setSelectedArticle(null);
                    onOpenConsultation(`${cat} 관련 문의`);
                  }}
                  className="flex-1 min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all"
                >
                  <span>이 주제로 상담받기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
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
