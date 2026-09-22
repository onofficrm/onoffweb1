export type BoardType = 
  | 'notice'      // 공지사항
  | 'news'        // 정책자금 소식
  | 'cert'        // 기업인증 정보
  | 'consulting'  // 경영컨설팅 정보
  | 'case'        // 컨설팅 사례
  | 'faq';        // 자주 묻는 질문

export interface BoardCategoryConfig {
  type: BoardType;
  name: string;
  description: string;
  badge: string;
  adminOnlyWrite: boolean; // 관리자만 작성 가능 여부
  iconName: string;
}

export interface BoardAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

export interface BoardImage {
  id: string;
  name: string;
  url: string;
  size?: number;
}

export interface BoardPost {
  id: string;
  type: BoardType;
  title: string;
  content: string; // HTML/RichText
  authorId: string;
  authorName: string;
  authorRole: 'admin' | 'user';
  createdAt: string; // YYYY-MM-DD HH:mm:ss
  updatedAt: string;
  views: number;
  isPublic: boolean; // 공개 여부 (false = 비공개/비밀글)
  isPinned: boolean; // 상단 고정 여부
  categoryTag?: string; // 세부 카테고리 태그 (예: '필독', '중진공', 'ISO')
  attachments: BoardAttachment[];
  images: BoardImage[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  company?: string;
}

export const BOARD_CATEGORIES: Record<BoardType, BoardCategoryConfig> = {
  notice: {
    type: 'notice',
    name: '공지사항',
    description: '비즈온탑 공식 공지 및 서비스 안내 사항을 신속하게 전달해 드립니다.',
    badge: '공지',
    adminOnlyWrite: true,
    iconName: 'Bell',
  },
  news: {
    type: 'news',
    name: '정책자금 소식',
    description: '정부 및 각 정책금융기관의 최신 융자·보증 공고 및 제도 변경 소식을 안내합니다.',
    badge: '정책자금',
    adminOnlyWrite: true,
    iconName: 'FileText',
  },
  cert: {
    type: 'cert',
    name: '기업인증 정보',
    description: '벤처기업확인, 기업부설연구소, ISO, 메인/이노비즈 최신 심사 지침과 실무 가이드입니다.',
    badge: '기업인증',
    adminOnlyWrite: true,
    iconName: 'Award',
  },
  consulting: {
    type: 'consulting',
    name: '경영컨설팅 정보',
    description: '법인전환, 가지급금 정리, 기업 신용평가 개선 및 R&D 전략에 관한 전문가 인사이트입니다.',
    badge: '경영컨설팅',
    adminOnlyWrite: true,
    iconName: 'Briefcase',
  },
  case: {
    type: 'case',
    name: '컨설팅 사례',
    description: '비즈온탑과 함께 정책자금 조달 및 인증 취득에 성공한 중소기업·소상공인 실제 사례입니다.',
    badge: '성공사례',
    adminOnlyWrite: true,
    iconName: 'TrendingUp',
  },
  faq: {
    type: 'faq',
    name: '자주 묻는 질문',
    description: '고객 기업 대표님들께서 자주 문의하시는 주요 질문과 명쾌한 답변 모음입니다.',
    badge: 'FAQ',
    adminOnlyWrite: true,
    iconName: 'HelpCircle',
  },
};
