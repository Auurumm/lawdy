'use client';

import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface SpecialtyCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function SpecialtyCard({ icon, title, description }: SpecialtyCardProps) {
  return (
    <div className="bg-gray-100 rounded-[12px] px-4 py-10 w-[237px] flex-shrink-0">
      <div className="flex flex-col gap-4 items-center">
        <div className="w-20 h-20">
          {icon}
        </div>
        <div className="flex flex-col gap-1 items-center text-center">
          <p className="text-base font-semibold text-gray-900 leading-6">{title}</p>
          <p className="text-sm font-medium text-gray-600 leading-5 px-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

interface TeamMemberProps {
  imageSrc: string;
  name: string;
}

function TeamMember({ imageSrc, name }: TeamMemberProps) {
  return (
    <div className="flex flex-col gap-2 items-center w-[232px] flex-shrink-0">
      <div className="w-full aspect-square bg-white rounded-[24px] overflow-hidden relative">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <p className="text-base font-semibold text-gray-900 text-center leading-6">{name}</p>
    </div>
  );
}

export default function AboutPage() {
  const teamMembers = [
    { imageSrc: "/images/team-1.png", name: "임성호 변호사" },
    { imageSrc: "/images/team-2.png", name: "이한나 변호사" },
    { imageSrc: "/images/team-3.png", name: "임성환 행정사" },
    { imageSrc: "/images/team-4.png", name: "이혜나 행정사" },
    { imageSrc: "/images/team-6.png", name: "수석자문위원 이승길 법학박사" },
    { imageSrc: "/images/team-5.png", name: "이유나 행정사" },
  ];

  return (
    <main className="min-h-screen bg-[#f2f3f8]">
      <Header />

      {/* Mission Section */}
      <section className="bg-white">
        <div className="h-[60px] hidden md:block" />
        <div className="h-8 md:hidden" />

        <div className="flex flex-col md:flex-row items-center justify-between w-full md:w-[742px] mx-auto px-5 md:px-0">
          {/* Text Content */}
          <div className="flex flex-col gap-[9px] w-full md:w-[359px] order-2 md:order-1">
            <h1 className="text-2xl md:text-[32px] font-bold md:font-bold text-gray-900 leading-8 md:leading-[42px] tracking-[-0.64px] text-center md:text-left">
              우리의 미션
            </h1>
            <div className="h-2 md:hidden" />
            <p className="text-sm md:text-base font-bold text-center md:text-left leading-[18px] md:leading-[22px]">
              <span className="text-primary">Lawdy</span>
              <span className="text-gray-600">는 지혜로운 눈으로 계약을 바라봅니다.</span>
            </p>
            <div className="h-6 md:hidden" />

            {/* Mobile: Image appears here */}
            <div className="md:hidden w-full h-[200px] overflow-hidden rounded-[12px] relative mb-6">
              <Image
                src="/images/about-hero.png"
                alt="Office"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-primary mix-blend-soft-light" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl px-4 py-3.5 shadow-lg">
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/about-icon-law-tech.svg"
                    alt=""
                    width={40}
                    height={40}
                  />
                  <div className="text-sm font-semibold text-gray-900 leading-5">
                    <p className="mb-0">법률과 기술이 만나</p>
                    <p>더 나은 미래를 만드는 회사</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm font-medium text-gray-500 leading-5 text-justify">
              Lawdy는 복잡하고 어려운 계약서를 누구나 이해할 수 있도록 만드는 것에서 출발합니다. 사람이 놓치기 쉬운 계약 속 위험 요소를 AI가 빠르게 분석하고, 분쟁으로 이어질 수 있는 리스크를 사전에 발견해 더 안전한 선택을 가능하게 합니다.
            </p>
            <p className="text-sm font-medium text-gray-500 leading-5 text-justify">
              우리는 단순히 계약을 검토하는 데 그치지 않습니다. 계약의 맥락과 의미를 읽어내어, 위험은 줄이고 신뢰는 높이는 계약 환경을 만들어갑니다. 지혜로운 판단이 필요한 순간, Lawdy는 항상 한발 앞서 계약의 위험을 살피는 당신의 AI 파트너가 되겠습니다.
            </p>
          </div>

          {/* Desktop: Image */}
          <div className="hidden md:block w-[359px] h-[200px] overflow-hidden relative order-2">
            <div className="absolute right-0 top-0 w-[280px] h-[200px] rounded-[12px] overflow-hidden">
              <Image
                src="/images/about-hero.png"
                alt="Office"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-primary mix-blend-soft-light" />
            </div>
            <div className="absolute bottom-0 left-[14px] bg-white rounded-2xl px-4 py-3.5 shadow-lg">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/about-icon-law-tech.svg"
                  alt=""
                  width={40}
                  height={40}
                />
                <div className="text-sm font-semibold text-gray-900 leading-5">
                  <p className="mb-0">법률과 기술이 만나</p>
                  <p>더 나은 미래를 만드는 회사</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-8 md:h-[60px]" />
      </section>

      {/* Specialty Areas Section */}
      <section className="flex flex-col items-center px-5 md:px-0">
        <div className="h-8 md:h-[60px]" />

        <h2 className="text-2xl font-semibold md:font-bold text-gray-900 leading-8 text-center w-full md:w-[742px]">
          전문 분야
        </h2>

        <div className="h-6" />

        {/* Specialty Cards */}
        <div className="flex gap-4 overflow-x-auto md:overflow-visible scrollbar-hide w-full md:w-[742px] md:justify-between pb-4 md:pb-0">
          <SpecialtyCard
            icon={
              <div className="relative w-20 h-20">
                <Image src="/images/about-specialty-ai-bg.svg" alt="" fill className="object-contain" />
                <div className="absolute left-[18px] top-[22px] w-[42px] h-[35px]">
                  <Image src="/images/about-specialty-ai-inner.svg" alt="" fill className="object-contain" />
                </div>
              </div>
            }
            title="계약서 AI 분석"
            description="Lawdy는 각종 계약서를 AI로 분석하여, 사람이 놓치기 쉬운 불리한 조항과 잠재적인 법적 리스크를 체계적으로 식별합니다. 복잡한 계약 내용을 구조화하여, 사용자가 계약의 핵심을 명확히 이해할 수 있도록 돕습니다."
          />
          <SpecialtyCard
            icon={
              <div className="relative w-20 h-20">
                <Image src="/images/about-specialty-risk.svg" alt="" fill className="object-contain" />
              </div>
            }
            title="계약 리스크 진단"
            description="계약 과정에서 발생할 수 있는 분쟁 요소와 위험도를 사전에 진단합니다. 조항별 위험 수준을 분석하고, 문제가 될 수 있는 부분을 직관적으로 안내하여 불확실한 계약으로 인한 부담과 위험을 줄이는 데 집중합니다."
          />
          <SpecialtyCard
            icon={
              <div className="relative w-20 h-20">
                <Image src="/images/about-specialty-guide-bg.svg" alt="" fill className="object-contain" />
                <div className="absolute inset-[22.5%_31.25%_21.25%_31.25%]">
                  <Image src="/images/about-specialty-guide-inner.svg" alt="" fill className="object-contain" />
                </div>
              </div>
            }
            title="계약 검토 및 개선 가이드"
            description="Lawdy는 계약 리스크를 줄이기 위한 실질적인 개선 방향을 제시합니다. 수정이 필요한 조항과 주의해야 할 포인트를 안내하여, 보다 안전하고 균형 잡힌 계약 체결을 지원합니다."
          />
        </div>

        <div className="h-[60px] md:h-[100px]" />

        {/* Company Introduction */}
        <h2 className="text-2xl font-semibold md:font-bold text-gray-900 leading-8 text-center w-full md:w-[742px]">
          회사 소개
        </h2>

        <div className="h-6" />

        <div className="text-sm font-medium text-gray-500 leading-5 text-justify md:text-center w-full md:w-[742px]">
          <p className="mb-0">
            부부변호사는 전문적인 법률 서비스와 고객 중심의 접근을 바탕으로 신뢰받는 법률 파트너를 지향합니다.
          </p>
          <p className="mb-0">
            각자의 전문 분야를 갖춘 변호사들이 <span className="font-semibold text-primary">팀워크를 이루어, 복잡한 법률 문제에 대해 보다 입체적이고 효과적인 해결책을 제시</span>합니다.
          </p>
          <p className="mb-0 hidden md:block">저희는 단순한 법률 자문을 넘어, 고객의 상황과 입장을 깊이 이해하는 것을 가장 중요하게 생각합니다.</p>
          <p className="md:hidden h-4" />
          <p>
            <span className="hidden md:inline">사안별 특성과 고객의 니즈를 면밀히 분석하여, </span>
            <span className="md:hidden">저희는 단순한 법률 자문을 넘어, 고객의 상황과 입장을 깊이 이해하는 것을 가장 중요하게 생각합니다. 사안별 특성과 고객의 니즈를 면밀히 분석하여, </span>
            <span className="font-semibold text-primary">현실적이고 맞춤화된 법률 솔루션을 제공</span>함으로써 더 나은 결과를 만들어가고자 합니다.
          </p>
        </div>

        <div className="h-[60px] md:h-[100px]" />

        {/* Executive Team */}
        <h2 className="text-2xl font-semibold md:font-bold text-gray-900 leading-8 text-center w-full md:w-[742px]">
          경영진
        </h2>

        <div className="h-6" />

        {/* Team Members - horizontal scroll on mobile, centered on desktop */}
        <div className="flex gap-[22px] overflow-x-auto scrollbar-hide w-full pb-4 md:justify-center">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>

        <div className="h-[120px] md:h-[180px]" />
      </section>

      <Footer />
    </main>
  );
}
