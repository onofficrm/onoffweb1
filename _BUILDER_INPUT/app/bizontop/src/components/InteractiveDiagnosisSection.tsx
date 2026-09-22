import React, { useState, useRef } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Rocket, 
  Store, 
  Users2, 
  Building2, 
  HelpCircle, 
  Send, 
  RotateCcw, 
  Check, 
  Phone, 
  MessageSquare, 
  MessageCircle,
  FileCheck2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { MultiStepDiagnosisData } from '../types.ts';

interface InteractiveDiagnosisSectionProps {
  initialSituation?: string;
  onSuccessSubmit?: (data: MultiStepDiagnosisData) => void;
}

export const InteractiveDiagnosisSection: React.FC<InteractiveDiagnosisSectionProps> = ({
  initialSituation,
  onSuccessSubmit,
}) => {
  const formRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [formData, setFormData] = useState<MultiStepDiagnosisData>({
    currentSituation: initialSituation || '처음 사업을 시작합니다',
    mainReason: '신규 사업 시작',
    timeline: '1개월 이내',
    userName: '',
    userPhone: '',
    companyName: '',
    preferredContact: '전화',
    agreePrivacy: true,
  });

  // Scroll to form smoothly
  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Step 1 Options
  const q1Options = [
    {
      title: '처음 사업을 시작합니다',
      desc: '개인 또는 법인 설립 고민 중인 예비 창업자',
      icon: Rocket,
    },
    {
      title: '개인사업자를 운영 중입니다',
      desc: '사업 확장 및 세무 절감을 위한 법인전환 고려',
      icon: Store,
    },
    {
      title: '공동창업을 준비하고 있습니다',
      desc: '동업자 간 지분 배분과 정관 특약 설계 필요',
      icon: Users2,
    },
    {
      title: '현재 법인을 운영하고 있습니다',
      desc: '자회사 설립 또는 기업인증, 정책자금 스케일업',
      icon: Building2,
    },
    {
      title: '기타',
      desc: '기타 특수 목적 또는 사전 상담 필요',
      icon: HelpCircle,
    },
  ];

  // Step 2 Options
  const q2Options = [
    { title: '신규 사업 시작', highlight: '기초 정관 & 등기' },
    { title: '개인사업자 → 법인전환', highlight: '소득세 절감 & 포괄양수도' },
    { title: '공동창업', highlight: '지분 설계 & 동업계약' },
    { title: '투자유치 준비', highlight: '신주발행 & RCPS 대비' },
    { title: '정책자금', highlight: '기보·신보 & 창업지원금' },
    { title: '기업인증', highlight: '벤처기업 & 연구소 설립' },
    { title: '절세 및 경영구조 검토', highlight: '법인세율 & 세무 최적화' },
    { title: '기타', highlight: '맞춤형 개별 검토' },
  ];

  // Step 3 Options
  const q3Options = [
    {
      title: '가능한 빨리',
      desc: '빠른 등기 및 즉시 사업자등록 필요 (영업일 기준 패스트트랙)',
      tag: '급행 검토',
    },
    {
      title: '1개월 이내',
      desc: '상호, 주소, 주주구성 확정 후 한 달 내 진행 희망',
      tag: '표준 일정',
    },
    {
      title: '3개월 이내',
      desc: '사업계획 구체화 및 창업 일정에 맞춰 순차 진행',
      tag: '사전 준비',
    },
    {
      title: '아직 검토 중',
      desc: '개인 vs 법인 비교 및 예상비용 정보 사전 파악',
      tag: '비교 상담',
    },
  ];

  // Handlers
  const handleSelectSituation = (val: string) => {
    setFormData((prev) => ({ ...prev, currentSituation: val }));
    setErrorMessage('');
  };

  const handleSelectReason = (val: string) => {
    setFormData((prev) => ({ ...prev, mainReason: val }));
    setErrorMessage('');
  };

  const handleSelectTimeline = (val: string) => {
    setFormData((prev) => ({ ...prev, timeline: val }));
    setErrorMessage('');
  };

  const handleNextStep = () => {
    setErrorMessage('');
    if (currentStep === 1 && !formData.currentSituation) {
      setErrorMessage('현재 상황을 선택해주세요.');
      return;
    }
    if (currentStep === 2 && !formData.mainReason) {
      setErrorMessage('가장 큰 이유를 선택해주세요.');
      return;
    }
    if (currentStep === 3 && !formData.timeline) {
      setErrorMessage('희망 일정을 선택해주세요.');
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => {
    setErrorMessage('');
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.userName.trim()) {
      setErrorMessage('성함을 입력해주세요.');
      return;
    }
    if (!formData.userPhone.trim() || formData.userPhone.replace(/[^0-9]/g, '').length < 10) {
      setErrorMessage('올바른 연락처(10~11자리)를 입력해주세요.');
      return;
    }
    if (!formData.agreePrivacy) {
      setErrorMessage('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    setIsSubmitted(true);
    if (onSuccessSubmit) {
      onSuccessSubmit(formData);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setFormData({
      currentSituation: '처음 사업을 시작합니다',
      mainReason: '신규 사업 시작',
      timeline: '1개월 이내',
      userName: '',
      userPhone: '',
      companyName: '',
      preferredContact: '전화',
      agreePrivacy: true,
    });
    scrollToForm();
  };

  return (
    <section
      id="diagnosis"
      className="w-full bg-[#F4F7FB] py-18 sm:py-24 lg:py-28 border-b border-slate-200/80 scroll-mt-20"
    >
      <div className="w-full max-w-[1400px] 2xl:max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Main Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-14">
          {/* Eyebrow */}
          <div
            id="diagnosis-eyebrow"
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/90 border border-blue-200 text-blue-700 text-[12.5px] sm:text-[13.5px] font-semibold tracking-wider mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>FREE CORPORATE CHECK</span>
          </div>

          {/* Section Main Title */}
          <h2
            id="diagnosis-main-title"
            className="text-[32px] sm:text-[42px] md:text-[46px] font-black text-[#0B1F3A] tracking-tight leading-[1.2] mb-5"
          >
            3분이면
            <br />
            내 상황에 맞는 법인설립 방향을
            <br className="sm:hidden" />
            확인할 수 있습니다.
          </h2>

          {/* Description */}
          <p
            id="diagnosis-description"
            className="text-[16px] sm:text-[18px] text-slate-600 leading-relaxed max-w-3xl mx-auto mb-7"
          >
            복잡한 내용을 미리 준비하지 않아도 됩니다.
            <br className="hidden sm:inline" />
            간단한 질문에 답해주시면 상담 시 필요한 내용을 정리해드립니다.
          </p>

          {/* 3 Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-blue-200/90 text-blue-700 text-[13px] font-bold shadow-2xs">
              <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
              무료진단
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-blue-200/90 text-blue-700 text-[13px] font-bold shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              약 3분
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-blue-200/90 text-blue-700 text-[13px] font-bold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              간편신청
            </span>
          </div>

          {/* Primary CTA (triggers jump / focus) */}
          {!isSubmitted && currentStep === 1 && (
            <button
              type="button"
              onClick={scrollToForm}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-[15.5px] font-bold text-white bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-500/20 hover:shadow-lg transition-all cursor-pointer"
            >
              <span>3분 무료진단 시작하기</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
          )}
        </div>

        {/* Diagnosis Form Container Card */}
        <div
          ref={formRef}
          id="diagnosis-form-card"
          className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 overflow-hidden transition-all duration-300"
        >
          {!isSubmitted ? (
            <div>
              {/* Top Progress Area */}
              <div className="bg-[#0B1F3A] text-white p-5 sm:p-6 sm:px-8 border-b border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[12px] font-extrabold uppercase tracking-wider text-blue-400 bg-blue-950/70 border border-blue-700/60 px-2.5 py-1 rounded-md">
                      진단 진행상황
                    </span>
                    <span className="text-[14px] font-bold text-slate-200">
                      {currentStep} / 4 단계
                    </span>
                  </div>

                  {/* Step Dot Indicators */}
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4].map((stepNum) => (
                      <span
                        key={stepNum}
                        className={`transition-all duration-300 ${
                          stepNum === currentStep
                            ? 'w-6 h-2 rounded-full bg-blue-500'
                            : stepNum < currentStep
                            ? 'w-2 h-2 rounded-full bg-blue-400'
                            : 'w-2 h-2 rounded-full bg-slate-700'
                        }`}
                        title={`STEP ${stepNum}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Horizontal Progress Bar */}
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-400 h-full rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${(currentStep / 4) * 100}%` }}
                  />
                </div>
              </div>

              {/* Form Content Area */}
              <div className="p-6 sm:p-8 lg:p-10">
                {/* Error Banner */}
                {errorMessage && (
                  <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-2.5 text-[14px] font-semibold animate-shake">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* ================================================= */}
                {/* QUESTION 1 */}
                {/* ================================================= */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <span className="text-[13px] font-black text-blue-600 tracking-wider uppercase block mb-1">
                        QUESTION 1
                      </span>
                      <h3 className="text-[22px] sm:text-[25px] font-bold text-[#0B1F3A]">
                        현재 어떤 상황인가요?
                      </h3>
                      <p className="text-[14px] text-slate-500 mt-1">
                        해당되는 항목을 선택하시면 최적의 법인설립 가이드를 적용합니다.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {q1Options.map((opt) => {
                        const Icon = opt.icon;
                        const isSelected = formData.currentSituation === opt.title;

                        return (
                          <div
                            key={opt.title}
                            onClick={() => handleSelectSituation(opt.title)}
                            className={`min-h-[58px] sm:min-h-[64px] p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                              isSelected
                                ? 'bg-blue-50/70 border-blue-600 shadow-sm ring-1 ring-blue-600/30'
                                : 'bg-white border-slate-200/90 hover:bg-slate-50/80 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-3.5 sm:gap-4">
                              <div
                                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                  isSelected
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                <Icon className="w-5 h-5" />
                              </div>
                              <div>
                                <h4
                                  className={`text-[16px] sm:text-[17px] font-bold leading-snug ${
                                    isSelected ? 'text-[#0B1F3A]' : 'text-slate-800'
                                  }`}
                                >
                                  {opt.title}
                                </h4>
                                <p className="text-[13px] text-slate-500 mt-0.5 line-clamp-1">
                                  {opt.desc}
                                </p>
                              </div>
                            </div>

                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors ${
                                isSelected
                                  ? 'bg-blue-600 border-blue-600 text-white'
                                  : 'border-slate-300 bg-white text-transparent'
                              }`}
                            >
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ================================================= */}
                {/* QUESTION 2 */}
                {/* ================================================= */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <span className="text-[13px] font-black text-blue-600 tracking-wider uppercase block mb-1">
                        QUESTION 2
                      </span>
                      <h3 className="text-[22px] sm:text-[25px] font-bold text-[#0B1F3A]">
                        법인설립 또는 상담을 원하는 가장 큰 이유는 무엇인가요?
                      </h3>
                      <p className="text-[14px] text-slate-500 mt-1">
                        설립 목적에 따라 정관 특약과 주주 구성 가이드가 맞춤 설계됩니다.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {q2Options.map((opt) => {
                        const isSelected = formData.mainReason === opt.title;

                        return (
                          <div
                            key={opt.title}
                            onClick={() => handleSelectReason(opt.title)}
                            className={`min-h-[58px] sm:min-h-[64px] p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                              isSelected
                                ? 'bg-blue-50/70 border-blue-600 shadow-sm ring-1 ring-blue-600/30'
                                : 'bg-white border-slate-200/90 hover:bg-slate-50/80 hover:border-slate-300'
                            }`}
                          >
                            <div>
                              <h4
                                className={`text-[15.5px] sm:text-[16.5px] font-bold ${
                                  isSelected ? 'text-[#0B1F3A]' : 'text-slate-800'
                                }`}
                              >
                                {opt.title}
                              </h4>
                              <span className="text-[12px] font-medium text-slate-500 mt-0.5 block">
                                {opt.highlight}
                              </span>
                            </div>

                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors ${
                                isSelected
                                  ? 'bg-blue-600 border-blue-600 text-white'
                                  : 'border-slate-300 bg-white text-transparent'
                              }`}
                            >
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ================================================= */}
                {/* QUESTION 3 */}
                {/* ================================================= */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <span className="text-[13px] font-black text-blue-600 tracking-wider uppercase block mb-1">
                        QUESTION 3
                      </span>
                      <h3 className="text-[22px] sm:text-[25px] font-bold text-[#0B1F3A]">
                        언제쯤 진행하고 싶으신가요?
                      </h3>
                      <p className="text-[14px] text-slate-500 mt-1">
                        일정에 따라 급행 검토 및 필요한 서류 준비 가이드를 제공합니다.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {q3Options.map((opt) => {
                        const isSelected = formData.timeline === opt.title;

                        return (
                          <div
                            key={opt.title}
                            onClick={() => handleSelectTimeline(opt.title)}
                            className={`min-h-[58px] sm:min-h-[64px] p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                              isSelected
                                ? 'bg-blue-50/70 border-blue-600 shadow-sm ring-1 ring-blue-600/30'
                                : 'bg-white border-slate-200/90 hover:bg-slate-50/80 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-3.5">
                              <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                  isSelected
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                <Calendar className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4
                                    className={`text-[16px] sm:text-[17px] font-bold ${
                                      isSelected ? 'text-[#0B1F3A]' : 'text-slate-800'
                                    }`}
                                  >
                                    {opt.title}
                                  </h4>
                                  <span className="text-[11.5px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                    {opt.tag}
                                  </span>
                                </div>
                                <p className="text-[13px] text-slate-500 mt-0.5">
                                  {opt.desc}
                                </p>
                              </div>
                            </div>

                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors ${
                                isSelected
                                  ? 'bg-blue-600 border-blue-600 text-white'
                                  : 'border-slate-300 bg-white text-transparent'
                              }`}
                            >
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ================================================= */}
                {/* QUESTION 4 */}
                {/* ================================================= */}
                {currentStep === 4 && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <span className="text-[13px] font-black text-blue-600 tracking-wider uppercase block mb-1">
                        QUESTION 4
                      </span>
                      <h3 className="text-[22px] sm:text-[25px] font-bold text-[#0B1F3A]">
                        상담받을 정보를 입력해주세요.
                      </h3>
                      <p className="text-[14px] text-slate-500 mt-1">
                        입력해주신 정보를 바탕으로 전담 컨설턴트가 1:1 맞춤 분석 보고서를 준비합니다.
                      </p>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-[14px] font-bold text-[#0B1F3A] mb-1.5">
                          이름 <span className="text-blue-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.userName}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, userName: e.target.value }))
                          }
                          placeholder="홍길동 대표"
                          className="w-full min-h-[52px] px-4 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 text-[15px] outline-hidden transition-all"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-[14px] font-bold text-[#0B1F3A] mb-1.5">
                          연락처 <span className="text-blue-600">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.userPhone}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, userPhone: e.target.value }))
                          }
                          placeholder="010-1234-5678"
                          className="w-full min-h-[52px] px-4 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 text-[15px] outline-hidden transition-all"
                        />
                      </div>
                    </div>

                    {/* Company / Prospective Corp Name */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-[14px] font-bold text-[#0B1F3A]">
                          회사명 또는 예정 법인명
                        </label>
                        <span className="text-[12px] text-slate-400 font-medium">선택 입력</span>
                      </div>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, companyName: e.target.value }))
                        }
                        placeholder="예: 주식회사 비즈온 / 미정"
                        className="w-full min-h-[52px] px-4 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 text-[15px] outline-hidden transition-all"
                      />
                    </div>

                    {/* Preferred Contact Method */}
                    <div>
                      <label className="block text-[14px] font-bold text-[#0B1F3A] mb-2">
                        희망 상담방법 <span className="text-blue-600">*</span>
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { label: '전화', icon: Phone },
                          { label: '카카오톡', icon: MessageCircle },
                          { label: '문자', icon: MessageSquare },
                        ].map((method) => {
                          const Icon = method.icon;
                          const isSelected = formData.preferredContact === method.label;

                          return (
                            <button
                              key={method.label}
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  preferredContact: method.label as '전화' | '카카오톡' | '문자',
                                }))
                              }
                              className={`min-h-[52px] py-3 px-3 rounded-xl border-2 flex items-center justify-center gap-2 text-[14.5px] font-bold transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-blue-50/70 border-blue-600 text-blue-800'
                                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                              <span>{method.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Privacy Agreement Checkbox */}
                    <div className="pt-2">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.agreePrivacy}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, agreePrivacy: e.target.checked }))
                          }
                          className="mt-1 w-4.5 h-4.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                        />
                        <span className="text-[13px] text-slate-600 leading-snug">
                          <strong>개인정보 수집 및 이용 동의 (필수):</strong> 맞춤 법인설립 진단
                          및 상담 목적 외 용도로 사용되지 않으며, 관련 법령에 따라 안전하게
                          보호됩니다.
                        </span>
                      </label>
                    </div>

                    {/* Primary Submit Button */}
                    <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-[14.5px] font-bold transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>이전 단계</span>
                      </button>

                      <button
                        type="submit"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-[16px] font-bold text-white bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-500/25 hover:shadow-lg transition-all cursor-pointer focus:ring-4 focus:ring-blue-500/20"
                      >
                        <Send className="w-4 h-4" />
                        <span>무료상담 신청하기</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                )}

                {/* Bottom Navigation for Steps 1 ~ 3 */}
                {currentStep < 4 && (
                  <div className="pt-8 mt-6 border-t border-slate-100 flex items-center justify-between">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="inline-flex items-center gap-2 text-[14.5px] font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer min-h-[44px]"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>이전</span>
                      </button>
                    ) : (
                      <div />
                    )}

                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="inline-flex items-center justify-center gap-2 min-h-[52px] px-7 py-3 rounded-xl text-[15px] font-bold text-white bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 shadow-sm hover:shadow-md transition-all cursor-pointer focus:ring-4 focus:ring-blue-500/20"
                    >
                      <span>다음 단계로</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* ================================================= */
            /* SUCCESS UI (완료 화면) */
            /* ================================================= */
            <div
              id="diagnosis-success-screen"
              className="p-8 sm:p-12 lg:p-14 text-center max-w-2xl mx-auto"
            >
              {/* Big Animated / Highlighted Check Icon */}
              <div className="w-20 h-20 rounded-full bg-blue-50 border-2 border-blue-500/30 text-blue-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/10">
                <CheckCircle2 className="w-10 h-10 text-blue-600 stroke-[2.5]" />
              </div>

              {/* Title */}
              <h3 className="text-[26px] sm:text-[30px] font-black text-[#0B1F3A] tracking-tight mb-3">
                신청이 완료되었습니다.
              </h3>

              {/* Body */}
              <p className="text-[15.5px] text-slate-600 leading-relaxed mb-8">
                고객님의 상황을 확인한 후
                <br />
                상담 시 아래 내용을 안내해드립니다.
              </p>

              {/* 5 Checklist Items */}
              <div className="bg-[#F7F9FC] rounded-2xl p-6 sm:p-7 border border-slate-200/90 text-left mb-8 space-y-3">
                <span className="text-[12px] font-black text-blue-700 tracking-wider uppercase block mb-1">
                  1:1 맞춤 상담 시 제공 항목
                </span>
                {[
                  '법인설립 준비사항',
                  '예상 진행절차',
                  '필요서류',
                  '법인 구조 검토',
                  '설립 이후 준비사항',
                ].map((item, idx) => (
                  <div key={item} className="flex items-center gap-3 text-[14.5px] text-slate-800 font-medium">
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 text-[11px] font-bold">
                      {idx + 1}
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Submitted Summary Pill */}
              <div className="bg-blue-50/60 rounded-xl p-4 border border-blue-200/80 text-[13px] text-slate-600 mb-8 flex flex-col sm:flex-row items-center justify-between gap-2">
                <div>
                  신청인: <strong className="text-[#0B1F3A]">{formData.userName}</strong> ({formData.userPhone})
                </div>
                <div>
                  상담방법: <strong className="text-blue-700">{formData.preferredContact}</strong>
                </div>
              </div>

              {/* Bottom Notice */}
              <p className="text-[14px] font-bold text-slate-700 mb-6">
                담당자가 확인 후 연락드립니다.
              </p>

              {/* Reset / Action Button */}
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-[14px] font-bold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>진단 내용 다시 확인 / 새로 작성</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
