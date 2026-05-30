/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BLOG_POSTS } from '../data';
import { BlogPost } from '../types';
import { BookOpen, User, Calendar, MessageSquare, Tag, Eye, ArrowRight, X } from 'lucide-react';

interface SeoGeoBlogSectionProps {
  onCtaClick: () => void;
}

export default function SeoGeoBlogSection({ onCtaClick }: SeoGeoBlogSectionProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [hoveredPostId, setHoveredPostId] = useState<string | null>(null);

  return (
    <section id="seo-blog" className="py-22 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & SEO Explainer */}
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold text-gold-600 tracking-widest uppercase bg-gold-100/50 px-3.5 py-1.5 rounded-full">
            REAL ESTATE INSIGHT LIBRARY (SEO & GEO)
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0a1128] tracking-tight">
            천안 부동산 가치 분석 및 <span className="text-gold-600">핵심 분양 칼럼</span>
          </h2>
          <p className="text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
            성성·업성호수공원 일대 시세 동향과 수도권 연계 교통 분석, 
            실패 없는 청약 자격 진단 보고서를 무료로 공유합니다.
          </p>
        </div>

        {/* Blog Posts Grid / Row List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              onMouseEnter={() => setHoveredPostId(post.id)}
              onMouseLeave={() => setHoveredPostId(null)}
              className="bg-white rounded-2xl border border-gold-200 shadow-sm hover:shadow-premium overflow-hidden flex flex-col justify-between group transition-all duration-300 cursor-pointer"
            >
              
              {/* Category Badge & Aesthetic background header cover */}
              <div className="bg-[#0a1128] p-6 text-white space-y-3 relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full border border-white/10" />
                
                <div className="flex items-center justify-between">
                  <span className="text-[10px] bg-gold-400 text-gold-950 font-bold px-2 py-0.5 rounded uppercase">
                    {post.category}
                  </span>
                  
                  <div className="flex items-center space-x-1.5 text-[10px] text-gray-300">
                    <Eye className="h-3.5 w-3.5 text-gold-400" />
                    <span>{post.readCount + (hoveredPostId === post.id ? 1 : 0)}회 조회</span>
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-extrabold line-clamp-2 leading-snug group-hover:text-gold-300 transition-colors">
                  {post.title}
                </h3>
              </div>

              {/* Summary text */}
              <div className="p-6 space-y-4 flex-1">
                <p className="text-xs sm:text-sm text-gray-500 line-clamp-3 leading-relaxed font-sans">
                  {post.summary}
                </p>

                {/* Tag items */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {post.tags.slice(0, 3).map((tg, idx) => (
                    <span 
                      key={idx} 
                      className="text-[10px] bg-gray-50 border border-gray-150 text-gray-600 px-2 py-1 rounded font-sans"
                    >
                      #{tg}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer details meta */}
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 bg-gray-50/50">
                <div className="flex items-center space-x-1">
                  <User className="h-3.5 w-3.5 text-gold-500" />
                  <span className="font-medium text-gray-500">{post.author}</span>
                </div>
                <span className="font-mono">{post.createdAt}</span>
              </div>

            </div>
          ))}
        </div>

        {/* Link to iCRM placeholder indicator */}
        <div className="mt-14 bg-gold-50/50 rounded-2xl border border-gold-200/60 p-5 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-xs sm:text-sm font-extrabold text-[#0a1128] font-sans">
              ℹ️ iCRM 통합 스마트 콘텐츠 발행 플랫폼 연동 안내
            </h4>
            <p className="text-xs text-gray-500 max-w-xl leading-relaxed">
              본 영역의 모든 부동산 칼럼은 네이버 블로그 스마트에디터 3.0 및 iCRM 허브를 통해 자동 배포·연동되며, 스마트 기기 최적화 환경을 제공합니다.
            </p>
          </div>
          <button
            onClick={onCtaClick}
            className="flex-shrink-0 bg-[#0a1128] hover:bg-gold-700 text-white font-bold text-xs px-4.5 py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            전체 칼럼 보러가기
          </button>
        </div>

        {/* Core Markdown-style BlogPost Reading View Modal */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white max-w-2xl w-full rounded-2xl overflow-hidden border border-gold-300 shadow-2xl relative animate-zoomIn flex flex-col max-h-[85vh]">
              
              {/* Header section of Reader */}
              <div className="bg-[#0a1128] p-6 text-white space-y-3 relative flex-shrink-0">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                  aria-label="Close article modal"
                >
                  <X className="h-5 w-5" />
                </button>
                
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] bg-gold-450 bg-gold-500 text-white px-2 py-0.5 rounded font-extrabold font-mono text-xs">
                    {selectedPost.category}
                  </span>
                  <span className="text-gray-450 text-xs">|</span>
                  <div className="flex items-center space-x-1.5 text-xs text-gray-300">
                    <User className="h-3.5 w-3.5 text-gold-400" />
                    <span>{selectedPost.author}</span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold tracking-tight leading-snug">
                  {selectedPost.title}
                </h3>

                <div className="flex items-center space-x-4 text-[11px] text-gray-300 pt-1 border-t border-white/10 font-mono">
                  <span>작성일자: {selectedPost.createdAt}</span>
                  <span>누적 조회수: {selectedPost.readCount + 10}회</span>
                </div>
              </div>

              {/* Scrollable Document Body */}
              <div className="p-6 overflow-y-auto space-y-5 flex-1 font-sans text-gray-705 leading-relaxed text-sm sm:text-base">
                
                {/* Introduction Callout Box */}
                <div className="bg-gold-50 p-4 rounded-xl border border-gold-150 text-xs sm:text-sm text-gold-950 font-bold leading-relaxed text-gray-800">
                  ⚠️ AI 요약 브리핑: 본 문서는 천안시 아파트 청약 및 Eopseong Prugio Lake City 주변 시세 가치를 심도 있게 탐구하기 위해 실질 수치와 규정을 토대로 수립되었습니다.
                </div>

                {/* Structured paragraphs */}
                <div className="space-y-4 text-gray-600 font-sans leading-relaxed text-sm whitespace-pre-line">
                  {selectedPost.content}
                </div>

                {/* SEO Friendly Tag Bag */}
                <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-1.5">
                  <span className="text-xs font-bold text-gray-500 flex items-center space-x-1 mr-1">
                    <Tag className="h-4 w-4 text-gold-600" />
                    <span>추천 태그:</span>
                  </span>
                  {selectedPost.tags.map((tg, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs bg-gold-50 border border-gold-150 text-gold-700 px-2.5 py-1 rounded"
                    >
                      #{tg}
                    </span>
                  ))}
                </div>

              </div>

              {/* Bottom Quick Counselor Trigger */}
              <div className="bg-gray-50 border-t border-gray-150 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0">
                <div className="text-center sm:text-left">
                  <p className="text-xs font-extrabold text-[#0a1128] font-sans">
                    💡 칼럼 관련 상세 청약설계 리포트 무상 제공
                  </p>
                  <p className="text-[11px] text-gray-400 font-sans mt-0.5">
                    현재 사전접수 중으로, 문의주시면 칼럼 관련 세부 행정 가이드를 인쇄물로 무상 우송합니다.
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setSelectedPost(null);
                      onCtaClick();
                    }}
                    className="bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs px-4.5 py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    1:1 청약 전문 상담 예약
                  </button>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="bg-white hover:bg-gray-100 text-gray-600 border border-gray-250 font-semibold text-xs px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    닫기
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
