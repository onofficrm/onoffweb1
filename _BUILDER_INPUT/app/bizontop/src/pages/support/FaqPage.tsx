import React, { useState } from 'react';
import { HelpCircle, PhoneCall, Search } from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Accordion } from '../../components/ui/Accordion';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Tabs } from '../../components/ui/Tabs';
import { FAQ_DATA } from '../../data/siteData';

interface PageProps {
  onOpenConsultation: () => void;
}

const subNav = [
  { label: '공지사항', href: '/support/notices' },
  { label: '정책자금 소식', href: '/support/news' },
  { label: '기업인증 정보', href: '/support/cert-info' },
  { label: '컨설팅 사례', href: '/support/cases' },
  { label: '자주 묻는 질문', href: '/support/faq', active: true },
  { label: '상담 신청', href: '/support/inquiry' },
];

export const FaqPage: React.FC<PageProps> = ({ onOpenConsultation }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PageLayout
      categoryName="고객센터"
      categoryHref="/support/notices"
      title="자주 묻는 질문 (FAQ)"
      subtitle="정책자금 및 기업인증 관련 궁금하신 사항에 대해 신속하고 명확하게 답변해 드립니다."
      breadcrumbs={[{ label: '자주 묻는 질문' }]}
      subNavigation={subNav}
      onOpenConsultation={onOpenConsultation}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <Input
            placeholder="궁금하신 키워드를 입력해 보세요 (예: 금리, 담보, 벤처인증...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center">
          <Tabs
            variant="pills"
            activeTab={activeCategory}
            onChange={setActiveCategory}
            tabs={[
              { id: 'all', label: '전체 질문' },
              { id: '정책자금', label: '정책자금' },
              { id: '기업인증', label: '기업인증' },
              { id: '경영컨설팅', label: '경영컨설팅' },
              { id: '비용 및 절차', label: '비용 및 절차' },
            ]}
          />
        </div>

        {/* Accordion List */}
        {filteredFaqs.length > 0 ? (
          <Accordion
            items={filteredFaqs.map((faq) => ({
              id: faq.id,
              title: faq.question,
              badge: faq.category,
              children: <p className="leading-relaxed whitespace-pre-line">{faq.answer}</p>,
            }))}
          />
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-500 space-y-2">
            <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="font-semibold text-slate-700">검색 결과가 없습니다.</p>
            <p className="text-xs">원하시는 답변을 찾지 못하셨다면 1:1 무료 상담을 통해 직접 문의해 주세요.</p>
            <div className="pt-2">
              <Button variant="accent" size="sm" onClick={onOpenConsultation}>
                1:1 문의하기
              </Button>
            </div>
          </div>
        )}

        {/* Bottom Help Card */}
        <div className="p-6 bg-blue-50/70 border border-blue-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-1">
            <h4 className="font-bold text-sm text-[#102B50]">
              더 구체적인 우리 기업만의 자금 조건이 궁금하신가요?
            </h4>
            <p className="text-xs text-slate-600">
              전문 컨설턴트가 기업 현황을 사전 분석하여 맞춤 해결책을 제시합니다.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={onOpenConsultation}
            leftIcon={<PhoneCall className="w-4 h-4" />}
          >
            무료 상담 신청하기
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};
