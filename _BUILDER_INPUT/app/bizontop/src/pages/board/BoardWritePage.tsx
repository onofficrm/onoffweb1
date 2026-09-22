import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
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

interface BoardWritePageProps {
  onOpenConsultation: () => void;
}

export const BoardWritePage: React.FC<BoardWritePageProps> = ({ onOpenConsultation }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, isAdmin } = useAuth();

  const defaultType = (searchParams.get('type') as BoardType) || 'notice';

  const [type, setType] = useState<BoardType>(defaultType);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryTag, setCategoryTag] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [isPublic, setIsPublic] = useState(true);

  const [attachments, setAttachments] = useState<BoardAttachment[]>([]);
  const [images, setImages] = useState<BoardImage[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // 이탈 방지 (beforeunload)
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

  // 비회원인 경우 로그인 유도
  if (user.role === 'guest') {
    return (
      <PageLayout
        categoryName="고객센터"
        categoryHref="/board"
        title="글쓰기 권한 안내"
        breadcrumbs={[{ label: '통합 게시판', href: '/board' }, { label: '글쓰기' }]}
        onOpenConsultation={onOpenConsultation}
      >
        <div className="space-y-6 max-w-lg mx-auto">
          <RoleSwitcherBar />

          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#102B50]">
              로그인이 필요한 서비스입니다
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              비즈온탑 게시판에 글을 등록하시려면 회원 로그인이 필요합니다.
              <br />
              상단의 권한 시뮬레이션 바에서 <strong>'관리자'</strong> 또는 <strong>'일반회원'</strong>으로 전환하여 즉시 체험해 보실 수 있습니다.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <Link to="/auth/login">
                <Button variant="primary" size="md">
                  로그인 페이지로 이동
                </Button>
              </Link>
              <Link to="/board">
                <Button variant="outline" size="md">
                  목록으로 돌아가기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  // 관리자 전용 게시판인지 검사
  const isCategoryAdminOnly = BOARD_CATEGORIES[type]?.adminOnlyWrite;
  const canWriteCurrentCategory = boardService.canUserWriteCategory(type, user);

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

  const handleRemoveAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
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

          // 본문에도 이미지 태그 자동 추가
          setContent((prev) => prev + `<p><img src="${imgUrl}" alt="${f.name}" style="max-width:100%; border-radius:8px; margin: 12px 0;" /></p>`);
          setIsDirty(true);
        }
      };
      reader.readAsDataURL(f);
    });
    e.target.value = '';
  };

  const handleRemoveImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    setIsDirty(true);
  };

  // 제출 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!canWriteCurrentCategory) {
      setErrorMessage(`선택하신 [${BOARD_CATEGORIES[type].name}] 게시판은 관리자만 작성할 수 있습니다. 상단에서 관리자로 권한을 전환하시거나 '경영컨설팅' 카테고리를 선택해 주세요.`);
      return;
    }

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
      const result = boardService.createPost(
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
        setErrorMessage(result.error || '게시글 등록에 실패했습니다.');
      }
    }, 300);
  };

  return (
    <PageLayout
      categoryName="고객센터"
      categoryHref="/board"
      title="게시글 작성"
      subtitle="새로운 공지사항, 정책자금 정보, 칼럼 또는 자문 상담글을 등록합니다."
      breadcrumbs={[
        { label: '통합 게시판', href: '/board' },
        { label: '글쓰기' },
      ]}
      onOpenConsultation={onOpenConsultation}
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* 권한 시뮬레이션 및 데이터베이스 상태 바 */}
        <RoleSwitcherBar />

        {/* 에러 메시지 배너 */}
        {errorMessage && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 animate-fadeIn">
            <ShieldAlert className="w-5 h-5 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* 글쓰기 폼 */}
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-[#172033] bg-white focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              >
                {Object.values(BOARD_CATEGORIES).map((cat) => (
                  <option key={cat.type} value={cat.type}>
                    {cat.name} {cat.adminOnlyWrite ? '(관리자 전용)' : '(상담 및 일반)'}
                  </option>
                ))}
              </select>
              {!canWriteCurrentCategory && (
                <p className="text-[11px] text-amber-600 mt-1 font-medium">
                  * 현재 계정은 일반회원이며, 본 카테고리는 관리자만 등록할 수 있습니다. 상단 바에서 '관리자'로 전환해 보세요.
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102B50] mb-1.5">
                세부 태그 / 구분 라벨 (선택)
              </label>
              <Input
                placeholder="예: 필독, 중진공, ISO9001, 융자안내"
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
              {/* 상단 고정 옵션 (관리자만) */}
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
                    상단 공지 고정 (Pin)
                  </span>
                </label>
              )}

              {/* 공개 / 비공개 설정 */}
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
                  비공개 비밀글로 작성 (본인 및 관리자만 열람 가능)
                </span>
              </label>
            </div>

            <div className="text-[11px] text-slate-500">
              작성자: <strong className="text-slate-800 font-bold">{user.name}</strong>
            </div>
          </div>

          {/* 3. 제목 입력 */}
          <div>
            <label className="block text-xs font-bold text-[#102B50] mb-1.5">
              게시글 제목 <span className="text-rose-500">*</span>
            </label>
            <Input
              placeholder="게시글의 핵심 내용을 담은 명확한 제목을 입력하세요."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setIsDirty(true);
              }}
              required
            />
          </div>

          {/* 4. 리치 텍스트 에디터 */}
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
              placeholder="서식 툴바를 활용하여 가독성 높은 본문을 작성하세요. (굵게, 제목, 목록, 인용구, 링크 삽입 지원)"
              minHeight="360px"
            />
          </div>

          {/* 5. 이미지 업로드 & 파일 첨부 섹션 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* 이미지 업로드 */}
            <div className="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#102B50] flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-blue-600" />
                  본문 이미지 첨부
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => imageInputRef.current?.click()}
                  className="text-xs font-semibold py-1 px-2.5 h-auto"
                >
                  이미지 선택
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
                <p className="text-[11px] text-slate-400">
                  JPG, PNG, GIF 이미지 파일을 첨부하면 본문에 자동 삽입됩니다.
                </p>
              )}
            </div>

            {/* 일반 문서 첨부파일 */}
            <div className="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#102B50] flex items-center gap-1.5">
                  <Paperclip className="w-4 h-4 text-blue-600" />
                  일반 파일 첨부
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-semibold py-1 px-2.5 h-auto"
                >
                  파일 선택
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
                <p className="text-[11px] text-slate-400">
                  PDF, HWP, DOCX, XLSX 등 다운로드 가능한 서류 파일을 첨부할 수 있습니다.
                </p>
              )}
            </div>
          </div>

          {/* 6. 저장 및 취소 액션 */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <Link to="/board">
              <Button type="button" variant="outline" size="md">
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                작성 취소
              </Button>
            </Link>

            <div className="flex items-center gap-3">
              <Button
                type="submit"
                variant="accent"
                size="md"
                disabled={isSubmitting}
                className="font-bold px-6 shadow-md"
              >
                {isSubmitting ? (
                  '게시글 등록 중...'
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-1.5" />
                    게시글 등록 완료
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </PageLayout>
  );
};
