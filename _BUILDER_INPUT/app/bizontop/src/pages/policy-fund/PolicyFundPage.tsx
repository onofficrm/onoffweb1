import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  Coins,
  FileCheck2,
  FileText,
  PhoneCall,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Accordion } from '../../components/ui/Accordion';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { SERVICE_DETAILS } from '../../data/siteData';

interface PolicyFundPageProps {
  onOpenConsultation: () => void;
}

const subNavItems = [
  { id: 'small-business', label: '소상공인 정책자금', href: '/policy-fund/small-business' },
  { id: 'sme', label: '중소기업 정책자금', href: '/policy-fund/sme' },
  { id: 'startup', label: '창업기업 정책자금', href: '/policy-fund/startup' },
  { id: 'working-capital', label: '운전자금', href: '/policy-fund/working-capital' },
  { id: 'facility-capital', label: '시설자금', href: '/policy-fund/facility-capital' },
];

export const PolicyFundPage: React.FC<PolicyFundPageProps> = ({ onOpenConsultation }) => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const activeId = serviceId || 'small-business';
  const detail = SERVICE_DETAILS[activeId] || SERVICE_DETAILS['small-business'];

  const subNav = subNavItems.map((item) => ({
    ...item,
    active: item.id === activeId,
  }));

  return (
    <PageLayout
      categoryName="정책자금"
      categoryHref="/policy-fund/small-business"
      title={detail.title}
      subtitle={detail.subtitle}
      breadcrumbs={[{ label: detail.title }]}
      subNavigation={subNav}
      onOpenConsultation={onOpenConsultation}
    >
      <div className="space-y-14">
        {/* Top Summary Banner */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-xs">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="sub" size="sm">
                맞춤형 정부 융자 트랙
              </Badge>
              <span className="text-xs text-slate-500 font-medium">
                평균 금리 2~3%대 | 거치 기간 최대 5년
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102B50]">
              {detail.title} 핵심 개요
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              {detail.summary}
            </p>
          </div>
        </div>

        {/* 3 Core Benefits */}
        <div>
          <div className="mb-6">
            <span className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
              KEY ADVANTAGES
            </span>
            <h3 className="text-xl font-bold text-[#102B50] mt-1">
              비즈온탑 자금 조달의 핵심 특장점
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {detail.benefits.map((benefit, idx) => (
              <Card key={idx} hoverEffect className="border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-4">
                  <Coins className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-[#102B50] mb-2">
                  {benefit.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Target Audience Checklist & Required Documents */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Target Audience */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-[#2563EB]" />
              <h4 className="text-base font-bold text-[#102B50]">주요 신청 대상 및 적합 기업</h4>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              {detail.targetAudience.map((target, idx) => (
                <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-[#2563EB] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{target}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Required Documents */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-[#D5A64B]" />
              <h4 className="text-base font-bold text-[#102B50]">기본 사전 구비 서류</h4>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              ※ 초기 상담 시에는 사업자등록증 및 부가세 과표만으로 1차 진단이 가능합니다.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-700">
              {detail.requiredDocuments.map((doc, idx) => (
                <li key={idx} className="flex items-center gap-2 py-1.5 border-b border-slate-100 last:border-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#102B50]"></span>
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 4-Step Process for this service */}
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
          <div className="mb-6 text-center">
            <span className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
              APPLICATION FLOW
            </span>
            <h3 className="text-xl font-bold text-[#102B50] mt-1">
              진행 절차 안내
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {detail.process.map((step) => (
              <div key={step.step} className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-xs font-black text-[#D5A64B] block mb-1">
                  STEP 0{step.step}
                </span>
                <h5 className="font-bold text-sm text-[#102B50] mb-2">{step.title}</h5>
                <p className="text-xs text-slate-600 leading-normal">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs if present */}
        {detail.faqs && detail.faqs.length > 0 && (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <h4 className="text-lg font-bold text-[#102B50]">
                {detail.title} 관련 자주 묻는 질문
              </h4>
            </div>
            <Accordion
              items={detail.faqs.map((faq, idx) => ({
                id: idx,
                title: faq.q,
                children: <p className="leading-relaxed">{faq.a}</p>,
              }))}
            />
          </div>
        )}
      </div>
    </PageLayout>
  );
};
