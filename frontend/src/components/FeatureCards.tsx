'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface FeatureCardProps {
  title: string;
  description: string[];
  iconSrc: string;
  onClick?: () => void;
}

function FeatureCard({ title, description, iconSrc, onClick }: FeatureCardProps) {
  return (
    <div 
      onClick={onClick}
      className="w-full md:flex-1 bg-white rounded-[24px] h-[260px] overflow-hidden relative cursor-pointer transition-all duration-300 hover:bg-[#0046FF33]"
    >
      <div className="flex items-center justify-between h-full p-8">
        <div className="flex flex-col gap-[63px] w-[294px]">
          <div className="flex flex-col gap-2 text-gray-900">
            <p className="text-[32px] font-semibold leading-[40px]">{title}</p>
            <div className="text-base font-medium leading-[22px]">
              {description.map((line, index) => (
                <p key={index} className="mb-0">{line}</p>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[22px] font-semibold text-gray-900 leading-8">시작하기</span>
            <div className="relative w-7 h-7">
              <div className="absolute inset-0 bg-primary rounded-full opacity-10" />
              <svg className="absolute inset-0 m-auto w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M6 12L10 8L6 4" stroke="#0046ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[30px] right-[30px] w-[100px] h-[100px]">
        <Image
          src={iconSrc}
          alt={title}
          width={100}
          height={100}
          className="object-contain"
        />
      </div>
    </div>
  );
}

export default function FeatureCards() {
  const router = useRouter();
  const { user } = useAuth();

  const handleCardClick = () => {
    if (user) {
      router.push('/mypage');
    } else {
      router.push('/login');
    }
  };

  const handleLearnMore = () => {
    router.push('/features');
  };

  return (
    <section className="flex flex-col items-center mt-8 md:mt-12 px-5 md:px-0">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full md:w-[742px]">
        <FeatureCard
          title="위험 자동 식별"
          description={[
            "계약의 법적 위험을",
            "자동으로 식별하고",
            "시각화하세요."
          ]}
          iconSrc="/images/icon-risk-figma.svg"
          onClick={handleCardClick}
        />
        <FeatureCard
          title="한눈에 확인"
          description={[
            "복잡한 계약서도",
            "한눈에 이해하는",
            "경험을 제공합니다."
          ]}
          iconSrc="/images/icon-check-figma.svg"
          onClick={handleCardClick}
        />
      </div>

      <div className="h-4" />

      {/* Learn More Link */}
      <div 
        onClick={handleLearnMore}
        className="flex items-center justify-end gap-2 w-full md:w-[742px] cursor-pointer hover:opacity-70 transition-opacity"
      >
        <span className="text-base font-semibold text-gray-600">더 알아보기</span>
        <div className="relative w-6 h-6">
          <div className="absolute inset-0 bg-gray-600 rounded-full opacity-10" />
          <svg className="absolute inset-0 m-auto w-3 h-3" viewBox="0 0 12 12" fill="none">
            <path d="M4.5 9L7.5 6L4.5 3" stroke="#454855" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
  );
}
