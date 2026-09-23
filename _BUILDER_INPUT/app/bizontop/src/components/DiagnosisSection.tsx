import React, { useState, useRef } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  Smartphone, 
  Check, 
  RotateCcw,
  Building,
  UserCheck
} from 'lucide-react';
import { MultiStepDiagnosisData } from '../types';

interface DiagnosisSectionProps {
  onOpenConsultation?: () => void;
}

export const DiagnosisSection: React.FC<DiagnosisSectionProps> = ({
  onOpenConsultation,
}) => {
  // 1 to 4: Step questions, 5: Success state
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isStarted, setIsStarted] = useState<boolean>(true); // Shows form interactive area
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState<MultiStepDiagnosisData>({
    currentSituation: '',
    primaryReason: '',
    timeline: '',
    name: '',
    phone: '',
    companyName: '',
    contactMethod: '전화',
    privacyAgreed: true,
  });

  const formContainerRef = useRef<HTMLDivElement>(null);

  // Question 1 Options
  const q1Options = [
    '처음 사업을 시작합니다',
    '개인사업자를 운영 중입니다',
    '공동창업을 준비하고 있습니다',
    '현재 법인을 운영하고 있습니다',
    '기타',
  ];

  // Question 2 Options
  const q2Options = [
    '신규 사업 시작',
    '개인사업자 → 법인전환',
    '공동창업',
    '투자유치 준비',
    '정책자금',
    '기업인증',
    '절세 및 경영구조 검토',
    '기타',
  ];

  // Question 3 Options
  const q3Options = [
    '가능한 빨리',
    '1개월 이내',
    '3개월 이내',
    '아직 검토 중',
  ];

  // Scroll smoothly to form container if needed
  const scrollToForm = () => {
    setIsStarted(true);
    if (formContainerRef.current) {
      formContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleNext = () => {
    setErrorMsg(null);
    if (currentStep === 1) {
      if (!formData.currentSituation) {
        setErrorMsg('현재 사업 상황을 1가지 선택해주세요.');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!formData.primaryReason) {
        setErrorMsg('법인설립 또는 상담을 원하는 가장 큰 이유를 선택해주세요.');
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (!formData.timeline) {
        setErrorMsg('희망하시는 진행 시기를 선택해주세요.');
        return;
      }
      setCurrentStep(4);
    }
  };

  const handlePrev = () => {
    setErrorMsg(null);
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('성함을 입력해주세요.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('연락처를 입력해주세요.');
      return;
    }
    if (!formData.privacyAgreed) {
      setErrorMsg('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    setErrorMsg(null);
    // Transition to success screen
    setCurrentStep(5);
  };

  const handleReset = () => {
    setFormData({
      currentSituation: '',
      primaryReason: '',
      timeline: '',
      name: '',
      phone: '',
      companyName: '',
      contactMethod: '전화',
      privacyAgreed: true,
    });
    setCurrentStep(1);
    setIsStarted(true);
  };

  // Progress percentage: 4 total questions
  const progressPercent = Math.min(100, Math.round((currentStep / 4) * 100));

  return (
    <section
      id="diagnosis-section"
      className="py-16 sm:py-24 bg-gradient-to-b from-white via-[#F7F9FC] to-white border-b border-slate-200/80"
      aria-label="3분 법인설립 무료 진단"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ==================================================
            1. 메인 섹션 헤더 (Eyebrow, Title, Description, Badges)
            ================================================== */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 text-[#2563EB] border border-blue-200 mb-3.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>FREE CORPORATE CHECK</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-black text-[#0B1F3A] tracking-tight leading-tight">
            3분이면 <br className="sm:hidden" />
            내 상황에 맞는 법인설립 방향을 <br />
            확인할 수 있습니다.
          </h2>

          <p className="mt-3.5 text-base sm:text-[17px] text-slate-600 font-normal leading-relaxed">
            복잡한 내용을 미리 준비하지 않아도 됩니다. <br className="hidden sm:inline" />
            간단한 질문에 답해주시면 상담 시 필요한 내용을 정리해드립니다.
          </p>

          {/* Badges: 무료진단 · 약 3분 · 간편신청 */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-white text-[#2563EB] border border-blue-200 shadow-2xs">
              <Check className="w-4 h-4 text-[#2563EB]" />
              무료진단
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-white text-slate-700 border border-slate-200 shadow-2xs">
              <Clock className="w-4 h-4 text-[#F4A62A]" />
              약 3분 소요
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-white text-slate-700 border border-slate-200 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              간편신청 (서류 불필요)
            </span>
          </div>
        </div>

        {/* ==================================================
            2. 진단 FORM CONTAINER (Interactive Multi-Step Form)
            ================================================== */}
        <div 
          ref={formContainerRef}
          className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-blue-900/5 p-6 sm:p-10 relative overflow-hidden"
        >
          {currentStep <= 4 ? (
            <div>
              {/* Top Progress Indicator: "1 / 4", "●○○○", Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-500 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-[#2563EB]">
                      {currentStep}
                    </span>
                    <span className="text-slate-400">/ 4</span>
                  </div>

                  {/* Dot step indicator: ●○○○ */}
                  <div className="flex items-center gap-1.5 tracking-widest text-sm" aria-label={`Step ${currentStep} of 4`}>
                    {[1, 2, 3, 4].map((stepNum) => (
                      <span
                        key={stepNum}
                        className={`inline-block w-2.5 h-2.5 rounded-full transition-all ${
                          currentStep === stepNum
                            ? 'bg-[#2563EB] ring-4 ring-blue-100 scale-110'
                            : currentStep > stepNum
                            ? 'bg-blue-400'
                            : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Smooth Progress Bar */}
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-[#2563EB] transition-all duration-300 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs sm:text-sm font-semibold text-red-600 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  {errorMsg}
                </div>
              )}

              {/* --------------------------------------
                  QUESTION 1
                  -------------------------------------- */}
              {currentStep === 1 && (
                <div className="animate-in fade-in duration-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#2563EB] mb-1">
                    QUESTION 01
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight mb-2">
                    현재 어떤 상황인가요?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mb-6 font-normal">
                    현재 가장 가까운 사업 형태를 1가지 선택해주세요.
                  </p>

                  <div className="space-y-3">
                    {q1Options.map((opt) => {
                      const isSelected = formData.currentSituation === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          id={`q1-opt-${opt}`}
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, currentSituation: opt }));
                            setErrorMsg(null);
                          }}
                          className={`w-full min-h-[52px] py-3.5 px-5 rounded-2xl border text-left font-bold text-sm sm:text-base flex items-center justify-between transition-all duration-150 active:scale-[0.99] select-none ${
                            isSelected
                              ? 'border-[#2563EB] bg-blue-50/70 text-[#0B1F3A] ring-2 ring-blue-500/20 shadow-xs'
                              : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50/70 text-slate-800'
                          }`}
                        >
                          <span>{opt}</span>
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                              isSelected
                                ? 'border-[#2563EB] bg-[#2563EB] text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-end">
                    <button
                      type="button"
                      id="q1-next-btn"
                      onClick={handleNext}
                      className="min-h-[52px] inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white font-bold text-base px-7 py-3.5 rounded-xl shadow-md transition-all duration-200 group"
                    >
                      <span>다음 질문으로</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              )}

              {/* --------------------------------------
                  QUESTION 2
                  -------------------------------------- */}
              {currentStep === 2 && (
                <div className="animate-in fade-in duration-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#2563EB] mb-1">
                    QUESTION 02
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight mb-2">
                    법인설립 또는 상담을 원하는 <br />
                    가장 큰 이유는 무엇인가요?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mb-6 font-normal">
                    이번 설립을 통해 달성하고자 하는 주 목적을 선택해주세요.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q2Options.map((opt) => {
                      const isSelected = formData.primaryReason === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          id={`q2-opt-${opt}`}
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, primaryReason: opt }));
                            setErrorMsg(null);
                          }}
                          className={`min-h-[52px] py-3.5 px-4 rounded-xl border text-left font-bold text-sm sm:text-[15px] flex items-center justify-between transition-all duration-150 active:scale-[0.99] select-none ${
                            isSelected
                              ? 'border-[#2563EB] bg-blue-50/70 text-[#0B1F3A] ring-2 ring-blue-500/20 shadow-xs'
                              : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50/70 text-slate-800'
                          }`}
                        >
                          <span>{opt}</span>
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center border shrink-0 transition-all ${
                              isSelected
                                ? 'border-[#2563EB] bg-[#2563EB] text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      id="q2-prev-btn"
                      onClick={handlePrev}
                      className="min-h-[52px] inline-flex items-center justify-center gap-1.5 text-slate-600 hover:text-[#0B1F3A] font-bold text-sm px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>이전으로</span>
                    </button>

                    <button
                      type="button"
                      id="q2-next-btn"
                      onClick={handleNext}
                      className="min-h-[52px] inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white font-bold text-base px-7 py-3.5 rounded-xl shadow-md transition-all duration-200 group"
                    >
                      <span>다음 질문으로</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              )}

              {/* --------------------------------------
                  QUESTION 3
                  -------------------------------------- */}
              {currentStep === 3 && (
                <div className="animate-in fade-in duration-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#2563EB] mb-1">
                    QUESTION 03
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight mb-2">
                    언제쯤 진행하고 싶으신가요?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mb-6 font-normal">
                    예상하시는 법인설립 및 사업 개시 일정을 알려주세요.
                  </p>

                  <div className="space-y-3">
                    {q3Options.map((opt) => {
                      const isSelected = formData.timeline === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          id={`q3-opt-${opt}`}
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, timeline: opt }));
                            setErrorMsg(null);
                          }}
                          className={`w-full min-h-[52px] py-3.5 px-5 rounded-2xl border text-left font-bold text-sm sm:text-base flex items-center justify-between transition-all duration-150 active:scale-[0.99] select-none ${
                            isSelected
                              ? 'border-[#2563EB] bg-blue-50/70 text-[#0B1F3A] ring-2 ring-blue-500/20 shadow-xs'
                              : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50/70 text-slate-800'
                          }`}
                        >
                          <span>{opt}</span>
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                              isSelected
                                ? 'border-[#2563EB] bg-[#2563EB] text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      id="q3-prev-btn"
                      onClick={handlePrev}
                      className="min-h-[52px] inline-flex items-center justify-center gap-1.5 text-slate-600 hover:text-[#0B1F3A] font-bold text-sm px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>이전으로</span>
                    </button>

                    <button
                      type="button"
                      id="q3-next-btn"
                      onClick={handleNext}
                      className="min-h-[52px] inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white font-bold text-base px-7 py-3.5 rounded-xl shadow-md transition-all duration-200 group"
                    >
                      <span>마지막 단계로</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              )}

              {/* --------------------------------------
                  QUESTION 4: 상담 정보 입력
                  -------------------------------------- */}
              {currentStep === 4 && (
                <form onSubmit={handleSubmit} className="animate-in fade-in duration-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#2563EB] mb-1">
                    QUESTION 04
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight mb-2">
                    상담받을 정보를 입력해주세요.
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mb-6 font-normal">
                    진단 결과를 분석하여 전문 매니저가 맞춤 답변을 드립니다.
                  </p>

                  <div className="space-y-4">
                    {/* 이름 (필수) */}
                    <div>
                      <label htmlFor="diag-name" className="block text-xs font-bold text-[#0B1F3A] mb-1.5">
                        이름 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="diag-name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="홍길동"
                        className="w-full min-h-[48px] px-4 rounded-xl border border-slate-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 text-sm font-medium outline-hidden transition-all"
                        required
                      />
                    </div>

                    {/* 연락처 (필수) */}
                    <div>
                      <label htmlFor="diag-phone" className="block text-xs font-bold text-[#0B1F3A] mb-1.5">
                        연락처 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="diag-phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="010-0000-0000"
                        className="w-full min-h-[48px] px-4 rounded-xl border border-slate-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 text-sm font-medium outline-hidden transition-all"
                        required
                      />
                    </div>

                    {/* 회사명 또는 예정 법인명 (선택) */}
                    <div>
                      <label htmlFor="diag-company" className="block text-xs font-bold text-slate-700 mb-1.5">
                        회사명 또는 예정 법인명 <span className="text-slate-400 font-normal">(선택 입력)</span>
                      </label>
                      <input
                        type="text"
                        id="diag-company"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="예: 비즈온탑 주식회사 (미정시 공란)"
                        className="w-full min-h-[48px] px-4 rounded-xl border border-slate-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 text-sm font-medium outline-hidden transition-all"
                      />
                    </div>

                    {/* 희망 상담방법: 전화 / 카카오톡 / 문자 */}
                    <div>
                      <label className="block text-xs font-bold text-[#0B1F3A] mb-2">
                        희망 상담방법
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: '전화', label: '전화', icon: <Phone className="w-3.5 h-3.5" /> },
                          { id: '카카오톡', label: '카카오톡', icon: <MessageSquare className="w-3.5 h-3.5" /> },
                          { id: '문자', label: '문자', icon: <Smartphone className="w-3.5 h-3.5" /> },
                        ].map((method) => {
                          const isSelected = formData.contactMethod === method.id;
                          return (
                            <button
                              key={method.id}
                              type="button"
                              id={`diag-method-${method.id}`}
                              onClick={() => setFormData({ ...formData, contactMethod: method.id as any })}
                              className={`min-h-[46px] py-2 px-3 rounded-xl border font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all select-none ${
                                isSelected
                                  ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] ring-1 ring-blue-500/20'
                                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                              }`}
                            >
                              {method.icon}
                              <span>{method.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 개인정보 수집 동의 Checkbox */}
                    <div className="pt-2">
                      <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 select-none">
                        <input
                          type="checkbox"
                          id="diag-privacy"
                          checked={formData.privacyAgreed}
                          onChange={(e) => setFormData({ ...formData, privacyAgreed: e.target.checked })}
                          className="mt-0.5 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB] w-4 h-4"
                        />
                        <span>
                          [필수] 상담 안내 및 진단 결과 전달을 위한 개인정보 수집 및 이용에 동의합니다.
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Navigation Buttons: Previous & Primary CTA [무료상담 신청하기] */}
                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      id="q4-prev-btn"
                      onClick={handlePrev}
                      className="min-h-[52px] inline-flex items-center justify-center gap-1.5 text-slate-600 hover:text-[#0B1F3A] font-bold text-sm px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>이전으로</span>
                    </button>

                    <button
                      type="submit"
                      id="diag-submit-btn"
                      className="min-h-[52px] flex-1 inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white font-bold text-base px-6 py-3.5 rounded-xl shadow-md transition-all duration-200 group"
                    >
                      <span>무료상담 신청하기</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* ==================================================
               3. 완료 화면 (Success UI)
               ================================================== */
            <div id="diag-success-container" className="text-center py-6 sm:py-8 animate-in fade-in zoom-in-95 duration-200">
              {/* Large Check Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-6 text-emerald-600 shadow-inner">
                <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11 stroke-[2.5]" />
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-black text-[#0B1F3A] tracking-tight mb-3">
                신청이 완료되었습니다.
              </h3>

              {/* Body */}
              <p className="text-sm sm:text-base text-slate-600 font-medium max-w-md mx-auto mb-8 leading-relaxed">
                고객님의 상황을 확인한 후 <br />
                상담 시 아래 내용을 안내해드립니다.
              </p>

              {/* 5-Item Checklist Box */}
              <div className="bg-slate-50/80 rounded-2xl p-5 sm:p-6 border border-slate-200/90 max-w-md mx-auto text-left mb-8 shadow-2xs">
                <span className="block text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-3">
                  상담 시 맞춤 안내 목록
                </span>
                <ul className="space-y-2.5">
                  {[
                    '법인설립 준비사항',
                    '예상 진행절차',
                    '필요서류',
                    '법인 구조 검토',
                    '설립 이후 준비사항',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Notice */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-xs sm:text-sm font-bold text-[#2563EB] mb-6">
                <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
                <span>"담당자가 확인 후 연락드립니다."</span>
              </div>

              <div>
                <button
                  type="button"
                  id="diag-reset-btn"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-700 underline underline-offset-4 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>다시 진단하기</span>
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </section>
  );
};
