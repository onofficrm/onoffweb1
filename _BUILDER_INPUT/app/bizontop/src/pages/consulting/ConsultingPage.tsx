import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Briefcase,
  CheckCircle2,
  Compass,
  FileText,
  Home,
  PieChart,
  Scale,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { SERVICE_DETAILS } from '../../data/siteData';

interface ConsultingPageProps {
  onOpenConsultation: () => void;
}

const subNavItems = [
  { id: 'corporation', label: '법인설립 및 전환', href: '/consulting/corporation' },
  { id: 'advisory', label: '통합경영자문', href: '/consulting/advisory' },
  { id: 'real-estate', label: '부동산 매입 및 시설자금', href: '/consulting/real-estate' },
  { id: 'finance', label: '기업 재무 및 자금조달', href: '/consulting/finance' },
  { id: 'strategy', label: '기업 성장전략', href: '/consulting/strategy' },
];

export const ConsultingPage: React.FC<ConsultingPageProps> = ({ onOpenConsultation }) => {
  const { consultingId } = useParams<{ consultingId: string }>();
  const activeId = consultingId || 'corporation';
  const detail = SERVICE_DETAILS[activeId] || SERVICE_DETAILS['corporation'];

  const subNav = subNavItems.map((item) => ({
    ...item,
    active: item.id === activeId,
  }));

  return (
    <PageLayout
      categoryName="경영컨설팅"
      categoryHref="/consulting/corporation"
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
              <Badge variant="neutral" size="sm">
                기업 생애주기 맞춤 자문
              </Badge>
              <span className="text-xs text-slate-500 font-medium">
                세무·노무·법무 리스크 사전 예방 및 기업가치 극대화
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102B50]">
              {detail.title} 안내
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              {detail.summary}
            </p>
          </div>
        </div>

        {/* 3 Core Benefits */}
        <div>
          <div className="mb-6">
            <span className="text-xs font-bold text-[#102B50] tracking-wider uppercase">
              STRATEGIC BENEFITS
            </span>
            <h3 className="text-xl font-bold text-[#102B50] mt-1">
              컨설팅을 통해 얻는 핵심 기대효과
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {detail.benefits.map((benefit, idx) => (
              <Card key={idx} hoverEffect className="border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#102B50] flex items-center justify-center mb-4">
                  <Briefcase className="w-5 h-5" />
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

        {/* Target Checklist & Required Documents */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Target Audience */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-[#2563EB]" />
              <h4 className="text-base font-bold text-[#102B50]">추천 대상 기업 및 대표자</h4>
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
              <FileText className="w-5 h-5 text-[#102B50]" />
              <h4 className="text-base font-bold text-[#102B50]">사전 검토 준비 서류</h4>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              ※ 상담 시 필요한 기본 서류이며, 비밀유지서약서(NDA) 체결 후 안전하게 다루어집니다.
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

        {/* 4-Step Process */}
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
          <div className="mb-6 text-center">
            <span className="text-xs font-bold text-[#102B50] tracking-wider uppercase">
              CONSULTING PROCESS
            </span>
            <h3 className="text-xl font-bold text-[#102B50] mt-1">
              체계적 자문 수행 절차
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
      </div>
    </PageLayout>
  );
};
