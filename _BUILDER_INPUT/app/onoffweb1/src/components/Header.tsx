/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Building2, Sparkles } from 'lucide-react';
import { CORE_INFO } from '../data';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenReviews?: (tab?: 'reviews' | 'concerns') => void;
  onOpenFaq?: () => void;
}

export default function Header({ onNavigate, activeSection, onOpenReviews, onOpenFaq }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: '단지소개', target: 'hero' },
    { label: '조망가치', target: 'concerns' },
    { label: '6대 프리미엄', target: 'features' },
    { label: '고객후기', target: 'reviews' },
    { label: '분양 정보센터', target: 'seo-blog' },
    { label: 'FAQ', target: 'faq' },
    { label: 'VIP 상담신청', target: 'consultation' }
  ];

  const handleMenuClick = (target: string) => {
    if (target === 'reviews' && onOpenReviews) {
      onOpenReviews('reviews');
    } else if (target === 'concerns' && onOpenReviews) {
      onOpenReviews('concerns');
    } else if (target === 'faq' && onOpenFaq) {
      onOpenFaq();
    } else {
      onNavigate(target);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gold-200/50 shadow-md py-3'
          : 'bg-white/40 backdrop-blur-sm border-b border-white/20 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo Section with Beautiful Custom PRUGIO Logomark */}
        <div 
          onClick={() => handleMenuClick('hero')} 
          className="flex items-center space-x-3 cursor-pointer group select-none"
        >
          {/* Majestic PRUGIO Signature Green & Gold-leaf seal */}
          <div className="relative flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#004c3f] to-[#002f27] flex items-center justify-center shadow-lg border border-gold-300/40 group-hover:border-gold-300 transition-all duration-300 group-hover:shadow-gold-heavy">
            <svg 
              viewBox="0 0 100 100" 
              className="w-5.5 h-5.5 text-gold-300 group-hover:scale-108 transition-transform duration-300"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Modern Minimalistic PRUGIO 'P' & Forest Leaf emblem */}
              <path 
                d="M32 25 H58 C72 25, 76 39, 68 49 C60 59, 45 59, 32 59" 
                stroke="currentColor" 
                strokeWidth="6" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              <path 
                d="M32 20 V80" 
                stroke="currentColor" 
                strokeWidth="6" 
                strokeLinecap="round" 
              />
              {/* Sprouting leaf representing natural ecosystem of 업성 호수공원 */}
              <path 
                d="M48 42 C62 28, 70 34, 66 48 C62 62, 54 56, 48 42 Z" 
                fill="currentColor" 
                opacity="0.9"
              />
            </svg>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-gold-300/10 to-transparent pointer-events-none" />
          </div>

          <div>
            <div className="flex items-center space-x-1">
              <span className="font-display text-lg tracking-wider font-extrabold text-[#111c3a] group-hover:text-gold-600 transition-colors">
                PRUGIO
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-[#031326] text-gold-300 font-bold border border-gold-400/30">
                LAKE CITY
              </span>
            </div>
            <p className="text-[10px] text-gray-500 font-sans tracking-tight">천안 업성 푸르지오 레이크시티</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden lg:flex items-center space-x-6">
          {menuItems.map((item) => (
            <button
              key={item.target}
              onClick={() => handleMenuClick(item.target)}
              className={`text-sm font-medium transition-all duration-200 py-2 relative group cursor-pointer ${
                activeSection === item.target
                  ? 'text-gold-600 font-bold'
                  : 'text-gray-700 hover:text-gold-500'
              }`}
            >
              {item.label}
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-gold-550 transform transition-transform duration-200 ${
                  activeSection === item.target ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                } bg-gold-500`}
              />
            </button>
          ))}
        </nav>

        {/* Action Button & Menu Toggles */}
        <div className="flex items-center space-x-3">
          {/* Quick Call */}
          <a
            href={`tel:${CORE_INFO.phone}`}
            className="hidden sm:flex items-center space-x-1.5 bg-gradient-to-r from-[#111c3a] to-[#1e305e] px-4 py-2 rounded-full text-white text-xs font-bold shadow hover:from-gold-600 hover:to-gold-500 hover:scale-105 transition-all duration-200"
          >
            <Phone className="h-3 w-3 text-gold-300 animate-bounce" />
            <span>분양문의: {CORE_INFO.phone}</span>
          </a>

          {/* Quick CTA */}
          <button
            onClick={() => handleMenuClick('consultation')}
            className="hidden md:flex items-center space-x-1 bg-gradient-to-r from-gold-500 to-gold-400 text-white font-bold text-xs px-4 py-2 rounded-full hover:from-gold-600 hover:to-gold-500 shadow hover:shadow-gold-glow transition-all duration-200"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>선착순 VIP 등록</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-gray-700 hover:bg-gold-50 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6 text-gold-600" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/98 shadow-xl border-t border-gold-100 py-4 absolute top-full left-0 w-full animate-fadeIn z-40 px-6">
          <div className="flex flex-col space-y-3.5">
            {menuItems.map((item) => (
              <button
                key={item.target}
                onClick={() => handleMenuClick(item.target)}
                className={`text-left py-2.5 px-4 rounded-xl text-base font-semibold transition-all ${
                  activeSection === item.target
                    ? 'bg-gold-50 text-gold-700 font-extrabold border-l-4 border-gold-500'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile-only Quick Links */}
            <div className="pt-4 border-t border-gray-100 flex flex-col space-y-2">
              <a
                href={`tel:${CORE_INFO.phone}`}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-[#111c3a] to-[#1e305e] py-3 rounded-lg text-white font-bold"
              >
                <Phone className="h-4 w-4 text-gold-300" />
                <span>분양상담 전화하기 ({CORE_INFO.phone})</span>
              </a>
              <button
                onClick={() => handleMenuClick('consultation')}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-gold-500 to-gold-400 py-3 rounded-lg text-white font-bold shadow-lg"
              >
                <Sparkles className="h-4 w-4" />
                <span>호수공원 영구조망 VIP 동호수 선점</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
