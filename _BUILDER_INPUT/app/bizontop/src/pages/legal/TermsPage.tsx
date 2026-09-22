import React from 'react';
import { FileText, ArrowLeft, Building2, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../../components/layout/PageLayout';
import { SEO } from '../../components/common/SEO';
import { siteSettingsService } from '../../services/siteSettingsService';

export const TermsPage: React.FC = () => {
  const settings = siteSettingsService.getSettings();

  return (
    <PageLayout>
      <SEO
        title="이용약관"
        description="비즈온탑(BIZ ON TOP)의 서비스 이용약관입니다. 기업 고객님께 안전하고 신뢰할 수 있는 자문 서비스를 제공합니다."
        canonical="https://bizontop.co.kr/terms"
      />

      <div className="bg-slate-50 py-12 md:py-16">
        <div className="container-custom max-w-4xl">
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#2563EB] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              메인 홈페이지로 돌아가기
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-8 text-slate-700">
            {/* Header */}
            <div className="border-b border-slate-100 pb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold mb-3">
                <FileText className="w-4 h-4 text-[#2563EB]" />
                <span>기업 자문 및 컨설팅 서비스 이용 규약</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#102B50] tracking-tight">
                서비스 이용약관
              </h1>
              <p className="text-xs text-slate-400 mt-2">
                시행일자: 2025년 01월 01일 (최종 개정일: 2026년 03월 21일)
              </p>
            </div>

            <div className="space-y-6 text-xs sm:text-sm leading-relaxed">
              <section className="space-y-2">
                <h2 className="text-base font-bold text-[#102B50]">
                  제1조 (목적)
                </h2>
                <p className="text-slate-600">
                  본 약관은 <strong>{settings.corpName}</strong>(이하 "회사")이 운영하는 비즈온탑 웹사이트(이하 "사이트")에서 제공하는 기업 컨설팅 및 제반 정보 서비스(이하 "서비스")를 이용함에 있어 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-[#102B50]">
                  제2조 (서비스의 내용 및 성격)
                </h2>
                <p className="text-slate-600">
                  회사가 제공하는 서비스는 중소기업 및 소상공인을 위한 정책자금 융자 연계 자문, 기업인증(벤처, 연구소, 메인/이노비즈 등) 취득 자문 및 경영컨설팅입니다.
                </p>
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200/80 text-amber-900 text-xs leading-relaxed">
                  <strong>[보증 및 확약의 배제 고지]</strong><br />
                  정책자금 및 기업인증 심사는 정부 부처 및 공공 심사기관(중진공, 소진공, 보증기금 등)의 고유 권한입니다. 비즈온탑은 기업의 사전 요건 점검과 서류 준비를 지원하는 전문 자문 용역을 제공하며, 어떠한 경우에도 100% 대출 승인이나 인증 합격을 임의로 확약하거나 보장하지 않습니다.
                </div>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-[#102B50]">
                  제3조 (이용자의 의무)
                </h2>
                <p className="text-slate-600">
                  이용자는 상담 신청 및 서비스 이용 시 본인 또는 소속 기업의 진실된 정보를 제공하여야 하며, 허위 정보 또는 타인의 명의를 도용하여서는 아니 됩니다. 허위 정보 제공으로 인한 불이익은 전적으로 이용자 본인에게 있습니다.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-[#102B50]">
                  제4조 (회사의 의무 및 비밀유지)
                </h2>
                <p className="text-slate-600">
                  회사는 관련 법령과 본 약관이 금지하거나 미풍양속에 반하는 행위를 하지 않으며, 지속적이고 안정적으로 서비스를 제공하기 위하여 최선을 다합니다. 또한 상담 과정에서 취득한 고객사의 재무 정보, 기술 정보 및 영업 비밀을 제3자에게 누설하지 아니합니다.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-[#102B50]">
                  제5조 (면책조항)
                </h2>
                <p className="text-slate-600">
                  회사는 천재지변, 정부의 정책 변화, 관련 법령의 개정 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-[#102B50]">
                  제6조 (분쟁의 해결)
                </h2>
                <p className="text-slate-600">
                  회사와 이용자 간에 발생한 전자상거래 및 자문 용역 관련 분쟁에 관한 소송은 회사의 본사 소재지를 관할하는 법원을 전속 관할법원으로 합니다.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
