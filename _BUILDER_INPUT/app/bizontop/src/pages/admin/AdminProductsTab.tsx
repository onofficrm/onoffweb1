import React, { useState } from 'react';
import {
  Package,
  Search,
  Eye,
  EyeOff,
  Edit3,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Link as LinkIcon,
  RotateCcw,
  Sparkles,
  Save,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductDetail, ProductCategory } from '../../types/product';
import { productService } from '../../services/productService';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';

interface AdminProductsTabProps {
  onRefresh: () => void;
}

const CATEGORY_NAMES: Record<ProductCategory, string> = {
  funding: '정책자금',
  certification: '기업인증',
  consulting: '경영컨설팅',
};

export const AdminProductsTab: React.FC<AdminProductsTabProps> = ({ onRefresh }) => {
  const [products, setProducts] = useState<ProductDetail[]>(() =>
    productService.getAllProducts()
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Edit Modal State
  const [editingProduct, setEditingProduct] = useState<ProductDetail | null>(null);
  const [formName, setFormName] = useState('');
  const [formShortDesc, setFormShortDesc] = useState('');
  const [formPurpose, setFormPurpose] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formIsPublished, setFormIsPublished] = useState(true);
  const [formConnectedServiceId, setFormConnectedServiceId] = useState('');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('');

  const handleOpenEdit = (p: ProductDetail) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormShortDesc(p.shortDesc);
    setFormPurpose(p.purposeAndContent?.purpose || '');
    setFormImage(p.image);
    setFormIsPublished(p.isPublished !== false);
    setFormConnectedServiceId(p.connectedServiceId || p.id);
    setSaveSuccessMessage('');
  };

  const handleSaveProduct = () => {
    if (!editingProduct) return;
    const res = productService.updateProduct(editingProduct.id, {
      name: formName.trim(),
      shortDesc: formShortDesc.trim(),
      image: formImage.trim(),
      isPublished: formIsPublished,
      connectedServiceId: formConnectedServiceId.trim(),
      purposeAndContent: {
        ...editingProduct.purposeAndContent,
        purpose: formPurpose.trim(),
      },
    });

    if (res.success) {
      setProducts(productService.getAllProducts());
      setSaveSuccessMessage('상품 정보 및 연결 식별자가 안전하게 저장되었습니다.');
      onRefresh();
      setTimeout(() => {
        setEditingProduct(null);
        setSaveSuccessMessage('');
      }, 1200);
    }
  };

  const handleTogglePublish = (p: ProductDetail) => {
    const nextState = p.isPublished === false ? true : false;
    productService.updateProduct(p.id, { isPublished: nextState });
    setProducts(productService.getAllProducts());
    onRefresh();
  };

  const handleResetDefaults = () => {
    if (
      window.confirm(
        '모든 상품 정보(제목, 소개 문구, 이미지, 연결 식별자 등)를 초기 기본값으로 복원하시겠습니까?'
      )
    ) {
      productService.resetToDefault();
      setProducts(productService.getAllProducts());
      onRefresh();
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchCategory =
      selectedCategory === 'all' || p.category === selectedCategory;
    const s = searchTerm.trim().toLowerCase();
    const matchSearch =
      !s ||
      p.name.toLowerCase().includes(s) ||
      p.shortDesc.toLowerCase().includes(s) ||
      p.id.toLowerCase().includes(s);
    return matchCategory && matchSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-[#102B50] flex items-center gap-2">
            <span>컨설팅 서비스 및 상품 관리</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-[#2563EB] font-bold">
              총 {filteredProducts.length}개 상품
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            정책자금, 기업인증, 경영컨설팅 상품의 제목, 소개문구, 상세내용, 이미지, 노출 여부 및 상담 연결 식별자를 수정합니다.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleResetDefaults}
          className="text-xs font-bold shrink-0 self-start sm:self-auto"
          leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
        >
          기본 상품 데이터 복원
        </Button>
      </div>

      {/* 2. Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="상품명, 소개 문구, 서비스 식별자(ID) 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#2563EB]"
          />
        </div>

        <div className="sm:col-span-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="서비스 대분류 필터"
            className="w-full py-2 px-3 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#2563EB] bg-white text-slate-700"
          >
            <option value="all">전체 서비스 대분류</option>
            <option value="funding">정책자금</option>
            <option value="certification">기업인증</option>
            <option value="consulting">경영컨설팅</option>
          </select>
        </div>
      </div>

      {/* 3. Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              {/* Image Preview & Badge */}
              <div className="relative h-40 bg-slate-100 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-[#102B50]/90 text-white text-[10px] font-bold">
                    {CATEGORY_NAMES[p.category] || p.category}
                  </span>
                  {p.isPublished === false && (
                    <span className="px-2 py-0.5 rounded-md bg-rose-600/90 text-white text-[10px] font-bold">
                      숨김(미노출)
                    </span>
                  )}
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <span className="text-[10px] font-mono text-[#D5A64B] block">
                    ID: {p.id}
                  </span>
                  <h3 className="text-sm font-bold truncate">{p.name}</h3>
                </div>
              </div>

              {/* Body Info */}
              <div className="p-4 space-y-3 text-xs">
                <p className="text-slate-600 line-clamp-2 leading-relaxed">
                  {p.shortDesc}
                </p>

                <div className="pt-2 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-500">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-slate-400">
                      <LinkIcon className="w-3 h-3" />
                      연결 상담 식별자:
                    </span>
                    <span className="font-mono font-bold text-[#2563EB]">
                      {p.connectedServiceId || p.id}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>상담 버튼 연동:</span>
                    <span className="text-emerald-600 font-medium">
                      /consultation?product={p.connectedServiceId || p.id}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleTogglePublish(p)}
                className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-md transition-colors ${
                  p.isPublished !== false
                    ? 'text-emerald-700 bg-emerald-100/70 hover:bg-emerald-200'
                    : 'text-slate-600 bg-slate-200 hover:bg-slate-300'
                }`}
              >
                {p.isPublished !== false ? (
                  <>
                    <Eye className="w-3 h-3" /> 노출 중
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3 h-3" /> 비노출
                  </>
                )}
              </button>

              <div className="flex items-center gap-1.5">
                <Link
                  to={`/${p.category}/${p.id}`}
                  target="_blank"
                  className="p-1.5 text-slate-500 hover:text-[#2563EB] hover:bg-white rounded-md"
                  title="실제 상품 페이지 보기"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenEdit(p)}
                  className="text-xs font-bold py-1 px-2.5 h-7"
                  leftIcon={<Edit3 className="w-3 h-3" />}
                >
                  수정
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Edit Product Modal */}
      {editingProduct && (
        <Modal
          isOpen={!!editingProduct}
          onClose={() => setEditingProduct(null)}
          title={`상품 상세 정보 수정 (${editingProduct.name})`}
          subtitle="제목, 소개 문구, 주요 컨설팅 목적, 이미지 URL 및 상담 신청 연결 식별자를 설정합니다."
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs">
            {saveSuccessMessage && (
              <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                {saveSuccessMessage}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">상품명 (제목) *</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB] font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">
                  상담 신청 버튼 연결 서비스 식별자 *
                </label>
                <input
                  type="text"
                  placeholder="예: small-business, venture, iso"
                  value={formConnectedServiceId}
                  onChange={(e) => setFormConnectedServiceId(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB] font-mono text-xs text-[#2563EB] font-bold"
                />
                <p className="text-[11px] text-slate-500">
                  * 상품 상세의 '상담 신청' 클릭 시 /consultation 폼의 세부 상품으로 자동 지정되는 코드입니다.
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">간단 소개 문구 (요약) *</label>
              <input
                type="text"
                value={formShortDesc}
                onChange={(e) => setFormShortDesc(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">
                대표 이미지 URL / Asset 경로
              </label>
              <input
                type="text"
                value={formImage}
                onChange={(e) => setFormImage(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB] font-mono text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">
                상세 서비스 목적 및 내용 (Purpose)
              </label>
              <textarea
                rows={4}
                value={formPurpose}
                onChange={(e) => setFormPurpose(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#2563EB] leading-relaxed"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formIsPublished}
                  onChange={(e) => setFormIsPublished(e.target.checked)}
                  className="rounded text-[#2563EB] focus:ring-[#2563EB]"
                />
                <span className="font-bold text-slate-800">
                  홈페이지 및 카테고리 목록에 공개 노출 (isPublished)
                </span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
              <Button variant="outline" size="sm" onClick={() => setEditingProduct(null)}>
                취소
              </Button>
              <Button variant="primary" size="sm" onClick={handleSaveProduct} className="font-bold">
                저장하기
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
