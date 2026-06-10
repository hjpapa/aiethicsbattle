import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 윤리 흑백토론",
  description: "AI 윤리 관점을 흑돌과 백돌처럼 주고받는 교육용 토론 MVP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
