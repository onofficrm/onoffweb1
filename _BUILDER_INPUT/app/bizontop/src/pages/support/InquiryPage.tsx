import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Clock,
  HelpCircle,
  Info,
  Phone,
  PhoneCall,
  Send,
  ShieldCheck,
  Sparkles,
  Tag,
} from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input, Select, Textarea } from '../../components/ui/Input';
import { ConsultationFormData } from '../../types';
import { getProductById, getCategoryById } from '../../data/productData';

interface PageProps {
  onOpenConsultation?: () => void;
}

const subNav = [
  { label: '공지사항', href: '/support/notices' },
  { label: '정책자금 소식', href: '/support/news' },
  { label: '기업인증 정보', href: '/support/cert-info' },
  { label: '컨설팅 사례', href: '/support/cases' },
  { label: '자주 묻는 질문', href: '/support/faq' },
  { label: '상담 신청', href: '/consultation', active: true },
];

const initialForm: ConsultationFormData = {
  companyName: '',
  representativeName: '',
  contactNumber: '',
  email: '',
  location: '수도권',
  annualRevenue: '3억~10억',
  businessYears: '3년 이상 ~ 7년 미만',
  consultingType: '정책자금',
  estimatedAmount: '1억~3억',
  inquiryDetails: '',
  agreedToPrivacy: false,
};

// Map product/category IDs to readable consultation types
function mapServiceToType(serviceId: string | null): string {
  if (!serviceId) return '정책자금';
  switch (serviceId) {
    case 'small-business':
      return '소상공인 정책자금';
    case 'sme':
      return '중소기업 정책자금';
    case 'startup':
      return '창업기업 특화자금';
    case 'working-capital':
      return '운전자금 조달';
    case 'facility':
    case 'facility-capital':
      return '시설자금 / 공장 매입';
    case 'funding':
    case 'policy-fund':
      return '정책자금 전반';
    case 'venture':
      return '벤처기업확인 인증';
    case 'research-center':
    case 'lab':
      return '기업부설연구소 설립';
    case 'research-department':
    case 'rnd-dept':
      return '연구개발전담부서 설립';
    case 'iso':
      return 'ISO 인증 (9001/14001)';
    case 'mainbiz':
      return '메인비즈 (MAIN-BIZ) 인증';
    case 'innobiz':
      return '이노비즈 (INNO-BIZ) 인증';
    case 'certification':
      return '기업인증 패키지';
    case 'incorporation':
    case 'corporation':
      return '법인설립 및 법인전환';
    case 'integrated':
    case 'advisory':
      return '통합경영자문';
    case 'real-estate':
      return '부동산 매입 및 시설자금';
    case 'finance':
      return '기업 재무 및 자금조달';
    case 'growth':
      return '기업 성장전략 수립';
    case 'consulting':
      return '경영컨설팅 전반';
    default:
      return '정책자금';
  }
}

