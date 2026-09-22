import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  Menu,
  PhoneCall,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import { NAVIGATION_DATA } from '../../data/navigation';
import { NavCategory } from '../../types';
import { Button } from '../ui/Button';
import { DynamicIcon } from '../ui/DynamicIcon';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  onOpenConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation }) => {
  const { currentMember, isLoggedIn, isAdmin, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<NavCategory | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  // Scroll detection for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveCategory(null);
  }, [location.pathname]);

  const handleMouseEnter = (category: NavCategory) => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
    }
    setActiveCategory(category);
  };

  const handleMouseLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 150);
  };

  const toggleMobileCategory = (title: string) => {
    setMobileExpandedCat((prev) => (prev === title ? null : title));
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
            : 'bg-white border-b border-slate-100 py-4'
        }`}
        onMouseLeave={handleMouseLeave}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center gap-3 group shrink-0"
            aria-label="비즈온탑 홈으로 이동"
          >
            {/* Custom Emblem */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#102B50] to-[#1A3E6D] flex items-center justify-center text-white shadow-xs border border-[#102B50]/20 group-hover:scale-105 transition-transform duration-200">
              <span className="font-extrabold text-lg tracking-tighter text-[#D5A64B]">B</span>
              <span className="font-extrabold text-xs -ml-0.5 text-white">T</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-[#102B50]">
                  BIZ ON TOP
                </span>
                <span className="text-[10px] font-semibold text-[#2563EB] bg-blue-50 px-1.5 py-0.5 rounded">
                  경영컨설팅
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium tracking-tight">
                기업 성장의 든든한 파트너
              </span>
            </div>
          </Link>

          {/* Desktop Center Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" aria-label="메인 메뉴">
            {NAVIGATION_DATA.map((cat) => {
              const isCurrent =
                location.pathname.startsWith(cat.href) ||
                cat.items.some((item) => location.pathname === item.href);
              const isOpen = activeCategory?.title === cat.title;

              return (
                <div
                  key={cat.title}
                  className="relative py-2"
                  onMouseEnter={() => handleMouseEnter(cat)}
                >
                  <Link
                    to={cat.items[0]?.href || cat.href}
                    className={`flex items-center gap-1 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                      isCurrent || isOpen
                        ? 'text-[#2563EB] bg-blue-50/70'
                        : 'text-[#172033] hover:text-[#2563EB] hover:bg-slate-50'
                    }`}
                  >
                    <span>{cat.title}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#2563EB]' : 'text-slate-400'
                      }`}
                    />
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            {isLoggedIn && currentMember ? (
              <div className="flex items-center gap-2 mr-1">
                <Link
                  to="/mypage"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors text-xs font-bold text-[#102B50]"
                >
                  <User className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>{currentMember.companyName.length > 8 ? `${currentMember.companyName.slice(0, 8)}...` : currentMember.companyName} ({currentMember.name})</span>
                  {isAdmin && (
                    <span className="px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 text-[10px] font-extrabold ml-0.5">
                      관리자
                    </span>
                  )}
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="text-xs font-semibold text-slate-500 hover:text-red-600 px-2 py-1.5 rounded-md hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-xs font-semibold text-slate-600 hover:text-[#102B50] px-2.5 py-2 rounded-md hover:bg-slate-50 transition-colors"
                >
                  로그인
                </Link>
                <span className="text-slate-300">|</span>
                <Link
                  to="/signup"
                  className="text-xs font-semibold text-slate-600 hover:text-[#102B50] px-2.5 py-2 rounded-md hover:bg-slate-50 transition-colors"
                >
                  회원가입
                </Link>
              </>
            )}
            <Link to="/consultation">
              <Button
                variant="accent"
                size="sm"
                className="shadow-xs ml-1 font-bold"
                leftIcon={<PhoneCall className="w-3.5 h-3.5" />}
              >
                무료 상담 신청
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="px-2.5 py-1.5 text-xs font-bold text-[#102B50] bg-[#D5A64B] rounded-lg shadow-xs"
            >
              무료상담
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#102B50] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mega Menu Overlay on Desktop */}
        {activeCategory && (
          <div
            className="hidden lg:block absolute left-0 right-0 top-full bg-white border-b border-slate-200/90 shadow-xl transition-all z-50 animate-fadeIn"
            onMouseEnter={() => {
              if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
            }}
            onMouseLeave={handleMouseLeave}
          >
            <div className="container-custom py-7">
              <div className="grid grid-cols-12 gap-8">
                {/* Left Category Info & Highlight Card */}
                <div className="col-span-4 pr-6 border-r border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#D5A64B]"></span>
                    <h3 className="text-xl font-bold text-[#102B50]">
                      {activeCategory.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-5">
                    {activeCategory.description}
                  </p>

                  {activeCategory.highlight && (
                    <div className="p-4 bg-gradient-to-br from-[#F7F9FC] to-blue-50/50 rounded-xl border border-blue-100/70">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#2563EB] mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#D5A64B]" />
                        <span>비즈온탑 맞춤 솔루션</span>
                      </div>
                      <h4 className="text-sm font-bold text-[#102B50] mb-1">
                        {activeCategory.highlight.title}
                      </h4>
                      <p className="text-xs text-slate-600 mb-3 leading-normal">
                        {activeCategory.highlight.description}
                      </p>
                      <button
                        onClick={onOpenConsultation}
                        className="inline-flex items-center text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] group cursor-pointer"
                      >
                        <span>{activeCategory.highlight.buttonText}</span>
                        <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Right Items Grid */}
                <div className="col-span-8 grid grid-cols-2 gap-3.5">
                  {activeCategory.items.map((item) => {
                    const isSelected = location.pathname === item.href;
                    return (
                      <Link
                        key={item.title}
                        to={item.href}
                        onClick={() => setActiveCategory(null)}
                        className={`group p-3.5 rounded-xl border transition-all flex items-start gap-3.5 ${
                          isSelected
                            ? 'bg-blue-50/60 border-blue-200 shadow-2xs'
                            : 'bg-white border-slate-100 hover:border-blue-200 hover:bg-slate-50/80 hover:shadow-xs'
                        }`}
                      >
                        <div className="p-2.5 rounded-lg bg-slate-100 text-[#102B50] group-hover:bg-[#102B50] group-hover:text-white transition-colors shrink-0">
                          <DynamicIcon name={item.iconName} className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-bold text-sm text-[#172033] group-hover:text-[#2563EB] transition-colors truncate">
                              {item.title}
                            </span>
                            {item.badge && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200/60">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-xs text-slate-500 leading-snug line-clamp-1">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#102B50]/60 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative ml-auto w-4/5 max-w-sm h-full bg-white shadow-2xl flex flex-col z-10">
            {/* Drawer Top */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-[#F8FAFC]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#102B50] flex items-center justify-center text-[#D5A64B] font-bold text-sm">
                  BT
                </div>
                <span className="font-bold text-sm text-[#102B50]">비즈온탑 메뉴</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Quick Bar */}
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs">
              {isLoggedIn && currentMember ? (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#2563EB]" />
                    <span className="font-bold text-slate-800">
                      {currentMember.companyName} ({currentMember.name})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to="/mypage"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-bold text-[#2563EB] hover:underline"
                    >
                      마이페이지
                    </Link>
                    <span className="text-slate-300">|</span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        logout();
                      }}
                      className="font-semibold text-slate-500 hover:text-red-600 cursor-pointer"
                    >
                      로그아웃
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-semibold text-slate-700 hover:text-[#102B50]"
                    >
                      로그인
                    </Link>
                    <span className="text-slate-300">|</span>
                    <Link
                      to="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-semibold text-slate-700 hover:text-[#102B50]"
                    >
                      회원가입
                    </Link>
                  </div>
                  <Link
                    to="/mypage"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-1 font-semibold text-[#2563EB]"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>마이페이지</span>
                  </Link>
                </>
              )}
            </div>

            {/* Menu List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {NAVIGATION_DATA.map((cat) => {
                const isExpanded = mobileExpandedCat === cat.title;
                return (
                  <div key={cat.title} className="border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleMobileCategory(cat.title)}
                      className="w-full flex items-center justify-between p-3.5 bg-white text-left font-bold text-sm text-[#102B50]"
                    >
                      <span>{cat.title}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                          isExpanded ? 'rotate-180 text-[#2563EB]' : ''
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="bg-[#F8FAFC] border-t border-slate-100 p-2 space-y-1">
                        {cat.items.map((item) => (
                          <Link
                            key={item.title}
                            to={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-between p-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-white hover:text-[#2563EB]"
                          >
                            <div className="flex items-center gap-2">
                              <DynamicIcon name={item.iconName} className="w-3.5 h-3.5 text-slate-500" />
                              <span>{item.title}</span>
                            </div>
                            {item.badge && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Drawer Bottom CTA */}
            <div className="p-4 border-t border-slate-100 bg-white">
              <Button
                variant="accent"
                fullWidth
                size="md"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                leftIcon={<PhoneCall className="w-4 h-4" />}
              >
                1:1 무료 상담 신청하기
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
