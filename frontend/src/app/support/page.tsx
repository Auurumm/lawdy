'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type TabType = 'faq' | 'contact' | 'support';

// FAQ Data
const faqData = [
  {
    question: '계약 분석에 시간이 얼마나 걸리나요?',
    answer: '대부분의 계약은 AI 분석은 통해 <highlight>1-5분 내에 완료</highlight>됩니다. 문서의 복잡도와 크기에 따라 달라질 수 있습니다.',
  },
  {
    question: '어떤 형식의 계약서를 분석할 수 있나요?',
    answer: 'PDF, DOC, DOCX, TXT 등 <highlight>다양한 형식</highlight>을 지원합니다. 이미지 형식도 OCR 기술로 분석 가능합니다.',
  },
  {
    question: '분석 결과는 얼마나 정확한가요?',
    answer: '우리의 AI 모델은 <highlight>95% 이상의 정확도</highlight>로 일반적인 법적 위험요소를 식별합니다. 복잡한 사전의 경우 변호사 검토를 권장합니다.',
  },
  {
    question: '계약 정보는 어떻게 보호되나요?',
    answer: '모든 계약서는 <highlight>암호화</highlight>되며, 엔드-투-엔드 <highlight>보안</highlight>으로 보호됩니다. 우리는 GDPR과 국내 개인정보 보호법을 준수합니다.',
  },
  {
    question: '구독을 취소할 수 있나요?',
    answer: '<highlight>YES.</highlight> 언제든지 계정 설정에서 구독을 취소할 수 있습니다. 남은 기간에 대한 환불은 별도로 검토됩니다.',
  },
  {
    question: '팀원들과 문서를 공유할 수 있나요?',
    answer: '<highlight>YES.</highlight> 팀 플랜에서는 여러 팀원이 같은 문서에 접근하고 협업할 수 있습니다.',
  },
];

// Parse answer with highlights
function parseAnswer(answer: string) {
  const parts = answer.split(/<highlight>|<\/highlight>/);
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return <span key={index} className="text-primary">{part}</span>;
    }
    return <span key={index}>{part}</span>;
  });
}

// FAQ Item Component - Responsive
function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="flex flex-col md:flex-row md:items-start md:justify-between w-full gap-2 md:gap-4">
      {/* Question */}
      <div className="flex gap-3 items-start md:w-[263px] md:flex-shrink-0">
        <div className="w-6 h-6 rounded-full bg-[#E8EEFF] flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-primary font-semibold text-base leading-[22px]">Q</span>
        </div>
        <p className="text-base font-semibold text-gray-900 leading-6 flex-1">{question}</p>
      </div>
      {/* Answer */}
      <p className="text-sm font-medium text-[#454855] leading-5 md:flex-1 md:max-w-[455px] pl-9 md:pl-0">
        {parseAnswer(answer)}
      </p>
    </div>
  );
}

