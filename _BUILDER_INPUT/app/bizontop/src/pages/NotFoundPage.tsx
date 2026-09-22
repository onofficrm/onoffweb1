import React from 'react';
import { Link } from 'react-router-dom';
import { Home, PhoneCall, HelpCircle, ArrowLeft, Search, FileText } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { SEO } from '../components/common/SEO';
import { Button } from '../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <PageLayout>
      <SEO
        title="페이지를 찾을 수 없습니다 (404)"
        description="요청하신 페이지가 삭제되었거나 주소가 변경되었습니다. 비즈온탑 메인 홈페이지 또는 주요 서비스로 이동해 보세요."
      />

      <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-slate-50">
        <div className="max-w-xl w-full bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center shadow-sm space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-50 text-[#2563EB] font-black text-3xl">
            404
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-[#102B50] tracking-tight">
              페이지를 찾을 수 없습니다
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
              입력하신 웹페이지 주소가 올바르지 않거나, 페이지의 이동 또는 삭제로 인해 현재 요청하신 페이지를 표시할 수 없습니다.
            </p>
          </div>

          {/* Quick Links Grid */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            <Link
              to="/"
              className="p-3.5 rounded-xl border border-slate-200 hover:border-[#2563EB] hover:bg-blue-50/50 transition-colors group"
            >
              <Home className="w-4 h-4 text-[#2563EB] mb-2" />
              <div className="text-xs font-bold text-slate-800 group-hover:text-[#2563EB]">
                메인 홈
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">비즈온탑 첫 화면</div>
            </Link>

            <Link
              to="/consultation"
              className="p-3.5 rounded-xl border border-slate-200 hover:border-[#2563EB] hover:bg-blue-50/50 transition-colors group"
            >
              <PhoneCall className="w-4 h-4 text-[#D5A64B] mb-2" />
              <div className="text-xs font-bold text-slate-800 group-hover:text-[#2563EB]">
                상담 신청
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">무료 1:1 맞춤 진단</div>
            </Link>

            <Link
              to="/support/notices"
              className="p-3.5 rounded-xl border border-slate-200 hover:border-[#2563EB] hover:bg-blue-50/50 transition-colors group"
            >
              <FileText className="w-4 h-4 text-purple-600 mb-2" />
              <div className="text-xs font-bold text-slate-800 group-hover:text-[#2563EB]">
                공지사항
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">최신 정책자금 공고</div>
            </Link>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-6 rounded-xl bg-[#102B50] text-white text-xs font-bold hover:bg-[#1A3E6D] transition-colors"
            >
              <Home className="w-4 h-4" />
              홈페이지 메인으로 이동
            </Link>
            <button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              이전 페이지로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
