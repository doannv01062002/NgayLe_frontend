export function CheckoutShipping() {
  return (
    <section className="bg-white dark:bg-[#1a0a0a] rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-gray-500">
          local_shipping
        </span>
        <h3 className="text-lg font-bold">Phương thức vận chuyển</h3>
      </div>
      <div className="bg-[#fafafa] dark:bg-[#202020] p-4 rounded-lg border border-gray-100 dark:border-gray-700 space-y-3">
        {/* Option 1 */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            defaultChecked
            className="mt-1 w-4 h-4 text-primary bg-white border-gray-300 focus:ring-primary focus:ring-2"
            name="shipping"
            type="radio"
          />
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm">
                Nhanh (Giao Hàng Nhanh)
              </span>
              <span className="text-primary font-bold text-sm">30.000đ</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Nhận hàng vào 15 Th02 - 17 Th02
            </p>
          </div>
        </label>
        <div className="h-px bg-gray-200 dark:bg-gray-700 w-full"></div>
        {/* Option 2 */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            className="mt-1 w-4 h-4 text-primary bg-white border-gray-300 focus:ring-primary focus:ring-2"
            name="shipping"
            type="radio"
          />
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm">Hỏa tốc (GrabExpress)</span>
              <span className="text-primary font-bold text-sm">55.000đ</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Nhận hàng trong 2 giờ (Chỉ nội thành)
            </p>
          </div>
        </label>
      </div>
    </section>
  );
}
