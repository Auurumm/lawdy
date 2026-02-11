'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';

// Sidebar 네비게이션 아이템
const sidebarItems = [
  { 
    href: '/mypage', 
    label: '대시보드', 
    activeIcon: '/images/icon-dashboard-active.svg', 
    inactiveIcon: '/images/icon-dashboard-inactive.svg',
    exact: true,
  },
  { 
    href: '/mypage/analysis', 
    label: '문서 분석', 
    activeIcon: '/images/icon-document-active.svg', 
    inactiveIcon: '/images/icon-document-inactive.svg',
  },
  { 
    href: '/mypage/contract', 
    label: '계약서 작성', 
    activeIcon: '/images/icon-document-active.svg', 
    inactiveIcon: '/images/icon-document-inactive.svg',
  },
  { 
    href: '/mypage/statistics', 
    label: '분석 통계', 
    activeIcon: '/images/icon-statistics-active.svg', 
    inactiveIcon: '/images/icon-statistics-inactive.svg',
  },
];

// Desktop Sidebar
function Sidebar() {
  const pathname = usePathname();

  const isActive = (item: typeof sidebarItems[0]) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <div className="hidden md:flex flex-col items-start py-3">
      {sidebarItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center gap-1.5 py-3"
        >
          <div className="w-6 h-6 relative">
            <Image
              src={isActive(item) ? item.activeIcon : item.inactiveIcon}
              alt=""
              fill
            />
          </div>
          <span
            className={`text-base font-bold leading-[22px] ${
              isActive(item) ? 'text-primary' : 'text-[#979baa]'
            }`}
          >
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
}

// Mobile Tab Bar
function MobileTabBar() {
  const pathname = usePathname();

  const isActive = (item: typeof sidebarItems[0]) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <div className="flex md:hidden border-b border-[#e1e3ea] mb-4 overflow-x-auto">
      {sidebarItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex-shrink-0 px-3 py-3 text-sm font-semibold whitespace-nowrap ${
            isActive(item)
              ? 'text-primary border-b-2 border-primary'
              : 'text-[#979baa]'
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  // 인증 체크
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // 로딩 중
  if (authLoading) {
    return (
      <main className="min-h-screen bg-[#f2f3f8] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-[#737684]">로딩 중...</p>
        </div>
      </main>
    );
  }

  // 로그인 안 됨
  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#f2f3f8]">
      <Header />

      <div className="flex px-5 md:px-[78px] pt-4">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-[140px] pr-8">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 py-4 md:px-9">
          {/* Mobile Tab Bar */}
          <MobileTabBar />

          {/* Page Content */}
          {children}
        </div>
      </div>

      <div className="h-[60px] md:h-[100px]" />
    </main>
  );
}