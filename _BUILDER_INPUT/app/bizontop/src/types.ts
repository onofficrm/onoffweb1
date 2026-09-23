export interface ProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  summary: string;
  keyPoints: string[];
  estimatedDays: string;
  iconName: string;
}

export interface TrustItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  iconName: string;
}

export interface DiagnosisFormData {
  businessType: string;
  capitalRange: string;
  teamStructure: string;
  supportNeeds: string[];
  contactName?: string;
  contactPhone?: string;
}

export interface SituationCardItem {
  id: string;
  number: string;
  title: string;
  description: string;
  tag: string;
}

export interface ComparisonItem {
  category: string;
  soleProprietor: string;
  corporation: string;
}

export interface MultiStepDiagnosisData {
  currentSituation: string; // Question 1
  primaryReason: string;    // Question 2
  timeline: string;         // Question 3
  name: string;             // Question 4
  phone: string;
  companyName?: string;
  contactMethod: '전화' | '카카오톡' | '문자';
  privacyAgreed: boolean;
}

export interface ConsultationFormData {
  name: string;
  phone: string;
  email?: string;
  category: string;
  inquiryDetails?: string;
  preferredTime?: string;
  privacyAgreed: boolean;
}

export interface ConsultingCaseItem {
  id: string;
  caseNo: string;
  clientType: string;
  title: string;
  situation: string;
  concerns: string[];
  processSteps: string[];
  /** 카드에 짧게 보이는 실제 사례 한 줄 */
  casePreview: string;
  /** 익명 실제 사례 본문 */
  caseStory: {
    background: string;
    challenge: string;
    approach: string[];
    result: string;
  };
}

export interface BusinessInsightSectionBlock {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BusinessInsightItem {
  id: string;
  category: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  imageUrl?: string;
  /** 자세히 보기 본문 */
  summaryPoints: string[];
  sections: BusinessInsightSectionBlock[];
  note?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

