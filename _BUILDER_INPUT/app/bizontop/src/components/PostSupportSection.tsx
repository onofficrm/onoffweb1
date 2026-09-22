import React from 'react';
import { 
  Coins, 
  Award, 
  FlaskConical, 
  Microscope, 
  Sparkles, 
  Building, 
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

interface PostSupportSectionProps {
  onOpenConsultation: (category: string) => void;
}

interface SupportCard {
  id: string;
  name: string;
  enName: string;
  desc: string;
  icon: React.ElementType;
  keyBenefit: string;
}

export const PostSupportSection: React.FC<PostSupportSectionProps> = ({ onOpenConsultation }) => {
  const supportCards: SupportCard[] = [
    {
      id: 'support-funds',
      name: '정책자금',
      enName: 'Policy Funds',
      desc: '중소벤처기업진흥공단, 기술보증기금, 신용보증기금 등 설립 초기 운전자금 및 시설자금 지원제도',
      icon: Coins,
      keyBenefit: '운전자금 및 저금리 융자/보증 연계 검토',
    },
    {
      id: 'support-venture',
      name: '벤처기업확인',
      enName: 'Venture Business',
      desc: '혁신성장유형 및 벤처투자유형 확인을 통한 취득세/재산세 및 법인세 세제 감면 혜택',
      icon: Award,
      keyBenefit: '법인세 최대 50% 감면 및 정부 R&D 가점',
    },
    {
      id: 'support-lab',
      name: '기업부설연구소',
      enName: 'R&D Center',
      desc: '연구개발 전담 인력 및 독립 연구공간을 갖춘 기업을 위한 한국산업기술진흥협회(KOITA) 인증',
      icon: FlaskConical,
      keyBenefit: '연구인력개발비 세액공제 및 전문연구요원 지정',
    },
    {
      id: 'support-dept',
      name: '연구개발전담부서',
      enName: 'R&D Department',
      desc: '연구원 1인 이상 소규모 기업도 설립 가능한 초기 기술기반 기업 대상 R&D 전담 조직 인증',
      icon: Microscope,
      keyBenefit: '설립 요건 완화 및 R&D 세액공제 동일 적용',
    },
    {
      id: 'support-innobiz',
      name: '이노비즈',
      enName: 'Inno-Biz',
      desc: '기술 경쟁력과 미래 성장성을 갖춘 업력 3년 이상 기술혁신형 중소기업 인증 제도',
      icon: Sparkles,
      keyBenefit: '금융 우대지원, R&D 우선선정, 판로개척',
    },
    {
      id: 'support-mainbiz',
      name: '메인비즈',
      enName: 'Main-Biz',
      desc: '경영혁신 활동을 통해 마케팅, 조직, 프로세스 등 혁신성을 인정받은 경영혁신형 중소기업 인증',
      icon: Building,
      keyBenefit: '신보 보증료율 감면 및 금리우대 혜택',
    },
  ];

  return (
    <section
      id="post-support"
      className="w-full bg-gradient-to-b from-[#0B1F3A] to-[#0A192F] text-white py-18 sm:py-24 lg:py-28 border-b border-slate-800 scroll-mt-20"
    >
      <div className="w-full max-w-[1560px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-14 sm:mb-18">
          <div
            id="post-support-eyebrow"
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[12.5px] sm:text-[13.5px] font-semibold tracking-wider mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span>AFTER INCORPORATION</span>
          </div>

          <h2
            id="post-support-main-title"
            className="text-[32px] sm:text-[42px] md:text-[46px] font-black text-white tracking-tight leading-[1.2] mb-5"
          >
            법인설립이 끝이 아닙니다.
            <br />
            기업의 성장은 그 이후부터 시작됩니다.
          </h2>

          <p
            id="post-support-description"
            className="text-[16px] sm:text-[18px] text-slate-300 leading-relaxed max-w-3xl mx-auto"
          >
            기업의 업종, 업력, 재무상태, 연구개발 현황 등에 따라 활용할 수 있는
            기업지원제도가 달라집니다.
          </p>
        </div>

        {/* 6 Support Cards Grid */}
        <div
          id="post-support-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12"
        >
          {supportCards.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                id={item.id}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/50 rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between backdrop-blur-xs group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-400/30 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-500 group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[12px] font-bold text-slate-400 tracking-wider">
                      {item.enName}
                    </span>
                  </div>

                  <h3 className="text-[19px] sm:text-[20px] font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-[13.5px] text-slate-300 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <div className="flex items-center gap-1.5 text-[12.5px] text-blue-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>{item.keyBenefit}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Important Disclaimer Notice (Compliant with constraints) */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 mb-10 max-w-3xl mx-auto flex items-start gap-3.5 text-slate-300 text-[13px] sm:text-[13.5px] leading-relaxed">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block mb-0.5">기업지원제도 안내 시 유의사항</strong>
            각 기업지원제도는 기업의 실제 요건(재무상황, 업종, 기술성 평가, 대표자 이력 등)과 공고 시기별 주관기관의 정책 방향에 따라 적용 가능 여부가 상이할 수 있습니다. 비즈온탑은 객관적인 사전 요건 검토를 통해 실현 가능한 제도를 정직하게 안내해드립니다.
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => onOpenConsultation('기업지원/정책자금')}
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-[16px] font-bold text-white bg-[#2563EB] hover:bg-blue-600 active:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all cursor-pointer focus:ring-4 focus:ring-blue-400/20"
          >
            <span>무료상담 신청하기</span>
            <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
