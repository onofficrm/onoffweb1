import React from 'react';
import { 
  Award, 
  Coins, 
  FlaskConical, 
  Microscope, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

interface AfterIncorporationSectionProps {
  onOpenConsultation: (category: string) => void;
}

interface SupportProgram {
  id: string;
  tag: string;
  name: string;
  subtitle: string;
  summary: string;
  keyCheck: string;
  icon: React.ReactNode;
}

const SUPPORT_PROGRAMS: SupportProgram[] = [
  {
    id: 'prog-01',
    tag: '자금 연계',
    name: '정책자금',
    subtitle: '정부 정책 융자 및 지원제도',
    summary: '기업의 업력, 고용 창출, 사업계획에 따라 지원 가능한 기관별(중진공, 신보, 기보 등) 융자 및 지원제도를 검토합니다.',
    keyCheck: '업력·재무상황·사업성 종합 검토',
    icon: <Coins className="w-5 h-5 text-[#2563EB]" />,
  },
  {
    id: 'prog-02',
    tag: '혁신 인증',
    name: '벤처기업확인',
    subtitle: '기술 우수 및 혁신성장형 인증',
    summary: '기술력과 사업 성장성을 평가받아 벤처기업으로 확인 시 세제 혜택 및 금융 우대 혜택을 연계 검토할 수 있습니다.',
    keyCheck: '기술보증·투자유치·연구개발 역량 검토',
    icon: <Award className="w-5 h-5 text-[#2563EB]" />,
  },
  {
    id: 'prog-03',
    tag: 'R&D 조직',
    name: '기업부설연구소',
    subtitle: '연구개발 전담 조직 공식 인정',
    summary: '일정 요건의 전용 연구 공간과 연구 전담 인력을 갖추고 연구개발비 세액공제 및 인력 혜택을 검토합니다.',
    keyCheck: '연구원 자격요건 및 독립 연구공간 확보',
    icon: <FlaskConical className="w-5 h-5 text-[#2563EB]" />,
  },
  {
    id: 'prog-04',
    tag: 'R&D 부서',
    name: '연구개발전담부서',
    subtitle: '소규모 기술개발 부서 인정',
    summary: '연구원 수 요건이 비교적 유연하여 초기 기업이 연구 조직을 구축하고 세무 혜택을 연계하기에 적합합니다.',
    keyCheck: '1명 이상의 연구전담 인력 요건 확인',
    icon: <Microscope className="w-5 h-5 text-[#2563EB]" />,
  },
  {
    id: 'prog-05',
    tag: '기술혁신',
    name: '이노비즈 (INNOBIZ)',
    subtitle: '기술혁신형 중소기업 인증',
    summary: '업력 3년 이상의 기술 우수 기업을 대상으로 기술 경쟁력을 공인받아 금융, 인력, R&D 가점 등을 검토합니다.',
    keyCheck: '업력 3년 이상 및 기술혁신시스템 평가',
    icon: <Sparkles className="w-5 h-5 text-[#2563EB]" />,
  },
  {
    id: 'prog-06',
    tag: '경영혁신',
    name: '메인비즈 (MAINBIZ)',
    subtitle: '경영혁신형 중소기업 인증',
    summary: '마케팅, 서비스, 유통 등 경영 혁신 활동을 통해 경쟁력을 확보한 기업의 금융 우대 및 판로 연계를 지원합니다.',
    keyCheck: '업력 3년 이상 및 경영혁신역량 평가',
    icon: <TrendingUp className="w-5 h-5 text-[#2563EB]" />,
  },
];

export const AfterIncorporationSection: React.FC<AfterIncorporationSectionProps> = ({
  onOpenConsultation,
}) => {
  return (
    <section
      id="after-incorporation-section"
      className="py-16 sm:py-24 bg-[#EBF2FA] border-b border-blue-200/80"
      aria-label="법인설립 이후 기업지원 프로그램"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white text-[#2563EB] border border-blue-200 mb-3.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>AFTER INCORPORATION</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#0B1F3A] tracking-tight leading-tight">
            법인설립이 끝이 아닙니다. <br className="hidden sm:inline" />
            기업의 성장은 그 이후부터 시작됩니다.
          </h2>

          <p className="mt-3.5 text-base sm:text-[17px] text-slate-700 font-normal leading-relaxed">
            기업의 업종, 업력, 재무상태, 연구개발 현황 등에 따라 <br className="hidden sm:inline" />
            활용할 수 있는 기업지원제도가 달라집니다.
          </p>
        </div>

        {/* 6 Cards Grid (2 cols on Tablet, 3 cols on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-10">
          {SUPPORT_PROGRAMS.map((prog) => (
            <div
              key={prog.id}
              id={`prog-card-${prog.id}`}
              className="bg-white rounded-2xl p-6 border border-blue-100 hover:border-[#2563EB]/60 transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-[#2563EB] border border-blue-100">
                    {prog.tag}
                  </span>
                  <div className="p-2 rounded-lg bg-blue-50/50 group-hover:bg-blue-50 transition-colors">
                    {prog.icon}
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-lg sm:text-xl font-black text-[#0B1F3A] tracking-tight mb-1 group-hover:text-[#2563EB] transition-colors">
                  {prog.name}
                </h3>
                <div className="text-xs font-semibold text-slate-400 mb-3">
                  {prog.subtitle}
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-4">
                  {prog.summary}
                </p>
              </div>

              {/* Requirement badge */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{prog.keyCheck}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Non-promotional, honest legal & policy disclaimer note */}
        <div className="max-w-3xl mx-auto p-4 rounded-xl bg-white/80 border border-blue-200/90 text-center mb-10 shadow-2xs">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600 leading-relaxed">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              ※ 모든 기업지원제도는 주관기관의 사업 공고 요건, 업종별 지원 제외 기준 및 예산 상황에 따라 상이하므로, 전문가의 사전 현황 분석 후 적합한 제도를 검토하시기 바랍니다.
            </span>
          </div>
        </div>

        {/* CTA: [기업지원 서비스 확인하기] */}
        <div className="text-center">
          <button
            type="button"
            id="after-incorporation-cta"
            onClick={() => onOpenConsultation('기업지원 제도 상담')}
            className="inline-flex items-center justify-center gap-2.5 bg-[#0B1F3A] hover:bg-[#152e52] active:bg-[#071528] text-white font-bold text-base px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 group"
          >
            <span>기업지원 서비스 확인하기</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
