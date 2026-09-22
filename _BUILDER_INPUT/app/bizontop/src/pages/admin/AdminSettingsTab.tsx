import React, { useState, useEffect } from 'react';
import {
  Settings,
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Search,
  Globe,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { siteSettingsService, SiteSettings } from '../../services/siteSettingsService';
import { Button } from '../../components/ui/Button';

interface AdminSettingsTabProps {
  onRefresh?: () => void;
}

export const AdminSettingsTab: React.FC<AdminSettingsTabProps> = ({ onRefresh }) => {
  const [settings, setSettings] = useState<SiteSettings>(() =>
    siteSettingsService.getSettings()
  );
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (key: keyof SiteSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    siteSettingsService.updateSettings(settings);
    setSaveSuccess(true);
    if (onRefresh) onRefresh();
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleReset = () => {
    if (
      window.confirm(
        '모든 사이트 정보와 검색엔진 설정값을 초기 기본값으로 복원하시겠습니까?'
      )
    ) {
      const reset = siteSettingsService.resetToDefault();
      setSettings(reset);
      setSaveSuccess(true);
      if (onRefresh) onRefresh();
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-fadeIn max-w-5xl">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-[#102B50] flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#2563EB]" />
            <span>홈페이지 정보 및 사이트 환경설정</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            회사 정보, 고객센터 연락처, 사업자 등록 정보, 푸터 안내문구 및 검색엔진 소유권 인증 메타태그를 관리합니다.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="text-xs font-bold"
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            기본값 복원
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            className="text-xs font-bold"
            leftIcon={<Save className="w-3.5 h-3.5" />}
          >
            설정 저장하기
          </Button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            홈페이지 설정이 성공적으로 저장되었습니다. 헤더, 푸터, 플로팅 바 및 검색엔진 메타태그에 실시간 반영되었습니다!
          </span>
        </div>
      )}

      {/* 2. Company & Business Registration Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#2563EB]" />
            <h3 className="text-sm font-bold text-[#102B50]">
              1. 사업자 기본 정보 및 상호
            </h3>
          </div>
          <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-medium">
            * 확인되지 않은 허위 사업자 정보는 임의 생성하지 않고 실제 등록 정보만 입력합니다.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block">브랜드명 (표시용)</label>
            <input
              type="text"
              value={settings.brandName}
              onChange={(e) => handleChange('brandName', e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block">상호명 (법인명/사업자명)</label>
            <input
              type="text"
              value={settings.corpName}
              onChange={(e) => handleChange('corpName', e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block">대표자 성함</label>
            <input
              type="text"
              value={settings.ceo}
              onChange={(e) => handleChange('ceo', e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block">사업자등록번호</label>
            <input
              type="text"
              value={settings.businessNumber}
              onChange={(e) => handleChange('businessNumber', e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB] font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block">통신판매업신고번호</label>
            <input
              type="text"
              value={settings.onlineReportNumber}
              onChange={(e) => handleChange('onlineReportNumber', e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block">개인정보보호책임자</label>
            <input
              type="text"
              value={settings.privacyOfficer}
              onChange={(e) => handleChange('privacyOfficer', e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB]"
            />
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <label className="font-bold text-slate-700 block">사업장 소재지 주소</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB]"
            />
          </div>
        </div>
      </div>

      {/* 3. Customer Service & Contact Info */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
          <Phone className="w-4 h-4 text-[#2563EB]" />
          <h3 className="text-sm font-bold text-[#102B50]">
            2. 고객센터 및 상담 채널 설정
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block">상담 대표 전화번호</label>
            <input
              type="text"
              placeholder="예: 1588-0000 또는 02-123-4567"
              value={settings.tel}
              onChange={(e) => handleChange('tel', e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB] font-bold text-sm text-[#102B50]"
            />
            <p className="text-[11px] text-slate-500">
              * 헤더, 푸터 및 모바일 하단 플로팅 전화 바로걸기에 연결됩니다.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block">대표 공식 이메일</label>
            <input
              type="text"
              value={settings.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB] font-mono"
            />
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <label className="font-bold text-slate-700 block">고객센터 운영시간 문구</label>
            <input
              type="text"
              value={settings.operatingHours}
              onChange={(e) => handleChange('operatingHours', e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB]"
            />
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <label className="font-bold text-slate-700 block">기업 슬로건 문구</label>
            <input
              type="text"
              value={settings.slogan}
              onChange={(e) => handleChange('slogan', e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB]"
            />
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <label className="font-bold text-slate-700 block">푸터 기업 소개 설명문</label>
            <textarea
              rows={3}
              value={settings.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB] leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* 4. SEO & Search Console Verification */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-[#102B50]">
              3. 네이버 서치어드바이저 & 구글 서치콘솔 소유권 확인
            </h3>
          </div>
          <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-medium">
            SEO 최적화 지원
          </span>
        </div>

        <div className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block flex items-center justify-between">
              <span>네이버 서치어드바이저 (Naver Search Advisor) 소유권 인증 태그 값</span>
              <span className="text-[11px] font-mono text-slate-400">naver-site-verification</span>
            </label>
            <input
              type="text"
              placeholder="예: d7a1b2c3d4e5f6... (메타태그 content 속성값만 입력)"
              value={settings.naverVerification}
              onChange={(e) => handleChange('naverVerification', e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB] font-mono text-xs"
            />
            <p className="text-[11px] text-slate-500">
              * 입력 시 &lt;meta name="naver-site-verification" content="..." /&gt; 태그가 사이트 &lt;head&gt;에 자동 주입됩니다.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block flex items-center justify-between">
              <span>구글 서치콘솔 (Google Search Console) 소유권 인증 태그 값</span>
              <span className="text-[11px] font-mono text-slate-400">google-site-verification</span>
            </label>
            <input
              type="text"
              placeholder="예: ABcDeF12345GhIjKlMnOpQrStUv... (메타태그 content 속성값만 입력)"
              value={settings.googleVerification}
              onChange={(e) => handleChange('googleVerification', e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB] font-mono text-xs"
            />
            <p className="text-[11px] text-slate-500">
              * 입력 시 &lt;meta name="google-site-verification" content="..." /&gt; 태그가 사이트 &lt;head&gt;에 자동 주입됩니다.
            </p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          className="text-xs font-bold"
        >
          초기화
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="text-xs font-bold px-6 py-2.5"
          leftIcon={<Save className="w-4 h-4" />}
        >
          모든 변경사항 저장하기
        </Button>
      </div>
    </form>
  );
};
