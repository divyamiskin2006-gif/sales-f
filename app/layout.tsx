import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sales Analytics Dashboard",
  description: "Frontend-only sales dashboard built with Next.js 15, TypeScript, Tailwind, and Recharts.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased text-slate-800">{children}</body>
    </html>
  );
}