import { AffiliateStats } from "@/features/admin/affiliate/AffiliateStats";
import { AffiliateTable } from "@/features/admin/affiliate/AffiliateTable";

export default function AdminAffiliatePage() {
  return (
    <>
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm mb-4">
        <a
          className="text-gray-500 hover:text-primary transition-colors font-medium dark:text-gray-400"
          href="#"
        >
          Quản trị
        </a>
        <span className="text-gray-300 font-medium dark:text-gray-600">/</span>
        <a
          className="text-gray-500 hover:text-primary transition-colors font-medium dark:text-gray-400"
          href="#"
        >
          Tăng trưởng
        </a>
        <span className="text-gray-300 font-medium dark:text-gray-600">/</span>
        <span className="text-gray-900 font-medium dark:text-white">
          Affiliate
        </span>
      </nav>

      {/* Header */}
      <div className="flex justify-between items-end mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-gray-900 text-3xl font-black leading-tight tracking-tight dark:text-white">
            Quản lý Affiliate
          </h1>
          <p className="text-gray-500 text-sm font-normal dark:text-gray-400">
            Theo dõi danh sách đối tác, xét duyệt và thanh toán hoa hồng cho
            ngayle.com
          </p>
        </div>
        <button className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-sm transition-all shadow-blue-200 dark:shadow-none">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Thêm đối tác
        </button>
      </div>

      <div className="flex flex-col gap-6">
        <AffiliateStats />
        <AffiliateTable />
      </div>

      <footer className="mt-8 mb-4 text-center">
        <p className="text-gray-500 text-xs dark:text-gray-400">
          © 2023 Ngayle.com Admin Panel. All rights reserved.
        </p>
      </footer>
    </>
  );
}
