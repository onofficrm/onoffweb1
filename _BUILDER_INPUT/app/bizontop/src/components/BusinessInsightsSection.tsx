import React, { useState } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  X, 
  CheckCircle2, 
  ExternalLink 
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
    description: '100원 이상이면 자유롭게 설정 가능한 자본금, 실제 업종 인허가와 대외 신인도를 고려해 현명하게 결정하는 핵심 원칙을 정리했습니다.',
    date: '2025.02.18',
    readTime: '4분 읽기',
  },
  {
    id: 'post-02',
    category: '법인전환',
    title: '개인사업자 순이익 8천만 원 이상 시 법인전환이 유리한 이유',
    description: '종합소득세율 최고 45% 구간과 법인세 기본 세율 9~19% 구간의 구조적 차이 및 포괄양수도 전환 절차를 알기 쉽게 비교합니다.',
    date: '2025.02.10',
    readTime: '5분 읽기',
  },
  {
    id: 'post-03',
    category: '기업인증',
    title: '초기 법인을 위한 벤처인증과 기업부설연구소 혜택 총정리',
    description: '설립 3년 이내 기업이 벤처기업 및 연구전담부서를 확보했을 때 누릴 수 있는 4대 세제 혜택과 정부 보증 연계 포인트를 소개합니다.',
    date: '2025.01.28',
    readTime: '6분 읽기',
  },
];

export const BusinessInsightsSection: React.FC<BusinessInsightsSectionProps> = ({
  onOpenConsultation,
}) => {
  const [selectedArticle, setSelectedArticle] = useState<BusinessInsightItem | null>(null);

  // Render SVG Thumbnail matching the article topic
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
        
        {/* Section Header */}
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

        {/* 3 Blog / News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {INSIGHTS_DATA.map((article) => (
            <article
              key={article.id}
              id={`insight-card-${article.id}`}
              className="bg-[#F7F9FC] rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-blue-300 hover:shadow-lg transition-all duration-200 group"
            >
              <div>
                {/* Visual Thumbnail */}
                <div className="relative overflow-hidden">
                  {renderThumbnail(article.category)}
                  <span className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-md bg-white text-[#2563EB] shadow-xs">
                    {article.category}
                  </span>
                </div>

                {/* Article Body */}
                <div className="p-6">
                  {/* Meta: Date & Read Time */}
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

                  {/* Title */}
                  <h3 className="text-lg font-black text-[#0B1F3A] tracking-tight mb-2.5 line-clamp-2 group-hover:text-[#2563EB] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  {/* 2-line Description */}
                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed line-clamp-2">
                    {article.description}
                  </p>
                </div>
              </div>

              {/* Bottom Action: [자세히 보기 →] */}
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

      {/* Article Detail Viewer Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden max-h-[90vh] flex flex-col">
            <button
              type="button"
              onClick={() => setSelectedArticle(null)}
              aria-label="닫기"
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex-1 overflow-y-auto pr-1">
              <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 text-[#2563EB] border border-blue-100 mb-3">
                {selectedArticle.category}
              </span>

              <h3 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight mb-3">
                {selectedArticle.title}
              </h3>

              <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mb-6 pb-4 border-b border-slate-100">
                <span>작성일: {selectedArticle.date}</span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
              </div>

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed font-normal">
                <p>{selectedArticle.description}</p>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-[#0B1F3A] text-xs uppercase tracking-wider">
                    비즈온탑 전문가 가이드 요약
                  </div>
                  <ul className="text-xs space-y-1.5 text-slate-600">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>개별 기업의 업종 인허가 조건에 따른 자본금 산정 기준</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>초기 주주 지분율 67% 이상 확보를 통한 경영권 방어 원칙</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>설립 등기 완료 즉시 적용 가능한 정책자금 및 벤처인증 연계 로드맵</span>
                    </li>
                  </ul>
                </div>
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
