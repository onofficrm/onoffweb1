import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  Building,
  CheckCircle2,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldAlert,
  Trash2,
  User,
} from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';

export const ProfileEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentMember, updateProfile, deleteAccount, isLoggedIn } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    phone: '',
    businessNumber: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete account modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteReason, setDeleteReason] = useState('컨설팅 서비스 완료');
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isLoggedIn || !currentMember) {
      navigate('/login?redirect=/mypage/profile');
      return;
    }

    setFormData((prev) => ({
      ...prev,
      name: currentMember.name || '',
      companyName: currentMember.companyName || '',
      phone: currentMember.phone || '',
      businessNumber: currentMember.businessNumber || '',
      address: currentMember.address || '',
    }));
  }, [currentMember, isLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('성함을 입력해 주세요.');
      return;
    }
    if (!formData.companyName.trim()) {
      setErrorMessage('기업명을 입력해 주세요.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('연락처를 입력해 주세요.');
      return;
    }

    // Password change check
    if (formData.newPassword) {
      if (!formData.currentPassword) {
        setErrorMessage('비밀번호를 변경하려면 현재 비밀번호를 입력해야 합니다.');
        return;
      }
      if (formData.newPassword.length < 8) {
        setErrorMessage('새 비밀번호는 8자 이상이어야 합니다.');
        return;
      }
      if (formData.newPassword !== formData.newPasswordConfirm) {
        setErrorMessage('새 비밀번호 확인이 일치하지 않습니다.');
        return;
      }
    }

    setIsSubmitting(true);
    const res = await updateProfile({
      name: formData.name,
      companyName: formData.companyName,
      phone: formData.phone,
      businessNumber: formData.businessNumber,
      address: formData.address,
      currentPassword: formData.currentPassword || undefined,
      newPassword: formData.newPassword || undefined,
    });
    setIsSubmitting(false);

    if (res.success) {
      setSuccessMessage('회원 정보가 성공적으로 수정되었습니다.');
      setFormData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
      }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setErrorMessage(res.error || '회원 정보 수정에 실패했습니다.');
    }
  };

  const handleDeleteAccount = async () => {
    if (!deleteConfirmed) {
      setErrorMessage('탈퇴 유의사항 확인 체크가 필요합니다.');
      return;
    }

    setIsDeleting(true);
    const res = await deleteAccount();
    setIsDeleting(false);

    if (res.success) {
      alert('회원 탈퇴가 완료되었습니다. 그동안 비즈온탑을 이용해 주셔서 감사합니다.');
      navigate('/');
    } else {
      setErrorMessage(res.error || '회원 탈퇴 처리 중 오류가 발생했습니다.');
    }
  };

  if (!currentMember) return null;

  return (
    <PageLayout
      categoryName="마이페이지"
      categoryHref="/mypage"
      title="회원정보 수정"
      subtitle="담당자 정보, 기업 정보 및 비밀번호를 안전하게 변경할 수 있습니다."
      breadcrumbs={[{ label: '마이페이지', href: '/mypage' }, { label: '회원정보 수정' }]}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Link to="/mypage" className="text-xs text-[#2563EB] font-bold hover:underline">
            &larr; 마이페이지로 돌아가기
          </Link>
          <span className="text-xs text-slate-400">
            가입일: {currentMember.createdAt?.split(' ')[0] || '2026-01-01'}
          </span>
        </div>

        {successMessage && (
          <div className="p-4 text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-4 text-xs bg-red-50 text-red-700 border border-red-200 rounded-2xl flex items-center gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Basic & Company Info */}
          <Card className="p-6 sm:p-8 border-slate-200 space-y-4">
            <h3 className="font-bold text-base text-[#102B50] flex items-center gap-2 border-b border-slate-100 pb-3">
              <User className="w-4 h-4 text-[#2563EB]" />
              기본 및 기업 정보
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                아이디 (이메일 주소)
              </label>
              <input
                type="text"
                disabled
                value={currentMember.email}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-100 text-slate-500 border border-slate-200 rounded-lg cursor-not-allowed"
              />
              <p className="text-[11px] text-slate-400 mt-1">※ 가입 이메일 아이디는 변경할 수 없습니다.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="대표자 / 담당자 성함"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                leftIcon={<User className="w-4 h-4" />}
              />

              <Input
                label="기업명 (상호명)"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                leftIcon={<Building className="w-4 h-4" />}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="연락처 (휴대폰)"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                leftIcon={<Phone className="w-4 h-4" />}
              />

              <Input
                label="사업자등록번호"
                placeholder="123-45-67890"
                value={formData.businessNumber}
                onChange={(e) => setFormData({ ...formData, businessNumber: e.target.value })}
              />
            </div>

            <Input
              label="사업장 주소지"
              placeholder="서울특별시 서초구 강남대로 123"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              leftIcon={<MapPin className="w-4 h-4" />}
            />
          </Card>

          {/* Section 2: Password Change */}
          <Card className="p-6 sm:p-8 border-slate-200 space-y-4">
            <h3 className="font-bold text-base text-[#102B50] flex items-center gap-2 border-b border-slate-100 pb-3">
              <Lock className="w-4 h-4 text-[#2563EB]" />
              비밀번호 변경 (선택)
            </h3>
            <p className="text-xs text-slate-500">
              비밀번호를 변경하지 않으려면 입력창을 비워 두세요.
            </p>

            <Input
              label="현재 비밀번호"
              type="password"
              placeholder="현재 비밀번호 입력"
              value={formData.currentPassword}
              onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
              leftIcon={<Lock className="w-4 h-4" />}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="새 비밀번호"
                type="password"
                placeholder="영문, 숫자 8자 이상"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                leftIcon={<Lock className="w-4 h-4" />}
              />

              <Input
                label="새 비밀번호 확인"
                type="password"
                placeholder="새 비밀번호 재입력"
                value={formData.newPasswordConfirm}
                onChange={(e) => setFormData({ ...formData, newPasswordConfirm: e.target.value })}
                leftIcon={<Lock className="w-4 h-4" />}
              />
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => navigate('/mypage')}
            >
              취소
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isSubmitting}
              className="font-bold"
            >
              {isSubmitting ? '수정 사항 저장 중...' : '회원 정보 수정 완료'}
            </Button>
          </div>
        </form>

        {/* Section 3: Delete Account Section */}
        <div className="pt-6 border-t border-slate-200">
          <div className="p-5 bg-red-50/50 border border-red-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-red-900 flex items-center gap-1.5">
                <Trash2 className="w-4 h-4 text-red-600" />
                회원 탈퇴
              </h4>
              <p className="text-xs text-red-700/80 mt-1">
                탈퇴 시 계정 정보가 삭제되며, 진행 중인 상담 내역 조회가 제한될 수 있습니다.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsDeleteModalOpen(true)}
              className="border-red-200 text-red-700 hover:bg-red-100 shrink-0 font-bold"
            >
              회원 탈퇴 신청
            </Button>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-center gap-3 text-red-600">
                <ShieldAlert className="w-6 h-6 shrink-0" />
                <h3 className="font-extrabold text-base text-[#102B50]">
                  정말로 회원 탈퇴를 진행하시겠습니까?
                </h3>
              </div>

              <div className="text-xs text-slate-600 space-y-2 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-800">• 탈퇴 전 유의사항:</p>
                <p>1. 등록된 기업 정보 및 담당자 정보가 안전하게 파기됩니다.</p>
                <p>2. 탈퇴 후 동일한 이메일로 재가입이 가능하나 이전 상담 이력은 연동되지 않습니다.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  탈퇴 사유
                </label>
                <select
                  value={deleteReason}
                  onChange={(e) => setDeleteReason(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none"
                >
                  <option value="컨설팅 서비스 완료">원하던 컨설팅 서비스 완료</option>
                  <option value="타 기관 이용">타 금융/컨설팅 기관 이용</option>
                  <option value="개인정보 보호">개인정보 삭제 희망</option>
                  <option value="기타">기타 사유</option>
                </select>
              </div>

              <label className="flex items-start gap-2 text-xs text-slate-700 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={deleteConfirmed}
                  onChange={(e) => setDeleteConfirmed(e.target.checked)}
                  className="mt-0.5 rounded text-red-600 focus:ring-red-500"
                />
                <span className="font-bold text-red-900">
                  위 유의사항을 모두 확인하였으며, 회원 탈퇴에 동의합니다.
                </span>
              </label>

              <div className="flex justify-end gap-2.5 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  취소
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  disabled={!deleteConfirmed || isDeleting}
                  onClick={handleDeleteAccount}
                  className="bg-red-600 hover:bg-red-700 border-red-600 text-white font-bold"
                >
                  {isDeleting ? '탈퇴 처리 중...' : '확인 및 탈퇴'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};
