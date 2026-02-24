export function LandingPageStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Stat 1 */}
      <div className="bg-white dark:bg-[#1a2634] rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Tổng Chiến dịch
          </p>
          <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-md text-xl">
            campaign
          </span>
        </div>
        <div className="flex items-baseline gap-2 mt-1">
          <p className="text-3xl font-bold text-gray-900 dark:text-white">12</p>
          <span className="text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-bold px-1.5 py-0.5 rounded">
            +3 mới
          </span>
        </div>
      </div>
      {/* Stat 2 */}
      <div className="bg-white dark:bg-[#1a2634] rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Đang Chạy
          </p>
          <span className="material-symbols-outlined text-green-500 bg-green-100 dark:bg-green-900/20 p-1.5 rounded-md text-xl">
            play_circle
          </span>
        </div>
        <div className="flex items-baseline gap-2 mt-1">
          <p className="text-3xl font-bold text-gray-900 dark:text-white">5</p>
          <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">
            chiến dịch
          </span>
        </div>
      </div>
      {/* Stat 3 */}
      <div className="bg-white dark:bg-[#1a2634] rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Tổng Lượt Xem
          </p>
          <span className="material-symbols-outlined text-blue-500 bg-blue-100 dark:bg-blue-900/20 p-1.5 rounded-md text-xl">
            visibility
          </span>
        </div>
        <div className="flex items-baseline gap-2 mt-1">
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            1.2M
          </p>
          <span className="text-emerald-600 text-sm font-medium flex items-center">
            <span className="material-symbols-outlined text-base">
              arrow_upward
            </span>
            15%
          </span>
        </div>
      </div>
      {/* Stat 4 */}
      <div className="bg-white dark:bg-[#1a2634] rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Tỉ lệ Chuyển đổi
          </p>
          <span className="material-symbols-outlined text-orange-500 bg-orange-100 dark:bg-orange-900/20 p-1.5 rounded-md text-xl">
            shopping_cart_checkout
          </span>
        </div>
        <div className="flex items-baseline gap-2 mt-1">
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            3.8%
          </p>
          <span className="text-emerald-600 text-sm font-medium flex items-center">
            <span className="material-symbols-outlined text-base">
              arrow_upward
            </span>
            0.2%
          </span>
        </div>
      </div>
    </div>
  );
}
