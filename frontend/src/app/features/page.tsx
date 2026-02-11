'use client';

import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Feature Card Component
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-[#e1e3ea] rounded-[12px] px-6 py-10 w-[238px] md:w-[363px] flex-shrink-0">
      <div className="flex flex-col gap-4 items-center">
        <div className="w-20 h-20">
          {icon}
        </div>
        <div className="flex flex-col gap-0.5 items-center text-center w-[190px] md:w-auto">
          <p className="text-base font-semibold text-gray-900 leading-6">{title}</p>
          <p className="text-sm font-medium text-[#454855] leading-[18px]">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[#f2f3f8]">
      <Header />

      <div className="h-8 md:h-10" />

      {/* Title Section */}
      <div className="flex flex-col items-center px-5 md:px-0">
        <h1 className="text-2xl md:text-[32px] font-bold text-gray-900 leading-8 md:leading-[42px] text-center">
          기능 소개
        </h1>
        <div className="h-2" />
        <p className="text-base font-semibold text-[#737684] leading-[22px] text-center">
          Lawdy의 모든 기능을 알아보세요.
        </p>
      </div>

      <div className="h-10 md:h-12" />

      {/* Features Grid */}
      <div className="px-5 md:px-0 md:flex md:flex-col md:items-center">
        {/* Mobile: Single horizontal scroll row / Desktop: 2x2 grid */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide md:grid md:grid-cols-2 md:w-[742px] md:overflow-visible">
          <FeatureCard
            icon={
              <div className="relative w-20 h-20">
                <Image src="/images/careers-icon-ai-bg.svg" alt="" fill className="object-contain" />
                <div className="absolute left-[18px] top-[22px] w-[42px] h-[35px]">
                  <Image src="/images/careers-icon-ai-inner.svg" alt="" fill className="object-contain" />
                </div>
              </div>
            }
            title="자동 계약 분석"
            description="업로드된 계약서를 AI가 자동으로 분석하여 법적 위험요소를 식별합니다."
          />
          <FeatureCard
            icon={
              <div className="relative w-20 h-20">
                <Image src="/images/features-icon-chart.svg" alt="" fill className="object-contain" />
              </div>
            }
            title="시각적 보고서"
            description="복잡한 분석 결과를 차트, 그래프, 요약으로 한눈에 파악하세요."
          />
          <FeatureCard
            icon={
              <div className="relative w-20 h-20">
                <Image src="/images/features-icon-chat-bg.svg" alt="" fill className="object-contain" />
                <div className="absolute left-4 top-4 w-12 h-12">
                  <Image src="/images/features-icon-chat-bubble.svg" alt="" fill className="object-contain" />
                </div>
                <div className="absolute right-0 bottom-0 w-[30px] h-[30px]">
                  <Image src="/images/features-icon-chat-ai-bg.svg" alt="" fill className="object-contain" />
                  <div className="absolute left-[5.7px] top-[7px] w-[18px] h-[15px]">
                    <Image src="/images/features-icon-chat-ai-inner.svg" alt="" fill className="object-contain" />
                  </div>
                </div>
              </div>
            }
            title="AI 채팅 지원"
            description="계약에 대해 궁금한 점은 질문하면 AI가 전문적으로 답변합니다."
          />
          <FeatureCard
            icon={
              <div className="relative w-20 h-20">
                <Image src="/images/features-icon-export-bg.svg" alt="" fill className="object-contain" />
                <div className="absolute inset-[17.5%_15.83%_20%_17.5%]">
                  <Image src="/images/features-icon-export-inner.svg" alt="" fill className="object-contain" />
                </div>
              </div>
            }
            title="다양한 형식 지원"
            description="TXT, PDF, MD 등 여러 형식으로 분석 결과를 내보낼 수 있습니다."
          />
        </div>
      </div>

      <div className="h-[120px] md:h-[180px]" />

      <Footer />
    </main>
  );
}
