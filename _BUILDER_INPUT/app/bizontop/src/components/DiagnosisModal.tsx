import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { DiagnosisFormData } from '../types.ts';

interface DiagnosisModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: DiagnosisFormData) => void;
  initialBusinessType?: string;
}

export const DiagnosisModal: React.FC<DiagnosisModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialBusinessType,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<DiagnosisFormData>({
    businessType: initialBusinessType || '예비창업자 신규 법인설립',
    industry: 'IT · 소프트웨어 · 플랫폼',
    preparedness: '1,000만 ~ 3,000만 원 (일반 권장)',
    primaryGoal: '설립 직후 초기 정책자금/정부지원금 연계',
    applicantName: '',
    applicantPhone: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  React.useEffect(() => {
    if (initialBusinessType) {
      setFormData((prev) => ({ ...prev, businessType: initialBusinessType }));
    }
  }, [initialBusinessType]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.applicantName || !formData.applicantPhone) {
      alert('성함과 연락처를 입력해 주세요.');
      return;
    }
    setIsSubmitted(true);
    onSuccess(formData);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    onClose();
  };

  return (
    <div
      id="diagnosis-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleResetAndClose();
      }}
    >
      <div
        id="diagnosis-modal-card"
        className="relative w-full max-w-[560px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 transition-all"
      >
        {/* Modal Top Header */}
        <div className="bg-[#0B1F3A] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-amber-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[17px] font-bold tracking-tight">
                3분 법인설립 사전 진단
              </h3>
              <p className="text-[12px] text-blue-200">
                우리 회사에 가장 유리한 법인 형태와 로드맵을 진단합니다
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {!isSubmitted && (
          <div className="bg-slate-100 h-1.5 w-full">
            <div
              className="bg-[#2563EB] h-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        )}

        <div className="p-6">
          {isSubmitted ? (
            /* Success Screen */
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-[20px] font-bold text-[#0B1F3A] mb-2">
                진단 신청이 정상 접수되었습니다!
              </h4>
              <p className="text-[14px] text-slate-600 mb-6 leading-relaxed">
                <span className="font-semibold text-slate-800">{formData.applicantName}</span> 대표님의 맞춤 진단 보고서와 준비 가이드를
                <br />
                기재해주신 연락처(<span className="font-semibold text-blue-600">{formData.applicantPhone}</span>)로 15분 내 신속히 안내해 드립니다.
              </p>

              <div className="bg-[#F7F9FC] p-4 rounded-xl text-left border border-slate-200/80 mb-6 text-[13px] space-y-2">
                <div className="text-slate-500 font-semibold mb-1">선택하신 진단 요약:</div>
                <div className="flex justify-between">
                  <span className="text-slate-600">설립 형태:</span>
                  <span className="font-medium text-slate-800">{formData.businessType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">주요 업종:</span>
                  <span className="font-medium text-slate-800">{formData.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">자본금 규모:</span>
                  <span className="font-medium text-slate-800">{formData.preparedness}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">핵심 목표:</span>
                  <span className="font-medium text-blue-700">{formData.primaryGoal}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full py-3.5 px-4 rounded-xl text-[15px] font-bold text-white bg-[#2563EB] hover:bg-blue-700 transition-colors"
              >
                확인 및 닫기
              </button>
            </div>
          ) : (
            <div>
              {/* Step Indicators */}
              <div className="flex items-center justify-between text-[12.5px] font-semibold text-slate-500 mb-5">
                <span className="text-blue-600">질문 {currentStep} / 4</span>
                <span>
                  {currentStep === 1 && '설립 형태 선택'}
                  {currentStep === 2 && '사업 업종 선택'}
                  {currentStep === 3 && '예상 자본금 규모'}
                  {currentStep === 4 && '핵심 목표 및 결과 수령'}
                </span>
              </div>

              {/* Step 1: 설립 형태 */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h4 className="text-[17px] font-bold text-[#0B1F3A]">
                    현재 준비 중이신 법인설립 형태는 무엇인가요?
                  </h4>
                  <div className="space-y-2.5">
                    {[
                      { label: '예비창업자 신규 법인설립', desc: '새로운 사업 아이템으로 첫 법인을 설립하는 경우' },
                      { label: '개인사업자 법인전환', desc: '현재 개인사업자 매출 증가로 종합소득세 절감이 필요한 경우' },
                      { label: '기존 법인의 신규 자회사/별도법인 설립', desc: '사업 다각화 또는 별도 브랜드를 분리하는 경우' },
                      { label: '외국인 투자법인 또는 지사 설립', desc: '해외 본사 지사 또는 외국인 투자 형태' },
                    ].map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => setFormData({ ...formData, businessType: item.label })}
                        className={`w-full p-3.5 rounded-xl text-left border transition-all flex items-start justify-between ${
                          formData.businessType === item.label
                            ? 'bg-blue-50/90 border-blue-500 ring-2 ring-blue-500/20'
                            : 'bg-white border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <div className="text-[14.5px] font-bold text-slate-800">{item.label}</div>
                          <div className="text-[12.5px] text-slate-500 mt-0.5">{item.desc}</div>
                        </div>
                        {formData.businessType === item.label && (
                          <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: 업종 선택 */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h4 className="text-[17px] font-bold text-[#0B1F3A]">
                    영위하실 주요 사업 업종(분야)은 무엇인가요?
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      'IT · 소프트웨어 · 플랫폼',
                      '전자상거래 · 도소매 유통',
                      '제조업 · 하드웨어 생산',
                      '전문 서비스 · 교육 · 컨설팅',
                      '바이오 · 헬스케어 · 뷰티',
                      '건설 · 부동산 · 임대업',
                      '외식업 · 프랜차이즈',
                      '기타 신사업 분야',
                    ].map((ind) => (
                      <button
                        key={ind}
                        type="button"
                        onClick={() => setFormData({ ...formData, industry: ind })}
                        className={`p-3.5 rounded-xl text-left border text-[14px] font-semibold transition-all flex items-center justify-between ${
                          formData.industry === ind
                            ? 'bg-blue-50 border-blue-500 text-blue-700 ring-2 ring-blue-500/20'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{ind}</span>
                        {formData.industry === ind && <Check className="w-4 h-4 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                  <p className="text-[12px] text-slate-500">
                    * 업종에 따라 벤처기업 인증 및 중기부 초기 창업패키지 등 정책 혜택이 상이합니다.
                  </p>
                </div>
              )}

              {/* Step 3: 예상 자본금 */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h4 className="text-[17px] font-bold text-[#0B1F3A]">
                    예상하시는 초기 자본금 규모는 어느 정도인가요?
                  </h4>
                  <div className="space-y-2.5">
                    {[
                      { label: '100만 ~ 500만 원 (소자본 창업)', desc: '법적 최저자본금 제한 없음, 빠른 설립에 유리' },
                      { label: '1,000만 ~ 3,000만 원 (일반 권장)', desc: '초기 신용도 및 법인카드, 통장 개설에 가장 안정적' },
                      { label: '5,000만 원 이상 (규모화/입찰)', desc: '공공입찰, 인허가 요건 또는 정책자금 신청 시 선호' },
                      { label: '자본금 규모 아직 고민 중', desc: '전문가 상담 후 업종별 최적 자본금 산정 희망' },
                    ].map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => setFormData({ ...formData, preparedness: item.label })}
                        className={`w-full p-3.5 rounded-xl text-left border transition-all flex items-start justify-between ${
                          formData.preparedness === item.label
                            ? 'bg-blue-50/90 border-blue-500 ring-2 ring-blue-500/20'
                            : 'bg-white border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <div className="text-[14.5px] font-bold text-slate-800">{item.label}</div>
                          <div className="text-[12.5px] text-slate-500 mt-0.5">{item.desc}</div>
                        </div>
                        {formData.preparedness === item.label && (
                          <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: 목표 및 연락처 입력 */}
              {currentStep === 4 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h4 className="text-[17px] font-bold text-[#0B1F3A]">
                    설립 이후 가장 우선적으로 준비하고 싶은 사항은?
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    {[
                      '설립 직후 초기 정책자금/정부지원금 연계',
                      '벤처기업 확인서 및 기업부설연구소 인증',
                      '주주 지분배분 및 정관 특약 절세 최적화',
                      '신속한 사업자등록 및 법인통장 개설',
                    ].map((goal) => (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => setFormData({ ...formData, primaryGoal: goal })}
                        className={`p-3 rounded-xl text-left border text-[13px] font-medium transition-all ${
                          formData.primaryGoal === goal
                            ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold ring-2 ring-blue-500/20'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-200">
                    <h5 className="text-[14px] font-bold text-slate-800 mb-2">
                      진단 결과 및 맞춤 가이드를 받아보실 연락처
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[12px] font-semibold text-slate-600 mb-1">
                          대표자 성함
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="홍길동"
                          value={formData.applicantName}
                          onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-[14px] focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] font-semibold text-slate-600 mb-1">
                          휴대폰 번호
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="010-1234-5678"
                          value={formData.applicantPhone}
                          onChange={(e) => setFormData({ ...formData, applicantPhone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-[14px] focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[12px] text-slate-500 pt-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>입력하신 정보는 비즈온탑 진단 및 맞춤 상담 목적으로만 안전하게 사용됩니다.</span>
                  </div>

                  <div className="flex items-center gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-4 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-[14px] hover:bg-slate-50 flex items-center gap-1"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>이전</span>
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-[15px] transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>맞춤 진단 리포트 받기</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* Navigation for steps 1-3 */}
              {currentStep < 4 && (
                <div className="flex items-center justify-between pt-5 mt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className={`px-4 py-2.5 rounded-lg text-[14px] font-medium flex items-center gap-1 ${
                      currentStep === 1
                        ? 'text-slate-300 cursor-not-allowed'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>이전</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-[14px] font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>다음 단계</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
