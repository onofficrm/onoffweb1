import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Clock,
  Headphones,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { FOOTER_INFO, NAVIGATION_DATA } from '../../data/navigation';
import { Modal } from '../ui/Modal';

export const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer className="bg-[#102B50] text-slate-300 pt-14 pb-12 border-t border-[#1A3E6D]">
      <div className="container-custom">
        {/* Top Grid: Brand & Navigation Shortcuts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-700/60">
          {/* Brand & Mission (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <span className="font-extrabold text-base text-[#D5A64B]">B</span>
                <span className="font-bold text-xs text-white">T</span>
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white block">
                  BIZ ON TOP
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  {FOOTER_INFO.slogan}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              {FOOTER_INFO.description}
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#D5A64B]" />
                <span>정보보호 관리체계 준수</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#D5A64B]" />
                <span>중소벤처기업 전문자문</span>
              </div>
            </div>
          </div>

          {/* Service Links (5 Cols) */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-6">
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D5A64B]"></span>
                <Link to="/funding" className="hover:text-white transition-colors">
                  정책자금
                </Link>
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link to="/funding/small-business" className="hover:text-white transition-colors">
                    소상공인 정책자금
                  </Link>
                </li>
                <li>
                  <Link to="/funding/sme" className="hover:text-white transition-colors">
                    중소기업 정책자금
                  </Link>
                </li>
                <li>
                  <Link to="/funding/startup" className="hover:text-white transition-colors">
                    창업기업 특화자금
                  </Link>
                </li>
                <li>
                  <Link to="/funding/working-capital" className="hover:text-white transition-colors">
                    운전자금 컨설팅
                  </Link>
                </li>
                <li>
                  <Link to="/funding/facility" className="hover:text-white transition-colors">
                    시설자금 조달
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D5A64B]"></span>
                <Link to="/certification" className="hover:text-white transition-colors">
                  기업인증
                </Link>
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link to="/certification/venture" className="hover:text-white transition-colors">
                    벤처기업확인
                  </Link>
                </li>
                <li>
                  <Link to="/certification/research-center" className="hover:text-white transition-colors">
                    기업부설연구소
                  </Link>
                </li>
                <li>
                  <Link to="/certification/research-department" className="hover:text-white transition-colors">
                    연구개발전담부서
                  </Link>
                </li>
                <li>
                  <Link to="/certification/iso" className="hover:text-white transition-colors">
                    ISO 국제인증
                  </Link>
                </li>
                <li>
                  <Link to="/certification/mainbiz" className="hover:text-white transition-colors">
                    메인비즈 인증
                  </Link>
                </li>
                <li>
                  <Link to="/certification/innobiz" className="hover:text-white transition-colors">
                    이노비즈 인증
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D5A64B]"></span>
                <Link to="/consulting" className="hover:text-white transition-colors">
                  경영컨설팅
                </Link>
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link to="/consulting/incorporation" className="hover:text-white transition-colors">
                    법인설립 및 전환
                  </Link>
                </li>
                <li>
                  <Link to="/consulting/integrated" className="hover:text-white transition-colors">
                    통합경영자문
                  </Link>
                </li>
                <li>
                  <Link to="/consulting/real-estate" className="hover:text-white transition-colors">
                    부동산/사옥자금
                  </Link>
                </li>
                <li>
                  <Link to="/consulting/finance" className="hover:text-white transition-colors">
                    가지급금/재무개선
                  </Link>
                </li>
                <li>
                  <Link to="/consulting/growth" className="hover:text-white transition-colors">
                    기업성장전략
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Customer Service & Operating Hours (3 Cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
              <Headphones className="w-4 h-4 text-[#D5A64B]" />
              고객센터 안내
            </h4>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-white">
                <Phone className="w-4 h-4 text-[#D5A64B]" />
                <span className="text-lg font-black tracking-tight">{FOOTER_INFO.companyInfo.tel}</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <Clock className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                <span>{FOOTER_INFO.companyInfo.operatingHours}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{FOOTER_INFO.companyInfo.email}</span>
              </div>
            </div>
            <Link
              to="/support/inquiry"
              className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold py-2.5 px-4 rounded-lg bg-[#D5A64B] text-[#102B50] hover:bg-[#C29338] transition-colors"
            >
              온라인 무료 상담 신청 바로가기 →
            </Link>
          </div>
        </div>

        {/* Business Info & Legal Disclaimers (관리자 설정값으로 안전하게 표시) */}
        <div className="pt-8 space-y-4">
          {/* Policy Links */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
            <button
              onClick={() => setActiveModal('privacy')}
              className="text-white hover:underline cursor-pointer font-bold"
            >
              개인정보처리방침
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => setActiveModal('terms')}
              className="hover:text-white hover:underline cursor-pointer"
            >
              이용약관
            </button>
            <span className="text-slate-600">|</span>
            <Link to="/about/location" className="hover:text-white transition-colors">
              찾아오시는 길
            </Link>
            <span className="text-slate-600">|</span>
            <Link to="/support/faq" className="hover:text-white transition-colors">
              자주 묻는 질문
            </Link>
          </div>

          {/* Business Details (User requirement: 미확정 정보는 임의로 생성하지 않고 관리자 설정값으로 표시) */}
          <div className="text-[11px] text-slate-400 space-y-1.5 leading-relaxed">
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              <span>상호명: {FOOTER_INFO.companyInfo.corpName}</span>
              <span className="text-slate-600">|</span>
              <span>대표자: {FOOTER_INFO.companyInfo.ceo}</span>
              <span className="text-slate-600">|</span>
              <span>사업자등록번호: {FOOTER_INFO.companyInfo.businessNumber}</span>
              <span className="text-slate-600">|</span>
              <span>통신판매업신고: {FOOTER_INFO.companyInfo.onlineReportNumber}</span>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              <span>사업장 소재지: {FOOTER_INFO.companyInfo.address}</span>
              <span className="text-slate-600">|</span>
              <span>개인정보보호책임자: {FOOTER_INFO.companyInfo.privacyOfficer}</span>
              <span className="text-slate-600">|</span>
              <span>대표전화: {FOOTER_INFO.companyInfo.tel}</span>
            </div>
            <p className="text-[10px] text-slate-400 pt-1">
              ※ 비즈온탑은 중소벤처기업의 정당한 정책자금 수혜 및 기업인증을 돕는 민간 경영컨설팅 기업이며, 정부 금융기관 및 공공기관의 공식 대리점 또는 독점 위탁 기관이 아닙니다.
            </p>
          </div>

          {/* Copyright */}
          <div className="pt-2 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-700/40">
            <span>© {new Date().getFullYear()} BIZ ON TOP Consulting. All rights reserved.</span>
            <span className="text-[11px]">Design & Build for Excellence</span>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      <Modal
        isOpen={activeModal === 'privacy'}
        onClose={() => setActiveModal(null)}
        title="비즈온탑 개인정보처리방침"
        subtitle="고객님의 소중한 개인정보는 관련 법령에 의거하여 안전하게 관리됩니다."
        maxWidth="lg"
      >
        <div className="text-xs text-slate-700 space-y-3 leading-relaxed">
          <p className="font-bold text-sm text-[#102B50]">제1조 (개인정보 수집 및 이용 목적)</p>
          <p>
            비즈온탑 경영컨설팅(이하 '회사')은 다음의 목적을 위해 개인정보를 수집 및 처리합니다.
            <br />
            1. 정책자금, 기업인증, 경영컨설팅 무료 상담 접수 및 맞춤형 기업 진단 결과 통지
            <br />
            2. 고객 상담 이력 관리 및 원활한 1:1 컨설팅 제공
          </p>

          <p className="font-bold text-sm text-[#102B50]">제2조 (수집하는 개인정보의 항목)</p>
          <p>
            - 필수항목: 기업명, 대표자/담당자 성명, 연락처(휴대폰), 사업장 소재지, 상담 희망 분야
            <br />
            - 선택항목: 이메일, 연매출 규모, 업력, 희망 자금 규모, 문의 상세 내용
          </p>

          <p className="font-bold text-sm text-[#102B50]">제3조 (개인정보의 보유 및 이용 기간)</p>
          <p>
            원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
            단, 관계 법령의 규정에 의하여 보존할 필요가 있는 경우 관련 법령에 명시된 기간 동안 보관합니다.
          </p>

          <div className="pt-4 text-right">
            <button
              onClick={() => setActiveModal(null)}
              className="px-4 py-2 bg-[#102B50] text-white rounded-lg text-xs font-semibold"
            >
              닫기
            </button>
          </div>
        </div>
      </Modal>

      {/* Terms of Service Modal */}
      <Modal
        isOpen={activeModal === 'terms'}
        onClose={() => setActiveModal(null)}
        title="비즈온탑 웹사이트 이용약관"
        subtitle="비즈온탑 홈페이지 서비스 이용에 관한 제반 사항 안내"
        maxWidth="lg"
      >
        <div className="text-xs text-slate-700 space-y-3 leading-relaxed">
          <p className="font-bold text-sm text-[#102B50]">제1조 (목적)</p>
          <p>
            본 약관은 비즈온탑이 제공하는 웹사이트의 제반 서비스 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
          </p>

          <p className="font-bold text-sm text-[#102B50]">제2조 (서비스의 내용)</p>
          <p>
            회사는 웹사이트를 통해 정책자금 정보, 기업인증 가이드, 경영컨설팅 사례 및 무료 상담 신청 서비스를 제공합니다. 본 사이트에 게재된 정책자금 정보는 정부 기관의 공고에 따라 변경될 수 있습니다.
          </p>

          <div className="pt-4 text-right">
            <button
              onClick={() => setActiveModal(null)}
              className="px-4 py-2 bg-[#102B50] text-white rounded-lg text-xs font-semibold"
            >
              닫기
            </button>
          </div>
        </div>
      </Modal>
    </footer>
  );
};
