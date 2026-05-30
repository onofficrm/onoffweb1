/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { X, HelpCircle, Search, ChevronDown, ChevronUp, Sparkles, MessageSquare, Phone, HelpCircle as HelpIcon } from 'lucide-react';
import { FAQ_DATA, CORE_INFO } from '../data';

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FaqModal({ isOpen, onClose }: FaqModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-1");

  if (!isOpen) return null;

  const categories = ["전체", "청약 요건", "분양가 안내", "단지 정보", "교육·트래픽", "체험/예약"];

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const filteredFaqs = useMemo(() => {
    let result = FAQ_DATA;
    
    // Category Filter
    if (selectedCategory !== "전체") {
      result = result.filter(item => item.category === selectedCategory);
    }
    
    // Search Query Filter
    if (searchQuery.trim() !== "") {
      const normalizedQuery = searchQuery.toLowerCase().replace(/\s+/g, '');
      result = result.filter(item => {
        const questionText = item.question.toLowerCase().replace(/\s+/g, '');
        const answerText = item.answer.toLowerCase().replace(/\s+/g, '');
        return questionText.includes(normalizedQuery) || answerText.includes(normalizedQuery);
      });
    }
    
    return result;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-[#0a1128]/85 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Box */}
      <div className="relative bg-[#faf9f6] w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-gold-300/30 max-h-[90vh] flex flex-col z-10 animate-scaleUp">
        
        {/* Soft elegant top banner with a luxury deep-blue-to-slate gradient */}
        <div className="bg-gradient-to-r from-[#0a1128] to-[#122245] p-6 sm:p-8 text-white relative flex-shrink-0">
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 transition-all text-white cursor-pointer z-30"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="flex items-center space-x-1 text-[10px] sm:text-xs bg-gold-600/90 text-white px-2.5 py-1 rounded-full font-bold tracking-wider uppercase">
                <Sparkles className="h-3 w-3 text-gold-200" />
                <span>PRE-SALE INTELIGENCE CENTER</span>
              </span>
              <span className="text-[10px] text-gold-300/80 font-mono">1:1 AI Grounding FAQ</span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              천안 업성 푸르지오 레이크시티<br />
              <span className="bg-gradient-to-r from-gold-300 to-amber-200 bg-clip-text text-transparent font-extrabold">
                분양 및 자격에 관한 자주 묻는 질문 (FAQ)
              </span>
            </h2>
            
            <p className="text-xs text-slate-350 text-slate-300 leading-relaxed font-sans max-w-lg">
              예비 청약 계약자분들의 고민을 덜어드리기 위해 법리적 및 일상적 질의를 면밀히 분석하고 정돈한 핵심 큐레이션 가이드라인입니다.
            </p>
          </div>

          {/* Decorative background shapes */}
          <div className="absolute right-0 bottom-0 top-0 overflow-hidden w-1/3 opacity-10 pointer-events-none">
            <HelpIcon className="absolute -right-10 -bottom-10 h-44 w-44 text-gold-300" />
          </div>
        </div>

        {/* Modal Secondary Toolbar for searching */}
        <div className="bg-white border-b border-gray-150 p-4 sm:px-8 flex-shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Tabs inside standard horizontal layout */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setOpenFaqId(null);
                }}
                className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0a1128] text-white border-[#0a1128] shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gold-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Interactive Search Field */}
          <div className="relative w-full md:w-72 flex-shrink-0">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="궁금한 단어를 입력해 주세요... (예: 청약, 분양가)"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setOpenFaqId(null);
              }}
              className="w-full text-xs bg-gray-50 border border-gray-205 focus:border-gold-450 focus:ring-1 focus:ring-gold-400/30 rounded-xl pl-9 pr-4 py-2.5 outline-none font-medium text-gray-800 transition-all border-gray-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

        </div>

        {/* Modal Live Body Content */}
        <div className="p-5 sm:p-8 flex-1 overflow-y-auto space-y-4 bg-gray-50/50">
          
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-150">
              <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-3.5" />
              <p className="text-base font-bold text-[#0a1128]">일치하는 질문 결과가 없습니다</p>
              <p className="text-xs text-gray-400 max-w-sm mx-auto font-sans mt-1">
                다른 키워드로 검색해 보시거나, 상단의 필터 카테고리를 이용해 주시기 바랍니다.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-white rounded-2xl border border-gold-200 shadow-sm overflow-hidden hover:border-gold-350 transition-colors"
                  >
                    {/* Collapsible Trigger Head */}
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full text-left p-5 sm:p-6 flex items-center justify-between space-x-4 cursor-pointer"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="bg-gold-50 text-gold-600 p-2 rounded-xl border border-gold-150 flex-shrink-0 mt-0.5">
                          <HelpCircle className="h-4 w-4.5 text-gold-600" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-gold-600 mr-2 uppercase tracking-widest block mb-0.5">
                            {faq.category}
                          </span>
                          <h3 className="text-sm sm:text-base font-extrabold text-[#0a1128] tracking-tight leading-snug">
                            {faq.question}
                          </h3>
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0 p-1.5 bg-gray-50 rounded-full border border-gray-150">
                        {isOpen ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gold-600" />}
                      </div>
                    </button>

                    {/* Expandable answer panel */}
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? 'max-h-[500px] border-t border-gold-100 bg-[#fdfaf5]/40 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="p-5 sm:p-6 text-xs sm:text-sm text-gray-650 text-gray-600 leading-relaxed font-sans">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Quick Helpline Inside Modal Footer */}
          <div className="bg-gold-50/50 p-6 rounded-2xl border border-gold-200/50 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div className="space-y-1 text-center sm:text-left">
              <p className="text-xs text-gray-400 font-sans">궁금한 세부 일정이 아직 안 풀리셨나요?</p>
              <h4 className="text-sm font-extrabold text-[#0a1128]">
                전담 분양 수석 자산 매니저 무료 1:1 전화 및 면담 상담
              </h4>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <a
                href={`tel:${CORE_INFO.phone}`}
                className="inline-flex items-center justify-center space-x-1.5 bg-white border border-[#0a1128] text-[#0a1128] hover:bg-gray-100 text-xs font-bold px-4 py-2.5 rounded-full transition-colors whitespace-nowrap shadow-sm"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>분양상담 {CORE_INFO.phone}</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  const consultationOffset = document.getElementById('consultation');
                  if (consultationOffset) {
                    const offsetPosition = consultationOffset.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center justify-center space-x-1 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-700 hover:to-gold-600 text-white text-xs font-bold px-4.5 py-2.5 rounded-full shadow-md cursor-pointer whitespace-nowrap bg-gold-600"
              >
                <span>선착순 VIP 상담등록하기</span>
                <span>→</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
