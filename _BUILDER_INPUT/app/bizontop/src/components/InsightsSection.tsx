import React, { useState } from 'react';
import { 
  FileText, 
  ArrowRight, 
  Calendar, 
  Eye, 
  Tag,
  BookOpen,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface ArticleItem {
  id: string;
  category: '법인설립' | '법인전환' | '정책자금' | '기업인증' | '세무/경영';
  badgeColor: string;
  badgeBg: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  thumbnailUrl: string;
  summaryPoints?: string[];
}

interface InsightsSectionProps {
  onSelectArticle?: (article: ArticleItem) => void;
  onOpenConsultation?: (category: string) => void;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({ 
  onSelectArticle,
  onOpenConsultation 
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('전체');
  const [selectedArticleModal, setSelectedArticleModal] = useState<ArticleItem | null>(null);

  const categories = ['전체', '법인설립', '법인전환', '정책자금', '기업인증', '세무/경영'];

  const articles: ArticleItem[] = [
    {
      id: 'insight-1',
      category: '법인설립',
      badgeColor: 'text-blue-700',
      badgeBg: 'bg-blue-50 border-blue-200',
      title: '법인설립 전 반드시 알아야 할 자본금과 주주구성 가이드',
      description: '상법 개정 이후 100원 자본금으로도 설립이 가능하지만, 실제 인허가 및 사업자등록 시 적정 자본금 설정이 중요한 이유를 정리했습니다.',
      date: '2025.02.18',
      readTime: '4분',
      thumbnailUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=700&q=80',
      summaryPoints: [
        '자본금 규모에 따른 등록면허세 및 관할 등기소 공과금 차이',
        '인허가 업종(건설, 여행, 근로자파견 등)별 법정 최소 자본금 기준',
        '감사 선임 없는 1인 주주·임원 설립 시 주의사항과 실무 팁'
      ]
    },
    {
      id: 'insight-2',
      category: '법인전환',
      badgeColor: 'text-indigo-700',
      badgeBg: 'bg-indigo-50 border-indigo-200',
      title: '개인사업자 매출 얼마일 때 법인전환이 가장 유리할까?',
      description: '소득세 최고세율 45% vs 법인세 9~19% 구간 비교와 종합소득세 절감, 포괄양수도 시 세무상 검토 포인트를 분석해드립니다.',
      date: '2025.02.12',
      readTime: '5분',
      thumbnailUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=700&q=80',
      summaryPoints: [
        '과세표준 구간별 개인소득세와 법인세 실효세율 차이 분석',
        '단순 신규법인 설립 vs 사업양수도(세감면 포괄양수도) 차이점',
        '대표자 급여, 상여금, 배당 설계를 통한 합법적 절세 플랜'
      ]
    },
    {
      id: 'insight-3',
      category: '정책자금',
      badgeColor: 'text-emerald-700',
      badgeBg: 'bg-emerald-50 border-emerald-200',
      title: '2025년도 창업 초기 법인을 위한 중기부·기보 정책자금 준비 전략',
      description: '중소벤처기업진흥공단 청년전용창업자금과 기술보증기금 예비창업자 보증 등 설립 1년 미만 법인이 주목해야 할 핵심 정책자금입니다.',
      date: '2025.02.05',
      readTime: '6분',
      thumbnailUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=700&q=80',
      summaryPoints: [
        '기관별(중진공, 신보, 기보) 심사 포인트와 신청 시기',
        '사업계획서 작성 시 핵심 지표(BM, 기술성, 시장성) 서술 요령',
        '법인 정관의 사업목적과 표준산업분류코드 일치 여부 점검'
      ]
    },
  ];

  const filteredArticles = activeCategory === '전체' 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

  const handleOpenDetail = (article: ArticleItem) => {
    setSelectedArticleModal(article);
    if (onSelectArticle) {
      onSelectArticle(article);
    }
  };

  return (
    <section
      id="insights"
      className="w-full bg-[#F8FAFC] py-16 sm:py-20 lg:py-24 border-b border-slate-200/80 scroll-mt-20"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div
            id="insights-eyebrow"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[12px] sm:text-[13px] font-semibold tracking-wider mb-3.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span>BUSINESS INSIGHTS</span>
          </div>

          <h2
            id="insights-main-title"
            className="text-[28px] sm:text-[36px] md:text-[40px] font-black text-[#0B1F3A] tracking-tight leading-[1.25] mb-4"
          >
            법인설립과 기업운영에 필요한
            <br />
            정보를 쉽게 알려드립니다.
          </h2>

          <p
            id="insights-description"
            className="text-[15px] sm:text-[16.5px] text-slate-600 leading-relaxed max-w-2xl mx-auto"
          >
            복잡한 법률·세무·정책 용어를 창업자의 눈높이에 맞춰 정리한 실무 아티클입니다.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-[13.5px] font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#0B1F3A] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3 Articles Grid */}
        <div
          id="insights-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12"
        >
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              id={article.id}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={article.thumbnailUrl}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`text-[12px] font-bold px-3 py-1 rounded-full border shadow-2xs backdrop-blur-md bg-white/95 ${article.badgeColor}`}
                    >
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Date & Read time */}
                  <div className="flex items-center gap-3 text-[12px] text-slate-400 font-medium mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span>읽는 시간 {article.readTime}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-[18px] sm:text-[19px] font-bold text-[#0B1F3A] group-hover:text-blue-600 transition-colors leading-snug mb-3 line-clamp-2">
                    {article.title}
                  </h3>

                  {/* 2-line Description */}
                  <p className="text-[14px] text-slate-600 leading-relaxed line-clamp-2">
                    {article.description}
                  </p>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => handleOpenDetail(article)}
                  className="w-full inline-flex items-center justify-between text-[14px] font-bold text-blue-600 group-hover:text-blue-700 py-2 border-t border-slate-100 cursor-pointer transition-colors"
                >
                  <span>자세히 보기</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Article Quick Modal for Readability */}
        {selectedArticleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[12px] font-bold px-3 py-1 rounded-full border ${selectedArticleModal.badgeBg} ${selectedArticleModal.badgeColor}`}>
                  {selectedArticleModal.category}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedArticleModal(null)}
                  className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1 cursor-pointer"
                >
                  ✕ 닫기
                </button>
              </div>

              <h3 className="text-[21px] sm:text-[23px] font-black text-[#0B1F3A] mb-3 leading-snug">
                {selectedArticleModal.title}
              </h3>
              <div className="text-[12.5px] text-slate-400 mb-5 flex items-center gap-2">
                <span>{selectedArticleModal.date}</span>
                <span>•</span>
                <span>비즈온탑 경영연구팀</span>
              </div>

              <p className="text-[15px] text-slate-700 leading-relaxed mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                {selectedArticleModal.description}
              </p>

              {selectedArticleModal.summaryPoints && (
                <div className="mb-6 space-y-2.5">
                  <h4 className="text-[14px] font-bold text-[#0B1F3A]">핵심 체크포인트</h4>
                  {selectedArticleModal.summaryPoints.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-[13.5px] text-slate-600">
                      <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedArticleModal(null);
                    if (onOpenConsultation) {
                      onOpenConsultation(selectedArticleModal.category);
                    }
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[14.5px] text-center cursor-pointer transition-colors"
                >
                  이 주제로 상담 문의하기
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedArticleModal(null)}
                  className="py-3 px-5 rounded-xl border border-slate-300 text-slate-700 font-bold text-[14.5px] hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
