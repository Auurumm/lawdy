import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Lawdy - AI 계약 분석 플랫폼",
  description: "AI로 분석하는 스마트한 계약 파트너, Lawdy. 계약의 법적 위험을 자동으로 식별하고 시각화합니다.",
  keywords: ["계약 분석", "AI", "법적 위험", "계약서 검토", "Lawdy"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-pretendard antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
