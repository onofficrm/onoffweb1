export interface SiteSettings {
  brandName: string;
  logoText: string;
  slogan: string;
  description: string;
  corpName: string;
  ceo: string;
  businessNumber: string;
  onlineReportNumber: string;
  address: string;
  tel: string;
  email: string;
  privacyOfficer: string;
  operatingHours: string;
  // SEO & Webmaster Tools
  naverVerification: string;
  googleVerification: string;
}

const STORAGE_KEY = 'bizontop_site_settings_v2.0';

const DEFAULT_SETTINGS: SiteSettings = {
  brandName: '비즈온탑 (BIZ ON TOP)',
  logoText: 'BIZ ON TOP',
  slogan: '기업 성장의 든든한 파트너',
  description: '비즈온탑은 중소기업과 소상공인의 든든한 성장 파트너로서, 정책자금 융자 연계, 필수 기업인증 취득, 종합 경영컨설팅까지 원스톱 맞춤 솔루션을 제공하는 종합 기업자문 전문 기업입니다.',
  corpName: '비즈온탑 경영컨설팅',
  ceo: '대표이사 지정 (관리자 설정)',
  businessNumber: '사업자등록번호 (관리자 설정)',
  onlineReportNumber: '통신판매업신고번호 (관리자 설정)',
  address: '서울특별시 강남구 테헤란로 (관리자 설정)',
  tel: '1588-0000',
  email: 'contact@bizontop.co.kr',
  privacyOfficer: '개인정보보호책임자 (관리자 설정)',
  operatingHours: '평일 09:00 ~ 18:00 (점심시간 12:00 ~ 13:00 / 주말 및 공휴일 휴무)',
  naverVerification: '',
  googleVerification: '',
};

class SiteSettingsService {
  private settings: SiteSettings;

  constructor() {
    this.settings = this.loadSettings();
  }

  private loadSettings(): SiteSettings {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
      }
    } catch {
      // fallback
    }
    return DEFAULT_SETTINGS;
  }

  public getSettings(): SiteSettings {
    return this.settings;
  }

  public updateSettings(updates: Partial<SiteSettings>): SiteSettings {
    this.settings = { ...this.settings, ...updates };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings));
      window.dispatchEvent(
        new CustomEvent('bizontop_settings_updated', { detail: this.settings })
      );
      this.applySeoMetaTags();
    } catch (e) {
      console.warn('Failed to save settings:', e);
    }
    return this.settings;
  }

  public resetToDefault(): SiteSettings {
    this.settings = { ...DEFAULT_SETTINGS };
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(
        new CustomEvent('bizontop_settings_updated', { detail: this.settings })
      );
      this.applySeoMetaTags();
    } catch (e) {
      console.warn(e);
    }
    return this.settings;
  }

  public applySeoMetaTags(): void {
    if (typeof document === 'undefined') return;

    // Naver verification
    let naverMeta = document.querySelector('meta[name="naver-site-verification"]');
    if (this.settings.naverVerification.trim()) {
      if (!naverMeta) {
        naverMeta = document.createElement('meta');
        naverMeta.setAttribute('name', 'naver-site-verification');
        document.head.appendChild(naverMeta);
      }
      naverMeta.setAttribute('content', this.settings.naverVerification.trim());
    } else if (naverMeta) {
      naverMeta.remove();
    }

    // Google verification
    let googleMeta = document.querySelector('meta[name="google-site-verification"]');
    if (this.settings.googleVerification.trim()) {
      if (!googleMeta) {
        googleMeta = document.createElement('meta');
        googleMeta.setAttribute('name', 'google-site-verification');
        document.head.appendChild(googleMeta);
      }
      googleMeta.setAttribute('content', this.settings.googleVerification.trim());
    } else if (googleMeta) {
      googleMeta.remove();
    }
  }
}

export const siteSettingsService = new SiteSettingsService();
