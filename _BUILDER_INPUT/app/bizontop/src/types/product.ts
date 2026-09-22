export type ProductCategory = 'funding' | 'certification' | 'consulting';

export interface ProductDetail {
  id: string;
  category: ProductCategory;
  categoryName: string;
  categoryHref: string;
  name: string;
  shortDesc: string;
  heroBadge: string;
  ctaText: string;
  image: string;
  isPublished?: boolean;
  connectedServiceId?: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;

  // 1. 서비스 소개 (목적과 주요 내용)
  purposeAndContent: {
    purpose: string;
    content: string[];
  };

  // 2. 주요 상담 대상
  targetClients: {
    title: string;
    list: string[];
  };

  // 3. 신청 또는 진행 요건 (보장 문구 배제)
  requirements: {
    title: string;
    disclaimer?: string;
    list: string[];
  };

  // 4. 주요 지원 및 컨설팅 내용
  consultingScope: {
    title: string;
    items: {
      title: string;
      desc: string;
    }[];
  };

  // 5. 진행 절차 (단계별 프로세스)
  process: {
    step: number;
    title: string;
    desc: string;
  }[];

  // 6. 준비서류 및 확인사항
  documents: {
    title: string;
    list: string[];
    notice?: string;
  };

  // 7. 자주 묻는 질문
  faqs: {
    q: string;
    a: string;
  }[];

  // 8. 관련 상품 추천
  relatedProductIds: string[];

  // 유의사항 박스 (정책자금 변동 공고, 인증 심사기관 정확도, 전문자격 연계 안내 등)
  noticeBox: {
    title: string;
    text: string;
    type?: 'info' | 'warning';
  };
}

export interface CategoryDetail {
  id: ProductCategory;
  name: string;
  englishName: string;
  slug: string;
  heroTitle: string;
  heroSubtitle: string;
  description: string;
  image: string;
  productIds: string[];
  process: {
    step: number;
    title: string;
    desc: string;
  }[];
  faqs: {
    q: string;
    a: string;
  }[];
  metaTitle: string;
  metaDescription: string;
}
