/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Star, Sparkles, MessageCircle, Heart, ThumbsUp, AlertCircle, ArrowRight } from 'lucide-react';
import { TRUST_DATA, CONCERNS } from '../data';

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'reviews' | 'concerns';
}

export default function ReviewsModal({ isOpen, onClose, defaultTab = 'reviews' }: ReviewsModalProps) {
  const [activeTab, setActiveTab] = useState<'reviews' | 'concerns'>(defaultTab);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [likes, setLikes] = useState<Record<string, number>>({
    'review-1': 14,
    'review-2': 9,
    'review-3': 18,
  });
  const [likedList, setLikedList] = useState<Record<string, boolean>>({});

  // Synchronize state when defaultTab or isOpen changes
  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab, isOpen]);

  if (!isOpen) return null;

  // Enhance reviews with richer mock metrics to look visually incredible
  const reviewCollection = [
    {
      ...TRUST_DATA.reviews[0],
      tag: 'view',
      tagName: '초광폭 호수공원 영구조망',
      rating: 5,
      date: '2026.05.27',
      satisfaction: '호수 파노라마 조망, 에코 공원 연결',
      avatarLabel: 'K'
    },
    {
      ...TRUST_DATA.reviews[1],
      tag: 'brand',
      tagName: '1군 브랜드 (대우건설)',
      rating: 5,
      date: '2026.05.23',
      satisfaction: '대단지 조경 특화, 안전한 HUG 전격 보증',
      avatarLabel: 'L'
    },
    {
      ...TRUST_DATA.reviews[2],
      tag: 'invest',
      tagName: 'GTX-C & 직주근접 미래가치',
      rating: 5,
      date: '2026.05.19',
      satisfaction: '삼성SDI 초근접, GTX 천안역 연장 수혜',
      avatarLabel: 'P'
    }
  ];

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedList[id]) {
      setLikes(prev => ({ ...prev, [id]: prev[id] - 1 }));
      setLikedList(prev => ({ ...prev, [id]: false }));
    } else {
      setLikes(prev => ({ ...prev, [id]: prev[id] + 1 }));
      setLikedList(prev => ({ ...prev, [id]: true }));
    }
  };

  const handleCtaClick = () => {
    onClose();
    const consultationOffset = document.getElementById('consultation');
    if (consultationOffset) {
      const offsetPosition = consultationOffset.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const filteredReviews = selectedTag === 'all' 
    ? reviewCollection 
    : reviewCollection.filter(r => r.tag === selectedTag);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-[#0a1128]/85 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Box */}
      <div className="relative bg-[#faf9f6] w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-gold-300/30 max-h-[90vh] flex flex-col z-10 animate-scaleUp">
        
        {/* Deep navy premium top banner */}
        <div className="bg-gradient-to-r from-[#0a1128] to-[#1a2d58] p-6 sm:p-8 text-white relative flex-shrink-0">
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 transition-all text-white cursor-pointer z-30"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="space-y-2 max-w-xl">
            <div className="flex items-center space-x-2">
              <span className="flex items-center space-x-1 text-[10px] sm:text-xs bg-gold-600/90 text-white px-2.5 py-1 rounded-full font-bold tracking-wider uppercase">
                <Sparkles className="h-3 w-3 text-gold-200" />
                <span>Verified Customer & Insight Center</span>
              </span>
              <span className="text-[10px] text-gold-300/90 font-mono">Integrated Board</span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              천안 업성 푸르지오 레이크시티<br />
              <span className="bg-gradient-to-r from-gold-300 to-amber-200 bg-clip-text text-transparent font-extrabold">
                안심 주택 자문 연구소 & 고객 안심 센터
              </span>
            </h2>
            
            <p className="text-xs text-slate-300 leading-relaxed font-sans max-w-lg">
              상담을 통해 자격 요건을 완벽 적정 조정하고 리스크를 헷징해가신 VIP 세대주분들의 안심 진단 목록입니다.
            </p>
          </div>

          {/* Decorative Background Circles */}
          <div className="absolute right-0 bottom-0 top-0 overflow-hidden w-1/3 opacity-15 pointer-events-none">
            <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full border-4 border-gold-400" />
            <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full border border-gold-300" />
          </div>
        </div>

        {/* Tab Selection Headers */}
        <div className="grid grid-cols-2 border-b border-gray-200 bg-white flex-shrink-0">
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`py-4 text-center font-extrabold text-xs sm:text-sm md:text-base border-b-2 transition-all cursor-pointer ${
              activeTab === 'reviews' 
                ? 'border-gold-600 text-gold-700 bg-gold-50/25' 
                : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50/50'
            }`}
          >
            💬 실제 고객 방문 후기 ({reviewCollection.length})
          </button>
          <button 
            onClick={() => setActiveTab('concerns')}
            className={`py-4 text-center font-extrabold text-xs sm:text-sm md:text-base border-b-2 transition-all cursor-pointer ${
              activeTab === 'concerns' 
                ? 'border-gold-600 text-gold-700 bg-gold-50/25' 
                : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50/50'
            }`}
          >
            ⚖️ 내집마련 3대 고민 & 해결책
          </button>
        </div>

        {/* Modal Main Content */}
        <div className="p-5 sm:p-8 flex-1 overflow-y-auto space-y-6">
          
          {activeTab === 'reviews' ? (
            /* Tab 1: Customer Reviews */
            <div className="space-y-6">
              {/* Tag Selectors */}
              <div className="flex flex-wrap gap-2 pb-1 border-b border-gray-200/60">
                <button
                  onClick={() => setSelectedTag('all')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedTag === 'all'
                      ? 'bg-[#0a1128] text-white font-extrabold'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-gold-300'
                  }`}
                >
                  전체 보기 ({reviewCollection.length})
                </button>
                <button
                  onClick={() => setSelectedTag('view')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedTag === 'view'
                      ? 'bg-gold-600 text-white font-extrabold'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-gold-300'
                  }`}
                >
                  호수공원 조망권 ({reviewCollection.filter(r => r.tag === 'view').length})
                </button>
                <button
                  onClick={() => setSelectedTag('brand')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedTag === 'brand'
                      ? 'bg-gold-600 text-white font-extrabold'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-gold-300'
                  }`}
                >
                  브랜드 가치 ({reviewCollection.filter(r => r.tag === 'brand').length})
                </button>
                <button
                  onClick={() => setSelectedTag('invest')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedTag === 'invest'
                      ? 'bg-gold-600 text-white font-extrabold'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-gold-300'
                  }`}
                >
                  미래교통·투자 ({reviewCollection.filter(r => r.tag === 'invest').length})
                </button>
              </div>

              {/* Reviews List */}
              <div className="space-y-5">
                {filteredReviews.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-2xl border border-gray-150">
                    <MessageCircle className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-500 font-sans">해당 주제에 등록된 상세 리뷰가 현재 준비 중입니다.</p>
                  </div>
                ) : (
                  filteredReviews.map((r) => (
                    <div 
                      key={r.id}
                      className="bg-white p-5 sm:p-6 rounded-2xl border border-gold-200/50 shadow-sm hover:border-gold-450 transition-all duration-300 hover:shadow-md flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold-500 to-amber-200 text-[#0a1128] flex items-center justify-center font-bold text-sm tracking-tight border border-gold-300 shadow-inner">
                              {r.avatarLabel}
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm font-extrabold text-[#0a1128]">{r.customer}</p>
                              <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 font-mono mt-0.5">
                                <span>{r.date}</span>
                                <span>•</span>
                                <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                                  <ShieldCheck className="h-3 w-3" /> 실방문 인증고객
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-0.5 text-amber-400">
                            {[...Array(r.rating)].map((_, i) => (
                              <Star key={i} className="h-3.5 w-3.5 fill-current" />
                            ))}
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <span className="inline-block text-[10px] bg-gold-50 border border-gold-200 text-gold-700 px-2 py-0.5 rounded font-extrabold uppercase tracking-wide">
                            {r.tagName}
                          </span>
                          <h4 className="text-sm sm:text-base font-extrabold text-[#0a1128] leading-snug">
                            "{r.title}"
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans font-normal">
                            {r.text}
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-[10px] sm:text-xs text-gray-400 font-sans flex items-center gap-1">
                          <Heart className="h-3.5 w-3.5 text-rose-500 fill-current" />
                          <span>강력한 주거 가치 포인트: <strong>{r.satisfaction}</strong></span>
                        </p>

                        <button 
                          onClick={(e) => handleLike(r.id, e)}
                          className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
                            likedList[r.id]
                              ? 'bg-rose-50 text-rose-600 border border-rose-200 font-semibold'
                              : 'bg-gray-50 hover:bg-gold-50 text-gray-500 hover:text-gold-600 border border-gray-200/80'
                          }`}
                        >
                          <ThumbsUp className="h-3 w-3" />
                          <span>추천 ({likes[r.id]})</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            /* Tab 2: Concerns and Solutions Section (Moved from Landing Page) */
            <div className="space-y-6 animate-fadeIn">
              {/* Concerns Title Area */}
              <div className="text-center bg-white border border-gold-200 p-6 rounded-2xl shadow-sm space-y-2">
                <p className="text-gold-600 font-extrabold text-xs tracking-widest uppercase">
                  REAL ESTATE ADVISORY INSIGHT
                </p>
                <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-[#0a1128]">
                  내집마련의 거대한 기회, 하지만 이런 고민을 해본 적 없으신가요?
                </h3>
                <p className="text-xs sm:text-sm text-gray-550 text-gray-500 max-w-xl mx-auto leading-relaxed">
                  나날이 급변하는 천안 아파트 분양 환경과 꼬일 대로 꼬인 가점제 비율, 인터넷 커뮤니티의 검증되지 않은 소문에 겪는 심리적 장애물들을 정직하게 해결해 드립니다.
                </p>
              </div>

              {/* Concerns List cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {CONCERNS.map((item, idx) => (
                  <div
                    key={item.id}
                    className="bg-white hover:bg-gold-50/10 border border-gold-250 p-5 rounded-2xl hover:shadow-premium transition-all duration-300 flex flex-col justify-between group border-gold-200"
                  >
                    <div className="space-y-3.5">
                      <div className="flex items-center space-x-2">
                        <div className="bg-red-50 text-red-600 p-1.5 rounded-lg border border-red-100 flex-shrink-0">
                          <AlertCircle className="h-4 w-4" />
                        </div>
                        <span className="text-[11px] font-extrabold text-red-600">고민 {idx + 1}</span>
                      </div>

                      <h4 className="text-sm font-extrabold text-[#0a1128] leading-snug group-hover:text-gold-700 transition-colors">
                        “{item.issue}”
                      </h4>
                    </div>

                    <div className="mt-5 pt-4 border-t border-gold-200/40 relative">
                      <span className="absolute -top-3 left-4 bg-[#faf9f6] px-2 text-[10px] text-emerald-600 border border-emerald-200 rounded-md font-bold">
                        해결책
                      </span>
                      <p className="text-xs text-gray-650 leading-relaxed text-gray-650 font-sans mt-1">
                        {item.solution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* High-impact visual container for the TWO Hero CTA buttons */}
              <div className="bg-[#0a1128] text-white p-6 rounded-2xl border border-gold-300/30 shadow-xl space-y-4 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="max-w-lg mx-auto space-y-1">
                  <span className="text-[10px] font-bold text-gold-400 tracking-wider uppercase">VIP RESERVATION CHANNELS</span>
                  <h4 className="text-sm sm:text-base font-extrabold leading-tight">
                    고객님의 자격 조건을 사전 체크하고 특별 전형의 맹점을 조율하십시오
                  </h4>
                  <p className="text-[11px] text-slate-350 leading-relaxed font-sans max-w-md mx-auto">
                    공인된 전문 부동산 팀이 자산 비율별 분양 계획과 단지 내 호수 영구 조망 VIP 당첨 우선 라인을 성실히 지원합니다.
                  </p>
                </div>

                {/* The Two Moved Buttons from HeroSection */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-xl mx-auto pt-2">
                  <button
                    onClick={handleCtaClick}
                    className="flex-1 text-center bg-gradient-to-r from-gold-600 to-gold-400 text-white font-extrabold text-xs px-5 py-3.5 rounded-xl hover:from-gold-700 hover:to-gold-500 shadow-md hover:scale-102 active:scale-98 transition-all duration-200 cursor-pointer"
                  >
                    호수뷰 프리미엄 VIP 동·호수 선점신청
                  </button>
                  <button
                    onClick={handleCtaClick}
                    className="flex-1 text-center bg-[#1e305e] border border-gold-400/30 text-white hover:bg-gold-800 font-extrabold text-xs px-5 py-3.5 rounded-xl transition-all duration-200 cursor-pointer"
                  >
                    선착순 분양안내서 & 청약족보 발송신청
                  </button>
                </div>
              </div>

              {/* Bottom Summary Callout Badge */}
              <div className="bg-gradient-to-r from-gold-50 to-white py-3.5 px-5 rounded-xl border border-gold-250 inline-block text-center w-full">
                <p className="text-[11px] text-gray-700 font-bold leading-normal">
                  💡 천안 업성 푸르지오 레이크시티 사전 자문 센터는 개인별 소유 유무, 세대원 자격 전형, 부적격 가점 리스크를 맞춤형으로 예방 보정해 드립니다.
                </p>
              </div>
            </div>
          )}

          {/* Core static CTA Box inside reviewer */}
          <div className="bg-gold-50/50 p-6 rounded-2xl border border-gold-200/70 text-center space-y-3.5">
            <div className="max-w-md mx-auto space-y-1">
              <h4 className="text-sm font-bold text-[#0a1128]">
                나에게 딱 맞는 분양 플랜과 맞춤형 혜택이 궁금하신가요?
              </h4>
              <p className="text-xs text-gray-505 text-gray-500 leading-relaxed font-sans font-light">
                청약 무주택자 여부 자격 점검부터 호수공원 영구 조망 VIP 상담까지, 공인된 전문가가 1:1 안심 금융 컨설팅을 무료로 지원해 드립니다.
              </p>
            </div>
            
            <button
              onClick={handleCtaClick}
              className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-[#0a1128] to-[#1e305e] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md hover:from-gold-650 hover:to-gold-550 transition-all duration-200 cursor-pointer"
            >
              <span>1:1 VIP 전문 사전 예약 신청하기</span>
              <span>→</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
