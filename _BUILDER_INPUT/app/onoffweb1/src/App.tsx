/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import SolutionSection from './components/SolutionSection';
import DetailServiceSection from './components/DetailServiceSection';
import TrustSection from './components/TrustSection';
import SeoGeoBlogSection from './components/SeoGeoBlogSection';
import ConsultationForm from './components/ConsultationForm';
import Footer from './components/Footer';
import ReviewsModal from './components/ReviewsModal';
import FaqModal from './components/FaqModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [reviewsDefaultTab, setReviewsDefaultTab] = useState<'reviews' | 'concerns'>('reviews');
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  const handleOpenReviews = (tab: 'reviews' | 'concerns' = 'reviews') => {
    setReviewsDefaultTab(tab);
    setIsReviewsOpen(true);
  };

  // Scroll spy implementation using IntersectionObserver
  useEffect(() => {
    const sections = ['hero', 'concerns', 'features', 'trust', 'seo-blog', 'consultation'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // Shift margin to spy middle viewport beautifully
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset scroll for navbar height
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setActiveSection(sectionId);
    }
  };

  const triggerCtaScroll = () => {
    handleNavigate('consultation');
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 antialiased flex flex-col justify-between selection:bg-gold-200 selection:text-gold-900">
      
      {/* Global Navigation Header */}
      <Header 
        onNavigate={handleNavigate} 
        activeSection={activeSection} 
        onOpenReviews={handleOpenReviews} 
        onOpenFaq={() => setIsFaqOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <HeroSection onCtaClick={triggerCtaScroll} onOpenReviews={handleOpenReviews} />
        <SolutionSection onCtaClick={triggerCtaScroll} />
        <DetailServiceSection onCtaClick={triggerCtaScroll} />
        <TrustSection onOpenReviews={() => handleOpenReviews('reviews')} />
        <SeoGeoBlogSection onCtaClick={triggerCtaScroll} />
        <ConsultationForm />
      </main>

      {/* Trust & Legal Footer */}
      <Footer onOpenFaq={() => setIsFaqOpen(true)} onNavigate={handleNavigate} />

      {/* Verified Customer Reviews Modal */}
      <ReviewsModal 
        isOpen={isReviewsOpen} 
        onClose={() => setIsReviewsOpen(false)} 
        defaultTab={reviewsDefaultTab}
      />

      {/* Dedicated FAQ Search & Category Modal */}
      <FaqModal isOpen={isFaqOpen} onClose={() => setIsFaqOpen(false)} />

    </div>
  );
}

