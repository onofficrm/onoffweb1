import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home, PhoneCall, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  categoryName?: string;
  categoryHref?: string;
  breadcrumbs?: BreadcrumbItem[];
  subNavigation?: { label: string; href: string; active?: boolean }[];
  children: React.ReactNode;
  onOpenConsultation?: () => void;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  subtitle,
  categoryName,
  categoryHref,
  breadcrumbs = [],
  subNavigation,
  children,
  onOpenConsultation,
}) => {
  return (
    <div className="w-full pb-20">
      {/* Page Header / Hero Banner */}
      <section className="bg-gradient-to-b from-[#102B50] to-[#153460] text-white py-14 border-b border-[#1A3E6D] relative overflow-hidden">
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="container-custom relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-300 mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white flex items-center gap-1">
              <Home className="w-3.5 h-3.5 text-slate-400" />
              <span>홈</span>
            </Link>
            {categoryName && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                {categoryHref ? (
                  <Link to={categoryHref} className="hover:text-white">
                    {categoryName}
                  </Link>
                ) : (
                  <span>{categoryName}</span>
                )}
              </>
            )}
            {breadcrumbs.map((bc, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                {bc.href ? (
                  <Link to={bc.href} className="hover:text-white">
                    {bc.label}
                  </Link>
                ) : (
                  <span className="text-[#D5A64B] font-medium">{bc.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Title & Subtitle */}
          <div className="max-w-3xl">
            {categoryName && (
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white/10 text-xs font-semibold text-[#D5A64B] mb-2 border border-white/15">
                <Sparkles className="w-3 h-3" />
                <span>{categoryName}</span>
              </div>
            )}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mb-3">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Subnavigation Bar (if category has subpages) */}
      {subNavigation && subNavigation.length > 0 && (
        <div className="bg-white border-b border-slate-200 sticky top-[69px] z-30 shadow-2xs">
          <div className="container-custom">
            <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none">
              {subNavigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg whitespace-nowrap transition-colors ${
                    item.active
                      ? 'bg-[#102B50] text-white shadow-2xs'
                      : 'text-slate-600 hover:text-[#102B50] hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Page Content */}
      <main className="container-custom pt-10">{children}</main>

      {/* Common Bottom Consultation Banner */}
      {onOpenConsultation && (
        <section className="container-custom mt-16">
          <div className="bg-gradient-to-r from-[#102B50] to-[#1E4378] text-white rounded-2xl p-8 sm:p-10 shadow-md border border-[#1A3E6D] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold text-[#D5A64B] uppercase tracking-wider">
                기업 성장의 든든한 파트너, 비즈온탑
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">
                우리 기업에 맞는 정책자금과 기업인증, 바로 진단받아 보세요
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                초기 착수금 없이 1:1 전담 수석 컨설턴트가 24시간 이내 맞춤 분석 리포트를 제공합니다.
              </p>
            </div>
            <div className="shrink-0">
              <Button
                variant="accent"
                size="lg"
                onClick={onOpenConsultation}
                leftIcon={<PhoneCall className="w-5 h-5" />}
                className="font-bold text-sm sm:text-base px-6 shadow-md"
              >
                1:1 무료 상담 신청
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
