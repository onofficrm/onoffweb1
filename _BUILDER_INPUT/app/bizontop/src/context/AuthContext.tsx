import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile } from '../types/board';
import { Member } from '../types/auth';
import { dbService } from '../services/dbService';
import { boardService, DEFAULT_USERS } from '../services/boardService';

interface AuthContextType {
  user: UserProfile;
  currentMember: Member | null;
  isAdmin: boolean;
  isLoggedIn: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  register: (data: {
    name: string;
    companyName: string;
    email: string;
    phone: string;
    password: string;
    businessNumber?: string;
    agreedTerms: boolean;
    agreedPrivacy: boolean;
    agreedMarketing?: boolean;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: {
    name?: string;
    companyName?: string;
    phone?: string;
    businessNumber?: string;
    address?: string;
    currentPassword?: string;
    newPassword?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  deleteAccount: () => Promise<{ success: boolean; error?: string }>;
  setRole: (role: 'admin' | 'user' | 'guest') => void;
}

const SESSION_MEMBER_KEY = 'bizontop_session_member_v2.0';

const AuthContext = createContext<AuthContextType>({
  user: DEFAULT_USERS.admin,
  currentMember: null,
  isAdmin: true,
  isLoggedIn: true,
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  logout: () => {},
  updateProfile: async () => ({ success: false }),
  deleteAccount: async () => ({ success: false }),
  setRole: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentMember, setCurrentMember] = useState<Member | null>(() => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem(SESSION_MEMBER_KEY) || sessionStorage.getItem(SESSION_MEMBER_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Refresh from dbService in case it was updated
        return dbService.getMemberById(parsed.id) || parsed;
      } catch {
        return null;
      }
    }
    // Default logged in as admin-1 or initial user for seamless developer preview
    const adminMember = dbService.getMemberById('admin-1');
    return adminMember || null;
  });

  const [user, setUser] = useState<UserProfile>(() => {
    if (currentMember) {
      return {
        id: currentMember.id,
        name: currentMember.name,
        email: currentMember.email,
        role: currentMember.role,
        company: currentMember.companyName,
      };
    }
    return boardService.getCurrentUser();
  });

  // Sync user profile when currentMember changes
  useEffect(() => {
    if (currentMember) {
      const uProfile: UserProfile = {
        id: currentMember.id,
        name: currentMember.name,
        email: currentMember.email,
        role: currentMember.role,
        company: currentMember.companyName,
      };
      setUser(uProfile);
      boardService.setCurrentUser(uProfile);
    } else {
      const guest = DEFAULT_USERS.guest;
      setUser(guest);
      boardService.setCurrentUser(guest);
    }
  }, [currentMember]);

  // Listen to external role updates from RoleSwitcherBar if triggered
  useEffect(() => {
    const handleAuthChange = (e: CustomEvent<UserProfile>) => {
      const newProfile = e.detail;
      setUser(newProfile);
      if (newProfile.role === 'guest') {
        setCurrentMember(null);
        localStorage.removeItem(SESSION_MEMBER_KEY);
        sessionStorage.removeItem(SESSION_MEMBER_KEY);
      } else if (newProfile.role === 'admin') {
        const adminM = dbService.getMemberById('admin-1');
        if (adminM) setCurrentMember(adminM);
      } else if (newProfile.role === 'user') {
        const userM = dbService.getMemberById('user-101');
        if (userM) setCurrentMember(userM);
      }
    };

    window.addEventListener('bizontop_auth_updated' as any, handleAuthChange);
    return () => {
      window.removeEventListener('bizontop_auth_updated' as any, handleAuthChange);
    };
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean = true) => {
    const res = await dbService.authenticate(email, password);
    if (res.success && res.member) {
      setCurrentMember(res.member);
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem(SESSION_MEMBER_KEY, JSON.stringify(res.member));
      return { success: true };
    }
    return { success: false, error: res.error || '로그인에 실패하였습니다.' };
  };

  const register = async (data: {
    name: string;
    companyName: string;
    email: string;
    phone: string;
    password: string;
    businessNumber?: string;
    agreedTerms: boolean;
    agreedPrivacy: boolean;
    agreedMarketing?: boolean;
  }) => {
    const res = await dbService.registerMember(data);
    if (res.success && res.member) {
      // Auto login newly registered member
      setCurrentMember(res.member);
      localStorage.setItem(SESSION_MEMBER_KEY, JSON.stringify(res.member));
      return { success: true };
    }
    return { success: false, error: res.error || '회원가입에 실패하였습니다.' };
  };

  const logout = () => {
    setCurrentMember(null);
    localStorage.removeItem(SESSION_MEMBER_KEY);
    sessionStorage.removeItem(SESSION_MEMBER_KEY);
    const guest = DEFAULT_USERS.guest;
    setUser(guest);
    boardService.setCurrentUser(guest);
  };

  const updateProfile = async (updates: {
    name?: string;
    companyName?: string;
    phone?: string;
    businessNumber?: string;
    address?: string;
    currentPassword?: string;
    newPassword?: string;
  }) => {
    if (!currentMember) {
      return { success: false, error: '로그인이 필요합니다.' };
    }

    const res = await dbService.updateMemberProfile(currentMember.id, updates);
    if (res.success && res.member) {
      setCurrentMember(res.member);
      if (localStorage.getItem(SESSION_MEMBER_KEY)) {
        localStorage.setItem(SESSION_MEMBER_KEY, JSON.stringify(res.member));
      }
      if (sessionStorage.getItem(SESSION_MEMBER_KEY)) {
        sessionStorage.setItem(SESSION_MEMBER_KEY, JSON.stringify(res.member));
      }
      return { success: true };
    }
    return { success: false, error: res.error || '회원 정보 수정에 실패했습니다.' };
  };

  const deleteAccount = async () => {
    if (!currentMember) {
      return { success: false, error: '로그인이 필요합니다.' };
    }
    dbService.deleteMember(currentMember.id);
    logout();
    return { success: true };
  };

  const setRole = (role: 'admin' | 'user' | 'guest') => {
    if (role === 'admin') {
      const adminM = dbService.getMemberById('admin-1');
      if (adminM) setCurrentMember(adminM);
    } else if (role === 'user') {
      const userM = dbService.getMemberById('user-101');
      if (userM) setCurrentMember(userM);
    } else {
      logout();
    }
  };

  const isAdmin = user.role === 'admin';
  const isLoggedIn = user.role !== 'guest' && !!currentMember;

  return (
    <AuthContext.Provider
      value={{
        user,
        currentMember,
        isAdmin,
        isLoggedIn,
        login,
        register,
        logout,
        updateProfile,
        deleteAccount,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
