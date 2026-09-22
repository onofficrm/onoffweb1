import React, { useEffect, useState } from 'react';
import { ArrowUp, Phone, MessageSquareText, FileText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { siteSettingsService } from '../../services/siteSettingsService';

interface FloatingBarProps {
  onOpenConsultation: () => void;
}

export const FloatingBar: React.FC<FloatingBarProps> = ({ onOpenConsultation }) => {
  const [showTopButton, setShowTopButton] = useState(false);
  const [tel, setTel] = useState(() => siteSettingsService.getSettings().tel);
  const location = useLocation();

  // Don't show sticky mobile bar on /admin or /consultation page to prevent UI overlap
  const isExcludedPage =
    location.pathname.startsWith('/admin') ||
    location.pathname === '/consultation';

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleSettingsUpdate = () => {
      setTel(siteSettingsService.getSettings().tel);
    };
    window.addEventListener('bizontop_settings_updated', handleSettingsUpdate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('bizontop_settings_updated', handleSettingsUpdate);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cleanPhone = tel.replace(/[^0-9]/g, '');

  return (
    <>
      {/* 1. Desktop Floating Quick Pill & Scroll-to-Top (Hidden on Mobile) */}
      <div className="hidden md:flex fixed bottom-6 right-5 z-40 flex-col items-end gap-2.5">
        <button
          onClick={onOpenConsultation}
          className="flex items-center gap-2 px-4 py-3 bg-[#102B50] text-white hover:bg-[#0B1E38] rounded-full shadow-lg border border-slate-700/40 transition-all hover:scale-105 cursor-pointer group"
          aria-label="무료 자금 진단 상담창 열기"
        >
          <span className="w-2 h-2 rounded-full bg-[#D5A64B] animate-pulse"></span>
          <MessageSquareText className="w-4 h-4 text-[#D5A64B]" />
          <span className="text-xs font-bold tracking-tight">무료 1:1 상담 진단</span>
        </button>

        {showTopButton && (
          <button
            onClick={scrollToTop}
            className="p-2.5 bg-white text-[#102B50] hover:bg-slate-50 border border-slate-200 rounded-full shadow-md transition-all hover:-translate-y-0.5 cursor-pointer"
            aria-label="페이지 상단으로 이동"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 2. Mobile Sticky Bottom CTA Bar (Visible on Mobile Only, unless on /consultation or /admin) */}
      {!isExcludedPage && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-2xl safe-area-pb">
          <div className="flex items-center gap-2.5 max-w-md mx-auto">
            {/* 전화 상담 바로걸기 (최소 44px 터치 타겟) */}
            <a
              href={`tel:${cleanPhone || '1588-0000'}`}
              className="flex-1 min-h-[46px] flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-xs font-bold active:bg-slate-100 shadow-xs"
              aria-label="전화상담 바로걸기"
            >
              <Phone className="w-4 h-4 text-[#2563EB]" />
              <span>전화 상담</span>
              <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                ({tel})
              </span>
            </a>

            {/* 온라인 무료 상담 신청 바로가기 (최소 44px 터치 타겟) */}
            <Link
              to="/consultation"
              className="flex-1 min-h-[46px] flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#D5A64B] text-[#102B50] text-xs font-extrabold shadow-sm active:bg-[#C29338]"
              aria-label="온라인 무료 상담 신청 바로가기"
            >
              <MessageSquareText className="w-4 h-4 text-[#102B50]" />
              <span>무료 상담 신청</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
