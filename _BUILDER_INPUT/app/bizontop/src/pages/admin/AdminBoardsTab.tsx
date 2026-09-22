import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Search,
  Pin,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Clock,
  Tag,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { BoardPost, BoardType } from '../../types/board';
import { boardService } from '../../services/boardService';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';

interface AdminBoardsTabProps {
  posts: BoardPost[];
  onRefresh: () => void;
}

const CATEGORY_NAMES: Record<BoardType, string> = {
  notice: '공지사항',
  news: '정책자금 소식',
  cert: '기업인증 정보',
  consulting: '경영컨설팅 정보',
  case: '컨설팅 성공사례',
  faq: '자주 묻는 질문',
};

export const AdminBoardsTab: React.FC<AdminBoardsTabProps> = ({
  posts,
  onRefresh,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  // Form states
  const [formType, setFormType] = useState<BoardType>('notice');
  const [formTitle, setFormTitle] = useState('');
  const [formCategoryTag, setFormCategoryTag] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formIsPinned, setFormIsPinned] = useState(false);
  const [formIsPublic, setFormIsPublic] = useState(true);
  const [formError, setFormError] = useState('');

  const handleOpenCreate = () => {
    setEditingPostId(null);
    setFormType('notice');
    setFormTitle('');
    setFormCategoryTag('');
    setFormContent('');
    setFormIsPinned(false);
    setFormIsPublic(true);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (post: BoardPost) => {
    setEditingPostId(post.id);
    setFormType(post.type);
    setFormTitle(post.title);
    setFormCategoryTag(post.categoryTag || '');
    setFormContent(post.content);
    setFormIsPinned(post.isPinned);
    setFormIsPublic(post.isPublic);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSavePost = () => {
    if (!formTitle.trim()) {
      setFormError('게시글 제목을 입력해 주세요.');
      return;
    }
    if (!formContent.trim()) {
      setFormError('게시글 본문 내용을 입력해 주세요.');
      return;
    }

    if (editingPostId) {
      // Update
      const res = boardService.updatePost(editingPostId, {
        type: formType,
        title: formTitle,
        content: formContent,
        categoryTag: formCategoryTag,
        isPinned: formIsPinned,
        isPublic: formIsPublic,
      });
      if (!res.success) {
        setFormError(res.error || '게시글 수정에 실패했습니다.');
        return;
      }
    } else {
      // Create
      const res = boardService.createPost({
        type: formType,
        title: formTitle,
        content: formContent,
        categoryTag: formCategoryTag,
        isPinned: formIsPinned,
        isPublic: formIsPublic,
      });
      if (!res.success) {
        setFormError(res.error || '게시글 생성에 실패했습니다.');
        return;
      }
    }

    setIsModalOpen(false);
    onRefresh();
  };

  const handleDeletePost = (id: string, title: string) => {
    if (window.confirm(`'${title}' 게시글을 삭제하시겠습니까?`)) {
      boardService.deletePost(id);
      onRefresh();
    }
  };

  const handleTogglePin = (post: BoardPost) => {
    boardService.updatePost(post.id, { isPinned: !post.isPinned });
    onRefresh();
  };

  const handleTogglePublic = (post: BoardPost) => {
    boardService.updatePost(post.id, { isPublic: !post.isPublic });
    onRefresh();
  };

  const filteredPosts = posts.filter((p) => {
    const matchType = selectedType === 'all' || p.type === selectedType;
    const s = searchTerm.trim().toLowerCase();
    const matchSearch =
      !s ||
      p.title.toLowerCase().includes(s) ||
      (p.categoryTag && p.categoryTag.toLowerCase().includes(s)) ||
      p.authorName.toLowerCase().includes(s);
    return matchType && matchSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-[#102B50] flex items-center gap-2">
            <span>게시판 및 콘텐츠 관리</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-bold">
              총 {filteredPosts.length}건
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            공지사항, 정책자금 소식, 기업인증 정보, 경영사례 등 공식 게시글을 등록·수정·배포합니다.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenCreate}
          className="text-xs font-bold shrink-0 self-start sm:self-auto"
          leftIcon={<Plus className="w-3.5 h-3.5" />}
        >
          새 게시글 등록
        </Button>
      </div>

      {/* 2. Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="제목, 분류 태그, 작성자 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#2563EB]"
          />
        </div>

        <div className="sm:col-span-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            aria-label="게시판 카테고리 필터"
            className="w-full py-2 px-3 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#2563EB] bg-white text-slate-700"
          >
            <option value="all">전체 게시판</option>
            {Object.entries(CATEGORY_NAMES).map(([key, name]) => (
              <option key={key} value={key}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Posts Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold">
                <th className="py-3 px-4 w-12 text-center">고정</th>
                <th className="py-3 px-4 w-28">게시판 분류</th>
                <th className="py-3 px-4">제목</th>
                <th className="py-3 px-4">작성자</th>
                <th className="py-3 px-4">등록일시</th>
                <th className="py-3 px-4 text-center">조회수</th>
                <th className="py-3 px-4 text-center">공개 여부</th>
                <th className="py-3 px-4 text-center">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    등록된 게시글이 없습니다.
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Pin Toggle */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleTogglePin(post)}
                        className={`p-1 rounded-md transition-colors ${
                          post.isPinned
                            ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                            : 'text-slate-300 hover:text-slate-500 hover:bg-slate-100'
                        }`}
                        title={post.isPinned ? '상단 고정 해제' : '상단 고정 설정'}
                      >
                        <Pin className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-700 block">
                        {CATEGORY_NAMES[post.type] || post.type}
                      </span>
                      {post.categoryTag && (
                        <span className="text-[10px] text-blue-600 font-medium">
                          #{post.categoryTag}
                        </span>
                      )}
                    </td>

                    {/* Title */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900 line-clamp-1">
                          {post.title}
                        </span>
                        <Link
                          to={`/board/${post.id}`}
                          target="_blank"
                          className="text-slate-400 hover:text-[#2563EB] shrink-0"
                          title="새 창에서 원본 보기"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </td>

                    {/* Author */}
                    <td className="py-3.5 px-4 text-slate-600">{post.authorName}</td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                      {post.createdAt.slice(0, 16)}
                    </td>

                    {/* Views */}
                    <td className="py-3.5 px-4 text-center text-slate-500 font-mono">
                      {post.views}
                    </td>

                    {/* Public Toggle */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleTogglePublic(post)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold transition-colors ${
                          post.isPublic
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        {post.isPublic ? (
                          <>
                            <Eye className="w-3 h-3" /> 공개
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" /> 비공개
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(post)}
                          className="p-1.5 text-slate-600 hover:text-[#2563EB] hover:bg-slate-100 rounded-md transition-colors"
                          title="게시글 수정"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePost(post.id, post.title)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="게시글 삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Post Create / Edit Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingPostId ? '게시글 수정' : '새 정보 게시글 등록'}
          subtitle="홈페이지 공지 및 정보 게시판에 실시간으로 게시될 콘텐츠를 작성합니다."
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs">
            {formError && (
              <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">게시판 선택</label>
                <select
                  value={formType}
                  onChange={(e) => setFormType(e.target.value as BoardType)}
                  aria-label="게시판 선택"
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB] bg-white font-bold text-[#102B50]"
                >
                  {Object.entries(CATEGORY_NAMES).map(([key, name]) => (
                    <option key={key} value={key}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">분류 태그 (선택)</label>
                <input
                  type="text"
                  placeholder="예: 공고안내, 세제혜택, R&D"
                  value={formCategoryTag}
                  onChange={(e) => setFormCategoryTag(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">게시글 제목 *</label>
              <input
                type="text"
                placeholder="제목을 명확하고 신뢰감 있게 입력하세요"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB] font-bold text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">
                게시글 본문 내용 (HTML/텍스트 지원) *
              </label>
              <textarea
                rows={8}
                placeholder="게시글 본문 내용을 입력해 주세요. 문단 구분과 주요 안내 사항을 상세히 기재합니다."
                value={formContent}
                onChange={(e) => setFormContent(e.target.value)}
                className="w-full p-3 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB] font-mono text-xs leading-relaxed"
              />
            </div>

            {/* Options: Pin & Public */}
            <div className="flex flex-wrap items-center gap-6 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formIsPinned}
                  onChange={(e) => setFormIsPinned(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <span className="font-bold text-slate-700 flex items-center gap-1">
                  <Pin className="w-3.5 h-3.5 text-amber-600" />
                  목록 상단에 중요 공지로 고정 (isPinned)
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formIsPublic}
                  onChange={(e) => setFormIsPublic(e.target.checked)}
                  className="rounded text-[#2563EB] focus:ring-[#2563EB]"
                />
                <span className="font-bold text-slate-700 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-[#2563EB]" />
                  홈페이지에 즉시 공개 배포 (isPublic)
                </span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
              <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                취소
              </Button>
              <Button variant="primary" size="sm" onClick={handleSavePost} className="font-bold">
                {editingPostId ? '수정 내용 저장' : '새 게시글 등록하기'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
