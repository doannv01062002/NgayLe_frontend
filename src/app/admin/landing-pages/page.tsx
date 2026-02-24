import { LandingPageStats } from "@/features/admin/landing-pages/LandingPageStats";
import { LandingPageList } from "@/features/admin/landing-pages/LandingPageList";

export default function AdminLandingPagesPage() {
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
          Marketing
        </a>
        <span className="text-gray-300 dark:text-gray-600">/</span>
        <span className="text-gray-900 dark:text-white font-medium">
          Quản lý Landing Page
        </span>
      </nav>

      {/* Page Heading & Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
              Quản lý Landing Page
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wide border border-primary/20">
              Beta
            </span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-base max-w-2xl">
            Tạo và quản lý các trang đích cho chiến dịch marketing, sự kiện đặc
            biệt với công cụ kéo thả.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 h-10 px-5 bg-primary hover:bg-blue-600 text-white rounded-lg text-sm font-bold shadow-md shadow-blue-500/20 transition-all">
          <span className="material-symbols-outlined text-lg">add</span>
          Tạo Landing Page mới
        </button>
      </div>

      <div className="flex flex-col gap-6">
        <LandingPageStats />

        {/* Search & Filter Toolbar */}
        <div className="bg-white dark:bg-[#1a2634] p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              search
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm theo tên chiến dịch..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <select className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-primary w-full md:w-auto">
              <option>Trạng thái: Tất cả</option>
              <option>Đang chạy</option>
              <option>Đã lên lịch</option>
              <option>Nháp</option>
            </select>
            <button className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
          </div>
        </div>

        <LandingPageList />
      </div>
    </>
  );
}
