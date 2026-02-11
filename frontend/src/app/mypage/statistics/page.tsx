'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import type { StatisticsResponse } from '@/types/database';

// Stat Card Component
function StatCard({ label, value, icon, valueColor = 'text-primary' }: { 
  label: string; 
  value: string; 
  icon: string; 
  valueColor?: string;
}) {
  return (
    <div className="bg-[#e1e3ea] rounded-[12px] px-4 md:px-6 py-3 md:py-3.5 flex-1 min-w-0">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-semibold text-gray-900 leading-[22px]">{label}</p>
          <p className={`text-xl md:text-[28px] font-bold leading-9 ${valueColor}`}>{value}</p>
        </div>
        <div className="w-8 h-8 md:w-10 md:h-10 relative flex-shrink-0">
          <Image src={icon} alt="" fill className="object-contain" />
        </div>
      </div>
    </div>
  );
}

export default function StatisticsPage() {
  const [statistics, setStatistics] = useState<StatisticsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadStatistics();
    }
  }, [user]);

  async function loadStatistics() {
    try {
      const stats = await api.getStatistics();
      setStatistics(stats);
    } catch (error) {
      console.error('Failed to load statistics:', error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-[#737684]">로딩 중...</p>
        </div>
      </div>
    );
  }

  const totalAnalyses = statistics?.totalAnalyses ?? 0;
  const monthlyAnalyses = statistics?.monthlyAnalyses ?? 0;
  const avgRiskLevel = statistics?.avgRiskLevel ?? 'medium';
  const avgProcessingTime = statistics?.avgAnalysisTime ?? 0;
  
  const riskLevelText: Record<string, string> = { low: '낮음', medium: '중간', high: '높음' };
  const riskLevelColor: Record<string, string> = { low: 'text-[#00b550]', medium: 'text-[#ff6200]', high: 'text-[#ff1e00]' };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-[22px] font-bold text-gray-900 leading-[30px]">분석 통계</h1>
        <p className="text-base font-semibold text-[#737684] leading-[22px]">분석 활동 및 추이를 확인하세요.</p>
      </div>

      <div className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide mb-10">
        <StatCard 
          label="총 분석 건수" 
          value={String(totalAnalyses)} 
          icon="/images/icon-chart-line.svg" 
        />
        <StatCard 
          label="이번 달 분석" 
          value={String(monthlyAnalyses)} 
          icon="/images/icon-calendar.svg" 
        />
        <StatCard 
          label="평균 위험도" 
          value={riskLevelText[avgRiskLevel] || '중간'} 
          icon="/images/icon-check-circle.svg" 
          valueColor={riskLevelColor[avgRiskLevel] || 'text-[#ff6200]'} 
        />
        <StatCard 
          label="평균 분석 시간" 
          value={avgProcessingTime > 0 ? `${avgProcessingTime.toFixed(1)}초` : '-'} 
          icon="/images/icon-history.svg" 
        />
      </div>

      {/* 추가 통계 섹션 (나중에 확장 가능) */}
      <div className="bg-white rounded-[12px] border border-[#e1e3ea] p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">상세 통계</h2>
        
        {totalAnalyses === 0 ? (
          <p className="text-[#737684] text-center py-8">
            아직 분석한 문서가 없습니다. 문서를 분석하면 통계가 여기에 표시됩니다.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 위험도 분포 */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">위험도 분포</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-[#737684]">높음</span>
                  <div className="flex-1 h-4 bg-[#e1e3ea] rounded-full overflow-hidden">
                    <div className="h-full bg-[#ff1e00] rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <span className="w-10 text-xs text-right text-gray-900">20%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-[#737684]">중간</span>
                  <div className="flex-1 h-4 bg-[#e1e3ea] rounded-full overflow-hidden">
                    <div className="h-full bg-[#ff6200] rounded-full" style={{ width: '50%' }}></div>
                  </div>
                  <span className="w-10 text-xs text-right text-gray-900">50%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-[#737684]">낮음</span>
                  <div className="flex-1 h-4 bg-[#e1e3ea] rounded-full overflow-hidden">
                    <div className="h-full bg-[#00b550] rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <span className="w-10 text-xs text-right text-gray-900">30%</span>
                </div>
              </div>
            </div>

            {/* 월별 분석 추이 */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">최근 활동</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#737684]">오늘</span>
                  <span className="font-medium text-gray-900">0건</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#737684]">이번 주</span>
                  <span className="font-medium text-gray-900">0건</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#737684]">이번 달</span>
                  <span className="font-medium text-gray-900">{monthlyAnalyses}건</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#737684]">전체</span>
                  <span className="font-medium text-gray-900">{totalAnalyses}건</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}