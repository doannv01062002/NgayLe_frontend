export function CheckoutSummary() {
  return (
    <div className="sticky top-24 space-y-4">
      <div className="bg-white dark:bg-[#1a0a0a] rounded-lg shadow-sm p-6">
        <h3 className="font-bold text-lg mb-4">Chi tiết thanh toán</h3>
        <div className="space-y-3 pb-4 border-b border-gray-100 dark:border-gray-800 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Tổng tiền hàng</span>
            <span>600.000đ</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Phí vận chuyển</span>
            <span>30.000đ</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Giảm giá phí vận chuyển</span>
            <span className="text-green-600">-10.000đ</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Voucher từ Shop</span>
            <span className="text-primary">-20.000đ</span>
          </div>
        </div>
        <div className="pt-4 flex justify-between items-end mb-6">
          <span className="text-gray-900 dark:text-gray-100 font-medium">
            Tổng thanh toán
          </span>
          <div className="text-right">
            <span className="text-2xl font-bold text-primary block leading-none">
              600.000đ
            </span>
            <span className="text-xs text-gray-400">
              (Đã bao gồm VAT nếu có)
            </span>
          </div>
        </div>
        <div className="flex items-start gap-2 mb-6">
          <input
            className="mt-1 w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
            id="terms"
            type="checkbox"
          />
          <label
            className="text-xs text-gray-500 leading-normal"
            htmlFor="terms"
          >
            Nhấn &quot;Đặt hàng&quot; đồng nghĩa với việc bạn đồng ý tuân theo{" "}
            <a className="text-blue-600 hover:underline" href="#">
              Điều khoản ngayle.com
            </a>
          </label>
        </div>
        <button className="w-full bg-primary hover:bg-[#b00e0e] text-white font-bold py-3 rounded-md shadow-lg shadow-red-200 dark:shadow-none transition-all transform active:scale-[0.98]">
          ĐẶT HÀNG
        </button>
      </div>
    </div>
  );
}
