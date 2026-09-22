import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import {
  Bell,
  BookOpen,
  Briefcase,
  FileText,
  HelpCircle,
  PenSquare,
  Search,
  TrendingUp,
  RotateCcw,
} from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Pagination } from '../../components/ui/Pagination';
import { BoardListTable } from '../../components/board/BoardListTable';
import { RoleSwitcherBar } from '../../components/board/RoleSwitcherBar';
import { boardService } from '../../services/boardService';
import { BoardPost, BoardType, BOARD_CATEGORIES } from '../../types/board';
import { useAuth } from '../../context/AuthContext';

interface BoardListPageProps {
  onOpenConsultation: () => void;
}

const CATEGORY_TABS: { type: BoardType | 'all'; label: string; icon: React.ReactNode }[] = [
  { type: 'all', label: '전체보기', icon: <FileText className="w-3.5 h-3.5" /> },
  { type: 'notice', label: '공지사항', icon: <Bell className="w-3.5 h-3.5" /> },
  { type: 'news', label: '정책자금 소식', icon: <FileText className="w-3.5 h-3.5" /> },
  { type: 'cert', label: '기업인증 정보', icon: <BookOpen className="w-3.5 h-3.5" /> },
  { type: 'consulting', label: '경영컨설팅 정보', icon: <Briefcase className="w-3.5 h-3.5" /> },
  { type: 'case', label: '컨설팅 사례', icon: <TrendingUp className="w-3.5 h-3.5" /> },
  { type: 'faq', label: '자주 묻는 질문', icon: <HelpCircle className="w-3.5 h-3.5" /> },
];

export const BoardListPage: React.FC<BoardListPageProps> = ({ onOpenConsultation }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  const currentType = (searchParams.get('type') as BoardType | 'all') || 'all';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const [searchInput, setSearchInput] = useState(searchParams.get('q') || '');
  const [searchKeyword, setSearchKeyword] = useState(searchParams.get('q') || '');

  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // 게시글 로드 함수
  const loadPosts = () => {
    const result = boardService.getPosts({
      type: currentType,
      search: searchKeyword,
      page: currentPage,
      limit: 10,
      user,
    });

    setPosts(result.posts);
    setTotalPages(result.totalPages);
    setTotalCount(result.total);
  };

  useEffect(() => {
    loadPosts();

    const handleUpdate = () => {
      loadPosts();
    };

    window.addEventListener('bizontop_board_updated', handleUpdate);
    return () => {
      window.removeEventListener('bizontop_board_updated', handleUpdate);
    };
  }, [currentType, currentPage, searchKeyword, user]);

  const handleTabChange = (type: BoardType | 'all') => {
    const newParams = new URLSearchParams(searchParams);
    if (type === 'all') {
      newParams.delete('type');
    } else {
      newParams.set('type', type);
    }
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchInput.trim()) {
      newParams.set('q', searchInput.trim());
    } else {
      newParams.delete('q');
    }
    newParams.set('page', '1');
    setSearchParams(newParams);
    setSearchKeyword(searchInput.trim());
  };

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(newPage));
    setSearchParams(newParams);
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  const handleWriteClick = () => {
    if (user.role === 'guest') {
      if (confirm('게시글을 작성하려면 로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?')) {
        navigate('/auth/login');
      }
      return;
    }
    const targetType = currentType !== 'all' ? currentType : 'notice';
    navigate(`/board/write?type=${targetType}`);
  };

  const activeCategoryConfig = currentType !== 'all' ? BOARD_CATEGORIES[currentType as BoardType] : null;

  return (
    <PageLayout
      categoryName="고객센터"
      categoryHref="/board"
      title={activeCategoryConfig ? activeCategoryConfig.name : '통합 게시판'}
      subtitle={
        activeCategoryConfig
          ? activeCategoryConfig.description
          : '비즈온탑의 공지사항, 정책자금 소식, 기업인증 가이드 및 실제 컨설팅 성공 사례를 확인하세요.'
      }
      breadcrumbs={[
        { label: '통합 게시판', href: '/board' },
        ...(activeCategoryConfig ? [{ label: activeCategoryConfig.name }] : []),
      ]}
      onOpenConsultation={onOpenConsultation}
    >
      <div className="space-y-6">
        {/* 권한 시뮬레이션 및 데이터베이스 상태 바 */}
        <RoleSwitcherBar />

        {/* Category Tabs */}
        <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-xs overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 min-w-max">
            {CATEGORY_TABS.map((tab) => {
              const isActive = currentType === tab.type;
              return (
                <button
                  key={tab.type}
                  type="button"
                  onClick={() => handleTabChange(tab.type)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#102B50] text-[#D5A64B] shadow-sm'
                      : 'text-slate-600 hover:text-[#2563EB] hover:bg-slate-50'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Actions Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs text-slate-500 w-full sm:w-auto">
            <span>
              총 <strong className="text-[#102B50] font-bold">{totalCount}</strong>건의 게시글
            </span>
            {searchKeyword && (
              <span className="text-blue-600 font-medium">
                (검색어: "{searchKeyword}")
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <form onSubmit={handleSearchSubmit} className="w-full sm:w-72">
              <Input
                placeholder="제목, 본문, 작성자 검색..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
              />
            </form>

            {/* 글쓰기 버튼 */}
            <Button
              type="button"
              variant="accent"
              size="md"
              onClick={handleWriteClick}
              className="font-bold shrink-0 shadow-xs"
            >
              <PenSquare className="w-4 h-4 mr-1.5" />
              글쓰기
            </Button>
          </div>
        </div>

        {/* 게시글 목록 테이블 (PC: 테이블 / Mobile: 카드) */}
        <BoardListTable posts={posts} />

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="pt-4 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {/* 하단 리셋 도구 (테스트 복원용) */}
        <div className="pt-6 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-400">
          <span>* 비즈온탑 게시판은 XSS 보안 정제 및 권한 관리 시스템이 적용되어 있습니다.</span>
          <button
            type="button"
            onClick={() => {
              if (confirm('게시글 데이터를 초기 샘플 데이터로 복원하시겠습니까?')) {
                boardService.resetToDefault();
                loadPosts();
              }
            }}
            className="hover:text-slate-600 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            샘플 데이터 초기화
          </button>
        </div>
      </div>
    </PageLayout>
  );
};
