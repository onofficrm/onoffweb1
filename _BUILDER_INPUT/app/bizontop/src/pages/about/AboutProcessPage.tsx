import React from 'react';
import {
  CheckCircle2,
  FileCheck2,
  GitMerge,
  HelpCircle,
  PhoneCall,
  Search,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Button } from '../../components/ui/Button';

interface PageProps {
  onOpenConsultation: () => void;
}

const subNav = [
  { label: '비즈온탑 소개', href: '/about' },
  { label: '대표 인사말', href: '/about/greeting' },
  { label: '컨설팅 프로세스', href: '/about/process', active: true },
  { label: '오시는 길', href: '/about/location' },
];

export const AboutProcessPage: React.FC<PageProps> = ({ onOpenConsultation }) => {
  const steps = [
    {
      step: '01',
      title: '사전 기업 정밀 진단',
      subtitle: 'Preliminary Diagnosis',
      desc: '신용등급 영향 없는 1:1 비공개 상담을 통해 최근 3개년 재무제표, 매출 추이, 기술력, 고용 실적을 다각도로 분석하여 최적의 정부 정책자금 및 인증 트랙을 선별합니다.',
      details: ['최근 결산서 및 부가세 과표 분석', '국세/지방세 체납 및 연체 이력 점검', '소진공/중진공/기보/신보 적합 트랙 매칭'],
      icon: <Search className="w-6 h-6 text-[#2563EB]" />,
    },
    {
      step: '02',
      title: '맞춤형 전략 수립 및 자금 매칭',
      subtitle: 'Strategy & Solution Matching',
      desc: '기업의 현금흐름과 상환 능력을 고려하여 가장 낮은 금리와 장기 상환이 가능한 기관을 확정하고, 가점 획득을 위한 특허/인증 연계 로드맵을 구축합니다.',
      details: ['정책기관별 우선순위 포트폴리오 확정', '금리 및 한도 비교 분석표 제공', '벤처기업·연구소 등 가점 요건 사전 정비'],
      icon: <GitMerge className="w-6 h-6 text-[#D5A64B]" />,
    },
    {
      step: '03',
      title: '사업계획서 작성 및 실사 대비',
      subtitle: 'Business Plan & Inspection Coaching',
      desc: '정책기관 평가위원이 중점적으로 평가하는 기술성, 사업성, 시장성을 극대화한 맞춤형 사업계획서를 편철하고, 대면 인터뷰 및 현장 실사 리허설을 진행합니다.',
      details: ['기관별 표준 양식에 맞춘 고도화 사업계획서 작성', '기술 경쟁력 증빙 자료 편철 및 정량 지표화', '현장 실사 예상 질의응답 및 대표자 PT 코칭'],
      icon: <FileCheck2 className="w-6 h-6 text-[#102B50]" />,
    },
    {
      step: '04',
      title: '보증서 발급, 자금 실행 및 사후관리',
      subtitle: 'Execution & Continuous Care',
      desc: '신용보증서 발급 완료 후 주거래 금융기관과의 협의를 통해 최저 금리로 대출을 기표하고, 차년도 추가 자금 및 인증 사후관리까지 책임집니다.',
      details: ['금융기관 금리 우대 협약 적용 및 최종 기표', '연구개발활동조사표 등 인증 유지 관리', '차년도 스케일업 및 시설확충 후속 자금 연계'],
      icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
    },
  ];

  return (
    <PageLayout
      categoryName="회사소개"
      categoryHref="/about"
      title="컨설팅 프로세스"
      subtitle="체계적이고 과학적인 4단계 프로세스로 정책자금 승인율과 고객 만족도를 극대화합니다."
      breadcrumbs={[{ label: '컨설팅 프로세스' }]}
      subNavigation={subNav}
      onOpenConsultation={onOpenConsultation}
    >
      <div className="space-y-12">
        {/* Intro */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
            WHY BIZ ON TOP PROCESS WORKS
          </span>
          <h2 className="text-2xl font-bold text-[#102B50] mt-2 mb-3">
            승인율 98.4%를 만드는 비즈온탑의 디테일
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            정책자금은 선착순 혹은 단순 서류 제출로 끝나지 않습니다. 수많은 경쟁 기업 중 정부의 정책 취지에 가장 부합하는 기업임을 입체적으로 증명해 내는 비즈온탑만의 4단계 프로세스를 경험해 보세요.
          </p>
        </div>

        {/* 4 Steps Detailed Timeline */}
        <div className="space-y-6">
          {steps.map((item, idx) => (
            <div
              key={item.step}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row gap-6 items-start"
            >
              <div className="flex items-center gap-4 md:flex-col md:items-center md:justify-center md:w-32 shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="text-center">
                  <span className="text-2xl font-black text-[#102B50] block">
                    STEP {item.step}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">
                    {item.subtitle}
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-3">
                <h3 className="text-lg sm:text-xl font-bold text-[#102B50]">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>

                <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {item.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-1.5 text-xs text-slate-700 bg-slate-50 px-3 py-2 rounded-lg">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                      <span className="truncate">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="bg-[#102B50] text-white rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl font-bold">비즈온탑의 사전 기업진단은 100% 무료입니다.</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              우리 기업이 지원받을 수 있는 최대 한도와 금리를 지금 확인해 보세요.
            </p>
          </div>
          <Button
            variant="accent"
            size="lg"
            onClick={onOpenConsultation}
            leftIcon={<PhoneCall className="w-4 h-4" />}
          >
            무료 사전진단 신청하기
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};
