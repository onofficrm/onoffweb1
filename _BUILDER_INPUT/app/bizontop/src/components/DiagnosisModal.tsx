import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  RotateCcw,
  Phone,
  MessageSquare,
  Smartphone
} from 'lucide-react';
import { MultiStepDiagnosisData } from '../types';

interface DiagnosisModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation?: () => void;
}

export const DiagnosisModal: React.FC<DiagnosisModalProps> = ({
  isOpen,
  onClose,
  onOpenConsultation,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
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

  if (!isOpen) return null;

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
  };

  const progressPercent = Math.min(100, Math.round((currentStep / 4) * 100));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="diagnosis-modal-title"
    >
      <div className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden max-h-[min(92vh,92dvh)] flex flex-col overscroll-contain">
        
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors focus:outline-hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {currentStep <= 4 ? (
          <div className="flex-1 overflow-y-auto pr-1">
            {/* Header & Step Tracker */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                <div className="flex items-center gap-1.5 text-[#2563EB]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>3분 무료 법인설립 진단</span>
                </div>
                <div className="flex items-center gap-2 mr-6">
                  <span className="text-sm font-black text-[#2563EB]">{currentStep}</span>
                  <span className="text-slate-400">/ 4</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#2563EB] h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-600">
                {errorMsg}
              </div>
            )}

            {/* QUESTION 1 */}
            {currentStep === 1 && (
              <div>
                <h3 id="diagnosis-modal-title" className="text-xl font-black text-[#0B1F3A] mb-1">
                  현재 어떤 상황인가요?
                </h3>
                <p className="text-xs text-slate-500 mb-4">현재 가장 가까운 사업 형태를 선택해주세요.</p>
                <div className="space-y-2.5">
                  {q1Options.map((opt) => {
                    const isSelected = formData.currentSituation === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, currentSituation: opt }));
                          setErrorMsg(null);
                        }}
                        className={`w-full min-h-[52px] py-3.5 px-4 rounded-xl border text-left font-bold text-sm flex items-center justify-between transition-all ${
                          isSelected
                            ? 'border-[#2563EB] bg-blue-50/70 text-[#0B1F3A] ring-2 ring-blue-500/20'
                            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span>{opt}</span>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                          isSelected ? 'border-[#2563EB] bg-[#2563EB] text-white' : 'border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="min-h-[52px] inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all"
                  >
                    <span>다음 질문으로</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* QUESTION 2 */}
            {currentStep === 2 && (
              <div>
                <h3 className="text-xl font-black text-[#0B1F3A] mb-1">
                  법인설립 또는 상담을 원하는 가장 큰 이유는 무엇인가요?
                </h3>
                <p className="text-xs text-slate-500 mb-4">원하시는 핵심 목적을 선택해주세요.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q2Options.map((opt) => {
                    const isSelected = formData.primaryReason === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, primaryReason: opt }));
                          setErrorMsg(null);
                        }}
                        className={`min-h-[52px] py-3 px-3.5 rounded-xl border text-left font-bold text-xs sm:text-sm flex items-center justify-between transition-all ${
                          isSelected
                            ? 'border-[#2563EB] bg-blue-50/70 text-[#0B1F3A] ring-2 ring-blue-500/20'
                            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span>{opt}</span>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center border shrink-0 ${
                          isSelected ? 'border-[#2563EB] bg-[#2563EB] text-white' : 'border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="min-h-[52px] px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                  >
                    이전으로
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="min-h-[52px] inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all"
                  >
                    <span>다음 질문으로</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* QUESTION 3 */}
            {currentStep === 3 && (
              <div>
                <h3 className="text-xl font-black text-[#0B1F3A] mb-1">
                  언제쯤 진행하고 싶으신가요?
                </h3>
                <p className="text-xs text-slate-500 mb-4">희망하시는 예상 일정을 선택해주세요.</p>
                <div className="space-y-2.5">
                  {q3Options.map((opt) => {
                    const isSelected = formData.timeline === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, timeline: opt }));
                          setErrorMsg(null);
                        }}
                        className={`w-full min-h-[52px] py-3.5 px-4 rounded-xl border text-left font-bold text-sm flex items-center justify-between transition-all ${
                          isSelected
                            ? 'border-[#2563EB] bg-blue-50/70 text-[#0B1F3A] ring-2 ring-blue-500/20'
                            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span>{opt}</span>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                          isSelected ? 'border-[#2563EB] bg-[#2563EB] text-white' : 'border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="min-h-[52px] px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                  >
                    이전으로
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="min-h-[52px] inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all"
                  >
                    <span>마지막 단계로</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* QUESTION 4 */}
            {currentStep === 4 && (
              <form onSubmit={handleSubmit}>
                <h3 className="text-xl font-black text-[#0B1F3A] mb-1">
                  상담받을 정보를 입력해주세요.
                </h3>
                <p className="text-xs text-slate-500 mb-4">입력하신 정보로 맞춤 진단 결과를 전달해드립니다.</p>

                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-[#0B1F3A] mb-1">
                      이름 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="홍길동"
                      className="w-full min-h-[46px] px-3.5 rounded-xl border border-slate-300 focus:border-[#2563EB] text-sm outline-hidden"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B1F3A] mb-1">
                      연락처 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="010-0000-0000"
                      className="w-full min-h-[46px] px-3.5 rounded-xl border border-slate-300 focus:border-[#2563EB] text-sm outline-hidden"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      회사명 또는 예정 법인명 <span className="text-slate-400 font-normal">(선택)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="미정시 공란"
                      className="w-full min-h-[46px] px-3.5 rounded-xl border border-slate-300 focus:border-[#2563EB] text-sm outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B1F3A] mb-1.5">
                      희망 상담방법
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: '전화', label: '전화', icon: <Phone className="w-3.5 h-3.5" /> },
                        { id: '카카오톡', label: '카카오톡', icon: <MessageSquare className="w-3.5 h-3.5" /> },
                        { id: '문자', label: '문자', icon: <Smartphone className="w-3.5 h-3.5" /> },
                      ].map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, contactMethod: m.id as any })}
                          className={`min-h-[44px] py-2 px-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 ${
                            formData.contactMethod === m.id
                              ? 'border-[#2563EB] bg-blue-50 text-[#2563EB]'
                              : 'border-slate-200 bg-white text-slate-700'
                          }`}
                        >
                          {m.icon}
                          <span>{m.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-1">
                    <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-600">
                      <input
                        type="checkbox"
                        checked={formData.privacyAgreed}
                        onChange={(e) => setFormData({ ...formData, privacyAgreed: e.target.checked })}
                        className="mt-0.5 rounded border-slate-300 text-[#2563EB] w-4 h-4"
                      />
                      <span>[필수] 개인정보 수집 및 이용에 동의합니다.</span>
                    </label>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="min-h-[52px] px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                  >
                    이전으로
                  </button>
                  <button
                    type="submit"
                    className="min-h-[52px] flex-1 inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all"
                  >
                    <span>무료상담 신청하기</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* SUCCESS SCREEN */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-4 text-emerald-600">
              <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl font-black text-[#0B1F3A] mb-2">신청이 완료되었습니다.</h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
              고객님의 상황을 확인한 후 <br />
              상담 시 아래 내용을 안내해드립니다.
            </p>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left mb-6 max-w-sm mx-auto">
              <span className="block text-[11px] font-bold text-[#2563EB] uppercase mb-2">
                상담 시 맞춤 안내 목록
              </span>
              <ul className="space-y-1.5">
                {[
                  '법인설립 준비사항',
                  '예상 진행절차',
                  '필요서류',
                  '법인 구조 검토',
                  '설립 이후 준비사항',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-[#2563EB] mb-6">
              <ShieldCheck className="w-4 h-4" />
              <span>"담당자가 확인 후 연락드립니다."</span>
            </div>

            <div>
              <button
                type="button"
                onClick={onClose}
                className="w-full min-h-[48px] bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm py-3 rounded-xl transition-all"
              >
                닫기
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
