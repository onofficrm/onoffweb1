import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  Edit2,
  Eye,
  FileText,
  Lock,
  Paperclip,
  Pin,
  Share2,
  Trash2,
  User,
  ShieldAlert,
  Printer,
} from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { DeleteConfirmModal } from '../../components/board/DeleteConfirmModal';
import { RoleSwitcherBar } from '../../components/board/RoleSwitcherBar';
import { boardService } from '../../services/boardService';
import { BoardPost, BOARD_CATEGORIES } from '../../types/board';
import { sanitizeHtml } from '../../utils/sanitize';
import { useAuth } from '../../context/AuthContext';

interface BoardDetailPageProps {
  onOpenConsultation: () => void;
}

export const BoardDetailPage: React.FC<BoardDetailPageProps> = ({ onOpenConsultation }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  const [post, setPost] = useState<BoardPost | null>(null);
  const [prevPost, setPrevPost] = useState<BoardPost | null>(null);
  const [nextPost, setNextPost] = useState<BoardPost | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [copied, setCopied] = useState(false);

  const viewIncrementedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const currentPost = boardService.getPostById(id);
    if (currentPost) {
      // 조회수 1회 증가
      if (viewIncrementedRef.current !== id) {
        boardService.incrementViews(id);
        currentPost.views += 1;
        viewIncrementedRef.current = id;
      }

      setPost({ ...currentPost });

      // 이전글 / 다음글 탐색
      const adjacent = boardService.getAdjacentPosts(id, currentPost.type, user);
      setPrevPost(adjacent.prevPost);
      setNextPost(adjacent.nextPost);
    } else {
      setPost(null);
    }
  }, [id, user]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDeleteConfirm = () => {
    if (!post) return;
    setIsDeleting(true);

    const result = boardService.deletePost(post.id, user);
    if (result.success) {
      setTimeout(() => {
        setIsDeleting(false);
        setIsDeleteModalOpen(false);
        navigate(`/board?type=${post.type}`);
      }, 400);
    } else {
      setIsDeleting(false);
      alert(result.error || '게시글 삭제에 실패했습니다.');
    }
  };

  if (!post) {
    return (
      <PageLayout
        categoryName="고객센터"
        categoryHref="/board"
        title="게시글을 찾을 수 없습니다"
        breadcrumbs={[{ label: '통합 게시판', href: '/board' }, { label: '오류' }]}
        onOpenConsultation={onOpenConsultation}
      >
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#102B50]">
            요청하신 게시글이 존재하지 않거나 삭제되었습니다.
          </h3>
          <p className="text-xs text-slate-500">
            주소가 잘못 입력되었거나 이미 삭제된 글입니다.
          </p>
          <Link to="/board">
            <Button variant="primary" size="md">
              <ArrowLeft className="w-4 h-4 mr-2" />
              게시판 목록으로 돌아가기
            </Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  // 비공개 글 권한 검사
  const hasViewPermission = boardService.canUserView(post, user);
  if (!hasViewPermission) {
    return (
      <PageLayout
        categoryName="고객센터"
        categoryHref="/board"
        title="비공개 게시글 안내"
        breadcrumbs={[{ label: '통합 게시판', href: '/board' }, { label: '접근 제한' }]}
        onOpenConsultation={onOpenConsultation}
      >
        <div className="space-y-6">
          <RoleSwitcherBar />

          <div className="bg-white rounded-2xl border border-amber-200 p-10 text-center space-y-4 max-w-lg mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto ring-8 ring-amber-50/50">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-[#102B50]">
              비공개 상담 게시글입니다
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              본 게시글은 작성자 본인 및 비즈온탑 관리자만 열람할 수 있도록 비밀글로 설정되어 있습니다.
              <br />
              상단의 <strong>권한 시뮬레이션</strong>에서 <strong>'관리자'</strong> 또는 작성자 계정으로 전환하시면 열람하실 수 있습니다.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <Link to="/board">
                <Button variant="outline" size="md">
                  <ArrowLeft className="w-4 h-4 mr-1.5" />
                  목록으로 이동
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  const categoryConfig = BOARD_CATEGORIES[post.type];
  const canEditOrDelete = boardService.canUserEditOrDelete(post, user);

  return (
    <PageLayout
      categoryName="고객센터"
      categoryHref="/board"
      title={categoryConfig ? categoryConfig.name : '게시글 상세'}
      subtitle={categoryConfig ? categoryConfig.description : undefined}
      breadcrumbs={[
        { label: '통합 게시판', href: '/board' },
        ...(categoryConfig ? [{ label: categoryConfig.name, href: `/board?type=${post.type}` }] : []),
        { label: '게시글 상세' },
      ]}
      onOpenConsultation={onOpenConsultation}
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* 권한 시뮬레이션 및 데이터베이스 상태 바 */}
        <RoleSwitcherBar />

        {/* =========================================================================
            게시글 본체 카드
        ========================================================================= */}
        <article className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Header Area */}
          <div className="p-6 sm:p-8 border-b border-slate-100 space-y-4">
            {/* Badges & Meta */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {post.isPinned && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#D5A64B] text-[#102B50]">
                    <Pin className="w-3.5 h-3.5" />
                    상단고정 공지
                  </span>
                )}
                <Badge variant={post.isPinned ? 'accent' : 'primary'} size="sm">
                  {post.categoryTag || categoryConfig?.name || post.type}
                </Badge>
                {!post.isPublic && (
                  <span className="inline-flex items-center gap-1 text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60 font-semibold">
                    <Lock className="w-3 h-3 text-amber-600" />
                    비공개 비밀글
                  </span>
                )}
              </div>

              {/* Quick actions (Share / Print) */}
              <div className="flex items-center gap-2 text-slate-400">
                <button
                  type="button"
                  onClick={handleShare}
                  className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-700 transition-colors text-xs flex items-center gap-1"
                  title="링크 복사"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">{copied ? '복사됨!' : '공유'}</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-700 transition-colors text-xs flex items-center gap-1"
                  title="인쇄"
                >
                  <Printer className="w-4 h-4" />
                  <span className="hidden sm:inline">인쇄</span>
                </button>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#102B50] leading-tight">
              {post.title}
            </h1>

            {/* Author / Date / Views bar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  {post.authorName}
                  {post.authorRole === 'admin' && (
                    <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-1.5 py-0.2 rounded">
                      운영진
                    </span>
                  )}
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.createdAt}
                </span>
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  조회 {post.views.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Attachments Section (첨부파일) */}
          {post.attachments && post.attachments.length > 0 && (
            <div className="p-4 sm:px-8 bg-slate-50/70 border-b border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold text-[#102B50] mb-2">
                <Paperclip className="w-4 h-4 text-blue-600" />
                <span>첨부파일 ({post.attachments.length}개)</span>
              </div>
              <div className="space-y-1.5">
                {post.attachments.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200 text-xs hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="font-medium text-slate-800 truncate">
                        {file.name}
                      </span>
                      <span className="text-[11px] text-slate-400 shrink-0">
                        ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => alert(`[파일 다운로드 안내]\n"${file.name}" 다운로드를 시작합니다.`)}
                      className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs flex items-center gap-1 transition-colors shrink-0"
                    >
                      <Download className="w-3 h-3" />
                      다운로드
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Body (Sanitized Rich Text) */}
          <div className="p-6 sm:p-8 min-h-[240px]">
            <div
              className="prose prose-slate max-w-none text-[#172033] leading-relaxed break-words"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
            />

            {/* Attached images gallery (if any) */}
            {post.images && post.images.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
                <h4 className="font-bold text-sm text-[#102B50]">
                  첨부 이미지
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {post.images.map((img) => (
                    <div
                      key={img.id}
                      className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50"
                    >
                      <img
                        src={img.url}
                        alt={img.name}
                        className="w-full h-auto object-cover max-h-80"
                      />
                      <div className="p-2 text-center text-[11px] text-slate-500 truncate">
                        {img.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Bar (List / Edit / Delete) */}
          <div className="p-4 sm:px-8 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <Link to={`/board?type=${post.type}`}>
              <Button variant="outline" size="md" className="font-semibold">
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                목록으로
              </Button>
            </Link>

            {/* 수정 및 삭제 버튼: 작성자 본인 또는 관리자만 표시 및 실행 가능 */}
            {canEditOrDelete && (
              <div className="flex items-center gap-2">
                <Link to={`/board/${post.id}/edit`}>
                  <Button variant="outline" size="md" className="font-semibold text-blue-700 border-blue-200 hover:bg-blue-50">
                    <Edit2 className="w-4 h-4 mr-1.5" />
                    수정
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="font-semibold text-rose-600 border-rose-200 hover:bg-rose-50"
                >
                  <Trash2 className="w-4 h-4 mr-1.5" />
                  삭제
                </Button>
              </div>
            )}
          </div>
        </article>

        {/* =========================================================================
            이전글 / 다음글 네비게이션
        ========================================================================= */}
        <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden text-xs sm:text-sm">
          {/* 이전글 */}
          <div className="p-4 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <span className="font-bold text-slate-400 flex items-center gap-1 shrink-0">
                <ChevronLeft className="w-4 h-4" />
                이전글
              </span>
              {prevPost ? (
                <Link
                  to={`/board/${prevPost.id}`}
                  className="font-semibold text-[#102B50] hover:text-blue-600 truncate transition-colors"
                >
                  {prevPost.title}
                </Link>
              ) : (
                <span className="text-slate-400">이전 게시글이 없습니다.</span>
              )}
            </div>
            {prevPost && (
              <span className="text-[11px] text-slate-400 shrink-0 hidden sm:inline">
                {prevPost.createdAt.split(' ')[0]}
              </span>
            )}
          </div>

          {/* 다음글 */}
          <div className="p-4 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <span className="font-bold text-slate-400 flex items-center gap-1 shrink-0">
                다음글
                <ChevronRight className="w-4 h-4" />
              </span>
              {nextPost ? (
                <Link
                  to={`/board/${nextPost.id}`}
                  className="font-semibold text-[#102B50] hover:text-blue-600 truncate transition-colors"
                >
                  {nextPost.title}
                </Link>
              ) : (
                <span className="text-slate-400">다음 게시글이 없습니다.</span>
              )}
            </div>
            {nextPost && (
              <span className="text-[11px] text-slate-400 shrink-0 hidden sm:inline">
                {nextPost.createdAt.split(' ')[0]}
              </span>
            )}
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          title={post.title}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          isDeleting={isDeleting}
        />
      </div>
    </PageLayout>
  );
};
