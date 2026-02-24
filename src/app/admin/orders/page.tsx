import { OrderStats } from "@/features/admin/orders/OrderStats";
import { OrderTable } from "@/features/admin/orders/OrderTable";

export default function AdminOrdersPage() {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Quản lý Đơn hàng &amp; Khiếu nại
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Theo dõi đơn hàng và giải quyết các khiếu nại phát sinh từ sàn
            Ngayle.com
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <span className="material-symbols-outlined text-[20px]">
              settings
            </span>
            <span>Cấu hình</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold shadow-md hover:bg-blue-600 transition-colors">
            <span className="material-symbols-outlined text-[20px]">
              download
            </span>
            <span>Xuất dữ liệu</span>
          </button>
        </div>
      </div>

      <OrderStats />

      <OrderTable />
    </>
  );
}
