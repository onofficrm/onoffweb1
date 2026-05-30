/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CORE_INFO } from '../data';
import { Building2, ShieldCheck, Phone, CheckCircle } from 'lucide-react';

interface FooterProps {
  onOpenFaq?: () => void;
  onNavigate?: (sectionId: string) => void;
}

export default function Footer({ onOpenFaq, onNavigate }: FooterProps) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    if (target === 'faq' && onOpenFaq) {
      onOpenFaq();
    } else if (onNavigate) {
      onNavigate(target);
    }
  };

  return (
    <footer id="footer" className="bg-[#050a1a] text-[#8fa0c0] font-sans border-t border-gold-900/30">
      
      {/* Top Banner Notice inside Footer - HUG safety and reservation notice */}
      <div className="bg-[#0c1630] py-8 border-b border-gold-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-left">
          
          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 bg-[#14234c] rounded-xl border border-gold-500/20 text-gold-450 text-gold-400">
              <ShieldCheck className="h-5.5 w-5.5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-white">주택도시보증공사 (HUG) 안심보증</h4>
              <p className="text-xs text-gray-400 mt-0.5 leading-normal">정식 분양 시 안심 보증서 발행으로 투자 보증</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 bg-[#14234c] rounded-xl border border-gold-500/20 text-gold-450 text-gold-400">
              <Phone className="h-5.5 w-5.5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-white">대표 VIP 고객센터</h4>
              <p className="text-xs text-gray-400 mt-0.5 leading-normal">상시 분양 문의 및 일정 안내: {CORE_INFO.phone}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 bg-[#14234c] rounded-xl border border-gold-500/20 text-gold-450 text-gold-400">
              <CheckCircle className="h-5.5 w-5.5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-white">100% 사전 예약 대면상담</h4>
              <p className="text-xs text-gray-400 mt-0.5 leading-normal">안전 관람을 위해 지정 매니저 동행 운영됩니다.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-left">
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 border-b border-gray-800 pb-8">
          {/* Footer Logo */}
          <div className="space-y-1">
            <div className="flex items-center space-x-1.5">
              <span className="font-display text-white text-lg tracking-wider font-extrabold">PRUGIO</span>
              <span className="text-[10px] text-gold-400 border border-gold-400/40 px-1.5 py-0.5 rounded font-bold">LAKE CITY</span>
            </div>
            <p className="text-xs text-gray-450 text-gray-400">천안 업성 푸르지오 레이크시티 프리미엄 아파트 분양홍보관</p>
          </div>

          {/* Quick links disclosure */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-gray-350 text-white animate-sans">
            <a href="#hero" onClick={(e) => handleLinkClick(e, 'hero')} className="hover:text-gold-400 transition-colors">단지소개</a>
            <a href="#concerns" onClick={(e) => handleLinkClick(e, 'concerns')} className="hover:text-gold-400 transition-colors">조망가치</a>
            <a href="#features" onClick={(e) => handleLinkClick(e, 'features')} className="hover:text-gold-400 transition-colors">6대 프리미엄</a>
            <a href="#seo-blog" onClick={(e) => handleLinkClick(e, 'seo-blog')} className="hover:text-gold-400 transition-colors">칼럼센터</a>
            <a href="#faq" onClick={(e) => handleLinkClick(e, 'faq')} className="hover:text-gold-400 transition-colors">자주묻는질문</a>
            <a href="#consultation" onClick={(e) => handleLinkClick(e, 'consultation')} className="hover:text-gold-450 text-gold-400 transition-colors">사전안내예약</a>
          </div>
        </div>

        {/* Corporate specifications & legal compliance text (REQUIRED IN KOREA APARTMENT PRE-SALES) */}
        <div className="space-y-4 text-[11px] text-gray-450 text-gray-400 leading-normal">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <p><strong>단지명:</strong> 천안 업성 푸르지오 레이크시티</p>
            <p><strong>시공예정사:</strong> 대우건설 (푸르지오)</p>
            <p><strong>시행자/위탁사:</strong> (주)업성지구개발 (도시개발법 주체)</p>
            <p><strong>VIP 홍보관 연락처:</strong> {CORE_INFO.phone}</p>
          </div>

          {/* Explicit CG Warning/Disclaimer */}
          <p className="border-l-2 border-gold-700/40 pl-3 pt-1">
            ※ 본 사이트 및 홍보관 상의 모든 이미지, 컴퓨터그래픽(CG), 일러스트, 평면도, 사진 등은 소비자의 이해를 돕기 위해 임의 수립한 조감 및 예시안입니다. 
            이에 따라 최종 사업 승인 완료 여부, 구청 심의 변경 진행 절차 또는 실제 시공 과정에 의해 건물 높이, 도색 색감, 조경 위치, 내부 자재 사양이 전격 상이하거나 전격 취소 및 변형될 수 있으므로, 
            반드시 최종 모집공고 승인 시 원시 문서 내용을 참조해 대조 검토 후 의사결정하시기 바랍니다.
          </p>

          <p>
            ※ 첨부 자료에 수립되는 미확정 모집 가액 및 분양가 금액 일체는 관련 규정 및 법령을 준수해 본 사이트 공적 영역에 임의 노출하지 않으며, 
            가계약 상담 신청 VIP 고객 개별 1:1 맞춤 청약 자격 진단 프로세스 내에서만 참고 수치로 안전하게 안내 제안합니다.
          </p>

          {/* Copyright copyright protection */}
          <div className="pt-4 border-t border-gray-900/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-[10px] text-gray-500">
            <p>© 2026 천안 업성 푸르지오 레이크시티 VIP 공식 프로모션 파트너스. All Rights Reserved.</p>
            <p>Powered by iCRM Hub & SEO/GEO optimization cluster.</p>
          </div>

        </div>

      </div>
    </footer>
  );
}
