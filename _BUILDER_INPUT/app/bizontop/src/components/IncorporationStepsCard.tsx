import React, { useState } from 'react';
import { 
  FileSearch, 
  Layers, 
  Stamp, 
  FileCheck2, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles,
  Info,
  Clock
} from 'lucide-react';
import { StepItem } from '../types.ts';

const STEPS: (StepItem & { icon: React.ElementType })[] = [
  {
    number: '01',
    title: '법인설립 준비',
    subtext: '상호 중복 체크, 자본금 및 주주·임원 구성',
    duration: '1일 소요',
    keyPoints: ['관할 등기소 동일 상호 여부 사전 조회', '초기 자본금(100만~1,000만 원 권장)', '주주와 임원(지분 없는 임원 1인 필요)'],
    tips: '지분 없는 임원(감사 또는 이사)이 1명 있어야 설립 조사보고서 작성이 간소화됩니다.',
    icon: FileSearch,
  },
  {
    number: '02',
    title: '법인 구조 결정',
    subtext: '지분 배분율, 맞춤 정관 특약, 세무 리스크 방지',
    duration: '1일 소요',
    keyPoints: ['공동창업자 간 지분율 및 의결권 설계', '임원보수·퇴직금 규정 특약 반영', '향후 투자 유치 및 정책자금 사전 고려'],
    tips: '표준 정관을 그대로 쓰면 나중에 배당이나 퇴직금 처리 시 세금 불이익이 생길 수 있어 전문 정관 검토가 필수입니다.',
    icon: Layers,
  },
  {
    number: '03',
    title: '법인등기',
    subtext: '전자서명 또는 인감 날인으로 등기소 접수',
    duration: '2~3일 소요',
    keyPoints: ['온라인 공인인증서 전자서명(방문 불필요)', '등기부등본 및 법인인감증명서 발급', '등록면허세 및 지방교육세 납부 대행'],
    tips: '비즈온탑에서는 과밀억제권역 중과세 감면 가능 여부를 사전 검토해 등기 세금을 절감합니다.',
    icon: Stamp,
  },
  {
    number: '04',
    title: '사업자등록',
    subtext: '관할 세무서 사업자등록증 신청 및 발급',
    duration: '당일~1일',
    keyPoints: ['정책자금·인증에 유리한 업종코드(KSIC) 선별', '임대차계약서 및 인허가 서류 구비', '법인통장 개설 및 전자세금계산서 보안카드 발급'],
    tips: '사업 목적 기재 순서와 업종 코드에 따라 향후 정부지원사업 및 정책자금 지원 대상이 달라집니다.',
    icon: FileCheck2,
  },
  {
    number: '05',
    title: '기업성장 지원',
    subtext: '설립 후 첫 정책자금 매칭 & 기업인증 연계',
    duration: '설립 직후 계속',
    keyPoints: ['창업 초기 정부지원금/운전자금 연계 검토', '벤처기업 확인서, 연구소/전담부서 인증', '세무·노무 맞춤 파트너 연결'],
    tips: '법인 설립 후 3년 이내 창업 초기 기업 혜택을 극대화할 수 있는 로드맵을 무료로 설계해 드립니다.',
    icon: TrendingUp,
  },
];

export const IncorporationStepsCard: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const current = STEPS[activeStep];
  const StepIcon = current.icon;

  return (
    <div
      id="hero-steps-card"
      className="w-full bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/90 overflow-hidden transition-all"
    >
      {/* Top Card Bar */}
      <div className="bg-[#0B1F3A] text-white px-5 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[13px] sm:text-[14px] font-semibold tracking-wide">
            법인설립 5단계 로드맵
          </span>
          <span className="text-[11px] text-blue-200 bg-blue-900/60 px-2 py-0.5 rounded-md hidden xs:inline-block">
            원스톱 진행
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[12px] text-slate-300 font-medium bg-white/10 px-2.5 py-1 rounded-full">
          <Clock className="w-3.5 h-3.5 text-amber-300" />
          <span>평균 3~5일 완성</span>
        </div>
      </div>

      {/* Main Step Navigation (Horizontal & Vertical adaptive) */}
      <div className="p-4 sm:p-5">
        <div className="text-[12px] text-slate-500 font-medium mb-3 flex items-center justify-between">
          <span>단계를 클릭하면 상세 준비사항을 확인할 수 있습니다</span>
          <span className="text-blue-600 font-semibold">{activeStep + 1} / 5 단계</span>
        </div>

        {/* Steps List */}
        <div className="space-y-2">
          {STEPS.map((step, idx) => {
            const isSelected = activeStep === idx;
            const Icon = step.icon;

            return (
              <div key={step.number}>
                <button
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-3 sm:p-3.5 rounded-xl transition-all duration-200 flex items-center gap-3.5 border ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-300 shadow-xs ring-1 ring-blue-500/20'
                      : 'bg-white hover:bg-slate-50 border-slate-100'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold transition-colors ${
                      isSelected
                        ? 'bg-[#2563EB] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {step.number}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[14px] sm:text-[15px] font-bold tracking-tight truncate ${
                            isSelected ? 'text-[#0B1F3A]' : 'text-slate-700'
                          }`}
                        >
                          {step.title}
                        </span>
                        {isSelected && (
                          <span className="text-[11px] font-semibold text-blue-700 bg-blue-100/70 px-2 py-0.2 rounded-full">
                            현재 확인 중
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 shrink-0 font-medium">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-[12.5px] text-slate-500 truncate mt-0.5">
                      {step.subtext}
                    </p>
                  </div>
                </button>

                {/* Sub-connector line between steps */}
                {idx < STEPS.length - 1 && (
                  <div className="h-2.5 flex items-center justify-start pl-7">
                    <div className="w-[1.5px] h-full bg-slate-200" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Step Detail Panel */}
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-slate-700">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-6 h-6 rounded-md bg-blue-600/10 text-blue-600 flex items-center justify-center">
              <StepIcon className="w-3.5 h-3.5" />
            </div>
            <h4 className="text-[13.5px] font-bold text-[#0B1F3A]">
              [{current.number}] {current.title} 핵심 포인트
            </h4>
          </div>

          <ul className="space-y-1.5 mb-3">
            {current.keyPoints.map((point, i) => (
              <li key={i} className="text-[12.5px] text-slate-600 flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="p-2.5 rounded-lg bg-amber-50/90 border border-amber-200/70 flex items-start gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-[11.5px] text-amber-900 leading-snug">
              <span className="font-bold text-amber-950">비즈온탑 실전 팁: </span>
              {current.tips}
            </div>
          </div>
        </div>

        {/* Bottom Badges */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <span className="text-[12px] font-semibold text-slate-500">
            원스톱 연계 서비스
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {['법인설립', '법인전환', '기업인증', '정책자금'].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 px-2.5 py-1 rounded-md transition-colors"
              >
                #{badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
