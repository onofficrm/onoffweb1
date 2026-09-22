import React, { useState, useEffect } from 'react';
import { Menu, X, PhoneCall, Building2, ChevronRight, Search } from 'lucide-react';

interface HeaderProps {
  onOpenConsultation: () => void;
  onOpenDiagnosis: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation, onOpenDiagnosis }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('법인설립');
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const faqSection = document.getElementById('faq');
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuItems = [
    { label: '법인설립', href: '#incorporation', isPrimary: true },
    { label: '법인전환', href: '#comparison' },
    { label: '진행사례', href: '#cases' },
    { label: '기업지원', href: '#post-support' },
    { label: '3분 무료진단', href: '#diagnosis' },
    { label: '최신정보', href: '#insights' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-3 sm:py-3.5'
          : 'bg-white border-b border-slate-100 py-4 sm:py-4.5'
      }`}
    >
      <div className="w-full max-w-[1560px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <a
          href="/"
          id="brand-logo"
          className="flex items-center gap-3 shrink-0 group focus:outline-hidden focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
        >
          <div className="w-10 h-10 rounded-xl bg-[#0B1F3A] flex items-center justify-center text-white shadow-xs group-hover:bg-[#2563EB] transition-colors">
            <Building2 className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-[21px] tracking-tight text-[#0B1F3A]">
                비즈온탑
              </span>
              <span className="text-[10px] font-bold tracking-wider text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-sm">
                BIZ ON TOP
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium tracking-tight">
              법인설립 · 기업성장 전문 컨설팅
            </span>
          </div>
        </a>

        {/* Center: Navigation Menu (Desktop) */}
        <nav
          id="desktop-nav"
          className="hidden xl:flex items-center gap-1.5 2xl:gap-2 text-[15px] font-medium text-slate-700"
        >
          {menuItems.map((item) => {
            const isActive = activeMenu === item.label;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveMenu(item.label);
                  const targetId = item.href.replace('#', '');
                  const targetEl = document.getElementById(targetId);
                  if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`relative px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-blue-600 font-bold bg-blue-50/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.label}
                {item.isPrimary && (
                  <span className="absolute -top-1 -right-0.5 w-1.5 h-1.5 rounded-full bg-blue-600" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Search Bar for Desktop */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden lg:flex items-center relative w-52 xl:w-64"
        >
          <input
            type="text"
            placeholder="궁금한 내용 검색..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white focus:bg-white text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </form>

        {/* Right: CTA Buttons */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            id="header-diagnosis-btn"
            type="button"
            onClick={onOpenDiagnosis}
            className="text-[14.5px] font-semibold text-slate-700 hover:text-blue-600 px-3.5 py-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
          >
            3분 법인설립 진단
          </button>
          <button
            id="header-consultation-btn"
            type="button"
            onClick={onOpenConsultation}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[14.5px] font-bold text-white bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 shadow-sm hover:shadow-md transition-all focus:ring-2 focus:ring-blue-500/20 cursor-pointer whitespace-nowrap"
          >
            <PhoneCall className="w-4 h-4" />
            <span>무료상담 신청하기</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            id="mobile-quick-consultation-btn"
            type="button"
            onClick={onOpenConsultation}
            className="px-3 py-1.5 text-[13px] font-bold text-white bg-[#2563EB] rounded-lg"
          >
            무료상담
          </button>
          <button
            id="mobile-menu-toggle-btn"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 focus:outline-hidden"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="sm:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 shadow-lg"
        >
          <div className="space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveMenu(item.label);
                  setMobileMenuOpen(false);
                  const targetId = item.href.replace('#', '');
                  const targetEl = document.getElementById(targetId);
                  if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-[15px] ${
                  activeMenu === item.label
                    ? 'text-blue-600 bg-blue-50 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDiagnosis();
              }}
              className="w-full py-2.5 text-[13.5px] font-bold text-slate-700 bg-slate-100 rounded-lg text-center"
            >
              3분 진단하기
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-2.5 text-[13.5px] font-bold text-white bg-[#2563EB] rounded-lg text-center"
            >
              무료상담 신청
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
