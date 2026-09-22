import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Users,
  Clock,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  ArrowUpRight,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import { ConsultationItem } from '../../types/auth';
import { BoardPost } from '../../types/board';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

interface AdminDashboardTabProps {
  consultations: ConsultationItem[];
  posts: BoardPost[];
  memberCount: number;
  onSelectTab: (tab: string) => void;
  onSelectConsultation: (item: ConsultationItem) => void;
}

export const AdminDashboardTab: React.FC<AdminDashboardTabProps> = ({
  consultations,
  posts,
  memberCount,
  onSelectTab,
  onSelectConsultation,
}) => {
  // Compute key metrics
  const newConsultations = consultations.filter(
    (c) => c.status === '접수' || c.status === '상담 대기'
  );
  const inProgressConsultations = consultations.filter(
    (c) => c.status === '상담 진행' || c.status === '컨설팅 진행'
  );
  const completedConsultations = consultations.filter(
    (c) => c.status === '계약 완료' || c.status === '종료'
  );

  const recentConsultations = consultations.slice(0, 5);
  const recentPosts = posts.slice(0, 5);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case '접수':
        return <Badge variant="warning">신규 접수</Badge>;
      case '상담 대기':
        return <Badge variant="neutral">상담 대기</Badge>;
      case '상담 진행':
        return <Badge variant="info">상담 진행</Badge>;
      case '계약 완료':
        return <Badge variant="success">계약 완료</Badge>;
      case '컨설팅 진행':
        return <Badge variant="accent">컨설팅 진행</Badge>;
      case '종료':
        return <Badge variant="neutral">상담 종료</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Key Statistics Cards (5 Core Metrics) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Metric 1: 신규 상담 신청 수 */}
        <div className="p-5 rounded-2xl bg-white border border-amber-200/80 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-xs font-bold text-amber-700 block">신규 상담 신청</span>
            <div className="flex items-baseline gap-1 mt-1.5">
              <span className="text-2xl font-black text-amber-600">{newConsultations.length}</span>
              <span className="text-xs text-slate-500 font-medium">건</span>
            </div>
            <span className="text-[11px] text-amber-600/90 font-medium block mt-1">
              미확인 / 배정 대기
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2: 상담 진행 중 건수 */}
        <div className="p-5 rounded-2xl bg-white border border-blue-200/80 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-xs font-bold text-blue-700 block">상담 진행 중</span>
            <div className="flex items-baseline gap-1 mt-1.5">
              <span className="text-2xl font-black text-[#2563EB]">{inProgressConsultations.length}</span>
              <span className="text-xs text-slate-500 font-medium">건</span>
            </div>
            <span className="text-[11px] text-blue-600/90 font-medium block mt-1">
              심사 및 실사 자문 중
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3: 전체 상담 신청 수 */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-xs font-bold text-slate-600 block">전체 상담 신청</span>
            <div className="flex items-baseline gap-1 mt-1.5">
              <span className="text-2xl font-black text-[#102B50]">{consultations.length}</span>
              <span className="text-xs text-slate-500 font-medium">건</span>
            </div>
            <span className="text-[11px] text-emerald-600 font-medium block mt-1">
              완료: {completedConsultations.length}건
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 4: 전체 회원 수 */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-xs font-bold text-slate-600 block">등록 고객사 및 회원</span>
            <div className="flex items-baseline gap-1 mt-1.5">
              <span className="text-2xl font-black text-[#102B50]">{memberCount}</span>
              <span className="text-xs text-slate-500 font-medium">개사</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium block mt-1">
              권한 관리 가능
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 5: 전체 게시글 수 */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-xs font-bold text-slate-600 block">정보 및 게시글 수</span>
            <div className="flex items-baseline gap-1 mt-1.5">
              <span className="text-2xl font-black text-[#102B50]">{posts.length}</span>
              <span className="text-xs text-slate-500 font-medium">편</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium block mt-1">
              고정 공지: {posts.filter((p) => p.isPinned).length}편
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 2. Operational Alert Bar */}
      {newConsultations.length > 0 && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <span className="text-xs font-bold text-amber-900">
              확인이 필요한 신규 상담 신청이 <strong className="text-amber-700">{newConsultations.length}건</strong> 있습니다.
              신속한 사전 자격 심사와 전담 컨설턴트 배정을 진행해 주세요.
            </span>
          </div>
          <Button
            size="sm"
            variant="warning"
            onClick={() => onSelectTab('consultations')}
            className="text-xs font-bold shrink-0 self-start sm:self-auto"
          >
            신규 신청 바로 처리하기
          </Button>
        </div>
      )}

      {/* 3. Dual Columns: Recent Consultations & Recent Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recent Consultations (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-[#102B50] flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#2563EB]" />
                  최근 상담 신청 목록
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  최근 접수된 실시간 상담 신청 내역입니다.
                </p>
              </div>
              <button
                onClick={() => onSelectTab('consultations')}
                className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                전체보기 <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 mt-2">
              {recentConsultations.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-400">
                  접수된 상담 내역이 없습니다.
                </div>
              ) : (
                recentConsultations.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectConsultation(item)}
                    className="py-3.5 flex items-center justify-between hover:bg-slate-50 px-2 rounded-xl transition-colors cursor-pointer group"
                  >
                    <div className="space-y-1 min-w-0 pr-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors truncate">
                          {item.companyName}
                        </span>
                        <span className="text-[11px] text-slate-500 shrink-0">
                          ({item.representativeName})
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono shrink-0">
                          {item.id}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="text-[#2563EB] font-medium shrink-0">
                          {item.categoryName}
                        </span>
                        <span>•</span>
                        <span className="truncate">{item.productName}</span>
                        <span>•</span>
                        <span className="text-[11px] text-slate-400 shrink-0">
                          {item.createdAt.slice(5, 16)}
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0 flex items-center gap-3">
                      {getStatusBadge(item.status)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-slate-100 text-right">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelectTab('consultations')}
              className="text-xs font-bold"
            >
              상담 관리 페이지로 이동
            </Button>
          </div>
        </div>

        {/* Right: Recent Board Posts (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-[#102B50] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-600" />
                  최신 게시글 목록
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  홈페이지에 노출되는 최신 정보 콘텐츠입니다.
                </p>
              </div>
              <button
                onClick={() => onSelectTab('boards')}
                className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                게시판 관리 <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 mt-2">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="py-3 flex items-center justify-between hover:bg-slate-50 px-2 rounded-xl transition-colors"
                >
                  <div className="min-w-0 pr-3 space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      {post.isPinned && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold shrink-0">
                          고정
                        </span>
                      )}
                      <span className="text-xs font-bold text-slate-800 truncate block">
                        {post.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span>{post.authorName}</span>
                      <span>•</span>
                      <span>조회수 {post.views}</span>
                      <span>•</span>
                      <span>{post.createdAt.slice(0, 10)}</span>
                    </div>
                  </div>
                  <Link
                    to={`/board/${post.id}`}
                    target="_blank"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-[#2563EB] hover:bg-slate-100"
                    title="실제 게시글 보기"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              메인페이지와 실시간 연동 중
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelectTab('boards')}
              className="text-xs font-bold"
            >
              새 글 작성하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
