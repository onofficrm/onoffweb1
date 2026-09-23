import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShieldCheck, ChevronRight, PhoneCall } from 'lucide-react';

interface HeaderProps {
  onOpenConsultation: () => void;
  onOpenDiagnosis: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation, onOpenDiagnosis }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: '법인설립', href: '#how-it-works-section', isHot: true },
    { label: '진행사례', href: '#consulting-cases-section' },
    { label: '기업지원', href: '#after-incorporation-section' },
    { label: '3분진단', href: '#diagnosis-section' },
    { label: '기업정보', href: '#business-insights-section' },
    { label: 'FAQ', href: '#faq-section' },
  ];

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80'
          : 'bg-white border-b border-slate-100'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <a
          href="#"
          id="header-brand-logo"
          className="flex items-center gap-3 group focus:outline-hidden"
          aria-label="비즈온탑 홈으로 이동"
        >
          {/* Stylized Modern Corporate Icon */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0B1F3A] to-[#2563EB] flex items-center justify-center text-white shadow-md shadow-blue-900/15 group-hover:scale-105 transition-transform duration-200">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 19L12 5L20 19H14.5L12 14.5L9.5 19H4Z"
                fill="currentColor"
              />
              <path
                d="M12 9.5L15 15H9L12 9.5Z"
                fill="#F4A62A"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0B1F3A]">
                비즈온탑
              </span>
              <span className="hidden sm:inline-block text-[11px] font-semibold text-[#2563EB] bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded-sm">
                BIZ ON TOP
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-500 tracking-tight">
              법인설립 전문 컨설팅
            </span>
          </div>
        </a>

        {/* Center: Navigation Menu (Desktop) */}
        <nav
          id="desktop-navigation"
          aria-label="주요 메뉴"
          className="hidden md:flex items-center gap-1 lg:gap-2"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              id={`nav-link-${item.label}`}
              className="relative px-3.5 py-2 text-[15px] font-medium text-slate-700 hover:text-[#2563EB] hover:bg-slate-50 rounded-lg transition-colors duration-150 flex items-center gap-1"
            >
              <span>{item.label}</span>
              {item.isHot && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse"></span>
              )}
            </a>
          ))}
        </nav>

        {/* Right: Primary Action Button */}
        <div className="flex items-center gap-3">
          {/* Quick 3-Min Diagnosis button on larger screens */}
          <button
            type="button"
            onClick={onOpenDiagnosis}
            id="header-diagnosis-btn"
            className="hidden lg:inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-[#2563EB] bg-slate-100 hover:bg-blue-50 px-3.5 py-2 rounded-lg border border-slate-200 hover:border-blue-200 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-[#F4A62A]"></span>
            <span>3분 진단</span>
          </button>

          {/* Blue Filled Button for 무료상담 */}
          <button
            type="button"
            onClick={onOpenConsultation}
            id="header-consultation-btn"
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white font-semibold text-sm sm:text-[15px] px-3 sm:px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]/40 min-h-[44px]"
          >
            <PhoneCall className="w-4 h-4 shrink-0" />
            <span className="sm:hidden">상담</span>
            <span className="hidden sm:inline">무료상담</span>
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle-btn"
            aria-label="메뉴 열기/닫기"
            aria-expanded={mobileMenuOpen}
            className="md:hidden p-2 text-slate-700 hover:text-[#0B1F3A] hover:bg-slate-100 rounded-lg transition-colors focus:outline-hidden"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl"
        >
          <div className="grid grid-cols-2 gap-2 pt-1 pb-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-lg border border-slate-100"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDiagnosis();
              }}
              id="mobile-diagnosis-btn"
              className="w-full flex items-center justify-center gap-2 bg-[#0B1F3A] text-white py-3 rounded-lg text-sm font-semibold hover:bg-slate-800 transition"
            >
              <span>3분 법인설립 진단하기</span>
              <ArrowRight className="w-4 h-4 text-[#F4A62A]" />
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              id="mobile-consultation-btn"
              className="w-full flex items-center justify-center gap-2 bg-[#2563EB] text-white py-3 rounded-lg text-sm font-semibold hover:bg-[#1d4ed8] transition shadow-xs"
            >
              <span>무료상담 신청하기</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
