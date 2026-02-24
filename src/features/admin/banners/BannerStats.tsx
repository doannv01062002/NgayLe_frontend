export function BannerStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Stat 1 */}
      <div className="bg-white dark:bg-[#1a2634] p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Banner Đang Chạy
          </p>
          <span className="p-1.5 bg-blue-50 dark:bg-blue-900/30 text-primary rounded-lg">
            <span className="material-symbols-outlined text-[20px]">
              view_carousel
            </span>
          </span>
        </div>
        <div className="flex items-end gap-2 mt-2">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            12
          </h3>
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded flex items-center">
            <span className="material-symbols-outlined text-[14px] mr-0.5">
              trending_up
            </span>
            +2
          </span>
        </div>
      </div>
      {/* Stat 2 */}
      <div className="bg-white dark:bg-[#1a2634] p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Tổng Lượt Xem
          </p>
          <span className="p-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-lg">
            <span className="material-symbols-outlined text-[20px]">
              visibility
            </span>
          </span>
        </div>
        <div className="flex items-end gap-2 mt-2">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            1.24M
          </h3>
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded flex items-center">
            <span className="material-symbols-outlined text-[14px] mr-0.5">
              trending_up
            </span>
            +15%
          </span>
        </div>
      </div>
      {/* Stat 3 */}
      <div className="bg-white dark:bg-[#1a2634] p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            CTR Trung Bình
          </p>
          <span className="p-1.5 bg-amber-50 dark:bg-amber-900/30 text-amber-600 rounded-lg">
            <span className="material-symbols-outlined text-[20px]">
              ads_click
            </span>
          </span>
        </div>
        <div className="flex items-end gap-2 mt-2">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            3.45%
          </h3>
          <span className="text-xs font-medium text-red-600 bg-red-50 dark:bg-red-900/30 px-1.5 py-0.5 rounded flex items-center">
            <span className="material-symbols-outlined text-[14px] mr-0.5">
              trending_down
            </span>
            -0.5%
          </span>
        </div>
      </div>
      {/* Stat 4 */}
      <div className="bg-white dark:bg-[#1a2634] p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Sắp Hết Hạn
          </p>
          <span className="p-1.5 bg-orange-50 dark:bg-orange-900/30 text-orange-600 rounded-lg">
            <span className="material-symbols-outlined text-[20px]">
              schedule
            </span>
          </span>
        </div>
        <div className="flex items-end gap-2 mt-2">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            2
          </h3>
          <span className="text-xs font-normal text-gray-400">Cần gia hạn</span>
        </div>
      </div>
    </div>
  );
}
