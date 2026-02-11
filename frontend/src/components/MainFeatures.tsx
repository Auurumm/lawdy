'use client';

import Image from 'next/image';

interface TooltipProps {
  text: string;
  color: 'gray' | 'red' | 'blue';
  position?: 'above' | 'below';
}

function Tooltip({ text, color, position = 'below' }: TooltipProps) {
  const bgClass = {
    gray: 'bg-[#979baa]',
    red: 'bg-[#ff1e00]',
    blue: 'bg-primary'
  };

  const tipSrc = {
    gray: '/images/tooltip-tip-gray.svg',
    red: '/images/tooltip-tip-red.svg',
    blue: '/images/tooltip-tip-blue.svg'
  };

  // position='above': 툴팁이 위에 있고 화살표가 아래를 가리킴 (center layout용)
  // position='below': 툴팁이 아래에 있고 화살표가 위를 가리킴 (top-left layout용)

  if (position === 'above') {
    // 화살표가 아래를 가리킴: bubble 먼저, 화살표 아래
    return (
      <div className="flex flex-col items-center">
        <div className={`${bgClass[color]} px-3 py-1.5 rounded-full`}>
          <span className="text-base font-bold text-white leading-[22px] whitespace-nowrap">{text}</span>
        </div>
        <div className="h-[10px] w-[16px] relative">
          <Image
            src={tipSrc[color]}
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>
    );
  }

  // position='below': 화살표가 위를 가리킴 (Figma처럼 scaleY(-1) 적용)
  return (
    <div className="flex flex-col items-center">
      <div className="h-[10px] w-[16px] relative" style={{ transform: 'scaleY(-1)' }}>
        <Image
          src={tipSrc[color]}
          alt=""
          fill
          className="object-contain"
        />
      </div>
      <div className={`${bgClass[color]} px-3 py-1.5 rounded-full`}>
        <span className="text-base font-bold text-white leading-[22px] whitespace-nowrap">{text}</span>
      </div>
    </div>
  );
}

interface FeatureBoxProps {
  title: string | string[];
  description: string[];
  tooltip?: {
    text: string;
    color: 'gray' | 'red' | 'blue';
  };
  layout?: 'top-left' | 'center';
}

