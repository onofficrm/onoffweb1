import React from 'react';
import { Award, BookOpen, CheckCircle2, ChevronRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../../components/layout/PageLayout';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';

interface PageProps {
  onOpenConsultation: () => void;
}

const subNav = [
  { label: '공지사항', href: '/support/notices' },
  { label: '정책자금 소식', href: '/support/news' },
  { label: '기업인증 정보', href: '/support/cert-info', active: true },
  { label: '컨설팅 사례', href: '/support/cases' },
  { label: '자주 묻는 질문', href: '/support/faq' },
  { label: '상담 신청', href: '/support/inquiry' },
];

const certGuides = [
  {
    title: '2026 벤처기업확인 제도 심사 가이드',
    type: '벤처기업',
    summary: '민간 주도 벤처확인 제도 개편에 따른 혁신성장형 평가지표 14개 항목 분석 및 사업계획서 작성 전략.',
    benefits: ['법인세/소득세 5년간 50% 감면', '취득세 75% 감면', '기보/중진공 융자 한도 확대'],
    href: '/certification/venture',
  },
  {
    title: '기업부설연구소 & 연구개발전담부서 설립 요건',
    type: 'R&D 연구소',
    summary: '이공계 학위 소지자 1인 이상 시 세액공제 혜택을 받는 연구소 설립 기준 및 KOITA 온라인 심사 체크리스트.',
    benefits: ['연구인력개발비 25% 법인세 세액공제', '연구원 월 20만 원 비과세', '정부 R&D 가점'],
    href: '/certification/lab',
  },
  {
    title: '메인비즈(MAIN-BIZ) & 이노비즈(INNO-BIZ) 비교 분석',
    type: '혁신형 기업',
    summary: '경영혁신형(메인비즈)과 기술혁신형(이노비즈)의 심사 요건, 업력 기준 및 보증기관 우대 혜택 총정리.',
    benefits: ['보증료율 0.2%p 감면', '수출바우처 가점', '정기 세무조사 3년 유예'],
    href: '/certification/mainbiz',
  },
  {
    title: 'ISO 9001 / 14001 / 45001 국제표준인증 취득 절차',
    type: '국제표준',
    summary: '공공입찰 및 대기업 협력업체 등록을 위한 ISO 품질·환경·안전보건 경영시스템 획득 매뉴얼.',
    benefits: ['공공조달 적격심사 가점', '대기업 벤더 등록 필수 요건 충족', '글로벌 신뢰도'],
    href: '/certification/iso',
  },
];

export const CertInfoPage: React.FC<PageProps> = ({ onOpenConsultation }) => {
  return (
    <PageLayout
      categoryName="고객센터"
      categoryHref="/support/notices"
      title="기업인증 정보"
      subtitle="벤처, 연구소, 이노비즈, 메인비즈 등 필수 국가 공인 기업인증 심사 가이드입니다."
      breadcrumbs={[{ label: '기업인증 정보' }]}
      subNavigation={subNav}
      onOpenConsultation={onOpenConsultation}
    >
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-600 leading-relaxed">
          💡 기업인증은 단순한 명패가 아닙니다. 적법한 절차를 통해 인증을 취득하면 수천만 원에서 수억 원에 달하는 법인세 감면과 정책자금 가점을 확보할 수 있습니다. 비즈온탑은 기업별 최적의 인증 조합을 설계해 드립니다.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certGuides.map((guide, idx) => (
            <Card key={idx} hoverEffect className="border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="accent" size="sm">
                    {guide.type}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold text-[#102B50] mb-2">
                  {guide.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {guide.summary}
                </p>

                <div className="bg-[#F8FAFC] p-3 rounded-lg border border-slate-100 mb-4">
                  <span className="text-xs font-bold text-[#102B50] block mb-1">
                    주요 핵심 혜택:
                  </span>
                  <ul className="space-y-1">
                    {guide.benefits.map((b, bIdx) => (
                      <li key={bIdx} className="text-xs text-slate-600 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D5A64B] shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                to={guide.href}
                className="text-xs font-bold text-[#2563EB] hover:underline flex items-center justify-between pt-3 border-t border-slate-100"
              >
                <span>인증 상세 안내 페이지 보기</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};
