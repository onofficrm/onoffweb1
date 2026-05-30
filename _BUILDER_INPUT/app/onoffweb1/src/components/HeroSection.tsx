/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, Compass, MapPin, Sparkles, UserCheck } from 'lucide-react';
import { CORE_INFO, INSTANT_STATS, TRUST_DATA } from '../data';

interface HeroSectionProps {
  onCtaClick: () => void;
  onOpenReviews: (tab: 'reviews' | 'concerns') => void;
}

export default function HeroSection({ onCtaClick, onOpenReviews }: HeroSectionProps) {
  return (
    <section 
      id="hero" 
      className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 bg-shimmer overflow-hidden min-h-[90vh] flex items-center"
    >
      {/* Decorative Golden Ambient Circles */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gold-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-gold-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - SEO Hook & Core Slogan & Typography */}
          <div className="lg:col-span-7 space-y-6 text-left animate-slideUp">
            {/* Tag Badge */}
            <div className="inline-flex items-center space-x-1.5 bg-gold-100/80 border border-gold-300 px-3.5 py-1.5 rounded-full shadow-sm">
              <Sparkles className="h-4.5 w-4.5 text-gold-600 animate-spin-pulse" />
              <span className="text-xs font-extrabold text-gold-900 tracking-tight">
                2026년 천안 서북구 최고 기대작 프리미엄 분양 정보
              </span>
            </div>

            {/* Main Premium Typography Title */}
            <div className="space-y-2">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] font-bold text-[#0a1128] leading-[1.15] tracking-tight">
                <span className="block text-gold-600 drop-shadow-sm">천안 업성</span>
                푸르지오 <span className="font-sans font-light">레이크시티</span>
              </h1>
              <p className="font-sans text-lg sm:text-xl font-bold text-[#1e305e] tracking-tight">
                {CORE_INFO.slogan}
              </p>
            </div>

            {/* Multi-sensory SEO Description */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
              성성호수공원과 업성수변생태공원을 마주하는 최고급 워터프론트 주거 벨트의 완성! 
              <strong className="font-semibold text-gray-900"> 대우건설 푸르지오</strong> 명품 대단지가 선사하는 뷰 프리미엄과 
              GTX-C 천안 연장 교통 축, 삼성SDI 명품 직주근접 배후 주거지 등 압도적인 가치를 먼저 소유하세요. 
              <span className="text-gray-500 block mt-1">※ 본 공식홍보관은 안전하고 프라이빗한 관람을 위하여 사전 예약제로 운영됩니다.</span>
            </p>

            {/* Essential Localized Meta Tags for Naver GEO Searches */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 border-t border-gold-200/40">
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-gold-555 mt-0.5 text-gold-600 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-extrabold text-gray-800">단지 위치 (GEO)</h4>
                  <p className="text-xs text-gray-500 leading-normal">{CORE_INFO.location}</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Compass className="h-5 w-5 text-gold-555 mt-0.5 text-gold-600 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-extrabold text-gray-800 font-sans">규모 및 시공</h4>
                  <p className="text-xs text-gray-500 leading-normal">{CORE_INFO.scale}, 1군 브랜드</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <button
                onClick={() => onOpenReviews('concerns')}
                className="flex-[2] sm:flex-none text-center bg-gradient-to-r from-gold-650 to-gold-500 text-white font-extrabold text-sm px-8 py-4 rounded-xl hover:from-gold-700 hover:to-gold-600 shadow-lg hover:shadow-gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 bg-gold-600 cursor-pointer"
              >
                ⚖️ 자가진단 고민 & 해결책 바로보기
              </button>
              <button
                onClick={() => onOpenReviews('reviews')}
                className="flex-1 sm:flex-none text-center bg-[#111c3a] text-white hover:bg-gold-800 font-extrabold text-xs px-6 py-4 rounded-xl transition-all duration-200 cursor-pointer"
              >
                💬 고객 실제 조망 방문 후기 ({TRUST_DATA.reviews.length}건)
              </button>
            </div>
          </div>

          {/* Right Column - Beautiful Lakeside View Image */}
          <div className="lg:col-span-5 relative w-full lg:h-auto min-h-[380px] sm:min-h-[460px] rounded-2xl overflow-hidden shadow-2xl group border border-gold-300/30">
            
            {/* Main Generated Architectural Rendering */}
            <img 
              referrerPolicy="no-referrer"
              src="/src/assets/images/prugio_lake_gorgeous_1779964630124.png" 
              alt="천안 업성 푸르지오 레이크시티 조감도" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-750 z-0"
              onError={(e) => {
                // Return beautiful placeholder styling if load error
                e.currentTarget.style.display = 'none';
              }}
            />
            
            {/* Soft, ultra-subtle gradient overlay just for professional finish */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10" />
            
          </div>
        </div>
      </div>
    </section>
  );
}
