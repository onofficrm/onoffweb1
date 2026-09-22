import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  FileText,
  Package,
  Settings,
  ShieldCheck,
  ShieldAlert,
  Lock,
  ArrowLeft,
  LogOut,
  RefreshCw,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { dbService } from '../../services/dbService';
import { boardService } from '../../services/boardService';
import { siteSettingsService } from '../../services/siteSettingsService';
import { ConsultationItem } from '../../types/auth';
import { BoardPost } from '../../types/board';
import { Button } from '../../components/ui/Button';

// Admin Subtabs
import { AdminDashboardTab } from './AdminDashboardTab';
import { AdminConsultationsTab } from './AdminConsultationsTab';
import { AdminMembersTab } from './AdminMembersTab';
import { AdminBoardsTab } from './AdminBoardsTab';
import { AdminProductsTab } from './AdminProductsTab';
import { AdminSettingsTab } from './AdminSettingsTab';

type AdminTab =
  | 'dashboard'
  | 'consultations'
  | 'members'
  | 'boards'
  | 'products'
  | 'settings';

export const AdminPage: React.FC = () => {
  const { user, isLoggedIn, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentTab = (searchParams.get('tab') as AdminTab) || 'dashboard';

  // Data states
  const [consultations, setConsultations] = useState<ConsultationItem[]>([]);
  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [memberCount, setMemberCount] = useState<number>(0);
  const [membersList, setMembersList] = useState<any[]>([]);
  const [selectedConsultation, setSelectedConsultation] = useState<ConsultationItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = () => {
    if (!isAdmin) return;
    setIsLoading(true);
    try {
      const allConsultations = dbService.getAllConsultationsForAdmin();
      const allPosts = boardService.getAllPosts();
      const allMembers = dbService.getAllMembersForAdmin();

      setConsultations(allConsultations);
      setPosts(allPosts);
      setMembersList(allMembers);
      setMemberCount(allMembers.length);
    } catch (e) {
      console.error('Failed to load admin data:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadData();
    }
  }, [isAdmin]);

  const handleTabChange = (tab: AdminTab) => {
    setSearchParams({ tab });
  };

  // 1. Guard: If not logged in
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-lg space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-600">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-black text-[#102B50]">관리자 로그인 필요</h1>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              /admin 영역은 비즈온탑 본사 관리자 전용 보안 시스템입니다. 관리자 계정으로 로그인한 후 접근해 주시기 바랍니다.
            </p>
          </div>
          <div className="pt-2 flex flex-col gap-2.5">
            <Link
              to="/auth/login?redirect=/admin"
              className="w-full py-2.5 px-4 rounded-xl bg-[#102B50] text-white text-xs font-bold hover:bg-[#1A3E6D] transition-colors"
            >
              관리자 계정으로 로그인
            </Link>
            <Link
              to="/"
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              메인 홈페이지로 돌아가기
            </Link>
          </div>
          <p className="text-[11px] text-slate-400">
            * 기본 테스트용 관리자 계정: admin@bizontop.co.kr / admin1234!
          </p>
        </div>
      </div>
    );
  }

  // 2. Guard: If logged in, but not an admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-red-200 p-8 text-center shadow-lg space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center mx-auto text-red-600">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-black text-red-950">접근 권한 제한 (403 Forbidden)</h1>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              현재 로그인하신 계정(<strong>{user?.email}</strong>)은 일반 회원 등급입니다.
              관리자 페이지 및 기업 상담 고객사 데이터에 대한 접근 권한이 제한되어 있습니다.
            </p>
          </div>
          <div className="pt-2 flex flex-col gap-2.5">
            <Link
              to="/member/mypage"
              className="w-full py-2.5 px-4 rounded-xl bg-[#2563EB] text-white text-xs font-bold hover:bg-blue-700 transition-colors"
            >
              나의 상담 신청 현황 (마이페이지) 가기
            </Link>
            <Link
              to="/"
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              메인 홈페이지로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const newConsultCount = consultations.filter(
    (c) => c.status === '접수' || c.status === '상담 대기'
  ).length;

  const TABS = [
    {
      id: 'dashboard' as AdminTab,
      name: '대시보드',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'consultations' as AdminTab,
      name: '상담 신청 관리',
      icon: MessageSquare,
      badge: newConsultCount > 0 ? `${newConsultCount}` : null,
    },
    {
      id: 'members' as AdminTab,
      name: '회원 관리',
      icon: Users,
      badge: null,
    },
    {
      id: 'boards' as AdminTab,
      name: '게시판 관리',
      icon: FileText,
      badge: null,
    },
    {
      id: 'products' as AdminTab,
      name: '상품 관리',
      icon: Package,
      badge: null,
    },
    {
      id: 'settings' as AdminTab,
      name: '홈페이지 설정',
      icon: Settings,
      badge: null,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100/70 font-sans text-slate-900 pb-16">
      {/* 1. Top Admin Bar */}
      <header className="bg-[#102B50] text-white sticky top-0 z-40 shadow-sm border-b border-[#1A3E6D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
              title="메인 홈페이지로 이동"
            >
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <span className="font-extrabold text-sm text-[#D5A64B]">B</span>
                <span className="font-bold text-[10px] text-white">T</span>
              </div>
              <div>
                <span className="font-black text-sm tracking-tight text-white block">
                  BIZ ON TOP
                </span>
                <span className="text-[10px] text-[#D5A64B] font-bold block -mt-0.5">
                  통합 관리자 포털
                </span>
              </div>
            </Link>

            <span className="hidden sm:inline-block text-slate-500 mx-2">|</span>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              보안 관리자 세션 활성화
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors text-xs flex items-center gap-1.5"
              title="데이터 새로고침"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden md:inline">새로고침</span>
            </button>

            <Link
              to="/"
              target="_blank"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors text-xs flex items-center gap-1.5"
              title="홈페이지 새 창 열기"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">사이트 보기</span>
            </Link>

            <div className="h-4 w-px bg-white/20 hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-300 hidden lg:inline">
                {user?.name} 관리자님
              </span>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white text-xs font-bold transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">로그아웃</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 overflow-x-auto no-scrollbar pt-2">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-2 py-3 px-4 text-xs font-bold rounded-t-xl transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-slate-100/70 text-[#102B50] border-[#D5A64B]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5 border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#2563EB]' : 'text-slate-400'}`} />
                  <span>{tab.name}</span>
                  {tab.badge && (
                    <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[10px] font-extrabold animate-pulse">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* 2. Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {currentTab === 'dashboard' && (
          <AdminDashboardTab
            consultations={consultations}
            posts={posts}
            memberCount={memberCount}
            onSelectTab={handleTabChange}
            onSelectConsultation={(item) => {
              setSelectedConsultation(item);
              handleTabChange('consultations');
            }}
          />
        )}

        {currentTab === 'consultations' && (
          <AdminConsultationsTab
            consultations={consultations}
            onRefresh={loadData}
            selectedItem={selectedConsultation}
            onSelectItem={setSelectedConsultation}
          />
        )}

        {currentTab === 'members' && (
          <AdminMembersTab
            members={membersList}
            onRefresh={loadData}
          />
        )}

        {currentTab === 'boards' && (
          <AdminBoardsTab
            posts={posts}
            onRefresh={loadData}
          />
        )}

        {currentTab === 'products' && (
          <AdminProductsTab
            onRefresh={loadData}
          />
        )}

        {currentTab === 'settings' && (
          <AdminSettingsTab
            onRefresh={loadData}
          />
        )}
      </main>
    </div>
  );
};
