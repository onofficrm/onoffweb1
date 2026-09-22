import React, { useState } from 'react';
import { Award, CheckCircle2, Search, TrendingUp } from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { Tabs } from '../../components/ui/Tabs';
import { SUCCESS_CASES } from '../../data/siteData';

interface PageProps {
  onOpenConsultation: () => void;
}

const subNav = [
  { label: '공지사항', href: '/support/notices' },
  { label: '정책자금 소식', href: '/support/news' },
  { label: '기업인증 정보', href: '/support/cert-info' },
  { label: '컨설팅 사례', href: '/support/cases', active: true },
  { label: '자주 묻는 질문', href: '/support/faq' },
  { label: '상담 신청', href: '/support/inquiry' },
];

export const CasesPage: React.FC<PageProps> = ({ onOpenConsultation }) => {
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredCases = SUCCESS_CASES.filter((item) => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'funding') return item.serviceCategory.includes('자금');
    if (filterCategory === 'cert') return item.serviceCategory.includes('인증') || item.serviceCategory.includes('연구소');
    return true;
  });

  return (
    <PageLayout
      categoryName="고객센터"
      categoryHref="/support/notices"
      title="컨설팅 사례"
      subtitle="제조업, IT, 유통업 등 다양한 산업군에서 검증된 비즈온탑의 실제 성공 사례를 소개합니다."
      breadcrumbs={[{ label: '컨설팅 사례' }]}
      subNavigation={subNav}
      onOpenConsultation={onOpenConsultation}
    >
      <div className="space-y-8">
        {/* Category Tabs */}
        <div className="flex justify-center">
          <Tabs
            variant="pills"
            activeTab={filterCategory}
            onChange={setFilterCategory}
            tabs={[
              { id: 'all', label: '전체 성공 사례', count: SUCCESS_CASES.length },
              { id: 'funding', label: '정책자금 조달 사례' },
              { id: 'cert', label: '기업인증 & 절세 사례' },
            ]}
          />
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCases.map((item) => (
            <Card key={item.id} hoverEffect className="border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-semibold text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded">
                    {item.industry}
                  </span>
                  <span className="text-xs font-bold text-[#D5A64B] bg-amber-50 px-2 py-0.5 rounded">
                    소요 기간: {item.period}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#102B50] mb-1">
                  {item.companyName}
                </h3>
                <span className="text-xs text-slate-500 font-medium block mb-3">
                  지원 분야: {item.serviceCategory}
                </span>

                <div className="p-3.5 bg-gradient-to-r from-blue-50/70 to-slate-50 border border-blue-100 rounded-xl mb-4">
                  <span className="text-xs font-bold text-[#102B50] block mb-1">
                    🏆 달성 성과
                  </span>
                  <span className="text-sm font-extrabold text-[#2563EB]">
                    {item.achievement}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  {item.summary}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="neutral" size="sm">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};
