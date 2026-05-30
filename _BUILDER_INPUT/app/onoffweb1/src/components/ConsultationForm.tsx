/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CORE_INFO } from '../data';
import { ConsultationRequest } from '../types';
import { 
  Phone, 
  MessageSquare, 
  User, 
  Clock, 
  CheckCircle, 
  Star, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  Trash2,
  Lock
} from 'lucide-react';

export default function ConsultationForm() {
  // LocalState for Form entry
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [timeSlot, setTimeSlot] = useState('오전 (10:00 - 12:00)');
  const [type, setType] = useState<'general' | 'visit' | 'subscription' | 'investment'>('subscription');
  const [memo, setMemo] = useState('');
  const [agreeMarketing, setAgreeMarketing] = useState(true);
  const [agreePrivacy, setAgreePrivacy] = useState(true);

  // Validation States
  const [errors, setErrors] = useState<{ name?: string; phone?: string; agreePrivacy?: string }>({});

  // Submission Status
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [vipCode, setVipCode] = useState('');

  // Local Storage List for Manager view
  const [submissions, setSubmissions] = useState<ConsultationRequest[]>([]);
  const [showManager, setShowManager] = useState(false);

  // Load submissions on mount
  useEffect(() => {
    const saved = localStorage.getItem('prugio_consultations');
    if (saved) {
      try {
        setSubmissions(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Seed some starter premium demo submissions so the list is beautiful instantly
      const demoSubmissions: ConsultationRequest[] = [
        {
          id: 'sub-1',
          name: '한상우',
          phone: '010-4491-XXXX',
          timeSlot: '오전 (10:00 - 12:00)',
          type: 'subscription',
          agreeMarketing: true,
          memo: '특별공급 신혼부부 자격 요건 및 필요한 구비서류 체크리스트 희망합니다.',
          createdAt: '2026-05-28 09:12'
        },
        {
          id: 'sub-2',
          name: '이지민',
          phone: '010-9082-XXXX',
          timeSlot: '오후 (14:00 - 16:00)',
          type: 'visit',
          agreeMarketing: false,
          memo: '가족들과 모델하우스를 방문할 예정인데 동반인 제한이 있는지 궁금합니다.',
          createdAt: '2026-05-28 09:44'
        }
      ];
      localStorage.setItem('prugio_consultations', JSON.stringify(demoSubmissions));
      setSubmissions(demoSubmissions);
    }
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    let formatted = rawValue;
    if (rawValue.length > 3 && rawValue.length <= 7) {
      formatted = `${rawValue.slice(0, 3)}-${rawValue.slice(3)}`;
    } else if (rawValue.length > 7) {
      formatted = `${rawValue.slice(0, 3)}-${rawValue.slice(3, 7)}-${rawValue.slice(7, 11)}`;
    }
    setPhone(formatted);
  };

  const currentLocalTime = "2026-05-28 10:13:20"; // Supplied metadata time

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; phone?: string; agreePrivacy?: string } = {};

    if (!name.trim()) newErrors.name = '성함을 정확히 입력해 주세요.';
    if (!phone.trim() || phone.replace(/[^0-9]/g, '').length < 10) {
      newErrors.phone = '올바른 휴대폰 번호를 입력해 주세요.';
    }
    if (!agreePrivacy) {
      newErrors.agreePrivacy = '개인정보 수집 및 동의 항목에 동의해 주세요.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const randomVipId = `VIP-${Math.floor(100000 + Math.random() * 900000)}`;

    const newRequest: ConsultationRequest = {
      id: `sub-${Date.now()}`,
      name,
      phone,
      timeSlot,
      type,
      agreeMarketing,
      memo: memo || '빠른 방문 예약 원합니다.',
      createdAt: currentLocalTime.slice(0, 16)
    };

    const updatedSubmissions = [newRequest, ...submissions];
    localStorage.setItem('prugio_consultations', JSON.stringify(updatedSubmissions));
    setSubmissions(updatedSubmissions);

    setVipCode(randomVipId);
    setIsSubmitted(true);
  };

  const handleDeleteSubmission = (id: string) => {
    const updated = submissions.filter(item => item.id !== id);
    localStorage.setItem('prugio_consultations', JSON.stringify(updated));
    setSubmissions(updated);
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setMemo('');
    setIsSubmitted(false);
  };

  return (
    <section id="consultation" className="py-20 bg-white relative">
      {/* Sparkly Premium Gradients */}
      <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-gold-300 via-gold-500 to-[#0a1128]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Block - Quick action CTA contacts / Brand messages */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 text-left">
            
            <div className="space-y-4">
              <span className="text-xs font-bold text-gold-600 tracking-widest uppercase bg-gold-100 px-3.5 py-1.5 rounded-full inline-block">
                VIP FAST PASS REGISTER
              </span>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0a1128] tracking-tight leading-[1.2]">
                호수공원 영구조망<br />
                <span className="text-gold-600">VIP 관람 & 동호수 상담</span>
              </h2>

              <p className="text-sm text-gray-500 leading-relaxed font-sans font-light">
                천안 업성 푸르지오 레이크시티는 100% 사전 예약 고객에 한하여 
                1:1 입지 자산 전문가 안내 및 맞춤 자격 검증 컨설팅을 제공합니다. 
                금액 제한 없이, 청약 가점 계산, 부적격 진단, 삼성 협력사 특별 혜택 정보를 받아보세요.
              </p>
            </div>

            {/* Direct Instant Channels Card */}
            <div className="bg-gradient-to-br from-[#0a1128] to-[#14224d] p-6 rounded-2xl text-white space-y-4 shadow-xl">
              <div className="flex items-center space-x-2">
                <Star className="h-4.5 w-4.5 text-gold-400 fill-gold-400" />
                <span className="text-xs text-gold-350 font-extrabold tracking-widest uppercase font-sans">
                  DIRECT VIP CONTACT CHANNELS
                </span>
              </div>

              <p className="text-xs text-gray-300 font-sans">
                대기 시간 없이 즉시 자산가 대면 실시간 폰 상담이나 무료 카카오 예약도 보증 드립니다.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href={`tel:${CORE_INFO.phone}`}
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-gold-600 to-gold-400 p-3.5 rounded-xl text-white font-extrabold text-xs shadow hover:scale-[1.02] transition-transform"
                >
                  <Phone className="h-4 w-4 text-white" />
                  <span>대표상담: {CORE_INFO.phone}</span>
                </a>

                <a
                  href={CORE_INFO.kakaoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center space-x-2 bg-amber-400 hover:bg-amber-300 p-3.5 rounded-xl text-[#3b1e1e] font-extrabold text-xs shadow hover:scale-[1.02] transition-transform"
                >
                  <MessageSquare className="h-4 w-4 fill-current" />
                  <span>네이버 톡톡 / 카카오상담</span>
                </a>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-center space-x-2 text-[10px] text-gray-400">
                <Lock className="h-3 w-3 text-gold-400" />
                <span>256-bit 보증 규정 적용, 모든 개인정보는 분양 종료 시 즉시 영구 폐기됩니다.</span>
              </div>
            </div>

          </div>

          {/* Right Block - Booking Application Form Component */}
          <div className="lg:col-span-7 bg-gold-50/40 p-6 sm:p-10 rounded-3xl border border-gold-200/80 shadow-premium flex flex-col justify-center">
            
            {/* If Form is submitted, prove client state with high fidelity Success screen */}
            {isSubmitted ? (
              <div className="text-center space-y-6 py-6 animate-fadeIn">
                <div className="w-16 h-16 bg-gold-100 text-gold-600 rounded-full flex items-center justify-center mx-auto border border-gold-300 animate-bounce">
                  <CheckCircle className="h-10 w-10 text-gold-600" />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] bg-gold-600 text-white px-2.5 py-1 rounded font-extrabold uppercase font-mono tracking-widest bg-gold-600">
                    VIP PRE-REGISTRATION DONE
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0a1128]">
                    상담 예약이 성공적으로 접수되었습니다.
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-550 text-gray-500 font-sans">
                    등록하신 성함과 휴대폰 번호로 잠시 후 배정된 <strong className="text-gold-700">{name} 고객님 전담 수석 자산 실무 실장</strong>이 빠르게 대표전화로 콜백 드리겠습니다.
                  </p>
                </div>

                {/* Simulated Certificate Display */}
                <div className="bg-white p-5 rounded-2xl border border-gold-300 shadow-md inline-block max-w-sm mx-auto">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">CHUNAN PRUGIO VIP PASS CODE</p>
                  <p className="text-2xl font-mono text-gold-700 font-extrabold tracking-widest mt-1">
                    {vipCode}
                  </p>
                  <div className="border-t border-gray-100 pt-3 mt-3 flex items-center justify-between text-left text-[11px] text-gray-500">
                    <div>
                      <p>상담유형: {type === 'subscription' ? '청약 가점진단' : type === 'visit' ? '홍보관 모델하우스 방문' : '호수 조망동 선점'}</p>
                      <p>선호시간: {timeSlot}</p>
                    </div>
                    <p className="font-mono text-gray-400">2026-05-28</p>
                  </div>
                </div>

                <div>
                  <button
                    onClick={resetForm}
                    className="bg-[#0a1128] hover:bg-gold-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors cursor-pointer"
                  >
                    추가 상담 예약 등록하기
                  </button>
                </div>
              </div>
            ) : (
              // Primary Input Fields
              <form onSubmit={handleFormSubmit} className="space-y-5 text-left">
                
                <h3 className="text-lg font-bold text-[#0a1128] flex items-center space-x-2 border-b border-gold-200/60 pb-3 font-sans">
                  <Star className="h-5 w-5 text-gold-600 fill-gold-400" />
                  <span>사전상담 및 모델하우스 방문신청 폼</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 flex items-center space-x-1">
                      <User className="h-3.5 w-3.5 text-gold-500" />
                      <span>성함 (실명 기재)</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="김대우"
                      className={`w-full p-3 bg-white border rounded-xl text-sm focus:outline-none focus:ring-1 ${
                        errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-250 focus:border-gold-555 focus:ring-gold-500 border-gray-300'
                      }`}
                    />
                    {errors.name && <p className="text-[10px] text-red-500 font-medium">{errors.name}</p>}
                  </div>

                  {/* Phone field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 flex items-center space-x-1">
                      <Phone className="h-3.5 w-3.5 text-gold-500" />
                      <span>휴대폰 번호</span>
                    </label>
                    <input
                      type="text"
                      maxLength={13}
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="010-XXXX-XXXX"
                      className={`w-full p-3 bg-white border rounded-xl text-sm focus:outline-none focus:ring-1 ${
                        errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-250 focus:border-gold-555 focus:ring-gold-500 border-gray-300'
                      }`}
                    />
                    {errors.phone && <p className="text-[10px] text-red-500 font-medium">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Time slots preference */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 flex items-center space-x-1">
                      <Clock className="h-3.5 w-3.5 text-gold-500" />
                      <span>통화 선호 시간대</span>
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 cursor-pointer"
                    >
                      <option>오전 (10:00 - 12:00)</option>
                      <option>오후 (12:00 - 15:00)</option>
                      <option>오점 (15:00 - 18:00)</option>
                      <option>저녁 (18:00 - 20:00 - 퇴근 후)</option>
                    </select>
                  </div>

                  {/* Interest types select */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 flex items-center space-x-1">
                      <Calendar className="h-3.5 w-3.5 text-gold-500" />
                      <span>핵심 상담 목적</span>
                    </label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as any)}
                      className="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 cursor-pointer"
                    >
                      <option value="subscription">청약 가점진단 / 특별공급 조건 체크</option>
                      <option value="visit">홍보관 한시적 모델하우스 관람 (예약)</option>
                      <option value="general">단지배치 및 호수 영구 조망동 선점</option>
                      <option value="investment">삼성 SDI 배후 및 GTX 입지 투자가치 리포트</option>
                    </select>
                  </div>
                </div>

                {/* Special memos */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 block">
                    추가 요구 사항 (선선택 호수, 문의 평형대 등 기재)
                  </label>
                  <textarea
                    rows={2}
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    placeholder="예: 84A 타입 조망동 배치가 궁금합니다 / 신혼 특공 소득 합산 기준이 헷갈립니다."
                    className="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                  />
                </div>

                {/* Safe Privacy agreements checkboxes */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-start space-[#111c3a] space-x-2">
                    <input
                      type="checkbox"
                      id="privacyAgree"
                      checked={agreePrivacy}
                      onChange={(e) => setAgreePrivacy(e.target.checked)}
                      className="mt-1 h-4 w-4 text-gold-600 focus:ring-gold-500 rounded border-gray-300 cursor-pointer"
                    />
                    <label htmlFor="privacyAgree" className="text-[11px] text-gray-500 leading-normal cursor-pointer select-none">
                      <strong className="text-gray-900 font-semibold">(필수)</strong> 개인정보 수집·이용 동의 (안내 연락, 구비서류 체크, 방문 문자 발송 목적)
                    </label>
                  </div>
                  {errors.agreePrivacy && <p className="text-[10px] text-red-500 font-medium pl-6">{errors.agreePrivacy}</p>}

                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="marketingAgree"
                      checked={agreeMarketing}
                      onChange={(e) => setAgreeMarketing(e.target.checked)}
                      className="mt-1 h-4 w-4 text-gold-600 focus:ring-gold-500 rounded border-gray-300 cursor-pointer"
                    />
                    <label htmlFor="marketingAgree" className="text-[11px] text-gray-500 leading-normal cursor-pointer select-none">
                      (선택) 아파트 추가 분양일정 혜택 정보 푸쉬 및 실시간 가상 홍보 자료 문자 수신 동의
                    </label>
                  </div>
                </div>

                {/* Submits key cta */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-700 hover:to-gold-600 text-white font-extrabold text-sm py-4 rounded-xl shadow-lg hover:shadow-gold-glow transition-all duration-200 cursor-pointer"
                  >
                    🚀 사전 VIP 예약 및 전문 무료상담 신청 완료
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

        {/* Private Administrative Dashboard for interactive CRM evaluation */}
        <div className="mt-16 border-t border-gold-250 pt-10 border-gold-200">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400 font-sans">
              ※ 천안 업성 푸르지오 분양 웹사이트의 실시간 폼 작동 상태를 평가 및 확인하기 위해 관리자 CRM을 활성화할 수 있습니다.
            </p>
            <button
              onClick={() => setShowManager(!showManager)}
              className="inline-flex items-center space-x-1 text-xs font-bold text-gold-600 hover:text-gold-700 bg-gold-50 px-3 py-1.5 rounded-lg border border-gold-200 transition-colors cursor-pointer"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>{showManager ? "관리자 CRM 패널 닫기" : "내부 CRM 접수 데이터 보기"}</span>
            </button>
          </div>

          {showManager && (
            <div className="mt-4 bg-gray-900 text-gray-100 p-6 rounded-2xl border border-gray-800 shadow-inner text-left font-sans animate-slideUp">
              <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                    CHUNAN PRUGIO CRM PIPELINE STATUS: ACTIVE
                  </span>
                </div>
                <div className="text-[11px] text-gray-500">
                  총 예약인원: <strong className="text-gold-400">{submissions.length}명</strong>
                </div>
              </div>

              {submissions.length === 0 ? (
                <p className="text-xs text-gray-500 py-4 text-center">현재 접수된 문의 내역이 없습니다. 양식을 작성해 데이터를 추가해 주세요.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-2">
                  {submissions.map((sub) => (
                    <div 
                      key={sub.id} 
                      className="bg-gray-950 p-4 rounded-xl border border-gray-800 flex items-start justify-between space-x-2 text-xs"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center space-x-2">
                          <span className="font-extrabold text-white text-sm">{sub.name}</span>
                          <span className="text-[10px] bg-gold-900/60 text-gold-400 px-2 py-0.5 rounded border border-gold-800/60 uppercase">
                            {sub.type === 'subscription' ? '청약청구' : sub.type === 'visit' ? '방문예정' : sub.type === 'general' ? '조망동' : '투자 자문'}
                          </span>
                        </div>
                        <p className="text-gray-300 font-mono">연락처: {sub.phone}</p>
                        <p className="text-gray-400">희망시간: {sub.timeSlot}</p>
                        {sub.memo && <p className="text-gray-500 bg-gray-900/40 p-2 rounded border border-gray-800/40 leading-snug">의견: {sub.memo}</p>}
                        <span className="text-[10px] text-gray-600 block pt-1 font-mono">{sub.createdAt} 접수완료</span>
                      </div>
                      
                      <button
                        onClick={() => handleDeleteSubmission(sub.id)}
                        className="p-1.5 rounded text-gray-500 hover:text-red-400 hover:bg-gray-900 transition-colors"
                        aria-label="Delete booking entry"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
