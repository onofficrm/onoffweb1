import { BoardPost, BoardType, UserProfile } from '../types/board';
import { sanitizeHtml } from '../utils/sanitize';

const STORAGE_KEY = 'bizontop_board_posts_v1.2';
const AUTH_KEY = 'bizontop_auth_user_v1.1';

// 기본 시뮬레이션 사용자 프로필
export const DEFAULT_USERS: Record<'admin' | 'user' | 'guest', UserProfile> = {
  admin: {
    id: 'admin-1',
    name: '비즈온탑 관리자',
    email: 'admin@bizontop.co.kr',
    role: 'admin',
    company: '비즈온탑 경영컨설팅 본사',
  },
  user: {
    id: 'user-101',
    name: '김성현 대표',
    email: 'sh.kim@nexttech.kr',
    role: 'user',
    company: '(주)넥스트테크놀로지',
  },
  guest: {
    id: 'guest',
    name: '방문자(비회원)',
    email: '',
    role: 'guest',
  },
};

// 초기 실감 나는 게시글 시드 데이터
const INITIAL_POSTS: BoardPost[] = [
  // 1. 공지사항 (notice)
  {
    id: 'notice-1',
    type: 'notice',
    title: '[필독] 2026년도 상반기 중소기업 정책자금 선착순 접수 대응 및 사전진단 안내',
    content: `
      <p>안녕하십니까, 중소기업의 든든한 파트너 <strong>비즈온탑(BIZ ON TOP)</strong>입니다.</p>
      <p>중소벤처기업부 및 각 정책금융기관(중진공, 소진공, 신보, 기보)의 <strong>2026년도 정책자금 융자 공고</strong>가 확정되었습니다.</p>
      <p>올해는 전년 대비 예산 소진 속도가 더욱 빠를 것으로 예상되오니, 시설자금 및 대규모 운전자금 조달을 계획 중이신 기업 대표님들께서는 서둘러 사전 기업진단을 신청하시기 바랍니다.</p>
      <br/>
      <h3>■ 2026년 상반기 정책자금 접수 핵심 포인트</h3>
      <ul>
        <li><strong>선착순 접수 마감:</strong> 매월 초 온라인 선착순 접수가 10분 이내 마감되므로 철저한 서류 편철 및 사업계획서 사전 작성이 필수입니다.</li>
        <li><strong>가점 지표 우선 배정:</strong> 벤처기업확인, 기업부설연구소, 메인비즈/이노비즈 인증 기업 우선 심사.</li>
        <li><strong>금리 인하 혜택:</strong> 기준금리 연동 정책 우대금리(연 2.0%~3.2% 수준) 적용.</li>
      </ul>
      <br/>
      <p>비즈온탑은 전문 수석 컨설턴트를 1:1로 배정하여 기업의 재무 상태 분석부터 보증서 발급, 은행 실행까지 전 과정을 밀착 지원합니다.</p>
    `,
    authorId: 'admin-1',
    authorName: '비즈온탑 본사운영팀',
    authorRole: 'admin',
    createdAt: '2026-03-20 09:30:00',
    updatedAt: '2026-03-20 09:30:00',
    views: 1845,
    isPublic: true,
    isPinned: true,
    categoryTag: '필독',
    attachments: [
      {
        id: 'att-1',
        name: '2026_중소기업_정책자금_융자계획_공고문.pdf',
        size: 2450000,
        type: 'application/pdf',
        url: '#',
      },
    ],
    images: [],
  },
  {
    id: 'notice-2',
    type: 'notice',
    title: '비즈온탑 24시간 온라인 사전 기업진단 접수 시스템 고도화 완료',
    content: `
      <p>고객사 대표님들의 신속한 상담 문의 편의를 위하여 <strong>온라인 사전 기업진단 시스템</strong>의 인프라를 대폭 개편하였습니다.</p>
      <p>기존 업무시간 외에도 주말이나 야간에 간편 상담을 접수해 주시면 다음 영업일 오전 10시 이내 전담 수석 컨설턴트가 1:1 유선으로 배정 결과를 안내해 드립니다.</p>
      <br/>
      <h3>■ 주요 개선 사항</h3>
      <ul>
        <li>신용조회 기록이 전혀 남지 않는 안심 사전 진단 프로세스 구축</li>
        <li>기업 규모별(소상공인 / 유망 중소기업 / 스타트업) 전담 상담 트랙 분리</li>
        <li>필요 서류 체크리스트 알림톡 자동 발송 시스템 도입</li>
      </ul>
    `,
    authorId: 'admin-1',
    authorName: '고객경험혁신팀',
    authorRole: 'admin',
    createdAt: '2026-03-15 14:20:00',
    updatedAt: '2026-03-15 14:20:00',
    views: 920,
    isPublic: true,
    isPinned: false,
    categoryTag: '서비스안내',
    attachments: [],
    images: [],
  },

  // 2. 정책자금 소식 (news)
  {
    id: 'news-1',
    type: 'news',
    title: '중기부, 2026년 중소기업·스타트업 정책금융 예산 4조 8천억 원 확정 발표',
    content: `
      <p>중소벤처기업부가 2026년도 중소벤처기업 및 소상공인의 유동성 애로 해소와 첨단산업 도약을 지원하기 위해 총 <strong>4조 8,000억 원 규모의 정책자금 공급 계획</strong>을 최종 공고했습니다.</p>
      <br/>
      <h3>주요 지원 방향</h3>
      <ol>
        <li><strong>수출 및 신산업 스케일업:</strong> AI, 로봇, 친환경 미래차 등 10대 첨단 기술 분야 기업에 업체당 최대 60억 원 한도 공급.</li>
        <li><strong>청년창업 및 초기 스타트업:</strong> 창업 7년 이내 유망 기업에 2%대 고정·변동 저금리 및 장기 거치기간(최대 5년) 부여.</li>
        <li><strong>고금리 취약 소상공인 대환보증:</strong> 제2금융권 7% 이상 고금리 대출을 3%대 저금리 정책보증으로 대환 지원.</li>
      </ol>
      <br/>
      <p>비즈온탑 경영컨설팅은 각 정책기관(중진공, 기보, 신보)의 심사 가이드라인에 맞춘 사업계획서 고도화 컨설팅을 즉시 지원하고 있습니다.</p>
    `,
    authorId: 'admin-1',
    authorName: '정책자금전략연구소',
    authorRole: 'admin',
    createdAt: '2026-03-18 11:15:00',
    updatedAt: '2026-03-18 11:15:00',
    views: 2410,
    isPublic: true,
    isPinned: true,
    categoryTag: '중기부공고',
    attachments: [
      {
        id: 'att-news-1',
        name: '2026년도_정책자금_융자사업_주요변경사항_요약.pdf',
        size: 1820000,
        type: 'application/pdf',
        url: '#',
      },
    ],
    images: [],
  },
  {
    id: 'news-2',
    type: 'news',
    title: '신용보증기금·기술보증기금 스마트공장 및 자동화 설비 특례보증 접수',
    content: `
      <p>제조업 현장의 디지털 전환과 생산성 향상을 위한 <strong>스마트공장 구축 및 자동화 설비 도입 특례보증</strong>이 신규 출시되었습니다.</p>
      <p>보증비율 95% 이상 우대 및 보증료율 최대 0.3%p 감면 혜택이 주어지며, 시중 1금융권 협약은행을 통해 추가 금리 우대가 제공됩니다.</p>
    `,
    authorId: 'admin-1',
    authorName: '정책자금전략연구소',
    authorRole: 'admin',
    createdAt: '2026-03-10 16:45:00',
    updatedAt: '2026-03-10 16:45:00',
    views: 1150,
    isPublic: true,
    isPinned: false,
    categoryTag: '보증기관',
    attachments: [],
    images: [],
  },

  // 3. 기업인증 정보 (cert)
  {
    id: 'cert-1',
    type: 'cert',
    title: '2026 벤처기업확인 제도 개편 심사 기준 및 세제 혜택 총정리',
    content: `
      <p>민간 주도 벤처기업확인 제도가 개편됨에 따라 혁신성장유형 평가지표가 한층 정교해졌습니다.</p>
      <br/>
      <h3>벤처기업확인 획득 시 4대 핵심 혜택</h3>
      <ul>
        <li><strong>법인세·소득세 5년간 50% 감면:</strong> 창업 3년 이내 벤처확인 취득 시 막대한 절세 효과.</li>
        <li><strong>부동산 취득세 75% 감면:</strong> 사업용 부동산 취득 시 지방세 대폭 절감.</li>
        <li><strong>정책자금 심사 최고 가점:</strong> 기보·중진공 융자 심사 시 우선 배정 및 보증한도 확대.</li>
        <li><strong>공공조달 입찰 가점:</strong> 중기 간 경쟁제품 조달 가점 확보.</li>
      </ul>
      <p>비즈온탑은 전문 연구인력의 기술성 진단 및 사업계획서 코칭으로 단기간 내 높은 합격률을 달성해 드립니다.</p>
    `,
    authorId: 'admin-1',
    authorName: '기업인증전문위원',
    authorRole: 'admin',
    createdAt: '2026-03-16 10:00:00',
    updatedAt: '2026-03-16 10:00:00',
    views: 3120,
    isPublic: true,
    isPinned: true,
    categoryTag: '벤처기업',
    attachments: [
      {
        id: 'att-cert-1',
        name: '벤처기업확인_자가진단_체크리스트_2026.xlsx',
        size: 540000,
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        url: '#',
      },
    ],
    images: [],
  },
  {
    id: 'cert-2',
    type: 'cert',
    title: '기업부설연구소 설립 요건 및 R&D 연구인력비 25% 세액공제 가이드',
    content: `
      <p>이공계 학위 소지 직원 1인 이상인 기업이라면 기업부설연구소 또는 연구개발전담부서 설립을 통해 매년 막대한 법인세 세액공제를 받을 수 있습니다.</p>
      <p>한국산업기술진흥협회(KOITA) 온라인 신청 절차와 사후관리 요건(연구개발활동조사표)을 상세히 안내해 드립니다.</p>
    `,
    authorId: 'admin-1',
    authorName: '기업인증전문위원',
    authorRole: 'admin',
    createdAt: '2026-03-08 15:30:00',
    updatedAt: '2026-03-08 15:30:00',
    views: 1480,
    isPublic: true,
    isPinned: false,
    categoryTag: '기업부설연구소',
    attachments: [],
    images: [],
  },

  // 4. 경영컨설팅 정보 (consulting)
  {
    id: 'consulting-1',
    type: 'consulting',
    title: '대표이사 가지급금 수억 원 누적 시 세무 리스크와 합법적 정리 솔루션',
    content: `
      <p>법인을 운영하다 보면 불가피하게 발생하는 대표이사 <strong>가지급금</strong>은 장기 방치 시 심각한 세무 조사 및 기업 신용등급 하락을 초래합니다.</p>
      <br/>
      <h3>가지급금이 미치는 4대 악영향</h3>
      <ol>
        <li>매년 4.6%의 인정이자 계산으로 법인세 증가</li>
        <li>대표이사 상여 처리로 인한 종합소득세 및 4대 보험료 폭탄</li>
        <li>금융기관 신용평가 시 차입금 감점 및 정책자금 부결 사유</li>
        <li>법인 폐업 또는 가업 승계 시 막대한 과세 부담</li>
      </ol>
      <br/>
      <p>비즈온탑은 대표이사의 특허권 자본화, 이익잉여금 자기주식 취득, 임원 퇴직금 중간정산 플랜 등 세법상 인정되는 합법적 통로를 통해 세부담을 최소화하여 깨끗하게 정리해 드립니다.</p>
    `,
    authorId: 'admin-1',
    authorName: '세무·재무전문컨설턴트',
    authorRole: 'admin',
    createdAt: '2026-03-14 13:00:00',
    updatedAt: '2026-03-14 13:00:00',
    views: 1980,
    isPublic: true,
    isPinned: false,
    categoryTag: '재무전략',
    attachments: [],
    images: [],
  },
  {
    id: 'consulting-2',
    type: 'consulting',
    title: '개인사업자에서 일반 법인으로의 안전한 전환 시점과 절세 로드맵',
    content: `
      <p>연간 종합소득 과세표준이 8,800만 원(세율 35%) 또는 1억 5천만 원(세율 38%)을 초과하는 개인사업자는 법인 전환을 통해 최고 세율 격차(법인세율 9~19% 대)를 활용한 획기적인 절세가 가능합니다.</p>
      <p>포괄양수도, 세감면 사업양수도, 현물출자 방식의 차이점을 분석해 드립니다.</p>
    `,
    authorId: 'admin-1',
    authorName: '세무·재무전문컨설턴트',
    authorRole: 'admin',
    createdAt: '2026-02-27 17:10:00',
    updatedAt: '2026-02-27 17:10:00',
    views: 1210,
    isPublic: true,
    isPinned: false,
    categoryTag: '법인전환',
    attachments: [],
    images: [],
  },

  // 5. 컨설팅 사례 (case)
  {
    id: 'case-1',
    type: 'case',
    title: '정밀 금형 제조 중소기업 중진공 시설 및 운전자금 24억 원 조달 성공기',
    content: `
      <p><strong>고객사:</strong> (주)케이엠테크 (정밀 금형 및 자동차 부품 제조업)</p>
      <p><strong>주요 과제:</strong> 기존 노후 임차 공장의 임대료 급증 및 신규 산업단지 분양 부지 매입과 첨단 5축 가공기 도입을 위한 대규모 설비 자금 필요.</p>
      <br/>
      <h3>비즈온탑의 맞춤 컨설팅 솔루션</h3>
      <ul>
        <li>3개년 재무제표의 비영업 자산 정리 및 부채비율 180% 이하 리밸런싱.</li>
        <li>국내 유수 완성차 협력업체 공급계약서 및 수주잔고를 반영한 평가위원 맞춤형 사업계획서 편철.</li>
        <li>중소벤처기업진흥공단 혁신성장 시설자금 트랙 단독 집중 매칭.</li>
      </ul>
      <br/>
      <p><strong>최종 성과:</strong> 중진공 시설자금 20억 원 + 원자재 구매 운전자금 4억 원, 총 24억 원 최저 2%대 우대금리 실행 완료 (컨설팅 착수 후 4주 만에 기표 완료).</p>
    `,
    authorId: 'admin-1',
    authorName: '수석컨설턴트 박진우',
    authorRole: 'admin',
    createdAt: '2026-03-12 16:00:00',
    updatedAt: '2026-03-12 16:00:00',
    views: 2840,
    isPublic: true,
    isPinned: true,
    categoryTag: '시설자금',
    attachments: [],
    images: [],
  },
  {
    id: 'case-2',
    type: 'case',
    title: 'AI 스마트물류 스타트업 기보 청년창업 5억 원 조달 및 벤처인증 동시 획득',
    content: `
      <p><strong>고객사:</strong> (주)넥스트소프트 (AI 물류 솔루션 스타트업)</p>
      <p><strong>성과:</strong> 재무 데이터가 부족한 업력 2년 차 기업이었으나 특허 기술 보고서 작성 및 기보 전문위원 기술평가 현장 대응 코칭을 통해 5억 원 보증서 발급과 혁신성장형 벤처기업 인증을 동시 획득하여 5년간 법인세 50% 감면 혜택을 확보했습니다.</p>
    `,
    authorId: 'admin-1',
    authorName: '수석컨설턴트 이도윤',
    authorRole: 'admin',
    createdAt: '2026-03-04 11:20:00',
    updatedAt: '2026-03-04 11:20:00',
    views: 1720,
    isPublic: true,
    isPinned: false,
    categoryTag: '스타트업',
    attachments: [],
    images: [],
  },

  // 6. 자주 묻는 질문 (faq)
  {
    id: 'faq-1',
    type: 'faq',
    title: '정책자금 신청 시 컨설팅을 받으면 어떤 점이 유리한가요?',
    content: `
      <p>정부 정책자금은 예산이 한정되어 있어 기관별 엄격한 기술성, 재무성, 성장성 지표를 종합 평가하여 선발합니다.</p>
      <p>특히 <strong>심사 탈락 시 통상 6개월간 재신청이 엄격히 제한</strong>되는 패널티가 발생하므로, 첫 신청 시 기업의 강점을 극대화한 사업계획서와 증빙을 완벽히 갖추는 것이 핵심입니다.</p>
      <p>비즈온탑은 사전 스크리닝을 통해 부결 리스크 요인을 사전에 제거하고 승인율이 가장 높은 최적 기관 트랙을 연계해 드립니다.</p>
    `,
    authorId: 'admin-1',
    authorName: '고객지원팀',
    authorRole: 'admin',
    createdAt: '2026-03-01 10:00:00',
    updatedAt: '2026-03-01 10:00:00',
    views: 4120,
    isPublic: true,
    isPinned: true,
    categoryTag: '정책자금FAQ',
    attachments: [],
    images: [],
  },
  {
    id: 'faq-2',
    type: 'faq',
    title: '신용점수가 다소 낮거나 기존 대출이 있어도 정책자금 지원이 가능한가요?',
    content: `
      <p>네, 가능합니다.</p>
      <p>시중 은행 대출과 달리 정부 정책금융은 신용보증재단, 신용보증기금, 기술보증기금의 보증서를 바탕으로 실행됩니다.</p>
      <p>성장 잠재력, 기술 특허, 고용 창출 실적이 우수하다면 담보가 부족하거나 중·저신용 상태라도 특례보증 및 재도전 특별지원 자금을 통해 조달할 수 있습니다.</p>
    `,
    authorId: 'admin-1',
    authorName: '고객지원팀',
    authorRole: 'admin',
    createdAt: '2026-02-20 14:00:00',
    updatedAt: '2026-02-20 14:00:00',
    views: 2950,
    isPublic: true,
    isPinned: false,
    categoryTag: '자격조건FAQ',
    attachments: [],
    images: [],
  },
  // 비공개 상담글 예시 (작성자: user-101, 비공개)
  {
    id: 'user-private-1',
    type: 'consulting',
    title: '[비공개 상담] 제조업 매출 30억 규모 운전자금 및 시설자금 심사 문의',
    content: `
      <p>안녕하세요. (주)넥스트테크놀로지 대표 김성현입니다.</p>
      <p>올해 상반기 자동화 설비 도입과 공장 증축을 검토하고 있습니다. 현재 부채비율 190% 수준이며, 최근 3개년 매출은 25억에서 32억으로 상승 중입니다.</p>
      <p>중진공이나 기보를 통한 시설자금 15억 및 운전자금 3억 조달이 가능한지 사전 진단을 의뢰드립니다.</p>
      <p>※ 기업 재무 정보가 포함되어 있어 비공개로 문의드립니다.</p>
    `,
    authorId: 'user-101',
    authorName: '김성현 대표',
    authorRole: 'user',
    createdAt: '2026-03-19 15:40:00',
    updatedAt: '2026-03-19 15:40:00',
    views: 12,
    isPublic: false, // 비공개 글!
    isPinned: false,
    categoryTag: '상담의뢰',
    attachments: [],
    images: [],
  },
];

