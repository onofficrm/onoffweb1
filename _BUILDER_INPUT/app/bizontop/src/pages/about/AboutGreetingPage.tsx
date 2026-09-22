import React from 'react';
import { Award, CheckCircle2, Quote, Shield } from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';

interface PageProps {
  onOpenConsultation: () => void;
}

const subNav = [
  { label: '비즈온탑 소개', href: '/about' },
  { label: '대표 인사말', href: '/about/greeting', active: true },
  { label: '컨설팅 프로세스', href: '/about/process' },
  { label: '오시는 길', href: '/about/location' },
];

export const AboutGreetingPage: React.FC<PageProps> = ({ onOpenConsultation }) => {
  return (
    <PageLayout
      categoryName="회사소개"
      categoryHref="/about"
      title="대표 인사말"
      subtitle="고객 기업의 가치와 신뢰를 가장 먼저 생각하는 비즈온탑의 다짐입니다."
      breadcrumbs={[{ label: '대표 인사말' }]}
      subNavigation={subNav}
      onOpenConsultation={onOpenConsultation}
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-xs relative">
          <Quote className="w-12 h-12 text-slate-100 absolute top-8 right-8 pointer-events-none" />

          <span className="text-xs font-bold text-[#D5A64B] tracking-wider uppercase block mb-2">
            CEO MESSAGE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102B50] mb-6 leading-snug">
            "대한민국 기업인 여러분의 열정이 온당한 결실을 맺을 수 있도록, 
            가장 든든한 조력자가 되겠습니다."
          </h2>

          <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-5 font-normal">
            <p>
              안녕하십니까. 비즈온탑(BIZ ON TOP) 대표이사입니다.
            </p>
            <p>
              기업을 경영한다는 것은 매 순간 수많은 불확실성과 맞서는 치열한 여정입니다. 뛰어난 기술력과 독창적인 제품을 보유하고 있음에도 불구하고, 자금의 일시적 병목이나 복잡한 지원 제도의 장벽에 부딪혀 성장의 적기를 놓치는 대표님들을 현장에서 무수히 목격해 왔습니다.
            </p>
            <p>
              정부의 정책자금과 세제 혜택 인증 제도는 매년 막대한 규모로 조성되지만, 그 지원의 문턱은 해마다 높아지고 심사 기준은 날로 정밀해지고 있습니다. 단 하나의 서류 미비나 평가 지표에 대한 이해 부족으로 정당한 지원을 받지 못하고 탈락하는 것은 기업에게 너무나 뼈아픈 손실입니다.
            </p>
            <p>
              비즈온탑은 이러한 기업인들의 고충을 덜어드리고자 출발했습니다. 우리는 단순한 컨설팅 용역 제공자가 아닙니다. 기업의 설립부터 기술인증 취득, 안정적인 시설·운전자금 조달, 그리고 향후 기업 가치 극대화에 이르기까지 전 과정을 함께 고민하는 <strong>진정한 동반자(Partner)</strong>입니다.
            </p>
            <p>
              '신뢰', '전문성', '철저한 사후관리'라는 세 가지 약속을 바탕으로, 비즈온탑은 앞으로도 고객 여러분의 기업이 대한민국을 넘어 글로벌 탑 티어(Top-tier)로 도약할 수 있도록 가장 가까운 자리에서 묵묵히 지원할 것을 엄숙히 약속드립니다.
            </p>
            <p className="pt-4 text-slate-800 font-semibold">
              감사합니다.
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 block">비즈온탑 경영컨설팅</span>
              <span className="text-base font-bold text-[#102B50]">대표이사 배상</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#102B50] flex items-center justify-center text-[#D5A64B] font-black text-sm">
              BT
            </div>
          </div>
        </div>

        {/* 3 Core Pledges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 text-sm font-bold text-[#102B50] mb-2">
              <CheckCircle2 className="w-5 h-5 text-[#2563EB]" />
              <span>사전 착수금 0원 원칙</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              사전 가능성 검토는 100% 무료로 진행되며 고객의 부담을 최소화합니다.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 text-sm font-bold text-[#102B50] mb-2">
              <Shield className="w-5 h-5 text-[#D5A64B]" />
              <span>철저한 비밀유지(NDA)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              상담 중 제공된 기업 재무자료 및 기술 정보는 보안 서약에 따라 엄격히 보호됩니다.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 text-sm font-bold text-[#102B50] mb-2">
              <Award className="w-5 h-5 text-[#102B50]" />
              <span>수석 컨설턴트 1:1 전담</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              초기 상담부터 승인, 사후 관리까지 담당 컨설턴트가 끝까지 책임집니다.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
