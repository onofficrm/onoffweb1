export interface NavItem {
  title: string;
  href: string;
  description?: string;
  badge?: string;
  iconName?: string;
}

export interface NavCategory {
  title: string;
  href: string;
  description: string;
  items: NavItem[];
  highlight?: {
    title: string;
    description: string;
    buttonText: string;
    href: string;
  };
}

export interface ConsultationFormData {
  companyName: string;
  representativeName: string;
  contactNumber: string;
  email: string;
  location: string;
  annualRevenue: string;
  businessYears: string;
  consultingType: string;
  estimatedAmount?: string;
  inquiryDetails: string;
  agreedToPrivacy: boolean;
}

export interface NoticeItem {
  id: number;
  category: '공지' | '안내' | '필독' | '이벤트';
  title: string;
  date: string;
  author: string;
  views: number;
  content: string;
  isImportant?: boolean;
}

export interface NewsItem {
  id: number;
  badge: string;
  title: string;
  summary: string;
  date: string;
  source: string;
  linkText?: string;
  target: string;
}

export interface SuccessCase {
  id: number;
  title: string;
  companyName: string;
  industry: string;
  serviceCategory: string;
  serviceType: string;
  achievement: string;
  resultSummary: string;
  period: string;
  summary: string;
  processSummary: string;
  tags: string[];
}

export interface CertInfoPost {
  id: number;
  title: string;
  category: string;
  date: string;
  href: string;
  summary?: string;
}

export interface FaqItem {
  id: number;
  category: string;
  question: string;
  answer: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string;
  category: '정책자금' | '기업인증' | '경영컨설팅';
  summary: string;
  benefits: {
    title: string;
    description: string;
    icon?: string;
  }[];
  targetAudience: string[];
  process: {
    step: number;
    title: string;
    description: string;
  }[];
  requiredDocuments: string[];
  faqs?: {
    q: string;
    a: string;
  }[];
}