export const InquiryPage: React.FC<PageProps> = () => {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service');
  const selectedProduct = serviceParam ? getProductById(serviceParam) : undefined;
  const selectedCategory = serviceParam ? getCategoryById(serviceParam) : undefined;

  const selectedName =
    selectedProduct?.name ||
    selectedCategory?.name ||
    (serviceParam ? mapServiceToType(serviceParam) : null);

  const [formData, setFormData] = useState<ConsultationFormData>(() => {
    const defaultType = mapServiceToType(serviceParam);
    return {
      ...initialForm,
      consultingType: defaultType,
      inquiryDetails: selectedName ? `[${selectedName}] 관련 맞춤 상담 희망합니다.` : '',
    };
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (serviceParam) {
      const typeStr = mapServiceToType(serviceParam);
      setFormData((prev) => ({
        ...prev,
        consultingType: typeStr,
        inquiryDetails: prev.inquiryDetails || (selectedName ? `[${selectedName}] 관련 맞춤 상담 희망합니다.` : ''),
      }));
    }
    document.title = '무료 상담 신청 | 비즈온탑';
  }, [serviceParam, selectedName]);

  const handleChange = (field: keyof ConsultationFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.companyName.trim()) {
      setErrorMsg('기업명(상호명)을 입력해 주세요.');
      return;
    }
    if (!formData.representativeName.trim()) {
      setErrorMsg('대표자명(신청인 성명)을 입력해 주세요.');
      return;
    }
    if (!formData.contactNumber.trim()) {
      setErrorMsg('연락처(휴대폰 번호)를 입력해 주세요.');
      return;
    }
    if (!formData.agreedToPrivacy) {
      setErrorMsg('개인정보 수집 및 이용 동의가 필요합니다.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 700);
  };

  return (
    <PageLayout
      categoryName="고객센터"
      categoryHref="/support/notices"
      title="1:1 무료 상담 신청"
      subtitle="전문 수석 컨설턴트가 24시간 이내 사전 분석 후 최적의 정책금융 솔루션을 안내해 드립니다."
      breadcrumbs={[{ label: '상담 신청' }]}
      subNavigation={subNav}
    >
      <div className="max-w-4xl mx-auto">
        {isSuccess ? (
          <div className="bg-white rounded-2xl p-10 sm:p-14 border border-slate-200 text-center space-y-6 shadow-xs">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#102B50]">
                상담 신청이 성공적으로 접수되었습니다!
              </h3>
              <p className="text-sm text-slate-600 mt-2 max-w-lg mx-auto leading-relaxed">
                작성해 주신 기업 정보({formData.companyName})를 바탕으로, 비즈온탑 기업자문연구소에서 
                수혜 가능한 정책자금 및 조세 감면 트랙을 정밀 분석한 후 
                <strong> {formData.contactNumber}</strong> 번호로 신속히 연락드리겠습니다.
              </p>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl text-left max-w-md mx-auto text-xs text-slate-700 space-y-2">
              <p className="font-bold text-[#102B50]">📌 상담 진행 프로세스</p>
              <p>1. 접수 확인 및 기업 재무·업종 1차 스크리닝</p>
              <p>2. 전담 수석 컨설턴트 1:1 유선 상담 (24시간 이내)</p>
              <p>3. 맞춤형 정책자금 분석표 및 인증 취득 로드맵 무료 제공</p>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setFormData(initialForm);
                setIsSuccess(false);
              }}
            >
              새로운 상담 신청하기
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Info & Trust Card */}
            <div className="lg:col-span-4 space-y-5">
              <div className="bg-gradient-to-br from-[#102B50] to-[#183C6C] text-white p-6 rounded-2xl shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#D5A64B]">
                  <Sparkles className="w-4 h-4" />
                  <span>비즈온탑 안심 상담 약속</span>
                </div>
                <h4 className="text-lg font-bold">
                  초기 착수금 없이<br />정직하게 진단합니다
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  자금 조달 가능성이 낮은 기업에 헛된 희망을 드리지 않습니다. 철저한 기업 데이터 분석을 바탕으로 객관적인 승인 가능성을 투명하게 공개합니다.
                </p>

                <div className="pt-2 border-t border-white/15 space-y-2 text-xs text-slate-200">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#D5A64B]" />
                    <span>신용도 하락 없는 비공개 상담</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#D5A64B]" />
                    <span>접수 후 24시간 이내 신속 연락</span>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-white rounded-xl border border-slate-200 text-xs space-y-2">
                <p className="font-bold text-[#102B50]">상담 접수 안내</p>
                <p className="text-slate-600 leading-relaxed">
                  온라인 상담은 24시간 365일 상시 접수 가능하며, 주말 및 공휴일 접수 건은 익영업일 오전 순차적으로 배정됩니다.
                </p>
              </div>

              {selectedProduct && (
                <div className="p-5 bg-blue-50/70 rounded-xl border border-blue-200 text-xs space-y-2 text-blue-900">
                  <p className="font-bold flex items-center gap-1.5 text-blue-950">
                    <Tag className="w-3.5 h-3.5" />
                    선택하신 서비스 안내
                  </p>
                  <p className="font-semibold text-sm text-[#102B50]">{selectedProduct.name}</p>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {selectedProduct.shortDesc}
                  </p>
                  <Link
                    to={`/${selectedProduct.category}/${selectedProduct.id}`}
                    className="inline-block text-[11px] font-bold text-blue-700 hover:underline pt-1"
                  >
                    서비스 상세페이지 다시보기 →
                  </Link>
                </div>
              )}
            </div>

            {/* Right Application Form */}
            <div className="lg:col-span-8 bg-white p-7 sm:p-9 rounded-2xl border border-slate-200 shadow-xs">
              {selectedName && (
                <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-blue-950">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      ✓
                    </span>
                    <div>
                      <span className="font-bold text-[#102B50]">[{selectedName}]</span> 맞춤 상담으로 지정되었습니다.
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-blue-700 bg-white px-2.5 py-1 rounded-md border border-blue-200 shrink-0">
                    우선 배정
                  </span>
                </div>
              )}

              <h3 className="text-xl font-bold text-[#102B50] mb-1">
                상담 신청서 작성
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                정확한 정보를 입력해 주실수록 더욱 세밀한 자금 한도 분석이 가능합니다.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 text-xs bg-red-50 text-red-700 border border-red-200 rounded-lg">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="기업명 (상호명)"
                    placeholder="예: (주)비즈온탑"
                    required
                    value={formData.companyName}
                    onChange={(e) => handleChange('companyName', e.target.value)}
                  />
                  <Input
                    label="대표자 / 담당자 성명"
                    placeholder="예: 홍길동 대표"
                    required
                    value={formData.representativeName}
                    onChange={(e) => handleChange('representativeName', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="연락처"
                    placeholder="010-0000-0000"
                    required
                    value={formData.contactNumber}
                    onChange={(e) => handleChange('contactNumber', e.target.value)}
                  />
                  <Input
                    label="이메일 (선택)"
                    type="email"
                    placeholder="ceo@company.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="사업장 소재 권역"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    options={[
                      { label: '서울 / 경기 / 인천 (수도권)', value: '수도권' },
                      { label: '충청권 (대전/세종/충남북)', value: '충청권' },
                      { label: '영남권 (부산/대구/울산/경남북)', value: '영남권' },
                      { label: '호남권 (광주/전남북)', value: '호남권' },
                      { label: '강원 / 제주권', value: '기타' },
                    ]}
                  />
                  <Select
                    label="상담 희망 분야"
                    value={formData.consultingType}
                    onChange={(e) => handleChange('consultingType', e.target.value)}
                    options={[
                      { label: '소상공인 정책자금', value: '소상공인 정책자금' },
                      { label: '중소기업 정책자금', value: '중소기업 정책자금' },
                      { label: '창업기업 특화자금 (7년 미만)', value: '창업기업 특화자금' },
                      { label: '운전자금 조달', value: '운전자금 조달' },
                      { label: '시설자금 / 공장 매입', value: '시설자금 / 공장 매입' },
                      { label: '정책자금 전반', value: '정책자금 전반' },
                      { label: '벤처기업확인 인증', value: '벤처기업확인 인증' },
                      { label: '기업부설연구소 설립', value: '기업부설연구소 설립' },
                      { label: '연구개발전담부서 설립', value: '연구개발전담부서 설립' },
                      { label: 'ISO 인증 (9001/14001)', value: 'ISO 인증 (9001/14001)' },
                      { label: '메인비즈 (MAIN-BIZ) 인증', value: '메인비즈 (MAIN-BIZ) 인증' },
                      { label: '이노비즈 (INNO-BIZ) 인증', value: '이노비즈 (INNO-BIZ) 인증' },
                      { label: '기업인증 패키지', value: '기업인증 패키지' },
                      { label: '법인설립 및 법인전환', value: '법인설립 및 법인전환' },
                      { label: '통합경영자문', value: '통합경영자문' },
                      { label: '부동산 매입 및 시설자금', value: '부동산 매입 및 시설자금' },
                      { label: '기업 재무 및 자금조달', value: '기업 재무 및 자금조달' },
                      { label: '기업 성장전략 수립', value: '기업 성장전략 수립' },
                      { label: '경영컨설팅 전반', value: '경영컨설팅 전반' },
                    ]}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="직전년도 연매출"
                    value={formData.annualRevenue}
                    onChange={(e) => handleChange('annualRevenue', e.target.value)}
                    options={[
                      { label: '3억 원 미만 (초기/간이)', value: '3억 미만' },
                      { label: '3억 ~ 10억 원 미만', value: '3억~10억' },
                      { label: '10억 ~ 30억 원 미만', value: '10억~30억' },
                      { label: '30억 ~ 100억 원 미만', value: '30억~100억' },
                      { label: '100억 원 이상', value: '100억 이상' },
                    ]}
                  />
                  <Select
                    label="기업 업력"
                    value={formData.businessYears}
                    onChange={(e) => handleChange('businessYears', e.target.value)}
                    options={[
                      { label: '1년 미만 (예비/초기)', value: '1년 미만' },
                      { label: '1년 이상 ~ 3년 미만', value: '1년~3년' },
                      { label: '3년 이상 ~ 7년 미만', value: '3년 이상 ~ 7년 미만' },
                      { label: '7년 이상 (성장/중견)', value: '7년 이상' },
                    ]}
                  />
                </div>

                <Select
                  label="희망 자금 규모 또는 목적"
                  value={formData.estimatedAmount}
                  onChange={(e) => handleChange('estimatedAmount', e.target.value)}
                  options={[
                    { label: '5천만 ~ 1억 원 (소액 운전/단기)', value: '5천만~1억' },
                    { label: '1억 ~ 3억 원 (일반 운전자금)', value: '1억~3억' },
                    { label: '3억 ~ 10억 원 (성장/인증 연계)', value: '3억~10억' },
                    { label: '10억 ~ 30억 원 이상 (시설/공장 매입)', value: '10억 이상' },
                    { label: '자금 외 기업인증 / 경영컨설팅 목적', value: '인증/컨설팅' },
                  ]}
                />

                <Textarea
                  label="문의 및 기업 주요 상황 (선택)"
                  placeholder="예: 현재 원자재 구매를 위한 운전자금 3억 원이 필요하며, 연구소 설립을 통한 세액공제와 벤처기업 인증도 함께 검토 중입니다."
                  rows={3}
                  value={formData.inquiryDetails}
                  onChange={(e) => handleChange('inquiryDetails', e.target.value)}
                />

                {/* Privacy Agreement Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreedToPrivacy}
                      onChange={(e) => handleChange('agreedToPrivacy', e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded text-[#102B50] focus:ring-[#102B50]"
                    />
                    <div className="text-xs text-slate-600 leading-relaxed">
                      <span className="font-semibold text-slate-900">[필수] 개인정보 수집 및 이용 동의</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        비즈온탑은 기업 맞춤 정책자금 및 컨설팅 자문 상담 목적으로만 성명, 연락처, 기업 정보를 수집·이용하며 관련 법령에 따라 안전하게 파기됩니다.
                      </p>
                    </div>
                  </label>
                </div>

                <div className="pt-3">
                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    fullWidth
                    disabled={isSubmitting}
                    className="font-bold text-base py-4 shadow-md group"
                  >
                    {isSubmitting ? (
                      '상담 접수 처리 중...'
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                        1:1 무료 상담 신청서 제출하기
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};