function FeatureBox({ title, description, tooltip, layout = 'top-left' }: FeatureBoxProps) {
  const renderTitle = () => {
    if (Array.isArray(title)) {
      return title.map((line, index) => (
        <p key={index} className="mb-0">{line}</p>
      ));
    }
    return <p>{title}</p>;
  };

  if (layout === 'center') {
    return (
      <div className="border-2 border-gray-200 rounded-[24px] w-[232px] h-[232px] overflow-hidden relative flex items-center justify-center flex-shrink-0">
        <div className="flex flex-col items-center gap-1 text-center">
          {tooltip && (
            <div className="mb-1">
              <Tooltip text={tooltip.text} color={tooltip.color} position="above" />
            </div>
          )}
          <div className="text-[32px] font-bold text-gray-900 leading-[42px] tracking-[-0.64px]">
            {renderTitle()}
          </div>
          <div className="text-base font-semibold text-gray-500 leading-[22px] tracking-[-0.32px]">
            {description.map((line, index) => (
              <p key={index} className="mb-0">{line}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 border-gray-200 rounded-[24px] w-[232px] h-[232px] overflow-hidden relative flex-shrink-0">
      <div className="absolute top-7 left-7 text-[32px] font-bold text-gray-900 leading-[42px] tracking-[-0.64px]">
        {renderTitle()}
      </div>

      {tooltip && (
        <div className="absolute top-[62px] left-[96px]">
          <Tooltip text={tooltip.text} color={tooltip.color} position="below" />
        </div>
      )}

      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 text-center text-base font-semibold text-gray-500 leading-[22px] tracking-[-0.32px]">
        {description.map((line, index) => (
          <p key={index} className="mb-0">{line}</p>
        ))}
      </div>
    </div>
  );
}

export default function MainFeatures() {
  return (
    <section className="flex flex-col items-center mt-[60px] md:mt-[100px] px-5 md:px-0">
      {/* Section Header */}
      <div className="flex flex-col items-center w-full md:w-[742px]">
        <p className="text-sm md:text-base font-bold text-primary leading-[18px] md:leading-[22px]">주요 기능</p>
        <div className="h-2 md:h-4" />
        <div className="text-2xl md:text-[32px] font-semibold md:font-bold text-gray-900 leading-8 md:leading-[42px] text-center">
          <p className="mb-0">
            <span className="text-gray-900">LAWDY</span>의 강력한
          </p>
          <p className="mb-0">기능으로 계약관리의</p>
          <p>효율성을 극대화하세요.</p>
        </div>
      </div>

      <div className="h-10 md:h-12" />

      {/* Features Grid - Mobile: horizontal scroll, Desktop: 2 rows */}
      <div className="w-full md:w-[740px]">
        {/* Mobile: Single row horizontal scroll */}
        <div className="md:hidden flex gap-6 overflow-x-auto scrollbar-hide pb-4">
          <FeatureBox
            title={["자동 위험", "분석"]}
            description={["계약의 법적 위험요소를 AI가", "자동으로 식별하고 분류합니다"]}
            tooltip={{ text: "AI 자동식별", color: "gray" }}
          />
          <FeatureBox
            title={["시각적", "리포트"]}
            description={["복잡한 계약 내용을 차트와", "그래프로 한눈에 파악합니다"]}
            tooltip={{ text: "한눈에 파악", color: "red" }}
            layout="center"
          />
          <div className="border-2 border-gray-200 rounded-[24px] w-[232px] h-[232px] overflow-hidden relative flex-shrink-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 w-[177px]">
              <p className="text-[32px] font-bold text-gray-900 leading-[42px] tracking-[-0.64px] w-full">
                주요 조항 추출
              </p>
              <div className="relative">
                <p className="text-base font-semibold text-gray-500 leading-[22px] tracking-[-0.32px] text-center">
                  중요한 계약 조항을
                </p>
                <div className="absolute top-[17px] left-[25px]">
                  <Tooltip text="자동으로" color="blue" position="below" />
                </div>
                <p className="text-base font-semibold text-gray-500 leading-[22px] tracking-[-0.32px] text-center mt-[65px]">
                  찾아내고 강조합니다.
                </p>
              </div>
            </div>
          </div>
          <FeatureBox
            title="채팅형 Q&A"
            description={["계약에 대해 질문하고 AI의", "전문적인 답변을 받으세요."]}
            tooltip={{ text: "전문적인 답변", color: "red" }}
          />
          <div className="border-2 border-gray-200 rounded-[24px] w-[232px] h-[232px] overflow-hidden relative flex-shrink-0">
            <p className="absolute top-7 left-7 text-[32px] font-bold text-gray-900 leading-[42px] tracking-[-0.64px]">
              다양한
            </p>
            <div className="absolute top-[75px] left-[27px] text-base font-semibold text-gray-500 leading-[22px] tracking-[-0.32px]">
              <p className="mb-0">TXT, PDF, MD 등 원하는 형식</p>
              <p>으로 결과를 다운로드합니다.</p>
            </div>
            <p className="absolute top-[138px] right-7 text-[32px] font-bold text-gray-900 leading-[42px] tracking-[-0.64px] text-right">
              형식 지원
            </p>
            <div className="absolute top-[165px] left-[34px]">
              <Tooltip text="다운로드" color="blue" position="below" />
            </div>
          </div>
          <FeatureBox
            title="분석 추이 관리"
            description={["계약 분석 결과를 추척하고", "비교 분석합니다."]}
            tooltip={{ text: "추적 및 비교 분석", color: "gray" }}
            layout="center"
          />
        </div>

        {/* Desktop: 2 rows */}
        <div className="hidden md:flex flex-col gap-6">
          {/* Row 1 */}
          <div className="flex items-center justify-between w-[740px]">
            <FeatureBox
              title={["자동 위험", "분석"]}
              description={["계약의 법적 위험요소를 AI가", "자동으로 식별하고 분류합니다"]}
              tooltip={{ text: "AI 자동식별", color: "gray" }}
            />
            <FeatureBox
              title={["시각적", "리포트"]}
              description={["복잡한 계약 내용을 차트와", "그래프로 한눈에 파악합니다"]}
              tooltip={{ text: "한눈에 파악", color: "red" }}
              layout="center"
            />
            <div className="border-2 border-gray-200 rounded-[24px] w-[232px] h-[232px] overflow-hidden relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 w-[177px]">
                <p className="text-[32px] font-bold text-gray-900 leading-[42px] tracking-[-0.64px] w-full">
                  주요 조항 추출
                </p>
                <div className="relative">
                  <p className="text-base font-semibold text-gray-500 leading-[22px] tracking-[-0.32px] text-center">
                    중요한 계약 조항을
                  </p>
                  <div className="absolute top-[17px] left-[25px]">
                    <Tooltip text="자동으로" color="blue" position="below" />
                  </div>
                  <p className="text-base font-semibold text-gray-500 leading-[22px] tracking-[-0.32px] text-center mt-[65px]">
                    찾아내고 강조합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex items-center justify-between w-[740px]">
            <FeatureBox
              title="채팅형 Q&A"
              description={["계약에 대해 질문하고 AI의", "전문적인 답변을 받으세요."]}
              tooltip={{ text: "전문적인 답변", color: "red" }}
            />
            <div className="border-2 border-gray-200 rounded-[24px] w-[232px] h-[232px] overflow-hidden relative">
              <p className="absolute top-7 left-7 text-[32px] font-bold text-gray-900 leading-[42px] tracking-[-0.64px]">
                다양한
              </p>
              <div className="absolute top-[75px] left-[27px] text-base font-semibold text-gray-500 leading-[22px] tracking-[-0.32px]">
                <p className="mb-0">TXT, PDF, MD 등 원하는 형식</p>
                <p>으로 결과를 다운로드합니다.</p>
              </div>
              <p className="absolute top-[138px] right-7 text-[32px] font-bold text-gray-900 leading-[42px] tracking-[-0.64px] text-right">
                형식 지원
              </p>
              <div className="absolute top-[165px] left-[34px]">
                <Tooltip text="다운로드" color="blue" position="below" />
              </div>
            </div>
            <FeatureBox
              title="분석 추이 관리"
              description={["계약 분석 결과를 추척하고", "비교 분석합니다."]}
              tooltip={{ text: "추적 및 비교 분석", color: "gray" }}
              layout="center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
