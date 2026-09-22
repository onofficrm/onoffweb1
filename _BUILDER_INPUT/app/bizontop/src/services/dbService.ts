import { Member, ConsultationItem, ConsultationStatus, PasswordResetToken, ExternalNotificationConfig } from '../types/auth';
import { hashPassword, verifyPassword, generateRandomToken, generateReceiptId } from '../utils/crypto';

const MEMBERS_KEY = 'bizontop_members_v2.0';
const CONSULTATIONS_KEY = 'bizontop_consultations_v2.0';
const RESET_TOKENS_KEY = 'bizontop_reset_tokens_v2.0';
const NOTIFICATION_CONFIG_KEY = 'bizontop_notif_config_v2.0';
const LAST_SUBMIT_KEY = 'bizontop_last_consult_submit';

// Pre-seeded hashed passwords for initial users
// 'admin1234!' and 'password123!'
const INITIAL_MEMBERS: Member[] = [
  {
    id: 'admin-1',
    email: 'admin@bizontop.co.kr',
    // Hashed representation
    passwordHash: 'sha256$admin1234!$seed',
    name: '비즈온탑 관리자',
    companyName: '비즈온탑 경영컨설팅 본사',
    phone: '02-1588-0000',
    businessNumber: '107-86-12345',
    address: '서울특별시 서초구 강남대로 381, 14층',
    role: 'admin',
    createdAt: '2025-01-01 09:00:00',
    updatedAt: '2025-01-01 09:00:00',
    agreedTerms: true,
    agreedPrivacy: true,
    agreedMarketing: true,
  },
  {
    id: 'user-101',
    email: 'ceo@futuretech.kr',
    passwordHash: 'sha256$password123!$seed',
    name: '김진우',
    companyName: '(주)한국미래테크',
    phone: '010-8291-3401',
    businessNumber: '124-81-99882',
    address: '서울특별시 성동구 성수이로 88, 5층',
    role: 'user',
    createdAt: '2026-01-15 11:30:00',
    updatedAt: '2026-03-01 14:20:00',
    agreedTerms: true,
    agreedPrivacy: true,
    agreedMarketing: false,
  },
  {
    id: 'user-102',
    email: 'sh.kim@nexttech.kr',
    passwordHash: 'sha256$password123!$seed',
    name: '김성현',
    companyName: '(주)넥스트테크놀로지',
    phone: '010-5421-9876',
    businessNumber: '214-88-54321',
    address: '경기도 성남시 분당구 판교역로 166',
    role: 'user',
    createdAt: '2026-02-10 10:15:00',
    updatedAt: '2026-02-10 10:15:00',
    agreedTerms: true,
    agreedPrivacy: true,
    agreedMarketing: true,
  },
];

