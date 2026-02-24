export function MarketingStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Active Vouchers */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-[#1a2634]">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Voucher đang hoạt động
          </p>
          <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-lg">
            confirmation_number
          </span>
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              12
            </p>
          </div>
          <span className="flex items-center gap-1 rounded bg-green-50 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
            <span className="material-symbols-outlined text-[14px]">
              trending_up
            </span>
            +2.1%
          </span>
        </div>
      </div>
      {/* Conversion Rate */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-[#1a2634]">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Tỉ lệ chuyển đổi
          </p>
          <span className="material-symbols-outlined text-orange-500 bg-orange-500/10 p-1.5 rounded-lg">
            percent
          </span>
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              4.8%
            </p>
          </div>
          <span className="flex items-center gap-1 rounded bg-green-50 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
            <span className="material-symbols-outlined text-[14px]">
              trending_up
            </span>
            +0.5%
          </span>
        </div>
      </div>
      {/* Campaign Revenue */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-[#1a2634]">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Doanh thu Campaign
          </p>
          <span className="material-symbols-outlined text-green-600 bg-green-600/10 p-1.5 rounded-lg">
            payments
          </span>
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              1.2 Tỷ
            </p>
          </div>
          <span className="flex items-center gap-1 rounded bg-green-50 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
            <span className="material-symbols-outlined text-[14px]">
              trending_up
            </span>
            +12%
          </span>
        </div>
      </div>
    </div>
  );
}
