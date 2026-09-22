/**
 * XSS 방지를 위한 HTML 정제 유틸리티
 * 악의적인 script, iframe, onload, onerror 등의 이벤트 핸들러 및 위험한 태그/속성을 필터링합니다.
 */

// 허용되는 안전한 HTML 태그 목록
const ALLOWED_TAGS = new Set([
  'p', 'br', 'b', 'strong', 'i', 'em', 'u', 's', 'strike',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li',
  'blockquote', 'pre', 'code',
  'a', 'img', 'span', 'div',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'hr'
]);

// 허용되는 안전한 속성 목록
const ALLOWED_ATTRIBUTES: Record<string, Set<string>> = {
  a: new Set(['href', 'target', 'rel', 'title', 'class']),
  img: new Set(['src', 'alt', 'title', 'width', 'height', 'class', 'loading']),
  span: new Set(['class', 'style']),
  p: new Set(['class', 'style']),
  div: new Set(['class', 'style']),
  h1: new Set(['class']),
  h2: new Set(['class']),
  h3: new Set(['class']),
  h4: new Set(['class']),
  blockquote: new Set(['class']),
  code: new Set(['class']),
  pre: new Set(['class']),
  table: new Set(['class', 'border', 'cellpadding', 'cellspacing']),
  th: new Set(['class', 'scope', 'colspan', 'rowspan']),
  td: new Set(['class', 'colspan', 'rowspan']),
};

// 허용되는 인라인 스타일 속성
const ALLOWED_STYLES = new Set([
  'color', 'background-color', 'font-weight', 'font-style',
  'text-decoration', 'text-align', 'padding', 'margin'
]);

/**
 * 위험한 문자열을 이스케이프하거나 안전한 노드만 남기는 HTML sanitizer
 */
export function sanitizeHtml(html: string): string {
  if (!html) return '';

  if (typeof window === 'undefined') {
    // SSR 환경 fallback: 기본 태그 치환
    return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  function cleanNode(node: Node): Node | null {
    if (node.nodeType === Node.TEXT_NODE) {
      return node;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      const tagName = el.tagName.toLowerCase();

      // 허용되지 않은 태그는 텍스트만 남기거나 제거
      if (!ALLOWED_TAGS.has(tagName)) {
        // script, style, iframe 등 악성 스크립트 실행 태그는 완전히 무시
        if (['script', 'style', 'iframe', 'object', 'embed', 'form', 'input', 'button', 'link'].includes(tagName)) {
          return null;
        }
        // 그 외 태그는 자식 노드만 추출
        const fragment = document.createDocumentFragment();
        while (el.firstChild) {
          const cleanedChild = cleanNode(el.firstChild);
          if (cleanedChild) fragment.appendChild(cleanedChild);
          else el.removeChild(el.firstChild);
        }
        return fragment;
      }

      // 허용된 태그일 경우 허용된 속성만 보존
      const allowedAttrs = ALLOWED_ATTRIBUTES[tagName] || new Set(['class']);
      const attrNames = Array.from(el.attributes).map(a => a.name);

      for (const attrName of attrNames) {
        const lowerAttrName = attrName.toLowerCase();

        // on* 이벤트 핸들러(onclick, onerror, onload 등) 무조건 제거
        if (lowerAttrName.startsWith('on')) {
          el.removeAttribute(attrName);
          continue;
        }

        if (!allowedAttrs.has(lowerAttrName)) {
          el.removeAttribute(attrName);
          continue;
        }

        const attrValue = el.getAttribute(attrName) || '';

        // javascript: 등 위험한 URI 차단
        if (['href', 'src'].includes(lowerAttrName)) {
          const trimmed = attrValue.trim().toLowerCase();
          if (trimmed.startsWith('javascript:') || trimmed.startsWith('data:text/html')) {
            el.removeAttribute(attrName);
            continue;
          }
          // 외부 링크의 경우 rel="noopener noreferrer" 강제
          if (lowerAttrName === 'href' && (trimmed.startsWith('http://') || trimmed.startsWith('https://'))) {
            el.setAttribute('target', '_blank');
            el.setAttribute('rel', 'noopener noreferrer');
          }
        }

        // 인라인 스타일 정제
        if (lowerAttrName === 'style') {
          const cleanedStyle = filterStyles(attrValue);
          if (cleanedStyle) {
            el.setAttribute('style', cleanedStyle);
          } else {
            el.removeAttribute('style');
          }
        }
      }

      // 자식 노드 순회 정제
      const children = Array.from(el.childNodes);
      for (const child of children) {
        const cleanedChild = cleanNode(child);
        if (!cleanedChild) {
          el.removeChild(child);
        }
      }

      return el;
    }

    return null;
  }

  const cleanBody = cleanNode(doc.body);
  return cleanBody instanceof HTMLElement ? cleanBody.innerHTML : '';
}

function filterStyles(styleString: string): string {
  if (!styleString) return '';
  const rules = styleString.split(';');
  const safeRules: string[] = [];

  for (const rule of rules) {
    const [prop, val] = rule.split(':').map(s => s?.trim());
    if (!prop || !val) continue;
    const lowerProp = prop.toLowerCase();
    if (ALLOWED_STYLES.has(lowerProp) && !val.toLowerCase().includes('expression') && !val.toLowerCase().includes('url(')) {
      safeRules.push(`${lowerProp}: ${val}`);
    }
  }

  return safeRules.join('; ');
}
