import React from 'react';
import { Database, ShieldCheck, UserCheck, UserX } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const RoleSwitcherBar: React.FC = () => {
  const { user, setRole } = useAuth();

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs mb-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
      {/* Status & Database Indicator */}
      <div className="flex items-center gap-2.5 text-xs">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-[#2563EB] font-bold border border-blue-200/60">
          <Database className="w-3.5 h-3.5" />
          <span>로컬 스토리지 DB</span>
        </div>
        <span className="text-slate-600 hidden sm:inline">
          현재 세션: <strong className="text-[#102B50] font-bold">{user.name}</strong> ({user.role === 'admin' ? '관리자 권한' : user.role === 'user' ? '일반회원 권한' : '비회원'})
        </span>
      </div>

      {/* Role Switcher Controls for Testing */}
      <div className="flex items-center gap-1.5 flex-wrap text-xs">
        <span className="text-slate-400 text-[11px] mr-1 hidden sm:inline">
          권한 시뮬레이션:
        </span>
        <button
          type="button"
          onClick={() => setRole('admin')}
          className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 text-xs transition-all ${
            user.role === 'admin'
              ? 'bg-[#102B50] text-[#D5A64B] shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
          title="관리자 권한으로 변경 (모든 글 작성, 수정, 삭제 가능)"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          관리자
        </button>
        <button
          type="button"
          onClick={() => setRole('user')}
          className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 text-xs transition-all ${
            user.role === 'user'
              ? 'bg-[#2563EB] text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
          title="일반 회원 권한으로 변경 (본인 글만 수정/삭제, 비공개 본인글 열람)"
        >
          <UserCheck className="w-3.5 h-3.5" />
          일반회원
        </button>
        <button
          type="button"
          onClick={() => setRole('guest')}
          className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 text-xs transition-all ${
            user.role === 'guest'
              ? 'bg-slate-700 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
          title="비회원 권한으로 변경 (공개글 열람만 가능, 작성 시 로그인 안내)"
        >
          <UserX className="w-3.5 h-3.5" />
          비회원
        </button>
      </div>
    </div>
  );
};
