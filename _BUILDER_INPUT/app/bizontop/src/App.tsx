/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TrustBar } from './components/TrustBar';
import { SituationCardsSection } from './components/SituationCardsSection';
import { ComparisonSection } from './components/ComparisonSection';
import { StartupGuideSection } from './components/StartupGuideSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { BusinessServicesSection } from './components/BusinessServicesSection';
import { ConsultingCasesSection } from './components/ConsultingCasesSection';
import { AfterIncorporationSection } from './components/AfterIncorporationSection';
import { DiagnosisSection } from './components/DiagnosisSection';
import { BusinessInsightsSection } from './components/BusinessInsightsSection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { FloatingCtaBar } from './components/FloatingCtaBar';
import { DiagnosisModal } from './components/DiagnosisModal';
import { ConsultationModal } from './components/ConsultationModal';
import { Footer } from './components/Footer';

export default function App() {
  const [isDiagnosisOpen, setIsDiagnosisOpen] = useState<boolean>(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState<boolean>(false);
  const [consultationCategory, setConsultationCategory] = useState<string>('법인설립 상담');

  const handleOpenConsultation = (category = '법인설립 상담') => {
    setConsultationCategory(category);
    setIsConsultationOpen(true);
  };

  const handleOpenDiagnosis = () => {
    setIsDiagnosisOpen(true);
  };

  const handleSelectSituation = (situationTitle: string) => {
    // When a user selects their situation, open consultation with context
    setConsultationCategory(`[상황별 진단] ${situationTitle}`);
    setIsConsultationOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#0B1F3A] flex flex-col antialiased selection:bg-blue-100 selection:text-[#0B1F3A]">
      {/* 1. Header (Sticky) */}
      <Header
        onOpenConsultation={() => handleOpenConsultation('법인설립 상담')}
        onOpenDiagnosis={handleOpenDiagnosis}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 2. Hero Section with Interactive 5-Step Process Card */}
        <HeroSection
          onOpenDiagnosis={handleOpenDiagnosis}
          onOpenConsultation={() => handleOpenConsultation('법인설립 상담')}
        />

        {/* 3. Trust Bar: 법인설립부터 기업성장까지 한 번에 (4 Items) */}
        <TrustBar
          onSelectItem={(category) => handleOpenConsultation(category)}
        />

        {/* 4. Situation Section: 혹시 이런 고민 때문에 법인설립을 알아보고 계신가요? (6 Situation Cards) */}
        <SituationCardsSection
          onSelectSituation={handleSelectSituation}
        />

        {/* 5. Comparison Section: 개인사업자 vs 법인 (비교 UI + Important Box) */}
        <ComparisonSection
          onOpenConsultation={() => handleOpenConsultation('법인설립 vs 개인사업자 상담')}
        />

        {/* 6. Startup Guide: 법인설립 기간 · 준비사항 · 비용 (3 Cards) */}
        <StartupGuideSection
          onOpenConsultation={() => handleOpenConsultation('법인 예상비용 상담')}
          onOpenDiagnosis={handleOpenDiagnosis}
        />

        {/* STEP 3 SECTION 1: 비즈온탑 법인설립 5 STEP (HOW IT WORKS) */}
        <HowItWorksSection
          onOpenConsultation={() => handleOpenConsultation('법인설립 5단계 상담')}
        />

        {/* 6. 비즈온탑의 서비스 (BUSINESS SERVICES - 4대 서비스 프리미엄 카드) */}
        <BusinessServicesSection
          onOpenConsultation={(cat) => handleOpenConsultation(cat)}
        />

        {/* 7. 3분 법인설립 무료 진단 (FREE CORPORATE CHECK - Multi Step Form) */}
        <DiagnosisSection
          onOpenConsultation={() => handleOpenConsultation('3분 진단 결과 상담')}
        />

        {/* 8. 실제 컨설팅 진행 사례 (CONSULTING CASES - 3대 상담 유형) */}
        <ConsultingCasesSection
          onOpenConsultation={(cat) => handleOpenConsultation(cat)}
        />

        {/* 9. 법인설립 이후 기업지원 (AFTER INCORPORATION - 6대 기업지원제도) */}
        <AfterIncorporationSection
          onOpenConsultation={(cat) => handleOpenConsultation(cat)}
        />

        {/* 10. 최신 기업정보 (BUSINESS INSIGHTS - 가이드 & 뉴스) */}
        <BusinessInsightsSection
          onOpenConsultation={(cat) => handleOpenConsultation(cat)}
        />

        {/* 11. FAQ (자주 묻는 질문 12문 12답) */}
        <FaqSection
          onOpenDiagnosis={handleOpenDiagnosis}
          onOpenConsultation={() => handleOpenConsultation('법인설립 1:1 상담')}
        />

        {/* 12. 마지막 CTA (FINAL CONVERSION SECTION - 프리미엄 컨설팅 듀얼 CTA) */}
        <FinalCtaSection
          onOpenDiagnosis={handleOpenDiagnosis}
          onOpenConsultation={() => handleOpenConsultation('마지막 상담 신청')}
        />
      </main>

      {/* 13. 깔끔한 최종 Footer */}
      <Footer
        onOpenConsultation={() => handleOpenConsultation('법인설립 상담')}
        onOpenDiagnosis={handleOpenDiagnosis}
      />

      {/* 14. Mobile & Desktop Floating CTAs */}
      <FloatingCtaBar
        onOpenDiagnosis={handleOpenDiagnosis}
        onOpenConsultation={(cat) => handleOpenConsultation(cat || '플로팅 빠른상담')}
      />

      {/* Unified Modals: 3-Min Corporate Diagnosis & Free Consultation */}
      <DiagnosisModal
        isOpen={isDiagnosisOpen}
        onClose={() => setIsDiagnosisOpen(false)}
        onOpenConsultation={() => {
          setIsDiagnosisOpen(false);
          setIsConsultationOpen(true);
        }}
      />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialCategory={consultationCategory}
      />
    </div>
  );
}