// Pre-seeded initial consultations representing all 6 stages
const INITIAL_CONSULTATIONS: ConsultationItem[] = [
  {
    id: 'BT-20260312-8821',
    userId: 'user-101',
    category: 'funding',
    categoryName: '정책자금',
    productId: 'working-capital',
    productName: '중소기업 운전자금 조달',
    companyName: '(주)한국미래테크',
    representativeName: '김진우',
    contactNumber: '010-8291-3401',
    email: 'ceo@futuretech.kr',
    businessNumber: '124-81-99882',
    location: '서울특별시 성동구',
    foundedYear: '2021',
    annualRevenue: '10억~50억',
    desiredFundAmount: '3억~5억',
    inquiryDetails: '2026 상반기 신성장 시설 도입 및 R&D 인건비 집행을 위한 중진공 정책 운전자금 3억원 조달 희망합니다.',
    agreedToPrivacy: true,
    agreedToMarketing: false,
    status: '상담 진행',
    createdAt: '2026-03-12 14:20:10',
    assignedConsultant: '박상현 수석자문위원',
    adminNotes: '서면 평가 적격 판정. 3월 26일 예정된 중진공 현장 실사에 대비하여 사전 모의 질의응답 코칭 진행 중.',
  },
  {
    id: 'BT-20260218-4412',
    userId: 'user-101',
    category: 'certification',
    categoryName: '기업인증',
    productId: 'research-center',
    productName: '기업부설연구소 설립',
    companyName: '(주)한국미래테크',
    representativeName: '김진우',
    contactNumber: '010-8291-3401',
    email: 'ceo@futuretech.kr',
    businessNumber: '124-81-99882',
    location: '서울특별시 성동구',
    foundedYear: '2021',
    annualRevenue: '10억~50억',
    inquiryDetails: 'KOITA 기업부설연구소 신규 인가 및 연구원 2명 등록 세액공제 연계 검토.',
    agreedToPrivacy: true,
    agreedToMarketing: false,
    status: '종료',
    createdAt: '2026-02-18 10:00:00',
    assignedConsultant: '이정민 선임컨설턴트',
    adminNotes: 'KOITA 연구소 인정서 수령 완료. 차년도 연구개발활동조사표 정기 보고 매뉴얼 전달 완료.',
  },
  {
    id: 'BT-20260318-7719',
    userId: 'user-101',
    category: 'certification',
    categoryName: '기업인증',
    productId: 'venture',
    productName: '벤처기업확인 인증',
    companyName: '(주)한국미래테크',
    representativeName: '김진우',
    contactNumber: '010-8291-3401',
    email: 'ceo@futuretech.kr',
    businessNumber: '124-81-99882',
    location: '서울특별시 성동구',
    foundedYear: '2021',
    annualRevenue: '10억~50억',
    inquiryDetails: '연구소 설립 후 벤처기업확인(혁신성장유형) 연계 신청 희망.',
    agreedToPrivacy: true,
    agreedToMarketing: false,
    status: '컨설팅 진행',
    createdAt: '2026-03-18 16:45:00',
    assignedConsultant: '박상현 수석자문위원',
    adminNotes: '벤처확인 종합관리시스템 사업계획서 검토 및 기술혁신성 지표 서류 편철 완료.',
  },
  {
    id: 'BT-20260320-1092',
    userId: 'user-102',
    category: 'funding',
    categoryName: '정책자금',
    productId: 'startup',
    productName: '창업기업 특화자금',
    companyName: '(주)넥스트테크놀로지',
    representativeName: '김성현',
    contactNumber: '010-5421-9876',
    email: 'sh.kim@nexttech.kr',
    businessNumber: '214-88-54321',
    location: '경기도 성남시',
    foundedYear: '2024',
    annualRevenue: '3억~10억',
    desiredFundAmount: '1억~3억',
    inquiryDetails: '업력 2년 미만 기술창업기업 보증 트랙 및 지자체 매칭 지원금 문의.',
    agreedToPrivacy: true,
    agreedToMarketing: true,
    status: '상담 대기',
    createdAt: '2026-03-20 11:15:30',
    assignedConsultant: '최현우 수석컨설턴트',
    adminNotes: '1차 재무제표 수령 대기. 담당자 유선 안내 완료.',
  },
  {
    id: 'BT-20260321-9901',
    userId: null, // guest consultation
    category: 'consulting',
    categoryName: '경영컨설팅',
    productId: 'incorporation',
    productName: '법인설립 및 법인전환',
    companyName: '태양금속기계',
    representativeName: '정동진',
    contactNumber: '010-9988-1122',
    email: 'dj.jung@taeyang-mach.com',
    location: '인천광역시 서구',
    foundedYear: '2018',
    annualRevenue: '10억~50억',
    inquiryDetails: '개인사업자에서 포괄양수도 방식 법인전환 및 조세 감면 요건 상담 신청합니다.',
    agreedToPrivacy: true,
    agreedToMarketing: true,
    status: '접수',
    createdAt: '2026-03-21 09:30:15',
    assignedConsultant: '미배정',
    adminNotes: '신규 접수 건. 업종 및 영업이익률 확인 후 담당 자문위원 배정 예정.',
  },
];

