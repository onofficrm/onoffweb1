import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layout & Global Components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { FloatingBar } from './components/layout/FloatingBar';
import { ConsultationModal } from './components/common/ConsultationModal';
import { ScrollToTop } from './components/common/ScrollToTop';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutIntroPage } from './pages/about/AboutIntroPage';
import { AboutGreetingPage } from './pages/about/AboutGreetingPage';
import { AboutProcessPage } from './pages/about/AboutProcessPage';
import { AboutLocationPage } from './pages/about/AboutLocationPage';
import { CategoryViewPage } from './pages/category/CategoryViewPage';
import { ProductViewPage } from './pages/product/ProductViewPage';
import { NoticesPage } from './pages/support/NoticesPage';
import { NewsPage } from './pages/support/NewsPage';
import { CertInfoPage } from './pages/support/CertInfoPage';
import { CasesPage } from './pages/support/CasesPage';
import { FaqPage } from './pages/support/FaqPage';
import { InquiryPage } from './pages/support/InquiryPage';
import { ConsultationPage } from './pages/consultation/ConsultationPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { MyPage } from './pages/member/MyPage';
import { ProfileEditPage } from './pages/member/ProfileEditPage';
import { BoardListPage } from './pages/board/BoardListPage';
import { BoardDetailPage } from './pages/board/BoardDetailPage';
import { BoardWritePage } from './pages/board/BoardWritePage';
import { BoardEditPage } from './pages/board/BoardEditPage';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [consultDefaultService, setConsultDefaultService] = useState<string | undefined>();

  const handleOpenConsultation = (defaultService?: string) => {
    setConsultDefaultService(defaultService);
    setIsConsultModalOpen(true);
  };

  const handleCloseConsultation = () => {
    setIsConsultModalOpen(false);
    setConsultDefaultService(undefined);
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[#F7F9FC] text-[#172033] antialiased">
          {/* Sticky Header with MegaMenu & Mobile Drawer */}
          <Header onOpenConsultation={() => handleOpenConsultation()} />

          {/* Main Content Area */}
          <main className="flex-1 w-full">
            <Routes>
              {/* Home */}
              <Route
                path="/"
                element={<HomePage onOpenConsultation={() => handleOpenConsultation()} />}
              />

              {/* Unified Board System (게시판 시스템) */}
              <Route
                path="/board"
                element={<BoardListPage onOpenConsultation={() => handleOpenConsultation()} />}
              />
              <Route
                path="/board/write"
                element={<BoardWritePage onOpenConsultation={() => handleOpenConsultation()} />}
              />
              <Route
                path="/board/:id"
                element={<BoardDetailPage onOpenConsultation={() => handleOpenConsultation()} />}
              />
              <Route
                path="/board/:id/edit"
                element={<BoardEditPage onOpenConsultation={() => handleOpenConsultation()} />}
              />

            {/* About (회사소개) */}
            <Route
              path="/about"
              element={<AboutIntroPage onOpenConsultation={() => handleOpenConsultation()} />}
            />
            <Route
              path="/about/greeting"
              element={<AboutGreetingPage onOpenConsultation={() => handleOpenConsultation()} />}
            />
            <Route
              path="/about/process"
              element={<AboutProcessPage onOpenConsultation={() => handleOpenConsultation()} />}
            />
            <Route
              path="/about/location"
              element={<AboutLocationPage onOpenConsultation={() => handleOpenConsultation()} />}
            />

            {/* Policy Funds (정책자금) */}
            <Route
              path="/funding"
              element={<CategoryViewPage categoryId="funding" onOpenConsultation={() => handleOpenConsultation()} />}
            />
            <Route
              path="/funding/:productId"
              element={<ProductViewPage onOpenConsultation={() => handleOpenConsultation()} />}
            />
            <Route
              path="/policy-fund"
              element={<Navigate to="/funding" replace />}
            />
            <Route
              path="/policy-fund/:serviceId"
              element={<ProductViewPage onOpenConsultation={() => handleOpenConsultation()} />}
            />

            {/* Enterprise Certification (기업인증) */}
            <Route
              path="/certification"
              element={<CategoryViewPage categoryId="certification" onOpenConsultation={() => handleOpenConsultation()} />}
            />
            <Route
              path="/certification/:productId"
              element={<ProductViewPage onOpenConsultation={() => handleOpenConsultation()} />}
            />

            {/* Management Consulting (경영컨설팅) */}
            <Route
              path="/consulting"
              element={<CategoryViewPage categoryId="consulting" onOpenConsultation={() => handleOpenConsultation()} />}
            />
            <Route
              path="/consulting/:productId"
              element={<ProductViewPage onOpenConsultation={() => handleOpenConsultation()} />}
            />

            {/* Customer Support & Resources (고객센터) */}
            <Route
              path="/support"
              element={<Navigate to="/support/notices" replace />}
            />
            <Route
              path="/support/notices"
              element={<NoticesPage onOpenConsultation={() => handleOpenConsultation()} />}
            />
            <Route
              path="/support/news"
              element={<NewsPage onOpenConsultation={() => handleOpenConsultation()} />}
            />
            <Route
              path="/support/cert-info"
              element={<CertInfoPage onOpenConsultation={() => handleOpenConsultation()} />}
            />
            <Route
              path="/support/cases"
              element={<CasesPage onOpenConsultation={() => handleOpenConsultation()} />}
            />
            <Route
              path="/support/faq"
              element={<FaqPage onOpenConsultation={() => handleOpenConsultation()} />}
            />
            <Route
              path="/support/inquiry"
              element={<ConsultationPage />}
            />
            <Route
              path="/consultation"
              element={<ConsultationPage />}
            />

            {/* Auth & Member Area */}
            <Route
              path="/login"
              element={<LoginPage />}
            />
            <Route
              path="/auth/login"
              element={<LoginPage />}
            />
            <Route
              path="/signup"
              element={<RegisterPage />}
            />
            <Route
              path="/auth/register"
              element={<RegisterPage />}
            />
            <Route
              path="/forgot-password"
              element={<ForgotPasswordPage />}
            />
            <Route
              path="/auth/forgot-password"
              element={<ForgotPasswordPage />}
            />
            <Route
              path="/reset-password"
              element={<ResetPasswordPage />}
            />
            <Route
              path="/mypage"
              element={<MyPage />}
            />
            <Route
              path="/member/mypage"
              element={<MyPage />}
            />
            <Route
              path="/mypage/profile"
              element={<ProfileEditPage />}
            />
            <Route
              path="/member/profile"
              element={<ProfileEditPage />}
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Floating Quick Action & Scroll-to-Top */}
        <FloatingBar onOpenConsultation={() => handleOpenConsultation()} />

        {/* Global Corporate Footer */}
        <Footer />

        {/* Universal 1:1 Consultation Modal */}
        <ConsultationModal
          isOpen={isConsultModalOpen}
          onClose={handleCloseConsultation}
          defaultService={consultDefaultService}
        />
      </div>
    </BrowserRouter>
  </AuthProvider>
  );
}
