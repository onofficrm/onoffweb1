import React from 'react';
import { Building2, ShieldCheck, Mail, Phone, Clock } from 'lucide-react';

interface FooterProps {
  onOpenConsultation: () => void;
  onOpenDiagnosis: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation, onOpenDiagnosis }) => {
  const menuLinks = [
    { label: '법인설립', href: '#incorporation' },
    { label: '법인전환', href: '#comparison' },
    { label: '진행사례', href: '#cases' },
    { label: '기업지원', href: '#post-support' },
    { label: '3분 무료진단', href: '#diagnosis' },
    { label: '최신정보', href: '#insights' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleScrollTo = (href: string) => {
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="main-footer" className="w-full bg-[#0B1F3A] text-white pt-14 pb-24 sm:pb-14 border-t border-slate-800">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800/80">
          {/* Left: 비즈온탑 로고 & 설명 */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2.5 mb-3.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-xs">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[21px] font-black tracking-tight text-white">비즈온탑</span>
                <span className="text-[10.5px] font-bold text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded-sm border border-blue-800/50">
                  BIZ ON TOP
                </span>
              </div>
            </div>
            <p className="text-[15px] font-bold text-white mb-2">
              법인설립부터 기업성장까지 비즈온탑이 함께합니다.
            </p>
            <p className="text-[13.5px] text-slate-400 leading-relaxed max-w-sm mb-4">
              창업 초기 지분 설계와 정관 작성, 전자등기부터 설립 후 정책자금과 기업인증까지 
              기업의 전 주기를 함께하는 전문 컨설팅 파트너입니다.
            </p>
            <div className="flex items-center gap-2 text-[12.5px] text-slate-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
              <span>법무사 · 세무사 · 전문 컨설턴트 원스톱 협력 시스템</span>
            </div>
          </div>

          {/* Center: 메뉴 6개 (법인설립, 법인전환, 기업지원, 진행사례, 정보센터, 회사소개) */}
          <div className="md:col-span-3 text-[14px]">
            <h4 className="font-bold text-white mb-3.5 text-[14.5px] tracking-wide">
              바로가기
            </h4>
            <ul className="space-y-2.5 text-slate-400">
              {menuLinks.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => handleScrollTo(item.href)}
                    className="hover:text-blue-400 text-left transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: 회사정보 영역 (정확한 Placeholder 처리, 임의 번호 조작 금지) */}
          <div className="md:col-span-5 text-[13px] text-slate-400">
            <h4 className="font-bold text-white mb-3.5 text-[14.5px] tracking-wide">
              회사 정보
            </h4>
            <div className="space-y-2 mb-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                <div>
                  <span className="text-slate-500">회사명: </span>
                  <span className="text-slate-300 font-medium">(주)비즈온탑</span>
                </div>
                <div>
                  <span className="text-slate-500">대표자: </span>
                  <span className="text-slate-300 font-medium">대표자명 [등록예정]</span>
                </div>
                <div>
                  <span className="text-slate-500">사업자등록번호: </span>
                  <span className="text-slate-300 font-medium">[사업자등록번호 준비중]</span>
                </div>
                <div>
                  <span className="text-slate-500">통신판매업신고: </span>
                  <span className="text-slate-300 font-medium">[신고 준비중]</span>
                </div>
              </div>
              <div className="pt-1 text-[12.5px]">
                <span className="text-slate-500">주소: </span>
                <span className="text-slate-300 font-medium">서울특별시 강남구 테헤란로 일원 (사업장 소재지 준비중)</span>
              </div>
              <div className="pt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px]">
                <div>
                  <span className="text-slate-500">대표전화: </span>
                  <span className="text-slate-300 font-bold">1544-0000 (온라인 상담 상시 접수)</span>
                </div>
                <div>
                  <span className="text-slate-500">이메일: </span>
                  <span className="text-slate-300">support@bizontop.co.kr</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenDiagnosis}
                className="px-3.5 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 hover:text-white border border-blue-500/30 text-[12.5px] font-semibold transition-colors cursor-pointer"
              >
                3분 법인설립 진단하기
              </button>
              <button
                type="button"
                onClick={onOpenConsultation}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-[12.5px] font-semibold transition-colors cursor-pointer"
              >
                무료상담 신청하기
              </button>
            </div>
          </div>
        </div>

        {/* Bottom: 개인정보처리방침 / 이용약관 / Copyright © BizOnTop. */}
        <div className="pt-6 text-[12px] text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-slate-400 font-medium">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
              개인정보처리방침
            </a>
            <span className="text-slate-700">|</span>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
              이용약관
            </a>
            <span className="text-slate-700">|</span>
            <span className="text-slate-500">상담운영시간: 평일 09:30 ~ 18:00</span>
          </div>

          <p className="text-slate-400 font-medium">
            Copyright © BizOnTop. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
