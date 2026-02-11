'use client';

import { useRouter } from 'next/navigation';

export default function CTA() {
  const router = useRouter();

  const handleSignup = () => {
    router.push('/signup');
  };

  return (
    <section className="flex flex-col items-center mt-[60px] md:mt-[140px] px-5 md:px-0">
      {/* Divider */}
      <div className="w-full md:w-[1124px] h-px bg-gray-200" />

      <div className="h-8 md:h-[60px]" />

      {/* CTA Content */}
      <div className="flex flex-col items-center w-full md:w-[742px]">
        <p className="text-2xl md:text-[32px] font-bold text-gray-900 leading-8 md:leading-[42px] text-center">
          지금 바로 시작하세요
        </p>
        <div className="h-2" />
        <p className="text-base font-semibold text-gray-500 leading-[22px] text-center">
          복잡한 계약 분석을 AI로 간단하게 해결하세요.
        </p>
      </div>

      <div className="h-6 md:h-8" />

      {/* CTA Button */}
      <button 
        onClick={handleSignup}
        className="bg-primary rounded-[12px] w-full md:w-[335px] h-[56px] flex items-center justify-center hover:bg-blue-700 transition-colors"
      >
        <span className="text-lg font-bold text-white leading-6">무료로 가입하기</span>
      </button>
    </section>
  );
}
