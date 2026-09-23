import React, { useState } from 'react';
import { X, CheckCircle2, Phone, User, MessageSquare, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { ConsultationFormData } from '../types';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialCategory = '법인설립 상담',
}) => {
  const [formData, setFormData] = useState<ConsultationFormData>({
    name: '',
    phone: '',
    email: '',
    category: initialCategory,
    inquiryDetails: '',
    preferredTime: '언제나 가능',
    privacyAgreed: true,
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({ ...prev, category: initialCategory }));
      setSubmitted(false);
      setError(null);
    }
  }, [isOpen, initialCategory]);

  if (!isOpen) return null;

  const categories = [
    '법인설립 상담',
    '법인전환 컨설팅',
    '기업인증 (벤처 등)',
    '정책자금 컨설팅',
    '기타 문의'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('성함을 입력해 주세요.');
      return;
    }
    if (!formData.phone.trim()) {
      setError('연락처(전화번호)를 입력해 주세요.');
      return;
    }
    if (!formData.privacyAgreed) {
      setError('개인정보 수집 및 이용에 동의해 주세요.');
      return;
    }

    setError(null);
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
    >
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="닫기"
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors focus:outline-hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            {/* Modal Header */}
            <div className="mb-5">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#F4A62A]" />
                <span>전문가 1:1 맞춤 무료상담</span>
              </div>
              <h3
                id="consultation-modal-title"
                className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight"
              >
                무료상담 신청하기
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                남겨주신 내용을 바탕으로 전문 법인설립 컨설턴트가 30분 내로 친절히 연락드립니다.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 font-medium">
                ⚠️ {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 pr-1">
              {/* Category selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  상담 분야
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat })}
                      className={`p-2.5 rounded-lg border text-xs font-semibold text-center transition-all ${
                        formData.category === cat
                          ? 'border-[#2563EB] bg-blue-50/80 text-[#2563EB]'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label
                  htmlFor="consultation-name"
                  className="block text-xs font-bold text-slate-700 mb-1"
                >
                  대표님 성함 <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="consultation-name"
                    type="text"
                    required
                    placeholder="홍길동"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="consultation-phone"
                  className="block text-xs font-bold text-slate-700 mb-1"
                >
                  연락처 <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="consultation-phone"
                    type="tel"
                    required
                    placeholder="010-1234-5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                </div>
              </div>

              {/* Details (Optional) */}
              <div>
                <label
                  htmlFor="consultation-inquiry"
                  className="block text-xs font-bold text-slate-700 mb-1"
                >
                  문의 사항 (선택)
                </label>
                <textarea
                  id="consultation-inquiry"
                  rows={3}
                  placeholder="예: 온라인 쇼핑몰 법인설립 예정이며, 상호 중복 여부 및 청년창업감면 가능 여부가 궁금합니다."
                  value={formData.inquiryDetails}
                  onChange={(e) => setFormData({ ...formData, inquiryDetails: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] resize-none"
                />
              </div>

              {/* Privacy agreement */}
              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.privacyAgreed}
                    onChange={(e) => setFormData({ ...formData, privacyAgreed: e.target.checked })}
                    className="w-4 h-4 rounded text-[#2563EB] border-slate-300 focus:ring-[#2563EB]"
                  />
                  <span className="text-xs text-slate-500 font-medium">
                    [필수] 상담 진행을 위한 개인정보 수집 및 이용에 동의합니다.
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  id="consultation-form-submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white font-bold text-sm sm:text-base transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>무료상담 신청하기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </>
        ) : (
          /* Submission Success View */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-[#0B1F3A]">
                무료상담 신청이 완료되었습니다!
              </h3>
              <p className="text-sm text-slate-500 font-medium mt-2 leading-relaxed">
                비즈온탑 법인설립 전담 전문가가 남겨주신 연락처(<strong>{formData.phone}</strong>)로
                영업시간 기준 빠르게 연락드리겠습니다.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs text-slate-600 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">신청 고객명:</span>
                <span className="font-bold text-slate-700">{formData.name} 대표님</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">신청 분야:</span>
                <span className="font-bold text-[#2563EB]">{formData.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">상담 비용:</span>
                <span className="font-bold text-emerald-600">무료 (비즈온탑 지원)</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="w-full py-3 px-4 rounded-xl bg-[#0B1F3A] text-white font-bold text-sm hover:bg-slate-800 transition"
            >
              확인
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
