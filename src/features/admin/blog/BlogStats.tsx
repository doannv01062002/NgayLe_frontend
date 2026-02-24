export function BlogStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Stat 1 */}
      <div className="bg-white dark:bg-[#1a2634] p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Tổng bài viết
          </span>
          <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-md text-[20px]">
            article
          </span>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            1,240
          </span>
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded flex items-center">
            <span className="material-symbols-outlined text-[12px] mr-0.5">
              trending_up
            </span>
            +5%
          </span>
        </div>
      </div>
      {/* Stat 2 */}
      <div className="bg-white dark:bg-[#1a2634] p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Lượt xem tháng này
          </span>
          <span className="material-symbols-outlined text-blue-500 bg-blue-50 dark:bg-blue-900/20 p-1.5 rounded-md text-[20px]">
            visibility
          </span>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            45.2K
          </span>
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded flex items-center">
            <span className="material-symbols-outlined text-[12px] mr-0.5">
              trending_up
            </span>
            +12%
          </span>
        </div>
      </div>
      {/* Stat 3 */}
      <div className="bg-white dark:bg-[#1a2634] p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Điểm SEO TB
          </span>
          <span className="material-symbols-outlined text-orange-500 bg-orange-50 dark:bg-orange-900/20 p-1.5 rounded-md text-[20px]">
            analytics
          </span>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            85/100
          </span>
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded flex items-center">
            <span className="material-symbols-outlined text-[12px] mr-0.5">
              trending_up
            </span>
            +2%
          </span>
        </div>
      </div>
      {/* Stat 4 */}
      <div className="bg-white dark:bg-[#1a2634] p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Chờ duyệt
          </span>
          <span className="material-symbols-outlined text-purple-500 bg-purple-50 dark:bg-purple-900/20 p-1.5 rounded-md text-[20px]">
            pending_actions
          </span>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            12
          </span>
          <span className="text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded flex items-center dark:text-gray-300">
            0%
          </span>
        </div>
      </div>
    </div>
  );
}
