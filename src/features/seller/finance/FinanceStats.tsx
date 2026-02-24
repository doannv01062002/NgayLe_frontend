export function FinanceStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Available Balance */}
      <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl border border-gray-200 dark:border-[#2b3a4a] shadow-sm relative overflow-hidden group">
        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <span className="material-symbols-outlined text-[120px] text-primary">
            account_balance_wallet
          </span>
        </div>
        <div className="relative z-10">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">
            Số dư khả dụng
          </p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            15.500.000 ₫
          </h3>
          <p className="text-xs text-gray-400 mt-4">Cập nhật: Vừa xong</p>
        </div>
      </div>
      {/* Pending Balance */}
      <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl border border-gray-200 dark:border-[#2b3a4a] shadow-sm">
        <div className="flex justify-between items-start mb-1">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Số dư chờ đối soát
          </p>
          <span className="material-symbols-outlined text-orange-500 bg-orange-50 dark:bg-orange-500/10 p-1 rounded-md text-[20px]">
            pending
          </span>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">
          2.100.000 ₫
        </h3>
        <div className="w-full bg-gray-100 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-orange-400 h-full rounded-full"
            style={{ width: "35%" }}
          ></div>
        </div>
        <p className="text-xs text-gray-400 mt-2">Dự kiến về ví sau 2-3 ngày</p>
      </div>
      {/* Monthly Revenue */}
      <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl border border-gray-200 dark:border-[#2b3a4a] shadow-sm">
        <div className="flex justify-between items-start mb-1">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Tổng doanh thu tháng này
          </p>
          <span className="material-symbols-outlined text-green-500 bg-green-50 dark:bg-green-500/10 p-1 rounded-md text-[20px]">
            trending_up
          </span>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          45.000.000 ₫
        </h3>
        <p className="text-green-600 dark:text-green-400 text-sm font-bold mt-2 flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">
            arrow_upward
          </span>
          12.5%
          <span className="text-gray-400 font-normal">so với tháng trước</span>
        </p>
      </div>
    </div>
  );
}
