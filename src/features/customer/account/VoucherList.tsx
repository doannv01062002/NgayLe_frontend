export function VoucherList() {
  return (
    <div className="mt-4 bg-gradient-to-r from-[#ffecec] to-[#fff5f5] dark:from-[#3a1a1a] dark:to-[#2d1a1a] rounded-lg shadow-sm p-4 border border-red-100 dark:border-red-900/30">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl">
            confirmation_number
          </span>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">
              Kho Voucher
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Voucher bạn có thể sử dụng cho đơn hàng tới
            </p>
          </div>
        </div>
        <a
          className="text-sm text-primary font-medium hover:underline"
          href="#"
        >
          Xem tất cả &gt;
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Voucher 1 */}
        <div className="relative bg-white dark:bg-[#2d1b1b] border border-gray-200 dark:border-gray-700 rounded-lg p-0 flex overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-primary text-white w-24 flex flex-col items-center justify-center p-2 shrink-0 border-r border-dashed border-white/40">
            <span className="text-xs font-bold uppercase">Ngayle</span>
            <span className="text-lg font-extrabold">50K</span>
          </div>
          <div className="p-3 flex-1 flex flex-col justify-center">
            <p className="text-sm font-bold text-gray-800 dark:text-white">
              Giảm 50k đơn từ 200k
            </p>
            <p className="text-[10px] text-gray-500 mt-1">HSD: 30/04/2024</p>
            <div className="flex justify-end mt-2">
              <button className="text-primary text-xs font-bold border border-primary px-2 py-1 rounded-sm hover:bg-primary hover:text-white transition-colors">
                Dùng ngay
              </button>
            </div>
          </div>
          {/* Decorative circles for voucher look */}
          <div className="absolute top-1/2 -left-1.5 w-3 h-3 bg-[#f5f5f5] dark:bg-background-dark rounded-full -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-[93px] w-3 h-3 bg-white dark:bg-[#2d1b1b] rounded-full -translate-y-1/2 z-10"></div>
        </div>
        {/* Voucher 2 */}
        <div className="relative bg-white dark:bg-[#2d1b1b] border border-gray-200 dark:border-gray-700 rounded-lg p-0 flex overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-blue-600 text-white w-24 flex flex-col items-center justify-center p-2 shrink-0 border-r border-dashed border-white/40">
            <span className="text-xs font-bold uppercase">FreeShip</span>
            <span className="material-symbols-outlined text-lg">
              local_shipping
            </span>
          </div>
          <div className="p-3 flex-1 flex flex-col justify-center">
            <p className="text-sm font-bold text-gray-800 dark:text-white">
              Miễn phí vận chuyển
            </p>
            <p className="text-[10px] text-gray-500 mt-1">Đơn tối thiểu 0đ</p>
            <div className="flex justify-end mt-2">
              <button className="text-blue-600 text-xs font-bold border border-blue-600 px-2 py-1 rounded-sm hover:bg-blue-600 hover:text-white transition-colors">
                Dùng ngay
              </button>
            </div>
          </div>
          <div className="absolute top-1/2 -left-1.5 w-3 h-3 bg-[#f5f5f5] dark:bg-background-dark rounded-full -translate-y-1/2"></div>
        </div>
      </div>
    </div>
  );
}
