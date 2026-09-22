import React, { useState } from 'react';
import { ExternalLink, FileText, Search } from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { NEWS_DATA } from '../../data/siteData';

interface PageProps {
  onOpenConsultation: () => void;
}

const subNav = [
  { label: '공지사항', href: '/support/notices' },
  { label: '정책자금 소식', href: '/support/news', active: true },
  { label: '기업인증 정보', href: '/support/cert-info' },
  { label: '컨설팅 사례', href: '/support/cases' },
  { label: '자주 묻는 질문', href: '/support/faq' },
  { label: '상담 신청', href: '/support/inquiry' },
];

export const NewsPage: React.FC<PageProps> = ({ onOpenConsultation }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = NEWS_DATA.filter((n) =>
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageLayout
      categoryName="고객센터"
      categoryHref="/support/notices"
      title="정책자금 소식"
      subtitle="정부 부처 및 각 정책금융기관의 최신 융자·보증 공고 및 제도 변경 소식을 안내합니다."
      breadcrumbs={[{ label: '정책자금 소식' }]}
      subNavigation={subNav}
      onOpenConsultation={onOpenConsultation}
    >
      <div className="space-y-8">
        {/* Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-xs text-slate-500">
            총 <strong>{filtered.length}</strong>건의 정책자금 뉴스가 등록되어 있습니다.
          </span>
          <div className="w-full sm:w-72">
            <Input
              placeholder="뉴스 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((news) => (
            <Card key={news.id} hoverEffect className="border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant="sub" size="sm">
                    {news.badge}
                  </Badge>
                  <span className="text-xs text-slate-400">{news.date}</span>
                </div>
                <h3 className="font-bold text-base text-[#102B50] mb-2 leading-snug">
                  {news.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {news.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>출처: {news.source}</span>
                <span className="text-[#2563EB] font-medium">대상: {news.target}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};
