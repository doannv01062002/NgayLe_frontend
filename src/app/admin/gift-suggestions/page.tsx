import { GiftSuggestionStats } from "@/features/admin/gift-suggestions/GiftSuggestionStats";
import { GiftSuggestionTable } from "@/features/admin/gift-suggestions/GiftSuggestionTable";

export default function AdminGiftSuggestionsPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <a
          className="hover:text-primary transition-colors flex items-center"
          href="#"
        >
          <span className="material-symbols-outlined text-lg">home</span>
        </a>
        <span className="text-gray-300 dark:text-gray-600">/</span>
        <a className="hover:text-primary font-medium" href="#">
          Quản lý tính năng
        </a>
        <span className="text-gray-300 dark:text-gray-600">/</span>
        <span className="text-gray-900 dark:text-white font-medium">
          Gợi ý quà tặng
        </span>
      </nav>

      {/* Page Heading & Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Cấu hình Gợi ý Quà tặng
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base max-w-2xl">
            Thiết lập các bộ quy tắc (Rules Engine) để tự động lọc sản phẩm cho
            khách hàng dựa trên ngân sách, dịp lễ và đối tượng.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center gap-2 h-10 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-lg">science</span>
            Giả lập (Test)
          </button>
          <button className="flex items-center justify-center gap-2 h-10 px-5 bg-primary hover:bg-blue-600 text-white rounded-lg text-sm font-bold shadow-md shadow-blue-500/20 transition-all">
            <span className="material-symbols-outlined text-lg">add</span>
            Tạo bộ quy tắc mới
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <GiftSuggestionStats />
        <GiftSuggestionTable />
      </div>
    </>
  );
}
