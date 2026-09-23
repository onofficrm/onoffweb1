import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Sparkles, ChevronUp } from 'lucide-react';
import { SITE_CONTACTS } from '../lib/siteContacts';

interface FloatingCtaBarProps {
  onOpenDiagnosis: () => void;
  onOpenConsultation: (category?: string) => void;
}

export const FloatingCtaBar: React.FC<FloatingCtaBarProps> = ({
  onOpenDiagnosis,
  onOpenConsultation,
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePhoneCall = () => {
    const tel = SITE_CONTACTS.phoneTel.trim();
    if (tel) {
      window.location.href = tel.startsWith('tel:') ? tel : `tel:${tel.replace(/\D/g, '')}`;
      return;
    }
    // 번호 연결 전: 상담 모달을 열지 않음
    window.alert('전화상담 번호는 곧 연결됩니다.');
  };

  const handleKakaoChat = () => {
    const url = SITE_CONTACTS.kakaoUrl.trim();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    // 링크 연결 전: 상담 모달을 열지 않음
    window.alert('카카오톡 상담 링크는 곧 연결됩니다.');
  };

  return (
    <>
      {/* ========================================================
          1. Mobile Floating Bottom Bar (lg:hidden)
          3 Areas: 전화상담 | 무료상담 신청 (가장 강조) | 카카오톡
         ======================================================== */}
      <div 
        id="mobile-floating-cta"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-3 py-2 sm:px-4"
        style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}
      >
        <div className="max-w-md mx-auto grid grid-cols-4 gap-2 items-center">
          
          {/* Left: 전화상담 (Col 1) */}
          <button
            type="button"
            onClick={handlePhoneCall}
            aria-label="전화상담 걸기"
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-slate-700 hover:text-[#16A34A] hover:bg-slate-50 active:bg-slate-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#22C55E] flex items-center justify-center text-white mb-0.5 shadow-sm shadow-green-600/25">
              <Phone className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold">전화상담</span>
          </button>

          {/* Center: 무료상담 신청 (Col 2 & 3 - Double width, MOST EMPHASIZED) */}
          <button
            type="button"
            onClick={() => onOpenConsultation('모바일 빠른상담')}
            className="col-span-2 min-h-[48px] flex items-center justify-center gap-1.5 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white font-black text-sm sm:text-base shadow-md shadow-blue-600/30 transition-all"
          >
            <Sparkles className="w-4 h-4 text-blue-200" />
            <span>무료상담 신청</span>
          </button>

          {/* Right: 카카오톡 (Col 4) — 외부 카톡 링크 (상담 모달 X) */}
          <button
            type="button"
            onClick={handleKakaoChat}
            aria-label="카카오톡 상담 열기"
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-slate-700 hover:text-[#F4A62A] hover:bg-slate-50 active:bg-slate-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#FEE500] flex items-center justify-center text-[#371D1E] mb-0.5 font-black text-xs">
              <MessageSquare className="w-4 h-4 fill-current" />
            </div>
            <span className="text-[11px] font-bold">카카오톡</span>
          </button>

        </div>
      </div>

      {/* ========================================================
          2. Desktop Floating CTA (hidden lg:flex)
          Bottom-right pill button with consultation options + Top button
         ======================================================== */}
      <div 
        id="desktop-floating-cta"
        className="hidden lg:flex fixed bottom-8 right-8 z-40 flex-col items-end gap-3"
      >
        {/* Scroll To Top Button (Shows when scrolled) */}
        {showScrollTop && (
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="페이지 맨 위로 이동"
            className="w-10 h-10 rounded-full bg-white text-slate-600 hover:text-[#2563EB] hover:bg-blue-50 border border-slate-200 shadow-md flex items-center justify-center transition-all duration-200"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        )}

        {/* Main Floating "상담하기" Pill Button */}
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200/90 shadow-xl">
          <button
            type="button"
            onClick={onOpenDiagnosis}
            className="px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#2563EB] font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>3분 진단</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenConsultation('데스크톱 플로팅 상담')}
            className="px-5 py-2.5 rounded-xl bg-[#0B1F3A] hover:bg-[#152e52] text-white font-bold text-sm shadow-sm transition-all flex items-center gap-2 group"
          >
            <span>상담하기</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>
        </div>
      </div>
    </>
  );
};
