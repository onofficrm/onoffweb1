export type ConsultationStatus =
  | '접수'
  | '상담 대기'
  | '상담 진행'
  | '계약 완료'
  | '컨설팅 진행'
  | '종료';

export interface Member {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  companyName: string;
  phone: string;
  businessNumber?: string;
  address?: string;
  role: 'admin' | 'user';
  isSuspended?: boolean;
  createdAt: string;
  updatedAt: string;
  agreedTerms: boolean;
  agreedPrivacy: boolean;
  agreedMarketing?: boolean;
}

export interface ConsultationItem {
  id: string; // e.g. BT-20260321-4829
  userId?: string | null; // null if guest
  category: 'funding' | 'certification' | 'consulting';
  categoryName: string; // '정책자금' | '기업인증' | '경영컨설팅'
  productId: string;
  productName: string;
  companyName: string;
  representativeName: string;
  contactNumber: string;
  email: string;
  businessNumber?: string;
  location: string;
  foundedYear: string;
  annualRevenue: string;
  desiredFundAmount?: string; // Only for funding
  inquiryDetails: string;
  agreedToPrivacy: boolean;
  agreedToMarketing?: boolean;
  status: ConsultationStatus;
  createdAt: string;
  assignedConsultant?: string;
  adminNotes?: string;
}

export interface PasswordResetToken {
  token: string;
  email: string;
  expiresAt: number; // timestamp
  used: boolean;
  createdAt: string;
}

export interface ExternalNotificationConfig {
  emailNotificationEnabled: boolean;
  alimtalkNotificationEnabled: boolean;
  alimtalkApiKey?: string;
  alimtalkSenderKey?: string;
  emailWebhookUrl?: string;
  status: 'disconnected' | 'connected' | 'mock_simulation';
}
