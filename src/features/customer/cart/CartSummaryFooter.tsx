export function CartSummaryFooter() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#2d1b1b] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] border-t border-gray-200 dark:border-[#3e2c2c] z-40">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Platform Voucher Selection */}
        <div className="flex items-center justify-end py-3 border-b border-dashed border-gray-200 dark:border-[#3e2c2c] gap-4">
          <div className="flex items-center gap-2 text-primary cursor-pointer hover:opacity-80">
            <span className="material-symbols-outlined">loyalty</span>
            <span className="text-sm font-medium">Ngayle Voucher</span>
          </div>
          <button className="text-sm text-blue-600 font-medium hover:underline">
            Chọn hoặc nhập mã
          </button>
        </div>

        {/* Total and Buy Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-4">
          <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-start">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
                type="checkbox"
              />
              <span className="text-sm font-medium dark:text-white">
                Chọn tất cả (4)
              </span>
            </label>
            <button className="text-sm font-medium text-gray-500 hover:text-primary transition-colors dark:text-gray-400">
              Xóa
            </button>
            <button className="text-sm font-medium text-primary hidden sm:block">
              Lưu vào mục đã thích
            </button>
          </div>
          <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Tổng thanh toán (3 sản phẩm):
                </span>
                <span className="text-xl sm:text-2xl font-bold text-primary">
                  ₫1.298.000
                </span>
              </div>
              <div className="text-xs text-green-600 dark:text-green-400 flex items-center justify-end gap-1">
                <span>Tiết kiệm</span>
                <span className="font-bold">₫71.000</span>
              </div>
            </div>
            <button className="bg-primary hover:bg-red-700 text-white font-bold py-3 px-8 sm:px-12 rounded-lg shadow-lg hover:shadow-xl transition-all active:scale-95 text-base sm:text-lg w-auto">
              Mua Hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
