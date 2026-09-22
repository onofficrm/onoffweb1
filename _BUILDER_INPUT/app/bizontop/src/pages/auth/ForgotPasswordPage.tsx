import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  KeyRound,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { dbService } from '../../services/dbService';

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);
  const [sentEmail, setSentEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('가입 시 등록한 이메일 주소를 입력해 주세요.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = dbService.createPasswordResetToken(email.trim());
      setIsSubmitting(false);

      if (res.success && res.token) {
        setGeneratedToken(res.token);
        setSentEmail(email.trim());
      } else {
        setErrorMessage(res.error || '등록된 이메일 계정을 찾을 수 없습니다.');
      }
    }, 500);
  };

  return (
    <PageLayout
      categoryName="회원 서비스"
      categoryHref="/login"
      title="비밀번호 찾기"
      subtitle="가입하신 이메일 주소로 일회용 비밀번호 재설정 링크를 발송해 드립니다."
      breadcrumbs={[{ label: '비밀번호 찾기' }]}
    >
      <div className="max-w-md mx-auto">
        <Card className="p-7 sm:p-9 border-slate-200 shadow-md">
          {generatedToken ? (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-blue-100 text-[#2563EB] rounded-full flex items-center justify-center mx-auto ring-8 ring-blue-50">
                <Mail className="w-8 h-8" />
              </div>

              <div>
                <span className="px-2.5 py-0.5 bg-blue-50 text-[#2563EB] text-xs font-bold rounded-full">
                  발송 완료 (유효시간 30분)
                </span>
                <h3 className="text-xl font-bold text-[#102B50] mt-2">
                  재설정 안내 메일이 발송되었습니다
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  <strong className="text-slate-800">{sentEmail}</strong> 주소로 비밀번호 재설정 인증 토큰이 생성되었습니다.
                </p>
              </div>

              {/* Simulation Mailbox Card */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-left space-y-3 text-xs">
                <div className="flex items-center justify-between text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    토큰 유효기간: 30분
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">1회용 보안 토큰</span>
                </div>
                <p className="text-slate-700 text-[11px] leading-relaxed">
                  ※ 시뮬레이션 환경에서는 아래 버튼을 클릭하여 발송된 재설정 링크로 즉시 이동할 수 있습니다.
                </p>
                <div className="pt-1">
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    onClick={() => navigate(`/reset-password?token=${generatedToken}`)}
                    className="font-bold text-xs"
                    rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                  >
                    📧 비밀번호 재설정 링크 열기
                  </Button>
                </div>
              </div>

              <div className="flex justify-center gap-4 text-xs pt-2">
                <Link to="/login" className="text-[#2563EB] font-bold hover:underline">
                  로그인 화면으로 돌아가기
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#102B50] text-[#D5A64B] font-black text-xl flex items-center justify-center mx-auto mb-3 shadow-xs">
                  <KeyRound className="w-6 h-6 text-[#D5A64B]" />
                </div>
                <h2 className="text-xl font-bold text-[#102B50]">비밀번호 재설정</h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  가입하신 이메일 주소를 입력하시면, 안전한 비밀번호 재설정을 위한 인증 링크를 전송합니다.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 text-xs bg-red-50 text-red-700 border border-red-200 rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <Input
                  label="가입 이메일 주소"
                  type="email"
                  placeholder="예: ceo@futuretech.kr"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  leftIcon={<Mail className="w-4 h-4" />}
                />

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  size="lg"
                  disabled={isSubmitting}
                  className="font-bold mt-2"
                >
                  {isSubmitting ? '인증 토큰 발급 중...' : '비밀번호 재설정 링크 받기'}
                </Button>

                <div className="text-center pt-3 text-xs text-slate-500">
                  기억나셨나요?{' '}
                  <Link to="/login" className="text-[#2563EB] font-bold hover:underline">
                    로그인으로 이동
                  </Link>
                </div>
              </form>
            </>
          )}
        </Card>
      </div>
    </PageLayout>
  );
};
