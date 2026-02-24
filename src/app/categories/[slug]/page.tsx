import Link from "next/link";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { CategorySidebar } from "@/features/customer/category/CategorySidebar";
import { CategoryBanner } from "@/features/customer/category/CategoryBanner";
import { SearchResults } from "@/features/customer/search/SearchResults";

export default function CategoryPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-sans text-text-main dark:text-white min-h-screen flex flex-col">
      <Header />

      {/* Breadcrumbs */}
      <div className="w-full bg-background-light dark:bg-background-dark pt-4">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link className="text-blue-600 hover:underline" href="/">
              Trang chủ
            </Link>
            <span className="material-symbols-outlined text-[12px] text-gray-400">
              arrow_forward_ios
            </span>
            <Link className="text-blue-600 hover:underline" href="/tet">
              Tết Nguyên Đán
            </Link>
            <span className="material-symbols-outlined text-[12px] text-gray-400">
              arrow_forward_ios
            </span>
            <span className="text-text-main dark:text-white font-medium truncate">
              Quà tặng Tết Sum Vầy
            </span>
          </div>
        </div>
      </div>

      <div className="w-full bg-background-light dark:bg-background-dark py-4 flex-grow">
        <div className="container mx-auto px-4 lg:px-8 grid grid-cols-12 gap-5">
          <CategorySidebar />

          <main className="col-span-12 lg:col-span-10 flex flex-col gap-4">
            <CategoryBanner />
            {/* Reuse SearchResults component which includes sorting bar and grid */}
            <SearchResults />
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
