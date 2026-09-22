import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  AlertCircle,
  Building,
  CheckCircle2,
  KeyRound,
  Lock,
  Mail,
  Shield,
  ShieldCheck,
  Sparkles,
  User,
} from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/mypage';

  const { login, isLoggedIn, currentMember } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, show status or redirect
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('아이디(이메일)를 입력해 주세요.');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('비밀번호를 입력해 주세요.');
      return;
    }

    setIsLoading(true);
    const res = await login(email, password, rememberMe);
    setIsLoading(false);

    if (res.success) {
      navigate(redirectPath);
    } else {
      setErrorMessage(res.error || '로그인에 실패했습니다. 이메일과 비밀번호를 확인해 주세요.');
    }
  };

  // Quick fill helper for review/testing
  const fillSampleAccount = (sampleEmail: string, samplePass: string) => {
    setEmail(sampleEmail);
    setPassword(samplePass);
    setErrorMessage('');
  };

  return (
    <PageLayout
      categoryName="회원 서비스"
      categoryHref="/login"
      title="기업 회원 로그인"
      subtitle="비즈온탑 회원 전용 서비스 및 실시간 정책자금·인증 심사 현황 조회"
      breadcrumbs={[{ label: '로그인' }]}
    >
      <div className="max-w-md mx-auto">
        <Card className="p-7 sm:p-9 border-slate-200 shadow-md">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#102B50] text-[#D5A64B] font-black text-xl flex items-center justify-center mx-auto mb-3 shadow-xs">
              BT
            </div>
            <h2 className="text-xl font-bold text-[#102B50]">비즈온탑 회원 로그인</h2>
            <p className="text-xs text-slate-500 mt-1">
              기업 회원 계정으로 실시간 심사 진행 내역을 조회하세요.
            </p>
          </div>

          {/* If already logged in banner */}
          {isLoggedIn && currentMember && (
            <div className="mb-5 p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                <span>
                  현재 <strong>{currentMember.companyName} ({currentMember.name} 님)</strong>으로 로그인되어 있습니다.
                </span>
              </div>
              <div className="flex gap-2 pt-1">
                <Link to="/mypage" className="font-bold text-[#2563EB] hover:underline">
                  마이페이지 이동 &gt;
                </Link>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {errorMessage && (
              <div className="p-3.5 text-xs bg-red-50 text-red-700 border border-red-200 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <Input
              label="아이디 또는 가입 이메일"
              type="email"
              placeholder="ceo@futuretech.kr"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <Input
              label="비밀번호"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
            />

            <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
                />
                <span>로그인 상태 유지</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-[#2563EB] hover:underline font-medium"
              >
                비밀번호 찾기
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              disabled={isLoading}
              className="mt-2 font-bold"
            >
              {isLoading ? '인증 확인 중...' : '로그인'}
            </Button>

            <div className="text-center pt-2 text-xs text-slate-500">
              아직 비즈온탑 회원이 아니신가요?{' '}
              <Link to="/signup" className="text-[#2563EB] font-bold hover:underline">
                기업 회원가입
              </Link>
            </div>
          </form>

          {/* Quick Login Helper Panel for Reviewers */}
          <div className="mt-8 pt-5 border-t border-slate-100">
            <p className="text-[11px] font-bold text-slate-400 mb-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D5A64B]" />
              테스트용 계정 빠른 채우기
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => fillSampleAccount('ceo@futuretech.kr', 'password123!')}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-left cursor-pointer transition-colors"
              >
                <span className="font-bold text-[#102B50] block text-[11px]">(주)한국미래테크</span>
                <span className="text-[10px] text-slate-400">일반 기업회원</span>
              </button>
              <button
                type="button"
                onClick={() => fillSampleAccount('admin@bizontop.co.kr', 'admin1234!')}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-left cursor-pointer transition-colors"
              >
                <span className="font-bold text-[#102B50] block text-[11px]">비즈온탑 관리자</span>
                <span className="text-[10px] text-slate-400">시스템 총괄관리자</span>
              </button>
            </div>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
};
