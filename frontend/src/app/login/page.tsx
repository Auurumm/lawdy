'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, user, loading: authLoading } = useAuth();
  const router = useRouter();

  // 이미 로그인된 경우 마이페이지로 리다이렉트
  useEffect(() => {
    if (!authLoading && user) {
      router.push('/mypage');
    }
  }, [user, authLoading, router]);

  const isFormFilled = email.length > 0 && password.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormFilled || isLoading) return;

    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      router.push('/mypage');
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearEmail = () => setEmail('');

  return (
    <main className="min-h-screen bg-[#f2f3f8]">
      <Header />

      <div className="h-[60px] md:h-[140px]" />

      {/* Title Section */}
      <div className="flex flex-col items-center px-5 md:px-0">
        <h1 className="text-2xl md:text-[32px] font-bold text-gray-900 leading-8 md:leading-[42px] text-center">
          로그인
        </h1>
        <div className="h-2" />
        <p className="text-base font-semibold text-[#737684] leading-[22px] text-center">
          <span className="md:hidden">무료로 시작하세요</span>
          <span className="hidden md:inline">계정에 로그인하여 시작하세요</span>
        </p>
      </div>

      <div className="h-10" />

      {/* Login Form */}
      <div className="flex justify-center px-5 md:px-0">
        <form onSubmit={handleSubmit} className="w-full md:w-[358px] flex flex-col">
          {/* Email Field */}
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력해주세요."
              className="w-full bg-white border border-[#e1e3ea] rounded-[12px] p-4 text-base font-medium text-gray-900 placeholder:text-[#737684] leading-[22px] outline-none focus:border-primary"
            />
            {email && (
              <button
                type="button"
                onClick={clearEmail}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="10" fill="#E1E3EA" />
                  <path d="M7 7L13 13M13 7L7 13" stroke="#737684" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>

          <div className="h-2" />

          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요."
              className="w-full bg-white border border-[#e1e3ea] rounded-[12px] p-4 pr-12 text-base font-medium text-gray-900 placeholder:text-[#737684] leading-[22px] outline-none focus:border-primary"
            />
            {password && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center"
              >
                <Image
                  src={showPassword ? '/images/icon-eye-open.svg' : '/images/icon-eye-closed.svg'}
                  alt={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                  width={24}
                  height={24}
                />
              </button>
            )}
          </div>

          <div className="h-2" />

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="flex items-center gap-0.5 text-xs md:text-sm font-bold md:font-medium text-[#737684] leading-4 md:leading-5"
            >
              <span>비밀번호 찾기</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="rotate-[-90deg]">
                <path d="M5 6L8 9L11 6" stroke="#737684" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div className="h-6" />

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-[12px]">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={!isFormFilled || isLoading}
            className={`w-full h-14 rounded-[12px] flex items-center justify-center transition-colors ${
              isFormFilled && !isLoading
                ? 'bg-gray-900 hover:bg-gray-800'
                : 'bg-[#d3d6de]'
            }`}
          >
            <span className={`text-lg font-bold leading-6 ${isFormFilled && !isLoading ? 'text-white' : 'text-[#737684]'}`}>
              {isLoading ? '로그인 중...' : '로그인'}
            </span>
          </button>

          <div className="h-4" />

          {/* Sign Up Link */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-base font-semibold text-[#737684] leading-[22px]">
              아직 계정이 없으신가요?
            </p>
            <Link
              href="/signup"
              className="bg-primary rounded-full px-2 py-1 text-sm font-medium text-white leading-[18px] hover:bg-primary/90 transition-colors"
            >
              가입하기
            </Link>
          </div>
        </form>
      </div>

      <div className="h-[120px] md:h-[180px]" />

      <Footer />
    </main>
  );
}