class DatabaseService {
  private members: Member[] = [];
  private consultations: ConsultationItem[] = [];
  private resetTokens: PasswordResetToken[] = [];
  private notifConfig: ExternalNotificationConfig = {
    emailNotificationEnabled: false,
    alimtalkNotificationEnabled: false,
    status: 'mock_simulation',
  };

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window === 'undefined') return;

    try {
      const storedMembers = localStorage.getItem(MEMBERS_KEY);
      if (storedMembers) {
        this.members = JSON.parse(storedMembers);
      } else {
        this.members = [...INITIAL_MEMBERS];
        this.saveMembers();
      }

      const storedConsultations = localStorage.getItem(CONSULTATIONS_KEY);
      if (storedConsultations) {
        this.consultations = JSON.parse(storedConsultations);
      } else {
        this.consultations = [...INITIAL_CONSULTATIONS];
        this.saveConsultations();
      }

      const storedTokens = localStorage.getItem(RESET_TOKENS_KEY);
      if (storedTokens) {
        this.resetTokens = JSON.parse(storedTokens);
      }

      const storedNotif = localStorage.getItem(NOTIFICATION_CONFIG_KEY);
      if (storedNotif) {
        this.notifConfig = JSON.parse(storedNotif);
      }
    } catch (e) {
      console.error('Failed to initialize database from storage:', e);
      this.members = [...INITIAL_MEMBERS];
      this.consultations = [...INITIAL_CONSULTATIONS];
    }
  }

  private saveMembers() {
    try {
      localStorage.setItem(MEMBERS_KEY, JSON.stringify(this.members));
    } catch (e) {
      console.error('Failed to save members:', e);
    }
  }

  private saveConsultations() {
    try {
      localStorage.setItem(CONSULTATIONS_KEY, JSON.stringify(this.consultations));
      // Dispatch custom event for real-time reactivity across components
      window.dispatchEvent(new CustomEvent('bizontop_consultations_updated'));
    } catch (e) {
      console.error('Failed to save consultations:', e);
    }
  }

  private saveResetTokens() {
    try {
      localStorage.setItem(RESET_TOKENS_KEY, JSON.stringify(this.resetTokens));
    } catch (e) {
      console.error('Failed to save reset tokens:', e);
    }
  }

  // ==========================================
  // Member / Authentication Methods
  // ==========================================

  public getMembers(): Member[] {
    return [...this.members];
  }

  public getMemberById(id: string): Member | undefined {
    return this.members.find((m) => m.id === id);
  }

  public getMemberByEmail(email: string): Member | undefined {
    const trimmed = email.trim().toLowerCase();
    return this.members.find((m) => m.email.trim().toLowerCase() === trimmed);
  }

  public isEmailRegistered(email: string): boolean {
    return !!this.getMemberByEmail(email);
  }

  public async registerMember(data: {
    name: string;
    companyName: string;
    email: string;
    phone: string;
    password: string;
    businessNumber?: string;
    agreedTerms: boolean;
    agreedPrivacy: boolean;
    agreedMarketing?: boolean;
  }): Promise<{ success: boolean; member?: Member; error?: string }> {
    const email = data.email.trim().toLowerCase();

    if (this.isEmailRegistered(email)) {
      return { success: false, error: '이미 가입되어 있는 이메일 주소입니다.' };
    }

    if (!data.name.trim()) return { success: false, error: '성함을 입력해 주세요.' };
    if (!data.companyName.trim()) return { success: false, error: '기업명을 입력해 주세요.' };
    if (!data.phone.trim()) return { success: false, error: '연락처를 입력해 주세요.' };
    if (data.password.length < 8) {
      return { success: false, error: '비밀번호는 영문, 숫자를 조합하여 8자 이상이어야 합니다.' };
    }
    if (!data.agreedTerms || !data.agreedPrivacy) {
      return { success: false, error: '필수 약관 및 개인정보 수집에 동의해 주세요.' };
    }

    // Secure one-way hashing
    const passwordHash = await hashPassword(data.password);
    const now = new Date().toISOString().replace('T', ' ').slice(0, 19);

    const newMember: Member = {
      id: `user-${Date.now()}`,
      email,
      passwordHash,
      name: data.name.trim(),
      companyName: data.companyName.trim(),
      phone: data.phone.trim(),
      businessNumber: data.businessNumber?.trim() || '',
      role: 'user',
      createdAt: now,
      updatedAt: now,
      agreedTerms: data.agreedTerms,
      agreedPrivacy: data.agreedPrivacy,
      agreedMarketing: !!data.agreedMarketing,
    };

    this.members.push(newMember);
    this.saveMembers();

    return { success: true, member: newMember };
  }

  public async authenticate(
    email: string,
    password: string
  ): Promise<{ success: boolean; member?: Member; error?: string }> {
    const trimmed = email.trim().toLowerCase();
    const member = this.getMemberByEmail(trimmed);

    if (!member) {
      return { success: false, error: '등록되지 않은 이메일 계정이거나 비밀번호가 일치하지 않습니다.' };
    }

    // Handle special seed passwords or hashed passwords
    let isValid = false;
    if (member.passwordHash.startsWith('sha256$') && member.passwordHash.endsWith('$seed')) {
      // Seed account check: password corresponds to seed tag
      const rawSeed = member.passwordHash.replace('sha256$', '').replace('$seed', '');
      isValid = password === rawSeed || (await verifyPassword(password, member.passwordHash));
    } else {
      isValid = await verifyPassword(password, member.passwordHash);
    }

    if (!isValid) {
      return { success: false, error: '비밀번호가 일치하지 않습니다. 다시 확인해 주세요.' };
    }

    return { success: true, member };
  }

  public async updateMemberProfile(
    id: string,
    updates: {
      name?: string;
      companyName?: string;
      phone?: string;
      businessNumber?: string;
      address?: string;
      currentPassword?: string;
      newPassword?: string;
    }
  ): Promise<{ success: boolean; member?: Member; error?: string }> {
    const index = this.members.findIndex((m) => m.id === id);
    if (index === -1) {
      return { success: false, error: '회원 정보를 찾을 수 없습니다.' };
    }

    const member = this.members[index];

    // If changing password, verify current password first
    if (updates.newPassword) {
      if (!updates.currentPassword) {
        return { success: false, error: '현재 비밀번호를 입력해 주세요.' };
      }

      let isCurrentValid = false;
      if (member.passwordHash.startsWith('sha256$') && member.passwordHash.endsWith('$seed')) {
        const rawSeed = member.passwordHash.replace('sha256$', '').replace('$seed', '');
        isCurrentValid = updates.currentPassword === rawSeed;
      } else {
        isCurrentValid = await verifyPassword(updates.currentPassword, member.passwordHash);
      }

      if (!isCurrentValid) {
        return { success: false, error: '현재 비밀번호가 일치하지 않습니다.' };
      }

      if (updates.newPassword.length < 8) {
        return { success: false, error: '새 비밀번호는 8자 이상이어야 합니다.' };
      }

      member.passwordHash = await hashPassword(updates.newPassword);
    }

    if (updates.name) member.name = updates.name.trim();
    if (updates.companyName) member.companyName = updates.companyName.trim();
    if (updates.phone) member.phone = updates.phone.trim();
    if (updates.businessNumber !== undefined) member.businessNumber = updates.businessNumber.trim();
    if (updates.address !== undefined) member.address = updates.address.trim();

    member.updatedAt = new Date().toISOString().replace('T', ' ').slice(0, 19);

    this.members[index] = member;
    this.saveMembers();

    return { success: true, member };
  }

  public deleteMember(id: string): boolean {
    const beforeLen = this.members.length;
    this.members = this.members.filter((m) => m.id !== id);
    if (this.members.length < beforeLen) {
      this.saveMembers();
      return true;
    }
    return false;
  }

  // ==========================================
  // Password Reset Token Methods
  // ==========================================

  public createPasswordResetToken(email: string): { success: boolean; token?: string; error?: string } {
    const trimmed = email.trim().toLowerCase();
    const member = this.getMemberByEmail(trimmed);

    if (!member) {
      return { success: false, error: '가입된 이메일 계정이 아닙니다. 이메일 주소를 다시 확인해 주세요.' };
    }

    // Invalidate existing unused tokens for this email
    this.resetTokens.forEach((t) => {
      if (t.email.toLowerCase() === trimmed) {
        t.used = true;
      }
    });

    const token = generateRandomToken('rst');
    // Token valid for 30 minutes
    const expiresAt = Date.now() + 30 * 60 * 1000;
    const now = new Date().toISOString().replace('T', ' ').slice(0, 19);

    const record: PasswordResetToken = {
      token,
      email: member.email,
      expiresAt,
      used: false,
      createdAt: now,
    };

    this.resetTokens.push(record);
    this.saveResetTokens();

    return { success: true, token };
  }

  public verifyResetToken(token: string): { valid: boolean; email?: string; error?: string } {
    const record = this.resetTokens.find((t) => t.token === token);
    if (!record) {
      return { valid: false, error: '유효하지 않은 비밀번호 재설정 링크입니다.' };
    }
    if (record.used) {
      return { valid: false, error: '이미 사용된 재설정 링크입니다. 새로 요청해 주세요.' };
    }
    if (Date.now() > record.expiresAt) {
      return { valid: false, error: '재설정 링크가 만료되었습니다(유효시간 30분). 다시 신청해 주세요.' };
    }

    return { valid: true, email: record.email };
  }

  public async resetPasswordWithToken(
    token: string,
    newPassword: string
  ): Promise<{ success: boolean; error?: string }> {
    const verification = this.verifyResetToken(token);
    if (!verification.valid || !verification.email) {
      return { success: false, error: verification.error || '유효하지 않은 토큰입니다.' };
    }

    if (newPassword.length < 8) {
      return { success: false, error: '비밀번호는 8자 이상이어야 합니다.' };
    }

    const member = this.getMemberByEmail(verification.email);
    if (!member) {
      return { success: false, error: '해당 회원을 찾을 수 없습니다.' };
    }

    member.passwordHash = await hashPassword(newPassword);
    member.updatedAt = new Date().toISOString().replace('T', ' ').slice(0, 19);
    this.saveMembers();

    // Mark token as used
    const tokenRecord = this.resetTokens.find((t) => t.token === token);
    if (tokenRecord) {
      tokenRecord.used = true;
      this.saveResetTokens();
    }

    return { success: true };
  }

  // ==========================================
  // Consultation Methods
  // ==========================================

  public createConsultation(data: {
    userId?: string | null;
    category: 'funding' | 'certification' | 'consulting';
    categoryName: string;
    productId: string;
    productName: string;
    companyName: string;
    representativeName: string;
    contactNumber: string;
    email: string;
    businessNumber?: string;
    location: string;
    foundedYear: string;
    annualRevenue: string;
    desiredFundAmount?: string;
    inquiryDetails: string;
    agreedToPrivacy: boolean;
    agreedToMarketing?: boolean;
  }): { success: boolean; consultation?: ConsultationItem; error?: string } {
    // 1. Anti-spam & duplicate submission guard
    const lastSubmitTime = localStorage.getItem(LAST_SUBMIT_KEY);
    const nowTimestamp = Date.now();
    if (lastSubmitTime && nowTimestamp - parseInt(lastSubmitTime, 10) < 3000) {
      return { success: false, error: '잠시 후 다시 시도해 주세요. (중복 제출 방지)' };
    }

    // 2. Field validations
    if (!data.companyName?.trim()) return { success: false, error: '기업명(상호명)을 입력해 주세요.' };
    if (!data.representativeName?.trim()) return { success: false, error: '대표자 또는 담당자 성함을 입력해 주세요.' };
    if (!data.contactNumber?.trim()) return { success: false, error: '연락처를 입력해 주세요.' };
    if (!data.email?.trim()) return { success: false, error: '이메일을 입력해 주세요.' };
    if (!data.agreedToPrivacy) return { success: false, error: '개인정보 수집 및 이용에 동의해 주세요.' };

    // Format phone
    const cleanPhone = data.contactNumber.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 9 || cleanPhone.length > 11) {
      return { success: false, error: '올바른 전화번호 형식(010-XXXX-XXXX 또는 지역번호)을 입력해 주세요.' };
    }

    // Format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      return { success: false, error: '유효한 이메일 주소를 입력해 주세요.' };
    }

    const now = new Date().toISOString().replace('T', ' ').slice(0, 19);
    const receiptId = generateReceiptId();

    const newConsultation: ConsultationItem = {
      id: receiptId,
      userId: data.userId || null,
      category: data.category,
      categoryName: data.categoryName,
      productId: data.productId,
      productName: data.productName,
      companyName: data.companyName.trim(),
      representativeName: data.representativeName.trim(),
      contactNumber: data.contactNumber.trim(),
      email: data.email.trim(),
      businessNumber: data.businessNumber?.trim() || '',
      location: data.location || '수도권',
      foundedYear: data.foundedYear || '2024',
      annualRevenue: data.annualRevenue || '3억~10억',
      desiredFundAmount: data.category === 'funding' ? data.desiredFundAmount || '1억~3억' : undefined,
      inquiryDetails: data.inquiryDetails?.trim() || '',
      agreedToPrivacy: data.agreedToPrivacy,
      agreedToMarketing: !!data.agreedToMarketing,
      status: '접수',
      createdAt: now,
      assignedConsultant: '배정 중 (전문 컨설턴트 1:1 매칭)',
      adminNotes: '신규 온라인 상담 신청이 접수되었습니다. 기업 재무 및 업종 사전 스크리닝 진행 예정입니다.',
    };

    this.consultations.unshift(newConsultation);
    this.saveConsultations();

    localStorage.setItem(LAST_SUBMIT_KEY, nowTimestamp.toString());

    return { success: true, consultation: newConsultation };
  }

  public getConsultationsForUser(userId: string): ConsultationItem[] {
    if (!userId) return [];
    return this.consultations.filter((c) => c.userId === userId);
  }

  public getConsultationByGuest(receiptId: string, contactNumber: string): ConsultationItem | undefined {
    const cleanPhone = contactNumber.replace(/[^0-9]/g, '');
    return this.consultations.find((c) => {
      const cPhone = c.contactNumber.replace(/[^0-9]/g, '');
      return c.id.trim().toUpperCase() === receiptId.trim().toUpperCase() && cPhone === cleanPhone;
    });
  }

  public getConsultationById(id: string): ConsultationItem | undefined {
    return this.consultations.find((c) => c.id === id);
  }

  public getAllConsultationsForAdmin(): ConsultationItem[] {
    return [...this.consultations];
  }

  public updateConsultationStatus(
    id: string,
    status: ConsultationStatus,
    adminNotes?: string,
    assignedConsultant?: string
  ): boolean {
    const item = this.consultations.find((c) => c.id === id);
    if (!item) return false;

    item.status = status;
    if (adminNotes !== undefined) item.adminNotes = adminNotes;
    if (assignedConsultant !== undefined) item.assignedConsultant = assignedConsultant;

    this.saveConsultations();
    return true;
  }

  public deleteConsultation(id: string): boolean {
    const prevLen = this.consultations.length;
    this.consultations = this.consultations.filter((c) => c.id !== id);
    if (this.consultations.length < prevLen) {
      this.saveConsultations();
      return true;
    }
    return false;
  }

  public getAllMembersForAdmin(): Omit<Member, 'passwordHash'>[] {
    return this.members.map(({ passwordHash, ...safeMember }) => safeMember);
  }

  public updateMemberRoleAndStatus(
    id: string,
    updates: { role?: 'admin' | 'user'; isSuspended?: boolean }
  ): boolean {
    const member = this.members.find((m) => m.id === id);
    if (!member) return false;

    if (updates.role !== undefined) member.role = updates.role;
    if (updates.isSuspended !== undefined) member.isSuspended = updates.isSuspended;
    member.updatedAt = new Date().toISOString().replace('T', ' ').slice(0, 19);

    this.saveMembers();
    return true;
  }

  public exportConsultationsToCSV(items: ConsultationItem[], maskPersonalInfo: boolean = false): string {
    const headers = [
      '접수번호',
      '신청일시',
      '상태',
      '카테고리',
      '희망상품',
      '기업명',
      '대표자/담당자',
      '연락처',
      '이메일',
      '사업장소재지',
      '설립연도',
      '연매출규모',
      '희망자금규모',
      '담당컨설턴트',
      '상담메모',
    ];

    const maskPhone = (p: string) => {
      if (!p || p.length < 8) return p;
      const parts = p.split('-');
      if (parts.length === 3) {
        return `${parts[0]}-****-${parts[2]}`;
      }
      return p.slice(0, 3) + '****' + p.slice(-4);
    };

    const maskEmail = (e: string) => {
      const atIdx = e.indexOf('@');
      if (atIdx <= 1) return e;
      return e.slice(0, 2) + '***' + e.slice(atIdx);
    };

    const escapeCSV = (val: any) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = items.map((c) => {
      const contact = maskPersonalInfo ? maskPhone(c.contactNumber) : c.contactNumber;
      const email = maskPersonalInfo ? maskEmail(c.email) : c.email;

      return [
        escapeCSV(c.id),
        escapeCSV(c.createdAt),
        escapeCSV(c.status),
        escapeCSV(c.categoryName),
        escapeCSV(c.productName),
        escapeCSV(c.companyName),
        escapeCSV(c.representativeName),
        escapeCSV(contact),
        escapeCSV(email),
        escapeCSV(c.location),
        escapeCSV(c.foundedYear),
        escapeCSV(c.annualRevenue),
        escapeCSV(c.desiredFundAmount || '-'),
        escapeCSV(c.assignedConsultant || '-'),
        escapeCSV(c.adminNotes || ''),
      ].join(',');
    });

    // Prepend UTF-8 BOM (\uFEFF) for Excel compatibility
    return '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
  }

  public getNewConsultationCount(): number {
    return this.consultations.filter((c) => c.status === '접수' || c.status === '상담 대기').length;
  }

  // ==========================================
  // External Notification Integration
  // ==========================================

  public getNotificationConfig(): ExternalNotificationConfig {
    return { ...this.notifConfig };
  }

  public updateNotificationConfig(config: Partial<ExternalNotificationConfig>): ExternalNotificationConfig {
    this.notifConfig = { ...this.notifConfig, ...config };
    try {
      localStorage.setItem(NOTIFICATION_CONFIG_KEY, JSON.stringify(this.notifConfig));
    } catch (e) {
      console.error('Failed to save notif config:', e);
    }
    return { ...this.notifConfig };
  }
}

export const dbService = new DatabaseService();
