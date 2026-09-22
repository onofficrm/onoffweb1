import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Award,
  CheckCircle2,
  FileText,
  Layers,
  Microscope,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { SERVICE_DETAILS } from '../../data/siteData';

interface CertPageProps {
  onOpenConsultation: () => void;
}

const subNavItems = [
  { id: 'venture', label: '벤처기업확인', href: '/certification/venture' },
  { id: 'lab', label: '기업부설연구소', href: '/certification/lab' },
  { id: 'rnd-dept', label: '연구개발전담부서', href: '/certification/rnd-dept' },
  { id: 'iso', label: 'ISO 인증', href: '/certification/iso' },
  { id: 'mainbiz', label: '메인비즈', href: '/certification/mainbiz' },
  { id: 'innobiz', label: '이노비즈', href: '/certification/innobiz' },
];

export const CertPage: React.FC<CertPageProps> = ({ onOpenConsultation }) => {
  const { certId } = useParams<{ certId: string }>();
  const activeId = certId || 'venture';
  const detail = SERVICE_DETAILS[activeId] || SERVICE_DETAILS['venture'];

  const subNav = subNavItems.map((item) => ({
    ...item,
    active: item.id === activeId,
  }));

  return (
    <PageLayout
      categoryName="기업인증"
      categoryHref="/certification/venture"
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
              <Badge variant="accent" size="sm">
                조세 감면 & 정부 과제 가점 인증
              </Badge>
              <span className="text-xs text-slate-500 font-medium">
                국가 공인 심사 기준 100% 밀착 대응
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
            <span className="text-xs font-bold text-[#D5A64B] tracking-wider uppercase">
              KEY ADVANTAGES
            </span>
            <h3 className="text-xl font-bold text-[#102B50] mt-1">
              인증 취득 시 제공되는 핵심 혜택
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {detail.benefits.map((benefit, idx) => (
              <Card key={idx} hoverEffect className="border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D5A64B] flex items-center justify-center mb-4">
                  <Award className="w-5 h-5 text-[#BF9137]" />
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
              <h4 className="text-base font-bold text-[#102B50]">신청 요건 및 추천 대상 기업</h4>
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
              <h4 className="text-base font-bold text-[#102B50]">심사 접수 준비 서류</h4>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              ※ 전문 컨설턴트가 기업 보유 서류를 사전 검토한 뒤 부족한 증빙 편철을 전담 지원합니다.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-700">
              {detail.requiredDocuments.map((doc, idx) => (
                <li key={idx} className="flex items-center gap-2 py-1.5 border-b border-slate-100 last:border-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D5A64B]"></span>
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 4-Step Process */}
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
          <div className="mb-6 text-center">
            <span className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
              CERTIFICATION ROADMAP
            </span>
            <h3 className="text-xl font-bold text-[#102B50] mt-1">
              단계별 인증 취득 로드맵
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
