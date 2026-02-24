export function VoucherGenerator() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-[#1a2634]">
      <div className="flex items-center gap-2 mb-4 text-gray-900 dark:text-white">
        <span className="material-symbols-outlined text-primary">
          local_activity
        </span>
        <h3 className="text-lg font-bold">Tạo Voucher Nhanh</h3>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Mã Voucher
          </label>
          <div className="flex rounded-lg shadow-sm">
            <span className="inline-flex items-center rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 sm:text-sm">
              #
            </span>
            <input
              className="block w-full min-w-0 flex-1 rounded-none rounded-r-lg border-gray-300 focus:border-primary focus:ring-primary sm:text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white uppercase"
              placeholder="TET2024"
              type="text"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Loại
            </label>
            <select className="block w-full rounded-lg border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white">
              <option>Giảm %</option>
              <option>Giảm tiền</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Giá trị
            </label>
            <input
              className="block w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary sm:text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              placeholder="10"
              type="number"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Số lượng
          </label>
          <input
            className="block w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary sm:text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            type="number"
            defaultValue="100"
          />
        </div>
        <button className="mt-2 flex w-full justify-center rounded-lg bg-primary py-2.5 px-4 text-sm font-bold text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors">
          Tạo Mã
        </button>
      </div>
    </div>
  );
}
