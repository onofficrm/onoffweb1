import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  Award,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Coins,
  FileCheck,
  FileText,
  HelpCircle,
  Info,
  Lock,
  Mail,
  MapPin,
  Phone,
  PhoneCall,
  RotateCcw,
  Send,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  User,
  Users,
} from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input, Select, Textarea } from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import { dbService } from '../../services/dbService';
import { ConsultationItem } from '../../types/auth';

interface ServiceOption {
  id: 'funding' | 'certification' | 'consulting';
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  bgLight: string;
  borderActive: string;
  badge: string;
  products: { id: string; name: string; desc: string }[];
}

const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: 'funding',
    title: '정책자금',
    subtitle: '정부·지자체 저금리 융자 및 보증서 발급',
    icon: Coins,
    color: 'text-[#2563EB]',
    bgLight: 'bg-blue-50/70',
    borderActive: 'border-[#2563EB] ring-2 ring-blue-100',
    badge: '최대 100억 한도',
    products: [
      { id: 'small-business', name: '소상공인 정책자금', desc: '소진공 연계 특화 융자 및 운전자금' },
      { id: 'sme', name: '중소기업 정책자금', desc: '중진공 혁신성장 및 일자리 창출 자금' },
      { id: 'startup', name: '창업기업 특화자금', desc: '업력 7년 미만 청년·기술창업 우대 자금' },
      { id: 'working-capital', name: '운전자금 조달', desc: '원부자재 구입 및 인건비 지원 운전자금' },
      { id: 'facility', name: '시설자금 / 공장 매입', desc: '토지, 자가 사업장, 기계설비 매입 자금' },
    ],
  },
  {
    id: 'certification',
    title: '기업인증',
    subtitle: '조세 감면 혜택 및 공공입찰 가점 확보',
    icon: Award,
    color: 'text-[#D5A64B]',
    bgLight: 'bg-amber-50/70',
    borderActive: 'border-[#D5A64B] ring-2 ring-amber-100',
    badge: '법인세 최대 50% 감면',
    products: [
      { id: 'venture', name: '벤처기업확인 인증', desc: '법인세 50% 감면 및 취득세 감면 혜택' },
      { id: 'research-center', name: '기업부설연구소 설립', desc: '연구인력개발비 25% 세액공제' },
      { id: 'research-department', name: '연구개발전담부서 설립', desc: '소규모 기술개발 조직 맞춤 설립' },
      { id: 'iso', name: 'ISO 인증 (9001/14001)', desc: '글로벌 표준 품질·환경 경영 인증' },
      { id: 'mainbiz', name: '메인비즈 (MAIN-BIZ) 인증', desc: '경영혁신형 중소기업 신용보증 우대' },
      { id: 'innobiz', name: '이노비즈 (INNO-BIZ) 인증', desc: '기술혁신형 중소기업 연구개발 과제 가점' },
    ],
  },
  {
    id: 'consulting',
    title: '경영컨설팅',
    subtitle: '법인전환·지배구조·통합경영자문 솔루션',
    icon: Briefcase,
    color: 'text-[#102B50]',
    bgLight: 'bg-slate-100/70',
    borderActive: 'border-[#102B50] ring-2 ring-slate-200',
    badge: '전문 자격사 네트워크',
    products: [
      { id: 'incorporation', name: '법인설립 및 법인전환', desc: '개인사업자 절세형 포괄양수도 전환' },
      { id: 'integrated', name: '통합경영자문', desc: '정기 재무·세무·노무 통합 자문 리포트' },
      { id: 'real-estate', name: '부동산 매입 및 시설자금', desc: '사옥 매입 및 지식산업센터 분양 자금' },
      { id: 'finance', name: '기업 재무 및 자금조달', desc: '재무제표 관리 및 금융기관 신용도 제고' },
      { id: 'growth', name: '기업 성장전략 수립', desc: '사업 다각화 및 스케일업 종합 로드맵' },
    ],
  },
];

const subNav = [
  { label: '공지사항', href: '/board?type=notice' },
  { label: '정책자금 소식', href: '/board?type=news' },
  { label: '기업인증 정보', href: '/board?type=cert' },
  { label: '컨설팅 사례', href: '/board?type=case' },
  { label: '자주 묻는 질문', href: '/board?type=faq' },
  { label: '1:1 무료 상담 신청', href: '/consultation', active: true },
];

