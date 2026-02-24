import { ReportTable } from "@/features/admin/reports_feature/ReportTable";
import { ReportStats } from "@/features/admin/reports_feature/ReportStats";
import Link from "next/link";

export default function AdminReportsPage() {
  return (
    <>
      <nav aria-label="Breadcrumb" className="flex mb-6">
        <ol className="flex items-center space-x-2">
          <li>
            <Link className="text-gray-400 hover:text-gray-500" href="/admin">
              <span className="material-symbols-outlined text-xl">home</span>
            </Link>
          </li>
          <li>
            <span className="text-gray-300">/</span>
          </li>
          <li>
            <span className="text-sm font-medium text-primary dark:text-blue-400">
              Quản lý Báo cáo
            </span>
          </li>
        </ol>
      </nav>

      <div className="flex flex-col gap-2 mb-6">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
          Quản lý Báo cáo Vi phạm
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Xem và xử lý các báo cáo vi phạm từ người dùng về sản phẩm, cửa hàng,
          đánh giá, v.v.
        </p>
      </div>

      <ReportStats />

      <ReportTable />
    </>
  );
}
