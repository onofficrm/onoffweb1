import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Building,
  User,
  MapPin,
  Calendar,
  Coins,
  Shield,
  ShieldAlert,
  FileSpreadsheet,
  AlertCircle,
  Save,
  X,
} from 'lucide-react';
import { ConsultationItem, ConsultationStatus } from '../../types/auth';
import { dbService } from '../../services/dbService';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input, Select, Textarea } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';

interface AdminConsultationsTabProps {
  consultations: ConsultationItem[];
  onRefresh: () => void;
  selectedItem: ConsultationItem | null;
  onSelectItem: (item: ConsultationItem | null) => void;
}

const CONSULTANT_LIST = [
  '미지정 (배정 대기)',
  '박상현 수석자문위원 (정책자금 총괄)',
  '최영호 수석컨설턴트 (기업인증 전담)',
  '이재형 수석자문위원 (경영컨설팅 & 재무개선)',
  '정유진 선임자문역 (소상공인 & 창업특화)',
];

const STATUS_LIST: ConsultationStatus[] = [
  '접수',
  '상담 대기',
  '상담 진행',
  '계약 완료',
  '컨설팅 진행',
  '종료',
];

export const AdminConsultationsTab: React.FC<AdminConsultationsTabProps> = ({
  consultations,
  onRefresh,
  selectedItem,
  onSelectItem,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [maskPersonalInfo, setMaskPersonalInfo] = useState(false);

  // Edit states inside modal
  const [editStatus, setEditStatus] = useState<ConsultationStatus>('접수');
  const [editConsultant, setEditConsultant] = useState('');
  const [editAdminNotes, setEditAdminNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Open modal handler
  const handleOpenDetail = (item: ConsultationItem) => {
    onSelectItem(item);
    setEditStatus(item.status);
    setEditConsultant(item.assignedConsultant || CONSULTANT_LIST[0]);
    setEditAdminNotes(item.adminNotes || '');
    setSaveSuccess(false);
  };

  const handleSaveDetail = () => {
    if (!selectedItem) return;
    setIsSaving(true);
    setTimeout(() => {
      dbService.updateConsultationStatus(
        selectedItem.id,
        editStatus,
        editAdminNotes,
        editConsultant
      );
      setIsSaving(false);
      setSaveSuccess(true);
      onRefresh();
      // Update selectedItem local reference
      onSelectItem({
        ...selectedItem,
        status: editStatus,
        adminNotes: editAdminNotes,
        assignedConsultant: editConsultant,
      });
      setTimeout(() => setSaveSuccess(false), 2000);
    }, 400);
  };

  const handleDelete = (id: string, companyName: string) => {
    if (
      window.confirm(
        `[확인] '${companyName}'의 상담 신청 내역(${id})을 영구 삭제하시겠습니까?\n삭제된 데이터는 복구되지 않습니다.`
      )
    ) {
      dbService.deleteConsultation(id);
      if (selectedItem?.id === id) onSelectItem(null);
      onRefresh();
    }
  };

  // Excel (CSV with UTF-8 BOM) Download
  const handleExportCSV = () => {
    const csvContent = dbService.exportConsultationsToCSV(filteredConsultations, maskPersonalInfo);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().slice(0, 10);
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `비즈온탑_상담신청목록_${dateStr}${maskPersonalInfo ? '_마스킹' : '_전체'}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter logic
  const filteredConsultations = consultations.filter((item) => {
    const matchCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchStatus =
      selectedStatus === 'all' || item.status === selectedStatus;
    const s = searchTerm.trim().toLowerCase();
    const matchSearch =
      !s ||
      item.companyName.toLowerCase().includes(s) ||
      item.representativeName.toLowerCase().includes(s) ||
      item.contactNumber.includes(s) ||
      item.id.toLowerCase().includes(s) ||
      item.productName.toLowerCase().includes(s);

    return matchCategory && matchStatus && matchSearch;
  });

  const getStatusBadge = (status: ConsultationStatus) => {
    switch (status) {
      case '접수':
        return <Badge variant="warning">접수</Badge>;
      case '상담 대기':
        return <Badge variant="neutral">대기</Badge>;
      case '상담 진행':
        return <Badge variant="info">상담 중</Badge>;
      case '계약 완료':
        return <Badge variant="success">계약 완료</Badge>;
      case '컨설팅 진행':
        return <Badge variant="accent">컨설팅 중</Badge>;
      case '종료':
        return <Badge variant="neutral">종료</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const maskPhone = (phone: string) => {
    if (!maskPersonalInfo || phone.length < 8) return phone;
    const parts = phone.split('-');
    if (parts.length === 3) return `${parts[0]}-****-${parts[2]}`;
    return phone.slice(0, 3) + '****' + phone.slice(-4);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header & Actions Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-[#102B50] flex items-center gap-2">
            <span>상담 신청 관리</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-[#2563EB] font-bold">
              총 {filteredConsultations.length}건
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            신청 기업의 자격 심사, 진행 상태 변경, 전담 컨설턴트 배정 및 상담 일지를 관리합니다.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Privacy masking toggle */}
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 cursor-pointer select-none hover:bg-slate-100">
            <input
              type="checkbox"
              checked={maskPersonalInfo}
              onChange={(e) => setMaskPersonalInfo(e.target.checked)}
              className="rounded text-[#2563EB] focus:ring-[#2563EB]"
            />
            <span>개인정보 마스킹</span>
          </label>

          {/* CSV Download Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            className="text-xs font-bold"
            leftIcon={<FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />}
          >
            엑셀(CSV) 다운로드
          </Button>
        </div>
      </div>

      {/* 2. Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        {/* Search */}
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="기업명, 고객명, 연락처, 접수번호, 상품명 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
          />
        </div>

        {/* Category Filter */}
        <div className="sm:col-span-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="관심 서비스 카테고리 필터"
            className="w-full py-2 px-3 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#2563EB] bg-white text-slate-700"
          >
            <option value="all">모든 서비스 (전체)</option>
            <option value="funding">정책자금</option>
            <option value="certification">기업인증</option>
            <option value="consulting">경영컨설팅</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="sm:col-span-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            aria-label="상담 진행 상태 필터"
            className="w-full py-2 px-3 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#2563EB] bg-white text-slate-700"
          >
            <option value="all">모든 상태 (전체)</option>
            {STATUS_LIST.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Consultations Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold">
                <th className="py-3 px-4 w-28">접수번호</th>
                <th className="py-3 px-4">기업명 (대표자/고객명)</th>
                <th className="py-3 px-4">연락처</th>
                <th className="py-3 px-4">관심 서비스 / 상품</th>
                <th className="py-3 px-4">신청일시</th>
                <th className="py-3 px-4">담당자</th>
                <th className="py-3 px-4 text-center">진행 상태</th>
                <th className="py-3 px-4 text-center">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredConsultations.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    일치하는 상담 신청 내역이 없습니다.
                  </td>
                </tr>
              ) : (
                filteredConsultations.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                    onClick={() => handleOpenDetail(item)}
                  >
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-600">
                      {item.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors">
                        {item.companyName}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {item.representativeName}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {maskPhone(item.contactNumber)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800 block">
                        {item.categoryName}
                      </span>
                      <span className="text-[11px] text-slate-500 block truncate max-w-[180px]">
                        {item.productName}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                      {item.createdAt}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <span className="text-xs truncate block max-w-[140px]">
                        {item.assignedConsultant || '-'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {getStatusBadge(item.status)}
                    </td>
                    <td
                      className="py-3.5 px-4 text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenDetail(item)}
                          className="p-1.5 text-slate-500 hover:text-[#2563EB] hover:bg-slate-100 rounded-md transition-colors"
                          title="상세 보기 및 상태 변경"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id, item.companyName)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="상담 내역 삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Consultation Detail & Status Management Modal */}
      {selectedItem && (
        <Modal
          isOpen={!!selectedItem}
          onClose={() => onSelectItem(null)}
          title={`상담 신청 상세 및 진행 관리 (${selectedItem.id})`}
          subtitle="신청 기업의 자격 요건을 검토하고 진행 상태와 자문 메모를 작성합니다."
          maxWidth="2xl"
        >
          <div className="space-y-6">
            {saveSuccess && (
              <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                상담 상태 및 자문 메모가 성공적으로 저장되었습니다! 회원 마이페이지에도 즉시 반영됩니다.
              </div>
            )}

            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold">기업명 / 대표자(고객명)</span>
                <p className="font-bold text-slate-900 text-sm">
                  {selectedItem.companyName}{' '}
                  <span className="text-slate-500 font-normal">
                    ({selectedItem.representativeName})
                  </span>
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold">연락처 / 이메일</span>
                <p className="font-bold text-slate-800">
                  {selectedItem.contactNumber}{' '}
                  <span className="text-slate-500 font-normal">
                    ({selectedItem.email})
                  </span>
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold">신청 서비스 및 세부 상품</span>
                <p className="font-semibold text-[#2563EB]">
                  [{selectedItem.categoryName}] {selectedItem.productName}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold">사업장 소재지 / 설립연도</span>
                <p className="text-slate-700">
                  {selectedItem.location} ({selectedItem.foundedYear}년 설립)
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold">연매출 규모</span>
                <p className="text-slate-700">{selectedItem.annualRevenue}</p>
              </div>
              {selectedItem.desiredFundAmount && (
                <div className="space-y-1">
                  <span className="text-slate-400 font-semibold">희망 자금 규모</span>
                  <p className="text-emerald-700 font-bold">
                    {selectedItem.desiredFundAmount}
                  </p>
                </div>
              )}
            </div>

            {/* Inquiry Details */}
            {selectedItem.inquiryDetails && (
              <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 text-xs space-y-1.5">
                <span className="font-bold text-[#102B50] flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-[#2563EB]" />
                  고객 상담 요청사항
                </span>
                <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {selectedItem.inquiryDetails}
                </p>
              </div>
            )}

            {/* Management Controls: Status, Consultant, Admin Notes */}
            <div className="space-y-4 pt-2 border-t border-slate-200">
              <h4 className="text-xs font-bold text-[#102B50] uppercase tracking-wider">
                관리자 처리 영역 (상태 변경 및 상담 메모)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    상담 진행 상태 변경
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as ConsultationStatus)}
                    aria-label="상담 진행 상태 선택"
                    className="w-full py-2 px-3 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB] bg-white font-bold text-[#102B50]"
                  >
                    {STATUS_LIST.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    담당 컨설턴트 지정
                  </label>
                  <select
                    value={editConsultant}
                    onChange={(e) => setEditConsultant(e.target.value)}
                    aria-label="담당 컨설턴트 지정"
                    className="w-full py-2 px-3 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB] bg-white text-slate-700"
                  >
                    {CONSULTANT_LIST.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  상담 진행 메모 / 안내 사항 (회원 마이페이지에 연동 노출)
                </label>
                <textarea
                  rows={3}
                  value={editAdminNotes}
                  onChange={(e) => setEditAdminNotes(e.target.value)}
                  placeholder="예: 사전 서류 적격 판정 완료. 3월 25일 방문 실사 인터뷰 코칭 예정입니다."
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB]"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(selectedItem.id, selectedItem.companyName)}
                className="text-xs font-bold text-red-600 hover:bg-red-50"
                leftIcon={<Trash2 className="w-3.5 h-3.5" />}
              >
                삭제하기
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSelectItem(null)}
                  className="text-xs"
                >
                  닫기
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  disabled={isSaving}
                  onClick={handleSaveDetail}
                  className="text-xs font-bold"
                  leftIcon={<Save className="w-3.5 h-3.5" />}
                >
                  {isSaving ? '저장 중...' : '상태 및 메모 저장'}
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