export const ConsultationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentMember, isLoggedIn } = useAuth();

  // URL query parameter parsing for auto-selection
  const queryService = searchParams.get('service') || searchParams.get('product') || '';
  const queryCategory = searchParams.get('category') || '';

  // Determine initial selected service category & product
  const getInitialService = (): 'funding' | 'certification' | 'consulting' => {
    if (queryCategory === 'certification') return 'certification';
    if (queryCategory === 'consulting') return 'consulting';
    if (queryCategory === 'funding' || queryCategory === 'policy-fund') return 'funding';

    if (queryService) {
      for (const s of SERVICE_OPTIONS) {
        if (s.products.some((p) => p.id === queryService)) {
          return s.id;
        }
      }
    }
    return 'funding';
  };

  const [selectedService, setSelectedService] = useState<'funding' | 'certification' | 'consulting'>(getInitialService);
  const [selectedProductId, setSelectedProductId] = useState<string>(() => {
    const currentCategory = SERVICE_OPTIONS.find((s) => s.id === getInitialService());
    if (queryService && currentCategory?.products.some((p) => p.id === queryService)) {
      return queryService;
    }
    return currentCategory?.products[0]?.id || '';
  });

  // Form states
  const [formData, setFormData] = useState({
    companyName: currentMember?.companyName || '',
    representativeName: currentMember?.name || '',
    contactNumber: currentMember?.phone || '',
    email: currentMember?.email || '',
    businessNumber: currentMember?.businessNumber || '',
    location: currentMember?.address ? currentMember.address.split(' ')[0] || '서울특별시' : '서울특별시',
    foundedYear: '2022',
    annualRevenue: '3억~10억',
    desiredFundAmount: '1억~3억',
    inquiryDetails: '',
    agreedToPrivacy: false,
    agreedToMarketing: false,
  });

  // Anti-spam math challenge
  const [spamAnswer, setSpamAnswer] = useState('');
  const [securityNum1] = useState(3);
  const [securityNum2] = useState(5);

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedConsultation, setSubmittedConsultation] = useState<ConsultationItem | null>(null);
  const [generalError, setGeneralError] = useState('');

  // Auto-select when query param changes
  useEffect(() => {
    if (queryService) {
      for (const s of SERVICE_OPTIONS) {
        const found = s.products.find((p) => p.id === queryService);
        if (found) {
          setSelectedService(s.id);
          setSelectedProductId(found.id);
          if (!formData.inquiryDetails) {
            setFormData((prev) => ({
              ...prev,
              inquiryDetails: `[${found.name}] 관련 신청 요건 및 심사 절차 문의드립니다.`,
            }));
          }
          break;
        }
      }
    }
  }, [queryService]);

  // Sync member profile into form if user logs in or switches
  useEffect(() => {
    if (currentMember) {
      setFormData((prev) => ({
        ...prev,
        companyName: prev.companyName || currentMember.companyName,
        representativeName: prev.representativeName || currentMember.name,
        contactNumber: prev.contactNumber || currentMember.phone,
        email: prev.email || currentMember.email,
        businessNumber: prev.businessNumber || currentMember.businessNumber || '',
      }));
    }
  }, [currentMember]);

  const activeServiceObj = SERVICE_OPTIONS.find((s) => s.id === selectedService)!;
  const activeProductObj = activeServiceObj.products.find((p) => p.id === selectedProductId) || activeServiceObj.products[0];

  const handleServiceChange = (serviceId: 'funding' | 'certification' | 'consulting') => {
    setSelectedService(serviceId);
    const newServiceObj = SERVICE_OPTIONS.find((s) => s.id === serviceId)!;
    setSelectedProductId(newServiceObj.products[0].id);
  };

  const validate = () => {
    const errors: Record<string, string> = {};

    if (!formData.companyName.trim()) {
      errors.companyName = '기업명(상호명)을 입력해 주세요.';
    }

    if (!formData.representativeName.trim()) {
      errors.representativeName = '대표자 또는 담당자 성함을 입력해 주세요.';
    }

    if (!formData.contactNumber.trim()) {
      errors.contactNumber = '연락처(휴대폰 번호)를 입력해 주세요.';
    } else {
      const cleanPhone = formData.contactNumber.replace(/[^0-9]/g, '');
      if (cleanPhone.length < 9 || cleanPhone.length > 11) {
        errors.contactNumber = '올바른 전화번호 형식(예: 010-1234-5678)을 입력해 주세요.';
      }
    }

    if (!formData.email.trim()) {
      errors.email = '이메일 주소를 입력해 주세요.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = '올바른 이메일 형식을 입력해 주세요 (예: ceo@company.kr).';
      }
    }

    if (formData.businessNumber.trim()) {
      const cleanBiz = formData.businessNumber.replace(/[^0-9]/g, '');
      if (cleanBiz.length !== 10) {
        errors.businessNumber = '사업자등록번호는 10자리 숫자여야 합니다 (예: 123-45-67890).';
      }
    }

    if (!formData.agreedToPrivacy) {
      errors.agreedToPrivacy = '개인정보 수집 및 이용 동의가 필요합니다.';
    }

    if (parseInt(spamAnswer.trim(), 10) !== securityNum1 + securityNum2) {
      errors.spamAnswer = `스팸 방지 보안 숫자 합계를 올바르게 입력해 주세요 (${securityNum1} + ${securityNum2} = 8).`;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');

    if (!validate()) {
      setGeneralError('입력 정보를 다시 확인해 주시기 바랍니다.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const result = dbService.createConsultation({
        userId: currentMember?.id || null,
        category: selectedService,
        categoryName: activeServiceObj.title,
        productId: selectedProductId,
        productName: activeProductObj.name,
        companyName: formData.companyName,
        representativeName: formData.representativeName,
        contactNumber: formData.contactNumber,
        email: formData.email,
        businessNumber: formData.businessNumber,
        location: formData.location,
        foundedYear: formData.foundedYear,
        annualRevenue: formData.annualRevenue,
        desiredFundAmount: selectedService === 'funding' ? formData.desiredFundAmount : undefined,
        inquiryDetails: formData.inquiryDetails,
        agreedToPrivacy: formData.agreedToPrivacy,
        agreedToMarketing: formData.agreedToMarketing,
      });

      setIsSubmitting(false);

      if (result.success && result.consultation) {
        setSubmittedConsultation(result.consultation);
        window.scrollTo({ top: 120, behavior: 'smooth' });
      } else {
        setGeneralError(result.error || '상담 신청 접수 중 오류가 발생했습니다.');
      }
    }, 600);
  };

  return (
    <PageLayout
      categoryName="고객센터"
      categoryHref="/board?type=notice"
      title="1:1 맞춤 무료 상담 신청"
      subtitle="전문 수석 컨설턴트가 24시간 이내 기업 현황을 사전 진단하여 최적의 솔루션을 제안합니다."
      breadcrumbs={[{ label: '1:1 상담 신청' }]}
      subNavigation={subNav}
    >
      <div className="max-w-4xl mx-auto">
        {/* SUCCESS RECEIPT VIEW */}
        {submittedConsultation ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md text-center space-y-8 animate-fadeIn">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full mb-3">
                접수 완료 (실제 데이터베이스 등록됨)
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#102B50] tracking-tight">
                상담 신청이 성공적으로 접수되었습니다!
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-lg mx-auto leading-relaxed">
                작성해 주신 기업 정보를 바탕으로 전문 컨설턴트가 사전 기업 스크리닝을 진행한 후,
                영업일 기준 24시간 이내에 기재해 주신 연락처로 유선 안내해 드립니다.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 text-left max-w-xl mx-auto space-y-3.5 text-xs text-slate-700">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="font-bold text-slate-500">접수 번호</span>
                <span className="font-mono font-bold text-base text-[#2563EB]">
                  {submittedConsultation.id}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">상담 신청 서비스</span>
                <span className="font-bold text-[#102B50]">
                  {submittedConsultation.categoryName} &gt; {submittedConsultation.productName}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">기업명 / 대표자(담당자)</span>
                <span className="font-semibold text-slate-800">
                  {submittedConsultation.companyName} ({submittedConsultation.representativeName})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">안내 연락처 / 이메일</span>
                <span className="font-medium text-slate-800">
                  {submittedConsultation.contactNumber} / {submittedConsultation.email}
                </span>
              </div>
              {submittedConsultation.desiredFundAmount && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">희망 자금 규모</span>
                  <span className="font-bold text-emerald-600">
                    {submittedConsultation.desiredFundAmount}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <span className="text-slate-500 font-medium">현재 진행 상태</span>
                <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 font-bold rounded-full">
                  {submittedConsultation.status}
                </span>
              </div>
            </div>

            {/* Process Roadmap */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 text-left max-w-xl mx-auto">
              <h4 className="font-bold text-sm text-[#102B50] mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2563EB]" />
                향후 1:1 상담 진행 절차 안내
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-white p-3.5 rounded-xl border border-blue-100/60 space-y-1">
                  <span className="font-bold text-[#2563EB] block">STEP 01</span>
                  <p className="font-bold text-slate-800">사전 재무 분석</p>
                  <p className="text-slate-500 text-[11px]">업력, 매출, 신용도 1차 적격성 검토</p>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-blue-100/60 space-y-1">
                  <span className="font-bold text-[#2563EB] block">STEP 02</span>
                  <p className="font-bold text-slate-800">전문위원 유선상담</p>
                  <p className="text-slate-500 text-[11px]">24시간 이내 수석 자문위원 1:1 전화</p>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-blue-100/60 space-y-1">
                  <span className="font-bold text-[#2563EB] block">STEP 03</span>
                  <p className="font-bold text-slate-800">로드맵 무료 제공</p>
                  <p className="text-slate-500 text-[11px]">자금 매칭 보고서 및 일정표 발송</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {isLoggedIn ? (
                <Link to="/mypage">
                  <Button variant="primary" size="md" className="font-bold">
                    마이페이지에서 내역 및 진행상태 확인
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button variant="primary" size="md" className="font-bold">
                    회원가입/로그인하고 실시간 심사현황 추적하기
                  </Button>
                </Link>
              )}
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  setSubmittedConsultation(null);
                  setSpamAnswer('');
                  setFormData((prev) => ({
                    ...prev,
                    inquiryDetails: '',
                    agreedToPrivacy: false,
                  }));
                }}
              >
                새로운 상담 추가 신청
              </Button>
              <Link to="/">
                <Button variant="outline" size="md">
                  홈으로 이동
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* CONSULTATION APPLICATION FORM */
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Top Logged-in Banner */}
            {isLoggedIn && currentMember ? (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center justify-between text-xs text-blue-900">
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-[#2563EB]" />
                  <span>
                    <strong>{currentMember.companyName} ({currentMember.name} 님)</strong> 계정으로 신청 중입니다. 상담 내역이 회원 마이페이지에 자동 연결됩니다.
                  </span>
                </div>
                <Link to="/mypage" className="text-[#2563EB] font-bold hover:underline shrink-0">
                  마이페이지 &gt;
                </Link>
              </div>
            ) : (
              <div className="bg-slate-100 border border-slate-200 rounded-2xl p-4 flex items-center justify-between text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-slate-500" />
                  <span>
                    비회원도 무료 상담 신청이 가능합니다. 가입 회원은 진행 현황을 마이페이지에서 실시간 추적할 수 있습니다.
                  </span>
                </div>
                <Link to="/login" className="text-[#2563EB] font-bold hover:underline shrink-0">
                  회원 로그인
                </Link>
              </div>
            )}

            {/* STEP 1: SERVICE CATEGORY SELECTION CARDS (3 CARDS) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-[#102B50] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#102B50] text-white text-xs flex items-center justify-center font-black">
                    1
                  </span>
                  관심 서비스 분야 선택 <span className="text-red-500">*</span>
                </label>
                <span className="text-xs text-slate-500">원하시는 컨설팅 분야를 선택해 주세요</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SERVICE_OPTIONS.map((srv) => {
                  const Icon = srv.icon;
                  const isSelected = selectedService === srv.id;

                  return (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => handleServiceChange(srv.id)}
                      className={`relative p-5 rounded-2xl text-left transition-all duration-200 border-2 cursor-pointer ${
                        isSelected
                          ? `bg-white ${srv.borderActive} shadow-md`
                          : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                          ✓
                        </div>
                      )}
                      <div className="flex items-center gap-3 mb-2.5">
                        <div className={`w-10 h-10 rounded-xl ${srv.bgLight} ${srv.color} flex items-center justify-center`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-base text-[#102B50]">{srv.title}</h3>
                          <span className="text-[10px] font-semibold text-slate-400 block">{srv.badge}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 leading-snug">{srv.subtitle}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: DETAIL PRODUCT SELECTION */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-[#102B50] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#102B50] text-white text-xs flex items-center justify-center font-black">
                    2
                  </span>
                  세부 상담 상품 선택 <span className="text-red-500">*</span>
                </label>
                <span className="text-xs text-[#2563EB] font-semibold">
                  {activeServiceObj.title} 관련 {activeServiceObj.products.length}개 상품
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {activeServiceObj.products.map((p) => {
                  const isChecked = selectedProductId === p.id;
                  return (
                    <label
                      key={p.id}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-blue-50/70 border-[#2563EB] ring-1 ring-blue-200'
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="detailProduct"
                        value={p.id}
                        checked={isChecked}
                        onChange={() => setSelectedProductId(p.id)}
                        className="mt-0.5 text-[#2563EB] focus:ring-[#2563EB]"
                      />
                      <div>
                        <span className={`text-xs font-bold block ${isChecked ? 'text-[#102B50]' : 'text-slate-800'}`}>
                          {p.name}
                        </span>
                        <span className="text-[11px] text-slate-500 block mt-0.5 leading-snug">
                          {p.desc}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* STEP 3: COMPANY & CONTACT INFORMATION */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-extrabold text-base text-[#102B50] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#102B50] text-white text-xs flex items-center justify-center font-black">
                    3
                  </span>
                  기업 및 신청인 정보 입력
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  정확한 정보를 입력해 주시면 정책자금 지원 요건 적합성을 보다 신속히 분석해 드립니다.
                </p>
              </div>

              {generalError && (
                <div className="p-3 text-xs bg-red-50 text-red-700 border border-red-200 rounded-xl flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{generalError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    label="기업명(상호명)"
                    placeholder="예: (주)비즈온테크 또는 삼양정밀"
                    required
                    value={formData.companyName}
                    onChange={(e) => {
                      setFormData({ ...formData, companyName: e.target.value });
                      if (validationErrors.companyName) {
                        setValidationErrors({ ...validationErrors, companyName: '' });
                      }
                    }}
                    leftIcon={<Building2 className="w-4 h-4" />}
                  />
                  {validationErrors.companyName && (
                    <p className="text-xs text-red-600 mt-1">{validationErrors.companyName}</p>
                  )}
                </div>

                <div>
                  <Input
                    label="대표자 또는 담당자 성함"
                    placeholder="예: 홍길동 대표 / 김철수 팀장"
                    required
                    value={formData.representativeName}
                    onChange={(e) => {
                      setFormData({ ...formData, representativeName: e.target.value });
                      if (validationErrors.representativeName) {
                        setValidationErrors({ ...validationErrors, representativeName: '' });
                      }
                    }}
                    leftIcon={<User className="w-4 h-4" />}
                  />
                  {validationErrors.representativeName && (
                    <p className="text-xs text-red-600 mt-1">{validationErrors.representativeName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    label="연락처 (휴대폰 번호)"
                    placeholder="010-1234-5678"
                    type="tel"
                    required
                    value={formData.contactNumber}
                    onChange={(e) => {
                      setFormData({ ...formData, contactNumber: e.target.value });
                      if (validationErrors.contactNumber) {
                        setValidationErrors({ ...validationErrors, contactNumber: '' });
                      }
                    }}
                    leftIcon={<Phone className="w-4 h-4" />}
                  />
                  {validationErrors.contactNumber && (
                    <p className="text-xs text-red-600 mt-1">{validationErrors.contactNumber}</p>
                  )}
                </div>

                <div>
                  <Input
                    label="이메일 주소"
                    placeholder="ceo@company.kr"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (validationErrors.email) {
                        setValidationErrors({ ...validationErrors, email: '' });
                      }
                    }}
                    leftIcon={<Mail className="w-4 h-4" />}
                  />
                  {validationErrors.email && (
                    <p className="text-xs text-red-600 mt-1">{validationErrors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Input
                    label="사업자등록번호 (선택)"
                    placeholder="123-45-67890"
                    value={formData.businessNumber}
                    onChange={(e) => {
                      setFormData({ ...formData, businessNumber: e.target.value });
                      if (validationErrors.businessNumber) {
                        setValidationErrors({ ...validationErrors, businessNumber: '' });
                      }
                    }}
                    leftIcon={<FileText className="w-4 h-4" />}
                  />
                  {validationErrors.businessNumber && (
                    <p className="text-xs text-red-600 mt-1">{validationErrors.businessNumber}</p>
                  )}
                </div>

                <div>
                  <Select
                    label="사업장 소재지"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    options={[
                      { value: '서울특별시', label: '서울특별시' },
                      { value: '경기도', label: '경기도' },
                      { value: '인천광역시', label: '인천광역시' },
                      { value: '부산/울산/경남', label: '부산/울산/경남' },
                      { value: '대구/경북', label: '대구/경북' },
                      { value: '대전/세종/충청', label: '대전/세종/충청' },
                      { value: '광주/전라', label: '광주/전라' },
                      { value: '강원/제주', label: '강원/제주' },
                    ]}
                  />
                </div>

                <div>
                  <Select
                    label="설립연도 (업력)"
                    value={formData.foundedYear}
                    onChange={(e) => setFormData({ ...formData, foundedYear: e.target.value })}
                    options={[
                      { value: '2026', label: '2026년 (예비창업/신규)' },
                      { value: '2025', label: '2025년 (업력 1년 미만)' },
                      { value: '2024', label: '2024년 (업력 2년차)' },
                      { value: '2023', label: '2023년 (업력 3년차)' },
                      { value: '2022', label: '2022년 (업력 4년차)' },
                      { value: '2021', label: '2021년 (업력 5년차)' },
                      { value: '2019', label: '2019~2020년 (창업 7년 이내)' },
                      { value: '2015', label: '2015~2018년 (도약기)' },
                      { value: '2014', label: '2014년 이전 (업력 10년 이상)' },
                    ]}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Select
                    label="직전년도 연매출 규모"
                    value={formData.annualRevenue}
                    onChange={(e) => setFormData({ ...formData, annualRevenue: e.target.value })}
                    options={[
                      { value: '1억 미만', label: '1억 원 미만 (초기 기업)' },
                      { value: '1억~3억', label: '1억 원 이상 ~ 3억 원 미만' },
                      { value: '3억~10억', label: '3억 원 이상 ~ 10억 원 미만' },
                      { value: '10억~50억', label: '10억 원 이상 ~ 50억 원 미만' },
                      { value: '50억~100억', label: '50억 원 이상 ~ 100억 원 미만' },
                      { value: '100억 이상', label: '100억 원 이상' },
                    ]}
                  />
                </div>

                {/* CONDITIONAL: 희망 자금 규모 (정책자금 선택 시에만 표시!) */}
                {selectedService === 'funding' && (
                  <div className="animate-fadeIn">
                    <Select
                      label="희망 자금 규모 (정책자금 선택 항목)"
                      value={formData.desiredFundAmount}
                      onChange={(e) => setFormData({ ...formData, desiredFundAmount: e.target.value })}
                      options={[
                        { value: '5천만 원 이하', label: '5천만 원 이하 (소액 긴급자금)' },
                        { value: '1억~3억', label: '1억 원 ~ 3억 원 (기본 운전자금)' },
                        { value: '3억~5억', label: '3억 원 ~ 5억 원' },
                        { value: '5억~10억', label: '5억 원 ~ 10억 원 (시설/운전 병행)' },
                        { value: '10억~30억', label: '10억 원 ~ 30억 원 (공장/설비 도입)' },
                        { value: '30억 이상', label: '30억 원 이상 (대규모 시설/스케일업)' },
                      ]}
                    />
                  </div>
                )}
              </div>

              <div>
                <Textarea
                  label="상담 요청사항 및 기업 현안 (선택)"
                  placeholder="예: 기존 신보 보증 1억 원 보유 중이며 추가 2억 원 시설자금 대출 가능 여부, 또는 벤처인증 취득을 통한 소득세/법인세 감면 가능성 검토 희망"
                  rows={4}
                  value={formData.inquiryDetails}
                  onChange={(e) => setFormData({ ...formData, inquiryDetails: e.target.value })}
                />
              </div>

              {/* SPAM BOT PREVENTION CHALLENGE */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <Shield className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span>
                    <strong>자동 스팸 방지 확인:</strong> {securityNum1} + {securityNum2} = ?
                  </span>
                </div>
                <div className="w-full sm:w-36">
                  <input
                    type="number"
                    placeholder="정답 숫자 입력"
                    value={spamAnswer}
                    onChange={(e) => {
                      setSpamAnswer(e.target.value);
                      if (validationErrors.spamAnswer) {
                        setValidationErrors({ ...validationErrors, spamAnswer: '' });
                      }
                    }}
                    className="w-full text-xs px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#2563EB] focus:outline-none"
                  />
                </div>
              </div>
              {validationErrors.spamAnswer && (
                <p className="text-xs text-red-600 -mt-2">{validationErrors.spamAnswer}</p>
              )}
            </div>

            {/* STEP 4: PRIVACY TERMS & MARKETING AGREEMENT */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 text-xs text-slate-600">
              <div className="flex items-center gap-2 font-bold text-sm text-[#102B50]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                약관 및 개인정보 동의
              </div>

              {/* Privacy Notice Box */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 leading-relaxed text-[11px] text-slate-500 space-y-2">
                <p className="font-semibold text-slate-700">
                  [개인정보 수집 및 이용 목적]
                </p>
                <p>
                  1. 수집 목적: 정부 정책자금 융자 적격 진단, 기업인증 취득 자격 검토, 경영컨설팅 1:1 전화 상담 및 상담 결과 안내
                </p>
                <p>
                  2. 수집 항목: 기업명, 성함, 연락처, 이메일, 사업자번호, 소재지, 매출 및 자금 희망액
                </p>
                <p>
                  3. 보유 및 이용 기간: <strong>상담 접수일로부터 1년</strong> (고객 요청 시 즉시 파기)
                </p>
              </div>

              {/* Required Privacy Agreement */}
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.agreedToPrivacy}
                  onChange={(e) => {
                    setFormData({ ...formData, agreedToPrivacy: e.target.checked });
                    if (validationErrors.agreedToPrivacy) {
                      setValidationErrors({ ...validationErrors, agreedToPrivacy: '' });
                    }
                  }}
                  className="mt-0.5 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
                />
                <span className="font-semibold text-slate-800">
                  [필수] 개인정보 수집 및 이용에 동의합니다. <span className="text-red-500">*</span>
                </span>
              </label>
              {validationErrors.agreedToPrivacy && (
                <p className="text-xs text-red-600 pl-6">{validationErrors.agreedToPrivacy}</p>
              )}

              {/* Optional Marketing Agreement */}
              <label className="flex items-start gap-2.5 cursor-pointer select-none pt-1">
                <input
                  type="checkbox"
                  checked={formData.agreedToMarketing}
                  onChange={(e) => setFormData({ ...formData, agreedToMarketing: e.target.checked })}
                  className="mt-0.5 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
                />
                <span>
                  [선택] 정부 신규 정책자금 공고 및 조세 감면 제도 변경 알림(SMS/이메일) 수신에 동의합니다.
                </span>
              </label>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="accent"
                fullWidth
                size="lg"
                disabled={isSubmitting}
                className="font-extrabold text-base py-4 shadow-md hover:shadow-lg transition-all"
                leftIcon={<Send className="w-5 h-5" />}
              >
                {isSubmitting ? '상담 신청서 접수 중...' : `${activeProductObj.name} 무료 상담 신청하기`}
              </Button>
              <p className="text-center text-xs text-slate-400 mt-2">
                신청하신 모든 정보는 암호화되어 안전하게 보관되며 제3자에게 제공되지 않습니다.
              </p>
            </div>
          </form>
        )}
      </div>
    </PageLayout>
  );
};
