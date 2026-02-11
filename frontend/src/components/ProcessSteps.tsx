'use client';

import Image from 'next/image';

interface StepCardProps {
  bgIcon: string;
  innerIcon: string;
  title: string;
  description: string[];
  iconPosition?: {
    inner: {
      left: string;
      top: string;
      width: string;
      height: string;
    }
  };
}

function StepCard({ bgIcon, innerIcon, title, description, iconPosition }: StepCardProps) {
  return (
    <div className="bg-gray-100 rounded-[12px] px-4 py-3.5 w-[237px] flex-shrink-0">
      <div className="flex items-center gap-4">
        <div className="relative w-10 h-10 overflow-hidden">
          {/* Background layer */}
          <Image
            src={bgIcon}
            alt=""
            fill
            className="object-contain"
          />
          {/* Inner icon layer */}
          <div
            className="absolute"
            style={{
              left: iconPosition?.inner.left || '17.5%',
              top: iconPosition?.inner.top || '25%',
              width: iconPosition?.inner.width || '66.67%',
              height: iconPosition?.inner.height || '55%',
            }}
          >
            <Image
              src={innerIcon}
              alt={title}
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-base font-semibold text-gray-900 leading-6">{title}</p>
          <div className="text-sm font-medium text-gray-600 leading-[18px]">
            {description.map((line, index) => (
              <p key={index} className="mb-0">{line}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProcessSteps() {
  const steps = [
    {
      bgIcon: "/images/icon-upload-bg.svg",
      innerIcon: "/images/icon-upload-arrow.svg",
      title: "문서 업로드",
      description: ["PDF, DOCX 등의", "계약서를 업로드합니다."],
      iconPosition: {
        inner: {
          left: '17.5%',
          top: '25%',
          width: '66.67%',
          height: '55%'
        }
      }
    },
    {
      bgIcon: "/images/icon-ai-bg.svg",
      innerIcon: "/images/icon-ai-inner.svg",
      title: "AI 분석",
      description: ["인공지능이 법적", "위험을 자동분석 합니다."],
      iconPosition: {
        inner: {
          left: '22.5%',
          top: '27.5%',
          width: '53%',
          height: '43.3%'
        }
      }
    },
    {
      bgIcon: "/images/icon-upload-bg.svg",
      innerIcon: "/images/icon-download-arrow.svg",
      title: "결과 다운로드",
      description: ["분석 결과를 다양한", "형식으로 받습니다."],
      iconPosition: {
        inner: {
          left: '17.5%',
          top: '25%',
          width: '66.67%',
          height: '55%'
        }
      }
    }
  ];

  return (
    <section className="mt-8 md:mt-12 px-5 md:px-0">
      {/* Mobile: horizontal scroll, Desktop: centered with justify-between */}
      <div className="flex items-center gap-4 md:gap-0 md:justify-between w-full md:w-[742px] md:mx-auto overflow-x-auto md:overflow-visible scrollbar-hide">
        {steps.map((step, index) => (
          <StepCard key={index} {...step} />
        ))}
      </div>
    </section>
  );
}
