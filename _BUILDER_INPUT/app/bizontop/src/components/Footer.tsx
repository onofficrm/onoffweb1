import React from 'react';
import { PhoneCall, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenConsultation: () => void;
  onOpenDiagnosis: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenConsultation,
  onOpenDiagnosis,
}) => {
  const footerNavLinks = [
    { label: '법인설립', href: '#how-it-works-section' },
    { label: '법인전환', href: '#consulting-cases-section' },
    { label: '기업지원', href: '#after-incorporation-section' },
    { label: '진행사례', href: '#consulting-cases-section' },
    { label: '정보센터', href: '#business-insights-section' },
    { label: '회사소개', href: '#trust-section' },
  ];

  return (
    <footer 
      id="site-footer"
      className="bg-[#071426] text-slate-400 text-xs border-t border-slate-800/80 pt-14 pb-24 lg:pb-14"
      aria-label="사이트 푸터 정보"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top: Logo, Description & Menu Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/90">
          
          {/* Left Block: Logo & Description (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 19L12 5L20 19H14.5L12 14.5L9.5 19H4Z" fill="currentColor" />
                  <path d="M12 9.5L15 15H9L12 9.5Z" fill="#F4A62A" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white tracking-tight">비즈온탑</span>
                <span className="text-[11px] text-blue-300 font-semibold tracking-wider uppercase">BIZONTOP CORP</span>
              </div>
            </div>

            <p className="text-sm text-slate-300 font-normal leading-relaxed max-w-sm">
              법인설립부터 기업성장까지 <br />
              비즈온탑이 함께합니다.
            </p>

            <div className="pt-2 flex items-center gap-2.5">
              <button
                type="button"
                onClick={onOpenDiagnosis}
                className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs transition-colors"
              >
                3분 법인설립 진단하기
              </button>
              <button
                type="button"
                onClick={onOpenConsultation}
                className="px-3.5 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-xs transition-colors"
              >
                무료상담 신청하기
              </button>
            </div>
          </div>

          {/* Center-Right Block: Navigation Menu (3 Cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-sm mb-3.5 tracking-tight">
              바로가기 메뉴
            </h4>
            <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-sm">
              {footerNavLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-slate-300 hover:text-white hover:underline transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Block: Consultation Hours (4 Cols) */}
          <div className="lg:col-span-4 space-y-2.5">
            <h4 className="text-white font-bold text-sm mb-3 tracking-tight">
              전문가 상담센터
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              온라인 3분 진단 및 무료상담 신청은 24시간 상시 접수 가능하며, 전담 매니저 확인 후 신속하게 연락드립니다.
            </p>
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1 text-slate-300">
              <div className="text-xs font-semibold text-white">상담 운영시간: 평일 09:30 ~ 18:30</div>
              <div className="text-[11px] text-slate-400">점심시간: 12:00 ~ 13:00 (주말 및 공휴일 휴무)</div>
            </div>
          </div>

        </div>

        {/* Middle: Company Legal Info (Explicit Placeholders) */}
        <div className="py-8 border-b border-slate-800/80 space-y-3">
          <h4 className="text-slate-200 font-bold text-xs uppercase tracking-wider">
            회사 정보
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1.5 text-xs text-slate-400 leading-relaxed">
            <div><span className="text-slate-500 font-medium">회사명:</span> 주식회사 비즈온탑 (사업자 등록 준비 중)</div>
            <div><span className="text-slate-500 font-medium">대표자:</span> 대표이사 (설립 등기 준비 중)</div>
            <div><span className="text-slate-500 font-medium">사업자등록번호:</span> 등록 심사 중 (Placeholder)</div>
            <div><span className="text-slate-500 font-medium">주소:</span> 서울특별시 강남구 테헤란로 (사업장 등록 준비 중)</div>
            <div><span className="text-slate-500 font-medium">대표전화:</span> 1600-0000 (온라인 상담 접수 중)</div>
            <div><span className="text-slate-500 font-medium">이메일:</span> contact@bizontop.co.kr (임시 문의 창구)</div>
          </div>
          <p className="text-[11px] text-slate-500 pt-2 leading-relaxed">
            ※ 비즈온탑은 기업 고객의 설립 지원 및 경영 컨설팅을 제공하며, 법무사 및 세무사의 전담 법정 업무(등기 대리, 세무 대리)는 관련 법률에 의거하여 제휴된 법무사 및 세무사가 적법하게 수행합니다.
          </p>
        </div>

        {/* Bottom: Policies & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <button 
              type="button" 
              onClick={() => alert('개인정보처리방침: 고객의 개인정보는 상담 목적 외에 제3자에게 제공되지 않으며 관련 법령에 따라 안전하게 파기됩니다.')}
              className="text-slate-400 hover:text-white underline underline-offset-2 transition-colors"
            >
              개인정보처리방침
            </button>
            <span>•</span>
            <button 
              type="button" 
              onClick={() => alert('이용약관: 본 서비스의 이용에 관한 권리와 의무를 규정합니다.')}
              className="text-slate-400 hover:text-white underline underline-offset-2 transition-colors"
            >
              이용약관
            </button>
          </div>

          <div className="font-medium text-slate-400">
            Copyright © BizOnTop. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};
