"use client";

import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Sidebar } from "@/components/profile/Sidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen pb-12 pt-8">
        <div className="container mx-auto px-4 max-w-[1240px] flex gap-6">
          <Sidebar />
          <main className="flex-1 w-full min-w-0">{children}</main>
        </div>
      </div>
      <Footer />
    </>
  );
}
