import React, { useState } from 'react';
import { X, PhoneCall, ShieldCheck, CheckCircle2, Clock, Building } from 'lucide-react';
import { ConsultationFormData } from '../types.ts';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: ConsultationFormData) => void;
  defaultCategory?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  defaultCategory = '법인설립',
}) => {
  const [formData, setFormData] = useState<ConsultationFormData>({
    name: '',
    phone: '',
    category: defaultCategory,
    message: '',
    agreePrivacy: true,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('성함과 연락처를 입력해 주세요.');
      return;
    }
    if (!formData.agreePrivacy) {
      alert('개인정보 수집 및 이용에 동의해 주세요.');
      return;
    }
    setIsSubmitted(true);
    onSuccess(formData);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  const categories = [
    { label: '법인설립', desc: '신규 법인 정관·등기·서류' },
    { label: '법인전환', desc: '개인사업자 절세 전환' },
    { label: '기업인증', desc: '벤처·연구소·메인비즈' },
    { label: '정책자금', desc: '초기 운전·시설자금 매칭' },
  ];

  return (
    <div
      id="consultation-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleResetAndClose();
      }}
    >
      <div
        id="consultation-modal-card"
        className="relative w-full max-w-[520px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8"
      >
        {/* Modal Top Header */}
        <div className="bg-[#0B1F3A] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[17px] font-bold tracking-tight">
                전문가 무료상담 신청
              </h3>
              <p className="text-[12px] text-blue-200">
                복잡한 법인설립, 전문 컨설턴트가 1:1로 직접 안내해 드립니다
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

        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-[20px] font-bold text-[#0B1F3A] mb-2">
                무료상담 신청이 완료되었습니다!
              </h4>
              <p className="text-[14px] text-slate-600 mb-6 leading-relaxed">
                <span className="font-semibold text-slate-800">{formData.name}</span> 대표님,
                접수해주신 상담 요청을 확인하였습니다.
                <br />
                영업시간 기준 <span className="font-semibold text-blue-600">30분 이내</span>에
                전문 상담위원이 직접 연락드리겠습니다.
              </p>

              <div className="bg-slate-50 p-4 rounded-xl text-left border border-slate-200/80 mb-6 text-[13px] space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">상담 분야:</span>
                  <span className="font-semibold text-[#0B1F3A]">{formData.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">신청 연락처:</span>
                  <span className="font-medium text-slate-800">{formData.phone}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full py-3.5 px-4 rounded-xl text-[15px] font-bold text-white bg-[#2563EB] hover:bg-blue-700 transition-colors"
              >
                확인
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Category Select */}
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">
                  상담 희망 분야
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat.label })}
                      className={`p-2.5 rounded-xl text-left border transition-all ${
                        formData.category === cat.label
                          ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold ring-2 ring-blue-500/20'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-[13.5px] font-bold">{cat.label}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{cat.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[12.5px] font-semibold text-slate-700 mb-1">
                    성함 / 직함 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="홍길동 대표"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-[14px] focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-slate-700 mb-1">
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="010-0000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-[14px] focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[12.5px] font-semibold text-slate-700 mb-1">
                  문의 사항 또는 준비 현황 (선택)
                </label>
                <textarea
                  rows={3}
                  placeholder="예: 예비창업자인데 상호와 자본금 설정이 고민됩니다. 빠른 전자등기 절차 문의드립니다."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-[14px] focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>

              {/* Privacy Agreement */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="privacy-check"
                  checked={formData.agreePrivacy}
                  onChange={(e) => setFormData({ ...formData, agreePrivacy: e.target.checked })}
                  className="mt-0.5 w-4 h-4 rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="privacy-check" className="text-[12px] text-slate-500 leading-tight">
                  개인정보 수집 및 이용(상담 접수 및 회신 목적)에 동의합니다.
                </label>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center justify-between text-[11.5px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <div className="flex items-center gap-1 text-emerald-700 font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% 비밀보장</span>
                </div>
                <div className="flex items-center gap-1 text-slate-600">
                  <Clock className="w-3.5 h-3.5" />
                  <span>평일 09:00~18:00 신속 회신</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-[15px] transition-colors shadow-sm cursor-pointer"
              >
                무료상담 신청하기
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
