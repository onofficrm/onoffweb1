import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { TrustBar } from './components/TrustBar.tsx';
import { SituationSection } from './components/SituationSection.tsx';
import { ComparisonSection } from './components/ComparisonSection.tsx';
import { GuideSection } from './components/GuideSection.tsx';
import { ProcessSection } from './components/ProcessSection.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { CasesSection } from './components/CasesSection.tsx';
import { PostSupportSection } from './components/PostSupportSection.tsx';
import { InsightsSection } from './components/InsightsSection.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { InteractiveDiagnosisSection } from './components/InteractiveDiagnosisSection.tsx';
import { FinalConversionSection } from './components/FinalConversionSection.tsx';
import { FloatingCtas } from './components/FloatingCtas.tsx';
import { Footer } from './components/Footer.tsx';
import { DiagnosisModal } from './components/DiagnosisModal.tsx';
import { ConsultationModal } from './components/ConsultationModal.tsx';
import { DiagnosisFormData, ConsultationFormData, MultiStepDiagnosisData } from './types.ts';

export default function App() {
  const [isDiagnosisOpen, setIsDiagnosisOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationCategory, setConsultationCategory] = useState('법인설립');
  const [initialDiagnosisType, setInitialDiagnosisType] = useState('예비창업자 신규 법인설립');
  const [inlineInitialSituation, setInlineInitialSituation] = useState('처음 사업을 시작합니다');

  const scrollToDiagnosis = () => {
    const el = document.getElementById('diagnosis');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsDiagnosisOpen(true);
    }
  };

  const handleOpenDiagnosis = (situationType?: string) => {
    if (situationType) {
      setInitialDiagnosisType(situationType);
      setInlineInitialSituation(situationType);
    }
    scrollToDiagnosis();
  };

  const handleOpenConsultation = (category = '법인설립') => {
    setConsultationCategory(category);
    setIsConsultationOpen(true);
  };

  const handleSelectSituation = (situationTitle: string) => {
    // Map situation titles to diagnosis types
    let mappedType = '예비창업자 신규 법인설립';
    if (situationTitle.includes('개인사업자')) {
      mappedType = '개인사업자 법인전환';
    } else if (situationTitle.includes('공동창업')) {
      mappedType = '공동창업을 준비하고 있습니다';
    } else if (situationTitle.includes('이미 법인')) {
      mappedType = '현재 법인을 운영하고 있습니다';
    }
    setInitialDiagnosisType(mappedType);
    setInlineInitialSituation(situationTitle);
    scrollToDiagnosis();
  };

  const handleDiagnosisSuccess = (_data: DiagnosisFormData) => {
    // Handled in modal state
  };

  const handleInlineDiagnosisSuccess = (_data: MultiStepDiagnosisData) => {
    // Successfully recorded
  };

  const handleConsultationSuccess = (_data: ConsultationFormData) => {
    // Handled in modal state
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC] text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* 1. Header (Sticky) */}
      <Header
        onOpenConsultation={() => handleOpenConsultation('법인설립')}
        onOpenDiagnosis={() => handleOpenDiagnosis()}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <HeroSection
          onOpenDiagnosis={() => handleOpenDiagnosis()}
          onOpenConsultation={() => handleOpenConsultation('법인설립')}
        />

        {/* 3. Trust Bar Area */}
        <TrustBar
          onOpenConsultation={() => handleOpenConsultation('법인설립')}
        />

        {/* 4. Section 1: 혹시 이런 고민 때문에 법인설립을 알아보고 계신가요? */}
        <SituationSection
          onSelectSituation={handleSelectSituation}
        />

        {/* 5. Section 2: 개인사업자 vs 법인 */}
        <ComparisonSection
          onOpenConsultation={() => handleOpenConsultation('법인전환')}
        />

        {/* 6. Section 3: 법인설립 기간 · 준비사항 · 비용 */}
        <GuideSection
          onOpenConsultation={() => handleOpenConsultation('설립비용')}
        />

        {/* 7. STEP 3 - Section 1: HOW IT WORKS (5 STEP Process) */}
        <ProcessSection
          onOpenConsultation={() => handleOpenConsultation('법인설립')}
        />

        {/* 8. STEP 3 - Section 2: BUSINESS SERVICES (4 Core Services) */}
        <ServicesSection
          onSelectService={(category) => handleOpenConsultation(category)}
        />

        {/* 9. STEP 5 - SECTION 1: 실제 컨설팅 진행 사례 (CONSULTING CASES) */}
        <CasesSection
          onOpenConsultation={(category) => handleOpenConsultation(category)}
        />

        {/* 10. STEP 5 - SECTION 2: 법인설립 이후 기업지원 (AFTER INCORPORATION) */}
        <PostSupportSection
          onOpenConsultation={(category) => handleOpenConsultation(category)}
        />

        {/* 11. STEP 4: 3분 법인설립 무료진단 Multi-Step Form */}
        <InteractiveDiagnosisSection
          initialSituation={inlineInitialSituation}
          onSuccessSubmit={handleInlineDiagnosisSuccess}
        />

        {/* 12. STEP 5 - SECTION 3: 최신 기업정보 (BUSINESS INSIGHTS) */}
        <InsightsSection
          onOpenConsultation={(category) => handleOpenConsultation(category)}
        />

        {/* 13. STEP 5 - SECTION 4: 자주 묻는 질문 (FAQ Accordion) */}
        <FaqSection
          onOpenConsultation={(category) => handleOpenConsultation(category)}
        />

        {/* 14. STEP 6: Final Conversion Section (아직 법인설립을 결정하지 못하셨나요?) */}
        <FinalConversionSection
          onOpenDiagnosis={() => handleOpenDiagnosis()}
          onOpenConsultation={() => handleOpenConsultation('법인설립')}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenConsultation={() => handleOpenConsultation('법인설립')}
        onOpenDiagnosis={() => handleOpenDiagnosis()}
      />

      {/* Floating CTAs (Mobile Fixed Bottom Bar & Desktop Quick Floating Button) */}
      <FloatingCtas
        onOpenConsultation={() => handleOpenConsultation('법인설립')}
        onOpenDiagnosis={() => handleOpenDiagnosis()}
      />

      {/* Modals for Unified CTAs */}
      <DiagnosisModal
        isOpen={isDiagnosisOpen}
        onClose={() => setIsDiagnosisOpen(false)}
        onSuccess={handleDiagnosisSuccess}
        initialBusinessType={initialDiagnosisType}
      />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        onSuccess={handleConsultationSuccess}
        defaultCategory={consultationCategory}
      />
    </div>
  );
}
