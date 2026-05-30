/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ConsultationRequest {
  id: string;
  name: string;
  phone: string;
  timeSlot: string;
  agreeMarketing: boolean;
  type: 'general' | 'visit' | 'subscription' | 'investment';
  memo?: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  createdAt: string;
  author: string;
  tags: string[];
  readCount: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface PremiumFeature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  iconName: string;
  imageTag: string;
}
