import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  FileCheck,
  FileText,
  HelpCircle,
  Info,
  Layers,
  PhoneCall,
  ShieldAlert,
  Sparkles,
  Users,
} from 'lucide-react';
import { ProductDetail } from '../../types/product';
import { getProductById, getProductsByCategory } from '../../data/productData';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

interface ProductDetailTemplateProps {
  product: ProductDetail;
  onOpenConsultation?: () => void;
}

export const ProductDetailTemplate: React.FC<ProductDetailTemplateProps> = ({
  product,
  onOpenConsultation,
}) => {
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Dynamic SEO meta tags
  useEffect(() => {
    document.title = `${product.metaTitle} | 비즈온탑`;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', product.metaDescription);
    window.scrollTo(0, 0);
  }, [product]);

  // Sibling products in the same category for category tab navigation
  const categoryProducts = getProductsByCategory(product.category);

  // Related products
  const relatedProducts = product.relatedProductIds
    .map((id) => getProductById(id))
    .filter((p): p is ProductDetail => p !== undefined);

  const handleConsultationClick = () => {
    navigate(`/consultation?service=${product.id}`);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* 1. Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200/80 sticky top-[69px] z-20 backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-slate-600">
          <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-primary-900 transition-colors">
              홈
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link
              to={product.categoryHref}
              className="hover:text-primary-900 font-medium text-slate-700 transition-colors"
            >
              {product.categoryName}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-primary-900 font-semibold truncate">
              {product.name}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2">
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

      {/* Category Sub-Navigation Bar */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 no-scrollbar">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 shrink-0">
              {product.categoryName} 상품:
            </span>
            {categoryProducts.map((p) => {
              const isActive = p.id === product.id;
              const productUrl = `/${p.category}/${p.id}`;
              return (
                <Link
                  key={p.id}
                  to={productUrl}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 shrink-0 ${
                    isActive
                      ? 'bg-[#102B50] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#102B50] hover:bg-slate-100'
                  }`}
                >
                  {p.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 space-y-12">
        {/* SECTION 1: 상단 히어로 배너 */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#102B50] via-[#163863] to-[#1F4A7F] text-white p-8 sm:p-12 shadow-md border border-slate-800/20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#D5A64B] text-[#102B50] shadow-xs">
                  {product.heroBadge}
                </span>
                <span className="text-xs text-blue-200/80 font-medium">
                  {product.categoryName} 전문 솔루션
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {product.h1}
              </h1>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                {product.shortDesc}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <Button
                  variant="accent"
                  size="lg"
                  onClick={handleConsultationClick}
                  className="font-bold shadow-md hover:shadow-lg group"
                >
                  <PhoneCall className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                  {product.ctaText}
                </Button>
                <Link to={product.categoryHref}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                  >
                    카테고리 전체보기
                  </Button>
                </Link>
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-4">
              <div className="relative rounded-xl overflow-hidden border border-white/20 shadow-xl aspect-4/3 group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102B50]/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-xs text-slate-200 bg-[#102B50]/80 backdrop-blur-xs p-2.5 rounded-lg border border-white/10">
                  <span className="font-semibold text-white">비즈온탑 전문 컨설팅: </span>
                  기업별 1:1 전담 배정 및 맞춤형 로드맵 제공
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Notice Box (유의사항 / 심사기준 / 자격연계 안내) */}
        {product.noticeBox && (
          <div
            className={`rounded-xl p-5 sm:p-6 border flex items-start gap-4 transition-all duration-200 ${
              product.noticeBox.type === 'warning'
                ? 'bg-amber-50/80 border-amber-200 text-amber-900'
                : 'bg-blue-50/80 border-blue-200 text-blue-950'
            }`}
          >
            <div className="p-2 rounded-lg bg-white shadow-xs shrink-0 mt-0.5">
              {product.noticeBox.type === 'warning' ? (
                <ShieldAlert className="w-5 h-5 text-amber-600" />
              ) : (
                <Info className="w-5 h-5 text-blue-600" />
              )}
            </div>
            <div className="space-y-1 text-xs sm:text-sm">
              <h2 className="font-bold text-sm sm:text-base tracking-tight">
                {product.noticeBox.title}
              </h2>
              <p className="leading-relaxed opacity-90">{product.noticeBox.text}</p>
            </div>
          </div>
        )}

        {/* SECTION 2 & 3: 서비스 소개 & 주요 상담 대상 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* SECTION 2: 서비스 소개 */}
          <Card className="p-6 sm:p-8 bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  서비스 개요 및 핵심 목적
                </h2>
                <p className="text-xs text-slate-500">Service Introduction</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p className="bg-slate-50 p-4 rounded-xl border border-slate-100 font-medium text-slate-800">
                {product.purposeAndContent.purpose}
              </p>

              <div className="space-y-2 pt-2">
                <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-primary-600" />
                  핵심 지원 포인트
                </h3>
                <ul className="space-y-2 pl-2">
                  {product.purposeAndContent.content.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-2 shrink-0" />
                      <span className="text-slate-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          {/* SECTION 3: 주요 상담 대상 */}
          <Card className="p-6 sm:p-8 bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  {product.targetClients.title}
                </h2>
                <p className="text-xs text-slate-500">Target Enterprise</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 mb-4">
              아래 상황에 해당하는 기업이라면 본 컨설팅을 통해 최적의 해결책을 마련할 수 있습니다.
            </p>

            <ul className="space-y-3">
              {product.targetClients.list.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-100 hover:bg-slate-100/80 transition-colors"
                >
                  <div className="w-5 h-5 rounded-full bg-primary-100 text-primary-800 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    {idx + 1}
                  </div>
                  <span className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* SECTION 4 & 5: 진행 요건 & 주요 지원/컨설팅 내용 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* SECTION 4: 진행 요건 */}
          <Card className="lg:col-span-5 p-6 sm:p-8 bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {product.requirements.title}
                </h2>
                <p className="text-xs text-slate-500">Eligibility & Requirements</p>
              </div>
            </div>

            {product.requirements.disclaimer && (
              <p className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100 mb-4">
                {product.requirements.disclaimer}
              </p>
            )}

            <ul className="space-y-2.5">
              {product.requirements.list.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-5 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
              ※ 요건 충족 여부가 불확실하신 경우, 비즈온탑 사전 무료 진단을 통해 즉시 확인하실 수 있습니다.
            </div>
          </Card>

          {/* SECTION 5: 주요 지원 및 컨설팅 내용 */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  {product.consultingScope.title}
                </h2>
                <p className="text-xs text-slate-500">Core Scope of Consulting</p>
              </div>
              <Badge variant="primary" size="sm">
                맞춤형 프로세스
              </Badge>
            </div>

            <div className="space-y-3">
              {product.consultingScope.items.map((scope, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-700 text-xs font-black flex items-center justify-center">
                      0{idx + 1}
                    </span>
                    {scope.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-8">
                    {scope.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 6: 진행 절차 (5-Step Timeline) */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Standard Process
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              체계적이고 투명한 5단계 진행 프로세스
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              사전 진단부터 서류 편철, 현장 대응, 사후관리까지 전담 컨설턴트가 밀착 지원합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-4">
            {product.process.map((step) => (
              <div
                key={step.step}
                className="relative bg-slate-50/80 rounded-xl p-5 border border-slate-200/80 hover:bg-white hover:border-primary-400 hover:shadow-sm transition-all duration-200 flex flex-col justify-between group"
              >
                <div className="space-y-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#102B50] text-[#D5A64B] font-extrabold text-sm flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-primary-900 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] font-semibold text-blue-600 flex items-center gap-1">
                  STEP 0{step.step}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 7: 준비서류 및 확인사항 */}
        <section className="bg-gradient-to-r from-slate-900 to-[#102B50] rounded-2xl p-6 sm:p-8 text-white shadow-md">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#D5A64B]">
              <FileCheck className="w-4 h-4" />
              <span>REQUIRED DOCUMENTS</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {product.documents.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              초기 상담 시 아래 서류를 구비해주시면 더욱 신속하고 정밀한 진단이 가능합니다.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {product.documents.list.map((doc, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-xs border border-white/15 p-3.5 rounded-xl flex items-center gap-3 text-xs sm:text-sm text-slate-100 hover:bg-white/15 transition-colors"
                >
                  <span className="w-5 h-5 rounded-full bg-[#D5A64B] text-[#102B50] text-xs font-bold flex items-center justify-center shrink-0">
                    ✓
                  </span>
                  <span>{doc}</span>
                </div>
              ))}
            </div>

            {product.documents.notice && (
              <p className="text-xs text-amber-200/90 pt-2 font-medium">
                {product.documents.notice}
              </p>
            )}
          </div>
        </section>

        {/* SECTION 8: 자주 묻는 질문 (Accordion UI) */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                자주 묻는 질문 (FAQ)
              </h2>
              <p className="text-xs text-slate-500">
                고객사 대표님들이 가장 자주 궁금해하시는 질문입니다.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {product.faqs.map((faq, idx) => {
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
                    <div className="p-4 sm:p-5 bg-white border-t border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-2.5 animate-fadeIn">
                      <span className="text-[#D5A64B] font-extrabold text-sm shrink-0">A.</span>
                      <div>{faq.a}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 9: 관련 상품 추천 카드 (2~3개 연관 상품) */}
        {relatedProducts.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  함께 검토하면 유익한 관련 상품
                </h2>
                <p className="text-xs text-slate-500">Related Solutions & Synergies</p>
              </div>
              <Link
                to={product.categoryHref}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                전체보기 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/${rel.category}/${rel.id}`}
                  className="group bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-primary-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <Badge variant="primary" size="sm">
                        {rel.categoryName}
                      </Badge>
                      <span className="text-[11px] text-slate-400 group-hover:text-blue-600 font-medium transition-colors">
                        상세보기 →
                      </span>
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-primary-900 transition-colors">
                      {rel.name}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {rel.shortDesc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium text-slate-700">1:1 맞춤 컨설팅</span>
                    <span className="text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                      자세히 보기
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 10: 하단 무료 상담 신청 CTA */}
        <section className="bg-gradient-to-br from-[#102B50] via-[#1A3E6D] to-[#2563EB] rounded-2xl p-8 sm:p-12 text-white shadow-xl text-center relative overflow-hidden border border-blue-900">
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#D5A64B] text-[#102B50]">
              100% 무료 맞춤 진단
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {product.name}, 지금 바로 전문가와 상의하세요
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              기업의 재무 상태, 매출, 업력에 맞춘 최적의 전략을 1:1 비밀 보장으로 진단해 드립니다.
              부담 없는 무료 상담을 통해 최선의 성장 기회를 확인해보세요.
            </p>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="accent"
                size="lg"
                onClick={handleConsultationClick}
                className="font-bold text-base px-8 py-4 shadow-lg hover:shadow-xl group"
              >
                <PhoneCall className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                {product.name} 무료 상담 신청하기
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

            <p className="text-[11px] text-slate-300/80 pt-2">
              ※ 비즈온탑은 불법 브로커 수수료 및 허위 서류 조작을 엄격히 금지하며, 적법한 경영 자문만을 수행합니다.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
