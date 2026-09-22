import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  title,
  onClose,
  onConfirm,
  isDeleting = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-scaleUp">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          disabled={isDeleting}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning Icon */}
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 ring-8 ring-rose-50/50">
          <AlertTriangle className="w-6 h-6" />
        </div>

        {/* Text */}
        <div className="text-center space-y-2 mb-6">
          <h3 className="text-lg font-bold text-[#102B50]">
            게시글 삭제 확인
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            정말로 다음 게시글을 삭제하시겠습니까?
          </p>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 line-clamp-2 text-left">
            "{title}"
          </div>
          <p className="text-[11px] text-rose-600 font-medium">
            * 삭제된 게시글 및 첨부 데이터는 복구할 수 없습니다.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1"
          >
            취소
          </Button>
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 bg-rose-600 hover:bg-rose-700 text-white border-rose-600"
          >
            {isDeleting ? (
              '삭제 처리 중...'
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-1.5" />
                삭제하기
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