function ContactForm() {
  const [inquiryType, setInquiryType] = useState('일반 문의');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          name,
          email,
          inquiryType,
          message,
        }),
      });

      if (res.ok) {
        setSubmitStatus('success');
        setName('');
        setEmail('');
        setMessage('');
        setInquiryType('일반 문의');
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-4 items-start w-full">
      <div className="flex flex-col w-full md:w-[358px]">
        <div className="flex flex-col items-start w-full">
          <label className="text-sm font-medium text-[#454855] leading-[18px]">이름</label>
          <div className="h-2" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력해 주세요"
            className="w-full bg-white border border-[#e1e3ea] rounded-[12px] p-4 text-base font-medium text-gray-900 placeholder:text-[#737684] leading-6 outline-none focus:border-primary"
          />
        </div>

        <div className="h-4" />

        <div className="flex flex-col items-start w-full">
          <label className="text-sm font-medium text-[#454855] leading-[18px]">이메일</label>
          <div className="h-2" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력해 주세요"
            className="w-full bg-white border border-[#e1e3ea] rounded-[12px] p-4 text-base font-medium text-gray-900 placeholder:text-[#737684] leading-6 outline-none focus:border-primary"
          />
        </div>

        <div className="h-4" />

        <div className="flex flex-col items-start w-full">
          <label className="text-sm font-medium text-[#454855] leading-[18px]">문의 유형</label>
          <div className="h-2" />
          <div className="relative w-full">
            <select
              value={inquiryType}
              onChange={(e) => setInquiryType(e.target.value)}
              className="w-full bg-white border border-[#e1e3ea] rounded-[12px] px-4 py-[17px] text-base font-medium text-gray-900 leading-[22px] outline-none focus:border-primary appearance-none cursor-pointer"
            >
              <option value="일반 문의">일반 문의</option>
              <option value="기술 문제">기술 문제</option>
              <option value="결제 관련">결제 관련</option>
              <option value="기타">기타</option>
            </select>
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="7" viewBox="0 0 12 7" fill="none">
              <path d="M1 1L6 6L11 1" stroke="#101116" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className="h-4" />

        <div className="flex flex-col items-start w-full">
          <label className="text-sm font-medium text-[#454855] leading-[18px]">메시지</label>
          <div className="h-2" />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="내용을 입력해주세요."
            className="w-full h-[142px] bg-white border border-[#e1e3ea] rounded-[12px] p-4 text-base font-medium text-gray-900 placeholder:text-[#737684] leading-6 outline-none focus:border-primary resize-none"
          />
        </div>

        <div className="h-8" />

        <button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full h-[56px] rounded-[12px] flex items-center justify-center transition-colors ${
            isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gray-900 hover:bg-gray-800'
          }`}
        >
          <span className="text-lg font-bold text-white leading-6">
            {isSubmitting ? '전송 중...' : '문의전송'}
          </span>
        </button>

        {submitStatus === 'success' && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-[12px]">
            <p className="text-sm font-medium text-green-800">문의가 성공적으로 접수되었습니다. 확인 후 빠른 시일 내에 회신드리겠습니다.</p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-[12px]">
            <p className="text-sm font-medium text-red-800">전송에 실패했습니다. 잠시 후 다시 시도해주세요.</p>
          </div>
        )}
      </div>

      {/* Sidebar - Below form on mobile */}
      <div className="flex flex-col gap-2 md:py-[26px] w-full md:flex-1 mt-4 md:mt-0">
        <div className="bg-[#e1e3ea] rounded-[12px] px-4 py-[14px] flex gap-4 items-center">
          <Image src="/images/support-icon-general.svg" alt="" width={40} height={40} />
          <div className="flex flex-col gap-0.5">
            <p className="text-base font-semibold text-gray-900 leading-6">일반 문의</p>
            <p className="text-sm font-medium text-[#454855] leading-[18px]">서비스에 대한 일반적인 질문이 있으신가요?</p>
          </div>
        </div>
        <div className="bg-[#e1e3ea] rounded-[12px] px-4 py-[14px] flex gap-4 items-center">
          <Image src="/images/support-icon-tech.svg" alt="" width={40} height={40} />
          <div className="flex flex-col gap-0.5">
            <p className="text-base font-semibold text-gray-900 leading-6">기술 지원</p>
            <p className="text-sm font-medium text-[#454855] leading-[18px]">기술적인 문제나 버그를 보고하고 싶으신가요?</p>
          </div>
        </div>
        <div className="bg-[#e1e3ea] rounded-[12px] px-4 py-[14px] flex gap-4 items-center">
          <Image src="/images/support-icon-other.svg" alt="" width={40} height={40} />
          <div className="flex flex-col gap-0.5">
            <p className="text-base font-semibold text-gray-900 leading-6">기타 요청</p>
            <p className="text-sm font-medium text-[#454855] leading-[18px]">기타 요청사항이나 제안이 있으신가요?</p>
          </div>
        </div>
        <div className="bg-[#c5c8d3] rounded-[12px] px-4 py-[14px] flex gap-2 items-center">
          <p className="text-base font-semibold text-gray-900 leading-6">응답 시간</p>
          <p className="text-sm font-medium text-[#454855] leading-[18px]">일반적으로 24시간 이내에 회신합니다.</p>
        </div>
      </div>
    </div>
  );
}

function SupportRequestForm() {
  const [email, setEmail] = useState('');
  const [priorityLevel, setPriorityLevel] = useState('낮음');
  const [problemDescription, setProblemDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async () => {
    if (!email.trim()) {
      alert('이메일을 입력해주세요.');
      return;
    }
    if (!problemDescription.trim()) {
      alert('문제 설명을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'support',
          email,
          priorityLevel,
          problemDescription,
        }),
      });

      if (res.ok) {
        setSubmitStatus('success');
        setEmail('');
        setProblemDescription('');
        setPriorityLevel('낮음');
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Info Banner */}
      <div className="bg-[#e1e3ea] rounded-[12px] px-4 py-[14px] w-full">
        <p className="text-sm font-medium text-[#454855] leading-[18px]">
          긴급한 기술 지원이 필요하신가요?<br className="md:hidden" />
          아래 양식으로 지원을 요청하시면 우리 팀이 우선적으로 처리합니다.
        </p>
      </div>

      {/* Email */}
      <div className="flex flex-col items-start w-full">
        <div className="h-4" />
        <label className="text-sm font-medium text-[#454855] leading-[18px]">이메일</label>
        <div className="h-2" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="회신 받으실 이메일을 입력해 주세요"
          className="w-full bg-white border border-[#e1e3ea] rounded-[12px] p-4 text-base font-medium text-gray-900 placeholder:text-[#737684] leading-6 outline-none focus:border-primary"
        />
      </div>

      {/* Priority Level */}
      <div className="flex flex-col items-start w-full">
        <div className="h-4" />
        <label className="text-sm font-medium text-[#454855] leading-[18px]">지원 수준</label>
        <div className="h-2" />
        <div className="relative w-full md:w-full">
          <select
            value={priorityLevel}
            onChange={(e) => setPriorityLevel(e.target.value)}
            className="w-full bg-white border border-[#e1e3ea] rounded-[12px] px-4 py-[17px] text-base font-medium text-gray-900 leading-[22px] outline-none focus:border-primary appearance-none cursor-pointer"
          >
            <option value="낮음">낮음</option>
            <option value="중간">중간</option>
            <option value="높음">높음</option>
            <option value="긴급">긴급</option>
          </select>
          <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="7" viewBox="0 0 12 7" fill="none">
            <path d="M1 1L6 6L11 1" stroke="#101116" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div className="h-4" />

      {/* Problem Description */}
      <div className="flex flex-col items-start w-full">
        <label className="text-sm font-medium text-[#454855] leading-[18px]">문제 설명</label>
        <div className="h-2" />
        <textarea
          value={problemDescription}
          onChange={(e) => setProblemDescription(e.target.value)}
          placeholder="발생한 문제를 자세히 설명해 주세요."
          className="w-full h-[142px] bg-white border border-[#e1e3ea] rounded-[12px] p-4 text-base font-medium text-gray-900 placeholder:text-[#737684] leading-6 outline-none focus:border-primary resize-none"
        />
      </div>

      <div className="h-8" />

      {/* Submit Button */}
      <button 
        onClick={handleSubmit}
        disabled={isSubmitting}
        className={`w-full md:w-[358px] h-[56px] rounded-[12px] flex items-center justify-center transition-colors ${
          isSubmitting 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-gray-900 hover:bg-gray-800'
        }`}
      >
        <span className="text-lg font-bold text-white leading-6">
          {isSubmitting ? '전송 중...' : '지원 요청 제출'}
        </span>
      </button>

      {submitStatus === 'success' && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-[12px] w-full md:w-[358px]">
          <p className="text-sm font-medium text-green-800">지원 요청이 성공적으로 접수되었습니다. 우선순위에 따라 순차적으로 처리됩니다.</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-[12px] w-full md:w-[358px]">
          <p className="text-sm font-medium text-red-800">전송에 실패했습니다. 잠시 후 다시 시도해주세요.</p>
        </div>
      )}
    </div>
  );
}

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState<TabType>('faq');

  const tabs = [
    { id: 'faq' as TabType, label: '자주 묻는 질문' },
    { id: 'contact' as TabType, label: '문의하기' },
    { id: 'support' as TabType, label: '지원 요청' },
  ];

  return (
    <main className="min-h-screen bg-[#f2f3f8]">
      <Header />

      <div className="h-8 md:h-10" />

      {/* Title Section */}
      <div className="flex flex-col items-center px-5 md:px-0">
        <h1 className="text-2xl md:text-[32px] font-semibold text-gray-900 leading-8 md:leading-[42px]">고객 센터</h1>
        <div className="flex flex-col items-center">
          {/* Tooltip Arrow pointing up */}
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none" className="rotate-180">
            <path d="M8 10L0 0H16L8 10Z" fill="#0046FF"/>
          </svg>
          <div className="bg-primary rounded-full px-3 py-1.5">
            <p className="text-sm md:text-base font-bold text-white leading-[18px] md:leading-[22px]">질문이 있으신가요? 우리가 도와드립니다.</p>
          </div>
        </div>
      </div>

      <div className="h-6 md:h-12" />

      {/* Tabs */}
      <div className="flex justify-center px-5 md:px-0">
        <div className="bg-[#e4e9ef] rounded-full p-1.5 flex items-center w-full md:w-[372px]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-[13px] px-2 rounded-full text-sm leading-[18px] transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900 font-bold'
                  : 'text-[#545d64] font-semibold'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-6 md:h-10" />

      {/* Tab Content */}
      <div className="flex justify-center px-5 md:px-0">
        <div className="w-full md:w-[742px]">
          {activeTab === 'faq' && (
            <div className="flex flex-col gap-6 md:gap-10">
              {faqData.map((item, index) => (
                <FAQItem key={index} question={item.question} answer={item.answer} />
              ))}
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="flex flex-col items-start">
              <h2 className="text-lg font-bold text-gray-900 leading-6">문의 양식</h2>
              <div className="h-4" />
              <ContactForm />
            </div>
          )}

          {activeTab === 'support' && (
            <div className="flex flex-col items-start">
              <h2 className="text-lg font-bold text-gray-900 leading-6">지원 요청</h2>
              <div className="h-4" />
              <SupportRequestForm />
            </div>
          )}
        </div>
      </div>

      <div className="h-[120px] md:h-[180px]" />

      <Footer />
    </main>
  );
}
