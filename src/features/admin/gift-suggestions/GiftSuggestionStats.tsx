export function GiftSuggestionStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Stat 1 */}
      <div className="bg-white dark:bg-[#1a2634] rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Quy tắc đang chạy
          </p>
          <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-md text-xl">
            rule
          </span>
        </div>
        <div className="flex items-baseline gap-2 mt-1">
          <p className="text-3xl font-bold text-gray-900 dark:text-white">12</p>
          <span className="text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-bold px-1.5 py-0.5 rounded">
            +2 mới
          </span>
        </div>
      </div>
      {/* Stat 2 */}
      <div className="bg-white dark:bg-[#1a2634] rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Tìm kiếm phổ biến (Top Trend)
          </p>
          <span className="material-symbols-outlined text-orange-500 bg-orange-100 dark:bg-orange-900/20 p-1.5 rounded-md text-xl">
            trending_up
          </span>
        </div>
        <div className="mt-1">
          <p
            className="text-lg font-bold text-gray-900 dark:text-white truncate"
            title="Bạn gái + Dưới 500k"
          >
            Bạn gái <span className="text-gray-400 mx-1">+</span> Dưới 500k
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Chiếm 35% lượng tìm kiếm tuần này
          </p>
        </div>
      </div>
      {/* Stat 3 */}
      <div className="bg-white dark:bg-[#1a2634] rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Tỉ lệ chuyển đổi (CR)
          </p>
          <span className="material-symbols-outlined text-emerald-500 bg-emerald-100 dark:bg-emerald-900/20 p-1.5 rounded-md text-xl">
            insights
          </span>
        </div>
        <div className="flex items-baseline gap-2 mt-1">
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            4.5%
          </p>
          <span className="text-emerald-600 text-sm font-medium flex items-center">
            <span className="material-symbols-outlined text-base">
              arrow_upward
            </span>
            0.5%
          </span>
        </div>
      </div>
    </div>
  );
}
