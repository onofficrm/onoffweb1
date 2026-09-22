import React, { useState } from 'react';
import { ChevronDown, Eye, FileText, Search } from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Pagination } from '../../components/ui/Pagination';
import { NOTICES_DATA } from '../../data/siteData';
import { NoticeItem } from '../../types';

interface PageProps {
  onOpenConsultation: () => void;
}

const subNav = [
  { label: '공지사항', href: '/support/notices', active: true },
  { label: '정책자금 소식', href: '/support/news' },
  { label: '기업인증 정보', href: '/support/cert-info' },
  { label: '컨설팅 사례', href: '/support/cases' },
  { label: '자주 묻는 질문', href: '/support/faq' },
  { label: '상담 신청', href: '/support/inquiry' },
];

export const NoticesPage: React.FC<PageProps> = ({ onOpenConsultation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = NOTICES_DATA.filter((n) =>
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageLayout
      categoryName="고객센터"
      categoryHref="/support/notices"
      title="공지사항"
      subtitle="비즈온탑의 주요 안내 및 정책자금·기업인증 공식 공지사항을 확인하세요."
      breadcrumbs={[{ label: '공지사항' }]}
      subNavigation={subNav}
      onOpenConsultation={onOpenConsultation}
    >
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-xs text-slate-500">
            총 <strong>{filtered.length}</strong>건의 공지사항이 등록되어 있습니다.
          </span>
          <div className="w-full sm:w-72">
            <Input
              placeholder="검색어 입력..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
        </div>

        {/* Notice List */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="divide-y divide-slate-100">
            {filtered.map((item) => {
              const isOpened = selectedNotice?.id === item.id;
              return (
                <div key={item.id} className="transition-colors">
                  <button
                    type="button"
                    onClick={() => setSelectedNotice(isOpened ? null : item)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Badge
                        variant={item.isImportant ? 'accent' : 'neutral'}
                        size="sm"
                      >
                        {item.category}
                      </Badge>
                      <h4 className="font-semibold text-sm sm:text-base text-[#172033] truncate">
                        {item.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-400 shrink-0">
                      <span className="hidden sm:inline">{item.date}</span>
                      <span className="hidden md:flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {item.views}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                          isOpened ? 'rotate-180 text-[#2563EB]' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {isOpened && (
                    <div className="p-6 bg-[#F8FAFC] border-t border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-200">
                        <span>작성자: {item.author}</span>
                        <span>등록일: {item.date} | 조회수: {item.views}</span>
                      </div>
                      <p className="whitespace-pre-line">{item.content}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={1}
          onPageChange={setCurrentPage}
          className="pt-4"
        />
      </div>
    </PageLayout>
  );
};
