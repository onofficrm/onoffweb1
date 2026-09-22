import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  schema?: Record<string, any>;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = '/assets/images/business_hero_consultation_1790004192757.jpg',
  schema,
}) => {
  useEffect(() => {
    // 1. Set Title
    const fullTitle = title.includes('비즈온탑') ? title : `${title} | 비즈온탑 (BIZ ON TOP)`;
    document.title = fullTitle;

    // 2. Helper to set or update meta tag
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Description
    setMetaTag('name', 'description', description);

    // OpenGraph
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    if (ogImage) {
      setMetaTag('property', 'og:image', ogImage);
    }

    // Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    if (ogImage) {
      setMetaTag('name', 'twitter:image', ogImage);
    }

    // Canonical link
    const currentUrl = canonical || window.location.href;
    setMetaTag('property', 'og:url', currentUrl);
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    // 3. Structured Data (JSON-LD)
    let jsonLdScript = document.querySelector('#seo-schema-jsonld');
    if (schema) {
      if (!jsonLdScript) {
        jsonLdScript = document.createElement('script');
        jsonLdScript.setAttribute('id', 'seo-schema-jsonld');
        jsonLdScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(jsonLdScript);
      }
      jsonLdScript.textContent = JSON.stringify(schema);
    } else if (jsonLdScript) {
      jsonLdScript.remove();
    }
  }, [title, description, canonical, ogType, ogImage, schema]);

  return null;
};
