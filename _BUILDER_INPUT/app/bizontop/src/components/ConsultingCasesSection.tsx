import React, { useState } from 'react';
import {
  Building2,
  Users2,
  Rocket,
  ArrowRight,
  HelpCircle,
  Workflow,
  Sparkles,
  ShieldCheck,
  X,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { ConsultingCaseItem } from '../types';

interface ConsultingCasesSectionProps {
  onOpenConsultation: (category: string) => void;
}

const CASES: ConsultingCaseItem[] = [
  {
    id: 'case-01',
    caseNo: '01',
    clientType: '온라인 쇼핑몰 운영기업',
    title: '개인사업자 → 법인전환',
    situation: '사업규모가 증가하면서 법인전환을 검토',
    concerns: ['법인전환 시점', '주주구성', '향후 기업운영'],
    processSteps: ['현황검토', '법인구조 검토', '법인설립', '후속 기업지원 상담'],
    casePreview:
      '연 순이익이 커진 쇼핑몰 대표가, 세금·거래처 신인도·지분 구조를 함께 보고 법인으로 전환한 사례입니다.',
    caseStory: {
      background:
        '패션·생활용품 온라인 쇼핑몰을 개인사업자로 5년째 운영 중이던 A 대표. 최근 2년 사이 매출과 순이익이 빠르게 늘어 종합소득세 부담이 체감되기 시작했고, 주요 거래처·물류 파트너에서도 법인 명의 거래를 선호했습니다.',
      challenge:
        '언제 전환할지, 배우자·공동운영자를 주주로 넣을지, 전환 후 급여·배당을 어떻게 가져갈지, 기존 사업자 재고·계약은 어떻게 넘길지가 한꺼번에 겹쳐 있었습니다.',
      approach: [
        '최근 3개년 매출·이익·인출 구조를 기준으로 개인 vs 법인 실효세 부담을 비교',
        '포괄양수도 방식과 일정·세금 포인트를 체크리스트로 정리',
        '대표 지분 70% + 배우자 30%로 경영권과 가계 인출을 균형 있게 설계',
        '등기·사업자등록·카드/PG 명의 변경 순서를 맞춰 영업 공백을 최소화',
      ],
      result:
        '전환 완료 후 법인 기준으로 세무기장·급여 체계를 정리했고, 이어서 정책자금·벤처 요건 사전 점검까지 진행했습니다. (업종·규모에 따라 결과는 달라질 수 있습니다.)',
    },
  },
  {
    id: 'case-02',
    caseNo: '02',
    clientType: '3인 공동창업',
    title: '공동창업 법인설립',
    situation: '3명의 창업자가 신규 사업을 공동으로 준비',
    concerns: ['대표자', '주주', '임원', '지분구조'],
    processSteps: ['사업구조 확인', '지분 및 임원 구성 검토', '법인설립'],
    casePreview:
      '개발·영업·운영을 맡은 3인이, 지분·대표·퇴사 시 규칙을 먼저 정한 뒤 법인을 만든 사례입니다.',
    caseStory: {
      background:
        'B2B SaaS를 준비하는 공동창업 3인. 한 명은 개발, 한 명은 영업, 한 명은 운영·고객성공을 맡기로 했습니다. 아이디어는 있었지만 “대표는 누구인지”, “지분은 몇 %인지”, “중간에 나가면 어떻게 되는지”가 구두로만 남아 있었습니다.',
      challenge:
        '기여도가 다른데도 지분을 1/3씩 나누면 나중에 갈등이 생기고, 반대로 한 사람에게만 몰아주면 협업 동기가 떨어질 수 있었습니다. 등기이사 구성과 인감·계좌 관리 권한도 정리되지 않은 상태였습니다.',
      approach: [
        '역할·투입시간·초기 비용을 기준으로 지분안(예: 40 / 30 / 30)을 여러 시나리오로 비교',
        '대표이사 1인 + 등기이사 구성, 주요 의사결정(지분 매각·차입·채용) 합의 원칙을 정리',
        '퇴사·지분 매수청구·경업금지 등 주주간계약에 넣을 핵심 조항을 제안',
        '상호·사업목적·자본금을 투자·정책자금 가능성을 염두에 두고 확정 후 전자등기',
      ],
      result:
        '설립과 동시에 주주 간 규칙을 문서화해, 이후 채용·시드 유치 논의 때 “지분부터 다시 싸울” 리스크를 줄였습니다.',
    },
  },
  {
    id: 'case-03',
    caseNo: '03',
    clientType: '스타트업',
    title: '투자유치 준비 법인',
    situation: '서비스 출시와 향후 투자유치를 준비',
    concerns: ['초기 주주구조', '자본금', '향후 투자구조'],
    processSteps: ['설립목적 확인', '법인구조 검토', '법인설립', '기업성장 상담'],
    casePreview:
      '앱 출시 전 스타트업이, 투자 유치를 가정해 초기 지분·자본금·옵션풀을 설계하고 설립한 사례입니다.',
    caseStory: {
      background:
        '모바일 헬스케어 앱을 준비 중인 C팀. 베타 출시 6개월 내 시드 유치를 목표로 했고, 액셀러레이터·엔젤 미팅을 앞두고 “법인이 없다”, “지분 구조가 정리되지 않았다”는 피드백을 받았습니다.',
      challenge:
        '자본금을 너무 낮게 잡으면 대외 신뢰가 약하고, 너무 높게 잡으면 창업자 부담이 커집니다. 또한 초기부터 지분을 과도하게 나눠 두면 라운드마다 희석·갈등이 커질 수 있었습니다.',
      approach: [
        '설립 목적을 “제품 출시 + 시드 유치”로 명확히 하고 사업목적·정관을 맞춤',
        '창업자 지분 중심의 단순 구조로 시작하되, 향후 옵션풀·투자 라운드를 염두에 둔 희석 시나리오를 설명',
        '실무적으로 무난한 자본금 구간을 제안하고, 벤처확인·연구소 준비 타임라인을 병행 설계',
        '설립 후 사업자등록·계좌·계약 명의를 투자 실사에 맞춰 정리',
      ],
      result:
        '법인 설립 직 후 투자 피치를 “구조가 정리된 회사”로 진행할 수 있었고, 벤처·정책자금 사전 요건도 함께 로드맵에 넣었습니다.',
    },
  },
];

export const ConsultingCasesSection: React.FC<ConsultingCasesSectionProps> = ({
  onOpenConsultation,
}) => {
  const [selected, setSelected] = useState<ConsultingCaseItem | null>(null);

  const getCaseIcon = (clientType: string) => {
    switch (clientType) {
      case '온라인 쇼핑몰 운영기업':
        return <Building2 className="w-5 h-5 text-[#2563EB]" />;
      case '3인 공동창업':
        return <Users2 className="w-5 h-5 text-[#2563EB]" />;
      case '스타트업':
        return <Rocket className="w-5 h-5 text-[#2563EB]" />;
      default:
        return <Workflow className="w-5 h-5 text-[#2563EB]" />;
    }
  };

  return (
    <section
      id="consulting-cases-section"
      className="py-16 sm:py-24 bg-white border-b border-slate-200/80"
      aria-label="실제 컨설팅 진행 사례"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 text-[#2563EB] border border-blue-200 mb-3.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>CONSULTING CASES</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#0B1F3A] tracking-tight leading-tight">
            기업마다 상황이 다르기 때문에 <br className="hidden sm:inline" />
            진행 방법도 달라집니다.
          </h2>

          <p className="mt-3.5 text-base sm:text-[17px] text-slate-600 font-normal leading-relaxed">
            실제 상담에서 자주 나오는 유형을 익명 사례로 정리했습니다. <br className="hidden sm:inline" />
            사업형태와 향후 계획에 맞춰 법인설립·성장 방향을 함께 검토합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-10">
          {CASES.map((item) => (
            <div
              key={item.id}
              id={`case-card-${item.caseNo}`}
              className="bg-[#F7F9FC] rounded-2xl p-6 sm:p-7 border border-slate-200 hover:border-blue-300 hover:bg-white transition-all duration-200 flex flex-col justify-between hover:shadow-lg group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-black text-xs text-[#2563EB] shadow-2xs">
                      {item.caseNo}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700">
                      {item.clientType}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-slate-200">
                    {getCaseIcon(item.clientType)}
                  </div>
                </div>

                <h3 className="text-xl font-black text-[#0B1F3A] tracking-tight mb-4 group-hover:text-[#2563EB] transition-colors">
                  {item.title}
                </h3>

                <div className="mb-4 p-3.5 rounded-xl bg-white border border-blue-100">
                  <div className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>실제 사례 요약</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {item.casePreview}
                  </p>
                </div>

                <div className="mb-5 pb-4 border-b border-slate-200/80">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                    <span>상황</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-800 leading-relaxed">{item.situation}</p>
                </div>

                <div className="mb-5 pb-4 border-b border-slate-200/80">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">주요 고민</div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.concerns.map((concern) => (
                      <span
                        key={concern}
                        className="text-xs font-bold px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700"
                      >
                        #{concern}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Workflow className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>진행 단계</span>
                  </div>
                  <div className="space-y-1.5">
                    {item.processSteps.map((step, sIdx) => (
                      <div key={step} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <span className="w-4 h-4 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center text-[10px] font-bold shrink-0">
                          {sIdx + 1}
                        </span>
                        <span className="text-slate-800">{step}</span>
                        {sIdx < item.processSteps.length - 1 && (
                          <ArrowRight className="w-3 h-3 text-slate-300 ml-auto shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setSelected(item)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-[#0B1F3A] hover:text-[#2563EB] font-bold text-xs sm:text-sm transition-all shadow-2xs"
                >
                  <span>실제 사례 자세히 보기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center max-w-3xl mx-auto flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
          <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
          <span>
            본 내용은 비즈온탑의 실제 상담 유형 및 프로세스를 바탕으로 구성된 상담 유형 예시이며, 고객사의 정보 보호를
            위해 익명화 처리되었습니다.
          </span>
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="닫기"
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex-1 overflow-y-auto pr-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center font-black text-xs text-[#2563EB]">
                  {selected.caseNo}
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 text-[#2563EB] border border-blue-100">
                  {selected.clientType}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight mb-2 pr-8">
                {selected.title}
              </h3>
              <p className="text-sm font-semibold text-slate-600 mb-5">{selected.situation}</p>

              <div className="space-y-5 text-sm text-slate-700 leading-relaxed">
                <div className="space-y-2">
                  <h4 className="text-base font-black text-[#0B1F3A]">배경</h4>
                  <p className="text-slate-600">{selected.caseStory.background}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-base font-black text-[#0B1F3A]">주요 고민</h4>
                  <p className="text-slate-600">{selected.caseStory.challenge}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selected.concerns.map((c) => (
                      <span
                        key={c}
                        className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-700"
                      >
                        #{c}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-base font-black text-[#0B1F3A]">비즈온탑 진행 내용</h4>
                  <ul className="space-y-1.5">
                    {selected.caseStory.approach.map((a) => (
                      <li key={a} className="flex items-start gap-2 text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="text-base font-black text-[#0B1F3A]">결과</h4>
                  <p className="text-slate-600">{selected.caseStory.result}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">진행 단계</div>
                  <div className="flex flex-wrap gap-2">
                    {selected.processSteps.map((step, idx) => (
                      <span
                        key={step}
                        className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700"
                      >
                        <span className="text-[#2563EB]">{idx + 1}</span>
                        {step}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-500 bg-amber-50 border border-amber-100 rounded-xl px-3.5 py-3">
                  고객 식별이 가능한 정보는 모두 익명·재구성되었습니다. 동일 업종이라도 조건에 따라 진행과 결과가 달라질
                  수 있습니다.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    const title = selected.title;
                    setSelected(null);
                    onOpenConsultation(`${title} 유사 사례 상담`);
                  }}
                  className="flex-1 min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all"
                >
                  <span>이와 유사한 사례 상담하기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="min-h-[48px] px-6 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
