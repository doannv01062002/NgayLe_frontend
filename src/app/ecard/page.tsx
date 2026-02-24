import Link from "next/link";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { ECardBuilder } from "@/features/customer/ecard/ECardBuilder";

export default function ECardPage() {
  return (
    <div className="bg-[#f7f6f8] dark:bg-[#1c1022] font-sans text-gray-900 dark:text-white min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow w-full px-4 md:px-10 lg:px-40 py-6">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-6">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap gap-2 text-sm">
            <Link
              className="text-[#804c9a] hover:text-primary font-medium"
              href="/"
            >
              Trang chủ
            </Link>
            <span className="text-[#804c9a] font-medium">/</span>
            <Link
              className="text-[#804c9a] hover:text-primary font-medium"
              href="/gifts"
            >
              Quà tặng
            </Link>
            <span className="text-[#804c9a] font-medium">/</span>
            <span className="text-gray-900 dark:text-white font-medium">
              Viết thiệp điện tử
            </span>
          </div>

          {/* Page Heading */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-[#efe7f3] dark:border-gray-800 pb-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-gray-900 dark:text-white text-3xl md:text-4xl font-extrabold tracking-tight">
                Gửi Trọn Yêu Thương
              </h1>
              <p className="text-[#804c9a] dark:text-gray-400 text-base md:text-lg">
                Tạo thiệp độc đáo đính kèm món quà ý nghĩa
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-500">
                Được hỗ trợ bởi
              </span>
              <div className="flex items-center gap-1 bg-gradient-to-r from-primary to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                <span className="material-symbols-outlined text-[14px]">
                  auto_awesome
                </span>
                AI Writer
              </div>
            </div>
          </div>

          {/* Two Column Editor Layout */}
          <ECardBuilder />
        </div>
      </main>

      <Footer />
    </div>
  );
}
