import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  CheckCircle2,
  KeyRound,
  Lock,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { dbService } from '../../services/dbService';

export const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token') || '';

  const [tokenStatus, setTokenStatus] = useState<{
    checked: boolean;
    valid: boolean;
    email?: string;
    error?: string;
  }>({
    checked: false,
    valid: false,
  });

  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setTokenStatus({
        checked: true,
        valid: false,
        error: '토큰 정보가 없습니다. 비밀번호 재설정을 다시 신청해 주세요.',
      });
      return;
    }

    const verification = dbService.verifyResetToken(token);
    setTokenStatus({
      checked: true,
      valid: verification.valid,
      email: verification.email,
      error: verification.error,
    });
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (newPassword.length < 8) {
      setErrorMessage('새 비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다.');
      return;
    }
    const hasLetter = /[a-zA-Z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    if (!hasLetter || !hasNumber) {
      setErrorMessage('새 비밀번호는 영문자와 숫자를 모두 포함해야 합니다.');
      return;
    }

    if (newPassword !== newPasswordConfirm) {
      setErrorMessage('비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    setIsSubmitting(true);
    const res = await dbService.resetPasswordWithToken(token, newPassword);
    setIsSubmitting(false);

    if (res.success) {
      setIsSuccess(true);
    } else {
      setErrorMessage(res.error || '비밀번호 재설정 중 오류가 발생했습니다.');
    }
  };

  return (
    <PageLayout
      categoryName="회원 서비스"
      categoryHref="/login"
      title="새 비밀번호 설정"
      subtitle="보안을 위해 새로운 비밀번호를 설정해 주세요."
      breadcrumbs={[{ label: '비밀번호 재설정' }]}
    >
      <div className="max-w-md mx-auto">
        <Card className="p-7 sm:p-9 border-slate-200 shadow-md">
          {!tokenStatus.checked ? (
            <div className="text-center py-10 text-xs text-slate-500">
              인증 토큰 유효성을 확인하는 중입니다...
            </div>
          ) : !tokenStatus.valid ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto ring-6 ring-red-50">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-[#102B50]">
                유효하지 않거나 만료된 링크입니다
              </h3>
              <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                {tokenStatus.error || '비밀번호 재설정 링크의 유효시간(30분)이 지났거나 이미 사용된 링크입니다.'}
              </p>
              <div className="pt-2">
                <Link to="/forgot-password">
                  <Button variant="primary" size="md">
                    비밀번호 재설정 다시 신청하기
                  </Button>
                </Link>
              </div>
            </div>
          ) : isSuccess ? (
            <div className="text-center space-y-5 py-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#102B50]">
                  비밀번호가 안전하게 변경되었습니다!
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  새로운 비밀번호로 로그인해 주시기 바랍니다.
                </p>
              </div>
              <div className="pt-2">
                <Button
                  variant="primary"
                  fullWidth
                  size="md"
                  onClick={() => navigate('/login')}
                  className="font-bold"
                >
                  로그인 페이지로 이동
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#102B50] text-[#D5A64B] font-black text-xl flex items-center justify-center mx-auto mb-3 shadow-xs">
                  <KeyRound className="w-6 h-6 text-[#D5A64B]" />
                </div>
                <h2 className="text-xl font-bold text-[#102B50]">새 비밀번호 입력</h2>
                <p className="text-xs text-slate-500 mt-1">
                  계정: <strong className="text-slate-800">{tokenStatus.email}</strong>
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 text-xs bg-red-50 text-red-700 border border-red-200 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <Input
                label="새 비밀번호"
                type="password"
                placeholder="영문, 숫자 포함 8자 이상"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                leftIcon={<Lock className="w-4 h-4" />}
              />

              <Input
                label="새 비밀번호 확인"
                type="password"
                placeholder="새 비밀번호 재입력"
                required
                value={newPasswordConfirm}
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
                leftIcon={<Lock className="w-4 h-4" />}
              />

              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                disabled={isSubmitting}
                className="font-bold mt-2"
              >
                {isSubmitting ? '비밀번호 암호화 변경 중...' : '비밀번호 변경 완료'}
              </Button>
            </form>
          )}
        </Card>
      </div>
    </PageLayout>
  );
};
