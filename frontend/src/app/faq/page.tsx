'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// FAQ Data by category
const faqData = {
  general: {
    title: '일반 질문',
    items: [
      {
        question: 'Lawdy는 무엇인가요?',
        answer: 'Lawdy는 AI 기술을 활용하여 계약서의 법적 위험을 자동으로 분석하고 시각화하는 플랫폼입니다.\n복잡한 계약 내용을 쉽게 이해할 수 있도록 도와줍니다.',
      },
      {
        question: '누가 사용할 수 있나요?',
        answer: '개인, 변호사, 법률 팀, 기업 등 모든 사용자가 이용할 수 있습니다.\n간단한 회원 가입 후 바로 시작할 수 있습니다.',
      },
    ],
  },
  security: {
    title: '기술 및 보안',
    items: [
      {
        question: '내 계약서는 안전하게 보호되나요?',
        answer: '예, 모든 계약서는 엔드-투-엔드 암호화로 보호되며, GDPR과 국내 개인정보 보호법을 완벽하게 준수합니다.',
      },
      {
        question: '분석 과정에서 데이터를 공유하나요?',
        answer: '절대 아닙니다. 귀사의 데이터는 100% 비밀로 유지됩니다.\n마케팅이나 기타 목적으로 데이터를 사용하거나 공유하지 않습니다.',
      },
    ],
  },
  subscription: {
    title: '구독 및 요금',
    items: [
      {
        question: '무료 플랜이 있나요?',
        answer: '무료 체험 기간은 제공하지 않지만, Starter 플랜은 매우 저렴한 가격으로 제공됩니다.\nProfessional 플랜으로 14일 무료 체험이 가능합니다.',
      },
      {
        question: '구독을 취소할 수 있나요?',
        answer: '언제든지 계정 설정에서 구독을 취소할 수 있습니다.\n취소 후 남은 기간 동안 서비스를 이용할 수 있습니다.',
      },
    ],
  },
};

// FAQ Accordion Item Component
function FAQItem({
  question,
  answer,
  isOpen,
  onToggle
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-white rounded-[12px] overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-5 flex items-center justify-between text-left"
      >
        <span className="text-base font-semibold text-gray-900 leading-6">
          {question}
        </span>
        <div className={`w-6 h-6 flex items-center justify-center transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="#F2F5FC" />
            <path
              d="M8 10L12 14L16 10"
              stroke="#101116"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
      {isOpen && (
        <div className="px-5 pb-5">
          <p className="text-sm font-medium text-[#454855] leading-5 whitespace-pre-line">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

// FAQ Section Component
function FAQSection({
  title,
  items,
  openIndex,
  onToggle,
  sectionKey
}: {
  title: string;
  items: { question: string; answer: string }[];
  openIndex: string | null;
  onToggle: (key: string) => void;
  sectionKey: string;
}) {
  return (
    <div className="w-full">
      <h3 className="text-lg font-bold text-gray-900 leading-6 mb-4">
        {title}
      </h3>
      <div className="flex flex-col gap-2">
        {items.map((item, index) => {
          const itemKey = `${sectionKey}-${index}`;
          return (
            <FAQItem
              key={itemKey}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === itemKey}
              onToggle={() => onToggle(itemKey)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const handleToggle = (key: string) => {
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <main className="min-h-screen bg-[#f2f3f8]">
      <Header />

      <div className="h-8 md:h-10" />

      {/* Title Section */}
      <div className="flex flex-col items-center px-5 md:px-0">
        <h1 className="text-2xl md:text-[32px] font-bold text-gray-900 leading-8 md:leading-[42px] text-center">
          자주 묻는 질문
        </h1>
        <div className="h-2" />
        <p className="text-base font-semibold text-[#737684] leading-[22px] text-center">
          궁금한 점을 찾아보세요
        </p>
      </div>

      <div className="h-10 md:h-12" />

      {/* FAQ Content */}
      <div className="flex justify-center px-5 md:px-0">
        <div className="w-full md:w-[742px] flex flex-col gap-10">
          <FAQSection
            title={faqData.general.title}
            items={faqData.general.items}
            openIndex={openIndex}
            onToggle={handleToggle}
            sectionKey="general"
          />
          <FAQSection
            title={faqData.security.title}
            items={faqData.security.items}
            openIndex={openIndex}
            onToggle={handleToggle}
            sectionKey="security"
          />
          <FAQSection
            title={faqData.subscription.title}
            items={faqData.subscription.items}
            openIndex={openIndex}
            onToggle={handleToggle}
            sectionKey="subscription"
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="flex flex-col items-center px-5 md:px-0">
        <div className="h-20 md:h-20" />
        <div className="w-full md:w-[1124px] h-[2px] bg-[#e1e3ea]" />
        <div className="h-[60px]" />

        <h2 className="text-2xl md:text-[32px] font-bold text-gray-900 leading-8 md:leading-[42px] text-center">
          여전히 도움이 필요하신가요?
        </h2>
        <div className="h-2" />
        <p className="text-base font-semibold text-[#737684] leading-[22px] text-center">
          찾는 질문이 없다면 고객센터로 문의해주세요
        </p>
        <div className="h-8" />
        <Link
          href="/support"
          className="w-[335px] h-14 bg-primary rounded-[12px] flex items-center justify-center hover:bg-primary/90 transition-colors"
        >
          <span className="text-lg font-bold text-white leading-6">고객센터 방문</span>
        </Link>
      </div>

      <div className="h-[100px] md:h-[100px]" />

      <Footer />
    </main>
  );
}
