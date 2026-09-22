import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Lock,
  Paperclip,
  Pin,
  Save,
  ShieldAlert,
  Upload,
  X,
} from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { RichTextEditor } from '../../components/board/RichTextEditor';
import { RoleSwitcherBar } from '../../components/board/RoleSwitcherBar';
import { boardService } from '../../services/boardService';
import { BoardAttachment, BoardImage, BoardType, BOARD_CATEGORIES } from '../../types/board';
import { useAuth } from '../../context/AuthContext';

interface BoardEditPageProps {
  onOpenConsultation: () => void;
}

export const BoardEditPage: React.FC<BoardEditPageProps> = ({ onOpenConsultation }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  const [type, setType] = useState<BoardType>('notice');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryTag, setCategoryTag] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [isPublic, setIsPublic] = useState(true);

  const [attachments, setAttachments] = useState<BoardAttachment[]>([]);
  const [images, setImages] = useState<BoardImage[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const [hasPermission, setHasPermission] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!id) return;

    const existingPost = boardService.getPostById(id);
    if (!existingPost) {
      setErrorMessage('수정하려는 게시글이 존재하지 않습니다.');
      setIsLoading(false);
      return;
    }

    // 권한 검사
    const canEdit = boardService.canUserEditOrDelete(existingPost, user);
    if (!canEdit) {
      setHasPermission(false);
      setIsLoading(false);
      return;
    }

    // 기존 데이터 로드
    setType(existingPost.type);
    setTitle(existingPost.title);
    setContent(existingPost.content);
    setCategoryTag(existingPost.categoryTag || '');
    setIsPinned(existingPost.isPinned);
    setIsPublic(existingPost.isPublic);
    setAttachments(existingPost.attachments || []);
    setImages(existingPost.images || []);
    setHasPermission(true);
    setIsLoading(false);
  }, [id, user]);

  // 이탈 방지
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty && !isSubmitting) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty, isSubmitting]);

  // 파일 첨부 핸들러
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newAttachments: BoardAttachment[] = Array.from(files).map((f) => ({
      id: `att-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: f.name,
      size: f.size,
      type: f.type || 'application/octet-stream',
      url: URL.createObjectURL(f),
    }));

    setAttachments((prev) => [...prev, ...newAttachments]);
    setIsDirty(true);
    e.target.value = '';
  };

  const handleRemoveAttachment = (attId: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== attId));
    setIsDirty(true);
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((f) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const imgUrl = event.target.result as string;
          const newImg: BoardImage = {
            id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            name: f.name,
            url: imgUrl,
            size: f.size,
          };
          setImages((prev) => [...prev, newImg]);
          setContent((prev) => prev + `<p><img src="${imgUrl}" alt="${f.name}" style="max-width:100%; border-radius:8px; margin: 12px 0;" /></p>`);
          setIsDirty(true);
        }
      };
      reader.readAsDataURL(f);
    });
    e.target.value = '';
  };

  const handleRemoveImage = (imgId: string) => {
    setImages((prev) => prev.filter((img) => img.id !== imgId));
    setIsDirty(true);
  };

  // 저장 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setErrorMessage('');

    if (!title.trim()) {
      setErrorMessage('게시글 제목을 입력해 주세요.');
      return;
    }

    const strippedContent = content.replace(/<[^>]*>?/gm, '').trim();
    if (!strippedContent && images.length === 0) {
      setErrorMessage('게시글 본문 내용을 입력해 주세요.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const result = boardService.updatePost(
        id,
        {
          type,
          title: title.trim(),
          content,
          isPinned: isAdmin ? isPinned : false,
          isPublic,
          categoryTag: categoryTag.trim() || undefined,
          attachments,
          images,
        },
        user
      );

      if (result.success && result.post) {
        setIsDirty(false);
        navigate(`/board/${result.post.id}`);
      } else {
        setIsSubmitting(false);
        setErrorMessage(result.error || '게시글 수정에 실패했습니다.');
      }
    }, 300);
  };

  if (isLoading) {
    return (
      <PageLayout
        categoryName="고객센터"
        categoryHref="/board"
        title="게시글 불러오는 중..."
        onOpenConsultation={onOpenConsultation}
      >
        <div className="py-20 text-center text-slate-500">데이터를 불러오는 중입니다...</div>
      </PageLayout>
    );
  }

  if (!hasPermission) {
    return (
      <PageLayout
        categoryName="고객센터"
        categoryHref="/board"
        title="수정 권한 없음"
        breadcrumbs={[{ label: '통합 게시판', href: '/board' }, { label: '오류' }]}
        onOpenConsultation={onOpenConsultation}
      >
        <div className="space-y-6 max-w-lg mx-auto">
          <RoleSwitcherBar />

          <div className="bg-white rounded-2xl border border-rose-200 p-8 text-center space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#102B50]">
              게시글 수정 권한이 없습니다
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              본 게시글은 작성자 본인 또는 관리자만 수정할 수 있습니다.
              <br />
              상단의 권한 시뮬레이션 바에서 <strong>'관리자'</strong>로 전환하여 수정 권한을 즉시 획득할 수 있습니다.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <Link to={`/board/${id}`}>
                <Button variant="outline" size="md">
                  상세페이지로 돌아가기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      categoryName="고객센터"
      categoryHref="/board"
      title="게시글 수정"
      subtitle="등록된 게시글의 내용, 카테고리 및 첨부파일을 갱신합니다."
      breadcrumbs={[
        { label: '통합 게시판', href: '/board' },
        { label: '게시글 수정' },
      ]}
      onOpenConsultation={onOpenConsultation}
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        <RoleSwitcherBar />

        {errorMessage && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 animate-fadeIn">
            <ShieldAlert className="w-5 h-5 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          {/* 1. 카테고리 및 공개 설정 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#102B50] mb-1.5">
                게시판 분류 <span className="text-rose-500">*</span>
              </label>
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value as BoardType);
                  setIsDirty(true);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-[#172033] bg-white focus:outline-hidden focus:border-blue-600"
              >
                {Object.values(BOARD_CATEGORIES).map((cat) => (
                  <option key={cat.type} value={cat.type}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102B50] mb-1.5">
                세부 태그 / 구분 라벨 (선택)
              </label>
              <Input
                placeholder="예: 필독, 중진공, ISO9001"
                value={categoryTag}
                onChange={(e) => {
                  setCategoryTag(e.target.value);
                  setIsDirty(true);
                }}
              />
            </div>
          </div>

          {/* 2. 관리자/공개 옵션 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6">
              {isAdmin && (
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isPinned}
                    onChange={(e) => {
                      setIsPinned(e.target.checked);
                      setIsDirty(true);
                    }}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                  />
                  <span className="text-xs font-bold text-[#102B50] flex items-center gap-1">
                    <Pin className="w-3.5 h-3.5 text-[#D5A64B]" />
                    상단 공지 고정
                  </span>
                </label>
              )}

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={!isPublic}
                  onChange={(e) => {
                    setIsPublic(!e.target.checked);
                    setIsDirty(true);
                  }}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                />
                <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  비공개 비밀글 (본인 및 관리자만 열람)
                </span>
              </label>
            </div>

            <div className="text-[11px] text-slate-500">
              수정 권한자: <strong className="text-slate-800 font-bold">{user.name}</strong>
            </div>
          </div>

          {/* 3. 제목 */}
          <div>
            <label className="block text-xs font-bold text-[#102B50] mb-1.5">
              게시글 제목 <span className="text-rose-500">*</span>
            </label>
            <Input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setIsDirty(true);
              }}
              required
            />
          </div>

          {/* 4. 리치 에디터 */}
          <div>
            <label className="block text-xs font-bold text-[#102B50] mb-1.5">
              게시글 본문 내용 <span className="text-rose-500">*</span>
            </label>
            <RichTextEditor
              value={content}
              onChange={(val) => {
                setContent(val);
                setIsDirty(true);
              }}
              minHeight="360px"
            />
          </div>

          {/* 5. 이미지 & 첨부파일 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* 이미지 */}
            <div className="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#102B50] flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-blue-600" />
                  첨부 이미지
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => imageInputRef.current?.click()}
                  className="text-xs font-semibold py-1 px-2.5 h-auto"
                >
                  추가 선택
                </Button>
                <input
                  type="file"
                  ref={imageInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
              </div>

              {images.length > 0 ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {images.map((img) => (
                    <div
                      key={img.id}
                      className="relative group w-16 h-16 rounded-lg overflow-hidden border border-slate-200"
                    >
                      <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(img.id)}
                        className="absolute top-1 right-1 p-0.5 bg-slate-900/70 text-white rounded hover:bg-rose-600 transition-colors"
                        title="이미지 삭제"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] text-slate-400">첨부된 이미지가 없습니다.</p>
              )}
            </div>

            {/* 일반 파일 */}
            <div className="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#102B50] flex items-center gap-1.5">
                  <Paperclip className="w-4 h-4 text-blue-600" />
                  첨부 파일
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-semibold py-1 px-2.5 h-auto"
                >
                  파일 추가
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  multiple
                  className="hidden"
                />
              </div>

              {attachments.length > 0 ? (
                <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                  {attachments.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-1.5 px-2 bg-white rounded border border-slate-200 text-xs"
                    >
                      <span className="truncate max-w-[200px] text-slate-700 font-medium">
                        {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveAttachment(file.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] text-slate-400">첨부된 파일이 없습니다.</p>
              )}
            </div>
          </div>

          {/* 6. 저장 및 취소 액션 */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <Link to={`/board/${id}`}>
              <Button type="button" variant="outline" size="md">
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                수정 취소
              </Button>
            </Link>

            <Button
              type="submit"
              variant="accent"
              size="md"
              disabled={isSubmitting}
              className="font-bold px-6 shadow-md"
            >
              {isSubmitting ? (
                '수정사항 저장 중...'
              ) : (
                <>
                  <Save className="w-4 h-4 mr-1.5" />
                  수정사항 저장 완료
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
};
