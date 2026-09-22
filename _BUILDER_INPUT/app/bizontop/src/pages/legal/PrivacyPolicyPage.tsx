import React from 'react';
import { ShieldCheck, Lock, FileText, ArrowLeft, Building2, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../../components/layout/PageLayout';
import { SEO } from '../../components/common/SEO';
import { siteSettingsService } from '../../services/siteSettingsService';

export const PrivacyPolicyPage: React.FC = () => {
  const settings = siteSettingsService.getSettings();

  return (
    <PageLayout>
      <SEO
        title="개인정보처리방침"
        description="비즈온탑(BIZ ON TOP)의 개인정보처리방침입니다. 고객님의 소중한 기업 및 개인 정보를 안전하게 보호합니다."
        canonical="https://bizontop.co.kr/privacy"
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] text-xs font-bold mb-3">
                <ShieldCheck className="w-4 h-4" />
                <span>개인정보보호법 및 관계 법령 준수</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#102B50] tracking-tight">
                개인정보처리방침
              </h1>
              <p className="text-xs text-slate-400 mt-2">
                시행일자: 2025년 01월 01일 (최종 개정일: 2026년 03월 21일)
              </p>
            </div>

            {/* Intro */}
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
              <strong>{settings.corpName}</strong>(이하 "회사" 또는 "비즈온탑")은 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여, 적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다. 이에 「개인정보 보호법」 제30조에 따라 정보주체에게 개인정보 처리에 관한 절차 및 기준을 안내하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
            </p>

            {/* Clauses */}
            <div className="space-y-6 text-xs sm:text-sm leading-relaxed">
              <section className="space-y-2">
                <h2 className="text-base font-bold text-[#102B50]">
                  제1조 (개인정보의 처리 목적)
                </h2>
                <p className="text-slate-600">
                  회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>
                    <strong>무료 기업상담 및 자금·인증 진단:</strong> 중소기업 정책자금 융자, 국가공인 기업인증, 경영컨설팅 관련 신청 자격 심사, 1:1 담당 컨설턴트 매칭, 유선/방문 상담 진행.
                  </li>
                  <li>
                    <strong>회원 가입 및 관리:</strong> 회원제 서비스 이용에 따른 본인확인, 개인식별, 가입의사 확인, 상담 진행 내역 및 마이페이지 이력 관리.
                  </li>
                  <li>
                    <strong>마케팅 및 정책정보 제공 (선택동의 시):</strong> 정부 지원 신규 공고, 세제 혜택 가이드라인 안내(동의 철회 가능).
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-[#102B50]">
                  제2조 (처리하는 개인정보의 항목)
                </h2>
                <p className="text-slate-600">
                  회사는 서비스 제공을 위해 다음과 같은 개인정보 항목을 수집·처리하고 있습니다.
                </p>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div>
                    <strong className="text-slate-800">[상담 신청 시 필수항목]</strong>
                    <p className="text-slate-600">
                      기업명, 대표자/담당자 성함, 연락처(휴대전화번호), 이메일, 사업장 소재지, 설립연도, 연매출 규모, 관심 서비스
                    </p>
                  </div>
                  <div>
                    <strong className="text-slate-800">[선택항목]</strong>
                    <p className="text-slate-600">
                      사업자등록번호, 희망 자금 규모, 상세 상담 요청사항, 마케팅 수신 동의 여부
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-[#102B50]">
                  제3조 (개인정보의 처리 및 보유 기간)
                </h2>
                <p className="text-slate-600">
                  회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>
                    <strong>상담 신청 정보:</strong> 상담 신청일로부터 3년 (상담 이력 조회 및 사후 자금 컨설팅 목적, 고객 요청 시 즉시 파기)
                  </li>
                  <li>
                    <strong>회원 정보:</strong> 회원 탈퇴 시까지 (관계 법령에 따라 보존할 필요가 있는 경우 해당 법정 기간 동안 보관)
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-[#102B50]">
                  제4조 (개인정보의 제3자 제공 금지)
                </h2>
                <p className="text-slate-600">
                  회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다. 어떠한 경우에도 외부 대출 중개업체 등에 개인정보를 임의로 판매하거나 위탁하지 않습니다.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-[#102B50]">
                  제5조 (개인정보의 파기절차 및 파기방법)
                </h2>
                <p className="text-slate-600">
                  회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
                </p>
                <p className="text-slate-600">
                  전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제하며, 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-[#102B50]">
                  제6조 (개인정보보호책임자 및 권익침해 구제방법)
                </h2>
                <p className="text-slate-600">
                  회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보보호책임자를 지정하고 있습니다.
                </p>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <p><strong>상호:</strong> {settings.corpName}</p>
                  <p><strong>개인정보보호책임자:</strong> {settings.privacyOfficer}</p>
                  <p><strong>대표 전화:</strong> {settings.tel}</p>
                  <p><strong>대표 이메일:</strong> {settings.email}</p>
                  <p><strong>주소:</strong> {settings.address}</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
