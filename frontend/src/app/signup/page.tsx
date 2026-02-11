'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup, user, loading: authLoading } = useAuth();
  const router = useRouter();

  // 이미 로그인된 경우 마이페이지로 리다이렉트
  useEffect(() => {
    if (!authLoading && user) {
      router.push('/mypage');
    }
  }, [user, authLoading, router]);

  // Password validation
  const isPasswordValid = password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
  const showPasswordError = password.length > 0 && !isPasswordValid;
  const showConfirmError = confirmPassword.length > 0 && !passwordsMatch;

  const isFormValid =
    name.length > 0 &&
    email.length > 0 &&
    isPasswordValid &&
    passwordsMatch &&
    agreeTerms &&
    agreePrivacy;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isLoading) return;

    setError('');
    setIsLoading(true);

    try {
      await signup({ name, email, password, agreeTerms, agreePrivacy });
      router.push('/mypage');
    } catch (err) {
      setError(err instanceof Error ? err.message : '회원가입에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearField = (setter: (value: string) => void) => () => setter('');

  return (
    <main className="min-h-screen bg-[#f2f3f8]">
      <Header />

      <div className="h-[60px] md:h-[100px]" />

      {/* Title Section */}
      <div className="flex flex-col items-center px-5 md:px-0">
        <h1 className="text-2xl md:text-[32px] font-bold text-gray-900 leading-8 md:leading-[42px] text-center">
          계정 생성
        </h1>
        <div className="h-2" />
        <p className="text-base font-semibold text-[#737684] leading-[22px] text-center">
          무료로 시작하세요
        </p>
      </div>

      <div className="h-10" />

      {/* Signup Form */}
      <div className="flex justify-center px-5 md:px-0">
        <form onSubmit={handleSubmit} className="w-full md:w-[358px] flex flex-col">
          {/* Name Field */}
          <label className="text-sm font-medium text-[#454855] leading-[18px]">
            이름
          </label>
          <div className="h-2" />
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력해주세요."
              className="w-full bg-white border border-[#e1e3ea] rounded-[12px] p-4 text-base font-medium text-gray-900 placeholder:text-[#737684] leading-[22px] outline-none focus:border-primary"
            />
            {name && (
              <button
                type="button"
                onClick={clearField(setName)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="10" fill="#E1E3EA" />
                  <path d="M7 7L13 13M13 7L7 13" stroke="#737684" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>

          <div className="h-6" />

          {/* Email Field */}
          <label className="text-sm font-medium text-[#454855] leading-[18px]">
            이메일
          </label>
          <div className="h-2" />
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
                onClick={clearField(setEmail)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="10" fill="#E1E3EA" />
                  <path d="M7 7L13 13M13 7L7 13" stroke="#737684" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>

          <div className="h-6" />

          {/* Password Field */}
          <label className="text-sm font-medium text-[#454855] leading-[18px]">
            비밀번호
          </label>
          <div className="h-2" />
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요."
              className={`w-full bg-white border rounded-[12px] p-4 text-base font-medium text-gray-900 placeholder:text-[#737684] leading-[22px] outline-none focus:border-primary ${
                showPasswordError ? 'border-[#ff1e00]' : 'border-[#e1e3ea]'
              }`}
            />
          </div>
          <div className="h-2" />
          <p className={`text-sm font-medium leading-5 ${showPasswordError ? 'text-[#ff1e00]' : 'text-[#737684]'}`}>
            최소 8자 이상, 대문자, 숫자를 포함해주세요.
          </p>

          <div className="h-6" />

          {/* Confirm Password Field */}
          <label className="text-sm font-medium text-[#454855] leading-[18px]">
            비밀번호 확인
          </label>
          <div className="h-2" />
          <div className="relative">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호를 한번 더 입력해주세요."
              className={`w-full bg-white border rounded-[12px] p-4 text-base font-medium text-gray-900 placeholder:text-[#737684] leading-[22px] outline-none focus:border-primary ${
                showConfirmError ? 'border-[#ff1e00]' : 'border-[#e1e3ea]'
              }`}
            />
          </div>

          <div className="h-4 md:h-4" />

          {/* Agreement Checkboxes - No border on mobile, bordered on desktop */}
          <div className="flex flex-col gap-4 md:border md:border-[#d3d6de] md:rounded-[12px] md:p-5">
            {/* Terms Checkbox */}
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-[6px] flex items-center justify-center ${
                  agreeTerms ? 'bg-primary' : 'bg-white border border-[#c5c8d3]'
                }`}>
                  {agreeTerms && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm font-medium text-gray-900 leading-5">
                <Link href="/terms" className="font-semibold text-primary hover:underline">이용약관</Link>
                에 동의합니다.
              </span>
            </label>

            {/* Privacy Checkbox */}
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={agreePrivacy}
                  onChange={(e) => setAgreePrivacy(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-[6px] flex items-center justify-center ${
                  agreePrivacy ? 'bg-primary' : 'bg-white border border-[#c5c8d3]'
                }`}>
                  {agreePrivacy && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm font-medium text-gray-900 leading-5">
                <Link href="/privacy" className="font-semibold text-primary hover:underline">개인정보처리방침</Link>
                에 동의합니다.
              </span>
            </label>
          </div>

          <div className="h-6" />

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-[12px]">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Signup Button */}
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`w-full h-14 rounded-[12px] flex items-center justify-center transition-colors ${
              isFormValid && !isLoading
                ? 'bg-gray-900 hover:bg-gray-800'
                : 'bg-[#d3d6de]'
            }`}
          >
            <span className={`text-lg font-bold leading-6 ${isFormValid && !isLoading ? 'text-white' : 'text-[#737684]'}`}>
              {isLoading ? '계정 생성 중...' : '계정 생성'}
            </span>
          </button>

          <div className="h-4" />

          {/* Login Link */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-base font-semibold text-[#737684] leading-[22px]">
              이미 계정이 있으신가요?
            </p>
            <Link
              href="/login"
              className="bg-white border-2 border-[#e1e3ea] rounded-full px-2 py-1 text-sm font-medium text-gray-900 leading-[18px] hover:bg-gray-50 transition-colors"
            >
              로그인
            </Link>
          </div>
        </form>
      </div>

      <div className="h-[120px] md:h-[180px]" />

      <Footer />
    </main>
  );
}
