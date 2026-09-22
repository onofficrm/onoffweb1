import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  FileCheck,
  HelpCircle,
  PhoneCall,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { CategoryDetail } from '../../types/product';
import { getProductsByCategory } from '../../data/productData';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

interface CategoryPageTemplateProps {
  category: CategoryDetail;
  onOpenConsultation?: () => void;
}

export const CategoryPageTemplate: React.FC<CategoryPageTemplateProps> = ({
  category,
  onOpenConsultation,
}) => {
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    document.title = `${category.metaTitle} | 비즈온탑`;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', category.metaDescription);
    window.scrollTo(0, 0);
  }, [category]);

  const products = getProductsByCategory(category.id);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const handleConsultationClick = () => {
    navigate(`/consultation?service=${category.id}`);
  };

  const categoriesNav = [
    { id: 'funding', name: '정책자금', href: '/funding' },
    { id: 'certification', name: '기업인증', href: '/certification' },
    { id: 'consulting', name: '경영컨설팅', href: '/consulting' },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200/80 sticky top-[69px] z-20 backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-slate-600">
          <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-primary-900 transition-colors">
              홈
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-primary-900 font-semibold">
              {category.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">전문 상담 직통:</span>
            <a
              href="tel:1588-0000"
              className="font-bold text-primary-900 hover:text-blue-600 transition-colors"
            >
              1588-0000
            </a>
          </div>
        </div>
      </div>

      {/* Category Tab Switcher */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto py-2.5">
            {categoriesNav.map((cat) => {
              const isActive = cat.id === category.id;
              return (
                <Link
                  key={cat.id}
                  to={cat.href}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#102B50] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#102B50] hover:bg-slate-100'
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 space-y-12">
        {/* 1. 상단 비주얼 배너 */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#102B50] via-[#163863] to-[#1F4A7F] text-white p-8 sm:p-12 shadow-md border border-slate-800/20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-5">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#D5A64B] text-[#102B50] shadow-xs">
                  {category.englishName}
                </span>
                <span className="text-xs text-blue-200/80 font-medium">
                  비즈온탑 전문 서비스
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {category.heroTitle}
              </h1>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                {category.heroSubtitle}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <Button
                  variant="accent"
                  size="lg"
                  onClick={handleConsultationClick}
                  className="font-bold shadow-md hover:shadow-lg group"
                >
                  <PhoneCall className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                  {category.name} 무료 상담 신청
                </Button>
                <a href="#product-list">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                  >
                    세부 상품 둘러보기
                  </Button>
                </a>
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-4">
              <div className="relative rounded-xl overflow-hidden border border-white/20 shadow-xl aspect-4/3 group">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102B50]/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-xs text-slate-200 bg-[#102B50]/80 backdrop-blur-xs p-2.5 rounded-lg border border-white/10">
                  <span className="font-semibold text-white">비즈온탑 약속: </span>
                  합법적이고 검증된 정밀 컨설팅
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. 서비스 소개 */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 tracking-wider uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Overview & Philosophy</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {category.name} 컨설팅의 핵심 가치와 지향점
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-4xl">
            {category.description}
          </p>
        </section>

        {/* 3. 세부 상품 카드 목록 */}
        <section id="product-list" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Services & Solutions
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {category.name} 세부 상품 안내 ({products.length}종)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              기업 상황에 맞는 최적의 상품을 선택하여 상세 내용을 확인하세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, idx) => (
              <Card
                key={product.id}
                className="p-6 bg-white border border-slate-200 shadow-xs hover:border-primary-400 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <Badge variant="primary" size="sm">
                      {product.heroBadge}
                    </Badge>
                    <span className="text-xs font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-900 transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {product.shortDesc}
                  </p>

                  <div className="pt-2 space-y-1.5 border-t border-slate-100 text-xs text-slate-600">
                    <div className="font-semibold text-slate-800 text-[11px] uppercase tracking-wider">
                      주요 상담 대상:
                    </div>
                    <ul className="space-y-1 pl-1">
                      {product.targetClients.list.slice(0, 2).map((target, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-1.5 text-slate-600 truncate">
                          <span className="text-blue-600 font-bold">•</span>
                          <span className="truncate">{target}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/${category.id}/${product.id}`}
                    className="text-xs sm:text-sm font-bold text-primary-900 hover:text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-all"
                  >
                    상세보기 및 요건 확인 <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/consultation?service=${product.id}`)}
                    className="text-xs text-slate-600 hover:text-primary-900 px-2"
                  >
                    간편 상담
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 4. 컨설팅 프로세스 (5-Step) */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Standard Procedure
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {category.name} 정밀 컨설팅 프로세스
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              체계적이고 과학적인 5단계 시스템으로 높은 통과율과 지속적인 사후관리를 보장합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-4">
            {category.process.map((step) => (
              <div
                key={step.step}
                className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 hover:bg-white hover:border-primary-400 hover:shadow-xs transition-all duration-200 flex flex-col justify-between group"
              >
                <div className="space-y-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#102B50] text-[#D5A64B] font-extrabold text-sm flex items-center justify-center shadow-xs">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] font-semibold text-blue-600">
                  STEP 0{step.step}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. 자주 묻는 질문 (Accordion) */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {category.name} 자주 묻는 질문
              </h2>
              <p className="text-xs text-slate-500">
                신청 전 필수로 확인해야 할 핵심 유의사항입니다.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {category.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-xl overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left bg-slate-50/60 hover:bg-slate-100/80 flex items-center justify-between gap-4 transition-colors"
                  >
                    <span className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2.5">
                      <span className="text-blue-600 font-extrabold text-sm">Q.</span>
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-4 sm:p-5 bg-white border-t border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-2.5">
                      <span className="text-[#D5A64B] font-extrabold text-sm shrink-0">A.</span>
                      <div>{faq.a}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 6. 상담 신청 영역 */}
        <section className="bg-gradient-to-br from-[#102B50] via-[#1A3E6D] to-[#2563EB] rounded-2xl p-8 sm:p-12 text-white shadow-xl text-center relative overflow-hidden border border-blue-900">
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#D5A64B] text-[#102B50]">
              100% 무료 기업 사전 진단
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {category.name} 전문 솔루션, 지금 바로 상담받으세요
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              대표님의 기업이 받을 수 있는 최적의 혜택과 신청 요건을 비즈온탑 전문 컨설턴트가 친절히 진단해 드립니다.
            </p>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="accent"
                size="lg"
                onClick={handleConsultationClick}
                className="font-bold text-base px-8 py-4 shadow-lg hover:shadow-xl group"
              >
                <PhoneCall className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                {category.name} 무료 상담 신청하기
              </Button>
              <a href="tel:1588-0000">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/40 text-white hover:bg-white/10 hover:text-white"
                >
                  전화 상담 1588-0000
                </Button>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
