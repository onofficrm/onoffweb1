import React, { useRef, useState, useEffect } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Eye,
  Edit3,
  Undo,
  Redo,
  Sparkles,
} from 'lucide-react';
import { sanitizeHtml } from '../../utils/sanitize';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = '내용을 작성해 주세요...',
  minHeight = '320px',
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [isFocused, setIsFocused] = useState(false);

  // 초기값 및 외부 값 동기화
  useEffect(() => {
    if (editorRef.current && activeTab === 'edit') {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || '';
      }
    }
  }, [value, activeTab]);

  const executeCommand = (command: string, arg: string | undefined = undefined) => {
    if (activeTab === 'preview') return;
    document.execCommand(command, false, arg);
    handleInput();
  };

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      onChange(html);
    }
  };

  const handleInsertLink = () => {
    const url = prompt('연결할 웹사이트 URL 주소를 입력하세요:', 'https://');
    if (url && url.trim() !== '') {
      executeCommand('createLink', url.trim());
    }
  };

  const handleInsertImage = () => {
    const url = prompt('삽입할 이미지의 웹 URL을 입력하세요 (예: https://...):');
    if (url && url.trim() !== '') {
      executeCommand('insertImage', url.trim());
    }
  };

  const insertTemplateBlock = (type: 'notice' | 'summary' | 'quote') => {
    let snippet = '';
    if (type === 'notice') {
      snippet = `
        <div style="background-color: #F8FAFC; border-left: 4px solid #2563EB; padding: 16px; margin: 16px 0; border-radius: 4px;">
          <h4 style="color: #102B50; margin: 0 0 8px 0; font-weight: bold;">📢 [핵심 공지 및 안내]</h4>
          <p style="color: #475569; margin: 0; font-size: 14px;">여기에 핵심 안내 사항을 입력해 주세요.</p>
        </div>
      `;
    } else if (type === 'summary') {
      snippet = `
        <div style="background-color: #FEF9C3; border: 1px solid #FDE047; padding: 16px; margin: 16px 0; border-radius: 8px;">
          <h4 style="color: #854D0E; margin: 0 0 6px 0; font-weight: bold;">💡 전문가 자문 요약</h4>
          <p style="color: #713F12; margin: 0; font-size: 14px;">본 지원 제도는 기업 신용평가 및 예산 현황에 따라 조기 마감될 수 있습니다.</p>
        </div>
      `;
    } else {
      snippet = `
        <blockquote style="border-left: 3px solid #D5A64B; padding-left: 14px; margin: 16px 0; color: #1E293B; font-style: italic;">
          "기업의 성장을 위한 최적의 솔루션을 제공합니다."
        </blockquote>
      `;
    }
    executeCommand('insertHTML', snippet);
  };

  return (
    <div
      className={`border rounded-xl bg-white overflow-hidden transition-all duration-200 ${
        isFocused
          ? 'border-[#2563EB] ring-2 ring-blue-500/10 shadow-sm'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* Top Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap items-center justify-between gap-1 select-none">
        <div className="flex flex-wrap items-center gap-1">
          {/* Format buttons */}
          <button
            type="button"
            title="굵게 (Ctrl+B)"
            onClick={() => executeCommand('bold')}
            className="p-1.5 rounded hover:bg-white text-slate-700 hover:text-blue-600 hover:shadow-xs transition-all"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="기울임 (Ctrl+I)"
            onClick={() => executeCommand('italic')}
            className="p-1.5 rounded hover:bg-white text-slate-700 hover:text-blue-600 hover:shadow-xs transition-all"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="밑줄 (Ctrl+U)"
            onClick={() => executeCommand('underline')}
            className="p-1.5 rounded hover:bg-white text-slate-700 hover:text-blue-600 hover:shadow-xs transition-all"
          >
            <Underline className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="취소선"
            onClick={() => executeCommand('strikeThrough')}
            className="p-1.5 rounded hover:bg-white text-slate-700 hover:text-blue-600 hover:shadow-xs transition-all"
          >
            <Strikethrough className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-5 bg-slate-300 mx-1" />

          {/* Headings */}
          <button
            type="button"
            title="중제목 (H2)"
            onClick={() => executeCommand('formatBlock', '<h2>')}
            className="p-1.5 rounded hover:bg-white text-slate-700 hover:text-blue-600 hover:shadow-xs transition-all"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="소제목 (H3)"
            onClick={() => executeCommand('formatBlock', '<h3>')}
            className="p-1.5 rounded hover:bg-white text-slate-700 hover:text-blue-600 hover:shadow-xs transition-all"
          >
            <Heading3 className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-5 bg-slate-300 mx-1" />

          {/* Lists */}
          <button
            type="button"
            title="글머리 기호 목록"
            onClick={() => executeCommand('insertUnorderedList')}
            className="p-1.5 rounded hover:bg-white text-slate-700 hover:text-blue-600 hover:shadow-xs transition-all"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="번호 매기기 목록"
            onClick={() => executeCommand('insertOrderedList')}
            className="p-1.5 rounded hover:bg-white text-slate-700 hover:text-blue-600 hover:shadow-xs transition-all"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="인용구"
            onClick={() => executeCommand('formatBlock', '<blockquote>')}
            className="p-1.5 rounded hover:bg-white text-slate-700 hover:text-blue-600 hover:shadow-xs transition-all"
          >
            <Quote className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-5 bg-slate-300 mx-1" />

          {/* Alignments */}
          <button
            type="button"
            title="왼쪽 정렬"
            onClick={() => executeCommand('justifyLeft')}
            className="p-1.5 rounded hover:bg-white text-slate-700 hover:text-blue-600 hover:shadow-xs transition-all"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="가운데 정렬"
            onClick={() => executeCommand('justifyCenter')}
            className="p-1.5 rounded hover:bg-white text-slate-700 hover:text-blue-600 hover:shadow-xs transition-all"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="오른쪽 정렬"
            onClick={() => executeCommand('justifyRight')}
            className="p-1.5 rounded hover:bg-white text-slate-700 hover:text-blue-600 hover:shadow-xs transition-all"
          >
            <AlignRight className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-5 bg-slate-300 mx-1" />

          {/* Media & Links */}
          <button
            type="button"
            title="링크 삽입"
            onClick={handleInsertLink}
            className="p-1.5 rounded hover:bg-white text-slate-700 hover:text-blue-600 hover:shadow-xs transition-all"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="외부 이미지 URL 삽입"
            onClick={handleInsertImage}
            className="p-1.5 rounded hover:bg-white text-slate-700 hover:text-blue-600 hover:shadow-xs transition-all"
          >
            <ImageIcon className="w-4 h-4" />
          </button>

          {/* Quick template snippets */}
          <div className="hidden sm:flex items-center gap-1 ml-1">
            <button
              type="button"
              onClick={() => insertTemplateBlock('notice')}
              className="text-[11px] px-2 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              안내박스
            </button>
            <button
              type="button"
              onClick={() => insertTemplateBlock('summary')}
              className="text-[11px] px-2 py-1 rounded bg-amber-50 text-amber-700 hover:bg-amber-100 font-medium transition-colors"
            >
              요약박스
            </button>
          </div>
        </div>

        {/* Edit / Preview Tabs */}
        <div className="flex items-center gap-1 border border-slate-200 bg-slate-100 rounded-lg p-0.5">
          <button
            type="button"
            onClick={() => setActiveTab('edit')}
            className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
              activeTab === 'edit'
                ? 'bg-white text-[#102B50] shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Edit3 className="w-3 h-3" />
            편집
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
              activeTab === 'preview'
                ? 'bg-white text-[#102B50] shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Eye className="w-3 h-3" />
            미리보기
          </button>
        </div>
      </div>

      {/* Editor Body or Preview Body */}
      {activeTab === 'edit' ? (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{ minHeight }}
          data-placeholder={placeholder}
          className="p-5 outline-hidden text-[#172033] leading-relaxed prose max-w-none focus:outline-hidden empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400 empty:before:pointer-events-none"
        />
      ) : (
        <div
          style={{ minHeight }}
          className="p-5 bg-slate-50/50 text-[#172033] leading-relaxed prose max-w-none border-t border-slate-100"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(value) || '<p class="text-slate-400 italic">내용이 비어 있습니다.</p>' }}
        />
      )}

      {/* Editor Footer Tips */}
      <div className="px-4 py-2 bg-slate-50/80 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
        <span>* 안전한 HTML 렌더링 및 XSS 방지 정제 필터가 자동 적용됩니다.</span>
        <span>{value ? `${value.replace(/<[^>]*>?/gm, '').length}자 작성 중` : '0자'}</span>
      </div>
    </div>
  );
};
