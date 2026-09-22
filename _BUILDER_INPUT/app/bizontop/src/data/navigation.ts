import { NavCategory } from '../types';

export const NAVIGATION_DATA: NavCategory[] = [
  {
    title: '회사소개',
    href: '/about',
    description: '기업 성장의 든든한 파트너, 비즈온탑을 소개합니다.',
    items: [
      {
        title: '비즈온탑 소개',
        href: '/about',
        description: '비전 및 핵심 가치, 비즈온탑 전문 컨설팅 역량',
        iconName: 'Building2',
      },
      {
        title: '대표 인사말',
        href: '/about/greeting',
        description: '고객 기업의 성공과 신뢰를 향한 비즈온탑의 다짐',
        iconName: 'UserCheck',
      },
      {
        title: '컨설팅 프로세스',
        href: '/about/process',
        description: '체계적인 4단계 기업 정밀 진단 및 원스톱 솔루션',
        iconName: 'GitMerge',
      },
      {
        title: '오시는 길',
        href: '/about/location',
        description: '비즈온탑 본사 위치 및 대중교통/주차 안내',
        iconName: 'MapPin',
      },
    ],
    highlight: {
      title: '비즈온탑 파트너십',
      description: '누적 1,200+ 중소기업의 정책자금 및 기업인증을 함께 완수했습니다.',
      buttonText: '회사소개 자세히 보기',
      href: '/about',
    },
  },
  {
    title: '정책자금',
    href: '/funding',
    description: '기업 규모와 목적에 부합하는 최적의 정부 정책자금을 매칭합니다.',
    items: [
      {
        title: '소상공인 정책자금',
        href: '/funding/small-business',
        description: '소상공인시장진흥공단 및 지역신용보증재단 저금리 지원',
        badge: '인기',
        iconName: 'Store',
      },
      {
        title: '중소기업 정책자금',
        href: '/funding/sme',
        description: '중진공, 기보, 신보 연계 성장 동력 맞춤형 융자',
        badge: '추천',
        iconName: 'Briefcase',
      },
      {
        title: '창업기업 정책자금',
        href: '/funding/startup',
        description: '예비창업자 및 7년 이내 초기 창업기업 특화 자금',
        iconName: 'Rocket',
      },
      {
        title: '운전자금',
        href: '/funding/working-capital',
        description: '원부자재 구매, 인건비, 마케팅 등 기업 운영 유동성 확보',
        iconName: 'Coins',
      },
      {
        title: '시설자금',
        href: '/funding/facility',
        description: '공장 신축, 기계설비 매입, 사업장 확장용 중장기 자금',
        iconName: 'Factory',
      },
    ],
    highlight: {
      title: '정책자금 자가진단',
      description: '우리 기업에 가장 적합한 정부지원 융자 한도와 금리를 무료로 진단해보세요.',
      buttonText: '무료 자금진단 신청',
      href: '/consultation?service=funding',
    },
  },
  {
    title: '기업인증',
    href: '/certification',
    description: '세제 혜택과 공공입찰 가점을 확보하는 필수 국가 공인 인증 컨설팅',
    items: [
      {
        title: '벤처기업확인',
        href: '/certification/venture',
        description: '법인세 50% 감면, 취득세 75% 감면 및 정부 지원 가점',
        badge: '세제혜택',
        iconName: 'Award',
      },
      {
        title: '기업부설연구소',
        href: '/certification/research-center',
        description: '연구개발비 세액공제(25%), 연구전담인력 소득세 비과세',
        badge: 'R&D',
        iconName: 'Microscope',
      },
      {
        title: '연구개발전담부서',
        href: '/certification/research-department',
        description: '소규모 연구인력으로 세제 혜택 및 기술평가 우대 달성',
        iconName: 'Layers',
      },
      {
        title: 'ISO 인증',
        href: '/certification/iso',
        description: '품질(9001), 환경(14001), 안전보건(45001) 글로벌 표준 인증',
        iconName: 'ShieldCheck',
      },
      {
        title: '메인비즈 (MAIN-BIZ)',
        href: '/certification/mainbiz',
        description: '경영혁신형 중소기업 인증, 금융 융자 및 판로 우대 지원',
        iconName: 'TrendingUp',
      },
      {
        title: '이노비즈 (INNO-BIZ)',
        href: '/certification/innobiz',
        description: '기술혁신형 중소기업 인증, 금융 및 R&D 정부과제 가점',
        iconName: 'CheckCircle2',
      },
    ],
    highlight: {
      title: '인증 패키지 솔루션',
      description: '연구소 설립과 벤처기업 인증을 동시 진행하여 세제 혜택을 극대화합니다.',
      buttonText: '인증 컨설팅 문의',
      href: '/consultation?service=certification',
    },
  },
  {
    title: '경영컨설팅',
    href: '/consulting',
    description: '기업 생애주기 전반에 걸친 재무구조 개선과 지속 성장 전략을 제안합니다.',
    items: [
      {
        title: '법인설립 컨설팅',
        href: '/consulting/incorporation',
        description: '개인사업자 법인전환, 정관 정비 및 주주구조 최적화 설계',
        iconName: 'Scale',
      },
      {
        title: '통합경영자문',
        href: '/consulting/integrated',
        description: '노무, 세무, 법률 리스크를 사전에 예방하는 종합 자문',
        iconName: 'Users',
      },
      {
        title: '부동산 매입 및 시설자금',
        href: '/consulting/real-estate',
        description: '사옥 및 공장 부지 매입, 건축 자금 조달 원스톱 지원',
        iconName: 'Home',
      },
      {
        title: '기업 재무 및 자금조달',
        href: '/consulting/finance',
        description: '가지급금 정리, 이익잉여금 처분, 신용등급 개선 컨설팅',
        iconName: 'PieChart',
      },
      {
        title: '기업 성장전략 수립',
        href: '/consulting/growth',
        description: '신사업 발굴, 비즈니스 모델 재정비 및 중장기 스케일업',
        iconName: 'Compass',
      },
    ],
    highlight: {
      title: '기업 재무구조 진단',
      description: '부채비율 및 차입금 구조를 정밀 분석하여 신용등급을 상승시킵니다.',
      buttonText: '재무 진단 받기',
      href: '/consultation?service=consulting',
    },
  },
  {
    title: '고객센터',
    href: '/board',
    description: '비즈온탑의 최신 정책자금 동향과 유용한 경영 소식을 확인하세요.',
    items: [
      {
        title: '통합 게시판',
        href: '/board',
        description: '공지사항, 정책자금 소식, 기업인증 정보, FAQ 실시간 게시판',
        badge: 'NEW',
        iconName: 'LayoutGrid',
      },
      {
        title: '공지사항',
        href: '/board?type=notice',
        description: '비즈온탑 공식 공지 및 서비스 안내 사항',
        iconName: 'Bell',
      },
      {
        title: '정책자금 소식',
        href: '/board?type=news',
        description: '정부 및 각 지자체 최신 융자·보증 공고 실시간 업데이트',
        badge: '업데이트',
        iconName: 'FileText',
      },
      {
        title: '기업인증 정보',
        href: '/board?type=cert',
        description: '벤처기업, 연구소, 메인/이노비즈 최신 심사 기준 가이드',
        iconName: 'BookOpen',
      },
      {
        title: '컨설팅 사례',
        href: '/board?type=case',
        description: '업종별 실제 자금 조달 및 인증 취득 성공 스토리',
        iconName: 'CheckSquare',
      },
      {
        title: '자주 묻는 질문',
        href: '/board?type=faq',
        description: '상담 전 기업 고객님들이 가장 자주 질문하시는 내용',
        iconName: 'HelpCircle',
      },
      {
        title: '상담 신청',
        href: '/support/inquiry',
        description: '1:1 전문 경영컨설턴트 무료 방문/유선 상담 접수',
        badge: '무료',
        iconName: 'PhoneCall',
      },
    ],
    highlight: {
      title: '1:1 비공개 상담',
      description: '기업의 소중한 경영정보는 철저한 비밀유지서약서(NDA)를 바탕으로 보호됩니다.',
      buttonText: '온라인 상담 접수',
      href: '/support/inquiry',
    },
  },
];

