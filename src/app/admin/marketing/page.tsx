import { MarketingStats } from "@/features/admin/marketing/MarketingStats";
import { ThemeSelector } from "@/features/admin/marketing/ThemeSelector";
import { CampaignTable } from "@/features/admin/marketing/CampaignTable";
import { VoucherGenerator } from "@/features/admin/marketing/VoucherGenerator";
import { MarketingCalendar } from "@/features/admin/marketing/MarketingCalendar";

export default function AdminMarketingPage() {
  return (
    <>
      <nav className="flex text-sm font-medium text-gray-500 dark:text-gray-400">
        <a className="hover:text-primary transition-colors" href="#">
          Trang chủ
        </a>
        <span className="mx-2">/</span>
        <span className="text-gray-900 dark:text-white">
          Marketing &amp; Khuyến mãi
        </span>
      </nav>

      {/* Page Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Chiến dịch &amp; Giao diện
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Quản lý các chương trình khuyến mãi theo mùa lễ hội.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center justify-center gap-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm">
            <span className="material-symbols-outlined text-[20px]">
              history
            </span>
            Lịch sử
          </button>
          <button className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition-all shadow-sm shadow-blue-200 dark:shadow-none">
            <span className="material-symbols-outlined text-[20px]">add</span>
            Tạo chiến dịch mới
          </button>
        </div>
      </div>

      <MarketingStats />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column: Theme & Campaigns */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          <ThemeSelector />
          <CampaignTable />
        </div>
        {/* Right Column: Tools & Widgets */}
        <div className="flex flex-col gap-6">
          <VoucherGenerator />
          <MarketingCalendar />
        </div>
      </div>
    </>
  );
}
