'use client';

export default function Hero() {
  return (
    <section className="flex flex-col items-center pt-8 md:pt-10 px-5 md:px-0">
      <div className="flex flex-col items-center w-full md:w-[742px]">
        <p className="text-sm md:text-base font-bold leading-[22px]">
          <span className="text-primary">Lawdy</span>
          <span className="text-gray-600">는 지혜로운 눈으로 계약을 바라봅니다.</span>
        </p>

        <div className="h-2 md:h-4" />

        <div className="text-center text-lg md:text-[32px] text-gray-900">
          <p className="font-normal leading-6 md:leading-[42px]">계약의 위험은 줄이고, 판단의 확신은 높입니다.</p>
          <p className="font-bold leading-6 md:leading-[42px]">
            AI로 분석하는 스마트한 계약 파트너, <span className="text-primary">Lawdy</span>
          </p>
        </div>
      </div>
    </section>
  );
}
