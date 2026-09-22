import React from 'react';
import { Bus, Car, Clock, Mail, MapPin, Phone, ShieldCheck, Train } from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Card } from '../../components/ui/Card';
import { FOOTER_INFO } from '../../data/navigation';

interface PageProps {
  onOpenConsultation: () => void;
}

const subNav = [
  { label: '비즈온탑 소개', href: '/about' },
  { label: '대표 인사말', href: '/about/greeting' },
  { label: '컨설팅 프로세스', href: '/about/process' },
  { label: '오시는 길', href: '/about/location', active: true },
];

export const AboutLocationPage: React.FC<PageProps> = ({ onOpenConsultation }) => {
  return (
    <PageLayout
      categoryName="회사소개"
      categoryHref="/about"
      title="오시는 길"
      subtitle="비즈온탑 본사 방문 상담 안내 및 대중교통 이용 방법입니다."
      breadcrumbs={[{ label: '오시는 길' }]}
      subNavigation={subNav}
      onOpenConsultation={onOpenConsultation}
    >
      <div className="space-y-10">
        {/* Contact Quick Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card className="flex items-start gap-4 border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">본사 소재지</span>
              <span className="text-sm font-bold text-[#102B50] block mt-0.5">
                {FOOTER_INFO.companyInfo.address}
              </span>
              <span className="text-[11px] text-slate-500">지하철역 도보 3분 거리</span>
            </div>
          </Card>

          <Card className="flex items-start gap-4 border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D5A64B] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-[#BF9137]" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">상담 직통 대표전화</span>
              <span className="text-sm font-bold text-[#102B50] block mt-0.5">
                {FOOTER_INFO.companyInfo.tel}
              </span>
              <span className="text-[11px] text-slate-500">전문 상담원 즉시 연결</span>
            </div>
          </Card>

          <Card className="flex items-start gap-4 border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#102B50] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">상담 가능 시간</span>
              <span className="text-sm font-bold text-[#102B50] block mt-0.5">
                평일 09:00 ~ 18:00
              </span>
              <span className="text-[11px] text-slate-500">주말/공휴일 온라인 접수 가능</span>
            </div>
          </Card>
        </div>

        {/* Map Preview Placeholder & Directions */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          {/* Map Graphic Area */}
          <div className="h-72 bg-gradient-to-br from-slate-100 to-slate-200 relative flex items-center justify-center border-b border-slate-200">
            <div className="text-center space-y-2 p-6 bg-white/90 backdrop-blur-sm rounded-xl border border-slate-200 shadow-md max-w-sm">
              <div className="w-10 h-10 rounded-full bg-[#102B50] text-[#D5A64B] flex items-center justify-center mx-auto">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-[#102B50]">
                비즈온탑 경영컨설팅 본사
              </h4>
              <p className="text-xs text-slate-600">
                주소: {FOOTER_INFO.companyInfo.address}
              </p>
              <div className="pt-1">
                <span className="text-[10px] text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                  대면 방문 상담은 사전 예약제로 운영됩니다
                </span>
              </div>
            </div>
          </div>

          {/* Transport Info */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[#102B50]">
                <Train className="w-4 h-4 text-[#2563EB]" />
                <span>지하철 이용 시</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                주요 역 3번 출구에서 도보 약 150m 직진, 비즈온탑 빌딩 7층 컨설팅 상담실로 내방해 주시면 됩니다.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[#102B50]">
                <Bus className="w-4 h-4 text-[#2563EB]" />
                <span>버스 이용 시</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                간선 및 지선 버스 정류장 하차 후 횡단보도 이용 도보 2분 거리.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[#102B50]">
                <Car className="w-4 h-4 text-[#2563EB]" />
                <span>자가용 / 주차 안내</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                건물 내 지하 자주식 주차장 완비 (상담 고객 대상 2시간 무료 주차권 제공)
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
