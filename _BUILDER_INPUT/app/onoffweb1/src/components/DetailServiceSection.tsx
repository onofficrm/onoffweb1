/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PREMIUM_FEATURES } from '../data';
import { PremiumFeature } from '../types';
import { 
  Waves, 
  ShieldCheck, 
  Compass, 
  GraduationCap, 
  Sparkles, 
  TrendingUp,
  X,
  CheckCircle2,
  CalendarDays
} from 'lucide-react';

interface DetailServiceSectionProps {
  onCtaClick: () => void;
}

export default function DetailServiceSection({ onCtaClick }: DetailServiceSectionProps) {
  const [selectedFeature, setSelectedFeature] = useState<PremiumFeature | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Waves':
        return <Waves className="h-6 w-6 text-gold-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="h-6 w-6 text-gold-600" />;
      case 'Compass':
        return <Compass className="h-6 w-6 text-gold-600" />;
      case 'GraduationCap':
        return <GraduationCap className="h-6 w-6 text-gold-600" />;
      case 'Sparkles':
        return <Sparkles className="h-6 w-6 text-gold-600" />;
      case 'TrendingUp':
        return <TrendingUp className="h-6 w-6 text-gold-600" />;
      default:
        return <Sparkles className="h-6 w-6 text-gold-600" />;
    }
  };

  const getFeatureImage = (tag: string) => {
    if (tag === 'lake_view') {
      return '/src/assets/images/prugio_vivid_view_1779964479670.png';
    }
    // High-quality premium landscape placeholders
    switch (tag) {
      case 'brand_premium':
        return '/src/assets/images/lakeside_prugio_family_1779964224662.png';
      case 'traffic_infra':
        return '/src/assets/images/prugio_lakeside_gtx_1779975946451.png';
      case 'edu_life':
        return '/src/assets/images/prugio_edu_life_school_1780063360334.png';
      case 'community_club':
        return 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=800';
      case 'wealth_value':
        return '/src/assets/images/prugio_samsung_sdi_1779975794780.png';
      default:
        return 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800';
    }
  };

  return (
    <section id="features" className="py-22 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold text-gold-600 tracking-widest uppercase bg-gold-100/50 px-3.5 py-1.5 rounded-full">
            6 PREMIER VALUES
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0a1128] tracking-tight">
            천안 업성 푸르지오 레이크시티만의 <span className="text-gold-600">6대 가치 분석</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-550 max-w-xl mx-auto leading-relaxed text-gray-500">
            비교할수록 확실해지는 미래 가치. 천안 서북구 성성·업성지구의 
            압도적 이점을 담은 프리미엄 포인트를 디테일하게 분석 제안합니다.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div id="features-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PREMIUM_FEATURES.map((feat) => (
            <div
              key={feat.id}
              onClick={() => setSelectedFeature(feat)}
              className="bg-[#fafafa] hover:bg-white border border-gray-150 hover:border-gold-350 p-5 rounded-2xl shadow-sm hover:shadow-premium group transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Image Header wrapper */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-gray-100 bg-gray-150">
                  <img
                    referrerPolicy="no-referrer"
                    src={getFeatureImage(feat.imageTag)}
                    alt={feat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-2 rounded-lg border border-gray-100/50 shadow-sm">
                    {getIcon(feat.iconName)}
                  </div>
                </div>
                
                {/* Titles */}
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-bold text-gold-600 uppercase tracking-widest block font-sans font-semibold">
                    {feat.subtitle}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#0a1128] group-hover:text-gold-600 transition-colors">
                    {feat.title}
                  </h3>
                </div>

                {/* Primary Description */}
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans">
                  {feat.description}
                </p>
              </div>

              {/* Read more footer hook */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium group-hover:text-gold-600">
                <span>상세 요약 보고서 읽기</span>
                <span className="text-base font-bold transition-transform group-hover:translate-x-1 duration-200">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Premium Detail Dialog/Modal */}
        {selectedFeature && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white max-w-lg w-full rounded-2xl overflow-hidden border border-gold-300 shadow-2xl relative animate-zoomIn">
              
              {/* Header Image Accent Background */}
              <div className="bg-gradient-to-r from-[#0a1128] to-[#1e305e] p-6 text-white relative">
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/10 rounded-xl border border-white/15">
                    {getIcon(selectedFeature.iconName)}
                  </div>
                  <div>
                    <p className="text-[10px] text-gold-300 font-semibold uppercase tracking-widest">
                      {selectedFeature.subtitle}
                    </p>
                    <h4 className="text-lg sm:text-xl font-bold tracking-tight">
                      {selectedFeature.title}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Visual Asset inside the modal */}
              <div className="relative aspect-[16/9] w-full border-b border-gray-100 bg-gray-50 overflow-hidden">
                <img
                  referrerPolicy="no-referrer"
                  src={getFeatureImage(selectedFeature.imageTag)}
                  alt={selectedFeature.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Body details text */}
              <div className="p-6 space-y-4">
                <div className="bg-gold-50/50 p-4 rounded-xl border border-gold-150">
                  <p className="text-xs text-gold-850 font-bold leading-normal text-gold-700">
                    💡 업성지구 명품 랜드마크 투자 전문가 리포트 파악
                  </p>
                  <p className="text-xs text-gray-500 mt-1 leading-normal font-sans">
                    본 정보는 천안 서북구의 최신 도시정비개발계획 및 시공사 설계 예정을 바탕으로 구성된 핵심 입지 분석입니다.
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-gray-800">입지 강점 상세 분석</span>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                    {selectedFeature.longDescription}
                  </p>
                </div>

                {/* Specific features checklist */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                  <div className="flex items-center space-x-1.5 text-xs text-gray-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    <span>영구 보증 수혜지</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs text-gray-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    <span>HUG 분양보증 완료</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs text-gray-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    <span>대우건설 주거 프리미엄</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs text-gray-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    <span>사전 방문예약시 100% 무료자문</span>
                  </div>
                </div>
              </div>

              {/* Bottom quick CTA */}
              <div className="bg-gray-50 border-t border-gray-100 p-4 flex items-center justify-between">
                <p className="text-[10px] text-gray-400 font-sans">
                  *모든 정보는 상담 시 상세 보장됩니다.
                </p>
                <button
                  onClick={() => {
                    setSelectedFeature(null);
                    onCtaClick();
                  }}
                  className="bg-[#0a1128] hover:bg-gold-600 text-white font-bold text-xs px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  사전예약 상담등록
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
