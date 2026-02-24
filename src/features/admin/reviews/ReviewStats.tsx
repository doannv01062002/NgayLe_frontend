export function ReviewStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1 */}
      <div className="flex flex-col gap-2 rounded-xl p-5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a2632] shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Tổng đánh giá
          </p>
          <span className="material-symbols-outlined text-primary bg-primary/10 p-1 rounded">
            reviews
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-gray-900 dark:text-white text-2xl font-bold">
            15,204
          </p>
          <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold bg-emerald-100 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded-full">
            +12%
          </span>
        </div>
      </div>
      {/* Card 2 */}
      <div className="flex flex-col gap-2 rounded-xl p-5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a2632] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-orange-500/10 rounded-bl-full -mr-2 -mt-2"></div>
        <div className="flex items-center justify-between relative z-10">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Chờ duyệt
          </p>
          <span className="material-symbols-outlined text-orange-500 bg-orange-100 dark:bg-orange-900/30 p-1 rounded">
            pending_actions
          </span>
        </div>
        <div className="flex items-baseline gap-2 relative z-10">
          <p className="text-gray-900 dark:text-white text-2xl font-bold">42</p>
          <span className="text-orange-600 dark:text-orange-400 text-xs font-bold bg-orange-100 dark:bg-orange-900/30 px-1.5 py-0.5 rounded-full">
            +5 mới
          </span>
        </div>
      </div>
      {/* Card 3 */}
      <div className="flex flex-col gap-2 rounded-xl p-5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a2632] shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Báo cáo / Spam
          </p>
          <span className="material-symbols-outlined text-red-500 bg-red-100 dark:bg-red-900/30 p-1 rounded">
            report
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-gray-900 dark:text-white text-2xl font-bold">18</p>
          <span className="text-red-600 dark:text-red-400 text-xs font-bold bg-red-100 dark:bg-red-900/30 px-1.5 py-0.5 rounded-full">
            Cần xử lý
          </span>
        </div>
      </div>
      {/* Card 4 */}
      <div className="flex flex-col gap-2 rounded-xl p-5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a2632] shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Đánh giá TB
          </p>
          <span className="material-symbols-outlined text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 p-1 rounded">
            star
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-gray-900 dark:text-white text-2xl font-bold">
            4.8<span className="text-base font-normal text-gray-400">/5</span>
          </p>
          <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold bg-emerald-100 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded-full">
            +0.1
          </span>
        </div>
      </div>
    </div>
  );
}
