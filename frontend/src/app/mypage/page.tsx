'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import type { DocumentWithAnalysis, StatisticsResponse } from '@/types/database';

// Risk badge colors
const riskColors = {
  high: 'text-[#ff1e00]',
  medium: 'text-[#ff6200]',
  low: 'text-[#00b550]',
};

const riskLabels = {
  high: '높음',
  medium: '중간',
  low: '낮음',
};

const riskBadgeColors = {
  high: 'bg-[#ff1e00]',
  medium: 'bg-[#ff6200]',
  low: 'bg-[#00b550]',
};

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

export default function DashboardPage() {
  const [documents, setDocuments] = useState<DocumentWithAnalysis[]>([]);
  const [statistics, setStatistics] = useState<StatisticsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  async function loadData() {
    try {
      const [docsRes, statsRes] = await Promise.all([
        api.getDocuments(1, 10),
        api.getStatistics(),
      ]);
      setDocuments(docsRes.data || []);
      setStatistics(statsRes);
    } catch (error) {
      console.error('Failed to load data:', error);
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

  const recentDocuments = documents.slice(0, 3).map(doc => ({
    id: doc.id,
    name: doc.file_name,
    date: new Date(doc.created_at).toLocaleDateString('ko-KR'),
    risk: (doc.analyses?.[0]?.risk_level || 'low') as 'low' | 'medium' | 'high',
    status: doc.status === 'completed' ? '분석완료' : doc.status === 'analyzing' ? '분석중' : '대기중',
    isCompleted: doc.status === 'completed',
  }));

  const totalAnalyses = statistics?.totalAnalyses ?? 0;
  const monthlyAnalyses = statistics?.monthlyAnalyses ?? 0;
  const completionRate = statistics?.completionRate ?? 100;

  return (
    <>
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-[22px] font-bold text-gray-900 leading-[30px]">대시보드</h1>
        <p className="text-base font-semibold text-[#737684] leading-[22px]">최근 분석 활동을 확인하세요.</p>
      </div>

      {/* Stats Cards */}
      <div className="flex gap-3 md:gap-4 mb-10 overflow-x-auto scrollbar-hide">
        <StatCard label="총 분석 건수" value={String(totalAnalyses)} icon="/images/icon-chart-line.svg" />
        <StatCard label="이번 달 분석" value={String(monthlyAnalyses)} icon="/images/icon-calendar.svg" />
        <StatCard label="완료율" value={`${completionRate}%`} icon="/images/icon-check-circle.svg" />
      </div>

      {/* Recent Documents */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4 md:mb-10">
          <h2 className="text-lg font-bold text-gray-900 leading-6">최근 문서</h2>
          <Link href="/mypage/analysis" className="flex items-center gap-2">
            <span className="text-base font-semibold text-[#454855]">더 보기</span>
            <div className="w-6 h-6 bg-[#e1e3ea] rounded-full flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="rotate-180">
                <path d="M10 12L6 8L10 4" stroke="#454855" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Mobile List */}
        <div className="md:hidden flex flex-col gap-3">
          {recentDocuments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[#737684]">분석한 문서가 없습니다.</p>
              <Link href="/mypage/analysis" className="mt-2 text-primary font-semibold inline-block">
                첫 문서 분석하기
              </Link>
            </div>
          ) : (
            recentDocuments.map((doc) => (
              <div key={doc.id} className="bg-white rounded-[12px] p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#e1e3ea] rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#737684" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 2V8H20" stroke="#737684" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{doc.name}</p>
                    <p className="text-xs text-[#737684]">{doc.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded ${riskBadgeColors[doc.risk]} text-white`}>
                    {riskLabels[doc.risk]}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block">
          {recentDocuments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[#737684]">분석한 문서가 없습니다.</p>
              <Link href="/mypage/analysis" className="mt-2 text-primary font-semibold inline-block">
                첫 문서 분석하기
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                {['문서명', '업로드일', '위험도', '상태', '작업'].map((header) => (
                  <div key={header} className="w-[180px] text-center">
                    <span className="text-sm font-semibold text-[#979baa]">{header}</span>
                  </div>
                ))}
              </div>
              {recentDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between py-4">
                  <div className="w-[180px] text-center">
                    <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                  </div>
                  <div className="w-[180px] text-center">
                    <span className="text-sm font-medium text-gray-900">{doc.date}</span>
                  </div>
                  <div className="w-[180px] text-center">
                    <span className={`text-sm font-medium ${riskColors[doc.risk]}`}>{riskLabels[doc.risk]}</span>
                  </div>
                  <div className="w-[180px] text-center">
                    <span className="bg-[#d3d6de] rounded-[12px] px-3 py-1 text-xs font-medium text-gray-900">{doc.status}</span>
                  </div>
                  <div className="w-[180px] text-center">
                    <Link
                      href={`/mypage/analysis?doc=${doc.id}`}
                      className={`bg-white border border-[#c5c8d3] rounded-full px-3 py-1 text-xs font-medium ${
                        doc.isCompleted ? 'text-gray-900 hover:border-primary' : 'text-gray-400 pointer-events-none'
                      }`}
                    >
                      보기
                    </Link>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 leading-6 mb-4">빠른 작업</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <Link href="/mypage/analysis" className="flex-1 bg-primary rounded-[12px] px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 relative">
                <Image src="/images/icon-new-document.svg" alt="" fill className="object-contain" />
              </div>
              <span className="text-base font-bold text-white">새 문서 분석</span>
            </div>
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="rotate-180">
                <path d="M10 12L6 8L10 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Link>
          <Link href="/mypage/contract" className="flex-1 bg-[#e1e3ea] rounded-[12px] px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 relative">
                <Image src="/images/icon-history.svg" alt="" fill className="object-contain" />
              </div>
              <span className="text-base font-bold text-gray-900">계약서 작성</span>
            </div>
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="rotate-180">
                <path d="M10 12L6 8L10 4" stroke="#454855" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}