/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TRUST_DATA } from '../data';
import { Award, Check, MessageSquare, ArrowRight } from 'lucide-react';

interface TrustSectionProps {
  onOpenReviews: () => void;
}

export default function TrustSection({ onOpenReviews }: TrustSectionProps) {
  return (
    <section id="trust" className="py-20 bg-shimmer border-t border-b border-gold-200/50 relative">
      <div className="absolute inset-0 bg-[#fbf9f4]/40 z-0 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Core numbers display (SEO friendly statistics) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Summary text, Years of experiences */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold text-gold-600 tracking-wider">PROVEN CREDIBILITY</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0a1128] tracking-tight">
                숫자와 인증으로 증명되는<br />
                <span className="text-gold-600">압도적인 공신력</span>과 신뢰성
              </h2>
            </div>
            
            <p className="text-sm text-gray-500 leading-relaxed font-sans">
              부동산 분양은 세밀한 안전장치와 자본 안정성에서 시작됩니다. 
              수많은 대단지 성공 노하우를 바탕으로, 계약금 안심 보장제는 물론 
              주택도시보증공사(HUG) 분양 전격 보증으로 단 1%의 리스크도 용납하지 않습니다.
            </p>
 
            {/* Experience badge */}
            <div className="flex items-center space-x-4 bg-white p-4.5 rounded-2xl border border-gold-200/60 shadow-sm">
              <div className="w-12 h-12 bg-gold-100 flex items-center justify-center rounded-xl text-gold-600">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-sans">Brand Development & Consulting</p>
                <p className="text-sm font-extrabold text-[#0a1128]">
                  {TRUST_DATA.developerTitle} <span className="text-gold-600">{TRUST_DATA.years}개년</span> 동행
                </p>
              </div>
            </div>
          </div>
 
          {/* Right Block: Stats Counter Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            {TRUST_DATA.stats.map((stat, idx) => (
              <div 
                key={idx}
                className="bg-white p-6 rounded-2xl border border-gold-200/60 shadow-sm flex flex-col justify-center space-y-1 hover:border-gold-350 transition-colors"
              >
                <span className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-gold-600">
                  {stat.number}
                </span>
                <span className="text-xs font-bold text-gray-800 font-sans">
                  {stat.label}
                </span>
                <p className="text-[10px] text-gray-400 leading-normal pt-1.5 border-t border-gray-100 flex items-center space-x-1">
                  <Check className="h-3 w-3 text-emerald-500 flex-shrink-0" />
                  <span>공식 자문 인증 데이터</span>
                </p>
              </div>
            ))}
          </div>
 
        </div>

        {/* Clean marketing section prompting reviews instead of having messy sliders on landing */}
        <div className="mt-16 bg-white p-8 sm:p-10 rounded-3xl border border-gold-200/70 shadow-premium max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {/* Backdrop shine */}
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-gold-50/40 blur-3xl" />
          
          <div className="space-y-2 relative z-10 text-center md:text-left">
            <div className="inline-flex items-center space-x-1.5 bg-gold-50 border border-gold-200 text-gold-700 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider font-sans">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>REAL CLIENT IN-DEPTH REVIEWS</span>
            </div>
            
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0a1128] tracking-tight">
              실제 방문 및 심사 적격 고객들의 생생 사례 보기
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans max-w-lg">
              영구 레이크 뷰, 청약 자격 자문, 계약금 보장제에 가점을 더한 안심 후기를 만나보세요.
            </p>
          </div>

          <div className="z-10 flex-shrink-0 w-full md:w-auto">
            <button
              onClick={onOpenReviews}
              className="w-full md:w-auto inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-gold-650 to-gold-555 hover:from-gold-600 hover:to-gold-500 text-white font-extrabold text-sm px-6 py-3.5 rounded-full shadow-lg hover:shadow-gold-heavy hover:scale-103 transition-all duration-200 cursor-pointer text-center bg-gold-600"
            >
              <span>실제 방문고객 후기 전체보기</span>
              <ArrowRight className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
 
      </div>
    </section>
  );
}
