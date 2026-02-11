'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Job {
  id: string;
  title: string;
  description: string;
  team: string;
  location: string;
  employment_type: string;
  requirements: string[];
}

function WhyWorkCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-[#e1e3ea] rounded-[12px] px-4 py-10 w-[237px] flex-shrink-0">
      <div className="flex flex-col gap-4 items-center">
        <div className="w-20 h-20">
          {icon}
        </div>
        <div className="flex flex-col gap-0.5 items-center text-center">
          <p className="text-base font-semibold text-gray-900 leading-6">{title}</p>
          <p className="text-sm font-medium text-[#454855] leading-[18px]">{description}</p>
        </div>
      </div>
    </div>
  );
}

function JobCard({ job, isHovered, onHover, onLeave }: {
  job: Job;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      className={`rounded-[12px] p-6 w-full transition-colors ${isHovered ? 'bg-[rgba(193,224,252,0.3)]' : ''}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col gap-4 md:gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-gray-900 leading-6">{job.title}</h3>
              <p className="text-sm font-semibold text-[#737684] leading-[18px]">{job.description}</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <div className="bg-[#e1e3ea] rounded-lg px-1.5 py-0.5 flex gap-0.5 items-center">
                <Image src="/images/careers-icon-job.svg" alt="" width={18} height={18} />
                <span className="text-sm font-medium text-gray-900 leading-[18px]">{job.team}</span>
              </div>
              <div className="bg-[#e1e3ea] rounded-lg px-1.5 py-0.5 flex gap-0.5 items-center">
                <Image src="/images/careers-icon-location.svg" alt="" width={18} height={18} />
                <span className="text-sm font-medium text-gray-900 leading-[18px]">{job.location}</span>
              </div>
              <div className="bg-[#e1e3ea] rounded-lg px-1.5 py-0.5 flex gap-0.5 items-center">
                <Image src="/images/careers-icon-time.svg" alt="" width={18} height={18} />
                <span className="text-sm font-medium text-gray-900 leading-[18px]">{job.employment_type}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-1 md:items-center">
            <span className="text-xs font-bold text-primary leading-4">필수 요건</span>
            <div className="flex flex-wrap items-center gap-1">
              {job.requirements.map((req, index) => (
                <span key={index} className="flex items-center gap-1">
                  {index > 0 && <span className="text-[#737684]">・</span>}
                  <span className="text-xs font-medium text-[#737684] leading-4">{req}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end md:justify-center">
          <a 
            href={`mailto:official.haedeun@gmail.com?subject=${encodeURIComponent(`[Lawdy 채용 지원] ${job.title}`)}&body=${encodeURIComponent(`안녕하세요,\n\n${job.title} 포지션에 지원합니다.\n\n[이름]:\n[연락처]:\n[경력 요약]:\n\n감사합니다.`)}`}
            className="bg-white md:bg-transparent rounded-full px-4 py-2 md:px-6 md:py-0 md:h-20 flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <span className="text-lg font-semibold md:font-medium text-gray-900 leading-6">지원하기</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage, '...', totalPages);
    }
    return pages;
  };

  return (
    <div className="flex gap-1.5 items-center justify-center">
      <button
        className={`w-6 h-6 flex items-center justify-center ${currentPage === 1 ? 'text-[#c5c8d3]' : 'text-[#737684] hover:text-gray-900'}`}
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M8 3L4 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 3L8 7L12 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button
        className={`w-6 h-6 flex items-center justify-center ${currentPage === 1 ? 'text-[#c5c8d3]' : 'text-[#737684] hover:text-gray-900'}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 3L5 7L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {getVisiblePages().map((page, index) => (
        <button
          key={index}
          className={`w-6 h-6 rounded-full flex items-center justify-center text-[13px] font-bold leading-[18px] ${
            page === currentPage
              ? 'bg-gray-900 text-white'
              : typeof page === 'string' ? 'text-[#737684]' : 'text-[#737684] hover:text-gray-900'
          }`}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={typeof page === 'string'}
        >
          {page}
        </button>
      ))}
      <button
        className={`w-6 h-6 flex items-center justify-center ${currentPage === totalPages ? 'text-[#c5c8d3]' : 'text-[#737684] hover:text-gray-900'}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button
        className={`w-6 h-6 flex items-center justify-center ${currentPage === totalPages ? 'text-[#c5c8d3]' : 'text-[#737684] hover:text-gray-900'}`}
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M6 3L10 7L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 3L6 7L2 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hoveredJobId, setHoveredJobId] = useState<string | null>(null);

  const loadJobs = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/jobs?page=${page}&limit=5`);
      if (res.ok) {
        const data = await res.json();
        setJobs(data.data);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Failed to load jobs:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadJobs(currentPage);
  }, [currentPage, loadJobs]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#f2f3f8]">
      <Header />

      <div className="h-8 md:h-10" />

      <div className="flex flex-col items-center px-5 md:px-0">
        <h1 className="text-2xl md:text-[32px] font-bold text-gray-900 leading-8 md:leading-[42px] text-center">
          우리와 함께하세요
        </h1>
        <div className="h-2" />
        <p className="text-base font-semibold text-[#737684] leading-[22px] text-center">
          Lawdy에서 법률과 기술의 미래를 만들어보세요
        </p>
      </div>

      <div className="h-10 md:h-20" />

      <div className="px-5 md:px-0 md:flex md:flex-col md:items-center">
        <div className="w-full md:w-[742px]">
          <h2 className="text-lg font-bold text-gray-900 leading-6">Lawdy에서 일하는 이유</h2>
          <div className="h-4" />
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 md:pb-0 md:overflow-visible md:justify-between">
            <WhyWorkCard
              icon={
                <div className="relative w-20 h-20">
                  <Image src="/images/careers-icon-ai-bg.svg" alt="" fill className="object-contain" />
                  <div className="absolute left-[18px] top-[22px] w-[42px] h-[35px]">
                    <Image src="/images/careers-icon-ai-inner.svg" alt="" fill className="object-contain" />
                  </div>
                </div>
              }
              title="혁신적인 기술"
              description="최신 AI/ML 기술로 미래를 만듭니다"
            />
            <WhyWorkCard
              icon={
                <div className="relative w-20 h-20">
                  <Image src="/images/careers-icon-growth.svg" alt="" fill className="object-contain" />
                </div>
              }
              title="함께 성장"
              description="팀과 함께 기술과 경험을 나눕니다"
            />
            <WhyWorkCard
              icon={
                <div className="relative w-20 h-20">
                  <Image src="/images/careers-icon-flexible.svg" alt="" fill className="object-contain" />
                </div>
              }
              title="유연한 근무"
              description="원격근무와 유연한 근무시간을 지원합니다"
            />
          </div>
        </div>
      </div>

      <div className="h-[60px] md:h-20" />

      <div className="px-5 md:px-0 md:flex md:flex-col md:items-center">
        <div className="w-full md:w-[745px]">
          <h2 className="text-lg font-bold text-gray-900 leading-6">현재 모집 중인 직무</h2>
          <div className="h-4" />
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : jobs.length > 0 ? (
            <div className="flex flex-col gap-4">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isHovered={hoveredJobId === job.id}
                  onHover={() => setHoveredJobId(job.id)}
                  onLeave={() => setHoveredJobId(null)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              현재 모집 중인 직무가 없습니다.
            </div>
          )}
        </div>
      </div>

      <div className="h-6 md:h-10" />

      <div className="px-5 md:px-0 md:flex md:flex-col md:items-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <div className="h-[60px] md:h-20" />

      <div className="flex justify-center px-5 md:px-0">
        <div className="w-full md:w-[1124px] h-[1px] md:h-[2px] bg-[#e1e3ea]" />
      </div>

      <div className="h-8 md:h-[60px]" />

      <div className="flex flex-col items-center px-5 md:px-0">
        <h2 className="text-2xl md:text-[32px] font-bold text-gray-900 leading-8 md:leading-[42px] text-center">
          적합한 직무가 없으신가요?
        </h2>
        <div className="h-2" />
        <p className="text-base font-semibold text-[#737684] leading-[22px] text-center">
          <span className="md:hidden">자유로운 형식의 지원서를 보내주세요.<br />새로운 기회를 함께 만들 수 있습니다.</span>
          <span className="hidden md:inline">자유로운 형식의 지원서를 보내주세요. 새로운 기회를 함께 만들 수 있습니다.</span>
        </p>
        <div className="h-6 md:h-8" />
        <a 
          href={`mailto:official.haedeun@gmail.com?subject=${encodeURIComponent('[Lawdy 자유 지원] 지원서')}&body=${encodeURIComponent('안녕하세요,\n\nLawdy에 자유 형식으로 지원합니다.\n\n[이름]:\n[연락처]:\n[관심 분야]:\n[경력 요약]:\n\n감사합니다.')}`}
          className="w-[335px] h-14 bg-primary rounded-[12px] flex items-center justify-center hover:bg-blue-700 transition-colors"
        >
          <span className="text-lg font-bold text-white leading-6">지원서 보내기</span>
        </a>
      </div>

      <div className="h-[120px] md:h-[100px]" />

      <Footer />
    </main>
  );
}
