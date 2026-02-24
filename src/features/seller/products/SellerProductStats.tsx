export function SellerProductStats() {
  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-[#2b3a4a] dark:bg-[#1a2632]">
        <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
          Tất cả sản phẩm
        </dt>
        <dd className="mt-2 flex items-baseline">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            125
          </span>
          <span className="ml-2 text-sm font-medium text-green-600">
            +4 mới
          </span>
        </dd>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-[#2b3a4a] dark:bg-[#1a2632]">
        <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
          Đang hoạt động
        </dt>
        <dd className="mt-2 text-2xl font-bold text-primary">98</dd>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-[#2b3a4a] dark:bg-[#1a2632]">
        <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
          Hết hàng
        </dt>
        <dd className="mt-2 text-2xl font-bold text-red-600">12</dd>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-[#2b3a4a] dark:bg-[#1a2632]">
        <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
          Chờ duyệt
        </dt>
        <dd className="mt-2 text-2xl font-bold text-orange-500">15</dd>
      </div>
    </div>
  );
}
