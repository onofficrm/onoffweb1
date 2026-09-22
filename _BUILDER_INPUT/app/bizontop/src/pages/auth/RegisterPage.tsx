import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Building,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  User,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import { dbService } from '../../services/dbService';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    businessNumber: '',
    password: '',
    passwordConfirm: '',
    agreedTerms: false,
    agreedPrivacy: false,
    agreedMarketing: false,
  });

  const [emailCheckStatus, setEmailCheckStatus] = useState<'idle' | 'available' | 'duplicate'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Email check handler
  const handleCheckEmail = () => {
    if (!formData.email.trim()) {
      setErrorMessage('이메일 주소를 입력해 주세요.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage('올바른 이메일 형식을 입력해 주세요 (예: user@company.kr).');
      return;
    }

    setErrorMessage('');
    const isDup = dbService.isEmailRegistered(formData.email.trim());
    if (isDup) {
      setEmailCheckStatus('duplicate');
      setErrorMessage('이미 등록된 이메일 주소입니다. 다른 이메일을 사용하거나 로그인해 주세요.');
    } else {
      setEmailCheckStatus('available');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('대표자 또는 담당자 성함을 입력해 주세요.');
      return;
    }
    if (!formData.companyName.trim()) {
      setErrorMessage('기업명(상호명)을 입력해 주세요.');
      return;
    }
    if (!formData.email.trim()) {
      setErrorMessage('이메일(아이디)을 입력해 주세요.');
      return;
    }
    if (emailCheckStatus === 'duplicate') {
      setErrorMessage('이미 가입된 이메일입니다. 다른 이메일 주소를 입력해 주세요.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('휴대전화 번호를 입력해 주세요.');
      return;
    }
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 9 || cleanPhone.length > 11) {
      setErrorMessage('올바른 휴대전화 번호를 입력해 주세요 (예: 010-1234-5678).');
      return;
    }

    // Password validation: 8+ chars with letters & numbers
    if (formData.password.length < 8) {
      setErrorMessage('비밀번호는 영문, 숫자를 포함하여 최소 8자 이상이어야 합니다.');
      return;
    }
    const hasLetter = /[a-zA-Z]/.test(formData.password);
    const hasNumber = /[0-9]/.test(formData.password);
    if (!hasLetter || !hasNumber) {
      setErrorMessage('비밀번호는 영문자와 숫자를 모두 포함해야 합니다.');
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      setErrorMessage('비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    if (!formData.agreedTerms || !formData.agreedPrivacy) {
      setErrorMessage('필수 서비스 이용약관 및 개인정보 수집·이용에 동의해 주세요.');
      return;
    }

    setIsSubmitting(true);
    const res = await register({
      name: formData.name,
      companyName: formData.companyName,
      email: formData.email,
      phone: formData.phone,
      businessNumber: formData.businessNumber,
      password: formData.password,
      agreedTerms: formData.agreedTerms,
      agreedPrivacy: formData.agreedPrivacy,
      agreedMarketing: formData.agreedMarketing,
    });
    setIsSubmitting(false);

    if (res.success) {
      setIsSuccess(true);
    } else {
      setErrorMessage(res.error || '회원가입 처리 중 문제가 발생했습니다.');
    }
  };

  return (
    <PageLayout
      categoryName="회원 서비스"
      categoryHref="/login"
      title="기업 회원가입"
      subtitle="비즈온탑의 기업 맞춤형 정책자금 및 인증 전문 자문 서비스를 시작하세요."
      breadcrumbs={[{ label: '회원가입' }]}
    >
      <div className="max-w-xl mx-auto">
        {isSuccess ? (
          <Card className="p-10 text-center space-y-6 border-slate-200 shadow-md">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">
                가입 완료 (단방향 암호화 적용됨)
              </span>
              <h3 className="text-2xl font-black text-[#102B50] mt-2">
                회원가입이 완료되었습니다!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
                <strong>{formData.companyName} ({formData.name} 님)</strong>, 환영합니다.
                지금 바로 마이페이지에서 기업 진단 현황을 확인하거나 1:1 정책자금 상담을 신청하실 수 있습니다.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-left space-y-2 text-slate-600">
              <p className="font-bold text-[#102B50]">✓ 가입 계정 정보 요약</p>
              <p>• 아이디(이메일): <strong className="text-slate-800">{formData.email}</strong></p>
              <p>• 대표자명: <strong className="text-slate-800">{formData.name}</strong></p>
              <p>• 기업명: <strong className="text-slate-800">{formData.companyName}</strong></p>
              <p className="text-slate-400 text-[11px]">※ 비밀번호는 안전하게 단방향 해시 처리되어 암호화 저장되었습니다.</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button
                variant="primary"
                size="md"
                className="font-bold w-full sm:w-auto"
                onClick={() => navigate('/mypage')}
              >
                마이페이지로 이동
              </Button>
              <Button
                variant="accent"
                size="md"
                className="font-bold w-full sm:w-auto"
                onClick={() => navigate('/consultation')}
              >
                1:1 맞춤 상담 신청하기
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="p-7 sm:p-9 border-slate-200 shadow-md">
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#102B50] text-[#D5A64B] font-black text-xl flex items-center justify-center mx-auto mb-3 shadow-xs">
                BT
              </div>
              <h2 className="text-xl font-bold text-[#102B50]">비즈온탑 기업 회원가입</h2>
              <p className="text-xs text-slate-500 mt-1">
                회원가입 후 실시간 심사 진행 현황 및 전담 수석 컨설턴트 1:1 매칭을 이용하세요.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3.5 text-xs bg-red-50 text-red-700 border border-red-200 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Company & Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="대표자 / 담당자 성함"
                  placeholder="홍길동 대표"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  leftIcon={<User className="w-4 h-4" />}
                />

                <Input
                  label="기업명(상호명)"
                  placeholder="(주)한국미래테크"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  leftIcon={<Building className="w-4 h-4" />}
                />
              </div>

              {/* Email with Duplicate Check */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  아이디 (이메일) <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      type="email"
                      placeholder="ceo@futuretech.kr"
                      required
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        setEmailCheckStatus('idle');
                      }}
                      className="w-full text-xs px-3.5 py-2.5 pl-9 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#2563EB] focus:outline-none"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleCheckEmail}
                    className="shrink-0 text-xs font-semibold"
                  >
                    중복 확인
                  </Button>
                </div>
                {emailCheckStatus === 'available' && (
                  <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 사용 가능한 이메일 주소입니다.
                  </p>
                )}
                {emailCheckStatus === 'duplicate' && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> 이미 가입된 이메일입니다.
                  </p>
                )}
              </div>

              {/* Phone & Business Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="휴대전화 번호"
                  placeholder="010-1234-5678"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  leftIcon={<Phone className="w-4 h-4" />}
                />

                <Input
                  label="사업자등록번호 (선택)"
                  placeholder="123-45-67890"
                  value={formData.businessNumber}
                  onChange={(e) => setFormData({ ...formData, businessNumber: e.target.value })}
                  leftIcon={<FileText className="w-4 h-4" />}
                />
              </div>

              {/* Password & Confirm */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    label="비밀번호"
                    type="password"
                    placeholder="영문+숫자 8자 이상"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    leftIcon={<Lock className="w-4 h-4" />}
                  />
                  <p className="text-[11px] text-slate-400 mt-1">영문, 숫자 포함 8자 이상</p>
                </div>

                <div>
                  <Input
                    label="비밀번호 확인"
                    type="password"
                    placeholder="비밀번호 재입력"
                    required
                    value={formData.passwordConfirm}
                    onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
                    leftIcon={<Lock className="w-4 h-4" />}
                  />
                  {formData.password && formData.passwordConfirm && (
                    <p className={`text-[11px] mt-1 ${formData.password === formData.passwordConfirm ? 'text-emerald-600' : 'text-red-500'}`}>
                      {formData.password === formData.passwordConfirm ? '✓ 비밀번호가 일치합니다.' : '✗ 비밀번호가 일치하지 않습니다.'}
                    </p>
                  )}
                </div>
              </div>

              {/* Terms Checkboxes */}
              <div className="pt-2 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.agreedTerms}
                    onChange={(e) => setFormData({ ...formData, agreedTerms: e.target.checked })}
                    className="mt-0.5 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <span>
                    <strong className="text-slate-800">[필수]</strong> 비즈온탑 서비스 이용약관에 동의합니다.
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.agreedPrivacy}
                    onChange={(e) => setFormData({ ...formData, agreedPrivacy: e.target.checked })}
                    className="mt-0.5 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <span>
                    <strong className="text-slate-800">[필수]</strong> 개인정보 수집 및 이용에 동의합니다. (보유기간: 회원탈퇴 시까지)
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.agreedMarketing}
                    onChange={(e) => setFormData({ ...formData, agreedMarketing: e.target.checked })}
                    className="mt-0.5 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <span>
                    [선택] 정책자금 신규 공고 및 조세감면 혜택 알림(SMS/이메일) 수신에 동의합니다.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  size="lg"
                  disabled={isSubmitting}
                  className="font-bold"
                >
                  {isSubmitting ? '가입 처리 중...' : '비즈온탑 기업 회원가입 완료'}
                </Button>
              </div>

              <div className="text-center pt-2 text-xs text-slate-500">
                이미 비즈온탑 회원이신가요?{' '}
                <Link to="/login" className="text-[#2563EB] font-bold hover:underline">
                  로그인하기
                </Link>
              </div>
            </form>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};
