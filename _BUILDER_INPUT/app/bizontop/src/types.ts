export interface StepItem {
  number: string;
  title: string;
  subtext: string;
  duration: string;
  keyPoints: string[];
  tips: string;
}

export interface TrustItem {
  id: string;
  title: string;
  description: string;
  tag: string;
  iconName: string;
}

export interface DiagnosisFormData {
  businessType: string;
  industry: string;
  preparedness: string;
  primaryGoal: string;
  applicantName: string;
  applicantPhone: string;
}

export interface ConsultationFormData {
  name: string;
  phone: string;
  category: string;
  message: string;
  agreePrivacy: boolean;
}

export interface MultiStepDiagnosisData {
  currentSituation: string; // Question 1
  mainReason: string;        // Question 2
  timeline: string;          // Question 3
  userName: string;          // Question 4
  userPhone: string;
  companyName?: string;
  preferredContact: '전화' | '카카오톡' | '문자';
  agreePrivacy: boolean;
}
