import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Phone, Send, Shield, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input, Select, Textarea } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { ConsultationFormData } from '../../types';
import { dbService } from '../../services/dbService';
import { useAuth } from '../../context/AuthContext';
import { ConsultationItem } from '../../types/auth';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

const initialForm: ConsultationFormData = {
  companyName: '',
  representativeName: '',
  contactNumber: '',
  email: '',
  location: '서울특별시',
  annualRevenue: '3억~10억',
  businessYears: '2023',
  consultingType: '중소기업 정책자금',
  estimatedAmount: '1억~3억',
  inquiryDetails: '',
  agreedToPrivacy: false,
};

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultService,
}) => {
  const navigate = useNavigate();
  const { currentMember } = useAuth();

  const [formData, setFormData] = useState<ConsultationFormData>({
    ...initialForm,
    companyName: currentMember?.companyName || '',
    representativeName: currentMember?.name || '',
    contactNumber: currentMember?.phone || '',
    email: currentMember?.email || '',
    consultingType: defaultService || initialForm.consultingType,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdConsultation, setCreatedConsultation] = useState<ConsultationItem | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (field: keyof ConsultationFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.companyName.trim()) {
      setErrorMessage('기업명(상호명)을 입력해 주세요.');
      return;
    }
    if (!formData.representativeName.trim()) {
      setErrorMessage('대표자명(신청자명)을 입력해 주세요.');
      return;
    }
    if (!formData.contactNumber.trim()) {
      setErrorMessage('연락처(휴대폰 번호)를 입력해 주세요.');
      return;
    }
    if (!formData.agreedToPrivacy) {
      setErrorMessage('개인정보 수집 및 이용에 동의해 주세요.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = dbService.createConsultation({
        userId: currentMember?.id || null,
        category: 'funding',
        categoryName: '정책자금',
        productId: 'quick-modal',
        productName: formData.consultingType || '빠른 정책자금 상담',
        companyName: formData.companyName,
        representativeName: formData.representativeName,
        contactNumber: formData.contactNumber,
        email: formData.email || 'guest@consult.kr',
        location: formData.location || '서울특별시',
        foundedYear: formData.businessYears || '2023',
        annualRevenue: formData.annualRevenue || '3억~10억',
        desiredFundAmount: formData.estimatedAmount || '1억~3억',
        inquiryDetails: formData.inquiryDetails || '',
        agreedToPrivacy: formData.agreedToPrivacy,
      });

      setIsSubmitting(false);

      if (res.success && res.consultation) {
        setCreatedConsultation(res.consultation);
      } else {
        setErrorMessage(res.error || '상담 접수 중 오류가 발생했습니다.');
      }
    }, 600);
  };

  const handleReset = () => {
    setFormData(initialForm);
    setCreatedConsultation(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title="비즈온탑 1:1 빠른 무료 상담 신청"
      subtitle="전문 수석 컨설턴트가 24시간 이내 사전 자금 분석 후 신속히 연락드립니다."
      maxWidth="xl"
    >
      {createdConsultation ? (
        <div className="py-6 text-center space-y-5 animate-fadeIn">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs ring-8 ring-emerald-50">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <span className="px-2 py-0.5 bg-blue-50 text-[#2563EB] text-xs font-mono font-bold rounded-md">
              접수번호: {createdConsultation.id}
            </span>
            <h4 className="text-xl font-bold text-[#102B50] mt-2">상담 신청이 정상 접수되었습니다!</h4>
            <p className="text-xs text-slate-600 mt-1.5 max-w-md mx-auto leading-relaxed">
              작성해주신 기업 정보(<strong>{createdConsultation.companyName}</strong>)를 바탕으로 정책기관 융자 한도 및 인증 요건을 사전 검토한 뒤, 
              <strong> {createdConsultation.contactNumber}</strong> 번호로 전담 컨설턴트가 신속히 연락드리겠습니다.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 max-w-md mx-auto text-left space-y-1.5">
            <p className="font-semibold text-slate-800">📌 비즈온탑 안심 상담 안내</p>
            <p>• 상담 전 일체의 수수료나 착수금을 요구하지 않습니다.</p>
            <p>• 마이페이지에서 접수번호(<strong>{createdConsultation.id}</strong>)로 진행 상태를 실시간 확인하실 수 있습니다.</p>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => {
                handleReset();
                navigate('/mypage');
              }}
              className="font-bold text-xs"
            >
              마이페이지에서 진행 상태 확인
            </Button>
            <Button variant="primary" onClick={handleReset} className="px-6 text-xs font-bold">
              확인 완료
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div className="p-3 text-xs bg-red-50 text-red-700 border border-red-200 rounded-lg">
              {errorMessage}
            </div>
          )}

          <div className="p-2.5 bg-blue-50/70 border border-blue-100 rounded-xl flex items-center justify-between text-xs text-blue-900">
            <span>자세한 3대 서비스 선택 및 세부 상품별 신청을 원하시나요?</span>
            <button
              type="button"
              onClick={() => {
                onClose();
                navigate('/consultation');
              }}
              className="text-[#2563EB] font-bold hover:underline inline-flex items-center gap-1"
            >
              정식 상담 페이지 이동 <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="기업명(상호명)"
              placeholder="예: (주)한국미래테크"
              required
              value={formData.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
            />
            <Input
              label="대표자명 또는 담당자명"
              placeholder="예: 홍길동 대표"
              required
              value={formData.representativeName}
              onChange={(e) => handleChange('representativeName', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="연락처"
              type="tel"
              placeholder="010-1234-5678"
              required
              value={formData.contactNumber}
              onChange={(e) => handleChange('contactNumber', e.target.value)}
            />
            <Input
              label="이메일"
              type="email"
              placeholder="ceo@company.kr"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="상담 희망 분야"
              value={formData.consultingType}
              onChange={(e) => handleChange('consultingType', e.target.value)}
              options={[
                { value: '소상공인/중소기업 정책자금', label: '소상공인 / 중소기업 정책자금' },
                { value: '시설자금 및 공장매입 자금', label: '시설자금 및 공장매입 자금' },
                { value: '벤처기업확인 인증', label: '벤처기업확인 인증' },
                { value: '기업부설연구소 / 전담부서 설립', label: '기업부설연구소 설립' },
                { value: 'ISO 9001/14001 인증', label: 'ISO 인증 (9001/14001)' },
                { value: '법인설립 및 개인사업자 법인전환', label: '법인설립 및 법인전환' },
                { value: '종합 기업경영자문 컨설팅', label: '종합 기업경영자문 컨설팅' },
              ]}
            />
            <Select
              label="희망 자금 규모"
              value={formData.estimatedAmount}
              onChange={(e) => handleChange('estimatedAmount', e.target.value)}
              options={[
                { value: '5천만 원 이하', label: '5천만 원 이하' },
                { value: '1억~3억', label: '1억 ~ 3억 원' },
                { value: '3억~5억', label: '3억 ~ 5억 원' },
                { value: '5억~10억', label: '5억 ~ 10억 원' },
                { value: '10억 이상', label: '10억 원 이상' },
              ]}
            />
          </div>

          <Textarea
            label="상담 문의사항 (선택)"
            placeholder="자금 조달 목적 또는 현재 기업 애로사항을 간단히 적어주세요."
            rows={3}
            value={formData.inquiryDetails}
            onChange={(e) => handleChange('inquiryDetails', e.target.value)}
          />

          <div className="pt-2">
            <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                required
                checked={formData.agreedToPrivacy}
                onChange={(e) => handleChange('agreedToPrivacy', e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
              />
              <span>
                <strong>[필수]</strong> 개인정보 수집 및 이용(상담 접수 및 결과 안내 목적)에 동의합니다.
              </span>
            </label>
          </div>

          <div className="pt-3">
            <Button
              type="submit"
              variant="accent"
              fullWidth
              size="lg"
              disabled={isSubmitting}
              className="font-bold py-3.5"
              leftIcon={<Send className="w-4 h-4" />}
            >
              {isSubmitting ? '상담 신청 접수 중...' : '1:1 무료 상담 신청 완료'}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
