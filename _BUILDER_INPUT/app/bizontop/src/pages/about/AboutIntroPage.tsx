import React from 'react';
import { Award, Building2, CheckCircle2, ShieldCheck, Target, Users } from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Card } from '../../components/ui/Card';

interface PageProps {
  onOpenConsultation: () => void;
}

const subNav = [
  { label: '비즈온탑 소개', href: '/about', active: true },
  { label: '대표 인사말', href: '/about/greeting' },
  { label: '컨설팅 프로세스', href: '/about/process' },
  { label: '오시는 길', href: '/about/location' },
];

export const AboutIntroPage: React.FC<PageProps> = ({ onOpenConsultation }) => {
  return (
    <PageLayout
      categoryName="회사소개"
      categoryHref="/about"
      title="비즈온탑 소개"
      subtitle="기업의 생애주기별 성장을 함께 설계하는 대한민국 대표 경영자문 파트너"
      breadcrumbs={[{ label: '비즈온탑 소개' }]}
      subNavigation={subNav}
      onOpenConsultation={onOpenConsultation}
    >
      <div className="space-y-16">
        {/* Brand Mission Statement */}
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-xs">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
              OUR MISSION & PHILOSOPHY
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102B50] mt-2 mb-4 leading-snug">
              "중소기업과 소상공인이 자금과 정보의 장벽 없이 본연의 비즈니스에만 몰입할 수 있도록"
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed space-y-2">
              비즈온탑(BIZ ON TOP)은 복잡하고 다변화되는 정부 지원 정책 속에서, 기업이 마땅히 누려야 할 금융 혜택과 조세 감면, 인증 경쟁력을 전문적인 시각으로 찾아내는 기업 맞춤 종합 경영컨설팅 그룹입니다.
              <br /><br />
              단순한 서류 대행을 넘어, 기업의 현재 재무구조와 기술적 잠재력을 정밀 진단하여 승인 확률이 가장 높은 정책자금을 매칭하고, 가치 증진을 위한 체계적인 사후관리를 약속드립니다.
            </p>
          </div>
        </div>

        {/* 3 Core Values */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#D5A64B] tracking-wider uppercase">
              CORE VALUES
            </span>
            <h3 className="text-2xl font-bold text-[#102B50] mt-1">비즈온탑의 3대 핵심 가치</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center p-8 border-slate-200">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center mx-auto mb-5">
                <Target className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-[#102B50] mb-2">정확성 (Accuracy)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                300여 개 정책자금 평가 지표와 최신 법령을 면밀히 분석하여 탈락 리스크를 최소화하고 확실한 수혜 전략을 수립합니다.
              </p>
            </Card>

            <Card className="text-center p-8 border-slate-200">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#D5A64B] flex items-center justify-center mx-auto mb-5">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-[#102B50] mb-2">신뢰와 투명성 (Integrity)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                과장이나 허위 약속 없이 객관적인 기업 진단 결과를 제시하며, 사전 착수금 없이 성공 중심의 정직한 자문을 고수합니다.
              </p>
            </Card>

            <Card className="text-center p-8 border-slate-200">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-[#102B50] flex items-center justify-center mx-auto mb-5">
                <Users className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-[#102B50] mb-2">지속 동행 (Partnership)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                일회성 자금 조달에 그치지 않고, 기업부설연구소 사후관리, 이노/메인비즈 갱신, 차년도 시설확충까지 장기 파트너로 함께합니다.
              </p>
            </Card>
          </div>
        </div>

        {/* Operational Scope */}
        <div className="bg-[#FAFBFD] rounded-2xl p-8 border border-slate-200">
          <h3 className="text-xl font-bold text-[#102B50] mb-6 text-center">
            비즈온탑 전문 컨설팅 사업 영역
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h5 className="font-bold text-sm text-[#102B50] mb-2">정책자금 조달</h5>
              <p className="text-xs text-slate-600 leading-normal">
                중진공, 기보, 신보, 소진공, 지자체 육성자금 등 무담보 신용보증 및 저금리 융자 연계
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h5 className="font-bold text-sm text-[#102B50] mb-2">기업인증 컨설팅</h5>
              <p className="text-xs text-slate-600 leading-normal">
                벤처기업, 기업부설연구소, 연구전담부서, 메인/이노비즈, ISO 표준 시스템 인증 취득
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h5 className="font-bold text-sm text-[#102B50] mb-2">기업 재무자금</h5>
              <p className="text-xs text-slate-600 leading-normal">
                가지급금 정리, 미처분 이익잉여금 환원, 기업신용평가등급 개선, 결산 전략 자문
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h5 className="font-bold text-sm text-[#102B50] mb-2">부동산 및 시설확장</h5>
              <p className="text-xs text-slate-600 leading-normal">
                산업단지 입주 분석, 공장/사옥 매입 시설자금, 취득세·재산세 감면 연계
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
