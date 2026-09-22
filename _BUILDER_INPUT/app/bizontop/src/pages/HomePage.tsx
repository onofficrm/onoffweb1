import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Coins,
  Factory,
  FileCheck2,
  FileText,
  FlaskConical,
  HelpCircle,
  Landmark,
  PhoneCall,
  Rocket,
  Scale,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  User,
  Users,
} from 'lucide-react';
import { CERT_INFO_POSTS, FAQ_DATA, NEWS_DATA, SUCCESS_CASES } from '../data/siteData';
import { boardService } from '../services/boardService';
import { BoardPost } from '../types/board';
import { Accordion } from '../components/ui/Accordion';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input, Select } from '../components/ui/Input';

// Generated authentic high quality business photography
import heroImg from '../assets/images/business_hero_consultation_1790004192757.jpg';
import policyFundImg from '../assets/images/service_policy_fund_1790004207216.jpg';
import certImg from '../assets/images/service_certification_1790004222118.jpg';
import consultingImg from '../assets/images/service_consulting_1790004236146.jpg';

interface HomePageProps {
  onOpenConsultation: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenConsultation }) => {
  const navigate = useNavigate();

  // Section 8 Simple Consultation Form State
  const [formData, setFormData] = useState({
    companyName: '',
    name: '',
    phone: '',
    service: '정책자금 조달',
    agreed: false,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // Dynamic Board Posts for Section 7
  const [latestNews, setLatestNews] = useState<BoardPost[]>([]);
  const [latestCerts, setLatestCerts] = useState<BoardPost[]>([]);

  const loadLatestBoardPosts = () => {
    setLatestNews(boardService.getLatestPostsByType('news', 3));
    setLatestCerts(boardService.getLatestPostsByType('cert', 3));
  };

  useEffect(() => {
    loadLatestBoardPosts();
    window.addEventListener('bizontop_board_updated', loadLatestBoardPosts);
    return () => {
      window.removeEventListener('bizontop_board_updated', loadLatestBoardPosts);
    };
  }, []);

  // Smooth scroll handler for "서비스 알아보기"
  const scrollToServices = () => {
    const element = document.getElementById('core-services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle Simple Consultation Submit
  const handleSimpleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.companyName.trim()) {
      setFormError('기업명(상호명)을 입력해 주세요.');
      return;
    }
    if (!formData.name.trim()) {
      setFormError('신청자 이름(직책)을 입력해 주세요.');
      return;
    }
    if (!formData.phone.trim()) {
      setFormError('연락처(휴대전화 번호)를 입력해 주세요.');
      return;
    }
    if (!formData.agreed) {
      setFormError('개인정보 수집 및 이용에 동의해 주세요.');
      return;
    }

    // Save to local storage for reference
    try {
      const existing = JSON.parse(localStorage.getItem('biz_quick_consultations') || '[]');
      const newRecord = {
        id: Date.now(),
        ...formData,
        date: new Date().toISOString().split('T')[0],
        status: '1단계 접수완료',
      };
      localStorage.setItem('biz_quick_consultations', JSON.stringify([newRecord, ...existing]));
    } catch {
      // Local storage fallback
    }

    setFormSubmitted(true);
  };

  return (
    <div className="w-full bg-[#F7F9FC]">
      {/* =========================================================================
          SECTION 1: 메인 히어로 (HERO SECTION)
          PC: 좌측 텍스트, 우측 비즈니스 상담 고품질 이미지 / 모바일: 세로 배치
          메인 카피: 기업의 성장에 필요한 모든 솔루션
          서브 카피: 정책자금부터 기업인증, 경영컨설팅까지 비즈온탑이 함께합니다.
          버튼: 무료 상담 신청 (/consultation), 서비스 알아보기 (#core-services)
      ========================================================================= */}
      <section className="relative bg-gradient-to-b from-[#102B50] via-[#13345E] to-[#102B50] text-white py-16 sm:py-20 lg:py-28 overflow-hidden">
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#93C5FD_1px,transparent_1px)] [background-size:28px_28px]" />

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-[#D5A64B] border border-white/15 backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#D5A64B]" />
                <span>중소기업·스타트업 경영 자문 전문 파트너</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.25] text-white">
                기업의 성장에 필요한
                <br />
                <span className="text-[#D5A64B]">모든 솔루션</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                정책자금부터 기업인증, 경영컨설팅까지 비즈온탑이 함께합니다.
                <br className="hidden sm:inline" />
                기업별 정밀 진단을 통해 최적의 조달 전략과 지속 가능한 성장 로드맵을 제시합니다.
              </p>

              {/* 2 Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <Link to="/consultation" className="w-full sm:w-auto">
                  <Button
                    variant="accent"
                    size="lg"
                    leftIcon={<PhoneCall className="w-5 h-5" />}
                    className="w-full sm:w-auto font-bold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    무료 상담 신청
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={scrollToServices}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="w-full sm:w-auto text-white border-white/30 hover:bg-white/10 hover:border-white transition-all duration-200"
                >
                  서비스 알아보기
                </Button>
              </div>

              {/* Service Highlights */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-3 text-left">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                  <span className="block text-xs text-[#D5A64B] font-bold">맞춤 조달</span>
                  <span className="text-xs text-slate-300">정부 정책자금 연계</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                  <span className="block text-xs text-[#D5A64B] font-bold">조세 감면</span>
                  <span className="text-xs text-slate-300">벤처·연구소 국가인증</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                  <span className="block text-xs text-[#D5A64B] font-bold">경영 자문</span>
                  <span className="text-xs text-slate-300">법인전환 및 사옥자금</span>
                </div>
              </div>
            </div>

            {/* Right Business Image (PC: Right, Mobile: Bottom stacked) */}
            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 group">
                  <img
                    src={heroImg}
                    alt="비즈온탑 전문 비즈니스 컨설팅 상담"
                    referrerPolicy="no-referrer"
                    className="w-full h-72 sm:h-96 lg:h-[420px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102B50]/80 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating Trust Badge */}
                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white/95 backdrop-blur-sm text-[#102B50] shadow-md border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-6 h-6 text-[#2563EB]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#102B50]">
                          1:1 전담 수석 컨설턴트 밀착 배정
                        </p>
                        <p className="text-[11px] text-slate-500">
                          신용도 영향 없는 비공개 사전 기업진단
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/consultation"
                      className="hidden sm:inline-flex items-center text-xs font-bold text-[#2563EB] hover:underline"
                    >
                      상담하기 &gt;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: 기업의 고민
          제목: 지금 어떤 고민을 하고 계신가요?
          6개의 선택형 카드 -> 각 카드 클릭 시 관련 상품 상세페이지로 이동
      ========================================================================= */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
              CLIENT NEEDS & SOLUTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102B50] mt-1.5 mb-3">
              지금 어떤 고민을 하고 계신가요?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              기업의 현재 성장 단계와 마주한 과제에 따라 가장 적합한 전문 솔루션을 확인해 보세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: 사업 운영자금 */}
            <Link
              to="/policy-fund/working-capital"
              className="group block rounded-xl p-6 bg-[#F8FAFC] border border-slate-200 hover:border-[#2563EB] hover:bg-white hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Coins className="w-6 h-6" />
                </div>
                <Badge variant="sub" size="sm">
                  정책자금
                </Badge>
              </div>
              <h3 className="text-lg font-bold text-[#102B50] group-hover:text-[#2563EB] transition-colors mb-2">
                사업 운영자금이 필요한 기업
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                원자재 매입, 인건비 지급, 거래처 결제 등 유동성 확보를 위한 저금리 정책 운전자금을 연계합니다.
              </p>
              <div className="flex items-center text-xs font-semibold text-[#2563EB] group-hover:translate-x-1 transition-transform">
                <span>운전자금 알아보기</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </Link>

            {/* Card 2: 창업 초기 자금 */}
            <Link
              to="/policy-fund/startup"
              className="group block rounded-xl p-6 bg-[#F8FAFC] border border-slate-200 hover:border-[#2563EB] hover:bg-white hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#D5A64B] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Rocket className="w-6 h-6 text-[#BF9137]" />
                </div>
                <Badge variant="accent" size="sm">
                  창업자금
                </Badge>
              </div>
              <h3 className="text-lg font-bold text-[#102B50] group-hover:text-[#2563EB] transition-colors mb-2">
                창업 초기 자금이 필요한 기업
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                업력 7년 미만 초기 스타트업을 위해 재무제표 부담 없는 무담보 신용 융자 및 청년창업 자금을 지원합니다.
              </p>
              <div className="flex items-center text-xs font-semibold text-[#2563EB] group-hover:translate-x-1 transition-transform">
                <span>창업기업자금 알아보기</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </Link>

            {/* Card 3: 벤처기업확인 */}
            <Link
              to="/certification/venture"
              className="group block rounded-xl p-6 bg-[#F8FAFC] border border-slate-200 hover:border-[#2563EB] hover:bg-white hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <Badge variant="sub" size="sm">
                  기업인증
                </Badge>
              </div>
              <h3 className="text-lg font-bold text-[#102B50] group-hover:text-[#2563EB] transition-colors mb-2">
                벤처기업확인을 준비하는 기업
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                창업 초기 5년간 법인세 50% 세액 감면과 취득세 75% 감면, 정부 R&D 과제 심사 가점을 확보합니다.
              </p>
              <div className="flex items-center text-xs font-semibold text-[#2563EB] group-hover:translate-x-1 transition-transform">
                <span>벤처기업확인 알아보기</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </Link>

            {/* Card 4: 기업부설연구소 */}
            <Link
              to="/certification/research-center"
              className="group block rounded-xl p-6 bg-[#F8FAFC] border border-slate-200 hover:border-[#2563EB] hover:bg-white hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <FlaskConical className="w-6 h-6" />
                </div>
                <Badge variant="neutral" size="sm">
                  R&D 절세
                </Badge>
              </div>
              <h3 className="text-lg font-bold text-[#102B50] group-hover:text-[#2563EB] transition-colors mb-2">
                기업부설연구소 설립이 필요한 기업
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                연구인력개발비 25% 법인세 세액공제와 연구원 비과세 혜택을 받는 공인 연구개발 전담부서를 구축합니다.
              </p>
              <div className="flex items-center text-xs font-semibold text-[#2563EB] group-hover:translate-x-1 transition-transform">
                <span>연구소 설립 요건 확인</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </Link>

            {/* Card 5: 법인설립·전환 */}
            <Link
              to="/consulting/incorporation"
              className="group block rounded-xl p-6 bg-[#F8FAFC] border border-slate-200 hover:border-[#2563EB] hover:bg-white hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#102B50] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Scale className="w-6 h-6" />
                </div>
                <Badge variant="neutral" size="sm">
                  경영컨설팅
                </Badge>
              </div>
              <h3 className="text-lg font-bold text-[#102B50] group-hover:text-[#2563EB] transition-colors mb-2">
                법인설립을 고민하는 대표자
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                개인사업자의 고율 누진소득세를 절감하고, 자산과 부채를 분리하며 정관을 정비하는 맞춤 법인 전환을 돕습니다.
              </p>
              <div className="flex items-center text-xs font-semibold text-[#2563EB] group-hover:translate-x-1 transition-transform">
                <span>법인전환 전략 알아보기</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </Link>

            {/* Card 6: 공장·사옥 매입 시설투자 */}
            <Link
              to="/funding/facility"
              className="group block rounded-xl p-6 bg-[#F8FAFC] border border-slate-200 hover:border-[#2563EB] hover:bg-white hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Factory className="w-6 h-6" />
                </div>
                <Badge variant="sub" size="sm">
                  시설자금
                </Badge>
              </div>
              <h3 className="text-lg font-bold text-[#102B50] group-hover:text-[#2563EB] transition-colors mb-2">
                공장·사옥 매입 및 시설투자를 계획하는 기업
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                자가 사업장 확보와 생산설비 도입을 위해 소요 자금의 최대 80~90%까지 장기 저리로 조달합니다.
              </p>
              <div className="flex items-center text-xs font-semibold text-[#2563EB] group-hover:translate-x-1 transition-transform">
                <span>시설자금 한도 알아보기</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: 핵심 서비스 (CORE SERVICES)
          정책자금, 기업인증, 경영컨설팅 3개 대형 카드
          이미지, 서비스 소개, 대표 상품, 자세히 보기 버튼
          카드 클릭 시 해당 서비스 카테고리 페이지로 이동
      ========================================================================= */}
      <section id="core-services" className="py-20 bg-[#F7F9FC] border-t border-slate-200 scroll-mt-20">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
              CORE THREE DOMAINS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102B50] mt-1.5 mb-3">
              비즈온탑의 핵심 서비스
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              재무 건전성 확충부터 조세 감면, 지배구조 개선까지 전문 영역별 체계적인 컨설팅을 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Large Card 1: 정책자금 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#2563EB]/40 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                  <img
                    src={policyFundImg}
                    alt="맞춤형 정책자금 컨설팅"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="sub" size="md">
                      정책자금 (Funding)
                    </Badge>
                  </div>
                </div>

                <div className="p-7">
                  <h3 className="text-xl font-bold text-[#102B50] mb-3 group-hover:text-[#2563EB] transition-colors">
                    맞춤형 정부 정책자금 조달
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    소상공인시장진흥공단, 중진공, 기보, 신보 등 기업 상황에 가장 적합한 정부 정책자금을 발굴하고 최적 조건의 저금리 융자를 연계합니다.
                  </p>

                  <div className="border-t border-slate-100 pt-5">
                    <span className="text-xs font-bold text-[#102B50] block mb-3">
                      대표 서비스 상품
                    </span>
                    <ul className="space-y-2.5 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                        <span>소상공인 및 초기 스타트업 창업지원자금</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                        <span>중소 제조·유통기업 맞춤 운전자금</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                        <span>공장·사옥 매입 및 기계설비 시설자금</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-7 pt-0">
                <Link to="/funding">
                  <Button
                    variant="outline"
                    fullWidth
                    size="md"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="group-hover:bg-[#102B50] group-hover:text-white group-hover:border-[#102B50] transition-colors"
                  >
                    정책자금 자세히 보기
                  </Button>
                </Link>
              </div>
            </div>

            {/* Large Card 2: 기업인증 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#D5A64B]/60 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                  <img
                    src={certImg}
                    alt="국가공인 기업인증 컨설팅"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="accent" size="md">
                      기업인증 (Certification)
                    </Badge>
                  </div>
                </div>

                <div className="p-7">
                  <h3 className="text-xl font-bold text-[#102B50] mb-3 group-hover:text-[#2563EB] transition-colors">
                    국가 공인 기업인증 획득
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    벤처기업확인, 기업부설연구소, 이노비즈, 메인비즈, ISO 등 파격적인 조세 감면과 공공조달 입찰 가점을 확보하는 공인 인증을 취득합니다.
                  </p>

                  <div className="border-t border-slate-100 pt-5">
                    <span className="text-xs font-bold text-[#102B50] block mb-3">
                      대표 서비스 상품
                    </span>
                    <ul className="space-y-2.5 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#D5A64B] shrink-0" />
                        <span>벤처기업확인 (법인세 최대 50% 감면)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#D5A64B] shrink-0" />
                        <span>기업부설연구소 / 연구전담부서 (R&D 25% 공제)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#D5A64B] shrink-0" />
                        <span>이노비즈 · 메인비즈 · ISO 국제표준인증</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-7 pt-0">
                <Link to="/certification">
                  <Button
                    variant="outline"
                    fullWidth
                    size="md"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="group-hover:bg-[#102B50] group-hover:text-white group-hover:border-[#102B50] transition-colors"
                  >
                    기업인증 자세히 보기
                  </Button>
                </Link>
              </div>
            </div>

            {/* Large Card 3: 경영컨설팅 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#102B50]/40 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                  <img
                    src={consultingImg}
                    alt="전략적 경영컨설팅"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="neutral" size="md">
                      경영컨설팅 (Consulting)
                    </Badge>
                  </div>
                </div>

                <div className="p-7">
                  <h3 className="text-xl font-bold text-[#102B50] mb-3 group-hover:text-[#2563EB] transition-colors">
                    전략적 경영자문 및 리스크 개선
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    법인설립 및 전환, 가지급금 정리, 정관 개정, 사옥 매입 시설자금 등 기업의 안정적인 영속과 재무 리스크를 선제적으로 해결합니다.
                  </p>

                  <div className="border-t border-slate-100 pt-5">
                    <span className="text-xs font-bold text-[#102B50] block mb-3">
                      대표 서비스 상품
                    </span>
                    <ul className="space-y-2.5 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#102B50] shrink-0" />
                        <span>개인사업자 절세형 법인설립 및 법인전환</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#102B50] shrink-0" />
                        <span>자가 사옥 및 공장 매입 부동산 시설자금</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#102B50] shrink-0" />
                        <span>가지급금 정리 및 기업 신용평가등급 개선</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-7 pt-0">
                <Link to="/consulting">
                  <Button
                    variant="outline"
                    fullWidth
                    size="md"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="group-hover:bg-[#102B50] group-hover:text-white group-hover:border-[#102B50] transition-colors"
                  >
                    경영컨설팅 자세히 보기
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: 비즈온탑 소개
          제목: 기업의 현재를 진단하고 미래의 성장을 설계합니다.
          3가지 핵심 가치:
            1. 기업별 맞춤 진단
            2. 체계적인 컨설팅 프로세스
            3. 지속적인 사후관리
          ※ 중요: 실제 확인되지 않은 승인률, 누적 상담 건수, 고객 수, 성과 수치는 절대 사용하지 않음
      ========================================================================= */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
              BIZ ON TOP PHILOSOPHY
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#102B50] mt-1.5 mb-4 leading-snug">
              기업의 현재를 진단하고
              <br className="hidden sm:inline" />
              미래의 성장을 설계합니다.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
              비즈온탑은 단편적인 상품 안내를 넘어, 기업의 재무 상태와 성장 단계를 입체적으로 검토하여
              기업 가치를 높이는 3대 핵심 가치를 실천합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="p-8 rounded-2xl bg-[#F8FAFC] border border-slate-200 hover:border-[#2563EB]/40 hover:shadow-md transition-all duration-200">
              <div className="w-14 h-14 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-6">
                <FileCheck2 className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold text-[#2563EB] block mb-1">CORE VALUE 01</span>
              <h3 className="text-xl font-bold text-[#102B50] mb-3">
                기업별 맞춤 진단
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                일률적인 제안이 아닌 기업의 업종, 재무구조, 기술력, 고용 실적을 면밀히 분석합니다.
                현재 기업 여건에서 가장 유리한 최적의 조달 트랙과 인증 요건을 사전에 도출합니다.
              </p>
            </div>

            {/* Value 2 */}
            <div className="p-8 rounded-2xl bg-[#F8FAFC] border border-slate-200 hover:border-[#D5A64B]/60 hover:shadow-md transition-all duration-200">
              <div className="w-14 h-14 rounded-xl bg-amber-50 text-[#D5A64B] flex items-center justify-center mb-6">
                <BadgeCheck className="w-7 h-7 text-[#BF9137]" />
              </div>
              <span className="text-xs font-bold text-[#D5A64B] block mb-1">CORE VALUE 02</span>
              <h3 className="text-xl font-bold text-[#102B50] mb-3">
                체계적인 컨설팅 프로세스
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                사전 검토부터 전문 사업계획서 편철, 현장 실사 및 질의응답 대응까지 전담 수석 컨설턴트가 밀착 조력합니다.
                기관별 심사위원 관점에 부합하도록 체계적이고 표준화된 절차를 지원합니다.
              </p>
            </div>

            {/* Value 3 */}
            <div className="p-8 rounded-2xl bg-[#F8FAFC] border border-slate-200 hover:border-[#102B50]/40 hover:shadow-md transition-all duration-200">
              <div className="w-14 h-14 rounded-xl bg-slate-100 text-[#102B50] flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold text-[#102B50] block mb-1">CORE VALUE 03</span>
              <h3 className="text-xl font-bold text-[#102B50] mb-3">
                지속적인 사후관리
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                일회성 자금 수령에 그치지 않고, 취득한 인증의 유지관리 및 연구노트 지도, 차년도 후속 정책과제 연계까지
                기업이 안정적으로 스케일업할 수 있도록 지속적인 자문을 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: 컨설팅 프로세스
          5단계 프로세스 시각화
          1 상담 신청
          2 기업 현황 진단
          3 맞춤 솔루션 제안
          4 계약 및 컨설팅 진행
          5 결과 확인 및 사후관리
          PC: 가로 타임라인, 모바일: 세로 타임라인
      ========================================================================= */}
      <section className="py-20 bg-[#F7F9FC] border-y border-slate-200">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
              5-STEP ROADMAP
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102B50] mt-1.5 mb-3">
              체계적인 5단계 컨설팅 프로세스
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              사전 상담부터 최종 사후관리까지 전담 컨설턴트와 함께 단계별로 명확하게 진행됩니다.
            </p>
          </div>

          {/* PC View: 가로 타임라인 (Horizontal Timeline) */}
          <div className="hidden lg:block relative">
            {/* Connecting Horizontal Line */}
            <div className="absolute top-10 left-12 right-12 h-1 bg-slate-200 z-0" />

            <div className="grid grid-cols-5 gap-4 relative z-10">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-full bg-white border-4 border-[#2563EB] text-[#2563EB] flex flex-col items-center justify-center shadow-md mb-5 group-hover:scale-110 transition-transform">
                  <span className="text-[10px] font-bold text-slate-400 leading-none">STEP</span>
                  <span className="text-xl font-black leading-tight">01</span>
                </div>
                <h4 className="text-base font-bold text-[#102B50] mb-2">상담 신청</h4>
                <p className="text-xs text-slate-600 leading-relaxed px-2">
                  온라인 간편 상담 또는 유선을 통해 기업 기본 정보 및 당면 과제를 접수합니다.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-full bg-white border-4 border-[#2563EB] text-[#2563EB] flex flex-col items-center justify-center shadow-md mb-5 group-hover:scale-110 transition-transform">
                  <span className="text-[10px] font-bold text-slate-400 leading-none">STEP</span>
                  <span className="text-xl font-black leading-tight">02</span>
                </div>
                <h4 className="text-base font-bold text-[#102B50] mb-2">기업 현황 진단</h4>
                <p className="text-xs text-slate-600 leading-relaxed px-2">
                  재무제표, 매출 추이, 업력, 기술력을 정밀 분석하여 지원 적격성을 검토합니다.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-full bg-white border-4 border-[#D5A64B] text-[#D5A64B] flex flex-col items-center justify-center shadow-md mb-5 group-hover:scale-110 transition-transform">
                  <span className="text-[10px] font-bold text-slate-400 leading-none">STEP</span>
                  <span className="text-xl font-black leading-tight">03</span>
                </div>
                <h4 className="text-base font-bold text-[#102B50] mb-2">맞춤 솔루션 제안</h4>
                <p className="text-xs text-slate-600 leading-relaxed px-2">
                  기관별 자금 트랙과 세제 감면 인증 등 최적의 맞춤 실행 계획을 제안합니다.
                </p>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-full bg-white border-4 border-[#102B50] text-[#102B50] flex flex-col items-center justify-center shadow-md mb-5 group-hover:scale-110 transition-transform">
                  <span className="text-[10px] font-bold text-slate-400 leading-none">STEP</span>
                  <span className="text-xl font-black leading-tight">04</span>
                </div>
                <h4 className="text-base font-bold text-[#102B50] mb-2">계약 및 컨설팅 진행</h4>
                <p className="text-xs text-slate-600 leading-relaxed px-2">
                  전담 수석 컨설턴트 배정 후 사업계획서 편철, 현장 실사 및 PT를 밀착 지도합니다.
                </p>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-full bg-white border-4 border-emerald-600 text-emerald-600 flex flex-col items-center justify-center shadow-md mb-5 group-hover:scale-110 transition-transform">
                  <span className="text-[10px] font-bold text-slate-400 leading-none">STEP</span>
                  <span className="text-xl font-black leading-tight">05</span>
                </div>
                <h4 className="text-base font-bold text-[#102B50] mb-2">결과 확인 및 사후관리</h4>
                <p className="text-xs text-slate-600 leading-relaxed px-2">
                  자금 실행 및 인증 취득 완료 후 후속 연계 과제와 정기 사후관리를 지속합니다.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile View: 세로 타임라인 (Vertical Timeline) */}
          <div className="lg:hidden relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-300">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -left-6 sm:-left-8 top-0 w-7 h-7 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-xs font-bold ring-4 ring-white">
                1
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-[#2563EB] uppercase">STEP 01</span>
                <h4 className="text-base font-bold text-[#102B50] mt-0.5 mb-1.5">상담 신청</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  온라인 간편 상담 또는 유선을 통해 기업 기본 정보 및 당면 과제를 접수합니다.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -left-6 sm:-left-8 top-0 w-7 h-7 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-xs font-bold ring-4 ring-white">
                2
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-[#2563EB] uppercase">STEP 02</span>
                <h4 className="text-base font-bold text-[#102B50] mt-0.5 mb-1.5">기업 현황 진단</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  재무제표, 매출 추이, 업력, 기술력을 정밀 분석하여 지원 적격성을 검토합니다.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -left-6 sm:-left-8 top-0 w-7 h-7 rounded-full bg-[#D5A64B] text-white flex items-center justify-center text-xs font-bold ring-4 ring-white">
                3
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-[#D5A64B] uppercase">STEP 03</span>
                <h4 className="text-base font-bold text-[#102B50] mt-0.5 mb-1.5">맞춤 솔루션 제안</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  기관별 자금 트랙과 세제 감면 인증 등 최적의 맞춤 실행 계획을 제안합니다.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <div className="absolute -left-6 sm:-left-8 top-0 w-7 h-7 rounded-full bg-[#102B50] text-white flex items-center justify-center text-xs font-bold ring-4 ring-white">
                4
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-[#102B50] uppercase">STEP 04</span>
                <h4 className="text-base font-bold text-[#102B50] mt-0.5 mb-1.5">계약 및 컨설팅 진행</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  전담 수석 컨설턴트 배정 후 사업계획서 편철, 현장 실사 및 PT를 밀착 지도합니다.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="relative">
              <div className="absolute -left-6 sm:-left-8 top-0 w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold ring-4 ring-white">
                5
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-emerald-600 uppercase">STEP 05</span>
                <h4 className="text-base font-bold text-[#102B50] mt-0.5 mb-1.5">결과 확인 및 사후관리</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  자금 실행 및 인증 취득 완료 후 후속 연계 과제와 정기 사후관리를 지속합니다.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/about/process">
              <Button variant="outline" size="md">
                프로세스 상세 내용 확인하기 →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: 컨설팅 사례
          실제 관리자가 등록한 컨설팅 사례를 카드형으로 표시
          제목, 서비스 유형, 기업 업종, 진행 내용, 결과 요약 표시
          실제 사례가 없으면 허위 성공사례를 생성하지 말고 안내 문구를 표시
      ========================================================================= */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
                CONSULTING CASE STUDIES
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102B50] mt-1.5">
                실제 컨설팅 진행 사례
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                고객사의 사전 동의를 득한 검증된 컨설팅 진행 내용과 결과 요약입니다.
              </p>
            </div>
            <Link to="/support/cases" className="mt-4 md:mt-0">
              <span className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1">
                사례 게시판 전체보기 <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          </div>

          {/* If cases exist, render real registered cards. If none, render explicit guidance notice. */}
          {SUCCESS_CASES && SUCCESS_CASES.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SUCCESS_CASES.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl p-6 bg-white border border-slate-200 hover:border-[#2563EB]/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Header: Service Type Badge & Industry */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <span className="text-xs font-bold text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded">
                        {item.serviceType || item.serviceCategory}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        업종: {item.industry}
                      </span>
                    </div>

                    {/* Case Title */}
                    <h3 className="text-base sm:text-lg font-bold text-[#102B50] leading-snug">
                      {item.title || `${item.companyName} 자금 조달 및 인증`}
                    </h3>

                    {/* Progress / Process Details */}
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 block mb-1">
                        진행 내용
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed bg-[#F8FAFC] p-3 rounded-lg border border-slate-100">
                        {item.processSummary || item.summary}
                      </p>
                    </div>

                    {/* Result Summary */}
                    <div>
                      <span className="text-[11px] font-bold text-[#102B50] block mb-1">
                        결과 요약
                      </span>
                      <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-100 text-xs font-semibold text-[#102B50] flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                        <span>{item.resultSummary || item.achievement}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>소요 기간: {item.period}</span>
                    <span className="text-slate-400 font-normal">※ 기업 정보 비식별화 처리</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State Guidance UI */
            <div className="rounded-2xl p-10 bg-[#F8FAFC] border border-dashed border-slate-300 text-center max-w-xl mx-auto space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#102B50]">
                등록된 공개 컨설팅 사례를 준비 중입니다.
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                비즈온탑은 고객사의 영업비밀과 개인정보 보호 규정을 철저히 준수합니다.
                허위 사례를 생성하지 않으며, 정식 동의를 완료한 실제 검증 사례에 한하여 순차적으로 공개하고 있습니다.
              </p>
              <div className="pt-2">
                <Link to="/consultation">
                  <Button variant="outline" size="sm">
                    유사 업종 1:1 비공개 상담 문의
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Privacy & Ethical Consulting Notice */}
          <div className="mt-8 p-4 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
            비즈온탑은 금융 및 경영 자문 규정을 준수하며, 고객사의 사전 승인 없는 허위·과장 사례를 게시하지 않습니다.
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: 최신 정보
          정책자금 소식과 기업인증 정보 게시판의 최신 게시글을 각각 3개씩 노출
          게시글 제목, 카테고리, 등록일, 상세페이지 링크 제공
          게시글이 없을 경우 빈 상태 UI 표시
      ========================================================================= */}
      <section className="py-20 bg-[#F7F9FC] border-t border-slate-200">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
              LATEST INSIGHTS & ANNOUNCEMENTS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102B50] mt-1.5 mb-2">
              최신 정책자금 및 기업인증 정보
            </h2>
            <p className="text-sm text-slate-600">
              급변하는 정부 정책 트렌드와 기업인증 제도 변경 사항을 신속하게 안내해 드립니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Column 1: 최신 정책자금 소식 (3개) */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
                    <h3 className="text-lg font-bold text-[#102B50]">
                      최신 정책자금 소식
                    </h3>
                  </div>
                  <Link
                    to="/board?type=news"
                    className="text-xs text-slate-500 hover:text-[#2563EB] flex items-center gap-1 font-medium transition-colors"
                  >
                    더보기 <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {latestNews && latestNews.length > 0 ? (
                  <div className="space-y-3">
                    {latestNews.map((item) => (
                      <Link
                        key={item.id}
                        to={`/board/${item.id}`}
                        className="group block p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <Badge variant="sub" size="sm">
                            {item.categoryTag || '정책자금'}
                          </Badge>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1 shrink-0">
                            <Calendar className="w-3 h-3" />
                            {item.createdAt}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-[#2563EB] line-clamp-1 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-1">
                          {item.content.replace(/<[^>]*>?/gm, '').trim()}
                        </p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  /* Empty State */
                  <div className="py-12 text-center text-slate-400 space-y-2">
                    <FileText className="w-8 h-8 mx-auto text-slate-300" />
                    <p className="text-xs">등록된 정책자금 소식이 없습니다.</p>
                  </div>
                )}
              </div>

              <div className="pt-4 mt-2 text-right">
                <Link
                  to="/board?type=news"
                  className="text-xs text-[#2563EB] font-bold hover:underline"
                >
                  정책자금 게시판 바로가기 →
                </Link>
              </div>
            </div>

            {/* Column 2: 최신 기업인증 정보 (3개) */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D5A64B]" />
                    <h3 className="text-lg font-bold text-[#102B50]">
                      기업인증 정보
                    </h3>
                  </div>
                  <Link
                    to="/board?type=cert"
                    className="text-xs text-slate-500 hover:text-[#2563EB] flex items-center gap-1 font-medium transition-colors"
                  >
                    더보기 <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {latestCerts && latestCerts.length > 0 ? (
                  <div className="space-y-3">
                    {latestCerts.map((item) => (
                      <Link
                        key={item.id}
                        to={`/board/${item.id}`}
                        className="group block p-3 rounded-xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50/20 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <Badge variant="accent" size="sm">
                            {item.categoryTag || '기업인증'}
                          </Badge>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1 shrink-0">
                            <Calendar className="w-3 h-3" />
                            {item.createdAt}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-[#2563EB] line-clamp-1 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-1">
                          {item.content.replace(/<[^>]*>?/gm, '').trim()}
                        </p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  /* Empty State */
                  <div className="py-12 text-center text-slate-400 space-y-2">
                    <FileText className="w-8 h-8 mx-auto text-slate-300" />
                    <p className="text-xs">등록된 기업인증 정보가 없습니다.</p>
                  </div>
                )}
              </div>

              <div className="pt-4 mt-2 text-right">
                <Link
                  to="/board?type=cert"
                  className="text-xs text-[#2563EB] font-bold hover:underline"
                >
                  기업인증 정보 전체보기 →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: 무료 상담 (간편 상담폼)
          기업명, 이름, 연락처, 관심 서비스 입력
          개인정보 수집 및 이용 동의 체크박스
          실제 상담 접수 기능은 5단계 프로세스와 직접 연결
      ========================================================================= */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F7F9FC]">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
              1:1 FREE CONSULTATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102B50] mt-1.5 mb-3">
              비즈온탑 1:1 무료 상담 신청
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
              초기 비용 없이 신용도 영향 없는 비공개 사전 진단을 제공합니다.
              <br />
              접수 즉시 5단계 프로세스의 <strong className="text-[#102B50] font-bold">1단계 [상담 신청]</strong>이 완료됩니다.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-md">
            {formSubmitted ? (
              <div className="py-8 text-center space-y-5 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <Badge variant="accent" size="md">
                    1단계 상담 접수 완료
                  </Badge>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#102B50] mt-3">
                    상담 신청이 정상적으로 접수되었습니다.
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
                    기업명: <strong>{formData.companyName}</strong> ({formData.name} 대표/담당자님)
                    <br />
                    관심 서비스: <strong>{formData.service}</strong>
                    <br />
                    비즈온탑 전담 수석 컨설턴트가 <strong className="text-[#2563EB]">2단계 [기업 현황 진단]</strong>을 위해
                    24시간 이내에 <strong>{formData.phone}</strong> 번호로 연락드리겠습니다.
                  </p>
                </div>

                <div className="pt-3 flex flex-col sm:flex-row justify-center gap-3">
                  <Link to="/consultation">
                    <Button variant="accent" size="md" className="font-bold">
                      상세 진단 정보 추가 입력하기
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        companyName: '',
                        name: '',
                        phone: '',
                        service: '정책자금 조달',
                        agreed: false,
                      });
                    }}
                  >
                    새로운 상담 신청하기
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSimpleConsultSubmit} className="space-y-6">
                {formError && (
                  <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* 1. 기업명 */}
                  <Input
                    label="기업명 (상호명)"
                    placeholder="예: (주)비즈온테크"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    required
                  />

                  {/* 2. 이름 */}
                  <Input
                    label="이름 (신청자 / 직책)"
                    placeholder="예: 홍길동 대표"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* 3. 연락처 */}
                  <Input
                    label="연락처 (휴대전화 번호)"
                    placeholder="예: 010-1234-5678"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />

                  {/* 4. 관심 서비스 */}
                  <Select
                    label="관심 서비스"
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    options={[
                      { label: '정책자금 조달 (운전자금 / 창업자금)', value: '정책자금 조달' },
                      { label: '기업인증 취득 (벤처 / 연구소 / 메인·이노비즈)', value: '기업인증 취득' },
                      { label: '경영컨설팅 (법인설립 / 법인전환 / 정관)', value: '경영컨설팅' },
                      { label: '시설자금 및 사옥·공장 매입', value: '시설자금 및 사옥매입' },
                      { label: '종합 패키지 컨설팅 (자금 + 인증 + 자문)', value: '종합 패키지' },
                    ]}
                  />
                </div>

                {/* 5. 개인정보 수집 및 이용 동의 */}
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreed}
                      onChange={(e) =>
                        setFormData({ ...formData, agreed: e.target.checked })
                      }
                      className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
                    />
                    <div className="text-xs text-slate-600 leading-relaxed select-none">
                      <span className="font-semibold text-[#102B50]">
                        [필수] 개인정보 수집 및 이용에 동의합니다.
                      </span>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        수집 목적: 1:1 맞춤형 정책자금 및 기업인증 무료 상담 안내 / 수집 항목: 기업명, 이름, 연락처 / 보유 기간: 상담 종료 시 즉시 파기 (관계 법령 준수)
                      </p>
                    </div>
                  </label>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    fullWidth
                    leftIcon={<Send className="w-4 h-4" />}
                    className="font-bold shadow-md hover:shadow-lg transition-all"
                  >
                    무료 상담 신청 접수하기 (1단계 시작)
                  </Button>
                  <p className="text-[11px] text-center text-slate-400 mt-2.5">
                    ※ 입력하신 정보는 안전하게 암호화되며 신용등급 평가에 어떠한 영향도 미치지 않습니다.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
