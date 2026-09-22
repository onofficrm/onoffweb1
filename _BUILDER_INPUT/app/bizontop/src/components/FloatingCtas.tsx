import React, { useState, useEffect } from 'react';
import { Sparkles, MessageSquare, ArrowUp, ArrowRight } from 'lucide-react';

interface FloatingCtasProps {
  onOpenConsultation: () => void;
  onOpenDiagnosis: () => void;
}

export const FloatingCtas: React.FC<FloatingCtasProps> = ({
  onOpenConsultation,
  onOpenDiagnosis,
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleKakaoTalk = () => {
    // KakaoTalk inquiry action (opens consultation with preferred KakaoTalk method)
    onOpenConsultation();
  };

  return (
    <>
      {/* ============================================================== */}
      {/* 1. Mobile Bottom Fixed CTA Bar (Only visible on screens < 640px) */}
      {/* ============================================================== */}
      <aside
        id="mobile-bottom-cta-bar"
        aria-label="빠른 상담 바로가기"
        className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]"
      >
        <div className="grid grid-cols-12 gap-2 items-center max-w-md mx-auto">
          {/* Left: 전화상담 (3 cols) */}
          <a
            id="mobile-phone-call-btn"
            href="tel:1544-0000"
            className="col-span-3 min-h-[46px] rounded-xl border border-slate-200 bg-slate-50 active:bg-slate-100 flex flex-col items-center justify-center text-slate-700 text-[11px] font-bold transition-colors"
          >
            <span className="text-[13px] leading-tight">📞</span>
            <span className="leading-tight mt-0.5">전화상담</span>
          </a>

          {/* Center (MOST EMPHASIZED): 무료상담 신청 (6 cols) */}
          <button
            id="mobile-main-consult-btn"
            type="button"
            onClick={onOpenDiagnosis}
            className="col-span-6 min-h-[46px] rounded-xl bg-[#2563EB] active:bg-blue-700 text-white flex items-center justify-center gap-1.5 px-2 text-[13.5px] font-bold shadow-md shadow-blue-500/25 transition-transform active:scale-[0.98] cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>무료상담 신청</span>
          </button>

          {/* Right: 카카오톡 (3 cols) */}
          <button
            id="mobile-kakao-btn"
            type="button"
            onClick={handleKakaoTalk}
            className="col-span-3 min-h-[46px] rounded-xl bg-[#FEE500] active:bg-[#FADA0A] text-[#191919] flex flex-col items-center justify-center text-[11px] font-bold transition-colors cursor-pointer"
          >
            <span className="text-[13px] leading-tight">💬</span>
            <span className="leading-tight mt-0.5">카카오톡</span>
          </button>
        </div>
      </aside>

      {/* ============================================================== */}
      {/* 2. Desktop Floating Consultation Button (Visible >= 640px)     */}
      {/* ============================================================== */}
      <div
        id="desktop-floating-cta-container"
        className="hidden sm:flex fixed bottom-8 right-6 z-40 flex-col items-end gap-2.5"
      >
        {/* Scroll To Top Button (Conditional) */}
        {showScrollTop && (
          <button
            id="desktop-scroll-top-btn"
            type="button"
            onClick={scrollToTop}
            aria-label="맨 위로 이동"
            className="w-10 h-10 rounded-full bg-white text-slate-600 hover:text-[#0B1F3A] hover:bg-slate-100 border border-slate-200/90 shadow-md flex items-center justify-center transition-all cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {/* Floating Consultation Button */}
        <button
          id="desktop-floating-consult-btn"
          type="button"
          onClick={onOpenDiagnosis}
          className="group inline-flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-[#0B1F3A] hover:bg-[#2563EB] text-white shadow-xl shadow-slate-900/20 hover:shadow-blue-500/30 border border-slate-700/60 transition-all duration-300 cursor-pointer focus:outline-hidden focus:ring-4 focus:ring-blue-400/30"
        >
          <div className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <div className="flex flex-col text-left pr-1">
            <span className="text-[14px] font-bold leading-tight">3분 무료진단</span>
            <span className="text-[11px] text-slate-300 font-medium group-hover:text-blue-100 leading-tight">
              맞춤 법인설립 상담
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
        </button>
      </div>
    </>
  );
};
