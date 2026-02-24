export function CheckoutAddress() {
  return (
    <section className="bg-white dark:bg-[#1a0a0a] rounded-lg shadow-sm p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-[repeating-linear-gradient(45deg,#d41111,#d41111_30px,#fff_30px,#fff_60px,#28489c_60px,#28489c_90px,#fff_90px,#fff_120px)]"></div>
      <div className="flex items-start justify-between mt-2">
        <div className="flex items-center gap-2 text-primary mb-4">
          <span className="material-symbols-outlined">location_on</span>
          <h3 className="text-lg font-bold">Địa chỉ nhận hàng</h3>
        </div>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          Thay đổi
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
        <div className="font-bold text-base min-w-[180px]">
          Nguyễn Văn A
          <span className="block font-normal text-gray-500 text-sm">
            (+84) 909 123 456
          </span>
        </div>
        <div className="text-gray-700 dark:text-gray-300 text-sm flex-1">
          123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh
          <span className="inline-block ml-2 px-2 py-0.5 border border-primary text-primary text-[10px] rounded uppercase font-bold">
            Mặc định
          </span>
        </div>
      </div>
    </section>
  );
}