export const MEMBER_ROUTES = [
  { title: '로그인', href: '/auth/login' },
  { title: '회원가입', href: '/auth/register' },
  { title: '비밀번호 찾기', href: '/auth/forgot-password' },
  { title: '회원정보 수정', href: '/member/profile' },
  { title: '마이페이지', href: '/member/mypage' },
];

export const FOOTER_INFO = {
  brandName: '비즈온탑 (BIZ ON TOP)',
  slogan: '기업 성장의 든든한 파트너',
  description: '비즈온탑은 중소기업과 소상공인의 든든한 성장 파트너로서, 정책자금 융자 연계, 필수 기업인증 취득, 종합 경영컨설팅까지 원스톱 맞춤 솔루션을 제공하는 종합 기업자문 전문 기업입니다.',
  companyInfo: {
    corpName: '비즈온탑 경영컨설팅',
    ceo: '[관리자 설정값]',
    businessNumber: '[관리자 설정값]',
    onlineReportNumber: '[관리자 설정값]',
    address: '[관리자 설정값]',
    tel: '[관리자 설정값]',
    email: '[관리자 설정값]',
    privacyOfficer: '[관리자 설정값]',
    operatingHours: '평일 09:00 ~ 18:00 (점심시간 12:00 ~ 13:00 / 주말 및 공휴일 휴무)',
  },
};