class BoardService {
  private posts: BoardPost[] = [];
  private currentUser: UserProfile = DEFAULT_USERS.admin;

  constructor() {
    this.initStorage();
    this.initAuth();
  }

  private initStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.posts = JSON.parse(stored);
      } else {
        this.posts = INITIAL_POSTS;
        this.savePosts();
      }
    } catch (e) {
      console.warn('LocalStorage error, using memory storage', e);
      this.posts = INITIAL_POSTS;
    }
  }

  private savePosts() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.posts));
      // 브로드캐스트 이벤트 발행으로 탭 간/컴포넌트 간 동기화
      window.dispatchEvent(new CustomEvent('bizontop_board_updated'));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  }

  private initAuth() {
    try {
      const storedAuth = localStorage.getItem(AUTH_KEY);
      if (storedAuth) {
        this.currentUser = JSON.parse(storedAuth);
      } else {
        this.currentUser = DEFAULT_USERS.admin; // 기본 관리자로 데모 체험 가능
        localStorage.setItem(AUTH_KEY, JSON.stringify(this.currentUser));
      }
    } catch {
      this.currentUser = DEFAULT_USERS.admin;
    }
  }

  // --- 사용자 권한 관리 ---
  public getCurrentUser(): UserProfile {
    return this.currentUser;
  }

  public setCurrentUser(user: UserProfile): UserProfile {
    this.currentUser = user;
    try {
      localStorage.setItem(AUTH_KEY, JSON.stringify(this.currentUser));
      window.dispatchEvent(new CustomEvent('bizontop_auth_updated', { detail: this.currentUser }));
    } catch (e) {
      console.warn(e);
    }
    return this.currentUser;
  }

  public setCurrentUserRole(role: 'admin' | 'user' | 'guest'): UserProfile {
    this.currentUser = DEFAULT_USERS[role];
    try {
      localStorage.setItem(AUTH_KEY, JSON.stringify(this.currentUser));
      window.dispatchEvent(new CustomEvent('bizontop_auth_updated', { detail: this.currentUser }));
    } catch (e) {
      console.warn(e);
    }
    return this.currentUser;
  }

  public canUserEditOrDelete(post: BoardPost, user: UserProfile = this.currentUser): boolean {
    if (user.role === 'admin') return true;
    if (user.role === 'user' && post.authorId === user.id) return true;
    return false;
  }

  public canUserView(post: BoardPost, user: UserProfile = this.currentUser): boolean {
    if (post.isPublic) return true;
    if (user.role === 'admin') return true;
    if (user.role === 'user' && post.authorId === user.id) return true;
    return false;
  }

  public canUserWriteCategory(type: BoardType, user: UserProfile = this.currentUser): boolean {
    // 공지사항 및 정보성 게시판(notice, news, cert, consulting, case, faq)은 관리자만 작성 가능
    // 일반 회원은 비공개 상담글 또는 일반 게시 권한이 있는 경우 작성 가능
    if (user.role === 'admin') return true;
    if (user.role === 'user') {
      // 일반 회원은 consulting(상담문의) 카테고리 등 작성 가능
      return type === 'consulting';
    }
    return false;
  }

  // --- 게시글 조회 API ---
  public getPosts(params?: {
    type?: BoardType | 'all';
    search?: string;
    page?: number;
    limit?: number;
    user?: UserProfile;
  }): {
    posts: BoardPost[];
    total: number;
    totalPages: number;
    currentPage: number;
    pinnedPosts: BoardPost[];
  } {
    this.initStorage(); // 최신 상태 반영
    const user = params?.user || this.currentUser;
    const type = params?.type || 'all';
    const search = (params?.search || '').trim().toLowerCase();
    const page = Math.max(1, params?.page || 1);
    const limit = Math.max(1, params?.limit || 10);

    // 권한 필터링: 공개 글이거나 본인 글/관리자만 노출
    let filtered = this.posts.filter((p) => this.canUserView(p, user));

    // 카테고리 필터링
    if (type !== 'all') {
      filtered = filtered.filter((p) => p.type === type);
    }

    // 검색어 필터링 (제목, 본문, 작성자, 태그)
    if (search) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(search) ||
          p.content.toLowerCase().includes(search) ||
          p.authorName.toLowerCase().includes(search) ||
          (p.categoryTag && p.categoryTag.toLowerCase().includes(search))
      );
    }

    // 상단 고정 글 분리 (검색 결과 내에서도 상단 고정 유지)
    const pinnedPosts = filtered.filter((p) => p.isPinned);
    const regularPosts = filtered.filter((p) => !p.isPinned);

    // 일반 글 정렬: 최신 등록순
    regularPosts.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // 상단 고정 글도 최신순
    pinnedPosts.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // 전체 결합 목록 (상단 고정 우선)
    const combined = [...pinnedPosts, ...regularPosts];
    const total = combined.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginatedPosts = combined.slice(startIndex, startIndex + limit);

    return {
      posts: paginatedPosts,
      total,
      totalPages,
      currentPage: page,
      pinnedPosts,
    };
  }

  public getPostById(id: string | number): BoardPost | null {
    this.initStorage();
    const post = this.posts.find((p) => String(p.id) === String(id));
    return post || null;
  }

  public incrementViews(id: string | number): void {
    const post = this.posts.find((p) => String(p.id) === String(id));
    if (post) {
      post.views += 1;
      this.savePosts();
    }
  }

  // 이전글 / 다음글 탐색
  public getAdjacentPosts(
    currentId: string,
    type?: BoardType,
    user: UserProfile = this.currentUser
  ): { prevPost: BoardPost | null; nextPost: BoardPost | null } {
    this.initStorage();
    let accessible = this.posts.filter((p) => this.canUserView(p, user));
    if (type) {
      accessible = accessible.filter((p) => p.type === type);
    }

    // 작성일 기준 정렬
    accessible.sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    const currentIndex = accessible.findIndex((p) => p.id === currentId);
    if (currentIndex === -1) {
      return { prevPost: null, nextPost: null };
    }

    const prevPost = currentIndex > 0 ? accessible[currentIndex - 1] : null;
    const nextPost = currentIndex < accessible.length - 1 ? accessible[currentIndex + 1] : null;

    return { prevPost, nextPost };
  }

  // 메인페이지 최신글 연동용
  public getLatestPostsByType(type: BoardType, count: number = 3): BoardPost[] {
    this.initStorage();
    return this.posts
      .filter((p) => p.type === type && p.isPublic)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, count);
  }

  // --- 게시글 생성/수정/삭제 (서버/DB 연결 준비 규격) ---
  public createPost(
    data: {
      type: BoardType;
      title: string;
      content: string;
      isPublic?: boolean;
      isPinned?: boolean;
      categoryTag?: string;
      attachments?: BoardPost['attachments'];
      images?: BoardPost['images'];
    },
    user: UserProfile = this.currentUser
  ): { success: boolean; post?: BoardPost; error?: string } {
    if (user.role === 'guest') {
      return { success: false, error: '게시글을 작성하려면 로그인이 필요합니다.' };
    }

    if (!this.canUserWriteCategory(data.type, user)) {
      return {
        success: false,
        error: `[${data.type}] 게시판은 관리자만 등록할 수 있는 정보성 게시판입니다.`,
      };
    }

    if (!data.title.trim()) {
      return { success: false, error: '게시글 제목을 입력해 주세요.' };
    }

    if (!data.content.trim()) {
      return { success: false, error: '게시글 본문 내용을 입력해 주세요.' };
    }

    const now = new Date();
    const formattedDate = now.toISOString().replace('T', ' ').substring(0, 19);

    // XSS 방지 본문 정제
    const cleanedContent = sanitizeHtml(data.content);

    const newPost: BoardPost = {
      id: `post-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      type: data.type,
      title: data.title.trim(),
      content: cleanedContent,
      authorId: user.id,
      authorName: user.name,
      authorRole: user.role === 'admin' ? 'admin' : 'user',
      createdAt: formattedDate,
      updatedAt: formattedDate,
      views: 0,
      isPublic: data.isPublic !== undefined ? data.isPublic : true,
      isPinned: user.role === 'admin' && data.isPinned ? true : false,
      categoryTag: data.categoryTag?.trim() || undefined,
      attachments: data.attachments || [],
      images: data.images || [],
    };

    this.posts.unshift(newPost);
    this.savePosts();

    return { success: true, post: newPost };
  }

  public updatePost(
    id: string,
    data: {
      type?: BoardType;
      title?: string;
      content?: string;
      isPublic?: boolean;
      isPinned?: boolean;
      categoryTag?: string;
      attachments?: BoardPost['attachments'];
      images?: BoardPost['images'];
    },
    user: UserProfile = this.currentUser
  ): { success: boolean; post?: BoardPost; error?: string } {
    this.initStorage();
    const postIndex = this.posts.findIndex((p) => p.id === id);
    if (postIndex === -1) {
      return { success: false, error: '존재하지 않는 게시글입니다.' };
    }

    const existingPost = this.posts[postIndex];

    // 권한 검사: 관리자이거나 본인 작성자만 수정 가능
    if (!this.canUserEditOrDelete(existingPost, user)) {
      return { success: false, error: '해당 게시글을 수정할 권한이 없습니다.' };
    }

    const now = new Date();
    const formattedDate = now.toISOString().replace('T', ' ').substring(0, 19);

    const updatedPost: BoardPost = {
      ...existingPost,
      type: data.type || existingPost.type,
      title: data.title !== undefined ? data.title.trim() : existingPost.title,
      content: data.content !== undefined ? sanitizeHtml(data.content) : existingPost.content,
      isPublic: data.isPublic !== undefined ? data.isPublic : existingPost.isPublic,
      isPinned:
        user.role === 'admin' && data.isPinned !== undefined
          ? data.isPinned
          : existingPost.isPinned,
      categoryTag:
        data.categoryTag !== undefined ? data.categoryTag.trim() : existingPost.categoryTag,
      attachments: data.attachments !== undefined ? data.attachments : existingPost.attachments,
      images: data.images !== undefined ? data.images : existingPost.images,
      updatedAt: formattedDate,
    };

    this.posts[postIndex] = updatedPost;
    this.savePosts();

    return { success: true, post: updatedPost };
  }

  public deletePost(
    id: string,
    user: UserProfile = this.currentUser
  ): { success: boolean; error?: string } {
    this.initStorage();
    const post = this.posts.find((p) => p.id === id);
    if (!post) {
      return { success: false, error: '존재하지 않는 게시글입니다.' };
    }

    if (!this.canUserEditOrDelete(post, user)) {
      return { success: false, error: '해당 게시글을 삭제할 권한이 없습니다.' };
    }

    this.posts = this.posts.filter((p) => p.id !== id);
    this.savePosts();

    return { success: true };
  }

  // 초기화/복원 유틸
  public resetToDefault(): void {
    this.posts = INITIAL_POSTS;
    this.savePosts();
  }
}

export const boardService = new BoardService();
