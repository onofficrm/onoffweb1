import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  Award,
  Bell,
  Briefcase,
  Building,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Coins,
  ExternalLink,
  Eye,
  FileCheck,
  FileText,
  Filter,
  HelpCircle,
  Inbox,
  Info,
  LogOut,
  Mail,
  MapPin,
  Phone,
  PlusCircle,
  RefreshCw,
  Search,
  Settings,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  User,
  Users,
  X,
} from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';
import { dbService } from '../../services/dbService';
import { ConsultationItem, ConsultationStatus, ExternalNotificationConfig } from '../../types/auth';

const STATUS_STEPS: ConsultationStatus[] = [
  '접수',
  '상담 대기',
  '상담 진행',
  '계약 완료',
  '컨설팅 진행',
  '종료',
];

const STATUS_COLOR_MAP: Record<ConsultationStatus, { bg: string; text: string; border: string }> = {
  접수: { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-300' },
  '상담 대기': { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-300' },
  '상담 진행': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-300' },
  '계약 완료': { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-300' },
  '컨설팅 진행': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-300' },
  종료: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-300' },
};

export const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentMember, user, isLoggedIn, isAdmin, logout } = useAuth();

  // Active view: 'my_consultations' | 'guest_lookup' | 'admin_panel'
  const [activeTab, setActiveTab] = useState<'consultations' | 'guest_lookup' | 'admin_panel'>(() => {
    if (isAdmin) return 'admin_panel';
    if (!isLoggedIn) return 'guest_lookup';
    return 'consultations';
  });

  const [consultations, setConsultations] = useState<ConsultationItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ConsultationItem | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Guest lookup state
  const [guestReceiptId, setGuestReceiptId] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestResult, setGuestResult] = useState<ConsultationItem | null>(null);
  const [guestError, setGuestError] = useState('');
  const [isGuestSearching, setIsGuestSearching] = useState(false);

  // Admin status update modal state
  const [adminEditingItem, setAdminEditingItem] = useState<ConsultationItem | null>(null);
  const [adminStatusInput, setAdminStatusInput] = useState<ConsultationStatus>('접수');
  const [adminNotesInput, setAdminNotesInput] = useState('');
  const [adminConsultantInput, setAdminConsultantInput] = useState('');

  // External Notification Integration settings modal
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);
  const [notifConfig, setNotifConfig] = useState<ExternalNotificationConfig>(dbService.getNotificationConfig());
  const [notifTestSuccess, setNotifTestSuccess] = useState('');

  // Load consultations
  const loadConsultationData = () => {
    if (isAdmin) {
      setConsultations(dbService.getAllConsultationsForAdmin());
    } else if (currentMember) {
      setConsultations(dbService.getConsultationsForUser(currentMember.id));
    } else {
      setConsultations([]);
    }
  };

  useEffect(() => {
    loadConsultationData();

    const handleUpdate = () => {
      loadConsultationData();
    };

    window.addEventListener('bizontop_consultations_updated', handleUpdate);
    return () => {
      window.removeEventListener('bizontop_consultations_updated', handleUpdate);
    };
  }, [currentMember, isAdmin]);

  // Handle Admin status edit save
  const handleAdminSave = () => {
    if (!adminEditingItem) return;
    dbService.updateConsultationStatus(
      adminEditingItem.id,
      adminStatusInput,
      adminNotesInput,
      adminConsultantInput
    );
    loadConsultationData();
    setAdminEditingItem(null);
  };

  // Handle Guest Lookup
  const handleGuestLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setGuestError('');
    setGuestResult(null);

    if (!guestReceiptId.trim()) {
      setGuestError('접수번호를 입력해 주세요.');
      return;
    }
    if (!guestPhone.trim()) {
      setGuestError('신청 시 등록한 연락처를 입력해 주세요.');
      return;
    }

    setIsGuestSearching(true);
    setTimeout(() => {
      setIsGuestSearching(false);
      const found = dbService.getConsultationByGuest(guestReceiptId, guestPhone);
      if (found) {
        setGuestResult(found);
      } else {
        setGuestError('입력하신 접수번호와 연락처가 일치하는 신청 내역을 찾을 수 없습니다.');
      }
    }, 400);
  };

  // Filter consultations
  const filteredConsultations = consultations.filter((item) => {
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesSearch =
      searchQuery === '' ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.representativeName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const newConsultationCount = dbService.getNewConsultationCount();

  return (
    <PageLayout
      categoryName="마이페이지"
      categoryHref="/mypage"
      title={isAdmin ? '비즈온탑 통합 관리자 센터' : '기업 회원 마이페이지'}
      subtitle={
        isAdmin
          ? '접수된 전체 1:1 상담 신청 현황, 6단계 심사 상태 및 컨설턴트 배정을 총괄 관리합니다.'
          : '신청하신 정책자금 및 기업인증 심사 진행 상태를 실시간으로 확인하실 수 있습니다.'
      }
      breadcrumbs={[{ label: '마이페이지' }]}
    >
      <div className="space-y-8">
        {/* TOP SUMMARY BAR */}
        {isLoggedIn && currentMember ? (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#102B50] text-[#D5A64B] flex items-center justify-center font-black text-2xl shrink-0 shadow-xs">
                {currentMember.companyName.slice(0, 2) || 'BT'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-extrabold text-[#102B50]">
                    {currentMember.companyName}
                  </h2>
                  <span
                    className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                      isAdmin ? 'bg-indigo-100 text-indigo-800' : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {isAdmin ? '최고 관리자' : '기업 회원'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span>대표자: <strong className="text-slate-700">{currentMember.name}</strong></span>
                  <span>연락처: <strong className="text-slate-700">{currentMember.phone}</strong></span>
                  <span>이메일: <strong className="text-slate-700">{currentMember.email}</strong></span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              <Link to="/consultation" className="flex-1 md:flex-none">
                <Button variant="accent" size="sm" className="font-bold w-full" leftIcon={<PlusCircle className="w-4 h-4" />}>
                  새 상담 신청
                </Button>
              </Link>
              <Link to="/mypage/profile" className="flex-1 md:flex-none">
                <Button variant="outline" size="sm" className="w-full" leftIcon={<Settings className="w-4 h-4" />}>
                  정보 수정
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="text-slate-500 hover:text-red-600"
                leftIcon={<LogOut className="w-4 h-4" />}
              >
                로그아웃
              </Button>
            </div>
          </div>
        ) : (
          /* Guest Welcome Banner */
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#102B50] text-white flex items-center justify-center shrink-0">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#102B50]">
                  로그인하시면 상담 진행 상태를 한눈에 모아보실 수 있습니다.
                </h3>
                <p className="text-xs text-slate-500">
                  비회원으로 신청하신 경우에도 아래 '비회원 신청 조회' 탭에서 접수번호로 바로 조회하실 수 있습니다.
                </p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <Link to="/login?redirect=/mypage">
                <Button variant="primary" size="sm" className="font-bold">
                  회원 로그인
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" size="sm">
                  기업 회원가입
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* NAVIGATION TABS */}
        <div className="flex items-center justify-between border-b border-slate-200">
          <div className="flex gap-4">
            {isLoggedIn && !isAdmin && (
              <button
                type="button"
                onClick={() => setActiveTab('consultations')}
                className={`pb-3 text-sm font-extrabold transition-all border-b-2 cursor-pointer ${
                  activeTab === 'consultations'
                    ? 'border-[#2563EB] text-[#2563EB]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                나의 상담 신청 내역 ({consultations.length})
              </button>
            )}

            {isAdmin && (
              <button
                type="button"
                onClick={() => setActiveTab('admin_panel')}
                className={`pb-3 text-sm font-extrabold transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
                  activeTab === 'admin_panel'
                    ? 'border-[#2563EB] text-[#2563EB]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>전체 상담 통합 관리</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                  {consultations.length}건
                </span>
                {newConsultationCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                    신규 {newConsultationCount}
                  </span>
                )}
              </button>
            )}

            <button
              type="button"
              onClick={() => setActiveTab('guest_lookup')}
              className={`pb-3 text-sm font-extrabold transition-all border-b-2 cursor-pointer ${
                activeTab === 'guest_lookup'
                  ? 'border-[#2563EB] text-[#2563EB]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              비회원 신청 내역 조회
            </button>
          </div>

          {isAdmin && (
            <button
              type="button"
              onClick={() => setIsNotifModalOpen(true)}
              className="mb-2 text-xs font-semibold text-slate-600 hover:text-[#2563EB] flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer"
            >
              <Bell className="w-3.5 h-3.5 text-amber-500" />
              외부 알림 연동 상태
            </button>
          )}
        </div>

        {/* TAB 1 & 2: CONSULTATION LIST VIEW (MEMBER OR ADMIN) */}
        {(activeTab === 'consultations' || activeTab === 'admin_panel') && (
          <div className="space-y-4">
            {/* Filters and Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> 상태 필터:
                </span>
                {['all', ...STATUS_STEPS].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${
                      statusFilter === st
                        ? 'bg-[#102B50] text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {st === 'all' ? '전체' : st}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="접수번호, 상품명, 기업명 검색"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs px-3 py-2 pl-8 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#2563EB] focus:outline-none"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            {/* List Table / Cards */}
            {filteredConsultations.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <Inbox className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-[#102B50]">
                    해당 조건의 상담 신청 내역이 없습니다.
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    정부 정책자금 융자 및 기업인증 1:1 맞춤 컨설팅을 무료로 신청해 보세요.
                  </p>
                </div>
                <div className="pt-2">
                  <Link to="/consultation">
                    <Button variant="primary" size="md" className="font-bold">
                      1:1 맞춤 무료 상담 신청하기
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredConsultations.map((item) => {
                  const style = STATUS_COLOR_MAP[item.status] || STATUS_COLOR_MAP['접수'];
                  const stepIndex = STATUS_STEPS.indexOf(item.status);

                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 hover:border-blue-200 hover:shadow-xs transition-all space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-xs font-mono font-bold rounded-lg border border-slate-200">
                            {item.id}
                          </span>
                          <span
                            className={`px-3 py-0.5 text-xs font-extrabold rounded-full border ${style.bg} ${style.text} ${style.border}`}
                          >
                            {item.status}
                          </span>
                          <span className="text-xs text-slate-400">
                            신청일: {item.createdAt?.split(' ')[0]}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedItem(item)}
                            className="text-xs font-bold"
                            leftIcon={<Eye className="w-3.5 h-3.5" />}
                          >
                            상세 내역 확인
                          </Button>

                          {isAdmin && (
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => {
                                setAdminEditingItem(item);
                                setAdminStatusInput(item.status);
                                setAdminNotesInput(item.adminNotes || '');
                                setAdminConsultantInput(item.assignedConsultant || '');
                              }}
                              className="text-xs font-bold bg-[#102B50] hover:bg-[#1b3d6c]"
                            >
                              관리자 상태 변경
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Content Row */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-slate-50/70 p-4 rounded-xl border border-slate-100">
                        <div>
                          <span className="text-slate-400 block text-[11px]">신청 서비스 / 상품명</span>
                          <span className="font-extrabold text-sm text-[#102B50] block mt-0.5">
                            {item.productName}
                          </span>
                          <span className="text-slate-500 text-[11px]">
                            {item.categoryName}
                          </span>
                        </div>

                        <div>
                          <span className="text-slate-400 block text-[11px]">신청 기업 / 대표자</span>
                          <span className="font-bold text-slate-800 block mt-0.5">
                            {item.companyName} ({item.representativeName} 대표)
                          </span>
                          <span className="text-slate-500 text-[11px]">
                            {item.location} · 연매출 {item.annualRevenue}
                          </span>
                        </div>

                        <div>
                          <span className="text-slate-400 block text-[11px]">배정 컨설턴트</span>
                          <span className="font-bold text-[#2563EB] block mt-0.5">
                            {item.assignedConsultant || '수석 자문위원 매칭 중'}
                          </span>
                          {item.desiredFundAmount && (
                            <span className="text-emerald-700 font-semibold text-[11px] block">
                              희망액: {item.desiredFundAmount}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* 6-Stage Progress Stepper Bar */}
                      <div className="pt-2">
                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1.5 px-1">
                          {STATUS_STEPS.map((step, idx) => {
                            const isCurrent = step === item.status;
                            const isPassed = stepIndex >= idx;

                            return (
                              <span
                                key={step}
                                className={`text-center ${
                                  isCurrent
                                    ? 'text-[#2563EB] font-black'
                                    : isPassed
                                    ? 'text-slate-700 font-semibold'
                                    : 'text-slate-400'
                                }`}
                              >
                                {step}
                              </span>
                            );
                          })}
                        </div>
                        {/* Stepper line */}
                        <div className="grid grid-cols-6 gap-1.5 h-2 bg-slate-100 rounded-full p-0.5">
                          {STATUS_STEPS.map((step, idx) => {
                            const isPassed = stepIndex >= idx;
                            return (
                              <div
                                key={step}
                                className={`h-full rounded-full transition-all ${
                                  isPassed ? 'bg-[#2563EB]' : 'bg-transparent'
                                }`}
                              />
                            );
                          })}
                        </div>
                      </div>

                      {/* Admin Note if available */}
                      {item.adminNotes && (
                        <div className="text-xs bg-blue-50/60 border border-blue-100 p-3 rounded-xl text-blue-950 flex items-start gap-2">
                          <Info className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold block text-[11px] text-[#2563EB]">
                              자문위원단 코칭 및 진행 메모
                            </span>
                            <p className="mt-0.5 leading-relaxed text-slate-700">
                              {item.adminNotes}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: GUEST LOOKUP FORM */}
        {activeTab === 'guest_lookup' && (
          <div className="max-w-xl mx-auto space-y-6">
            <Card className="p-7 sm:p-9 border-slate-200 shadow-xs space-y-5">
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#102B50]">
                  비회원 상담 신청 실시간 조회
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  상담 신청 시 발급받으신 접수번호(예: BT-20260321-xxxx)와 연락처를 입력해 주세요.
                </p>
              </div>

              <form onSubmit={handleGuestLookup} className="space-y-4">
                {guestError && (
                  <div className="p-3 text-xs bg-red-50 text-red-700 border border-red-200 rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{guestError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    접수번호 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="BT-20260321-9901"
                    required
                    value={guestReceiptId}
                    onChange={(e) => setGuestReceiptId(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#2563EB] focus:outline-none uppercase font-mono"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    ※ 테스트용 예시: <button type="button" onClick={() => { setGuestReceiptId('BT-20260321-9901'); setGuestPhone('010-9988-1122'); }} className="text-[#2563EB] underline font-mono cursor-pointer">BT-20260321-9901 (010-9988-1122)</button>
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    신청 시 입력한 연락처 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="010-1234-5678"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#2563EB] focus:outline-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  size="md"
                  disabled={isGuestSearching}
                  className="font-bold mt-2"
                >
                  {isGuestSearching ? '접수 내역 조회 중...' : '비회원 상담 신청 내역 조회'}
                </Button>
              </form>
            </Card>

            {/* Guest Lookup Result Card */}
            {guestResult && (
              <div className="bg-white rounded-2xl p-6 border-2 border-[#2563EB] shadow-md space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[11px] text-slate-400 font-mono">접수번호: {guestResult.id}</span>
                    <h4 className="font-extrabold text-base text-[#102B50] mt-0.5">
                      {guestResult.productName} ({guestResult.categoryName})
                    </h4>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full border ${STATUS_COLOR_MAP[guestResult.status].bg} ${STATUS_COLOR_MAP[guestResult.status].text} ${STATUS_COLOR_MAP[guestResult.status].border}`}
                  >
                    {guestResult.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">기업명 / 신청인:</span>
                    <span className="font-bold">{guestResult.companyName} ({guestResult.representativeName} 님)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">신청 일시:</span>
                    <span>{guestResult.createdAt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">배정 컨설턴트:</span>
                    <span className="font-bold text-[#2563EB]">{guestResult.assignedConsultant || '배정 진행 중'}</span>
                  </div>
                  {guestResult.adminNotes && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-xl text-blue-950">
                      <span className="font-bold block text-[11px] text-[#2563EB]">컨설턴트 안내 메모</span>
                      <p className="mt-0.5">{guestResult.adminNotes}</p>
                    </div>
                  )}
                </div>

                <div className="pt-2 text-center">
                  <Link to="/signup">
                    <Button variant="accent" size="sm" className="font-bold text-xs">
                      기업 회원으로 가입하고 지속 관리 받기 &gt;
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* DETAIL VIEW MODAL */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-[#2563EB] block">
                    접수번호: {selectedItem.id}
                  </span>
                  <h3 className="text-xl font-black text-[#102B50] mt-0.5">
                    {selectedItem.productName}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Banner */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">현재 심사 진행 상태</span>
                  <span className="text-lg font-black text-[#102B50] block mt-0.5">
                    {selectedItem.status}
                  </span>
                </div>
                <span
                  className={`px-3.5 py-1 text-xs font-bold rounded-full border ${STATUS_COLOR_MAP[selectedItem.status].bg} ${STATUS_COLOR_MAP[selectedItem.status].text} ${STATUS_COLOR_MAP[selectedItem.status].border}`}
                >
                  6단계 중 {STATUS_STEPS.indexOf(selectedItem.status) + 1}단계
                </span>
              </div>

              {/* Detail Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
                <div className="p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-400 text-[11px] block">신청 기업명</span>
                  <span className="font-bold text-sm text-slate-800 block">{selectedItem.companyName}</span>
                  <span className="text-slate-500">{selectedItem.location}</span>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-400 text-[11px] block">대표자 / 담당자</span>
                  <span className="font-bold text-sm text-slate-800 block">{selectedItem.representativeName} 대표</span>
                  <span className="text-slate-500">{selectedItem.contactNumber} · {selectedItem.email}</span>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-400 text-[11px] block">설립연도 / 연매출 규모</span>
                  <span className="font-bold text-slate-800 block">{selectedItem.foundedYear}년 설립</span>
                  <span className="text-slate-500">연매출 {selectedItem.annualRevenue}</span>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-400 text-[11px] block">담당 수석 컨설턴트</span>
                  <span className="font-bold text-[#2563EB] text-sm block">
                    {selectedItem.assignedConsultant || '매칭 배정 중'}
                  </span>
                  {selectedItem.desiredFundAmount && (
                    <span className="text-emerald-700 font-semibold block">
                      희망액: {selectedItem.desiredFundAmount}
                    </span>
                  )}
                </div>
              </div>

              {/* Inquiry details */}
              {selectedItem.inquiryDetails && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-xs font-bold text-slate-700 block">신청 시 고객 요청사항</span>
                  <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {selectedItem.inquiryDetails}
                  </p>
                </div>
              )}

              {/* Consultant Notes */}
              {selectedItem.adminNotes && (
                <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200 space-y-1">
                  <span className="text-xs font-bold text-[#2563EB] block">수석 자문위원 심사 및 코칭 메모</span>
                  <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
                    {selectedItem.adminNotes}
                  </p>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <Button variant="primary" size="md" onClick={() => setSelectedItem(null)}>
                  닫기
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ADMIN STATUS CHANGE MODAL */}
        {adminEditingItem && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-xs font-mono font-bold text-[#2563EB]">
                    관리자 전용: {adminEditingItem.id}
                  </span>
                  <h3 className="font-extrabold text-lg text-[#102B50]">
                    심사 진행 상태 및 메모 수정
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setAdminEditingItem(null)}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    6단계 심사 상태 변경
                  </label>
                  <select
                    value={adminStatusInput}
                    onChange={(e) => setAdminStatusInput(e.target.value as ConsultationStatus)}
                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl font-bold focus:ring-1 focus:ring-[#2563EB] focus:outline-none"
                  >
                    {STATUS_STEPS.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    담당 수석 자문위원 배정
                  </label>
                  <input
                    type="text"
                    placeholder="예: 박상현 수석자문위원"
                    value={adminConsultantInput}
                    onChange={(e) => setAdminConsultantInput(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-[#2563EB] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    진행 코칭 및 내부 자문 메모
                  </label>
                  <textarea
                    rows={4}
                    placeholder="고객 안내 및 실사 대응 코칭 메모 입력"
                    value={adminNotesInput}
                    onChange={(e) => setAdminNotesInput(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-[#2563EB] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAdminEditingItem(null)}
                >
                  취소
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleAdminSave}
                  className="font-bold bg-[#102B50] hover:bg-[#1c3d69]"
                >
                  상태 저장 및 고객 반영
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* EXTERNAL NOTIFICATION CONFIG MODAL */}
        {isNotifModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                    <Bell className="w-3.5 h-3.5" /> 외부 알림 연동 상태 안내
                  </span>
                  <h3 className="font-extrabold text-lg text-[#102B50]">
                    알림톡 및 이메일 발송 환경
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsNotifModalOpen(false);
                    setNotifTestSuccess('');
                  }}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2 text-xs text-amber-950">
                <p className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  현재 상태: 시뮬레이션 모드 (외부 API 미연결)
                </p>
                <p className="leading-relaxed text-amber-900/80 text-[11px]">
                  실제 카카오 알림톡(솔라피/비즈고) 및 이메일 SMTP 서비스 연동은 운영 배포 환경에서
                  API Key가 설정될 때 자동으로 활성화됩니다. 현재는 개발 및 데모 환경이므로 내부 알림 카운터와
                  화면 안내로 정상 시뮬레이션됩니다.
                </p>
              </div>

              {notifTestSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{notifTestSuccess}</span>
                </div>
              )}

              <div className="space-y-3 text-xs">
                <label className="flex items-center justify-between p-3 border border-slate-200 rounded-xl cursor-pointer">
                  <div>
                    <span className="font-bold text-slate-800 block">신규 상담 접수 시 관리자 웹 알림</span>
                    <span className="text-slate-400 text-[11px]">대시보드 상단 신규 알림 뱃지 표기</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="rounded text-[#2563EB]"
                  />
                </label>

                <label className="flex items-center justify-between p-3 border border-slate-200 rounded-xl cursor-pointer">
                  <div>
                    <span className="font-bold text-slate-800 block">카카오 알림톡 발송 (고객 접수확인)</span>
                    <span className="text-slate-400 text-[11px]">솔라피/카카오비즈니스 API 연동 대기</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-400">대기 중</span>
                </label>
              </div>

              <div className="flex justify-between items-center pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setNotifTestSuccess('가상 알림톡/이메일 테스트 메시지가 시스템 로그에 정상 기록되었습니다.');
                  }}
                  className="text-xs"
                >
                  알림 발송 시뮬레이션 테스트
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsNotifModalOpen(false)}
                  className="font-bold"
                >
                  확인
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};
