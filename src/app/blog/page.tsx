import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { BlogHero } from "@/features/customer/blog/BlogHero";
import { BlogTrendingTags } from "@/features/customer/blog/BlogTrendingTags";
import { BlogList } from "@/features/customer/blog/BlogList";
import { BlogSidebar } from "@/features/customer/blog/BlogSidebar";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-sans text-gray-900 dark:text-gray-100 flex flex-col min-h-screen">
      <Header />

      {/* Secondary Nav */}
      <div className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1b0f0d]">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
          <nav className="flex items-center gap-8 py-3 overflow-x-auto no-scrollbar">
            <a
              className="text-sm font-semibold text-primary border-b-2 border-primary pb-0.5 whitespace-nowrap"
              href="#"
            >
              Trang chủ Blog
            </a>
            <a
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary whitespace-nowrap"
              href="#"
            >
              Chuẩn bị Tết
            </a>
            <a
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary whitespace-nowrap"
              href="#"
            >
              Lễ Tình Nhân
            </a>
            <a
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary whitespace-nowrap"
              href="#"
            >
              Quà tặng 8/3
            </a>
            <a
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary whitespace-nowrap"
              href="#"
            >
              Trung Thu
            </a>
            <a
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary whitespace-nowrap"
              href="#"
            >
              Văn hóa lễ hội
            </a>
            <a
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary whitespace-nowrap"
              href="#"
            >
              Khuyến mãi HOT
            </a>
          </nav>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white dark:bg-[#1b0f0d] border-b border-gray-100 dark:border-gray-800 py-2">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8 flex items-center text-xs text-gray-500 dark:text-gray-400">
          <Link className="hover:text-primary" href="/">
            Trang chủ
          </Link>
          <span className="material-symbols-outlined text-[12px] mx-1">
            chevron_right
          </span>
          <span className="text-gray-900 dark:text-gray-200 font-medium">
            Cẩm nang mua sắm
          </span>
        </div>
      </div>

      <main className="flex-grow max-w-[1200px] mx-auto px-4 lg:px-8 py-6 w-full gap-6 grid grid-cols-1 lg:grid-cols-12">
        {/* Main Content Area */}
        <div className="lg:col-span-9 flex flex-col gap-8">
          <BlogHero />
          <BlogTrendingTags />
          <BlogList />
        </div>

        {/* Sidebar */}
        <BlogSidebar />
      </main>

      <Footer />
    </div>
  );
}
