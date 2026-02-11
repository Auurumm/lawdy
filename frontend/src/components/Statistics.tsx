'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface StatCardProps {
  label: string;
  value: string;
  icon: string;
  isHighlighted?: boolean;
}

interface PublicStats {
  totalAnalyses: number;
  monthlyAnalyses: number;
  avgRiskLevel: 'low' | 'medium' | 'high' | null;
  avgAnalysisTime: number;
}

const riskLevelLabels: Record<string, string> = {
  low: '낮음',
  medium: '중간',
  high: '높음',
};

function StatCard({ label, value, icon, isHighlighted = true }: StatCardProps) {
  return (
    <div className="bg-gray-100 rounded-[8.77px] px-[17.5px] py-[10.2px] w-[163px] flex-shrink-0">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-[1.5px]">
          <p className="text-[10.2px] font-semibold text-gray-900 leading-4">{label}</p>
          <p className={`text-[20.5px] font-bold leading-[26.3px] ${isHighlighted ? 'text-primary' : 'text-gray-900'}`}>
            {value}
          </p>
        </div>
        <div className="relative w-[29.2px] h-[29.2px]">
          <Image
            src={icon}
            alt={label}
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default function Statistics() {
  const [stats, setStats] = useState<PublicStats | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/statistics/public');
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch public statistics:', error);
      }
    }
    fetchStats();
  }, []);

  const displayStats = [
    { 
      label: "총 분석 건수", 
      value: stats ? String(stats.totalAnalyses) : "-", 
      icon: "/images/stat-1.svg" 
    },
    { 
      label: "이번 달 분석", 
      value: stats ? String(stats.monthlyAnalyses) : "-", 
      icon: "/images/stat-2.svg" 
    },
    { 
      label: "평균 위험도", 
      value: stats?.avgRiskLevel ? riskLevelLabels[stats.avgRiskLevel] : "-", 
      icon: "/images/stat-3.svg", 
      isHighlighted: false 
    },
    { 
      label: "평균 분석 시간", 
      value: stats && stats.avgAnalysisTime > 0 ? `${stats.avgAnalysisTime}초` : "-", 
      icon: "/images/stat-4.svg" 
    },
  ];

  return (
    <section className="flex flex-col items-center mt-[60px] md:mt-[100px] px-5 md:px-0">
      <div className="bg-white rounded-[16px] md:rounded-[24px] p-1 md:p-2 w-full md:w-[742px] h-[200px] md:h-[336px] overflow-hidden">
        <div className="bg-[#f3f4f7] rounded-[14px] md:rounded-[24px] h-full overflow-hidden px-4 md:px-[26.3px] py-4 md:py-6">
          <div className="flex flex-col">
            <div className="flex items-center">
              <p className="text-base font-bold text-gray-900 leading-[22px]">분석 통계</p>
            </div>

            <p className="text-[11.7px] font-semibold text-gray-500 leading-4 mt-1">
              분석 활동 및 추이를 확인하세요.
            </p>

            <div className="h-[16px] md:h-[23.4px]" />

            <div className="flex items-center gap-2 md:gap-0 md:justify-between overflow-x-auto md:overflow-visible scrollbar-hide pb-2 md:pb-0">
              {displayStats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>

            <div className="md:hidden flex justify-center mt-4">
              <div className="w-[88px] h-[2px] bg-gray-900 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
