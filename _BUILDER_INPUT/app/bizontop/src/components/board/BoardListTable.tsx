import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Eye,
  FileText,
  Lock,
  Paperclip,
  Pin,
  User,
} from 'lucide-react';
import { BoardPost, BOARD_CATEGORIES } from '../../types/board';
import { Badge } from '../ui/Badge';

interface BoardListTableProps {
  posts: BoardPost[];
  onOpenConsultation?: () => void;
}

export const BoardListTable: React.FC<BoardListTableProps> = ({ posts }) => {
  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <FileText className="w-6 h-6" />
        </div>
        <h4 className="font-bold text-slate-700 text-base">
          등록된 게시글이 없습니다.
        </h4>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          선택한 카테고리에 조건에 맞는 게시글이 없거나 검색 결과가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
      {/* =========================================================================
          PC 뷰: 테이블형 목록 (md 이상)
      ========================================================================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <th scope="col" className="py-3.5 px-4 text-center w-16">
                번호
              </th>
              <th scope="col" className="py-3.5 px-4 w-28">
                구분
              </th>
              <th scope="col" className="py-3.5 px-4 min-w-[300px]">
                제목
              </th>
              <th scope="col" className="py-3.5 px-4 text-center w-28">
                작성자
              </th>
              <th scope="col" className="py-3.5 px-4 text-center w-28">
                등록일
              </th>
              <th scope="col" className="py-3.5 px-4 text-center w-20">
                조회수
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {posts.map((post, idx) => {
              const categoryConfig = BOARD_CATEGORIES[post.type];
              const isPinned = post.isPinned;
              const formattedDate = post.createdAt.split(' ')[0];

              return (
                <tr
                  key={post.id}
                  className={`group transition-colors duration-150 hover:bg-blue-50/40 cursor-pointer ${
                    isPinned ? 'bg-amber-50/30 font-medium' : 'bg-white'
                  }`}
                >
                  {/* 번호 / 핀 */}
                  <td className="py-4 px-4 text-center text-slate-400">
                    {isPinned ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold text-[11px]" title="상단 고정 공지">
                        <Pin className="w-3.5 h-3.5 rotate-45" />
                      </span>
                    ) : (
                      <span className="text-slate-400 font-normal">
                        {posts.length - idx}
                      </span>
                    )}
                  </td>

                  {/* 카테고리 배지 */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                        isPinned
                          ? 'bg-[#102B50] text-[#D5A64B]'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {post.categoryTag || categoryConfig?.name || post.type}
                    </span>
                  </td>

                  {/* 제목 */}
                  <td className="py-4 px-4">
                    <Link
                      to={`/board/${post.id}`}
                      className="flex items-center gap-2 group-hover:text-[#2563EB] transition-colors"
                    >
                      {!post.isPublic && (
                        <span className="inline-flex items-center text-slate-400 shrink-0" title="비밀글 / 비공개">
                          <Lock className="w-3.5 h-3.5 text-amber-600" />
                        </span>
                      )}
                      <span className="font-semibold text-sm text-[#172033] group-hover:text-[#2563EB] line-clamp-1 transition-colors">
                        {post.title}
                      </span>
                      {post.attachments && post.attachments.length > 0 && (
                        <span title="첨부파일 있음" className="inline-flex items-center">
                          <Paperclip className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        </span>
                      )}
                    </Link>
                  </td>

                  {/* 작성자 */}
                  <td className="py-4 px-4 text-center text-slate-600 whitespace-nowrap">
                    <span className="inline-block max-w-[100px] truncate text-xs">
                      {post.authorName}
                    </span>
                  </td>

                  {/* 등록일 */}
                  <td className="py-4 px-4 text-center text-slate-400 whitespace-nowrap text-xs">
                    {formattedDate}
                  </td>

                  {/* 조회수 */}
                  <td className="py-4 px-4 text-center text-slate-400 whitespace-nowrap text-xs">
                    {post.views.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* =========================================================================
          모바일 뷰: 카드형 목록 (md 미만)
      ========================================================================= */}
      <div className="block md:hidden divide-y divide-slate-100">
        {posts.map((post) => {
          const categoryConfig = BOARD_CATEGORIES[post.type];
          const isPinned = post.isPinned;
          const formattedDate = post.createdAt.split(' ')[0];

          return (
            <Link
              key={post.id}
              to={`/board/${post.id}`}
              className={`block p-4 transition-colors active:bg-slate-100 ${
                isPinned ? 'bg-amber-50/40' : 'bg-white'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {isPinned && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500 text-white font-bold text-[10px]">
                        <Pin className="w-3 h-3" />
                        공지
                      </span>
                    )}
                    <Badge variant={isPinned ? 'accent' : 'neutral'} size="sm">
                      {post.categoryTag || categoryConfig?.name || post.type}
                    </Badge>
                    {!post.isPublic && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                        <Lock className="w-3 h-3 text-amber-600" />
                        비공개
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 shrink-0">
                    {formattedDate}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-[#172033] leading-snug line-clamp-2">
                  {post.title}
                </h4>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3 text-slate-400" />
                    {post.authorName}
                  </span>
                  <div className="flex items-center gap-3">
                    {post.attachments && post.attachments.length > 0 && (
                      <span className="flex items-center gap-0.5 text-slate-400">
                        <Paperclip className="w-3 h-3" />
                        {post.attachments.length}
                      </span>
                    )}
                    <span className="flex items-center gap-0.5 text-slate-400">
                      <Eye className="w-3 h-3" />
                      {post.views}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
