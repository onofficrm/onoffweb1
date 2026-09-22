import React, { useState } from 'react';
import {
  Users,
  Search,
  Shield,
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  UserX,
  Building,
  Mail,
  Phone,
  Calendar,
  Lock,
  Edit2,
  CheckCircle2,
} from 'lucide-react';
import { Member } from '../../types/auth';
import { dbService } from '../../services/dbService';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';

interface AdminMembersTabProps {
  members: Omit<Member, 'passwordHash'>[];
  onRefresh: () => void;
}

export const AdminMembersTab: React.FC<AdminMembersTabProps> = ({
  members,
  onRefresh,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [editingMember, setEditingMember] = useState<Omit<Member, 'passwordHash'> | null>(null);

  const [editRole, setEditRole] = useState<'admin' | 'user'>('user');
  const [editSuspended, setEditSuspended] = useState<boolean>(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleOpenEdit = (m: Omit<Member, 'passwordHash'>) => {
    setEditingMember(m);
    setEditRole(m.role);
    setEditSuspended(!!m.isSuspended);
    setSaveMessage('');
  };

  const handleSaveMember = () => {
    if (!editingMember) return;
    dbService.updateMemberRoleAndStatus(editingMember.id, {
      role: editRole,
      isSuspended: editSuspended,
    });
    setSaveMessage('회원 권한 및 상태가 성공적으로 변경되었습니다.');
    onRefresh();
    setTimeout(() => {
      setEditingMember(null);
      setSaveMessage('');
    }, 1200);
  };

  const filteredMembers = members.filter((m) => {
    const matchRole = selectedRole === 'all' || m.role === selectedRole;
    const s = searchTerm.trim().toLowerCase();
    const matchSearch =
      !s ||
      m.name.toLowerCase().includes(s) ||
      m.email.toLowerCase().includes(s) ||
      m.companyName.toLowerCase().includes(s) ||
      m.phone.includes(s) ||
      (m.businessNumber && m.businessNumber.includes(s));
    return matchRole && matchSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-[#102B50] flex items-center gap-2">
            <span>회원 및 고객사 관리</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold">
              총 {filteredMembers.length}명
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            가입된 기업 회원들의 권한(일반회원/관리자) 및 계정 상태(활성/이용정지)를 관리합니다.
          </p>
        </div>

        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-800 flex items-center gap-2">
          <Lock className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>개인정보보호법 준수:</strong> 회원의 비밀번호는 단방향 솔트 암호화되어 관리자 화면에 절대 노출되지 않습니다.
          </span>
        </div>
      </div>

      {/* 2. Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="이름, 이메일, 기업명, 연락처, 사업자번호 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#2563EB]"
          />
        </div>

        <div className="sm:col-span-4">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            aria-label="회원 권한 등급 필터"
            className="w-full py-2 px-3 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#2563EB] bg-white text-slate-700"
          >
            <option value="all">전체 권한 등급</option>
            <option value="user">일반 회원 (기업 고객)</option>
            <option value="admin">최고 관리자 (Admin)</option>
          </select>
        </div>
      </div>

      {/* 3. Members Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold">
                <th className="py-3 px-4">회원명 / 이메일</th>
                <th className="py-3 px-4">기업명 (사업자등록번호)</th>
                <th className="py-3 px-4">연락처</th>
                <th className="py-3 px-4">가입일시</th>
                <th className="py-3 px-4 text-center">권한 등급</th>
                <th className="py-3 px-4 text-center">계정 상태</th>
                <th className="py-3 px-4 text-center">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    검색 결과와 일치하는 회원이 없습니다.
                  </td>
                </tr>
              ) : (
                filteredMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{m.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{m.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-800">{m.companyName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {m.businessNumber || '미입력'}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">{m.phone}</td>
                    <td className="py-3.5 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                      {m.createdAt}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {m.role === 'admin' ? (
                        <Badge variant="accent">최고관리자</Badge>
                      ) : (
                        <Badge variant="neutral">일반회원</Badge>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {m.isSuspended ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                          <UserX className="w-3 h-3" /> 이용정지
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <UserCheck className="w-3 h-3" /> 정상 활동
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(m)}
                        className="p-1.5 text-slate-600 hover:text-[#2563EB] hover:bg-slate-100 rounded-md transition-colors"
                        title="회원 권한 및 상태 변경"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Member Edit Modal */}
      {editingMember && (
        <Modal
          isOpen={!!editingMember}
          onClose={() => setEditingMember(null)}
          title={`회원 계정 관리 (${editingMember.name})`}
          subtitle="해당 회원의 권한 등급 및 이용 제한 여부를 설정합니다."
          maxWidth="md"
        >
          <div className="space-y-5 text-xs">
            {saveMessage && (
              <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                {saveMessage}
              </div>
            )}

            <div className="p-4 bg-slate-50 rounded-xl space-y-2 border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">이메일 계정:</span>
                <span className="font-mono font-bold text-slate-800">{editingMember.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">소속 기업:</span>
                <span className="font-bold text-slate-800">{editingMember.companyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">연락처:</span>
                <span className="font-mono text-slate-800">{editingMember.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">사업장 주소:</span>
                <span className="text-slate-700 truncate max-w-[200px]">
                  {editingMember.address || '미입력'}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">회원 권한 등급</label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value as 'admin' | 'user')}
                  aria-label="회원 권한 등급 선택"
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB] bg-white font-bold text-[#102B50]"
                >
                  <option value="user">일반 회원 (기업 고객)</option>
                  <option value="admin">최고 관리자 (Admin - 관리자 페이지 접근 가능)</option>
                </select>
                <p className="text-[11px] text-slate-500">
                  * 관리자(Admin) 권한 부여 시 /admin 대시보드 및 상담/회원 관리 접근 권한이 부여됩니다.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">계정 활동 상태</label>
                <div className="flex items-center gap-4 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="suspendedStatus"
                      checked={!editSuspended}
                      onChange={() => setEditSuspended(false)}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="font-bold text-emerald-700">정상 활동 가능</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="suspendedStatus"
                      checked={editSuspended}
                      onChange={() => setEditSuspended(true)}
                      className="text-red-600 focus:ring-red-500"
                    />
                    <span className="font-bold text-red-600">이용 정지 (로그인 차단)</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
              <Button variant="outline" size="sm" onClick={() => setEditingMember(null)}>
                취소
              </Button>
              <Button variant="primary" size="sm" onClick={handleSaveMember} className="font-bold">
                변경사항 저장
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
