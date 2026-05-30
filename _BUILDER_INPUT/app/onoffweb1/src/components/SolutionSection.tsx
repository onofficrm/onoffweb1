/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SOLUTIONS } from '../data';
import { ArrowRight, Sparkles, Trophy, Map } from 'lucide-react';

interface SolutionSectionProps {
  onCtaClick: () => void;
}

export default function SolutionSection({ onCtaClick }: SolutionSectionProps) {
  const iconsData = [
    <Trophy className="h-6 w-6 text-gold-600" />,
    <Map className="h-6 w-6 text-gold-600" />,
    <Sparkles className="h-6 w-6 text-gold-600" />
  ];

  return (
    <section id="solution" className="py-20 bg-shimmer border-t border-b border-gold-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Dynamic decorative backdrop text */}
        <div className="absolute right-0 top-0 text-[100px] lg:text-[150px] font-display font-extrabold text-gold-100/20 tracking-tighter select-none pointer-events-none uppercase">
          prugio
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Block - Big Title, Slogan and action CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold text-gold-600 tracking-wider">THE ULTIMATE ANSWER</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0a1128] leading-[1.2] tracking-tight">
                {SOLUTIONS.title}
              </h2>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed font-light">
              호수의 쾌적함과 대단지의 브랜드 역량, 그리고 GTX-C와 삼성 직주근접 인프라의 교집합은 오직 업성지구 푸르지오 레이크시티뿐입니다. 성공적인 부동산 투자의 공식을 수치와 결과로 지켜보세요.
            </p>
            <div className="pt-2">
              <button
                onClick={onCtaClick}
                className="inline-flex items-center space-x-2 bg-[#0a1128] hover:bg-gold-700 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-md transition-all duration-200 cursor-pointer"
              >
                <span>실시간 잔여 동호수 프리미엄 리포트 신청</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Right Block - Three elegant solution segments */}
          <div className="lg:col-span-7 space-y-5">
            {SOLUTIONS.items.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white p-6 rounded-2xl border border-gold-200 shadow-sm hover:shadow-premium group transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  {/* Decorative Number Badge */}
                  <div className="flex-shrink-0 w-12 h-12 bg-gold-50 group-hover:bg-gold-550 group-hover:text-gold-100 flex items-center justify-center rounded-xl text-gold-600 font-display font-extrabold text-[#111c3a] text-[#b47826] border border-gold-200 transition-colors">
                    {iconsData[idx] || item.step}
                  </div>
                  
                  {/* Core detail text */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[11px] font-sans text-gold-600 font-extrabold tracking-wider">STEP {item.step}</span>
                      <span className="h-1 w-1 rounded-full bg-gold-450 bg-gold-500"></span>
                      <h3 className="text-base font-extrabold text-[#0a1128] tracking-tight">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-650 leading-relaxed text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
