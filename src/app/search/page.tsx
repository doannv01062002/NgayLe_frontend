import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { FilterSidebar } from "@/features/customer/search/FilterSidebar";
import { SearchResults } from "@/features/customer/search/SearchResults";
import Link from "next/link";
import { Suspense } from "react";

export default function SearchPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
      <Header />

      {/* Breadcrumbs */}
      <div className="bg-surface-light dark:bg-surface-dark border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 lg:px-8 py-3">
          <nav className="flex text-sm text-gray-500 dark:text-gray-400">
            <ol className="flex items-center gap-2">
              <li>
                <Link className="hover:text-primary" href="/">
                  Trang chủ
                </Link>
              </li>
              <li>
                <span className="material-symbols-outlined text-sm">
                  chevron_right
                </span>
              </li>
              <li>
                <Link className="hover:text-primary" href="/search">
                  Tìm kiếm
                </Link>
              </li>
              <li>
                <span className="material-symbols-outlined text-sm">
                  chevron_right
                </span>
              </li>
              <li className="font-semibold text-slate-900 dark:text-white">
                Bánh Trung Thu
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <main className="container mx-auto flex-1 px-4 lg:px-8 py-6">
        {/* Banner */}
        <div className="mb-8 overflow-hidden rounded-xl bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 p-6 sm:p-10 relative">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block rounded bg-red-100 px-2 py-1 text-xs font-bold text-primary mb-3">
              SỰ KIỆN ĐẶC BIỆT
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
              Lễ Hội Trăng Rằm - Deal Sốc Đến 50%
            </h2>
            <p className="text-gray-600 mb-6 max-w-lg">
              Săn ngay voucher giảm giá 50k cho đơn từ 200k. Số lượng có hạn,
              mua ngay hôm nay!
            </p>
            <button className="bg-primary hover:bg-primary-hover text-white font-bold py-2.5 px-6 rounded-lg transition-colors shadow-lg shadow-red-200">
              Xem Chi Tiết
            </button>
          </div>
          <div
            className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 sm:opacity-20 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1632204736569-42b4d962002f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
            }}
          ></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <Suspense fallback={<div className="w-64 h-96 bg-gray-100 animate-pulse rounded-xl hidden lg:block"></div>}>
            <FilterSidebar />
          </Suspense>
          <div className="flex-1 min-w-0">
            <Suspense fallback={<div>Đang tải kết quả...</div>}>
              <SearchResults />
            </Suspense>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
