import React, { useState } from 'react';
import { 
  FileText, 
  Users, 
  Building2, 
  CheckCircle2, 
  TrendingUp, 
  ChevronDown, 
  Clock, 
  Check, 
  Sparkles 
} from 'lucide-react';
import { ProcessStep } from '../types';

const STEPS: ProcessStep[] = [
  {
    id: 'step-1',
    stepNumber: '01',
    title: '법인설립 준비',
    subtitle: '상호 중복 검토 & 사업목적 정리',
    summary: '동일 관할 내 상호 중복 여부 확인 및 필요한 인허가 목적 설정',
    keyPoints: ['관할 등기소 상호 중복 조회', '표준 및 맞춤형 사업목적 선정', '발기인 및 임원 서류 준비'],
    estimatedDays: '1일 소요',
    iconName: 'FileText'
  },
  {
    id: 'step-2',
    stepNumber: '02',
    title: '법인 구조 결정',
    subtitle: '자본금 & 주주·임원 구성',
    summary: '100원부터 가능한 자본금과 주주 지분율, 정관 특약 조항 맞춤 설계',
    keyPoints: ['최적 자본금 규모 설정 (업종별 추천)', '대표이사 및 감사(주식없는 임원) 선임', '절세와 승계를 고려한 주주 지분 배분'],
    estimatedDays: '1일 소요',
    iconName: 'Users'
  },
  {
    id: 'step-3',
    stepNumber: '03',
    title: '법인등기',
    subtitle: '전자등기 접수 & 공과금 감면',
    summary: '과밀억제권역 중과세 검토 및 비대면 전자서명으로 신속 접수',
    keyPoints: ['과밀억제권역 중과세 면제 여부 진단', '공인인증서 기반 빠른 전자서명', '등기소 심사 및 등기 완료'],
    estimatedDays: '3~4일 소요',
    iconName: 'Building2'
  },
  {
    id: 'step-4',
    stepNumber: '04',
    title: '사업자등록',
    subtitle: '세무서 등록 & 업종코드 최적화',
    summary: '창업감면 세액 혜택을 극대화할 수 있는 업종코드 선정 및 발급',
    keyPoints: ['청년창업세액감면(최대 100%) 해당 업종 적용', '임대차계약서 기반 관할 세무서 신청', '사업자등록증 당일~익일 수령'],
    estimatedDays: '1~2일 소요',
    iconName: 'CheckCircle2'
  },
  {
    id: 'step-5',
    stepNumber: '05',
    title: '기업성장 지원',
    subtitle: '벤처인증 & 초기 정책자금 연계',
    summary: '설립 직후 가장 유리한 정책자금과 기업인증 로드맵을 함께 설계',
    keyPoints: ['중진공·기보 신규 창업기업 특례보증', '벤처기업 확인 및 R&D 연구소 설립', '첫 기장 세무사 매칭 & 노무 세팅'],
    estimatedDays: '설립 직후 지속 지원',
    iconName: 'TrendingUp'
  }
];

export const InteractiveProcessCard: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const getStepIcon = (iconName: string, isActive: boolean) => {
    const className = `w-4 h-4 ${isActive ? 'text-white' : 'text-[#2563EB]'}`;
    switch (iconName) {
      case 'FileText':
        return <FileText className={className} />;
      case 'Users':
        return <Users className={className} />;
      case 'Building2':
        return <Building2 className={className} />;
      case 'CheckCircle2':
        return <CheckCircle2 className={className} />;
      case 'TrendingUp':
        return <TrendingUp className={className} />;
      default:
        return <FileText className={className} />;
    }
  };

  return (
    <div
      id="hero-process-card-container"
      className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-lg shadow-slate-200/50 p-5 sm:p-7 relative overflow-hidden"
    >
      {/* Subtle decorative top glow */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-blue-100 rounded-full blur-2xl opacity-60 pointer-events-none" />

      {/* Header bar of the visual card */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2563EB]"></span>
          </span>
          <h2 className="text-sm sm:text-base font-bold text-[#0B1F3A] tracking-tight">
            원스톱 법인설립 5단계 절차
          </h2>
        </div>
        <span className="text-[12px] font-medium text-slate-500 hidden sm:inline-block">
          단계를 클릭하면 상세 안내 확인
        </span>
      </div>

      {/* 5 Steps Vertical Flow with arrows */}
      <div className="space-y-2.5">
        {STEPS.map((step, index) => {
          const isActive = activeStepIndex === index;
          const isPassed = activeStepIndex > index;

          return (
            <React.Fragment key={step.id}>
              <div
                id={`process-step-item-${step.stepNumber}`}
                onClick={() => setActiveStepIndex(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveStepIndex(index);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-expanded={isActive}
                aria-label={`단계 ${step.stepNumber}: ${step.title}`}
                className={`w-full text-left rounded-xl transition-all duration-200 cursor-pointer p-3.5 sm:p-4 border focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]/40 ${
                  isActive
                    ? 'bg-blue-50/70 border-[#2563EB] shadow-xs'
                    : 'bg-white hover:bg-slate-50/80 border-slate-200/80'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Step Number Badge / Icon */}
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-colors shrink-0 ${
                        isActive
                          ? 'bg-[#2563EB] text-white shadow-xs'
                          : isPassed
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {isPassed ? <Check className="w-4 h-4 stroke-[3]" /> : step.stepNumber}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm sm:text-[15px] font-bold tracking-tight ${
                            isActive ? 'text-[#0B1F3A]' : 'text-slate-800'
                          }`}
                        >
                          {step.title}
                        </span>
                        {isActive && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2563EB] bg-white border border-blue-200 px-1.5 py-0.5 rounded-sm">
                            <Clock className="w-3 h-3 text-[#2563EB]" />
                            {step.estimatedDays}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-medium line-clamp-1 mt-0.5">
                        {step.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center">
                    <div
                      className={`p-1.5 rounded-md ${
                        isActive ? 'bg-[#2563EB]' : 'bg-slate-100'
                      }`}
                    >
                      {getStepIcon(step.iconName, isActive)}
                    </div>
                  </div>
                </div>

                {/* Expanded Key Information on Active Step */}
                {isActive && (
                  <div className="mt-3 pt-3 border-t border-blue-100/80 space-y-2 text-xs">
                    <p className="text-slate-700 font-medium leading-relaxed bg-white p-2.5 rounded-lg border border-blue-100">
                      💡 {step.summary}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                      {step.keyPoints.map((point, pIdx) => (
                        <div
                          key={pIdx}
                          className="flex items-center gap-1.5 text-slate-600 font-medium"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" />
                          <span className="truncate">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Connecting Down Arrow between steps */}
              {index < STEPS.length - 1 && (
                <div className="flex justify-center -my-1 py-0.5">
                  <div className="text-slate-300 font-bold text-xs flex items-center gap-1 select-none">
                    <span className="h-2.5 w-[1.5px] bg-slate-200"></span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    <span className="h-2.5 w-[1.5px] bg-slate-200"></span>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Bottom Small Badges as explicitly requested:
          법인설립, 법인전환, 기업인증, 정책자금 */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#F4A62A]" />
          <span>핵심 지원 영역</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#2563EB] border border-blue-100">
            법인설립
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            법인전환
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            기업인증
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            정책자금
          </span>
        </div>
      </div>
    </div>
  );
};
